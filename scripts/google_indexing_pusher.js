/**
 * SmartRateCalcs Google Indexing API v3 Automation
 * Submits all sitemap URLs directly to Googlebot via Google Indexing API
 * using official Google Cloud Service Account OAuth2 JWT authorization.
 */

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const HOST = 'www.smartratecalcs.com';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const SERVICE_ACCOUNT_FILE = path.join(__dirname, 'service_account.json');

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function fetchSitemap(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseUrls(xml) {
  const matches = xml.match(/<loc>(.*?)<\/loc>/g) || [];
  return matches.map(m => m.replace(/<\/?loc>/g, '').trim()).filter(Boolean);
}

function getGoogleAccessToken(creds) {
  return new Promise((resolve, reject) => {
    const header = base64UrlEncode(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
    const now = Math.floor(Date.now() / 1000);
    const claim = base64UrlEncode(JSON.stringify({
      iss: creds.client_email,
      scope: 'https://www.googleapis.com/auth/indexing',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now
    }));

    const sign = crypto.createSign('RSA-SHA256');
    sign.update(`${header}.${claim}`);
    const signature = sign.sign(creds.private_key, 'base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    const assertion = `${header}.${claim}.${signature}`;
    const postData = `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${assertion}`;

    const req = https.request({
      hostname: 'oauth2.googleapis.com',
      port: 443,
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.access_token) {
            resolve(json.access_token);
          } else {
            reject(new Error(json.error_description || json.error || 'Token fetch failed'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function submitUrlToGoogle(url, token) {
  return new Promise((resolve) => {
    const payload = JSON.stringify({
      url,
      type: 'URL_UPDATED'
    });

    const req = https.request({
      hostname: 'indexing.googleapis.com',
      port: 443,
      path: '/v3/urlNotifications:publish',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body: data });
      });
    });

    req.on('error', err => resolve({ statusCode: 500, body: err.message }));
    req.write(payload);
    req.end();
  });
}

async function run() {
  console.log('='.repeat(70));
  console.log('  🔍 SMARTRATECALCS GOOGLE INDEXING API AUTOMATION');
  console.log('='.repeat(70));

  if (!fs.existsSync(SERVICE_ACCOUNT_FILE)) {
    console.log('\n⚠ Service account key file missing:');
    console.log(`  Path: ${SERVICE_ACCOUNT_FILE}\n`);
    console.log('HOW TO SETUP IN 2 MINUTES:');
    console.log('1. Go to Google Cloud Console (https://console.cloud.google.com/)');
    console.log('2. Enable "Web Search Indexing API"');
    console.log('3. Create a Service Account, generate a JSON Key, and save it as:');
    console.log('   scripts/service_account.json');
    console.log('4. In Google Search Console -> Settings -> Users & Permissions:');
    console.log('   Add your service account email as "Owner" for https://www.smartratecalcs.com');
    console.log('5. Run: npm run index:google\n');
    console.log('='.repeat(70));
    return;
  }

  let creds;
  try {
    creds = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_FILE, 'utf8'));
  } catch (e) {
    console.error('Invalid service_account.json format.');
    return;
  }

  console.log(`[1/3] Authenticating as: ${creds.client_email}...`);
  let token;
  try {
    token = await getGoogleAccessToken(creds);
    console.log('✓ OAuth2 Access Token generated successfully!');
  } catch (err) {
    console.error('✗ Authentication failed:', err.message);
    return;
  }

  console.log(`\n[2/3] Fetching live sitemap from: ${SITEMAP_URL}...`);
  const sitemapXml = await fetchSitemap(SITEMAP_URL);
  const urls = parseUrls(sitemapXml);
  console.log(`✓ Found ${urls.length} canonical URLs.\n`);

  console.log(`[3/3] Submitting URLs to Google Indexing API (Rate: 1 request / 500ms)...`);
  let successCount = 0;
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const res = await submitUrlToGoogle(url, token);
    if (res.statusCode === 200) {
      successCount++;
      console.log(`  ✓ [${i + 1}/${urls.length}] Google Accepted: ${url}`);
    } else {
      console.log(`  ⚠ [${i + 1}/${urls.length}] Status ${res.statusCode}: ${url}`);
    }
    // Respect Google API rate limit
    await new Promise(r => setTimeout(r, 400));
  }

  console.log('\n' + '='.repeat(70));
  console.log(`🎉 Done! Successfully submitted ${successCount}/${urls.length} URLs to Googlebot.`);
  console.log('='.repeat(70));
}

run().catch(console.error);
