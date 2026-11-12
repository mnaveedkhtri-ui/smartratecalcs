import { Metadata } from 'next';
import Link from 'next/link';
import Tax1099CalculatorWidget from '../../components/Tax1099CalculatorWidget';
import ThemeToggle from '../../components/ThemeToggle';
import { SiteLegalFooter } from '../../components/SiteLegalFooter';

export const metadata: Metadata = {
  title: '1099 Tax Calculator (2026) | Self-Employment & Quarterly Tax Tool',
  description:
    'Free 2026 US 1099 tax calculator. Estimate exact self-employment tax (15.3%), federal income tax deductions, IRS Form 1040-ES quarterly payments, and W-2 equivalents.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/1099-tax-calculator',
  },
  openGraph: {
    title: '1099 Tax Calculator 2026 | Self-Employment & Quarterly Estimator',
    description:
      'Calculate exact US 1099 contractor deductions. Factor in Schedule C expenses, Social Security wage caps, and federal tax brackets.',
    url: 'https://www.smartratecalcs.com/1099-tax-calculator',
    type: 'website',
    images: [
      {
        url: 'https://www.smartratecalcs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: '1099 Tax Calculator - SmartRateCalcs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '1099 Tax Calculator 2026 (Live IRS Schedule C & SE Tax Formula)',
    description:
      'Instantly calculate US 1099 self-employment taxes, quarterly vouchers, and W-2 salary equivalents.',
    images: ['https://www.smartratecalcs.com/og-image.png'],
  },
};

export default function Tax1099Page() {
  const pageUrl = 'https://www.smartratecalcs.com/1099-tax-calculator';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the 1099 self-employment tax rate in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The US self-employment tax rate is 15.3% on 92.35% of your net business profit. This consists of 12.4% for Social Security (capped at the $168,600 wage base) and 2.9% for Medicare (no wage ceiling).',
        },
      },
      {
        '@type': 'Question',
        name: 'How much should a 1099 contractor set aside for taxes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most 1099 contractors should set aside 25% to 30% of their net freelance income. This safely covers the 15.3% self-employment tax plus federal and state progressive income taxes.',
        },
      },
      {
        '@type': 'Question',
        name: 'When are 1099 quarterly estimated tax payments due in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'IRS quarterly estimated payments (Form 1040-ES) are due in four installments: Q1 is due April 15, Q2 is due June 16, Q3 is due September 15, and Q4 is due January 15 of the following year.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can 1099 contractors write off business expenses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. 1099 independent contractors file Schedule C to deduct ordinary and necessary business expenses before paying taxes, including home office space, internet, software subscriptions, computer hardware, travel, and health insurance premiums.',
        },
      },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SmartRateCalcs 1099 Tax Calculator',
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
              <span className="text-slate-800 dark:text-slate-200 font-bold">1099 Tax Calculator</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <Link
                href="/freelance-hourly-rate-calculator"
                className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/60 transition-all"
              >
                <span>Hourly Rate</span>
              </Link>
              <Link
                href="/upwork-fee-calculator"
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 transition-all"
              >
                <span>Upwork Fee</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="pt-10 pb-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>2026 IRS Schedule C &amp; Self-Employment Tax Form 1040-ES</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
            US 1099 Tax Calculator (2026)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Calculate exact self-employment taxes (15.3%), estimate quarterly 1040-ES vouchers, write off Schedule C business deductions, and see what you need to earn on 1099 to match a W-2 salary.
          </p>
        </section>

        {/* Calculator Widget */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Tax1099CalculatorWidget isStandalone={true} />
        </section>

        {/* Hire Naveed Systems Engineering Callout */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl border border-emerald-500/40 shrink-0">
                <i className="fa-solid fa-code"></i>
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-white">Need Custom Automated Invoicing, Scrapers, or Python Tools?</h3>
                <p className="text-xs sm:text-sm text-slate-300">Automate your contractor client reporting, billing webhooks, and custom SaaS engineering.</p>
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
                2026 Self-Employment Tax Rate Schedule
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 uppercase font-mono">
                      <th className="py-3 px-4">Tax Component</th>
                      <th className="py-3 px-4">Rate (%)</th>
                      <th className="py-3 px-4">2026 Wage Base Cap</th>
                      <th className="py-3 px-4">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">Social Security (OASDI)</td>
                      <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">12.40%</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$168,600</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Old-Age, Survivors, and Disability Insurance</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">Medicare (Hospital Insurance)</td>
                      <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">2.90%</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">No Limit</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Federal health insurance for retirement age</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">Combined Self-Employment Tax</td>
                      <td className="py-3 px-4 text-amber-600 dark:text-amber-400 font-bold">15.30%</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Applies to 92.35% of profit</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">50% deductible from adjusted gross income</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQs */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-6">
                Frequently Asked Questions (US 1099 Taxes)
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
        <SiteLegalFooter />
      </div>
    </>
  );
}
