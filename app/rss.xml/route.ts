import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { PROGRAMMATIC_CALCULATORS } from '@/data/programmatic-calculators';
import { BLOG_POSTS } from '@/data/blog-posts';

export const dynamic = 'force-dynamic';

const BASE_URL = 'https://www.smartratecalcs.com';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function clampPinTitle(raw: string, maxLen = 98): string {
  const clean = raw.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  const sliced = clean.slice(0, maxLen);
  const lastSpace = sliced.lastIndexOf(' ');
  return (lastSpace > 45 ? sliced.slice(0, lastSpace) : sliced).replace(/[:\-|,&]+$/, '').trim();
}

function resolveLocalAsset(relPath: string): { url: string; type: string; length: number } {
  const normalized = relPath.startsWith('/') ? relPath : `/${relPath}`;
  const fullFsPath = path.join(process.cwd(), 'public', normalized.replace(/^\//, ''));
  let size = 240000;
  try {
    if (fs.existsSync(fullFsPath)) {
      size = fs.statSync(fullFsPath).size || 240000;
    }
  } catch {
    size = 240000;
  }
  const type = normalized.toLowerCase().endsWith('.jpg') || normalized.toLowerCase().endsWith('.jpeg')
    ? 'image/jpeg'
    : 'image/png';
  return {
    url: escapeXml(`${BASE_URL}${normalized}`),
    type,
    length: size,
  };
}

function matchBlogPng(slug: string): string {
  const direct = `/blog/${slug}.png`;
  if (fs.existsSync(path.join(process.cwd(), 'public', 'blog', `${slug}.png`))) {
    return direct;
  }
  return '/og-image.png';
}

function matchCalculatorPng(slug: string): string {
  const rules: [RegExp, string][] = [
    [/reverb/i, '/blog/reverb-seller-fees-2026-complete-gear-profit-margin-guide.png'],
    [/mercari/i, '/blog/mercari-seller-fees-2026-flat-10-percent-buyer-fee-margin-guide.png'],
    [/venmo/i, '/blog/venmo-business-profile-fees-2026-tap-to-pay-goods-services-guide.png'],
    [/tiktok/i, '/blog/tiktok-shop-seller-fees-2026-complete-profit-margin-guide.png'],
    [/depop/i, '/blog/images/mercari-vs-depop-poshmark-ebay.png'],
    [/poshmark/i, '/blog/poshmark-fees-2026-complete-seller-guide-shipping-margins.png'],
    [/ebay/i, '/blog/ebay-seller-fees-2026-complete-managed-payments-schedule-guide.png'],
    [/amazon|fba/i, '/blog/amazon-fba-fees-2026-complete-seller-schedule-guide.png'],
    [/etsy/i, '/blog/etsy-seller-fees-2026-breakdown-listing-transaction-offsite-ads-guide.png'],
    [/shopify/i, '/blog/shopify-fees-calculator-2026-hidden-transaction-costs-guide.png'],
    [/cash-app|square/i, '/blog/credit-card-surcharge-formula-invoice-square-fees-guide.png'],
    [/1099|tax|schedule-c|section-154a|pseb/i, '/blog/1099-safe-harbor-rule-quarterly-estimated-taxes-guide.png'],
    [/meezan/i, '/blog/how-to-transfer-wise-to-meezan-bank-instantly.png'],
    [/hbl|ubl|mcb|allied|sadapay|nayapay|jazzcash/i, '/blog/meezan-vs-hbl-vs-ubl-freelance-remittance-rates-audit.png'],
    [/wise-vs-payoneer|payoneer-vs-wise/i, '/blog/wise-vs-payoneer-vs-elevate-pay-freelancer-comparison.png'],
    [/wise|remitly/i, '/blog/wise-vs-payoneer-fees-2026-freelancer-cross-border-withdrawal-guide.png'],
    [/payoneer/i, '/blog/indian-freelancers-paypal-alternatives-firc-guide.png'],
    [/fiverr/i, '/blog/upwork-vs-fiverr-freelancer-fees-2026-service-fee-comparison-guide.png'],
    [/upwork|freelance/i, '/blog/upwork-pakistan-lowest-withdrawal-fee-guide.png'],
    [/stripe/i, '/blog/stripe-vs-sadabiz-pakistan-freelancer-payment-guide.png'],
    [/paypal/i, '/blog/paypal-goods-and-services-fee-who-pays-calculator-guide.png'],
  ];
  for (const [rx, rel] of rules) {
    if (rx.test(slug) && fs.existsSync(path.join(process.cwd(), 'public', rel.replace(/^\//, '')))) {
      return rel;
    }
  }
  return '/og-image.png';
}

export async function GET() {
  const anchorTime = new Date('2026-11-27T12:00:00Z').getTime();

  const flagshipItems: { title: string; url: string; desc: string; category: string; imgRel: string }[] = [
    {
      title: '2026 Marketplace & Freelance Fee Benchmark Index (Open Dataset + JSON API)',
      url: `${BASE_URL}/research/2026-marketplace-fee-index`,
      desc: 'Compare verified 2026 seller commissions, FX spreads, and reverse gross-up equations across 18 platforms with free CSV, JSON, and REST API access. #ecommerce #freelancing #sellerfees #smartratecalcs',
      category: 'Open Financial Research',
      imgRel: '/blog/images/reverb-vs-ebay-music-gear.png',
    },
    {
      title: 'Reverb Seller Fee Calculator 2026: 5% Cap & 3.19% Processing Math',
      url: `${BASE_URL}/calculators/reverb-fee-calculator`,
      desc: 'Calculate exact 2026 Reverb 5% selling fees ($500 cap), 3.19% or 2.99% Preferred Seller tax-inclusive processing + $0.49, Bump ads, and net gear payouts. #reverbfee #musicgear #reseller #ecommerce',
      category: 'Music Gear Marketplace',
      imgRel: '/blog/reverb-seller-fees-2026-complete-gear-profit-margin-guide.png',
    },
    {
      title: 'Mercari Seller Fee Calculator 2026: Flat 10% & $0 Processing Math',
      url: `${BASE_URL}/calculators/mercari-fee-calculator`,
      desc: 'Calculate Mercari 2026 take-home profit under the flat 10% seller fee across item + buyer shipping, $0 payment processing, 3.6% buyer fee, and $3 Instant Pay vs $0 ACH. #mercariseller #reselling #profitcalculator',
      category: 'Reseller Marketplace',
      imgRel: '/blog/mercari-seller-fees-2026-flat-10-percent-buyer-fee-margin-guide.png',
    },
    {
      title: 'Venmo Business Fee Calculator 2026: 1.9% QR, Tap to Pay & 1.75% Instant',
      url: `${BASE_URL}/calculators/venmo-business-fee-calculator`,
      desc: 'Model Venmo Business Profile (1.9% + $0.10), Tap to Pay (2.29% + $0.10), Online Checkout (3.49% + $0.49), and reverse gross-up invoice math cleanly. #venmobusiness #smallbusiness #freelancepayments',
      category: 'Fintech Payments',
      imgRel: '/blog/venmo-business-profile-fees-2026-tap-to-pay-goods-services-guide.png',
    },
    {
      title: 'TikTok Shop Fee Calculator 2026: Official 6% Rate & Net Profit Math',
      url: `${BASE_URL}/calculators/tiktok-shop-fee-calculator`,
      desc: 'Calculate TikTok Shop US 6% referral fees ($0.30 minimum), creator affiliate commissions, FBT fulfillment deductions, and net margin per SKU. #tiktokshop #ecommerce #profitmargin',
      category: 'E-Commerce Marketplace',
      imgRel: '/blog/tiktok-shop-seller-fees-2026-complete-profit-margin-guide.png',
    },
    {
      title: 'Depop Fee Calculator 2026: 0% Seller Fee & Take-Home Profit Math',
      url: `${BASE_URL}/depop-fee-calculator`,
      desc: 'Calculate Depop net payouts under the 0% selling fee policy, 3.3% + $0.45 Depop Payments processing, and optional 8% boosted listing costs. #depopseller #resellertips #vintagefashion',
      category: 'Reseller Marketplace',
      imgRel: '/blog/images/mercari-vs-depop-poshmark-ebay.png',
    },
    {
      title: 'Amazon FBA & Referral Fee Calculator 2026: Profit Margin Breakdown',
      url: `${BASE_URL}/calculators/amazon-fba-fee-calculator`,
      desc: 'Calculate 8% to 15% Amazon referral commissions, 2026 FBA Pick & Pack tiers, inbound placement costs, and FBA vs FBM net margins. #amazonfba #amazonseller #ecommerce',
      category: 'E-Commerce Marketplace',
      imgRel: '/blog/amazon-fba-fees-2026-complete-seller-schedule-guide.png',
    },
    {
      title: 'Etsy Seller Fee & Offsite Ads Calculator 2026: True Net Payout',
      url: `${BASE_URL}/calculators/etsy-fee-calculator`,
      desc: 'Model $0.20 Etsy listing fees, 6.5% transaction cuts, 3% + $0.25 processing, and 12% to 15% Offsite Ads to protect handmade shop profits. #etsyseller #etsyshop #handmadebusiness',
      category: 'Craft Marketplace',
      imgRel: '/blog/etsy-seller-fees-2026-breakdown-listing-transaction-offsite-ads-guide.png',
    },
    {
      title: 'eBay Managed Payments Fee & Profit Calculator 2026 (13.25% + $0.30)',
      url: `${BASE_URL}/calculators/ebay-fee-calculator`,
      desc: 'Calculate 2026 eBay Managed Payments final value fees, Top Rated Plus 10% discounts, promoted listing percentages, and net profit per item. #ebayseller #ebayreseller #ecommerce',
      category: 'Reseller Marketplace',
      imgRel: '/blog/ebay-seller-fees-2026-complete-managed-payments-schedule-guide.png',
    },
    {
      title: 'Poshmark Fee Calculator 2026: $2.95 Flat vs 20% Commission Math',
      url: `${BASE_URL}/calculators/poshmark-fee-calculator`,
      desc: 'Calculate exact Poshmark seller payouts with 20% commission above $15, Offer to Likers shipping discounts, and reverse listing price targets. #poshmarkseller #poshmarktips #reselling',
      category: 'Fashion Marketplace',
      imgRel: '/blog/poshmark-fees-2026-complete-seller-guide-shipping-margins.png',
    },
    {
      title: 'PayPal Goods & Services Fee Calculator 2026 (3.49% + $0.49 & Reverse)',
      url: `${BASE_URL}/paypal-fee-calculator`,
      desc: 'Calculate PayPal commercial Goods and Services deductions, international cross-border FX markups, and exact invoice gross-up totals. #paypalfees #invoicing #freelancing',
      category: 'Payment Gateways',
      imgRel: '/blog/paypal-goods-and-services-fee-who-pays-calculator-guide.png',
    },
    {
      title: 'Stripe Fee & Cross-Border Payout Calculator 2026 (2.9% + $0.30)',
      url: `${BASE_URL}/stripe-fee-calculator`,
      desc: 'Model Stripe US card processing (2.9% + $0.30), 1.5% international card surcharges, and 1% currency conversion fees for SaaS and agencies. #stripefees #saas #ecommerce',
      category: 'Payment Gateways',
      imgRel: '/blog/stripe-vs-paypal-fees-2026-international-cross-border-comparison-guide.png',
    },
    {
      title: 'Square Card & Invoice Surcharge Calculator 2026 (Pass Fees Legally)',
      url: `${BASE_URL}/square-fee-calculator`,
      desc: 'Compute Square 3.3% + $0.30 invoice fees vs 2.6% + $0.15 in-person swipes and pass card processing cleanly onto client invoices. #squarefees #smallbusiness #invoicing',
      category: 'Payment Gateways',
      imgRel: '/blog/credit-card-surcharge-formula-invoice-square-fees-guide.png',
    },
    {
      title: 'Cash App Business Fee & Instant Transfer Calculator 2026 (2.75%)',
      url: `${BASE_URL}/calculators/cash-app-fee-calculator`,
      desc: 'Compare Cash for Business 2.75% merchant fees and 1.75% instant debit cashouts against standard $0 ACH bank settlements. #cashappbusiness #freelancerfinance #fintech',
      category: 'Fintech Payments',
      imgRel: '/blog/images/venmo-vs-cashapp-square-paypal.png',
    },
    {
      title: '1099 Self-Employment & Quarterly Tax Calculator 2026 (15.3% SE Tax)',
      url: `${BASE_URL}/1099-tax-calculator`,
      desc: 'Estimate IRS 15.3% self-employment tax, safe harbor quarterly payments, and Schedule C net taxable profit for freelancers and contractors. #1099taxes #freelancetips #taxplanning',
      category: 'Freelance Taxes',
      imgRel: '/blog/1099-safe-harbor-rule-quarterly-estimated-taxes-guide.png',
    },
    {
      title: 'Upwork Freelancer 10% Service Fee & Take-Home Calculator 2026',
      url: `${BASE_URL}/upwork-fee-calculator`,
      desc: 'Calculate exact net Upwork milestone take-home pay after the flat 10% freelancer cut and international withdrawal fees. #upworkfreelancer #remotework #freelancing',
      category: 'Freelance Payouts',
      imgRel: '/blog/images/upwork-annual-leakage-chart.png',
    },
    {
      title: 'Upwork to JazzCash, SadaPay & Pakistani Bank Calculator 2026',
      url: `${BASE_URL}/calculators/upwork-to-jazzcash-calculator`,
      desc: 'Compare Upwork direct PKR transfers ($0.99 + FX spread) against Payoneer, Wise, and US ACH checking routes to maximize PKR payouts. #upworkpakistan #freelancerpakistan #pkr',
      category: 'Freelance Payouts',
      imgRel: '/blog/upwork-pakistan-lowest-withdrawal-fee-guide.png',
    },
    {
      title: 'Fiverr Seller 20% Commission & Net Gig Payout Calculator 2026',
      url: `${BASE_URL}/fiverr-fee-calculator`,
      desc: 'Calculate net Fiverr order earnings after the 20% seller cut, tip fees, and Payoneer withdrawal spreads. #fiverrseller #freelanceincome #gigeconomy',
      category: 'Freelance Payouts',
      imgRel: '/blog/upwork-vs-fiverr-freelancer-fees-2026-service-fee-comparison-guide.png',
    },
    {
      title: 'Payoneer USD Withdrawal & 2% FX Spread Calculator 2026',
      url: `${BASE_URL}/payoneer-fee-calculator`,
      desc: 'Uncover Payoneer 2% local currency conversion spread and $3.15 ATM/bank fees compared with mid-market alternatives. #payoneer #freelancepayouts #fxspread',
      category: 'Cross-Border FX',
      imgRel: '/blog/wise-vs-payoneer-fees-2026-freelancer-cross-border-withdrawal-guide.png',
    },
  ];

  const flagshipXml = flagshipItems.map((item, i) => {
    const pubDate = new Date(anchorTime - i * 3600 * 1000 * 3).toUTCString();
    const asset = resolveLocalAsset(item.imgRel);
    const title = clampPinTitle(item.title);
    return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(item.category)}</category>
      <description><![CDATA[${item.desc}]]></description>
      <enclosure url="${asset.url}" length="${asset.length}" type="${asset.type}" />
      <media:content url="${asset.url}" medium="image" type="${asset.type}" />
      <media:title><![CDATA[${title}]]></media:title>
    </item>`;
  }).join('\n');

  const blogXml = BLOG_POSTS.map((post, i) => {
    const pubDate = new Date(post.updatedDate || post.publishedDate || anchorTime - (i + 20) * 3600 * 1000 * 12).toUTCString();
    const imgRel = matchBlogPng(post.slug);
    const asset = resolveLocalAsset(imgRel);
    const title = clampPinTitle(post.title);
    return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.category || 'Financial Guide')}</category>
      <description><![CDATA[${post.metaDesc} Read the complete 2026 breakdown and interactive calculator on SmartRateCalcs. #sellerfees #freelancefinance #2026guide]]></description>
      <enclosure url="${asset.url}" length="${asset.length}" type="${asset.type}" />
      <media:content url="${asset.url}" medium="image" type="${asset.type}" />
      <media:title><![CDATA[${title}]]></media:title>
    </item>`;
  }).join('\n');

  const EXCLUDED_SLUGS = new Set([
    'tiktok-shop-seller-fee-calculator',
    'upwork-to-jazzcash-payout-calculator',
    'ebay-seller-fee-and-profit-calculator',
    'amazon-fba-profit-margin-calculator',
    'etsy-seller-fee-and-profit-calculator',
    'poshmark-seller-fee-calculator',
    'cash-app-business-fee-calculator',
    'venmo-business-fee-calculator',
    'fiverr-commission-fee-calculator',
    'paypal-goods-and-services-fee-calculator',
    'remitly-to-pakistan-fee-calculator',
    'upwork-service-fee-payout-calculator',
    'wise-to-bdo-bank-php-calculator',
    'payoneer-to-gcash-philippines-calculator',
  ]);

  const programmaticXml = PROGRAMMATIC_CALCULATORS
    .filter((c) => !EXCLUDED_SLUGS.has(c.slug))
    .slice(0, 30)
    .map((c, i) => {
      const pubDate = new Date(anchorTime - (i + 35) * 3600 * 1000 * 12).toUTCString();
      const imgRel = matchCalculatorPng(c.slug);
      const asset = resolveLocalAsset(imgRel);
      const title = clampPinTitle(`${c.title} (2026)`);
      return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${BASE_URL}/calculators/${c.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/calculators/${c.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>2026 Fee Calculators</category>
      <description><![CDATA[${c.metaDesc} Free instant take-home payout calculator on SmartRateCalcs. #payoutcalculator #freelance #ecommerce]]></description>
      <enclosure url="${asset.url}" length="${asset.length}" type="${asset.type}" />
      <media:content url="${asset.url}" medium="image" type="${asset.type}" />
      <media:title><![CDATA[${title}]]></media:title>
    </item>`;
    }).join('\n');

  const lastBuildDate = new Date(anchorTime).toUTCString();
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SmartRateCalcs | 2026 Fee Calculators, FX Spreads &amp; Payout Research</title>
    <link>${BASE_URL}</link>
    <description>Verified 2026 seller fee calculators, reverse invoice pricing equations, and cross-border remittance benchmarks for freelancers and e-commerce sellers.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <ttl>60</ttl>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${flagshipXml}
${blogXml}
${programmaticXml}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800',
    },
  });
}
