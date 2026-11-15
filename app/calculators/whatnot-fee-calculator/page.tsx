import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import WhatnotCalculatorWidget from '@/components/WhatnotCalculatorWidget';
import { SiteLegalFooter } from '@/components/SiteLegalFooter';

export const metadata: Metadata = {
  title: 'Whatnot Fee Calculator [2026 Official] 8% Commission & Net Profit Math',
  description: 'Free 2026 Whatnot fee calculator. Calculate exact seller payouts under the official 8.0% commission, 2.9% + $0.30 payment processing, tips math, and live stream profit margins.',
  keywords: [
    'whatnot fee calculator',
    'whatnot seller fees 2026',
    'whatnot commission fee',
    'whatnot profit calculator',
    'whatnot live selling fees',
    'whatnot payment processing fee',
    'whatnot shipping commission',
  ],
  alternates: {
    canonical: 'https://www.smartratecalcs.com/calculators/whatnot-fee-calculator',
  },
  openGraph: {
    title: 'Whatnot Fee Calculator [2026 Official] 8% Commission & Net Profit Math',
    description: 'Calculate your exact Whatnot seller fees, live stream take-home profit, and break-even pricing with official 2026 rates.',
    url: 'https://www.smartratecalcs.com/calculators/whatnot-fee-calculator',
    siteName: 'SmartRateCalcs',
    type: 'website',
  },
};

export default function WhatnotFeeCalculatorPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Whatnot Fee and Profit Calculator (2026)',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    url: 'https://www.smartratecalcs.com/calculators/whatnot-fee-calculator',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
    description: 'Interactive financial calculation tool for Whatnot live stream sellers to calculate exact 8% commissions, payment processing cuts, and net take-home margins.',
  };

  const schemaBreadcrumbs = {
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
        name: 'Whatnot Fee Calculator',
        item: 'https://www.smartratecalcs.com/calculators/whatnot-fee-calculator',
      },
    ],
  };

  const schemaFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What percentage does Whatnot take from sellers in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In 2026, Whatnot charges an 8.0% commission fee on the total sale price (including the shipping charged to the buyer), plus a payment processing fee of 2.9% plus $0.30 per transaction. The combined effective platform take-rate is approximately 10.9% plus $0.30.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Whatnot charge commission fees on shipping?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Whatnot levies the 8.0% marketplace commission on the total transaction amount paid by the buyer, which includes both the sold item price and the shipping amount charged.',
        },
      },
      {
        '@type': 'Question',
        name: 'How are tips taxed and fee-deducted on Whatnot?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Whatnot does NOT take its 8.0% commission on buyer tips received during live streams. Tips are only subject to the standard 2.9% plus $0.30 payment processing fee.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Whatnot payout work and how long does it take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Whatnot releases seller payouts into their in-app balance once the tracking number confirms delivery by the carrier (or after 48-72 hours of shipment for trusted high-tier sellers). Sellers can transfer funds directly to their bank via ACH for free or via Stripe instant deposit.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I calculate my break-even price on Whatnot?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your break-even price is calculated by taking your total item cost (COGS) and seller packaging expenses, adding the $0.30 fixed processing fee, and dividing by 0.891 (which represents 1 minus the combined 10.9% variable rate). Our interactive calculator above includes a dedicated break-even solver.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
      />

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
        {/* Top Breadcrumb Navigation */}
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-2">
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/#calculators" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200 font-bold">Whatnot Fee Calculator</span>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 pt-4 pb-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold font-mono mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Official 2026 Live Stream Seller Schedule
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight">
              Whatnot Fee &amp; Profit Calculator <span className="text-amber-600 dark:text-amber-400">(2026)</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              Calculate exact 8.0% commission deductions, 2.9% + $0.30 payment processing fees, shipping cuts, and tips profit for your live stream auctions and Buy-It-Now sales.
            </p>
          </div>

          {/* Interactive Calculator Component */}
          <div className="mb-14">
            <WhatnotCalculatorWidget />
          </div>

          {/* Editorial Content Deep Dive */}
          <article className="prose dark:prose-invert max-w-4xl mx-auto space-y-12 text-slate-700 dark:text-slate-300 leading-relaxed">
            {/* Section 1: Complete 2026 Fee Schedule */}
            <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white flex items-center gap-3">
                <i className="fa-solid fa-receipt text-amber-500"></i>
                1. Official 2026 Whatnot Seller Fee Schedule
              </h2>
              <p className="text-sm sm:text-base">
                Whatnot operates a straightforward fee schedule compared to traditional marketplaces. Unlike platforms with listing fees or monthly store subscriptions, Whatnot only charges fees when an item successfully sells on stream or through your Buy-It-Now storefront.
              </p>

              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-bold">
                      <th className="py-3 px-3">Fee Component</th>
                      <th className="py-3 px-3">Exact Rate</th>
                      <th className="py-3 px-3">What It Applies To</th>
                      <th className="py-3 px-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
                    <tr>
                      <td className="py-3 px-3 font-bold font-sans text-slate-900 dark:text-white">Whatnot Commission</td>
                      <td className="py-3 px-3 text-amber-600 font-bold">8.00%</td>
                      <td className="py-3 px-3 font-sans">Item sale price + buyer shipping charge</td>
                      <td className="py-3 px-3 font-sans">Flat rate across all categories</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold font-sans text-slate-900 dark:text-white">Payment Processing</td>
                      <td className="py-3 px-3 text-amber-600 font-bold">2.90% + $0.30</td>
                      <td className="py-3 px-3 font-sans">Total transaction amount (including tips)</td>
                      <td className="py-3 px-3 font-sans">Card network processing fee</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold font-sans text-slate-900 dark:text-white">Listing Fee</td>
                      <td className="py-3 px-3 text-emerald-600 font-bold">$0.00</td>
                      <td className="py-3 px-3 font-sans">Free to list unlimited items</td>
                      <td className="py-3 px-3 font-sans">Zero upfront insertion charge</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold font-sans text-slate-900 dark:text-white">Monthly Store Fee</td>
                      <td className="py-3 px-3 text-emerald-600 font-bold">$0.00</td>
                      <td className="py-3 px-3 font-sans">No recurring subscription</td>
                      <td className="py-3 px-3 font-sans">Free seller account tier</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold font-sans text-slate-900 dark:text-white">Live Stream Tips</td>
                      <td className="py-3 px-3 text-purple-600 font-bold">2.9% + $0.30</td>
                      <td className="py-3 px-3 font-sans">Tips received from viewers</td>
                      <td className="py-3 px-3 font-sans">0% Whatnot commission on tips</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 2: The Shipping Commission Trap */}
            <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white flex items-center gap-3">
                <i className="fa-solid fa-truck-fast text-amber-500"></i>
                2. The 8% Shipping Commission Rule
              </h2>
              <p className="text-sm sm:text-base">
                A critical detail that impacts live stream seller margins: <strong>Whatnot charges its 8.0% commission on the shipping fee billed to the customer</strong>. If you sell a trading card for $10 and the buyer pays $4 for shipping, Whatnot calculates 8% on the full $14 total ($1.12), plus 2.9% + $0.30 ($0.71), for a total cut of $1.83.
              </p>
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
                <strong>Seller Advice:</strong> If you offer Free Shipping or subsidize shipping to drive auction bidding momentum, calculate your break-even carefully using our solver above. Never run dollar-start ($1) auctions on heavy items without a minimum reserve or bundling rules, as fixed processing fees ($0.30) will consume your entire gross payout.
              </div>
            </section>

            {/* Section 3: Live Stream Tips Advantage */}
            <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white flex items-center gap-3">
                <i className="fa-solid fa-hand-holding-dollar text-amber-500"></i>
                3. The Live Stream Tips Advantage: 0% Commission
              </h2>
              <p className="text-sm sm:text-base">
                Unlike product sales, Whatnot does not charge its 8% marketplace commission on viewer tips. If a community member tips you $10 during a stream, Whatnot only deducts standard card processing (2.9% + $0.30 = $0.59), allowing you to keep $9.41 net (94.1% retention).
              </p>
            </section>

            {/* Section 4: Platform Benchmark */}
            <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white flex items-center gap-3">
                <i className="fa-solid fa-scale-balanced text-amber-500"></i>
                4. Live Commerce Comparison: Whatnot vs TikTok Shop vs eBay vs Depop
              </h2>
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-bold">
                      <th className="py-2.5 px-3">Platform</th>
                      <th className="py-2.5 px-3">Commission Cut</th>
                      <th className="py-2.5 px-3">Payment Processing</th>
                      <th className="py-2.5 px-3">Effective Fee Rate</th>
                      <th className="py-2.5 px-3">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                    <tr className="bg-amber-50/40 dark:bg-amber-950/20 font-bold">
                      <td className="py-2.5 px-3 font-sans text-amber-800 dark:text-amber-300">Whatnot</td>
                      <td className="py-2.5 px-3">8.00%</td>
                      <td className="py-2.5 px-3">2.9% + $0.30</td>
                      <td className="py-2.5 px-3">10.9% + $0.30</td>
                      <td className="py-2.5 px-3 font-sans">Live stream auctions &amp; TCG</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-sans">
                        <Link href="/tiktok-shop-fee-calculator" className="text-rose-600 hover:underline">TikTok Shop</Link>
                      </td>
                      <td className="py-2.5 px-3">6.00%</td>
                      <td className="py-2.5 px-3">Included in 6%</td>
                      <td className="py-2.5 px-3">6.0% flat</td>
                      <td className="py-2.5 px-3 font-sans">Viral social commerce</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-sans">
                        <Link href="/depop-fee-calculator" className="text-rose-600 hover:underline">Depop (US)</Link>
                      </td>
                      <td className="py-2.5 px-3">0.00% (Seller)</td>
                      <td className="py-2.5 px-3">3.3% + $0.45</td>
                      <td className="py-2.5 px-3">3.3% + $0.45</td>
                      <td className="py-2.5 px-3 font-sans">Gen-Z vintage fashion</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-sans">
                        <Link href="/calculators/etsy-fee-calculator" className="text-orange-600 hover:underline">Etsy</Link>
                      </td>
                      <td className="py-2.5 px-3">6.50%</td>
                      <td className="py-2.5 px-3">3.0% + $0.25</td>
                      <td className="py-2.5 px-3">9.5% + $0.45</td>
                      <td className="py-2.5 px-3 font-sans">Handmade &amp; digital downloads</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 5: FAQ Cards */}
            <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white flex items-center gap-3">
                <i className="fa-solid fa-circle-question text-amber-500"></i>
                Frequently Asked Questions About Whatnot Fees
              </h2>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                    What percentage does Whatnot take from sellers in 2026?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Whatnot charges an 8% commission on the total sale price (including customer-paid shipping), plus a 2.9% + $0.30 payment processing fee per transaction. In practice, sellers should expect approximately 11% to 12% total deductions on standard orders.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                    Does Whatnot charge commission on shipping?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Yes. The 8% commission fee applies to both the hammer price of the item and the shipping fee charged to the buyer. Payment processing also applies to the entire buyer total.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                    How do tips work during Whatnot live streams?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Whatnot takes 0% commission on tips. Only the standard 2.9% + $0.30 credit card processing fee is deducted from viewer tips, making tips one of the highest-margin revenue channels for stream hosts.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                    How long do Whatnot payouts take?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Payouts are released once the package has been marked as delivered by the postal carrier. Trusted sellers with established transaction history can qualify for early payout upon initial carrier scan. Funds can be transferred for free via ACH direct deposit or instantly via debit card for a standard Stripe fee.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                    How do I calculate my break-even price?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    To break even, divide your total inventory and packaging costs plus $0.30 by 0.891 (1 minus 10.9% combined fee cut). Use the interactive Break-Even Hammer Price module in our calculator above to solve your minimum bid automatically.
                  </p>
                </div>
              </div>
            </section>
          </article>
        </div>

        {/* Global Legal & Directory Footer */}
        <SiteLegalFooter />
      </div>
    </>
  );
}
