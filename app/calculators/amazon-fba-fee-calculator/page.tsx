import { Metadata } from 'next';
import Link from 'next/link';
import AmazonCalculatorWidget from '../../../components/AmazonCalculatorWidget';
import ThemeToggle from '../../../components/ThemeToggle';
import { SiteLegalFooter } from '../../../components/SiteLegalFooter';

export const metadata: Metadata = {
  title: 'Amazon FBA & Seller Fee Calculator (2026) | FBA vs FBM Profit Calculator',
  description:
    'Free 2026 Amazon seller fee and FBA profit calculator. Model exact category referral fees (8% to 15%), FBA pick & pack fees, inbound placement costs, storage rates, and net profit margins.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/calculators/amazon-fba-fee-calculator',
  },
  openGraph: {
    title: 'Amazon FBA & Seller Fee Calculator 2026 | FBA vs FBM Net Margin Engine',
    description:
      'Accurately model your Amazon seller take-home profit. Compare FBA vs FBM fulfillment, referral fee schedules, inbound placement service charges, and storage deductions.',
    url: 'https://www.smartratecalcs.com/calculators/amazon-fba-fee-calculator',
    type: 'website',
    images: [
      {
        url: 'https://www.smartratecalcs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Amazon FBA and Seller Fee Calculator - SmartRateCalcs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amazon FBA & Seller Fee Calculator 2026 (Live Referral & FBA Engine)',
    description:
      'Calculate exact Amazon net profit margins, referral fees, FBA pick and pack, and reverse target pricing.',
    images: ['https://www.smartratecalcs.com/og-image.png'],
  },
};

export default function AmazonCalculatorPage() {
  const pageUrl = 'https://www.smartratecalcs.com/calculators/amazon-fba-fee-calculator';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What percentage does Amazon take from sellers in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In 2026, Amazon charges a category-specific Referral Fee on every item sold, typically ranging between 8% and 15% with a minimum $0.30 fee per item. Standard categories like Home, Kitchen, Toys, and Sports incur a 15% referral fee, while Consumer Electronics charges 8%, and Apparel charges 5% on items under $15, 10% between $15 and $20, and 17% on items over $20.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Amazon FBA and FBM fees?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Under FBA (Fulfilled by Amazon), sellers pay the standard Referral Fee plus Amazon FBA Fulfillment Fees (Pick & Pack fees ranging from $3.22 to $7.00+ depending on weight and size tier), Inbound Placement Service fees, and monthly inventory storage fees. Under FBM (Fulfilled by Merchant), sellers pay only the Referral Fee to Amazon but must cover their own carrier shipping labels, packaging boxes, and customer handling costs.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Amazon Inbound Placement Service Fee in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Introduced in recent policy updates, the Inbound Placement Service Fee reflects Amazon costs of distributing inventory across its fulfillment network closer to buyers. Standard-size products typically incur between $0.21 and $0.34 per unit when choosing single-destination or minimal shipment splits, or $0.00 if the seller distributes shipments across multiple inbound locations.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much are Amazon monthly storage fees?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For standard-size products, Amazon charges $0.78 per cubic foot per month from January through September. During the Q4 holiday peak season (October through December), storage fees increase by approximately 3.1x to $2.40 per cubic foot per month. For typical small to medium items, this equates to roughly $0.15 to $0.45 per unit per month.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I calculate my net profit and break-even price on Amazon?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your Amazon net profit equals your Gross Selling Price minus your Product Cost (COGS), Inbound Shipping, Amazon Referral Fee, and FBA Pick & Pack or Merchant Postage. Your break-even listing price is computed by dividing all your fixed outflows (product cost + fulfillment + storage) by (1 minus your category referral fee percentage). Our calculator provides an interactive Reverse Mode to solve this target price instantly.',
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
        name: 'Amazon FBA Fee Calculator',
        item: pageUrl,
      },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SmartRateCalcs Amazon FBA & Seller Fee Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
    description:
      'Interactive financial calculator modeling official 2026 Amazon seller fees, FBA pick and pack, category referral commissions, inbound placement costs, and FBA vs FBM net profit margins.',
    author: {
      '@type': 'Person',
      name: 'Muhammad Naveed',
      jobTitle: 'Lead Software Engineer',
      url: 'https://www.smartratecalcs.com/about',
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
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

      {/* Top Navigation */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <span className="font-bold text-sm tracking-tight">SR</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white leading-none">
                SmartRate<span className="text-amber-500">Calcs</span>
              </span>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono mt-0.5">
                Financial Engineering Tools
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4 text-xs font-semibold">
            <Link
              href="/#calculators"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors px-2 py-1"
            >
              All Calculators
            </Link>
            <Link
              href="/blog"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors px-2 py-1"
            >
              Guides
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Breadcrumb path */}
        <nav aria-label="Breadcrumb" className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400">Home</Link>
          <span>/</span>
          <Link href="/#calculators" className="hover:text-amber-600 dark:hover:text-amber-400">Calculators</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-semibold">Amazon FBA Fee Calculator</span>
        </nav>

        {/* Title & Headline */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            Verified 2026 Amazon Fee Schedule (FBA &amp; FBM)
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Amazon FBA &amp; Seller Fee Calculator <span className="text-amber-500">(2026)</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            Calculate your exact Amazon seller take-home profit, FBA Pick &amp; Pack fees, category referral rates (8% to 15%), 2026 Inbound Placement costs, and monthly inventory storage deductions. Compare FBA vs FBM profitability side-by-side.
          </p>
        </div>

        {/* Primary Interactive Engine Component */}
        <AmazonCalculatorWidget isStandalone={true} />

        {/* In-Depth Educational Guide & Policy Analysis */}
        <article className="space-y-10 pt-8 border-t border-slate-200 dark:border-slate-800">
          {/* Section 1: Anatomy of Amazon Seller Fees */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              1. How Amazon Seller Fees Work in 2026
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              Selling on Amazon involves navigating multiple distinct fee layers that differ fundamentally between <strong>FBA (Fulfilled by Amazon)</strong> and <strong>FBM (Fulfilled by Merchant)</strong>. In 2026, Amazon has tightened logistics and inventory performance requirements, introducing new placement structures alongside established referral take-rates.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              Every Amazon seller must account for two primary platform deductions on each sale:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  A. Category Referral Fee (8% - 15%)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  The primary platform commission assessed on the total sales price (including product price, shipping charged to buyer, and gift-wrap charges). Standard consumer categories carry a 15% rate, with a universal $0.30 minimum per item ($0.25 in UK).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                  B. FBA Fulfillment Fee (Pick &amp; Pack)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  If you use FBA, Amazon handles packing, 2-day Prime delivery, customer service, and returns. FBA fulfillment fees are calculated based on your packaged product dimensions (Small Standard, Large Standard, Oversize) and unit shipping weight.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: FBA vs FBM Comparison */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              2. FBA vs FBM: The Ultimate Profitability Breakdown
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              Deciding between FBA and FBM is the single most critical financial choice for any Amazon business. Neither method is universally superior; profitability depends on unit size, weight, and your warehouse capabilities:
            </p>

            <div className="overflow-x-auto my-4 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                    <th className="p-3.5">Feature / Metric</th>
                    <th className="p-3.5">FBA (Fulfilled by Amazon)</th>
                    <th className="p-3.5">FBM (Fulfilled by Merchant)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium bg-white dark:bg-slate-900">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Prime Badge Eligibility</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Automatic Prime Badge</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Requires Seller-Fulfilled Prime</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Buy Box Advantage</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Highest Win Rate (Algorithm Favorite)</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Must beat FBA on price or fast handling</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Shipping &amp; Packing Costs</td>
                    <td className="p-3 text-slate-700 dark:text-slate-300">Predictable tiered FBA Pick &amp; Pack ($3.22 - $7+)</td>
                    <td className="p-3 text-slate-700 dark:text-slate-300">Variable carrier postage ($4.50 - $12+) + packaging</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Customer Service &amp; Returns</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">100% Handled by Amazon 24/7</td>
                    <td className="p-3 text-rose-600 dark:text-rose-400">100% Handled by Seller</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Storage &amp; Placement Fees</td>
                    <td className="p-3 text-rose-600 dark:text-rose-400">Monthly storage + Inbound placement fee</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">$0 Amazon storage fees (Own warehouse)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Ideal Product Types</td>
                    <td className="p-3 text-slate-700 dark:text-slate-300">Lightweight (&lt; 2 lb), compact, high velocity</td>
                    <td className="p-3 text-slate-700 dark:text-slate-300">Bulky, heavy, slow-moving, or custom items</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: 2026 Inbound Placement Fees */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              3. The 2026 Inbound Placement &amp; Low-Inventory Fee Mechanics
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              Beginning in recent policy schedules, Amazon updated how inbound shipments to fulfillment centers (FCs) are charged. When creating an FBA shipping plan, sellers encounter two key fulfillment fee types:
            </p>

            <div className="space-y-3 my-4">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1">
                <h4 className="font-bold text-amber-950 dark:text-amber-200 text-sm">
                  Minimal Inbound Shipment Split (Single Destination)
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  If you ship your entire inventory batch to a single Amazon receiving warehouse (e.g., in the East or West region), Amazon assesses an Inbound Placement Service Fee of approximately <strong className="text-slate-900 dark:text-white">$0.21 to $0.34 per standard unit</strong> to internally distribute your goods to nationwide facilities.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-1">
                <h4 className="font-bold text-blue-950 dark:text-blue-200 text-sm">
                  Amazon-Optimized / Distributed Inbound Split
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  If you package your shipment into multiple partial shipments directed to 4 or more regional fulfillment centers simultaneously, the placement fee drops to <strong className="text-emerald-600 dark:text-emerald-400">$0.00</strong>, though your external carrier freight costs may increase slightly.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Category Referral Fee Matrix */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              4. 2026 Category Referral Fee Schedule
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              Amazon adjusts its take-rates according to average retail margins across individual categories. Below is the official 2026 referral matrix:
            </p>

            <div className="overflow-x-auto my-4 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Referral Rate</th>
                    <th className="p-3.5">Applicable Thresholds</th>
                    <th className="p-3.5">Min Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium bg-white dark:bg-slate-900">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Home, Kitchen, Toys &amp; Sports</td>
                    <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">15.00%</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Flat across all prices</td>
                    <td className="p-3 font-mono text-slate-500">$0.30</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Apparel &amp; Clothing</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">5.0% / 10.0% / 17.0%</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">5% under $15, 10% ($15-$20), 17% over $20</td>
                    <td className="p-3 font-mono text-slate-500">$0.30</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Computers &amp; Consumer Electronics</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">8.00%</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Flat across total order</td>
                    <td className="p-3 font-mono text-slate-500">$0.30</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Electronic Accessories</td>
                    <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">15.00% / 8.00%</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">15% on first $100, 8% on balance</td>
                    <td className="p-3 font-mono text-slate-500">$0.30</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Beauty &amp; Personal Care</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">8.00% / 15.00%</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">8% on items under $10, 15% over $10</td>
                    <td className="p-3 font-mono text-slate-500">$0.30</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Books, DVDs &amp; Media</td>
                    <td className="p-3 text-rose-600 dark:text-rose-400 font-bold">15.00% + $1.80</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">15% plus mandatory $1.80 closing fee</td>
                    <td className="p-3 font-mono text-slate-500">$0.30</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Jewelry</td>
                    <td className="p-3 text-purple-600 dark:text-purple-400 font-bold">20.00% / 5.00%</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">20% on first $250, 5% on balance</td>
                    <td className="p-3 font-mono text-slate-500">$0.30</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: Reverse Margin Formula */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              5. The Exact Break-Even &amp; Target Margin Formula
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              To price an Amazon listing profitably without accepting negative-margin sales, use our algebraic reverse formula. It guarantees every unit covers manufacturing, freight, and Amazon platform deductions:
            </p>

            <div className="p-6 rounded-2xl bg-slate-900 dark:bg-slate-950 text-white border border-slate-800 shadow-lg my-4 space-y-3 font-mono text-xs sm:text-sm">
              <div className="text-xs uppercase tracking-wider text-amber-400 font-bold">// Amazon FBA Minimum Break-Even Price Formula</div>
              <p className="text-slate-300">TotalFixedDeductions = ItemCost + InboundFreight + FBAPickAndPack + PlacementFee + MonthlyStorage + ClosingFee</p>
              <p className="text-emerald-400 font-bold">RequiredGrossPrice = (TotalFixedDeductions + DesiredNetProfit) / (1 - ReferralFeeRate)</p>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              Use our live <strong>Reverse Target Tab</strong> above to solve for any specific dollar profit or percentage margin goal automatically.
            </p>
          </section>

          {/* Cross-Link Comparison Cluster */}
          <section className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-200 dark:border-amber-900/50 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Multi-Channel Seller? Compare Your Margins Across Platforms:
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Selling across multiple marketplaces lets you optimize pricing for maximum net profit. Explore our dedicated fee models:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Link
                href="/calculators/ebay-fee-calculator"
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-white hover:border-amber-500 transition-colors shadow-sm"
              >
                eBay Fee &amp; Profit Calculator
              </Link>
              <Link
                href="/calculators/etsy-fee-calculator"
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-white hover:border-amber-500 transition-colors shadow-sm"
              >
                Etsy Fee Calculator
              </Link>
              <Link
                href="/depop-fee-calculator"
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-white hover:border-amber-500 transition-colors shadow-sm"
              >
                Depop Fee Calculator
              </Link>
              <Link
                href="/tiktok-shop-fee-calculator"
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-white hover:border-amber-500 transition-colors shadow-sm"
              >
                TikTok Shop Fee Calculator
              </Link>
              <Link
                href="/1099-tax-calculator"
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-white hover:border-amber-500 transition-colors shadow-sm"
              >
                1099 Reseller Tax Calculator
              </Link>
            </div>
          </section>

          {/* Author Bio Box */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">
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
                Specializing in e-commerce fee modeling, multi-channel algorithmic arbitrage, and real-time payment settlement engines. Built to help digital entrepreneurs protect their gross and net margins against platform fee compression.
              </p>
            </div>
          </div>
        </article>
      </main>

      <SiteLegalFooter />
    </div>
  );
}
