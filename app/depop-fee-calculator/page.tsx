import { Metadata } from 'next';
import Link from 'next/link';
import DepopCalculatorWidget from '../../components/DepopCalculatorWidget';
import ThemeToggle from '../../components/ThemeToggle';
import { SiteLegalFooter } from '../../components/SiteLegalFooter';

export const metadata: Metadata = {
  title: 'Depop Fee Calculator (2026) | Free Profit & Reverse Pricing Tool',
  description:
    'Free 2026 Depop fee calculator. Calculate exact seller payouts under Depop 0% selling fee policy, 3.3% + $0.45 payment processing, 8% boosting cuts, and net profit margins.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/depop-fee-calculator',
  },
  openGraph: {
    title: 'Depop Fee Calculator 2026 | 0% Seller Fee & Net Profit Estimator',
    description:
      'Calculate exact net take-home earnings on Depop. Factor in 0% seller commission, 3.3% + $0.45 payment processing, optional 8% boost cuts, and shipping labels.',
    url: 'https://www.smartratecalcs.com/depop-fee-calculator',
    type: 'website',
    images: [
      {
        url: 'https://www.smartratecalcs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Depop Fee Calculator - SmartRateCalcs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Depop Fee Calculator 2026 (Live 0% Selling Fee & Profit Engine)',
    description:
      'Calculate your exact payout from Depop sales after Stripe processing and boosting fees.',
    images: ['https://www.smartratecalcs.com/og-image.png'],
  },
};

export default function DepopCalculatorPage() {
  const pageUrl = 'https://www.smartratecalcs.com/depop-fee-calculator';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are Depop seller fees in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In 2026, Depop charges a 0% selling fee for items listed in USD and GBP. Sellers only pay a standard payment processing fee of 3.3% + $0.45 in the United States (or 2.9% + £0.30 in the UK). If you opt into Depop Boost, an additional 8% fee applies only if the item sells via a boosted tile.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Depop still take a 10% selling fee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Depop officially eliminated its longstanding 10% selling fee in the US and UK. Depop introduced a buyer marketplace fee (up to 5% + $1) charged directly to shoppers at checkout, allowing sellers to keep 100% of their selling price minus payment processing.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the Depop 8% boosting fee work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Boosting gives your listing higher placement in search feeds. Depop charges an 8% boost fee only if a buyer purchases your item through a boosted search tile or within 28 days of clicking your boosted link. If a buyer finds your item organically or from your direct profile, the 8% fee is not charged.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Depop cheaper for sellers than Poshmark and eBay?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. On a standard $50 apparel sale, Depop fees total approximately $2.10 (3.3% + $0.45), compared to $10.00 on Poshmark (flat 20%) and approximately $7.03 on eBay (13.25% + $0.40). Selling on Depop saves sellers between $4.90 and $7.90 per $50 item.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will Depop send me a 1099-K tax form in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Under current IRS transition guidance, Depop will issue Form 1099-K to US sellers who exceed $5,000 in gross sales during the tax year. Even if you do not receive a 1099-K, you are legally required to report all net profit on IRS Schedule C.',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.smartratecalcs.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Calculators',
        item: 'https://www.smartratecalcs.com/#calculators',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Depop Fee Calculator',
        item: pageUrl,
      },
    ],
  };

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Depop Fee & Profit Calculator (2026)',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />

      <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070d17] text-slate-800 dark:text-slate-100 transition-colors duration-200">
        {/* Header */}
        <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm">
                <i className="fa-solid fa-calculator"></i>
              </span>
              SmartRate<span className="text-emerald-600 dark:text-emerald-400">Calcs</span>
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link
                href="/"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              >
                &larr; All Calculators
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Banner */}
        <main className="max-w-4xl mx-auto px-4 pt-10 pb-16">
          {/* Breadcrumb Trail */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 font-mono">
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">
              Home
            </Link>
            <span>/</span>
            <Link href="/#calculators" className="hover:text-emerald-600 dark:hover:text-emerald-400">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200 font-bold">Depop Fee Calculator</span>
          </nav>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-800 dark:text-rose-300 text-xs font-bold mb-3 font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              Updated for 2026 &bull; Depop 0% Seller Fee Rule Verified
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
              Depop Fee Calculator &amp; Profit Estimator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Calculate exact net take-home profits on Depop apparel and vintage sales. Models Depop&apos;s 0% marketplace seller fee, 3.3% + $0.45 payment processing, optional 8% boosting fees, and shipping costs with real-time reverse pricing.
            </p>
          </div>

          {/* INTERACTIVE ENGINE WIDGET */}
          <DepopCalculatorWidget isStandalone={true} />

          {/* DEEP EDITORIAL GUIDE SECTION */}
          <article className="space-y-12 border-t border-slate-200 dark:border-slate-800 pt-12">
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                How Depop Seller Fees Work in 2026: The 0% Selling Fee Explained
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                For years, Depop deducted a flat 10% commission on every sale, in addition to standard payment processing fees. In 2024, Depop completely restructured its monetization model by <strong>eliminating the 10% seller commission for all items listed in USD and GBP</strong>.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Instead of taxing sellers, Depop introduced a buyer marketplace fee of up to 5% plus a fixed charge at checkout. For sellers, this means you keep 100% of your listing price, minus only the unavoidable cost of processing credit card and debit card payments via Depop Payments.
              </p>
            </section>

            {/* Section 2: Fee Table */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Depop Fee Schedule: US vs UK Breakdown
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-mono uppercase text-[11px]">
                    <tr>
                      <th className="p-4">Fee Category</th>
                      <th className="p-4">United States (USD)</th>
                      <th className="p-4">United Kingdom (GBP)</th>
                      <th className="p-4">Who Pays?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                    <tr className="bg-emerald-50/50 dark:bg-emerald-950/20">
                      <td className="p-4 font-bold text-slate-900 dark:text-white">Marketplace Commission</td>
                      <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">0% (FREE)</td>
                      <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">0% (FREE)</td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">Waived</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">Payment Processing Fee</td>
                      <td className="p-4 text-slate-700 dark:text-slate-200">3.3% + $0.45</td>
                      <td className="p-4 text-slate-700 dark:text-slate-200">2.9% + £0.30</td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">Seller (Deducted from gross)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">Depop Boost Feature</td>
                      <td className="p-4 text-slate-700 dark:text-slate-200">8.0% (Optional)</td>
                      <td className="p-4 text-slate-700 dark:text-slate-200">8.0% (Optional)</td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">Seller (Only if sold via Boost)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">Buyer Marketplace Fee</td>
                      <td className="p-4 text-slate-700 dark:text-slate-200">Up to 5% + $1.00</td>
                      <td className="p-4 text-slate-700 dark:text-slate-200">Up to 5% + £1.00</td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">Buyer (Added at checkout)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 3: Depop vs Competitors */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Depop vs Poshmark vs eBay: Where Do Resellers Keep More Money?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Choosing the right platform directly dictates your net margin. Here is what you take home on an identical <strong>$75 sale</strong> across major US reseller marketplaces:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-500 shadow-sm">
                  <div className="text-xs font-mono font-bold text-emerald-600 uppercase mb-1">Depop (2026 Winner)</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">$72.08 Payout</div>
                  <p className="text-xs text-slate-500 mt-1">Platform fees: $2.92 (3.3% + $0.45). You keep <strong>96.1%</strong> of your sale.</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs font-mono font-bold text-slate-500 uppercase mb-1">eBay (Apparel)</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">$64.66 Payout</div>
                  <p className="text-xs text-slate-500 mt-1">Platform fees: $10.34 (13.25% + $0.40). You keep <strong>86.2%</strong> of your sale.</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs font-mono font-bold text-rose-500 uppercase mb-1">Poshmark</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">$60.00 Payout</div>
                  <p className="text-xs text-slate-500 mt-1">Platform fees: $15.00 (Flat 20%). You keep <strong>80.0%</strong> of your sale.</p>
                </div>
              </div>
            </section>

            {/* Section 4: Boosting Math */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Is Depop Boost Worth the 8% Fee?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Depop Boost increases your item impressions by up to 2.5x by pinning your item into sponsored search slots. However, the 8% deduction significantly reduces your take-home margin on low-cost thrift finds.
              </p>
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
                <div><strong>When to Boost:</strong> High-ticket designer pieces ($80+), deadstock sneakers, or stale inventory sitting over 45 days.</div>
                <div><strong>When NOT to Boost:</strong> Fast-moving vintage tees under $30, items where your gross margin is under 40%, or pieces that already get high organic likes and saves.</div>
              </div>
            </section>

            {/* Section 5: Tax Compliance */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Depop 1099-K Taxes &amp; IRS Reporting Requirements
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The IRS established a transition threshold of <strong>$5,000 for gross annual e-commerce transactions</strong>. If you process more than $5,000 in gross sales through Depop Payments during the calendar year, Depop will mail and electronically file an IRS Form 1099-K.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Remember: Form 1099-K reports gross receipts, not net profit. You can deduct your original thrift inventory cost (COGS), shipping supplies, postal labels, Depop payment processing fees, and mileage on your IRS Schedule C. Use our companion{' '}
                <Link href="/1099-tax-calculator" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
                  1099 Tax Calculator
                </Link>{' '}
                to calculate your self-employment tax obligations accurately.
              </p>
            </section>

            {/* Section 6: Frequently Asked Questions (FAQ) */}
            <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-rose-500 uppercase tracking-wider">
                <i className="fa-solid fa-circle-question"></i>
                Frequently Asked Questions
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
                Depop Seller Fee &amp; Profit FAQs (2026)
              </h2>

              <div className="space-y-4 text-sm">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                    What are Depop seller fees in 2026?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    In 2026, Depop charges a <strong>0% selling fee</strong> for items listed in USD and GBP. Sellers only pay a standard payment processing fee of <strong>3.3% + $0.45</strong> in the United States (or <strong>2.9% + £0.30</strong> in the UK). If you choose to use Depop Boost, an optional 8% fee applies only if the item sells directly through a boosted search tile.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                    Does Depop still take a 10% selling fee?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    No. Depop officially eliminated its longstanding 10% seller marketplace fee in the US and UK. Depop introduced a buyer marketplace fee (up to 5% + $1) charged directly to shoppers at checkout, allowing sellers to keep 100% of their item sale price minus payment processing.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                    How does the Depop 8% boosting fee work?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Boosting increases your listing visibility in search feeds. Depop charges the 8% fee only if a buyer purchases your item through a boosted search tile or within 28 days of clicking your boosted listing. If a buyer finds your item organically through your profile or standard search, the 8% fee is not charged.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                    Is Depop cheaper for sellers than Poshmark and eBay?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Yes. On a standard $50 apparel sale, Depop fees total approximately $2.10 (3.3% + $0.45), compared to $10.00 on Poshmark (flat 20%) and approximately $7.03 on eBay (13.25% + $0.40). Selling on Depop saves sellers between $4.90 and $7.90 per $50 item.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                    Will Depop send me a 1099-K tax form in 2026?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Under current IRS transition guidance, Depop will issue Form 1099-K to US sellers who exceed $5,000 in gross annual sales. Even if you do not receive a 1099-K, you are legally required to report all net business profit on IRS Schedule C.
                  </p>
                </div>
              </div>
            </section>
          </article>

          {/* Related Tools Navigation */}
          <div className="mt-14 pt-10 border-t border-slate-200 dark:border-slate-800">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Companion Reseller &amp; Gateway Calculators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/calculators/poshmark-seller-fee-calculator"
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-colors"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">Poshmark Fee Calculator &rarr;</div>
                <div className="text-[11px] text-slate-500 mt-1">Compare against flat 20% commission.</div>
              </Link>
              <Link
                href="/calculators/ebay-seller-fee-and-profit-calculator"
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-colors"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">eBay Seller Fee Calculator &rarr;</div>
                <div className="text-[11px] text-slate-500 mt-1">13.25% + $0.40 category breakdowns.</div>
              </Link>
              <Link
                href="/paypal-fee-calculator"
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-colors"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">PayPal Fee Calculator &rarr;</div>
                <div className="text-[11px] text-slate-500 mt-1">Goods &amp; Services invoice deductions.</div>
              </Link>
            </div>
          </div>
        </main>

        <SiteLegalFooter />
      </div>
    </>
  );
}
