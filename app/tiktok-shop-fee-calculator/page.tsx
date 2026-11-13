import { Metadata } from 'next';
import Link from 'next/link';
import TikTokShopCalculatorWidget from '../../components/TikTokShopCalculatorWidget';
import ThemeToggle from '../../components/ThemeToggle';
import { SiteLegalFooter } from '../../components/SiteLegalFooter';

export const metadata: Metadata = {
  title: 'TikTok Shop Fee Calculator (2026) | Referral Fees, Affiliate & Net Profit Tool',
  description:
    'Free 2026 TikTok Shop fee calculator. Calculate exact seller payouts under the updated 6% US referral rate, 5% UK fees, creator affiliate commissions, FBT fulfillment, and net profit margins.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/tiktok-shop-fee-calculator',
  },
  openGraph: {
    title: 'TikTok Shop Fee Calculator 2026 | Referral Fees & Creator Affiliate Payouts',
    description:
      'Calculate exact net take-home earnings on TikTok Shop. Factor in the official 6% US seller commission, affiliate creator cuts, packaging, shipping, and ad spend.',
    url: 'https://www.smartratecalcs.com/tiktok-shop-fee-calculator',
    type: 'website',
    images: [
      {
        url: 'https://www.smartratecalcs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TikTok Shop Fee Calculator - SmartRateCalcs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TikTok Shop Fee Calculator 2026 (Live 6% Referral & Profit Engine)',
    description:
      'Calculate your exact payout from TikTok Shop sales after platform referral fees, creator affiliate splits, and shipping.',
    images: ['https://www.smartratecalcs.com/og-image.png'],
  },
};

export default function TikTokShopCalculatorPage() {
  const pageUrl = 'https://www.smartratecalcs.com/tiktok-shop-fee-calculator';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are TikTok Shop seller fees in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In 2026, TikTok Shop charges a standard 6.0% referral fee per order in the United States (with a minimum fee of $0.30 per item) across most general merchandise categories. In the United Kingdom, the standard commission rate is 5.0%. Promotional rates (such as 1.8% or 2%) were phased out as TikTok standardized its e-commerce marketplace.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does TikTok Shop charge a separate payment processing fee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In the United States, TikTok Shop bundles credit card processing and merchant payment handling directly into its standard 6.0% referral fee. Unlike Shopify or independent Stripe accounts where sellers pay 2.9% + $0.30 on top of platform fees, TikTok handles buyer checkout natively.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do creator affiliate commissions affect TikTok Shop profit margins?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'When a TikTok creator or influencer features your product through an affiliate video or live showcase, TikTok automatically deducts the agreed affiliate commission (typically between 10% and 20%) from your item selling price and pays the creator directly upon order delivery. Sellers must budget for both the 6% TikTok referral fee and creator affiliate splits.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is TikTok Shop cheaper than Amazon FBA and Etsy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. On a $40 product sale, TikTok Shop takes $2.40 (6%), while Amazon takes $6.00 (15% standard referral) plus high FBA pick-and-pack charges, and Etsy takes approximately $4.05 (6.5% transaction + 3% payment processing + $0.25). TikTok Shop offers lower base commission, though affiliate costs should be factored in for viral discovery.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will TikTok Shop issue Form 1099-K for taxes in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. TikTok Shop operates as a licensed marketplace facilitator in the US. Under IRS transition rules, TikTok will issue Form 1099-K to sellers who generate over $5,000 in gross annual sales. Regardless of whether a 1099-K is issued, sellers must declare all gross revenue and deduct allowable expenses (COGS, shipping, TikTok fees) on IRS Schedule C.',
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
        name: 'TikTok Shop Fee Calculator',
        item: pageUrl,
      },
    ],
  };

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TikTok Shop Fee & Profit Calculator (2026)',
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
        {/* Navigation Bar */}
        <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 text-left group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 dark:bg-emerald-600 text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-sm group-hover:scale-105 transition-transform">
                <i className="fa-solid fa-calculator text-emerald-400 dark:text-white"></i>
              </div>
              <div>
                <div className="font-heading font-extrabold text-[17px] sm:text-[19px] tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 sm:gap-2">
                  SmartRate<span className="text-emerald-600 dark:text-emerald-400">Calcs</span>
                  <span className="text-[9px] sm:text-[10px] uppercase font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    2026 Engine
                  </span>
                </div>
                <p className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400 font-medium">Independent Financial &amp; Payout Intelligence</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-[13.5px] font-semibold text-slate-600 dark:text-slate-300">
              <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                All Calculators
              </Link>
              <Link href="/depop-fee-calculator" className="hover:text-red-500 transition-colors">
                Depop 0%
              </Link>
              <Link href="/square-fee-calculator" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Square POS
              </Link>
              <Link href="/1099-tax-calculator" className="hover:text-emerald-600 transition-colors">
                1099 Tax
              </Link>
              <Link href="/blog" className="hover:text-emerald-600 transition-colors">
                Guides
              </Link>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <Link
                href="/contact"
                className="hidden sm:inline-flex px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white text-[12.5px] font-bold shadow-sm transition-all"
              >
                Feedback
              </Link>
            </div>
          </div>
        </header>

        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#calculators" className="hover:text-slate-900 dark:hover:text-white transition-colors">Calculators</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-bold">TikTok Shop Fee Calculator</span>
          </nav>
        </div>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Hero Section */}
          <section className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-bold mb-4 font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#fe2c55] animate-pulse"></span>
              <span>Updated July 2024 - 2026 Policy &bull; 6% Referral Commission Verified</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight leading-[1.2] mb-4">
              TikTok Shop Fee &amp; Profit Calculator
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Calculate exact net payouts from your TikTok Shop storefront. Model the official <strong className="text-slate-900 dark:text-white font-semibold">6.0% US referral fee</strong>, creator affiliate commission cuts, product COGS, and reverse pricing goals.
            </p>
          </section>

          {/* Calculator Widget */}
          <TikTokShopCalculatorWidget isStandalone={true} />

          {/* Editorial Analysis & Guide */}
          <div className="max-w-4xl mx-auto space-y-12 text-slate-700 dark:text-slate-300">
            {/* Section 1: The 2026 TikTok Shop Fee Structure */}
            <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-[#fe2c55] uppercase tracking-wider">
                <i className="fa-solid fa-scale-balanced"></i>
                Official Policy Breakdown
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
                How TikTok Shop Calculates Seller Fees in 2026
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                When TikTok Shop launched in the United States, it offered aggressive introductory rates of 1.8% plus $0.30 to attract merchants away from Amazon and Shopify. Effective July 1, 2024, TikTok standardized its fee schedule to a permanent <strong>6.0% referral commission</strong> across most categories (with a minimum charge of $0.30 per item).
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Unlike traditional marketplaces that charge separate listing insertion fees and credit card processing fees, TikTok Shop bundles payment processing natively within its 6% referral commission. However, sellers face unique deductions unique to social commerce, specifically <strong>Creator Affiliate Commissions</strong>.
              </p>

              {/* Fee Schedule Table */}
              <div className="overflow-x-auto pt-4">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400">
                      <th className="py-2.5 px-3">Marketplace Region</th>
                      <th className="py-2.5 px-3">Standard Referral Rate</th>
                      <th className="py-2.5 px-3">Minimum Fee</th>
                      <th className="py-2.5 px-3">Payment Processing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                    <tr>
                      <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">TikTok Shop US</td>
                      <td className="py-3 px-3 text-[#fe2c55] font-bold">6.0% per transaction</td>
                      <td className="py-3 px-3">$0.30 / item</td>
                      <td className="py-3 px-3 text-emerald-600 dark:text-emerald-400 font-semibold">Included in 6%</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">TikTok Shop UK</td>
                      <td className="py-3 px-3 text-[#00f2fe] font-bold">5.0% per transaction</td>
                      <td className="py-3 px-3">£0.20 / item</td>
                      <td className="py-3 px-3 text-emerald-600 dark:text-emerald-400 font-semibold">Included in 5%</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">Creator Affiliate</td>
                      <td className="py-3 px-3">10% - 20% (Seller set)</td>
                      <td className="py-3 px-3">$0.00</td>
                      <td className="py-3 px-3">Auto-split at delivery</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 2: Marketplace Fee Comparison */}
            <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <i className="fa-solid fa-code-compare"></i>
                Benchmark Analysis
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
                TikTok Shop vs. Amazon vs. Shopify vs. Etsy
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                To understand where TikTok Shop fits in your multi-channel e-commerce strategy, compare standard seller fees on a typical <strong>$50.00 customer order</strong>:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-950 text-white border border-slate-800 text-center">
                  <div className="text-[11px] font-mono text-[#00f2fe] font-bold uppercase mb-1">TikTok Shop</div>
                  <div className="text-2xl font-extrabold font-mono text-white">$3.00</div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">6.0% Flat &bull; No CC Add-On</div>
                  <div className="mt-3 text-[11px] text-emerald-400 font-bold bg-emerald-950/60 py-1 rounded-lg border border-emerald-800/60">
                    Highest Organic Reach
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">Amazon FBM</div>
                  <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">$7.50</div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">15.0% Category Referral</div>
                  <div className="mt-3 text-[11px] text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/50 py-1 rounded-lg border border-rose-200 dark:border-rose-900/40">
                    2.5x Higher Platform Fee
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">Etsy Shop</div>
                  <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">$5.00</div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">6.5% Trans + 3% + $0.25</div>
                  <div className="mt-3 text-[11px] text-amber-500 font-bold bg-amber-50 dark:bg-amber-950/50 py-1 rounded-lg border border-amber-200 dark:border-amber-900/40">
                    + $0.20 Listing Fee
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">Shopify Store</div>
                  <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">$1.75</div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">2.9% + $0.30 Processing</div>
                  <div className="mt-3 text-[11px] text-blue-500 font-bold bg-blue-50 dark:bg-blue-950/50 py-1 rounded-lg border border-blue-200 dark:border-blue-900/40">
                    + $39/mo Base Plan
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: The Affiliate Creator Equation */}
            <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
                <i className="fa-solid fa-users-viewfinder"></i>
                Creator Economy Strategy
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
                How to Price for TikTok Affiliate Creators Without Going Broke
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                The real power of TikTok Shop lies in the Open Affiliate Program. Creators with tens of thousands of followers can link your product in their videos and live streams. However, offering a 15% or 20% affiliate commission while paying a 6% TikTok referral fee means your <strong>gross platform cut reaches 21% to 26%</strong>.
              </p>
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <i className="fa-solid fa-lightbulb text-amber-500"></i>
                  The 3x Margin Rule for TikTok Products:
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Ensure your retail price is at least 3x to 4x your landed cost (COGS + packaging). If a product costs $8 to manufacture and $4 to ship, never list it below $36. At $36 with a 6% TikTok cut ($2.16) and a 12% affiliate cut ($4.32), your take-home payout is $29.52, leaving you with <strong>$17.52 clean net profit (48.6% margin)</strong>.
                </p>
              </div>
            </section>

            {/* Section 4: Taxes and IRS 1099-K Guidance */}
            <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <i className="fa-solid fa-file-invoice-dollar"></i>
                Tax Compliance &amp; Reporting
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
                TikTok Shop 1099-K Taxes &amp; Sales Tax Nexus
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                TikTok operates as a recognized Marketplace Facilitator in all 50 US states. This means TikTok automatically calculates, collects, and remits state sales tax on your behalf. You do not need to remit sales tax for transactions completed through the TikTok checkout.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                For federal income taxes, TikTok requires your SSN or EIN during shop registration. Under IRS transition regulations, TikTok will generate and submit <strong>Form 1099-K</strong> to the IRS for any US merchant with gross volume exceeding <strong>$5,000</strong>. Remember that Form 1099-K reports gross unadjusted sales before TikTok took its 6% cut or affiliate splits; you must claim all platform fees, shipping costs, and inventory expenses as legitimate business deductions on your tax return.
              </p>
            </section>

            {/* Section 5: Frequently Asked Questions */}
            <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                <i className="fa-solid fa-circle-question"></i>
                Frequently Asked Questions
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
                TikTok Shop Seller Fee FAQs
              </h2>

              <div className="space-y-4 text-sm">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                    What are TikTok Shop seller fees in 2026?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    In 2026, TikTok Shop charges a standard 6.0% referral fee per order in the United States (with a minimum fee of $0.30 per item) across most general merchandise categories. In the United Kingdom, the standard commission rate is 5.0%. Promotional rates (such as 1.8% or 2%) were phased out as TikTok standardized its e-commerce marketplace.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                    Does TikTok Shop charge a separate payment processing fee?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    In the United States, TikTok Shop bundles credit card processing and merchant payment handling directly into its standard 6.0% referral fee. Unlike Shopify or independent Stripe accounts where sellers pay 2.9% + $0.30 on top of platform fees, TikTok handles buyer checkout natively.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                    How do creator affiliate commissions affect TikTok Shop profit margins?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    When a TikTok creator or influencer features your product through an affiliate video or live showcase, TikTok automatically deducts the agreed affiliate commission (typically between 10% and 20%) from your item selling price and pays the creator directly upon order delivery. Sellers must budget for both the 6% TikTok referral fee and creator affiliate splits.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                    Is TikTok Shop cheaper than Amazon FBA and Etsy?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Yes. On a $40 product sale, TikTok Shop takes $2.40 (6%), while Amazon takes $6.00 (15% standard referral) plus high FBA pick-and-pack charges, and Etsy takes approximately $4.05 (6.5% transaction + 3% payment processing + $0.25). TikTok Shop offers lower base commission, though affiliate costs should be factored in for viral discovery.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                    Will TikTok Shop issue Form 1099-K for taxes in 2026?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Yes. TikTok Shop operates as a licensed marketplace facilitator in the US. Under IRS transition rules, TikTok will issue Form 1099-K to sellers who generate over $5,000 in gross annual sales. Regardless of whether a 1099-K is issued, sellers must declare all gross revenue and deduct allowable expenses (COGS, shipping, TikTok fees) on IRS Schedule C.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Global Legal & Directory Footer */}
        <SiteLegalFooter />
      </div>
    </>
  );
}
