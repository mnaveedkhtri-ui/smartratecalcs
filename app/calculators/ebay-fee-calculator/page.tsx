import { Metadata } from 'next';
import Link from 'next/link';
import EbayCalculatorWidget from '../../../components/EbayCalculatorWidget';
import ThemeToggle from '../../../components/ThemeToggle';
import { SiteLegalFooter } from '../../../components/SiteLegalFooter';

export const metadata: Metadata = {
  title: 'eBay Fee & Profit Calculator (2026) | US & UK Seller Fee Calculator',
  description:
    'Free 2026 eBay fee and profit calculator. Model exact Managed Payments final value fees (13.25% + $0.30), UK zero-fee rules, category tiers, store discounts, and reverse break-even listing price.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/calculators/ebay-fee-calculator',
  },
  openGraph: {
    title: 'eBay Fee & Profit Calculator 2026 | US & UK Seller Calculator',
    description:
      'Calculate your exact eBay take-home profit. Factor in 13.25% final value fees, $0.30 per-order cuts, Top Rated Plus discounts, and Promoted Listings ad rates.',
    url: 'https://www.smartratecalcs.com/calculators/ebay-fee-calculator',
    type: 'website',
    images: [
      {
        url: 'https://www.smartratecalcs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'eBay Fee and Profit Calculator - SmartRateCalcs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eBay Fee & Profit Calculator 2026 (Live Managed Payments Engine)',
    description:
      'Calculate exact seller net payouts, eBay final value fees, and reverse break-even pricing.',
    images: ['https://www.smartratecalcs.com/og-image.png'],
  },
};

export default function EbayCalculatorPage() {
  const pageUrl = 'https://www.smartratecalcs.com/calculators/ebay-fee-calculator';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are standard eBay seller fees in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In 2026, most eBay US categories under Managed Payments charge a Final Value Fee of 13.25% on the total sale amount (item price + shipping charged + sales tax) up to $7,500, plus 2.35% on the portion exceeding $7,500. Additionally, sellers pay a fixed fee of $0.30 per order if the total order is over $10.00, or $0.40 if the order is $10.00 or less.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does eBay charge final value fees on shipping and sales tax?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. eBay assesses the percentage-based Final Value Fee on the entire gross transaction amount collected from the buyer, which includes the item price, shipping fees charged to the buyer, and applicable state or municipal sales taxes.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the Top Rated Plus (TRS+) discount work on eBay?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Top Rated Plus sellers receive a 10% discount on the variable Final Value Fee portion of qualifying listings that offer same-day or 1-business-day handling and 30-day or longer free returns. For example, a 13.25% fee is reduced by 10% down to an effective 11.925%.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are eBay UK selling fees 0% for private sellers in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Under the 2026 policy overhaul, eBay UK eliminated basic final value selling fees for individual private consumer sellers across almost all categories (excluding motors), funding platform protections via a buyer fee. Business sellers in the UK continue to pay standard category fees, typically 12.9% plus £0.30 and a 0.42% UK Regulatory Operating Fee.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I calculate my break-even sale price on eBay?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your break-even price equals your total costs (inventory cost + actual shipping cost + packaging + fixed order fees) divided by (1 minus your total variable fee percentage). Our calculator includes an automatic break-even indicator and a Reverse Calculator tab to compute your exact required listing price instantly.',
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
        name: 'eBay Fee Calculator',
        item: pageUrl,
      },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SmartRateCalcs eBay Fee and Profit Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
    description:
      'Interactive financial calculator modeling official 2026 eBay Managed Payments, category final value fees, Top Rated Plus discounts, store subscriptions, and net profit margins.',
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
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <i className="fa-solid fa-calculator text-sm"></i>
            </div>
            <span className="text-base tracking-tight font-black">SmartRateCalcs</span>
          </Link>

          <nav className="flex items-center gap-4 text-xs font-semibold">
            <Link
              href="/#calculators"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hidden sm:inline"
            >
              All Calculators
            </Link>
            <Link
              href="/blog"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hidden sm:inline"
            >
              Guides &amp; Research
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 sm:py-12 w-full">
        {/* Breadcrumb path */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Home
          </Link>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <Link href="/#calculators" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Calculators
          </Link>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-slate-900 dark:text-white font-bold">eBay Fee Calculator</span>
        </div>

        {/* Title & Headline */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            2026 eBay Managed Payments Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            eBay Fee &amp; Profit Calculator
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Calculate your exact net profit, final value fees, and break-even listing prices. Designed for US and UK sellers, factoring in category rates, Top Rated Plus discounts, store subscriptions, and Promoted Listings.
          </p>
        </div>

        {/* Primary Interactive Engine Component */}
        <EbayCalculatorWidget isStandalone={true} />

        {/* In-Depth Educational Guide & Policy Analysis */}
        <article className="mt-16 space-y-12 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          {/* Section 1: Anatomy of eBay Fees */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
              <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
              How eBay Seller Fees Work in 2026 (Managed Payments)
            </h2>
            <p>
              Under eBay Managed Payments, sellers no longer pay separate PayPal transaction fees. Instead, all processing is consolidated into a single <strong>Final Value Fee (FVF)</strong> deducted directly from your gross sale proceeds before payouts reach your checking account.
            </p>
            <p>
              The 2026 eBay fee structure consists of four core components:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                  <i className="fa-solid fa-percent text-blue-500"></i>
                  1. Variable Final Value Fee
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Most categories charge <strong>13.25%</strong> on the first $7,500 of the total transaction (item + shipping + sales tax), dropping to <strong>2.35%</strong> on any amount over $7,500.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                  <i className="fa-solid fa-receipt text-indigo-500"></i>
                  2. Fixed Per-Order Fee
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  A flat <strong>$0.30 per order</strong> fee applies if total order revenue exceeds $10.00. For micro-orders of $10.00 or less, the fixed fee increases to <strong>$0.40</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                  <i className="fa-solid fa-bullhorn text-amber-500"></i>
                  3. Promoted Listings Ad Fee
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  If you opt into Promoted Listings Standard, you choose an ad rate (typically 2% to 15%). eBay only assesses this fee if a buyer clicks your sponsored ad and purchases within 30 days.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                  <i className="fa-solid fa-box text-emerald-500"></i>
                  4. Insertion Fees
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Every seller receives <strong>250 free listing allocations</strong> each month. Listings beyond this quota incur a flat $0.35 insertion fee per listing.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: 2026 Category Fee Table */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
              <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
              2026 eBay Category Fee Rates (US Market)
            </h2>
            <p>
              Final Value Fees differ substantially based on what you sell. Below is the official breakdown of standard rates and store subscription tier discounts:
            </p>
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-bold">
                    <th className="p-3">Category</th>
                    <th className="p-3">Standard FVF Rate</th>
                    <th className="p-3">Store Subscriber Rate</th>
                    <th className="p-3">Over-Threshold Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
                  <tr>
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Most Categories (Clothing, Toys, Home)</td>
                    <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">13.25% (up to $7,500)</td>
                    <td className="p-3">12.35% (up to $2,500)</td>
                    <td className="p-3 font-mono">2.35%</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Books, DVDs, Movies &amp; Music</td>
                    <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">14.95% (up to $7,500)</td>
                    <td className="p-3">13.25%</td>
                    <td className="p-3 font-mono">2.35%</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Guitars &amp; Basses</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">6.35% (up to $7,500)</td>
                    <td className="p-3">6.35%</td>
                    <td className="p-3 font-mono">2.35%</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Athletic Shoes / Sneakers ($150+)</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">8.00% (No insertion fee)</td>
                    <td className="p-3">7.00%</td>
                    <td className="p-3 font-mono">8.00% flat</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Computers, Tablets &amp; Hardware</td>
                    <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">13.25% (up to $7,500)</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">9.00% (up to $2,500)</td>
                    <td className="p-3 font-mono">2.35%</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Jewelry &amp; Luxury Watches</td>
                    <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">15.00% (up to $1,000)</td>
                    <td className="p-3">12.50%</td>
                    <td className="p-3 font-mono">9.0% / 2.35%</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Heavy Equipment &amp; Commercial</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">3.00% (Capped at $250)</td>
                    <td className="p-3">3.00%</td>
                    <td className="p-3 font-mono">Capped at $250</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: The Secret to Saving - Top Rated Plus & Stores */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
              <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
              How to Slash eBay Fees: Top Rated Plus &amp; Store Subscriptions
            </h2>
            <p>
              High-volume resellers leverage two primary tactics to drastically lower their effective take-rate:
            </p>
            <div className="space-y-4 pt-2">
              <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60">
                <h3 className="font-bold text-blue-950 dark:text-blue-200 mb-1 text-base">
                  Top Rated Plus (10% Fee Discount)
                </h3>
                <p className="text-xs sm:text-sm text-blue-900/90 dark:text-blue-200/90">
                  Sellers who maintain Top Rated status and offer same-day or 1-day handling plus 30-day free returns receive the prestigious Top Rated Plus seal. This unlocks an immediate <strong>10% discount on the variable Final Value Fee</strong>. For example, a $100 sale with a $13.25 fee drops to $11.93. Over hundreds of orders, this saves thousands of dollars annually.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60">
                <h3 className="font-bold text-indigo-950 dark:text-indigo-200 mb-1 text-base">
                  eBay Store Subscriptions (When is it worth it?)
                </h3>
                <p className="text-xs sm:text-sm text-indigo-900/90 dark:text-indigo-200/90">
                  A Basic Store costs $21.95/month (annual billing) and includes 1,000 zero-insertion-fee listings plus reduced category fees (e.g., Electronics drops from 13.25% to 9.0%). If you sell more than $1,500/month in computer hardware or tech gear, the fee savings alone completely pay for the monthly store subscription cost.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: eBay UK Policy Overhaul */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
              <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
              eBay UK 2026 Rules: 0% Selling Fees for Private Sellers
            </h2>
            <p>
              In a historic move, eBay UK eliminated basic selling fees for private consumer sellers across almost all retail categories (excluding motors and vehicles). This change was engineered to compete directly with Vinted and Depop in the United Kingdom.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>Private Individual Sellers:</strong> Pay 0% basic final value fees. Buyers pay a small regulatory and protection charge at checkout.
              </li>
              <li>
                <strong>Business Sellers:</strong> Continue to pay standard commercial fees: typically <strong>12.9% + £0.30</strong> per order, plus the mandatory <strong>0.42% UK Regulatory Operating Fee</strong>.
              </li>
            </ul>
            <p className="text-xs text-slate-500 italic mt-2">
              Our calculator above includes a dedicated toggle for UK Private vs UK Business sellers so your calculations are always 100% compliant with live policy.
            </p>
          </section>

          {/* Section 5: The Mathematical Formula */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
              <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
              The Exact Mathematical Profit Formula
            </h2>
            <p>
              To ensure mathematical precision, our engine executes the following standardized formula:
            </p>
            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm space-y-2 border border-slate-800">
              <p className="text-blue-400 font-bold">// 1. Gross Transaction Amount</p>
              <p>GrossOrder = SoldPrice + ShippingChargedToBuyer + SalesTaxCollected</p>
              <p className="text-blue-400 font-bold pt-2">// 2. Total eBay Take</p>
              <p>FinalValueFee = (GrossOrder * CategoryRate) * (IsTopRatedPlus ? 0.90 : 1.0)</p>
              <p>FixedFee = GrossOrder &gt; 10.00 ? 0.30 : 0.40</p>
              <p>TotalEbayFees = FinalValueFee + FixedFee + AdFee + IntlFee + InsertionFee</p>
              <p className="text-blue-400 font-bold pt-2">// 3. Net Take-Home Profit</p>
              <p>NetPayout = GrossOrder - TotalEbayFees</p>
              <p className="text-emerald-400 font-bold">NetProfit = NetPayout - (ItemCost + ActualShippingCost)</p>
            </div>
          </section>

          {/* Section 6: FAQ Section */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
              <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
              Frequently Asked Questions (eBay Seller Fees 2026)
            </h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-2 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center font-bold">
                      ?
                    </span>
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
                    {item.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Cross-Platform Flagship Engines Internal Linking */}
          <section className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white space-y-6 border border-blue-900/40">
            <div>
              <h2 className="text-xl sm:text-2xl font-black mb-2">Explore Related Seller Fee Calculators</h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Compare payout margins and seller platform fees across the largest global marketplaces.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
              <Link
                href="/calculators/amazon-fba-fee-calculator"
                className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-500 transition-all group"
              >
                <div className="font-bold text-white group-hover:text-amber-400 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-amber-500 text-white flex items-center justify-center font-bold text-[10px]">a</span> Amazon FBA
                </div>
                <div className="text-[10px] text-slate-400 mt-1">8%-15% &bull; FBA vs FBM</div>
              </Link>

              <Link
                href="/calculators/etsy-fee-calculator"
                className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-orange-500 transition-all group"
              >
                <div className="font-bold text-white group-hover:text-orange-400 flex items-center gap-1.5">
                  <i className="fa-brands fa-etsy text-orange-500"></i> Etsy Calculator
                </div>
                <div className="text-[10px] text-slate-400 mt-1">6.5% + $0.20 &bull; Ads</div>
              </Link>

              <Link
                href="/calculators/whatnot-fee-calculator"
                className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-500 transition-all group"
              >
                <div className="font-bold text-white group-hover:text-amber-400 flex items-center gap-1.5">
                  <i className="fa-solid fa-video text-amber-500"></i> Whatnot Calculator
                </div>
                <div className="text-[10px] text-slate-400 mt-1">8% + 2.9% live stream</div>
              </Link>

              <Link
                href="/depop-fee-calculator"
                className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-rose-500 transition-all group"
              >
                <div className="font-bold text-white group-hover:text-rose-400 flex items-center gap-1.5">
                  <i className="fa-solid fa-shirt text-rose-500"></i> Depop Calculator
                </div>
                <div className="text-[10px] text-slate-400 mt-1">0% fee rule &bull; 3.3% cut</div>
              </Link>

              <Link
                href="/calculators/tiktok-shop-fee-calculator"
                className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-pink-500 transition-all group"
              >
                <div className="font-bold text-white group-hover:text-pink-400 flex items-center gap-1.5">
                  <i className="fa-brands fa-tiktok text-pink-500"></i> TikTok Shop
                </div>
                <div className="text-[10px] text-slate-400 mt-1">6% US &bull; Affiliate cuts</div>
              </Link>

              <Link
                href="/calculators/cash-app-fee-calculator"
                className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500 transition-all group"
              >
                <div className="font-bold text-white group-hover:text-emerald-400 flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-[9px]">$</span> Cash App
                </div>
                <div className="text-[10px] text-slate-400 mt-1">1.75% instant &bull; 2.75% biz</div>
              </Link>

              <Link
                href="/1099-tax-calculator"
                className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500 transition-all group"
              >
                <div className="font-bold text-white group-hover:text-emerald-400 flex items-center gap-1.5">
                  <i className="fa-solid fa-file-invoice-dollar text-emerald-500"></i> 1099 Tax Tool
                </div>
                <div className="text-[10px] text-slate-400 mt-1">15.3% SE tax &bull; IRS safe harbor</div>
              </Link>

              <Link
                href="/paypal-fee-calculator"
                className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-blue-400 transition-all group"
              >
                <div className="font-bold text-white group-hover:text-blue-300 flex items-center gap-1.5">
                  <i className="fa-brands fa-paypal text-blue-400"></i> PayPal Calculator
                </div>
                <div className="text-[10px] text-slate-400 mt-1">3.49% + $0.49 G&amp;S</div>
              </Link>

              <Link
                href="/stripe-fee-calculator"
                className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-indigo-400 transition-all group"
              >
                <div className="font-bold text-white group-hover:text-indigo-300 flex items-center gap-1.5">
                  <i className="fa-brands fa-stripe text-indigo-400"></i> Stripe Calculator
                </div>
                <div className="text-[10px] text-slate-400 mt-1">2.9% + 30¢ processing</div>
              </Link>
            </div>
          </section>
        </article>
      </main>

      {/* Global Legal & Trust Footer */}
      <SiteLegalFooter />
    </div>
  );
}
