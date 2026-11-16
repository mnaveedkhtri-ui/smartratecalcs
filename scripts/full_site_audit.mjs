const urls = [
  'https://www.smartratecalcs.com/',
  'https://www.smartratecalcs.com/sitemap.xml',
  'https://www.smartratecalcs.com/robots.txt',
  'https://www.smartratecalcs.com/ads.txt',
  'https://www.smartratecalcs.com/about',
  'https://www.smartratecalcs.com/contact',
  'https://www.smartratecalcs.com/privacy',
  'https://www.smartratecalcs.com/terms',
  'https://www.smartratecalcs.com/disclaimer',
  'https://www.smartratecalcs.com/calculators/cash-app-fee-calculator',
  'https://www.smartratecalcs.com/calculators/upwork-to-jazzcash-calculator',
  'https://www.smartratecalcs.com/calculators/etsy-fee-calculator',
  'https://www.smartratecalcs.com/depop-fee-calculator',
  'https://www.smartratecalcs.com/stripe-fee-calculator',
  'https://www.smartratecalcs.com/1099-tax-calculator',
  'https://www.smartratecalcs.com/blog',
  'https://www.smartratecalcs.com/blog/upwork-pakistan-lowest-withdrawal-fee-guide',
  'https://www.smartratecalcs.com/calculators/wise-vs-payoneer-fee-calculator',
  'https://www.smartratecalcs.com/calculators/wise-to-meezan-bank-fee-calculator'
];

async function run() {
  console.log('AUDITING ' + urls.length + ' KEY PRODUCTION ENDPOINTS...');
  let ok = 0;
  for (const u of urls) {
    try {
      const start = Date.now();
      const res = await fetch(u, { method: 'GET' });
      const duration = Date.now() - start;
      const status = res.status;
      if (status === 200) ok++;
      console.log(`[${status}] (${duration}ms) ${u}`);
    } catch (e) {
      console.log(`[ERR] ${u} - ${e.message}`);
    }
  }
  console.log(`\nRESULT: ${ok} / ${urls.length} endpoints returned HTTP 200 OK!`);
}
run();
