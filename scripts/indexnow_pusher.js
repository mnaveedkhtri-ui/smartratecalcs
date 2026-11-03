/**
 * IndexNow Fast-Track Automation Script for SmartRateCalcs
 * Submits all 85+ programmatic and pillar routes directly to Microsoft Bing,
 * Yandex, and AI Search Engines (IndexNow API) for sub-hour indexing.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const HOST = 'www.smartratecalcs.com';
const KEY = '4a8f9c2d1e0b7a6f5e3c8d1b9a2e4f7c';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Read programmatic calculators database
const dbPath = path.join(__dirname, '../data/programmatic-calculators.ts');
const dbContent = fs.readFileSync(dbPath, 'utf8');
const slugs = [...dbContent.matchAll(/"slug":\s*"([^"]+)"/g)].map(m => m[1]);

const staticRoutes = [
  '',
  'paypal-fee-calculator',
  'stripe-fee-calculator',
  'blog',
  'blog/upwork-pakistan-lowest-withdrawal-fee-guide',
  'blog/pakistan-freelancer-tax-section-154a-pseb-guide',
  'about',
  'privacy',
  'terms',
  'disclaimer',
  'demo'
];

const allUrls = [
  ...staticRoutes.map(r => `https://${HOST}/${r}`.replace(/\/$/, '')),
  ...slugs.map(s => `https://${HOST}/calculators/${s}`)
];

const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: allUrls
});

console.log('='.repeat(65));
console.log('SmartRateCalcs IndexNow Fast-Track Engine');
console.log(`Total URLs Prepared: ${allUrls.length}`);
console.log(`Key: ${KEY}`);
console.log(`Key Location: ${KEY_LOCATION}`);
console.log('='.repeat(65));

function submitToIndexNow(endpointHost, endpointPath) {
  const options = {
    hostname: endpointHost,
    port: 443,
    path: endpointPath,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const req = https.request(options, (res) => {
    let responseBody = '';
    res.on('data', (d) => { responseBody += d; });
    res.on('end', () => {
      console.log(`[${endpointHost}] Response Status: ${res.statusCode} ${res.statusMessage}`);
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log(`✓ Successfully submitted ${allUrls.length} URLs to ${endpointHost}!`);
      } else {
        console.log(`Response Info: ${responseBody || 'Submitted to queue'}`);
      }
    });
  });

  req.on('error', (e) => {
    console.error(`Error submitting to ${endpointHost}:`, e.message);
  });

  req.write(payload);
  req.end();
}

// Dispatch to both official IndexNow endpoints
submitToIndexNow('api.indexnow.org', '/indexnow');
submitToIndexNow('www.bing.com', '/indexnow');
