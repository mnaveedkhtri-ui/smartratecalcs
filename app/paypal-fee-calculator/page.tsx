import { Metadata } from 'next';
import Link from 'next/link';
import PayPalCalculatorWidget from '../../components/PayPalCalculatorWidget';

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

      <div className="min-h-screen bg-[#f8fafc]">
        {/* Navigation Breadcrumb */}
        <div className="border-b border-slate-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link href="/" className="hover:text-emerald-600 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-bold">PayPal Fee Calculator</span>
            </div>
            <Link
              href="/stripe-fee-calculator"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5"
            >
              <span>Compare Stripe Fees</span>
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="pt-10 pb-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold mb-3">
            <i className="fa-brands fa-paypal text-blue-600"></i>
            <span>Updated for 2026 Official PayPal Merchant Schedule</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight leading-tight mb-3">
            PayPal Fee Calculator (2026 Live Rates)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Calculate exact merchant deductions for Goods and Services, cross-border payments, and reverse-calculate how much to invoice your clients so you receive the full amount.
          </p>
        </section>

        {/* Calculator Widget */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <PayPalCalculatorWidget isStandalone={true} />
        </section>

        {/* Educational Content & Fee Reference Table */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
            {/* Rates Table */}
            <div>
              <h2 className="font-heading font-bold text-xl text-slate-900 mb-4">
                2026 PayPal Merchant Fee Breakdown Table
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 uppercase font-mono">
                      <th className="py-3 px-4">Transaction Type</th>
                      <th className="py-3 px-4">Percentage Fee</th>
                      <th className="py-3 px-4">Fixed Fee</th>
                      <th className="py-3 px-4">Fee on $100</th>
                      <th className="py-3 px-4">Net Take-Home</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">US Domestic Goods &amp; Services</td>
                      <td className="py-3 px-4 text-blue-600 font-semibold">2.99%</td>
                      <td className="py-3 px-4 text-slate-600">$0.49</td>
                      <td className="py-3 px-4 text-rose-600">-$3.48</td>
                      <td className="py-3 px-4 text-emerald-600 font-bold">$96.52</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">International Cross-Border</td>
                      <td className="py-3 px-4 text-blue-600 font-semibold">4.49%</td>
                      <td className="py-3 px-4 text-slate-600">$0.49</td>
                      <td className="py-3 px-4 text-rose-600">-$4.98</td>
                      <td className="py-3 px-4 text-emerald-600 font-bold">$95.02</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Donations / 501(c)(3) Non-Profit</td>
                      <td className="py-3 px-4 text-blue-600 font-semibold">1.99%</td>
                      <td className="py-3 px-4 text-slate-600">$0.49</td>
                      <td className="py-3 px-4 text-rose-600">-$2.48</td>
                      <td className="py-3 px-4 text-emerald-600 font-bold">$97.52</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">QR Code / In-Person (&gt; $10)</td>
                      <td className="py-3 px-4 text-blue-600 font-semibold">1.90%</td>
                      <td className="py-3 px-4 text-slate-600">$0.10</td>
                      <td className="py-3 px-4 text-rose-600">-$2.00</td>
                      <td className="py-3 px-4 text-emerald-600 font-bold">$98.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reverse Calculation Formula Section */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-heading font-bold text-base text-slate-900 mb-2">
                Reverse Fee Formula: How to Invoice Clients for Exact Amounts
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                If you simply add 2.99% to your invoice, you will still end up short because PayPal takes 2.99% of the newly increased total. Use the verified algebraic formula below:
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs text-slate-800 font-bold">
                Invoice Amount = (Target Net Amount + Fixed Fee) / (1 - Fee Percentage / 100)
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Example for $1,000 domestic payout: ($1,000 + $0.49) / (1 - 0.0299) = <strong>$1,031.33</strong>. When your client pays $1,031.33, PayPal deducts $31.33, leaving you with exactly $1,000.00.
              </p>
            </div>

            {/* Related Tools */}
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900 mb-3">
                Explore More Real-Time Payout Calculators
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link
                  href="/stripe-fee-calculator"
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-800">Stripe Fee Calculator</span>
                  <i className="fa-solid fa-arrow-right text-indigo-500"></i>
                </Link>
                <Link
                  href="/calculators/stripe-vs-paypal-international-fee-calculator"
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-800">Stripe vs PayPal Comparison</span>
                  <i className="fa-solid fa-arrow-right text-blue-500"></i>
                </Link>
                <Link
                  href="/calculators/wise-to-pkr-fee-calculator"
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-800">Wise Payout Calculator</span>
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
