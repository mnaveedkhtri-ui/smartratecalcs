import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteLegalFooter } from '../../../components/SiteLegalFooter';
import { PROGRAMMATIC_CALCULATORS } from '../../../data/programmatic-calculators';
import ProgrammaticCalculatorWidget from '../../../components/ProgrammaticCalculatorWidget';
import ThemeToggle from '../../../components/ThemeToggle';

interface Props {
  params: {
    slug: string;
  };
}

const EXCLUDED_SLUGS = new Set([
  'tiktok-shop-seller-fee-calculator',
  'upwork-to-jazzcash-payout-calculator',
  'ebay-seller-fee-and-profit-calculator',
  'amazon-fba-profit-margin-calculator',
  'etsy-seller-fee-and-profit-calculator',
  'poshmark-seller-fee-calculator',
  'cash-app-business-fee-calculator',
  'venmo-business-fee-calculator',
  'fiverr-commission-fee-calculator',
  'paypal-goods-and-services-fee-calculator',
  'remitly-to-pakistan-fee-calculator',
  'upwork-service-fee-payout-calculator',
  'wise-to-bdo-bank-php-calculator',
  'payoneer-to-gcash-philippines-calculator',
]);

export async function generateStaticParams() {
  return PROGRAMMATIC_CALCULATORS
    .filter((calc) => !EXCLUDED_SLUGS.has(calc.slug))
    .map((calc) => ({
      slug: calc.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (EXCLUDED_SLUGS.has(params.slug)) return {};
  const calc = PROGRAMMATIC_CALCULATORS.find((c) => c.slug === params.slug);
  if (!calc) return {};

  const url = `https://www.smartratecalcs.com/calculators/${calc.slug}`;

  return {
    title: {
      absolute: calc.metaTitle,
    },
    description: calc.metaDesc,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: calc.metaTitle,
      description: calc.metaDesc,
      url,
      type: 'article',
      images: [
        {
          url: 'https://www.smartratecalcs.com/og-image.png',
          width: 1200,
          height: 630,
          alt: calc.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: calc.metaTitle,
      description: calc.metaDesc,
      images: ['https://www.smartratecalcs.com/og-image.png'],
    },
  };
}

export default function CalculatorPage({ params }: Props) {
  if (EXCLUDED_SLUGS.has(params.slug)) notFound();
  const calc = PROGRAMMATIC_CALCULATORS.find((c) => c.slug === params.slug);
  if (!calc) notFound();

  const currentUrl = `https://www.smartratecalcs.com/calculators/${calc.slug}`;

  // Compute exact server-rendered financial tiers and reverse invoice math for deep E-E-A-T authority
  const sourceCurr = calc.sourceCurrency || 'USD';
  const targetCurr = calc.targetCurrency || 'USD';
  const baseRate = calc.baseExchangeRate || 1.0;
  const fixedFee = calc.fixedFee || 0;
  const percentFee = calc.percentFee || 0;
  const spread = calc.exchangeRateSpread || 0;
  const isDomestic = sourceCurr === targetCurr && spread === 0;
  const effectiveRate = baseRate * (1 - spread);
  const defaultAmt = calc.defaultAmount || 1000;

  const targetSym =
    targetCurr === 'PKR'
      ? 'Rs. '
      : targetCurr === 'INR'
      ? '₹'
      : targetCurr === 'BDT'
      ? '৳'
      : targetCurr === 'PHP'
      ? '₱'
      : targetCurr === 'NGN'
      ? '₦'
      : targetCurr === 'EUR'
      ? '€'
      : targetCurr === 'GBP'
      ? '£'
      : '$';

  const sourceSym = sourceCurr === 'EUR' ? '€' : sourceCurr === 'GBP' ? '£' : '$';

  const tierAmounts = [100, 250, 500, 1000, 2500, 5000];
  const tierRows = tierAmounts.map((gross) => {
    const upfrontFee = gross * percentFee + fixedFee;
    const afterFee = Math.max(0, gross - upfrontFee);
    const fxSpreadUsd = isDomestic ? 0 : afterFee * spread;
    const totalLossUsd = upfrontFee + fxSpreadUsd;
    const effectiveDragPct = gross > 0 ? (totalLossUsd / gross) * 100 : 0;
    const netTarget = isDomestic
      ? Number(afterFee.toFixed(2))
      : Math.round(afterFee * effectiveRate);
    return {
      gross,
      upfrontFee,
      fxSpreadUsd,
      effectiveDragPct,
      netTarget,
    };
  });

  // Reverse invoice calculation: gross to bill so user clears defaultAmt in sourceCurr value after fees & spread
  const effectiveCombinedRate = 1 - (1 - percentFee) * (1 - spread);
  const reverseGrossForDefault =
    percentFee < 1 && spread < 1
      ? (defaultAmt / (1 - spread) + fixedFee) / (1 - percentFee)
      : defaultAmt;
  const reverseFeePassed = Math.max(0, reverseGrossForDefault - defaultAmt);

  // Benchmark for $1,000 and $24,000 annual volume
  const feeAt1000 = 1000 * percentFee + fixedFee;
  const fxAt1000 = isDomestic ? 0 : Math.max(0, 1000 - feeAt1000) * spread;
  const netAt1000 = isDomestic
    ? (1000 - feeAt1000).toFixed(2)
    : Math.round((1000 - feeAt1000) * effectiveRate).toLocaleString();
  const reverseGrossFor1000 =
    percentFee < 1 && spread < 1
      ? (1000 / (1 - spread) + fixedFee) / (1 - percentFee)
      : 1000;
  const annualDragAt24k = (24000 * percentFee + fixedFee * 24 + (isDomestic ? 0 : (24000 * (1 - percentFee) - fixedFee * 24) * spread)).toFixed(0);

  const generatedFaqs = [
    {
      q: `How much are total fees on a ${sourceSym}1,000 transaction using ${calc.primaryKeyword}?`,
      a: `On a ${sourceSym}1,000 transfer or sale, upfront percentage and fixed fees equal ${sourceSym}${feeAt1000.toFixed(2)}${fxAt1000 > 0 ? ` plus ${sourceSym}${fxAt1000.toFixed(2)} in hidden currency conversion spread (${(spread * 100).toFixed(2)}%)` : ''}. Your net take-home payout is ${targetSym}${netAt1000} ${targetCurr}.`,
    },
    {
      q: `How much should I invoice a client so I net exactly ${sourceSym}1,000 after fees?`,
      a: `Using the reverse surcharge formula (${sourceCurr} Net / (1 - Spread) + Fixed Fee) / (1 - Fee Rate), you must bill ${sourceSym}${reverseGrossFor1000.toFixed(2)} ${sourceCurr} so that after platform deductions and FX conversion, you clear a full ${sourceSym}1,000 in take-home value.`,
    },
    {
      q: `How much does this fee schedule cost a freelancer or seller making ${sourceSym}2,000/month annually?`,
      a: `At ${sourceSym}24,000 in annual gross volume (${sourceSym}2,000 across 24 payouts or orders), total combined platform fees and currency markups equal approximately ${sourceSym}${Number(annualDragAt24k).toLocaleString()} ${sourceCurr} per year (${(effectiveCombinedRate * 100).toFixed(2)}% combined rate drag).`,
    },
  ];

  const allFaqs = [...calc.faqs, ...generatedFaqs];

  // 1. FAQ Schema for Google Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  // 2. BreadcrumbList Schema for Google SERP Navigation Trail
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
        name: calc.title,
        item: currentUrl,
      },
    ],
  };

  // 3. WebPage with Semantic Entity Grounding for Google AI Overviews
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: calc.title,
    description: calc.description,
    url: currentUrl,
    about: calc.wikidataEntities
      ? calc.wikidataEntities.map((uri) => ({
          '@type': 'Thing',
          sameAs: uri,
        }))
      : undefined,
    author: {
      '@type': 'Person',
      name: 'Muhammad Naveed',
      jobTitle: 'Lead Software & Financial Systems Engineer',
      url: 'https://www.smartratecalcs.com/about',
    },
    dateModified: '2026-11-02',
  };

  // 4. SoftwareApplication Schema for Rich Snippets
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: calc.title,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    url: currentUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'Muhammad Naveed',
      url: 'https://www.smartratecalcs.com/about',
    },
  };

  // Related calculators (prefer same category or target currency, exclude current)
  const relatedCalculators = PROGRAMMATIC_CALCULATORS.filter(
    (c) =>
      c.slug !== calc.slug &&
      (c.targetCurrency === calc.targetCurrency || c.category === calc.category)
  ).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070d17] text-slate-800 dark:text-slate-100 transition-colors duration-200">
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      {/* Header */}
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
            <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm">
              <i className="fa-solid fa-calculator"></i>
            </span>
            SmartRate<span className="text-emerald-600 dark:text-emerald-400">Calcs</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            >
              &larr; <span className="hidden sm:inline">All</span> Calculators
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Breadcrumb Trail (Navboost Signal) */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 font-mono">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">
            Home
          </Link>
          <span>/</span>
          <span className="capitalize">{calc.category}</span>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 font-bold truncate max-w-[200px] sm:max-w-none">
            {calc.primaryKeyword}
          </span>
        </nav>

        {/* Title & Meta Info */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold mb-3 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Verified 2026 Financial Specification &bull; Q4 Interbank Rates
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            {calc.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {calc.description}
          </p>
        </div>

        {calc.slug === 'tiktok-shop-seller-fee-calculator' && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <i className="fa-brands fa-tiktok text-rose-600 text-lg"></i>
              <span className="text-slate-700 dark:text-slate-200">
                Need to calculate <strong>Creator Affiliate Commissions (10-20%)</strong> and <strong>FBT Shipping</strong>?
              </span>
            </div>
            <Link
              href="/calculators/tiktok-shop-fee-calculator"
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-center transition-colors shrink-0"
            >
              Launch Flagship TikTok Engine &rarr;
            </Link>
          </div>
        )}

        {/* INTERACTIVE CLIENT CALCULATOR WIDGET */}
        <ProgrammaticCalculatorWidget calc={calc} />

        {/* AI OVERVIEW DIRECT ANSWER BOX (Engineered specifically for Google AI Overviews / SGE citation) */}
        <section className="mb-10 p-6 sm:p-7 rounded-3xl bg-emerald-50/80 dark:bg-emerald-950/40 border-2 border-emerald-500/80 dark:border-emerald-500/60 shadow-sm relative">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider mb-2 font-mono">
            <i className="fa-solid fa-sparkles text-emerald-600 dark:text-emerald-400"></i>
            <span>Key Takeaway &amp; Summary (Direct Answer)</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-relaxed font-medium mb-4">
            {calc.quickAnswer}
          </p>
          <div className="pt-3 border-t border-emerald-200/80 dark:border-emerald-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-300 font-mono">
            <div>
              <strong className="text-slate-900 dark:text-white">Formula:</strong> {calc.formula}
            </div>
            <div className="text-emerald-700 dark:text-emerald-400 font-semibold">
              Verified by Muhammad Naveed
            </div>
          </div>
        </section>

        {/* MULTI-TIER PAYOUT & COST DRAG MATRIX (Deep Empirical Content for Google Helpful Content & Featured Snippets) */}
        <section className="mb-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-mono">
              <i className="fa-solid fa-table-list"></i>
              <span>2026 Fee Schedule &amp; Payout Benchmark</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {calc.title}: 6-Tier Net Payout Breakdown
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Standard fee percentages ({(percentFee * 100).toFixed(2)}%{fixedFee > 0 ? ` + ${sourceSym}${fixedFee.toFixed(2)} fixed` : ''}) behave differently across small vs. large payouts. Use the pre-calculated 2026 schedule below to compare upfront deductions{!isDomestic ? ` and ${(spread * 100).toFixed(2)}% currency spread drag` : ''} from {sourceSym}100 up to {sourceSym}5,000.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800">
                  <th className="p-3.5 font-bold">Gross ({sourceCurr})</th>
                  <th className="p-3.5 font-bold">Upfront Fee</th>
                  {!isDomestic && <th className="p-3.5 font-bold">FX Spread Cost</th>}
                  <th className="p-3.5 font-bold">Effective Drag</th>
                  <th className="p-3.5 font-bold text-emerald-700 dark:text-emerald-400">Net Payout ({targetCurr})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300">
                {tierRows.map((row) => (
                  <tr key={row.gross} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                      {sourceSym}{row.gross.toLocaleString()}
                    </td>
                    <td className="p-3.5 text-rose-600 dark:text-rose-400">
                      -{sourceSym}{row.upfrontFee.toFixed(2)}
                    </td>
                    {!isDomestic && (
                      <td className="p-3.5 text-amber-600 dark:text-amber-400">
                        -{sourceSym}{row.fxSpreadUsd.toFixed(2)}
                      </td>
                    )}
                    <td className="p-3.5">{row.effectiveDragPct.toFixed(2)}%</td>
                    <td className="p-3.5 font-bold text-emerald-700 dark:text-emerald-400">
                      {targetSym}{row.netTarget.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* WORKED REVERSE INVOICE & CORRIDOR OPTIMIZATION GUIDE */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
              <i className="fa-solid fa-calculator text-emerald-600 dark:text-emerald-400"></i>
              <span>Reverse Pass-Through Math</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              How to Clear {sourceSym}{defaultAmt.toLocaleString()} {sourceCurr} Net
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Adding a simple {(percentFee * 100).toFixed(2)}% markup on top of your invoice leaves you short because the processor deducts its percentage from the <em>new higher gross total</em>. To protect 100% of your {sourceSym}{defaultAmt.toLocaleString()} target payout, apply the reverse gross-up equation:
            </p>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200 space-y-1">
              <div>Invoice Gross = ({defaultAmt} / {(1 - spread).toFixed(4)} + {fixedFee.toFixed(2)}) / {(1 - percentFee).toFixed(4)}</div>
              <div className="text-emerald-700 dark:text-emerald-400 font-bold">
                Target Bill Amount = {sourceSym}{reverseGrossForDefault.toFixed(2)} {sourceCurr} (+{sourceSym}{reverseFeePassed.toFixed(2)} fee buffer)
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Need full US state surcharge compliance rules? Read our{' '}
              <Link href="/blog/credit-card-surcharge-formula-invoice-square-fees-guide" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">
                Credit Card Surcharge Formula Guide
              </Link>.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
              <i className="fa-solid fa-shield-check text-emerald-600 dark:text-emerald-400"></i>
              <span>Corridor Compliance &amp; Savings</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {targetCurr === 'PKR'
                ? 'Pakistan SBP & FBR Section 154A Compliance'
                : targetCurr === 'INR'
                ? 'India RBI LRS / LUT & e-FIRC Tax Rules'
                : targetCurr === 'BDT'
                ? 'Bangladesh 2.5% Remittance & Payout Rules'
                : '2026 Fee Optimization & Tax Reporting'}
            </h2>
            {targetCurr === 'PKR' ? (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                For {sourceCurr} to PKR remittances, avoid hidden 2.0% to 3.5% retail bank spreads by matching mid-market FX corridors. Registered IT exporters holding an active PSEB certificate qualify for a reduced <strong>0.25% FBR Section 154A final tax</strong> (vs. 1.0% unregistered) when funds settle with SBP IT Purpose Code 9186. See our{' '}
                <Link href="/blog/pakistan-freelancer-tax-section-154a-pseb-guide" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">
                  Pakistan Section 154A Tax Guide
                </Link>{' '}
                or{' '}
                <Link href="/blog/wise-vs-payoneer-fees-2026-freelancer-cross-border-withdrawal-guide" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">
                  Wise vs Payoneer FX Audit
                </Link>.
              </p>
            ) : targetCurr === 'INR' ? (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Indian exporters receiving foreign payments can file a zero-rated GST Letter of Undertaking (LUT) to save 18% IGST on export revenue, and retain digital e-FIRC / FIRA certificates for every inward wire. Compare mid-market conversion spreads in our{' '}
                <Link href="/blog/wise-vs-payoneer-fees-2026-freelancer-cross-border-withdrawal-guide" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">
                  Wise vs Payoneer Cross-Border Guide
                </Link>.
              </p>
            ) : targetCurr === 'BDT' ? (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Freelancers remitting foreign currency through authorized Bangladeshi commercial banks or regulated mobile wallets can check eligibility for the 2.5% cash remittance incentive and minimize intermediary SWIFT deduction losses by routing via local ACH rails.
              </p>
            ) : (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Across {calc.category} platforms in 2026, small fixed-cent charges ($0.30 to $0.49) and cross-border currency conversion spreads (1.0% to 2.0%) disproportionately erode sub-$100 orders. Consolidating payouts or switching payment rails can save{' '}
                <strong>{calc.recommendation ? calc.recommendation.savingPct : '1.5% to 2.5%'}</strong> on gross volume. Review our{' '}
                <Link href="/blog/1099-safe-harbor-rule-quarterly-estimated-taxes-guide" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">
                  1099 Safe Harbor Tax Guide
                </Link>{' '}
                and{' '}
                <Link href="/blog/stripe-vs-paypal-fees-2026-international-cross-border-comparison-guide" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">
                  Stripe vs PayPal Fee Breakdown
                </Link>.
              </p>
            )}
          </div>
        </section>

        {/* FAQ Schema Section for Google Ranking */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
            <i className="fa-solid fa-circle-question text-emerald-600 dark:text-emerald-400"></i>
            <span>Knowledge Base &amp; FAQs</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {allFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Flagship Calculators Mesh (PageRank Amplifier across 52 programmatic pages) */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
            <i className="fa-solid fa-layer-group text-emerald-600 dark:text-emerald-400"></i>
            <span>Flagship Freelance &amp; Gateway Engines</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Essential Contractor Fee Calculators
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <Link
              href="/square-fee-calculator"
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-900 dark:hover:border-white hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <i className="fa-solid fa-square text-slate-800 dark:text-slate-200 text-xs"></i> Square (US)
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">2.6% POS / 3.3% Inv</div>
            </Link>

            <Link
              href="/1099-tax-calculator"
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-600 hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center gap-1.5">
                <i className="fa-solid fa-file-invoice-dollar text-emerald-500 text-xs"></i> 1099 Tax (IRS)
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">15.3% SE Safe Harbor</div>
            </Link>

            <Link
              href="/upwork-fee-calculator"
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center gap-1.5">
                <i className="fa-solid fa-briefcase text-emerald-500 text-xs"></i> Upwork
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">10% Cut &amp; Bid</div>
            </Link>

            <Link
              href="/fiverr-fee-calculator"
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#1dbf73] hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#1dbf73] flex items-center gap-1.5">
                <i className="fa-solid fa-tag text-[#1dbf73] text-xs"></i> Fiverr
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">20% Seller Cut</div>
            </Link>

            <Link
              href="/payoneer-fee-calculator"
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500 hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 flex items-center gap-1.5">
                <i className="fa-solid fa-coins text-orange-500 text-xs"></i> Payoneer
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">2% FX Spread</div>
            </Link>

            <Link
              href="/freelance-hourly-rate-calculator"
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 flex items-center gap-1.5">
                <i className="fa-solid fa-business-time text-teal-500 text-xs"></i> Hourly Rate
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">Pricing Architect</div>
            </Link>

            <Link
              href="/paypal-fee-calculator"
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center gap-1.5">
                <i className="fa-brands fa-paypal text-blue-500 text-xs"></i> PayPal
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">3.49% + $0.49</div>
            </Link>

            <Link
              href="/stripe-fee-calculator"
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1.5">
                <i className="fa-brands fa-stripe text-indigo-500 text-xs"></i> Stripe
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">2.9% + $0.30</div>
            </Link>
          </div>
        </div>

        {/* Related Calculators Internal Linking Grid (PageRank Distribution) */}
        {relatedCalculators.length > 0 && (
          <div className="space-y-4 mb-12">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
              <i className="fa-solid fa-sitemap text-emerald-600 dark:text-emerald-400"></i>
              <span>Related Financial Tools</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Explore More Cross-Border Calculators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedCalculators.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/calculators/${rel.slug}`}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase font-mono mb-1">
                      {rel.targetCurrency ? `${rel.sourceCurrency || 'USD'} → ${rel.targetCurrency}` : rel.category}
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {rel.title}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-mono flex items-center justify-between">
                    <span>Calculate &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio Box for E-E-A-T Ranking Signals */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-md">
            MN
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase font-mono">
              Lead Systems Engineer &bull; Verified Spec
            </div>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
              Muhammad Naveed
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Full-Stack &amp; Automation Engineer specializing in cross-border financial architectures, automated forex routing, and developer payout infrastructure.
            </p>
            <div className="pt-1 flex flex-wrap gap-3 justify-center sm:justify-start text-xs text-slate-500 dark:text-slate-400 font-mono">
              <a
                href="https://www.smartratecalcs.com/about"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 underline font-semibold"
              >
                Portfolio &rarr;
              </a>
              <a
                href="https://github.com/mnaveedkhtri-ui"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 underline"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </main>

      <SiteLegalFooter />
    </div>
  );
}
