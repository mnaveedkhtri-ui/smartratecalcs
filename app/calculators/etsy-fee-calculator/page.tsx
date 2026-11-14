import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import EtsyCalculatorWidget from '@/components/EtsyCalculatorWidget';
import { SiteLegalFooter } from '@/components/SiteLegalFooter';

export const metadata: Metadata = {
  title: 'Etsy Fee & Profit Calculator (2026) - Real Take-Home & Break-Even Tool',
  description: 'Free Etsy fee and profit calculator for 2026. Calculate exact deductions for the 6.5% transaction fee, $0.20 listing fee, 3% + $0.25 payment processing, and 12% to 15% Offsite Ads.',
  keywords: [
    'etsy fee calculator',
    'etsy profit calculator',
    'etsy seller fees 2026',
    'etsy pricing calculator',
    'etsy fee structure',
    'etsy offsite ads fee',
    'etsy transaction fee',
    'etsy payment processing fee',
  ],
  alternates: {
    canonical: 'https://www.smartratecalcs.com/calculators/etsy-fee-calculator',
  },
  openGraph: {
    title: 'Etsy Fee & Profit Calculator (2026) - SmartRateCalcs',
    description: 'Calculate your exact Etsy seller fees, net profit margin, and break-even pricing with the 2026 fee schedule.',
    url: 'https://www.smartratecalcs.com/calculators/etsy-fee-calculator',
    siteName: 'SmartRateCalcs',
    type: 'website',
  },
};

export default function EtsyFeeCalculatorPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Etsy Fee and Profit Calculator (2026)',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    url: 'https://www.smartratecalcs.com/calculators/etsy-fee-calculator',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
    description: 'Interactive financial engine for Etsy shop owners to calculate exact fees, net take-home profits, and reverse target break-even prices.',
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
        name: 'Etsy Fee Calculator',
        item: 'https://www.smartratecalcs.com/calculators/etsy-fee-calculator',
      },
    ],
  };

  const schemaFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What percentage does Etsy take in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In 2026, Etsy takes a 6.5% transaction fee on the total order value (item price plus shipping charged), a $0.20 listing fee, and a payment processing fee of 3.0% plus $0.25 for US sellers. If a sale is driven by Etsy Offsite Ads, an additional 12% or 15% advertising fee is deducted. The typical effective fee ranges between 9.5% and 13% for organic sales, and up to 28% for ad-driven sales.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Etsy charge fees on shipping?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Etsy charges the 6.5% transaction fee on the total amount the buyer pays, which includes both the item listing price and the shipping amount charged. Payment processing (3% + $0.25) also applies to the entire buyer total.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the $0.20 Etsy listing fee work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Etsy charges $0.20 USD for each listing created. Each listing lasts for 4 months or until the item sells out. When an item sells from a multi-quantity listing, it automatically renews for another $0.20. Unsold listings automatically renew every 4 months unless set to manual renewal.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I opt out of Etsy Offsite Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can only opt out of Etsy Offsite Ads if your shop has generated less than $10,000 in gross sales over the trailing 12 consecutive months. If your shop exceeds $10,000 in sales, participation becomes permanently mandatory at a discounted 12% fee rate.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I calculate my Etsy break-even price?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To find your break-even price, sum your total fixed costs (item production cost, packaging, actual postage, $0.20 listing fee, and $0.25 fixed payment fee), and divide by (1 minus your combined variable fee percentage, typically 0.095 for 6.5% transaction plus 3.0% processing). Use the interactive break-even tool on this page to solve it automatically.',
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
            <Link href="/" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/#calculators" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200 font-bold">Etsy Fee Calculator</span>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 pt-4 pb-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/80 border border-orange-300 dark:border-orange-800 text-orange-800 dark:text-orange-300 text-xs font-bold font-mono mb-4">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              2026 Official Fee Schedule &bull; US, UK, CA &amp; EU
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight">
              Etsy Fee &amp; Profit Calculator <span className="text-orange-600 dark:text-orange-400">(2026)</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              Eliminate pricing guesswork. Calculate exact 6.5% transaction cuts, $0.20 listing fees, 3% + $0.25 payment processing, Offsite Ads, and discover your true net take-home profit margin.
            </p>
          </div>

          {/* Interactive Calculator Component */}
          <div className="mb-14">
            <EtsyCalculatorWidget />
          </div>

          {/* Editorial Content Deep Dive */}
          <article className="prose dark:prose-invert max-w-4xl mx-auto space-y-12 text-slate-700 dark:text-slate-300 leading-relaxed">
            {/* Section 1: 2026 Complete Fee Schedule */}
            <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white flex items-center gap-3">
                <i className="fa-solid fa-receipt text-orange-500"></i>
                1. Complete 2026 Etsy Seller Fee Schedule
              </h2>
              <p className="text-sm sm:text-base">
                Selling on Etsy involves multiple deduction layers. While many beginners assume Etsy only takes 6.5%, the reality is that the actual platform deduction typically consumes between <strong>9.5% and 13%</strong> of total customer payments for organic orders, and can exceed <strong>25%</strong> when Offsite Ads are triggered.
              </p>

              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-bold">
                      <th className="py-3 px-3">Fee Type</th>
                      <th className="py-3 px-3">Rate / Amount</th>
                      <th className="py-3 px-3">Applied To</th>
                      <th className="py-3 px-3">Frequency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
                    <tr>
                      <td className="py-3 px-3 font-bold font-sans text-slate-900 dark:text-white">Listing Fee</td>
                      <td className="py-3 px-3 text-orange-600 font-bold">$0.20 USD</td>
                      <td className="py-3 px-3 font-sans">Per item published</td>
                      <td className="py-3 px-3 font-sans">Every 4 months or each sale</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold font-sans text-slate-900 dark:text-white">Transaction Fee</td>
                      <td className="py-3 px-3 text-orange-600 font-bold">6.50%</td>
                      <td className="py-3 px-3 font-sans">Item price + Shipping + Gift wrap</td>
                      <td className="py-3 px-3 font-sans">Per completed sale</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold font-sans text-slate-900 dark:text-white">Payment Processing (US)</td>
                      <td className="py-3 px-3 text-orange-600 font-bold">3.00% + $0.25</td>
                      <td className="py-3 px-3 font-sans">Total buyer transaction amount</td>
                      <td className="py-3 px-3 font-sans">Per order processed</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold font-sans text-slate-900 dark:text-white">Offsite Ads (&lt; $10k shop)</td>
                      <td className="py-3 px-3 text-purple-600 font-bold">15.00% (Optional)</td>
                      <td className="py-3 px-3 font-sans">Total sale driven by Google/Meta ad</td>
                      <td className="py-3 px-3 font-sans">Only when ad leads to order</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold font-sans text-slate-900 dark:text-white">Offsite Ads (&gt; $10k shop)</td>
                      <td className="py-3 px-3 text-purple-600 font-bold">12.00% (Mandatory)</td>
                      <td className="py-3 px-3 font-sans">Total sale driven by Google/Meta ad</td>
                      <td className="py-3 px-3 font-sans">Mandatory for high-volume shops</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold font-sans text-slate-900 dark:text-white">Etsy Plus Subscription</td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300 font-bold">$10.00 / month</td>
                      <td className="py-3 px-3 font-sans">Optional store upgrade</td>
                      <td className="py-3 px-3 font-sans">Monthly subscription</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 2: The Shipping Fee Trap */}
            <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white flex items-center gap-3">
                <i className="fa-solid fa-box-open text-orange-500"></i>
                2. The Hidden Shipping Fee Trap
              </h2>
              <p className="text-sm sm:text-base">
                One of the most frequent surprises for new Etsy sellers is that <strong>Etsy charges the 6.5% transaction cut on shipping costs</strong>. If you sell an item for $20 and charge the buyer $10 for shipping, Etsy does not just take 6.5% of $20 ($1.30); they take 6.5% of the total $30 ($1.95).
              </p>
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
                <strong>Strategic Insight:</strong> If your postage costs you $10 at the post office and you bill your customer $10 for shipping, you actually lose $0.95 on shipping alone because of the 6.5% transaction fee and the 3% payment processing cut on that $10. Always build an extra 10% cushion into your shipping fees or roll postage into a single "Free Shipping" item price.
              </div>
            </section>

            {/* Section 3: Offsite Ads Breakdown */}
            <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white flex items-center gap-3">
                <i className="fa-solid fa-bullhorn text-orange-500"></i>
                3. Etsy Offsite Ads: The 15% vs 12% Rule
              </h2>
              <p className="text-sm sm:text-base">
                Etsy automatically advertises products across major web properties including Google Shopping, Facebook, Instagram, Pinterest, and Bing. When a shopper clicks one of these off-platform advertisements and purchases from your shop within 30 days, Etsy levies an additional advertising fee on the total order:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>
                  <strong>Under $10,000 Annual Revenue:</strong> You pay a <strong>15% Offsite Ads fee</strong> on attributed sales, but you have the legal right to opt out entirely via your Shop Manager settings.
                </li>
                <li>
                  <strong>$10,000+ Trailing 12-Month Revenue:</strong> Once your gross shop receipts cross the $10,000 milestone, Offsite Ads participation becomes permanently mandatory. Your fee rate is discounted to <strong>12%</strong>, but you cannot turn it off for the lifetime of your shop.
                </li>
              </ul>
            </section>

            {/* Section 4: Physical vs Digital Margin Comparison */}
            <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white flex items-center gap-3">
                <i className="fa-solid fa-chart-pie text-orange-500"></i>
                4. Physical Handmade vs Digital Downloads Profit Profiles
              </h2>
              <p className="text-sm sm:text-base">
                Etsy sellers operate in two vastly different financial worlds: physical goods (requiring raw materials, packaging, and shipping) versus instant digital downloads (printables, Canva templates, 3D printing STL files):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">Physical Goods ($35 Item)</h3>
                  <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
                    <li>Gross Sale: $35.00 + $5.00 Ship = $40.00</li>
                    <li>Total Etsy Fees: -$4.05</li>
                    <li>Materials (COGS): -$9.00</li>
                    <li>Postage Cost: -$4.50</li>
                    <li><strong className="text-emerald-600">Net Profit: $22.45 (56.1% Margin)</strong></li>
                  </ul>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">Digital Download ($7 Item)</h3>
                  <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
                    <li>Gross Sale: $7.00 + $0 Ship = $7.00</li>
                    <li>Listing Fee: -$0.20</li>
                    <li>Transaction &amp; Processing: -$0.92</li>
                    <li>COGS &amp; Shipping: $0.00</li>
                    <li><strong className="text-emerald-600">Net Profit: $5.88 (84.0% Margin)</strong></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5: Marketplace Comparison Table */}
            <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white flex items-center gap-3">
                <i className="fa-solid fa-scale-balanced text-orange-500"></i>
                5. Platform Benchmark: Etsy vs Shopify vs Depop vs TikTok Shop
              </h2>
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-bold">
                      <th className="py-2.5 px-3">Platform</th>
                      <th className="py-2.5 px-3">Listing Fee</th>
                      <th className="py-2.5 px-3">Marketplace Cut</th>
                      <th className="py-2.5 px-3">Payment Fee</th>
                      <th className="py-2.5 px-3">Monthly Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                    <tr className="bg-orange-50/40 dark:bg-orange-950/20 font-bold">
                      <td className="py-2.5 px-3 font-sans text-orange-700 dark:text-orange-300">Etsy</td>
                      <td className="py-2.5 px-3">$0.20</td>
                      <td className="py-2.5 px-3">6.50%</td>
                      <td className="py-2.5 px-3">3.0% + $0.25</td>
                      <td className="py-2.5 px-3 font-sans">$0 (or $10 Plus)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-sans">
                        <Link href="/tiktok-shop-fee-calculator" className="text-rose-600 hover:underline">TikTok Shop</Link>
                      </td>
                      <td className="py-2.5 px-3">$0.00</td>
                      <td className="py-2.5 px-3">6.00%</td>
                      <td className="py-2.5 px-3">Included in 6%</td>
                      <td className="py-2.5 px-3 font-sans">$0.00</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-sans">
                        <Link href="/depop-fee-calculator" className="text-rose-600 hover:underline">Depop (US)</Link>
                      </td>
                      <td className="py-2.5 px-3">$0.00</td>
                      <td className="py-2.5 px-3">0.00% (Seller)</td>
                      <td className="py-2.5 px-3">3.3% + $0.45</td>
                      <td className="py-2.5 px-3 font-sans">$0.00</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-sans">
                        <Link href="/square-fee-calculator" className="text-indigo-600 hover:underline">Shopify</Link>
                      </td>
                      <td className="py-2.5 px-3">$0.00</td>
                      <td className="py-2.5 px-3">0.00% (Own Store)</td>
                      <td className="py-2.5 px-3">2.9% + $0.30</td>
                      <td className="py-2.5 px-3 font-sans">$39.00 / mo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 6: FAQ Accordion Section */}
            <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white flex items-center gap-3">
                <i className="fa-solid fa-circle-question text-orange-500"></i>
                Frequently Asked Questions About Etsy Fees
              </h2>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                    What percentage does Etsy take in 2026?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Etsy deducts a 6.5% transaction cut on the entire order amount (item price plus shipping), a flat $0.20 listing fee, and a 3% + $0.25 payment processing cut (for US shops). If a customer purchases through an external ad, an extra 12% or 15% Offsite Ads cut is applied. Overall, expect to pay between 9.5% and 13% for standard sales, and 22% to 28% for ad-driven orders.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                    Does Etsy charge fees on shipping?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Yes. Both the 6.5% transaction cut and the 3% payment processing fee apply to the shipping amount you collect from the buyer. To avoid losing money on postage, ensure your shipping charges include a 10% markup to cover these mandatory platform deductions.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                    How does the $0.20 listing fee work for quantity sales?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    When you list an item with a quantity of 10, you are initially charged $0.20. When the first item sells, Etsy automatically renews the listing for the remaining 9 items and charges an additional $0.20 auto-renewal fee. You only pay for additional quantities as they sell.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                    Can I turn off Etsy Offsite Ads?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    You can opt out if your trailing 12-month shop sales are below $10,000 USD. If your revenue exceeds $10,000, Etsy permanently locks your account into the Offsite Ads program at a 12% fee rate with zero ability to opt out.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                    How do I calculate my break-even price?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Your break-even price is calculated by taking your total fixed production costs (item COGS + actual shipping + $0.20 listing fee + $0.25 fixed processing fee) and dividing it by (1 - combined variable fee percentage). Our interactive calculator above includes a dedicated Break-Even List Price module that solves this automatically.
                  </p>
                </div>
              </div>
            </section>
          </article>
        </div>

        {/* Global Legal & Trust Footer */}
        <SiteLegalFooter />
      </div>
    </>
  );
}
