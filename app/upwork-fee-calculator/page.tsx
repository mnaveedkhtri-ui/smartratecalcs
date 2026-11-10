import { Metadata } from 'next';
import Link from 'next/link';
import UpworkCalculatorWidget from '../../components/UpworkCalculatorWidget';
import ThemeToggle from '../../components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Upwork Fee Calculator (2026) | Instant 10% Service Fee & Reverse Bid Tool',
  description:
    'Free 2026 Upwork fee calculator. Calculate exact deductions on Upwork flat 10% freelancer service fees, Direct Contracts (3.4%), local bank withdrawal spreads, and reverse bid proposals.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/upwork-fee-calculator',
  },
  openGraph: {
    title: 'Upwork Fee Calculator 2026 | 10% Flat Service Fee & Reverse Proposal Tool',
    description:
      'Calculate exact net take-home earnings from Upwork contracts. Reverse calculate how much to bid so you pocket your target rate after the 10% service fee and payout charges.',
    url: 'https://www.smartratecalcs.com/upwork-fee-calculator',
    type: 'website',
    images: [
      {
        url: 'https://www.smartratecalcs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Upwork Fee Calculator - SmartRateCalcs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upwork Fee Calculator 2026 (Live 10% Service Fee & Reverse Bid Formula)',
    description:
      'Instantly calculate Upwork freelancer fees, client marketplace costs, payout methods, and reverse bid requirements.',
    images: ['https://www.smartratecalcs.com/og-image.png'],
  },
};

export default function UpworkCalculatorPage() {
  const pageUrl = 'https://www.smartratecalcs.com/upwork-fee-calculator';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the Upwork freelancer service fee in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Upwork charges a flat 10% freelancer service fee on all earnings across all contracts (fixed-price, hourly, and Project Catalog). This replaced the legacy tiered system (20% for first $500, 10% up to $10,000, 5% beyond).',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does Upwork take for a $1,000 project?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'On a standard $1,000 USD contract, Upwork deducts a 10% service fee ($100), leaving you with $900 USD gross take-home. If you withdraw via free US ACH (Wise/Elevate), you keep all $900. If you withdraw directly to a local bank, Upwork charges $0.99 plus an embedded ~2.75% exchange rate spread.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I calculate how much to bid on Upwork so I receive an exact amount?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To reverse-calculate your Upwork proposal bid, divide your desired take-home amount by 0.90 (since Upwork takes 10%). For example, to pocket exactly $500, your proposal bid must be: $500 / 0.90 = $555.56 USD.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the fee for Upwork Direct Contracts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Upwork Direct Contracts carry a reduced flat fee of only 3.4% for freelancers, with 0% fees charged to the client. This allows you to bring outside clients into Upwork escrow for payment protection at a fraction of the standard 10% cost.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the cheapest way to withdraw money from Upwork internationally?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The cheapest method is adding a US checking account (ACH) via Wise, Elevate Pay, or Payoneer US receiving accounts. Upwork charges $0.00 for US ACH transfers and does not take a currency exchange spread, saving freelancers 2.5% to 3.0% on every withdrawal compared to direct local bank deposits.',
        },
      },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SmartRateCalcs Upwork Fee Calculator',
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
              <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-800 dark:text-slate-200 font-bold">Upwork Fee Calculator</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <Link
                href="/paypal-fee-calculator"
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 transition-all"
              >
                <span>PayPal Calculator</span>
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="pt-10 pb-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3">
            <i className="fa-solid fa-calculator text-emerald-600 dark:text-emerald-400"></i>
            <span>Updated for 2026 Upwork 10% Flat Service Fee Schedule</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
            Upwork Fee &amp; Take-Home Calculator (2026)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Calculate exact deductions on Upwork flat 10% freelancer service fees, Direct Contracts (3.4%), withdrawal currency conversion spreads, and reverse-calculate how much to bid to pocket your target rate.
          </p>
        </section>

        {/* Calculator Widget */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <UpworkCalculatorWidget isStandalone={true} />
        </section>

        {/* Hire Naveed Systems Engineering Callout */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl border border-emerald-500/40 shrink-0">
                <i className="fa-solid fa-code"></i>
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-white">Need Custom Python, API Automations, or Full-Stack Systems?</h3>
                <p className="text-xs sm:text-sm text-slate-300">Automate client workflows, scraper pipelines, or custom web apps with senior production engineering.</p>
              </div>
            </div>
            <a
              href="https://naveed-portfolio-kappa.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold transition-all shadow-md shrink-0 flex items-center gap-2"
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
                2026 Upwork Fee Structure &amp; Commission Summary
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                      <th className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Contract / Transaction Type</th>
                      <th className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Freelancer Cut</th>
                      <th className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Client Marketplace Fee</th>
                      <th className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Best Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr>
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Standard Upwork Contract</td>
                      <td className="py-3 px-4 font-mono font-bold text-rose-600 dark:text-rose-400">10.0%</td>
                      <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">5.0% + $4.95 initiation</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">All standard client contracts, fixed-price milestones, and hourly jobs.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Upwork Direct Contracts</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">3.4%</td>
                      <td className="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400">0.0% (Free)</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Outside clients brought to Upwork for secure escrow without paying high platform fees.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Enterprise Tier Clients</td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">10.0% (or 5.0% custom)</td>
                      <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">Custom negotiated</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Fortune 500 and dedicated managed accounts on Upwork Enterprise.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Project Catalog Purchases</td>
                      <td className="py-3 px-4 font-mono font-bold text-rose-600 dark:text-rose-400">10.0%</td>
                      <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">5.0%</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Pre-packaged gig purchases made directly by clients on your profile.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Formula Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <i className="fa-solid fa-arrow-right-arrow-left text-emerald-600 dark:text-emerald-400"></i>
                  <span>The Reverse Bid Formula</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  When a client asks for a fixed quote or you want to receive an exact net amount in your bank, use this formula to offset Upwork's 10% service fee:
                </p>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                  Proposal Bid = Desired Net Take-Home / 0.90
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Example: If you want to take home exactly $1,000 USD: $1,000 / 0.90 = <strong className="text-slate-900 dark:text-white">$1,111.11 USD</strong>.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <i className="fa-solid fa-shield-halved text-indigo-600 dark:text-indigo-400"></i>
                  <span>Beware of Direct Bank FX Spread</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Most international freelancers lose more money on currency conversion than the $0.99 withdrawal fee:
                </p>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-4">
                  <li><strong>Direct Local Bank:</strong> Charges $0.99 + Upwork applies a 2.5% to 3.0% margin below the Google interbank rate.</li>
                  <li><strong>US Bank (ACH):</strong> 100% free ($0.00) transfer with zero exchange rate markup when using Wise or Elevate Pay.</li>
                </ul>
              </div>
            </div>

            {/* FAQs */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-6">
                Frequently Asked Questions (Upwork Fees 2026)
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
            {/* Ecosystem Cross-Links Mesh */}
            <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
              <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-4">
                Explore More Freelance &amp; Payout Tools
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Link
                  href="/fiverr-fee-calculator"
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#1dbf73] transition-all group"
                >
                  <div className="text-[10px] font-bold text-[#1dbf73] uppercase font-mono mb-1">
                    Freelance Marketplace
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#1dbf73] transition-colors">
                    Fiverr Fee Calculator &rarr;
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">20% cut and reverse gig pricing.</p>
                </Link>

                <Link
                  href="/payoneer-fee-calculator"
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500 transition-all group"
                >
                  <div className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase font-mono mb-1">
                    Payout Engine
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">
                    Payoneer Fee Calculator &rarr;
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Unmask 2% hidden bank FX spread and card costs.</p>
                </Link>

                <Link
                  href="/freelance-hourly-rate-calculator"
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 transition-all group"
                >
                  <div className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase font-mono mb-1">
                    Pricing Architect
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                    Hourly Rate Calculator &rarr;
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Factor non-billable hours, taxes, overhead.</p>
                </Link>

                <Link
                  href="/calculators/wise-vs-payoneer-fee-calculator"
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-all group"
                >
                  <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase font-mono mb-1">
                    Comparative
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    Wise vs Payoneer Fee Calculator &rarr;
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Compare net local bank conversion.</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
