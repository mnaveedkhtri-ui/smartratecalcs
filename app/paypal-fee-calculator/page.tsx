import { Metadata } from 'next';
import Link from 'next/link';
import PayPalCalculatorWidget from '../../components/PayPalCalculatorWidget';
import ThemeToggle from '../../components/ThemeToggle';
import { SiteLegalFooter } from '../../components/SiteLegalFooter';

export const metadata: Metadata = {
  title: 'PayPal Fee Calculator (2026) | Instant Seller, Invoicing & International Fees',
  description: 'Free 2026 PayPal fee calculator. Calculate exact deductions on Goods and Services (2.99% + $0.49), international transactions (4.49%), and reverse invoice totals.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/paypal-fee-calculator',
  },
  openGraph: {
    title: 'PayPal Fee Calculator 2026 | Goods & Services & Reverse Calculator',
    description:
      'Calculate exact deductions on PayPal Goods & Services transactions. Reverse calculate invoice totals and compare savings against Stripe.',
    url: 'https://www.smartratecalcs.com/paypal-fee-calculator',
    type: 'website',
    images: [
      {
        url: 'https://www.smartratecalcs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PayPal Fee Calculator - SmartRateCalcs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PayPal Fee Calculator 2026 (Live Rates & Reverse Formula)',
    description:
      'Instantly calculate PayPal merchant fees, international surcharges, and reverse invoice requirements.',
    images: ['https://www.smartratecalcs.com/og-image.png'],
  },
};

export default function PayPalCalculatorPage() {
  const pageUrl = 'https://www.smartratecalcs.com/paypal-fee-calculator';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does PayPal take for $100?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'On a standard US domestic Goods and Services transaction of $100, PayPal charges 2.99% + $0.49, which equals $3.48 in total fees. You receive a net amount of $96.52. For international transactions (4.49% + $0.49), the fee is $4.98, netting you $95.02.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the standard PayPal Goods and Services fee in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The standard US domestic fee for receiving commercial payments via PayPal Goods and Services is 2.99% plus a fixed fee of $0.49 per transaction. International cross-border payments carry an additional 1.50% fee (4.49% + $0.49).',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I calculate how much to invoice so I receive an exact amount?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To reverse-calculate your invoice total, use the formula: Invoice Amount = (Desired Net + Fixed Fee) / (1 - Percentage Fee). For example, to receive exactly $500 domestically: ($500 + $0.49) / (1 - 0.0299) = $515.92.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are PayPal merchant fees in the UK and Europe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In the UK, PayPal charges 2.90% + 30p for domestic commercial transactions. Cross-border fees to the EU add 1.29%, while international payments outside Europe incur an extra 1.99% fee plus currency conversion spreads.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who pays the PayPal transaction fee, buyer or seller?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Under PayPal commercial rules, the recipient (merchant/seller/freelancer) automatically absorbs the processing fee. However, many freelancers adjust their invoice amount upward using our reverse fee calculator so the client covers the processing cost.',
        },
      },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SmartRateCalcs PayPal Fee Calculator',
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
              <span className="text-slate-800 dark:text-slate-200 font-bold">PayPal Fee Calculator</span>
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
                href="/stripe-fee-calculator"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 transition-all"
              >
                <span>Compare Stripe</span>
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="pt-10 pb-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-800 dark:text-blue-300 text-xs font-bold mb-3">
            <i className="fa-brands fa-paypal text-blue-600 dark:text-blue-400"></i>
            <span>Updated for 2026 Official PayPal Merchant Schedule</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
            PayPal Fee Calculator (2026 Live Rates)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Calculate exact merchant deductions for Goods and Services, cross-border payments, and reverse-calculate how much to invoice your clients so you receive the full amount.
          </p>
        </section>

        {/* Calculator Widget */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <PayPalCalculatorWidget isStandalone={true} />
        </section>

        {/* Hire Naveed Systems Engineering Callout */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xl border border-blue-500/40 shrink-0">
                <i className="fa-brands fa-paypal"></i>
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-white">Need Custom Payment Gateway, Python, or API Automations?</h3>
                <p className="text-xs sm:text-sm text-slate-300">Automate your invoicing, multi-currency payouts, or custom e-commerce checkout pipelines.</p>
              </div>
            </div>
            <a
              href="https://naveed-portfolio-kappa.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition-all shadow-md shrink-0 flex items-center gap-2"
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
                2026 PayPal Merchant Fee Breakdown Table
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 uppercase font-mono">
                      <th className="py-3 px-4">Transaction Type</th>
                      <th className="py-3 px-4">Percentage Fee</th>
                      <th className="py-3 px-4">Fixed Fee</th>
                      <th className="py-3 px-4">Fee on $100</th>
                      <th className="py-3 px-4">Net Take-Home</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">US Domestic Goods &amp; Services</td>
                      <td className="py-3 px-4 text-blue-600 dark:text-blue-400 font-semibold">2.99%</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$0.49</td>
                      <td className="py-3 px-4 text-rose-600 dark:text-rose-400">-$3.48</td>
                      <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">$96.52</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">International Cross-Border</td>
                      <td className="py-3 px-4 text-blue-600 dark:text-blue-400 font-semibold">4.49%</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$0.49</td>
                      <td className="py-3 px-4 text-rose-600 dark:text-rose-400">-$4.98</td>
                      <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">$95.02</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">Donations / 501(c)(3) Non-Profit</td>
                      <td className="py-3 px-4 text-blue-600 dark:text-blue-400 font-semibold">1.99%</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$0.49</td>
                      <td className="py-3 px-4 text-rose-600 dark:text-rose-400">-$2.48</td>
                      <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">$97.52</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">QR Code / In-Person (&gt; $10)</td>
                      <td className="py-3 px-4 text-blue-600 dark:text-blue-400 font-semibold">1.90%</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$0.10</td>
                      <td className="py-3 px-4 text-rose-600 dark:text-rose-400">-$2.00</td>
                      <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">$98.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reverse Calculation Formula Section */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-2">
                Reverse Fee Formula: How to Invoice Clients for Exact Amounts
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                If you simply add 2.99% to your invoice, you will still end up short because PayPal takes 2.99% of the newly increased total. Use the verified algebraic formula below:
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200 font-bold">
                Invoice Amount = (Target Net Amount + Fixed Fee) / (1 - Fee Percentage / 100)
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                Example for $1,000 domestic payout: ($1,000 + $0.49) / (1 - 0.0299) = <strong className="text-slate-900 dark:text-white">$1,031.33</strong>. When your client pays $1,031.33, PayPal deducts $31.33, leaving you with exactly $1,000.00.
              </p>
            </div>

            {/* Related Tools */}
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-3">
                Explore More Real-Time Payout Calculators
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <Link
                  href="/stripe-fee-calculator"
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/30 transition-all flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"><i className="fa-brands fa-stripe text-indigo-500"></i> Stripe Fee Calculator</span>
                  <i className="fa-solid fa-arrow-right text-indigo-500"></i>
                </Link>
                <Link
                  href="/upwork-fee-calculator"
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/30 transition-all flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"><i className="fa-solid fa-briefcase text-emerald-500"></i> Upwork Fee Calculator</span>
                  <i className="fa-solid fa-arrow-right text-emerald-500"></i>
                </Link>
                <Link
                  href="/fiverr-fee-calculator"
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-[#1dbf73] hover:bg-emerald-50/30 dark:hover:bg-emerald-950/30 transition-all flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"><i className="fa-solid fa-tag text-[#1dbf73]"></i> Fiverr Fee Calculator</span>
                  <i className="fa-solid fa-arrow-right text-[#1dbf73]"></i>
                </Link>
                <Link
                  href="/payoneer-fee-calculator"
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-orange-400 dark:hover:border-orange-500 hover:bg-orange-50/30 dark:hover:bg-orange-950/30 transition-all flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"><i className="fa-solid fa-coins text-orange-500"></i> Payoneer Fee Calculator</span>
                  <i className="fa-solid fa-arrow-right text-orange-500"></i>
                </Link>
                <Link
                  href="/freelance-hourly-rate-calculator"
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-teal-400 dark:hover:border-teal-500 hover:bg-teal-50/30 dark:hover:bg-teal-950/30 transition-all flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"><i className="fa-solid fa-business-time text-teal-500"></i> Freelance Hourly Rate</span>
                  <i className="fa-solid fa-arrow-right text-teal-500"></i>
                </Link>
                <Link
                  href="/calculators/wise-to-pkr-fee-calculator"
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/30 transition-all flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"><i className="fa-solid fa-money-bill-transfer text-emerald-500"></i> Wise Payout Calculator</span>
                  <i className="fa-solid fa-arrow-right text-emerald-500"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <SiteLegalFooter />
      </div>
    </>
  );
}
