import { NextResponse } from 'next/server';
import { PROGRAMMATIC_CALCULATORS } from '@/data/programmatic-calculators';
import { BLOG_POSTS } from '@/data/blog-posts';

export const dynamic = 'force-dynamic';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function resolvePinImage(baseUrl: string, images: string[] | undefined, slug: string): { url: string; type: string } {
  let raw = (images && images.length > 0) ? images[0] : `${baseUrl}/blog/${slug}.png`;
  if (raw.startsWith('/')) raw = `${baseUrl}${raw}`;
  if (raw.toLowerCase().endsWith('.svg')) raw = `${baseUrl}/blog/${slug}.png`;
  const type = raw.toLowerCase().includes('.png') ? 'image/png' : 'image/jpeg';
  return { url: escapeXml(raw), type };
}

export async function GET() {
  const baseUrl = 'https://www.smartratecalcs.com';
  const defaultOg = `${baseUrl}/og-image.png`;
  const baseTimestamp = new Date('2026-11-25T12:00:00Z').getTime();

  // 1. Flagship Core Calculators
  const flagshipCalculators: { title: string; url: string; desc: string; category: string; img?: string }[] = [
    {
      title: 'Reverb Seller Fee Calculator 2026: 5% Cap & 3.19% Processing Math',
      url: `${baseUrl}/calculators/reverb-fee-calculator`,
      desc: 'Free 2026 Reverb fee calculator. Calculate exact 5% selling fee ($500 cap), 3.19% + $0.49 tax-inclusive payments processing, Preferred Seller 2.99%, Bump ads, and reverse target pricing.',
      category: 'Music Gear Marketplace',
      img: `${baseUrl}/blog/reverb-seller-fees-2026-complete-gear-profit-margin-guide.png`,
    },
    {
      title: 'Mercari Seller Fee Calculator 2026: Flat 10% & $0 Processing Math',
      url: `${baseUrl}/calculators/mercari-fee-calculator`,
      desc: 'Calculate exact Mercari payouts under the 10% flat seller fee (Item + Buyer Shipping), $0 payment processing, 3.6% buyer fee totals, and $3 Instant Pay vs $0 ACH.',
      category: 'Reseller Marketplace',
      img: `${baseUrl}/blog/mercari-seller-fees-2026-flat-10-percent-buyer-fee-margin-guide.png`,
    },
    {
      title: 'Venmo Business Fee Calculator 2026: 1.9% QR, Tap to Pay & 1.75% Instant',
      url: `${baseUrl}/calculators/venmo-business-fee-calculator`,
      desc: 'Calculate Venmo Business Profile (1.9% + $0.10), Tap to Pay contactless (2.29% + $0.10), Online Checkout (3.49% + $0.49), Instant Transfer 1.75% ($25 cap), and exact reverse invoices.',
      category: 'Fintech Payments',
      img: `${baseUrl}/blog/venmo-business-profile-fees-2026-tap-to-pay-goods-services-guide.png`,
    },
    {
      title: 'TikTok Shop Fee Calculator 2026: Official 6% Rate & Profit Math',
      url: `${baseUrl}/calculators/tiktok-shop-fee-calculator`,
      desc: 'Free 2026 TikTok Shop fee calculator. Calculate exact seller payouts under the official 6% US referral rate, creator affiliate commissions, and net profit margins.',
      category: 'E-Commerce Marketplace',
    },
    {
      title: 'Depop Fee Calculator 2026: 0% Seller Fee & Take-Home Profit Math',
      url: `${baseUrl}/depop-fee-calculator`,
      desc: 'Calculate exact seller payouts under Depop 0% selling fee policy, 3.3% + $0.45 payment processing, and optional 8% boosting fees.',
      category: 'Reseller Marketplace',
    },
    {
      title: 'Cash App Fee & Payout Calculator (2026)',
      url: `${baseUrl}/calculators/cash-app-fee-calculator`,
      desc: 'Calculate exact deductions for 1.75% instant debit card transfers, 2.75% Cash for Business merchant receipts, and standard free deposits.',
      category: 'Fintech Payments',
    },
    {
      title: 'Amazon FBA & Seller Fee Calculator (2026)',
      url: `${baseUrl}/calculators/amazon-fba-fee-calculator`,
      desc: 'Calculate 8% to 15% category referral fees, FBA Pick & Pack, inbound placement costs, and FBA vs FBM net profit margins.',
      category: 'E-Commerce Marketplace',
    },
    {
      title: 'Etsy Fee & Profit Calculator (2026)',
      url: `${baseUrl}/calculators/etsy-fee-calculator`,
      desc: 'Calculate 6.5% transaction fees, $0.20 listing renewal fees, 3% + $0.25 payment processing, and optional offsite ads deductions.',
      category: 'Craft Marketplace',
    },
    {
      title: 'eBay Fee & Profit Calculator (2026)',
      url: `${baseUrl}/calculators/ebay-fee-calculator`,
      desc: 'Calculate 13.25% Managed Payments final value fees, $0.30 fixed cut, Top Rated Plus discounts, and net seller take-home.',
      category: 'Reseller Marketplace',
    },
    {
      title: 'Poshmark Fee & Profit Calculator (2026)',
      url: `${baseUrl}/calculators/poshmark-fee-calculator`,
      desc: 'Calculate official 20% commission, $2.95 sub-$15 flat tiers, Offer to Likers shipping discounts, and reverse target pricing.',
      category: 'Fashion Marketplace',
    },
    {
      title: 'Upwork to JazzCash & Local Bank Calculator (Pakistan 2026)',
      url: `${baseUrl}/calculators/upwork-to-jazzcash-calculator`,
      desc: 'Compare Upwork direct local bank transfers vs Payoneer to JazzCash. Real-time PKR conversion rates and lowest withdrawal fee routing.',
      category: 'Freelance Payouts',
    },
  ];

  const flagshipXml = flagshipCalculators.map((calc, i) => {
    const pubDate = new Date(baseTimestamp - i * 3600 * 1000 * 6).toUTCString();
    const imgUrl = calc.img || defaultOg;
    return `    <item>
      <title><![CDATA[${calc.title}]]></title>
      <link>${calc.url}</link>
      <guid isPermaLink="true">${calc.url}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${calc.category}</category>
      <description><![CDATA[${calc.desc} Free instant calculation tool with complete 2026 fee breakdowns.]]></description>
      <enclosure url="${imgUrl}" length="0" type="image/png" />
      <media:content url="${imgUrl}" medium="image" />
    </item>`;
  }).join('\n');

  // 2. Blog Posts (with verified unique PNG/JPG image enclosures)
  const blogXml = BLOG_POSTS.map((post) => {
    const pubDate = new Date(post.updatedDate || post.publishedDate || '2026-11-24').toUTCString();
    const img = resolvePinImage(baseUrl, post.images, post.slug);
    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.metaDesc}]]></description>
      <enclosure url="${img.url}" length="0" type="${img.type}" />
      <media:content url="${img.url}" medium="image" />
    </item>`;
  }).join('\n');

  // 3. Programmatic Top Corridors (30 canonical tools)
  const EXCLUDED_SLUGS = new Set([
    'tiktok-shop-seller-fee-calculator',
    'upwork-to-jazzcash-payout-calculator',
    'ebay-seller-fee-and-profit-calculator',
    'amazon-fba-profit-margin-calculator',
    'etsy-seller-fee-and-profit-calculator',
    'poshmark-seller-fee-calculator',
    'cash-app-business-fee-calculator',
    'venmo-business-fee-calculator',
  ]);

  const programmaticXml = PROGRAMMATIC_CALCULATORS
    .filter((c) => !EXCLUDED_SLUGS.has(c.slug))
    .slice(0, 30)
    .map((c, i) => {
      const pubDate = new Date(baseTimestamp - (i + 10) * 3600 * 1000 * 12).toUTCString();
      return `    <item>
      <title><![CDATA[${c.title} (2026)]]></title>
      <link>${baseUrl}/calculators/${c.slug}</link>
      <guid isPermaLink="true">${baseUrl}/calculators/${c.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${c.metaDesc}]]></description>
      <enclosure url="${defaultOg}" length="0" type="image/png" />
      <media:content url="${defaultOg}" medium="image" />
    </item>`;
    }).join('\n');

  const allItems = `${flagshipXml}\n${blogXml}\n${programmaticXml}`;

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SmartRateCalcs | Independent Financial &amp; Fee Intelligence</title>
    <link>${baseUrl}</link>
    <description>Accurate, real-time fee calculators, seller profit margin models, and payout formulas for e-commerce, freelancers, and digital businesses.</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
${allItems}
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
