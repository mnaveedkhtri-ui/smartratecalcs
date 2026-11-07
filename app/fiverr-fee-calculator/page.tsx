import { Metadata } from 'next';
import Link from 'next/link';
import FiverrCalculatorWidget from '../../components/FiverrCalculatorWidget';
import ThemeToggle from '../../components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Fiverr Fee Calculator (2026) | Instant 20% Seller Cut & Reverse Pricing Tool',
  description:
    'Free 2026 Fiverr fee calculator. Calculate exact deductions on Fiverr 20% seller cuts, tip deductions, buyer service fees (5.5%), Payoneer/bank withdrawal fees, and reverse gig pricing.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/fiverr-fee-calculator',
  },
  openGraph: {
    title: 'Fiverr Fee Calculator 2026 | 20% Seller Deduction & Reverse Gig Pricing',
    description:
      'Calculate exact net take-home earnings from Fiverr gigs. Reverse calculate your package pricing so you earn your target rate after the 20% seller fee.',
    url: 'https://www.smartratecalcs.com/fiverr-fee-calculator',
    type: 'website',
    images: [
      {
        url: 'https://www.smartratecalcs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fiverr Fee Calculator - SmartRateCalcs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fiverr Fee Calculator 2026 (Live 20% Cut & Reverse Pricing Formula)',
    description:
      'Instantly calculate Fiverr seller fees, client extra fees, payout methods, and reverse pricing requirements.',
    images: ['https://www.smartratecalcs.com/og-image.png'],
  },
};

export default function FiverrCalculatorPage() {
  const pageUrl = 'https://www.smartratecalcs.com/fiverr-fee-calculator';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does Fiverr take from sellers in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fiverr charges sellers a flat 20% fee on all completed orders, gig extras, milestone payments, and client tips. For example, if you sell a $100 gig, Fiverr retains $20 and you receive $80.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Fiverr take a 20% fee on tips?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Fiverr automatically deducts their standard 20% fee from all tips left by buyers. If a client tips you $50, you receive $40 in cleared revenue and Fiverr retains $10.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I calculate what price to set so I make $100 on Fiverr?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To reverse-calculate your Fiverr gig package price, divide your desired earnings by 0.80. To earn exactly $100 net: $100 / 0.80 = $125. Setting your gig price at $125 yields exactly $100 after Fiverr’s 20% deduction.',
        },
      },
      {
        '@type': 'Question',
        name: 'What fees do buyers pay on Fiverr?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fiverr charges buyers a 5.5% service fee on all purchases. For orders under $75 USD, an additional small order surcharge of $2.50 to $3.00 is applied.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the cheapest way to withdraw money from Fiverr?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Transferring to a Payoneer account costs $1.00 USD for standard deposit. Direct bank transfers via Payoneer cost $3.00 USD flat per withdrawal plus local currency conversion margins.',
        },
      },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SmartRateCalcs Fiverr Fee Calculator',
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
              <span className="text-slate-800 dark:text-slate-200 font-bold">Fiverr Fee Calculator</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <Link
                href="/upwork-fee-calculator"
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 transition-all"
              >
                <span>Upwork Calculator</span>
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="pt-10 pb-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-[#1dbf73] text-xs font-bold mb-3">
            <i className="fa-solid fa-tag text-[#1dbf73]"></i>
            <span>Updated for 2026 Fiverr 20% Seller Schedule</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
            Fiverr Fee &amp; Gig Pricing Calculator (2026)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Calculate exact take-home revenue after Fiverr’s 20% seller deduction, tip withholdings, buyer fees, and reverse-calculate how much to price your Gig packages to hit your financial goals.
          </p>
        </section>

        {/* Calculator Widget */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <FiverrCalculatorWidget isStandalone={true} />
        </section>

        {/* Educational Content & Fee Reference Table */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white dark:bg-slate-900/90 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
            {/* Rates Table */}
            <div>
              <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-4">
                2026 Fiverr Seller &amp; Buyer Fee Schedule
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                      <th className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Transaction Component</th>
                      <th className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Deduction / Rate</th>
                      <th className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Who Pays?</th>
                      <th className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr>
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Gig Orders &amp; Custom Offers</td>
                      <td className="py-3 px-4 font-mono font-bold text-rose-600 dark:text-rose-400">20.0%</td>
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Seller (Freelancer)</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Automatically deducted from total gig price when funds clear.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Client Tips</td>
                      <td className="py-3 px-4 font-mono font-bold text-rose-600 dark:text-rose-400">20.0%</td>
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Seller (Freelancer)</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Fiverr treats tips as regular revenue and takes the standard 20% cut.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Buyer Service Fee (Orders ≥ $75)</td>
                      <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">5.5%</td>
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Buyer (Client)</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Added to checkout cart on orders $75 and above.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Small Order Surcharge (Orders &lt; $75)</td>
                      <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">5.5% + $2.50</td>
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Buyer (Client)</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Additional $2.50 fixed fee applied to small gig orders.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Formula Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <i className="fa-solid fa-arrow-right-arrow-left text-[#1dbf73]"></i>
                  <span>The Reverse Gig Pricing Formula</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  To ensure you pocket an exact net amount after Fiverr deducts 20%, divide your financial target by 0.80:
                </p>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                  Gig Package Price = Desired In-Pocket / 0.80
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Example: If you want to take home exactly $500 USD: $500 / 0.80 = <strong className="text-slate-900 dark:text-white">$625.00 USD</strong>.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <i className="fa-solid fa-money-bill-transfer text-emerald-600 dark:text-emerald-400"></i>
                  <span>Fiverr Withdrawal Strategies</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Save on withdrawal friction with these methods:
                </p>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-4">
                  <li><strong>Payoneer Card / Balance:</strong> Costs $1.00 USD flat fee for 2-day standard load.</li>
                  <li><strong>Direct Bank via Payoneer:</strong> Charges $3.00 USD flat fee per withdrawal to your local commercial bank.</li>
                </ul>
              </div>
            </div>

            {/* FAQs */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-6">
                Frequently Asked Questions (Fiverr Fees 2026)
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
