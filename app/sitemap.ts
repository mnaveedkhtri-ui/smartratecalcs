import { MetadataRoute } from 'next';
import { PROGRAMMATIC_CALCULATORS } from '../data/programmatic-calculators';
import { BLOG_POSTS } from '../data/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.smartratecalcs.com';
  const coreUpdateDate = new Date('2026-11-25T00:00:00Z');
  const legalUpdateDate = new Date('2026-11-01T00:00:00Z');

  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/depop-fee-calculator`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/calculators/tiktok-shop-fee-calculator`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/calculators/cash-app-fee-calculator`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/calculators/etsy-fee-calculator`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/calculators/whatnot-fee-calculator`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/calculators/ebay-fee-calculator`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/calculators/amazon-fba-fee-calculator`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/calculators/poshmark-fee-calculator`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/calculators/reverb-fee-calculator`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/calculators/mercari-fee-calculator`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/calculators/venmo-business-fee-calculator`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/paypal-fee-calculator`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/stripe-fee-calculator`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/square-fee-calculator`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/1099-tax-calculator`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/upwork-fee-calculator`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/calculators/upwork-to-jazzcash-calculator`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/fiverr-fee-calculator`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/payoneer-fee-calculator`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/remitly-pakistan-rate`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/freelance-hourly-rate-calculator`,
      lastModified: coreUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: legalUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: legalUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: legalUpdateDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: legalUpdateDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: legalUpdateDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Filter out duplicate programmatic slugs that are canonicalized to dedicated flagship calculators
  const REWRITTEN_OR_FLAGSHIP_DUPLICATES = new Set([
    'upwork-to-jazzcash-payout-calculator',
    'ebay-seller-fee-and-profit-calculator',
    'amazon-fba-profit-margin-calculator',
    'etsy-seller-fee-and-profit-calculator',
    'poshmark-seller-fee-calculator',
    'cash-app-business-fee-calculator',
    'tiktok-shop-seller-fee-calculator',
    'venmo-business-fee-calculator',
  ]);

  // Dynamic Programmatic SEO Calculator Pages
  const dynamicCalculatorPages: MetadataRoute.Sitemap = PROGRAMMATIC_CALCULATORS
    .filter((calc) => !REWRITTEN_OR_FLAGSHIP_DUPLICATES.has(calc.slug))
    .map((calc) => ({
      url: `${baseUrl}/calculators/${calc.slug}`,
      lastModified: coreUpdateDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    }));

  // Dynamic High-Authority Blog Guides
  const dynamicBlogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedDate || post.publishedDate || '2026-11-24'),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticPages, ...dynamicCalculatorPages, ...dynamicBlogPages];
}
