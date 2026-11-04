/**
 * SmartRateCalcs Universal IndexNow Pusher
 * Dynamically parses the live sitemap.xml and broadcasts all URLs
 * to IndexNow (Bing, Yandex, Seznam, Naver) for instant crawl queues.
 */

const https = require('https');
const http = require('http');

const HOST = 'www.smartratecalcs.com';
const KEY = '4a8f9c2d1e0b7a6f5e3c8d1b9a2e4f7c';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

function fetchSitemap(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseUrlsFromSitemap(xml) {
  const matches = xml.match(/<loc>(.*?)<\/loc>/g) || [];
  return matches.map(m => m.replace(/<\/?loc>/g, '').trim()).filter(Boolean);
}

function postJson(hostname, path, data) {
  return new Promise((resolve) => {
    const payload = JSON.stringify(data);
    const req = https.request({
      hostname,
      port: 443,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          body
        });
      });
    });

    req.on('error', (err) => {
      resolve({ statusCode: 500, statusMessage: err.message, body: '' });
    });

    req.write(payload);
    req.end();
  });
}

async function run() {
  console.log('='.repeat(70));
  console.log('  🚀 SMARTRATECALCS AUTOMATED INDEXNOW DISPATCHER');
  console.log('='.repeat(70));

  console.log(`[1/3] Fetching live sitemap from: ${SITEMAP_URL}...`);
  let urls = [];
  try {
    const sitemapXml = await fetchSitemap(SITEMAP_URL);
    urls = parseUrlsFromSitemap(sitemapXml);
    console.log(`✓ Fetched successfully! Discovered ${urls.length} live canonical URLs.`);
  } catch (err) {
    console.warn(`! Could not fetch remote sitemap (${err.message}). Using fallback local list.`);
    urls = [`https://${HOST}/`];
  }

  if (urls.length === 0) {
    console.error('No URLs found to submit. Exiting.');
    return;
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  };

  const endpoints = [
    { name: 'IndexNow Global (api.indexnow.org)', host: 'api.indexnow.org', path: '/indexnow' },
    { name: 'Microsoft Bing (www.bing.com)', host: 'www.bing.com', path: '/indexnow' },
    { name: 'Yandex (yandex.com)', host: 'yandex.com', path: '/indexnow' }
  ];

  console.log(`\n[2/3] Broadcasting ${urls.length} URLs across search engines...`);

  for (const ep of endpoints) {
    const res = await postJson(ep.host, ep.path, payload);
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log(`  ✓ [${ep.name}] Status: ${res.statusCode} ${res.statusMessage} (ACCEPTED)`);
    } else {
      console.log(`  ⚠ [${ep.name}] Status: ${res.statusCode} ${res.statusMessage} | ${res.body}`);
    }
  }

  console.log('\n[3/3] Complete! All search engines have been notified.');
  console.log('='.repeat(70));
}

run().catch(console.error);
