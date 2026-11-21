import { NextResponse } from 'next/server';
import { PROGRAMMATIC_CALCULATORS } from '../../../data/programmatic-calculators';
import { BLOG_POSTS } from '../../../data/blog-posts';

export const dynamic = 'force-dynamic';

const HOST = 'www.smartratecalcs.com';
const KEY = '4a8f9c2d1e0b7a6f5e3c8d1b9a2e4f7c';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  // Simple security token check
  if (token !== 'smartrate_index_2026') {
    return NextResponse.json(
      { error: 'Unauthorized. Provide valid ?token=smartrate_index_2026' },
      { status: 401 }
    );
  }

  const baseUrl = `https://${HOST}`;

  const staticUrls = [
    baseUrl,
    `${baseUrl}/calculators/poshmark-fee-calculator`,
    `${baseUrl}/calculators/amazon-fba-fee-calculator`,
    `${baseUrl}/calculators/ebay-fee-calculator`,
    `${baseUrl}/calculators/etsy-fee-calculator`,
    `${baseUrl}/calculators/cash-app-fee-calculator`,
    `${baseUrl}/calculators/whatnot-fee-calculator`,
    `${baseUrl}/calculators/upwork-to-jazzcash-calculator`,
    `${baseUrl}/calculators/tiktok-shop-fee-calculator`,
    `${baseUrl}/depop-fee-calculator`,
    `${baseUrl}/1099-tax-calculator`,
    `${baseUrl}/square-fee-calculator`,
    `${baseUrl}/paypal-fee-calculator`,
    `${baseUrl}/stripe-fee-calculator`,
    `${baseUrl}/upwork-fee-calculator`,
    `${baseUrl}/fiverr-fee-calculator`,
    `${baseUrl}/payoneer-fee-calculator`,
    `${baseUrl}/freelance-hourly-rate-calculator`,
    `${baseUrl}/blog`,
    `${baseUrl}/about`,
    `${baseUrl}/privacy`,
    `${baseUrl}/terms`,
    `${baseUrl}/disclaimer`,
  ];

  const calcUrls = PROGRAMMATIC_CALCULATORS.map((c) => `${baseUrl}/calculators/${c.slug}`);
  const blogUrls = BLOG_POSTS.map((b) => `${baseUrl}/blog/${b.slug}`);
  const allUrls = [...staticUrls, ...calcUrls, ...blogUrls];

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: allUrls,
  };

  const endpoints = ['https://api.indexnow.org/indexnow', 'https://www.bing.com/indexnow'];
  const results = [];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      results.push({
        endpoint,
        status: res.status,
        statusText: res.statusText,
        ok: res.status === 200 || res.status === 202,
      });
    } catch (e: any) {
      results.push({
        endpoint,
        status: 500,
        statusText: e.message,
        ok: false,
      });
    }
  }

  return NextResponse.json({
    success: true,
    totalUrlsSubmitted: allUrls.length,
    timestamp: new Date().toISOString(),
    results,
  });
}
