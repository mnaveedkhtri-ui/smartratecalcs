import { Metadata } from 'next';
import Link from 'next/link';
import StripeCalculatorWidget from '../../components/StripeCalculatorWidget';
import ThemeToggle from '../../components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Stripe Fee Calculator 2026 | Card Processing & Net Payout',
  description:
    'Free 2026 Stripe fee calculator. Calculate exact card processing fees (2.9% + $0.30), international surcharges (+1.5%), and reverse invoice charges.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/stripe-fee-calculator',
  },
  openGraph: {
    title: 'Stripe Fee Calculator 2026 | Processing Fees & Reverse Calculator',
    description:
      'Calculate exact deductions on Stripe card charges. See how much Stripe saves compared to PayPal and reverse-calculate client charges.',
    url: 'https://www.smartratecalcs.com/stripe-fee-calculator',
    type: 'website',
    images: [
      {
        url: 'https://www.smartratecalcs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Stripe Fee Calculator - SmartRateCalcs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stripe Fee Calculator 2026 (Live Rates & Reverse Formula)',
    description:
      'Instantly calculate Stripe card processing fees, international cross-border charges, and reverse invoice requirements.',
    images: ['https://www.smartratecalcs.com/og-image.png'],
  },
};

export default function StripeCalculatorPage() {
  const pageUrl = 'https://www.smartratecalcs.com/stripe-fee-calculator';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does Stripe take on a $100 transaction?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'On a standard US domestic card charge of $100, Stripe deducts 2.9% + $0.30, which equals $3.20. You receive $96.80 in your bank account. For an international card (4.4% + $0.30), the deduction is $4.70, netting you $95.30.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are Stripe international cross-border fees?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Stripe assesses an additional 1.50% fee on transactions where the card is issued outside your settlement country. If currency conversion is also required, an additional 1.00% currency conversion fee applies, bringing the total to 5.40% + $0.30.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I reverse calculate a Stripe fee to get an exact payout?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the reverse calculation formula: Charge Amount = (Target Net Amount + Fixed Fee) / (1 - Percentage Fee). To receive net $1,000 on domestic cards: ($1,000 + $0.30) / (1 - 0.029) = $1,030.18.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Stripe cheaper than PayPal for merchants?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Stripe charges 2.90% + $0.30 domestically compared to PayPals 2.99% + $0.49. On international transactions, Stripe is consistently 0.5% to 2.0% cheaper because PayPal applies aggressive internal currency conversion margins.',
        },
      },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SmartRateCalcs Stripe Fee Calculator',
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
              <span className="text-slate-800 dark:text-slate-200 font-bold">Stripe Fee Calculator</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <Link
                href="/upwork-fee-calculator"
                className="hidden sm:flex text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 transition-all"
              >
                <span>Upwork Fee</span>
              </Link>
              <Link
                href="/paypal-fee-calculator"
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 transition-all"
              >
                <span>Compare PayPal</span>
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="pt-10 pb-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-800 dark:text-indigo-300 text-xs font-bold mb-3">
            <i className="fa-brands fa-stripe text-indigo-600 dark:text-indigo-400"></i>
            <span>Updated for 2026 Stripe Official Processing Schedule</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
            Stripe Fee Calculator (2026 Live Rates)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Calculate exact processing fees for domestic cards, cross-border payments, currency conversions, and reverse-calculate how much to bill clients to cover merchant costs.
          </p>
        </section>

        {/* Calculator Widget */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <StripeCalculatorWidget isStandalone={true} />
        </section>

        {/* Educational Content & Fee Reference Table */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white dark:bg-slate-900/90 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
            {/* Rates Table */}
            <div>
              <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-4">
                2026 Stripe Official Fee Schedule
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 uppercase font-mono">
                      <th className="py-3 px-4">Processing Tier</th>
                      <th className="py-3 px-4">Percentage Fee</th>
                      <th className="py-3 px-4">Fixed Fee</th>
                      <th className="py-3 px-4">Fee on $100</th>
                      <th className="py-3 px-4">Net Payout</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">Standard Domestic Card</td>
                      <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">2.90%</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$0.30</td>
                      <td className="py-3 px-4 text-rose-600 dark:text-rose-400">-$3.20</td>
                      <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">$96.80</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">International Card (+1.50%)</td>
                      <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">4.40%</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$0.30</td>
                      <td className="py-3 px-4 text-rose-600 dark:text-rose-400">-$4.70</td>
                      <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">$95.30</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">International + Currency Conversion</td>
                      <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">5.40%</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$0.30</td>
                      <td className="py-3 px-4 text-rose-600 dark:text-rose-400">-$5.70</td>
                      <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">$94.30</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">Stripe Billing &amp; Invoices (+0.50%)</td>
                      <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">3.40%</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$0.30</td>
                      <td className="py-3 px-4 text-rose-600 dark:text-rose-400">-$3.70</td>
                      <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">$96.30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reverse Calculation Formula Section */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-2">
                Reverse Fee Formula: How to Bill Customers on Stripe
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                To guarantee your bank account receives an exact target amount after Stripe deductions, use the algebraic reverse equation:
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200 font-bold">
                Customer Charge = (Target Net Amount + Fixed Fee) / (1 - Percentage Fee / 100)
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                Example for $500 target on domestic cards: ($500 + $0.30) / (1 - 0.029) = <strong className="text-slate-900 dark:text-white">$515.24</strong>. Stripe will deduct $15.24 in processing fees, leaving you with exactly $500.00.
              </p>
            </div>

            {/* Related Tools */}
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-3">
                Explore More Real-Time Payout Calculators
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link
                  href="/paypal-fee-calculator"
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-800 dark:text-slate-200">PayPal Fee Calculator</span>
                  <i className="fa-solid fa-arrow-right text-blue-500"></i>
                </Link>
                <Link
                  href="/calculators/stripe-vs-paypal-international-fee-calculator"
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/30 transition-all flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-800 dark:text-slate-200">Stripe vs PayPal Comparison</span>
                  <i className="fa-solid fa-arrow-right text-indigo-500"></i>
                </Link>
                <Link
                  href="/calculators/stripe-cross-border-fee-calculator"
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/30 transition-all flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-800 dark:text-slate-200">Stripe Cross-Border Deep Dive</span>
                  <i className="fa-solid fa-arrow-right text-emerald-500"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
