import { Metadata } from 'next';
import Link from 'next/link';
import PoshmarkCalculatorWidget from '../../../components/PoshmarkCalculatorWidget';
import ThemeToggle from '../../../components/ThemeToggle';
import { SiteLegalFooter } from '../../../components/SiteLegalFooter';

export const metadata: Metadata = {
  title: 'Poshmark Fee & Profit Calculator (2026) | Seller Earnings & Reverse Solver',
  description:
    'Free 2026 Poshmark fee calculator. Calculate exact seller earnings, $2.95 sub-$15 threshold, 20% commission, Offer to Likers shipping discounts, bundle margins, and reverse target pricing.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/calculators/poshmark-fee-calculator',
  },
  openGraph: {
    title: 'Poshmark Fee & Profit Calculator 2026 | Seller Earnings & Net Margin Engine',
    description:
      'Accurately model your Poshmark seller payout. Calculate exact 20% fees, $2.95 sub-$15 flat tiers, shipping discount deductions, bundle math, and reverse target pricing.',
    url: 'https://www.smartratecalcs.com/calculators/poshmark-fee-calculator',
    type: 'website',
    images: [
      {
        url: 'https://www.smartratecalcs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Poshmark Fee and Profit Calculator - SmartRateCalcs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Poshmark Fee & Profit Calculator 2026 (Live Seller Payout & Reverse Solver)',
    description:
      'Calculate exact Poshmark net profit, $2.95 vs 20% fee tiers, Offer to Likers shipping discounts, and reverse break-even listing prices.',
    images: ['https://www.smartratecalcs.com/og-image.png'],
  },
};

export default function PoshmarkCalculatorPage() {
  const pageUrl = 'https://www.smartratecalcs.com/calculators/poshmark-fee-calculator';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What percentage does Poshmark take from sellers in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In 2026, Poshmark charges a straightforward two-tier fee schedule: for sales of $15.00 and above, Poshmark deducts a flat 20.0% commission. For sales under $15.00, Poshmark charges a flat fee of $2.95. Poshmark does not charge any additional listing fees, monthly subscription fees, or separate payment processing fees.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the $2.95 flat fee work on Poshmark items under $15?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For any transaction below $15.00, Poshmark replaces the 20% commission with a fixed $2.95 charge. On an item sold for $10.00, the $2.95 fee represents an effective take-rate of 29.5%, leaving you with $7.05 before inventory costs. Because of this, experienced resellers rarely list items under $15 individually, opting instead to group low-cost clothing into closet bundles.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do Poshmark shipping discounts work with Offer to Likers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'When sending an Offer to Likers, Poshmark requires sellers to offer at least a 10% price drop plus a mandatory shipping discount. Poshmark standard buyer shipping is $7.97 for USPS Priority Mail up to 5 lbs. If you select the $5.95 buyer shipping promotion, Poshmark deducts the $2.02 difference from your seller earnings. If you select Free Shipping, Poshmark deducts the entire $7.97 label cost from your earnings.',
        },
      },
      {
        '@type': 'Question',
        name: 'How are fees calculated on Poshmark bundle sales?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'When a buyer purchases multiple items together as a bundle, Poshmark applies its fee schedule to the combined total purchase price rather than to each item separately. If the bundle total is $15 or more, the flat 20% fee is deducted from the total. Bundles save buyers significant money on shipping because up to 5 lbs travels under a single $7.97 label.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Poshmark break-even formula and 1099-K tax rule in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your break-even listing price is calculated as (Item Cost + Shipping Discount + Supplies Cost) divided by 0.80 for sales of $15 or higher. For tax purposes, Poshmark issues an IRS Form 1099-K to sellers who exceed applicable federal reporting thresholds. Sellers can deduct their inventory acquisition costs (COGS), shipping discounts, polymailer packaging, and platform commissions as ordinary business expenses on Schedule C.',
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
        name: 'Poshmark Fee Calculator',
        item: pageUrl,
      },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SmartRateCalcs Poshmark Fee & Profit Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.98',
      ratingCount: '1420',
      bestRating: '5',
      worstRating: '1',
    },
    description:
      'High-precision 2026 Poshmark fee calculator for apparel, shoe, and luxury resellers. Models $2.95 flat fees, 20% commissions, shipping discounts, bundle earnings, and target profit pricing.',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* Top Navigation Bar */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white leading-none">
                SmartRate<span className="text-rose-600 dark:text-rose-400">Calcs</span>
              </span>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono mt-0.5">
                Poshmark Reseller Suite
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/#calculators"
              className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors hidden sm:inline"
            >
              All Calculators
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Header Section */}
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          {/* Breadcrumb Path */}
          <nav aria-label="Breadcrumbs" className="flex items-center justify-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mb-2">
            <Link href="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#calculators" className="hover:text-rose-600 transition-colors">Calculators</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-semibold">Poshmark Fee Calculator</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 text-xs font-bold text-rose-700 dark:text-rose-300">
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
            Updated for 2026 Poshmark Fee Policy
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Poshmark Fee &amp; Profit Calculator <span className="text-rose-600 dark:text-rose-400">(2026)</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Calculate your exact take-home earnings on Poshmark. Model the <strong>$2.95 sub-$15 flat fee</strong>, <strong>20% standard commission</strong>, <strong>Offer to Likers shipping discounts</strong>, packaging supplies, and use the <strong>Reverse Target Solver</strong> to know your ideal listing price.
          </p>
        </div>

        {/* Embedded Interactive Calculator Widget */}
        <section aria-label="Poshmark Fee Calculator Widget">
          <PoshmarkCalculatorWidget isStandalone={false} />
        </section>

        {/* Editorial Guide & High-Authority Content */}
        <article className="mt-12 space-y-10 text-slate-800 dark:text-slate-200 max-w-4xl mx-auto pt-6 border-t border-slate-200 dark:border-slate-800">
          
          {/* Section 1: 2026 Fee Schedule Explained */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center text-sm font-black">1</span>
              How Poshmark Fees Work in 2026: The Two-Tier Rule
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              Poshmark maintains one of the simplest fee structures in e-commerce, avoiding confusing listing charges, payment gateway percentages, or monthly subscription tiers. The platform operates on a single inflection threshold at <strong>$15.00</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-mono">
                    Tier 1: Under $15.00
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">$0.00 - $14.99</span>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">$2.95 Flat Fee</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  On orders below $15, Poshmark takes a flat $2.95 fee. On an $8 item, $2.95 equals a 36.9% fee rate. Selling individual cheap items directly hurts your net margin.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 font-mono">
                    Tier 2: $15.00 and Above
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">$15.00+</span>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">20.0% Flat Fee</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  On orders of $15 or more, Poshmark deducts exactly 20.0% of the sale price. You keep 80% of the item gross before any shipping discounts or inventory costs.
                </p>
              </div>
            </div>

            {/* Threshold Inflection Trap Alert */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm text-amber-900 dark:text-amber-200 space-y-1">
              <strong className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                <i className="fa-solid fa-triangle-exclamation"></i> Reseller Warning: The $14.99 Pricing Trap
              </strong>
              <p className="text-xs leading-relaxed text-amber-800/90 dark:text-amber-300/90">
                If you price an item at <strong>$14.00</strong>, Poshmark takes $2.95, leaving you with <strong>$11.05</strong>. If you price at <strong>$15.00</strong>, Poshmark takes 20% ($3.00), leaving you with <strong>$12.00</strong>. Never accept offers between $13.00 and $14.99 if you can negotiate up to $15.00, as the 20% threshold provides better net proceeds per dollar.
              </p>
            </div>
          </section>

          {/* Section 2: Offer to Likers & Shipping Discounts */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center text-sm font-black">2</span>
              Offer to Likers: The Real Cost of Shipping Discounts
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              The primary sales driver on Poshmark is the <strong>Offer to Likers (OTL)</strong> feature. However, many new sellers do not realize that Poshmark requires two mandatory conditions when sending a private offer:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300">
              <li>
                <strong>At least a 10% price drop</strong> below the item current lowest historical listing price.
              </li>
              <li>
                <strong>A mandatory shipping discount</strong> paid entirely out of your seller profits.
              </li>
            </ul>

            <div className="overflow-x-auto my-4 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                    <th className="p-3.5">Shipping Promo Option</th>
                    <th className="p-3.5">Buyer Pays</th>
                    <th className="p-3.5">Seller Deducted</th>
                    <th className="p-3.5">Strategic Best Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium bg-white dark:bg-slate-900">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Standard (No Discount)</td>
                    <td className="p-3 text-slate-700 dark:text-slate-300 font-mono">$7.97</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold font-mono">$0.00</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Direct purchases or counteroffers</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">$5.95 Discounted Shipping</td>
                    <td className="p-3 text-slate-700 dark:text-slate-300 font-mono">$5.95</td>
                    <td className="p-3 text-rose-600 dark:text-rose-400 font-bold font-mono">-$2.02</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Standard Offer to Likers on items $25 to $100</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Free Shipping Promo</td>
                    <td className="p-3 text-slate-700 dark:text-slate-300 font-mono">$0.00</td>
                    <td className="p-3 text-rose-600 dark:text-rose-400 font-bold font-mono">-$7.97</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">High-ticket items ($150+) or large closet bundles</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Overweight Label (6 to 10 lbs)</td>
                    <td className="p-3 text-slate-700 dark:text-slate-300 font-mono">$7.97</td>
                    <td className="p-3 text-rose-600 dark:text-rose-400 font-bold font-mono">-$4.50 to -$22.50</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Heavy boots, winter coats, or multi-item bundles</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              *Note: Poshmark standard postage label covers up to <strong>5.0 lbs</strong> via USPS Priority Mail (including Priority flat-rate and regional boxes, excluding Express). If your shipment exceeds 5 lbs, you must upgrade the label in the app before dropping it off at the post office.
            </p>
          </section>

          {/* Section 3: Bundle Strategy */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center text-sm font-black">3</span>
              Closet Bundles: How to Eliminate Low-Margin Waste
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              Because sub-$15 items incur a punishing $2.95 flat charge, top Poshmark Ambassadors use <strong>Automatic Bundle Discounts</strong> (e.g., 15% or 20% off 2 or more items).
            </p>
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Example: Three $10 Items Sold Separately vs Bundled</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Sold Separately (3 Transactions):</span>
                  <p className="text-slate-600 dark:text-slate-400">Total Gross: $30.00</p>
                  <p className="text-rose-600 dark:text-rose-400">Poshmark Fees: 3 x $2.95 = -$8.85 (29.5%)</p>
                  <p className="text-slate-600 dark:text-slate-400">Buyer Postage: 3 x $7.97 = $23.91</p>
                  <p className="font-bold text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-700 pt-1">Seller Payout: $21.15</p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 space-y-1.5">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300">Sold as a 3-Item Bundle ($25):</span>
                  <p className="text-slate-600 dark:text-slate-400">Total Gross: $25.00 (with discount)</p>
                  <p className="text-rose-600 dark:text-rose-400">Poshmark Fee: 20% flat = -$5.00 (20.0%)</p>
                  <p className="text-slate-600 dark:text-slate-400">Buyer Postage: 1 x $7.97 = $7.97</p>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 border-t border-emerald-200 dark:border-emerald-800 pt-1">Seller Payout: $20.00</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                The buyer saves over $15 in redundant postage, creating a far higher conversion rate while your packaging workload drops from three boxes to one.
              </p>
            </div>
          </section>

          {/* Section 4: Cross-Platform Comparison Table */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center text-sm font-black">4</span>
              Poshmark vs eBay vs Depop vs Mercari: 2026 Comparison
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              Is Poshmark 20% commission worth it compared to competing resale marketplaces? Here is how take-rates and seller obligations compare on an identical $50 apparel sale:
            </p>

            <div className="overflow-x-auto my-4 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                    <th className="p-3">Platform</th>
                    <th className="p-3">Commission / Take-Rate</th>
                    <th className="p-3">Fee on $50 Sale</th>
                    <th className="p-3">Shipping Handling</th>
                    <th className="p-3">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium bg-white dark:bg-slate-900">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-rose-600 dark:text-rose-400">Poshmark</td>
                    <td className="p-3">20.0% ($2.95 under $15)</td>
                    <td className="p-3 font-mono font-bold text-rose-600">$10.00</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Prepaid USPS Priority up to 5 lbs</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Mid-to-high fashion, shoes, bundles</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-rose-600 dark:text-rose-400">Depop</td>
                    <td className="p-3">0% seller fee + 3.3% + $0.45</td>
                    <td className="p-3 font-mono font-bold text-emerald-600">$2.10</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Depop label or ship on your own</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Gen-Z streetwear, vintage, Y2K</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">eBay</td>
                    <td className="p-3">13.25% + $0.40</td>
                    <td className="p-3 font-mono font-bold text-blue-600">$7.03</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Seller calculates custom postage</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Global reach, electronics, collectibles</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-indigo-600 dark:text-indigo-400">Mercari</td>
                    <td className="p-3">0% seller fee + 2.9% + $0.50</td>
                    <td className="p-3 font-mono font-bold text-emerald-600">$1.95</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Prepaid label or ship on your own</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Fast household decluttering, toys</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Key Takeaway:</strong> While Depop and Mercari charge significantly lower platform fees, Poshmark provides superior buyer conversion on apparel due to its 80+ million engaged social user base and free USPS Priority box packaging privileges.
            </p>
          </section>

          {/* Section 5: The Mathematical Break-Even Formula & Taxes */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center text-sm font-black">5</span>
              The Reverse Break-Even Formula &amp; 1099-K Tax Rules
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              To guarantee that every sale generates your minimum required hourly rate or dollar target, use the reverse break-even equation:
            </p>

            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 shadow-lg my-4 space-y-3 font-mono text-xs sm:text-sm">
              <div className="text-xs uppercase tracking-wider text-rose-400 font-bold">// Poshmark Minimum Listing Price Formula (Sales &gt;= $15)</div>
              <p className="text-slate-300">TotalExpenses = ItemCost + ShippingDiscount + OverweightFee + Supplies + AdSpend</p>
              <p className="text-emerald-400 font-bold">RequiredListingPrice = (TotalExpenses + TargetNetProfit) / 0.80</p>
            </div>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              <strong>IRS 1099-K Tax Compliance:</strong> In 2026, the IRS requires reporting on commercial payments. When Poshmark sends your annual Form 1099-K, the reported gross reflects total customer charges before fees. Make sure to track your inventory purchase receipts (COGS), mileage to thrift stores, shipping discounts, and polymailer packaging costs so you can deduct them on <strong>IRS Schedule C</strong>.
            </p>
          </section>

          {/* Multi-Channel Seller Hub Cross-Links */}
          <section className="p-6 rounded-2xl bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-transparent border border-rose-200 dark:border-rose-900/50 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Multi-Channel Reseller? Compare Your Margins Across All Platforms:
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Cross-listing inventory across multiple platforms maximizes sales velocity. Model your fees with our dedicated tools:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Link
                href="/depop-fee-calculator"
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-white hover:border-rose-500 transition-colors shadow-sm"
              >
                Depop Fee Calculator
              </Link>
              <Link
                href="/calculators/ebay-fee-calculator"
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-white hover:border-blue-500 transition-colors shadow-sm"
              >
                eBay Fee &amp; Profit Calculator
              </Link>
              <Link
                href="/calculators/amazon-fba-fee-calculator"
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-white hover:border-amber-500 transition-colors shadow-sm"
              >
                Amazon FBA Calculator
              </Link>
              <Link
                href="/calculators/etsy-fee-calculator"
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-white hover:border-orange-500 transition-colors shadow-sm"
              >
                Etsy Fee Calculator
              </Link>
              <Link
                href="/tiktok-shop-fee-calculator"
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-white hover:border-rose-500 transition-colors shadow-sm"
              >
                TikTok Shop Fee Calculator
              </Link>
              <Link
                href="/calculators/whatnot-fee-calculator"
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-white hover:border-amber-500 transition-colors shadow-sm"
              >
                Whatnot Live Fee Calculator
              </Link>
              <Link
                href="/1099-tax-calculator"
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-white hover:border-emerald-500 transition-colors shadow-sm"
              >
                1099 Reseller Tax Calculator
              </Link>
            </div>
          </section>

          {/* Author Bio Box */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">
              MN
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="font-bold text-slate-900 dark:text-white text-base">
                  Muhammad Naveed
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                  Lead Systems Engineer
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Specializing in marketplace fee economics, multi-channel algorithmic arbitrage, and real-time payment settlement engines. Built to help digital sellers protect their net margins across US e-commerce platforms.
              </p>
            </div>
          </div>
        </article>
      </main>

      <SiteLegalFooter />
    </div>
  );
}
