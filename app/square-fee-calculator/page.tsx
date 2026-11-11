import { Metadata } from 'next';
import Link from 'next/link';
import SquareCalculatorWidget from '../../components/SquareCalculatorWidget';
import ThemeToggle from '../../components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Square Fee Calculator (2026) | In-Person POS & Online Merchant Rates',
  description:
    'Free 2026 Square fee calculator. Calculate exact deductions for Square in-person (2.6% + $0.10), online sales (2.9% + $0.30), invoices, and virtual terminal payments.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/square-fee-calculator',
  },
  openGraph: {
    title: 'Square Fee Calculator 2026 | POS, Invoices & Reverse Calculator',
    description:
      'Calculate exact deductions on Square merchant processing. Compare savings against Stripe and reverse-calculate how much to bill customers.',
    url: 'https://www.smartratecalcs.com/square-fee-calculator',
    type: 'website',
    images: [
      {
        url: 'https://www.smartratecalcs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Square Fee Calculator - SmartRateCalcs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Square Fee Calculator 2026 (Live Rates & Reverse Formula)',
    description:
      'Instantly calculate Square POS card processing fees, invoice costs, and compare directly against Stripe.',
    images: ['https://www.smartratecalcs.com/og-image.png'],
  },
};

export default function SquareCalculatorPage() {
  const pageUrl = 'https://www.smartratecalcs.com/square-fee-calculator';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Square processing fee in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Square charges 2.6% + $0.10 for standard in-person card payments (swipe, chip, Apple Pay, Google Pay). For online store checkout, the rate is 2.9% + $0.30. Invoices paid online cost 3.3% + $0.30, and manually keyed transactions cost 3.5% + $0.15.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does Square take on a $100 transaction?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'On a standard in-person sale of $100, Square deducts 2.6% ($2.60) + $0.10 = $2.70. You receive $97.30 deposited into your bank account. For an online payment, Square deducts 2.9% + $0.30 = $3.20, netting you $96.80.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Square cheaper than Stripe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For in-person retail sales, Square is significantly cheaper (2.6% + $0.10 vs Stripe Terminal 2.7% + $0.05). For online eCommerce sales, both Square and Stripe charge an identical rate of 2.9% + $0.30.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Square charge a monthly subscription fee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The standard Square POS plan has no monthly fees, no setup fees, and no cancellation penalties. You only pay processing fees when you make a sale.',
        },
      },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SmartRateCalcs Square Fee Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    url: pageUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'Muhammad Naveed',
      url: 'https://naveed-portfolio-kappa.vercel.app/',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070d17] text-slate-800 dark:text-slate-100 transition-colors duration-200">
        {/* Navigation Breadcrumb */}
        <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-800 dark:text-slate-200 font-bold">Square Fee Calculator</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <Link
                href="/stripe-fee-calculator"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 transition-all"
              >
                <span>Compare Stripe</span>
              </Link>
              <Link
                href="/paypal-fee-calculator"
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 transition-all"
              >
                <span>PayPal Fee</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="pt-10 pb-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 text-xs font-bold mb-3 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>2026 Square Official Pricing Schedule &bull; US &amp; Global Rates</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
            Square Fee Calculator (2026 Live Rates)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Calculate exact merchant processing costs for Square in-person POS, online checkout, virtual terminal, and reverse-calculate how much to bill clients to cover merchant expenses.
          </p>
        </section>

        {/* Calculator Widget */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <SquareCalculatorWidget isStandalone={true} />
        </section>

        {/* Hire Naveed Systems Engineering Callout for US/UK Founders */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center font-bold text-xl border border-slate-700 shrink-0">
                <i className="fa-solid fa-code"></i>
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-white">Need Custom Square API, POS Automation, or Python Webhooks?</h3>
                <p className="text-xs sm:text-sm text-slate-300">Automate your inventory sync, custom checkout flows, automated QuickBooks sync, and client invoicing.</p>
              </div>
            </div>
            <a
              href="https://naveed-portfolio-kappa.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-bold transition-all shadow-md shrink-0 flex items-center gap-2"
            >
              Hire Muhammad Naveed &rarr;
            </a>
          </div>
        </section>

        {/* Educational Content & Fee Reference Table */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white dark:bg-slate-900/90 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
            {/* Rates Table */}
            <div>
              <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-4">
                2026 Square Fee Breakdown Table
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 uppercase font-mono">
                      <th className="py-3 px-4">Transaction Type</th>
                      <th className="py-3 px-4">Percentage Fee</th>
                      <th className="py-3 px-4">Fixed Fee</th>
                      <th className="py-3 px-4">Fee on $100</th>
                      <th className="py-3 px-4">Net Payout</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">In-Person (Swipe / Chip / Tap)</td>
                      <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">2.60%</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$0.10</td>
                      <td className="py-3 px-4 text-rose-600 dark:text-rose-400">-$2.70</td>
                      <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">$97.30</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">Square Online &amp; eCommerce</td>
                      <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">2.90%</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$0.30</td>
                      <td className="py-3 px-4 text-rose-600 dark:text-rose-400">-$3.20</td>
                      <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">$96.80</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">Square Invoices (Card on File)</td>
                      <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">3.30%</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$0.30</td>
                      <td className="py-3 px-4 text-rose-600 dark:text-rose-400">-$3.60</td>
                      <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">$96.40</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">Manually Keyed / Virtual Terminal</td>
                      <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">3.50%</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$0.15</td>
                      <td className="py-3 px-4 text-rose-600 dark:text-rose-400">-$3.65</td>
                      <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">$96.35</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQs */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-6">
                Frequently Asked Questions (Square Fees 2026)
              </h2>
              <div className="space-y-4">
                {faqSchema.mainEntity.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80"
                  >
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.acceptedAnswer.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
