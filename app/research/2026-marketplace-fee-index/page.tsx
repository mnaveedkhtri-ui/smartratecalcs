import { Metadata } from 'next';
import Link from 'next/link';
import ResearchBenchmarkClient from '../../../components/ResearchBenchmarkClient';
import { SiteLegalFooter } from '../../../components/SiteLegalFooter';

export const metadata: Metadata = {
  title: '2026 Marketplace Fee & Freelance Payout Benchmark Index | SmartRateCalcs Research',
  description:
    'Open CC BY 4.0 dataset and JSON API comparing 2026 seller commissions, payment gateway surcharges, FX spreads, and reverse pricing equations across 18 platforms.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/research/2026-marketplace-fee-index',
  },
  openGraph: {
    title: '2026 Marketplace Fee & Freelance Payout Benchmark Index',
    description:
      'Compare verified 2026 fee formulas, effective take rates, and open JSON API endpoints across eBay, Etsy, Mercari, Reverb, Venmo, Stripe, PayPal, Upwork, Fiverr, Wise & Payoneer.',
    url: 'https://www.smartratecalcs.com/research/2026-marketplace-fee-index',
    type: 'article',
  },
};

export default function MarketplaceFeeIndexResearchPage() {
  const datasetJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Dataset',
        '@id': 'https://www.smartratecalcs.com/research/2026-marketplace-fee-index#dataset',
        name: 'SmartRateCalcs 2026 Marketplace, Payment Gateway & Freelance Fee Benchmark Dataset',
        description:
          'Verified 2026 percentage commissions, fixed transaction surcharges, foreign exchange spread markups, and closed-form reverse gross-up pricing parameters across 18 online platforms.',
        url: 'https://www.smartratecalcs.com/research/2026-marketplace-fee-index',
        license: 'https://creativecommons.org/licenses/by/4.0/',
        isAccessibleForFree: true,
        dateModified: '2026-11-27',
        creator: {
          '@type': 'Person',
          name: 'Muhammad Naveed',
          url: 'https://www.smartratecalcs.com/about',
        },
        publisher: {
          '@type': 'Organization',
          name: 'SmartRateCalcs',
          url: 'https://www.smartratecalcs.com',
        },
        distribution: [
          {
            '@type': 'DataDownload',
            encodingFormat: 'application/json',
            contentUrl: 'https://www.smartratecalcs.com/api/v1/rates',
          },
          {
            '@type': 'DataDownload',
            encodingFormat: 'text/csv',
            contentUrl: 'https://www.smartratecalcs.com/data/2026-marketplace-fees.csv',
          },
          {
            '@type': 'DataDownload',
            encodingFormat: 'application/json',
            contentUrl: 'https://www.smartratecalcs.com/data/2026-marketplace-fees.json',
          },
        ],
        measurementTechnique: 'Audited platform published fee tables and closed-form reverse pricing verification',
      },
      {
        '@type': 'TechArticle',
        headline: '2026 Marketplace Fee & Freelance Payout Benchmark Index',
        url: 'https://www.smartratecalcs.com/research/2026-marketplace-fee-index',
        datePublished: '2026-11-27',
        dateModified: '2026-11-27',
        author: {
          '@type': 'Person',
          name: 'Muhammad Naveed',
          url: 'https://www.smartratecalcs.com/about',
        },
        publisher: {
          '@type': 'Organization',
          name: 'SmartRateCalcs',
          url: 'https://www.smartratecalcs.com',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.smartratecalcs.com/' },
          { '@type': 'ListItem', position: 2, name: '2026 Marketplace Fee Benchmark Index', item: 'https://www.smartratecalcs.com/research/2026-marketplace-fee-index' },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#070d17] text-slate-800 dark:text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400">
            <Link href="/" className="hover:underline">SmartRateCalcs</Link>
            <span>/</span>
            <span>Research &amp; Open Data</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            2026 Marketplace Seller Fees &amp; Freelance Payout Benchmark Index
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            A standardized empirical dataset auditing effective take rates, hidden foreign exchange spreads, tax-inclusive card fees, and reverse gross-up pricing across 18 leading commerce and freelance platforms. Licensed under{' '}
            <strong className="text-slate-900 dark:text-white">CC BY 4.0</strong> for open developer and editorial citation.
          </p>

          <div className="flex flex-wrap gap-3 pt-2 text-xs font-mono font-bold">
            <a
              href="/api/v1/rates"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 transition"
            >
              Live JSON API (/api/v1/rates)
            </a>
            <a
              href="/data/2026-marketplace-fees.csv"
              download
              className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-emerald-500 px-4 py-2.5 transition"
            >
              Download CSV Dataset
            </a>
            <a
              href="/data/2026-marketplace-fees.json"
              download
              className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-emerald-500 px-4 py-2.5 transition"
            >
              Download JSON Snapshot
            </a>
            <a
              href="/openapi.json"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-emerald-500 px-4 py-2.5 transition"
            >
              OpenAPI 3.1 Spec
            </a>
          </div>
        </div>

        <ResearchBenchmarkClient />

        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Methodology &amp; Reverse Pass-Through Formula
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            A common invoicing mistake is multiplying a target net payout by <code className="font-mono text-emerald-600 dark:text-emerald-400">(1 + feeRate)</code>. Because payment processors deduct their percentage fee from the increased gross charge itself, naive markups consistently under-recover merchant proceeds. SmartRateCalcs computes break-even gross totals using the closed-form equation:
          </p>
          <pre className="rounded-xl bg-slate-950 text-emerald-300 p-4 text-xs sm:text-sm font-mono overflow-x-auto">
            Gross Charge = (Target Net + Fixed Fee USD) / (1 - Total Percentage Fee Rate)
          </pre>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Open-source reference tests verifying these formulas are maintained at{' '}
            <a
              href="https://github.com/mnaveedkhtri-ui/2026-fee-and-ergonomics-formulas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 dark:text-emerald-400 underline font-medium"
            >
              github.com/mnaveedkhtri-ui/2026-fee-and-ergonomics-formulas
            </a>
            .
          </p>
        </section>
      </main>

      <SiteLegalFooter />
    </div>
  );
}
