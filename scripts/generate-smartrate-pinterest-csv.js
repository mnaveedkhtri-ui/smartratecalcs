const fs = require('fs');
const path = require('path');

const baseUrl = 'https://www.smartratecalcs.com';
const ogImage = `${baseUrl}/og-image.png`;

const pins = [
  {
    title: 'TikTok Shop Fee Calculator 2026: Official 6% Referral Rate & Profit Math',
    board: 'TikTok Shop Strategies & Margins',
    desc: 'Calculate exact net earnings from TikTok Shop. Includes official 6% US referral rate, creator affiliate commission splits (10-20%), and take-home formulas. Free instant calculation tool. #tiktokshop #ecommerce #sellerfees #businesstips',
    link: `${baseUrl}/calculators/tiktok-shop-fee-calculator`
  },
  {
    title: 'Depop Fee Calculator 2026: Official 0% Seller Fee & Take-Home Payout Formula',
    board: 'Reseller Tips: Depop, eBay & Poshmark',
    desc: 'Depop eliminated the 10% selling fee for US/UK sellers. Calculate exact take-home payouts after 3.3% + $0.45 processing and 8% boosting fees. Free 2026 calculator. #depop #depopseller #resellercommunity #thrifting',
    link: `${baseUrl}/depop-fee-calculator`
  },
  {
    title: 'Amazon FBA & Seller Fee Calculator 2026: FBA vs FBM Net Profit Margins',
    board: 'E-Commerce Seller Fee Calculators',
    desc: 'Calculate 8% to 15% category referral fees, FBA pick and pack fees, inbound placement costs, and net take-home margin per ASIN. #amazonfba #amazonseller #fba #ecommerce',
    link: `${baseUrl}/calculators/amazon-fba-fee-calculator`
  },
  {
    title: 'Etsy Fee & Profit Calculator 2026: 6.5% Transaction & Payment Processing Math',
    board: 'E-Commerce Seller Fee Calculators',
    desc: 'Never get surprised by Etsy deductions. Calculate 6.5% transaction fee, $0.20 listing renewal, and 3% + $0.25 payment processing in one click. #etsy #etsyshop #etsyseller #handmade',
    link: `${baseUrl}/calculators/etsy-fee-calculator`
  },
  {
    title: 'eBay Fee & Profit Calculator 2026: Managed Payments 13.25% Final Value Fee',
    board: 'Reseller Tips: Depop, eBay & Poshmark',
    desc: 'Calculate official eBay Managed Payments final value fees (13.25% + $0.30), store tier discounts, Top Rated Plus savings, and net profit. #ebay #ebayseller #resellercommunity #flipping',
    link: `${baseUrl}/calculators/ebay-fee-calculator`
  },
  {
    title: 'Poshmark Fee Calculator 2026: Official 20% Commission & Reverse Pricing',
    board: 'Reseller Tips: Depop, eBay & Poshmark',
    desc: 'Calculate Poshmark net payout under 20% commission, $2.95 sub-$15 flat tiers, and Offer to Likers shipping discounts. Reverse target pricing formula included. #poshmark #poshmarkseller #reseller',
    link: `${baseUrl}/calculators/poshmark-fee-calculator`
  },
  {
    title: 'Cash App Fee Calculator 2026: Instant Transfer & Business Fee Deductions',
    board: 'Freelance Rates & Global Payouts',
    desc: 'Calculate exact fees for Cash App 1.75% instant debit card transfers and 2.75% Cash for Business merchant receipts. #cashapp #fintech #moneytips #personalfinance',
    link: `${baseUrl}/calculators/cash-app-fee-calculator`
  },
  {
    title: 'Upwork to JazzCash & Local Bank Calculator: Lowest Fee Payout Guide 2026',
    board: 'Freelance Rates & Global Payouts',
    desc: 'Compare Upwork direct local bank transfer vs Payoneer to JazzCash in Pakistan. Real-time PKR conversion rates and lowest withdrawal fee routing. #upwork #freelancing #pakistan #jazzcash',
    link: `${baseUrl}/calculators/upwork-to-jazzcash-calculator`
  },
  {
    title: 'Wise vs Payoneer Fee Comparison Calculator 2026: Global Freelance Transfers',
    board: 'Freelance Rates & Global Payouts',
    desc: 'Compare actual transfer costs, hidden exchange rate markups, and receiving fees between Wise and Payoneer for remote contractors. #wise #payoneer #freelancing #remotework',
    link: `${baseUrl}/calculators/wise-vs-payoneer-fee-calculator`
  },
  {
    title: 'Stripe vs PayPal Merchant Processing Fee Calculator 2026',
    board: 'E-Commerce Seller Fee Calculators',
    desc: 'Compare 2.9% + $0.30 Stripe processing vs PayPal standard commercial transaction fees for web stores and client invoices. #stripe #paypal #ecommerce #businessowner',
    link: `${baseUrl}/stripe-fee-calculator`
  }
];

const rows = [
  ['Title', 'Media URL', 'Pinterest board', 'Description', 'Link']
];

pins.forEach(p => {
  rows.push([
    p.title,
    ogImage,
    p.board,
    p.desc,
    p.link
  ]);
});

const csvLines = rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(','));
const csvContent = csvLines.join('\n');

const outputPath = path.join(__dirname, '..', 'public', 'pinterest_bulk_pins.csv');
fs.writeFileSync(outputPath, csvContent, 'utf8');

console.log(`Generated ${pins.length} viral calculator pins in ${outputPath}`);
