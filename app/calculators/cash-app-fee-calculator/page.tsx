import { Metadata } from 'next';
import Link from 'next/link';
import CashAppCalculatorWidget from '../../../components/CashAppCalculatorWidget';
import ThemeToggle from '../../../components/ThemeToggle';
import { SiteLegalFooter } from '../../../components/SiteLegalFooter';

export const metadata: Metadata = {
  title: 'Cash App Fee Calculator (2026) | Instant Deposit, Business & Send Fees',
  description:
    'Free 2026 Cash App fee calculator. Calculate exact deductions for 1.75% instant transfers, 2.75% Cash for Business receipts, 3% credit card funding, and net take-home bank deposits.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/calculators/cash-app-fee-calculator',
  },
  openGraph: {
    title: 'Cash App Fee Calculator 2026 | Instant Transfer & Business Payouts',
    description:
      'Calculate your exact payout from Cash App. Factor in 1.75% instant debit card transfers, 2.75% merchant business cuts, and credit card funding fees.',
    url: 'https://www.smartratecalcs.com/calculators/cash-app-fee-calculator',
    type: 'website',
    images: [
      {
        url: 'https://www.smartratecalcs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cash App Fee Calculator - SmartRateCalcs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cash App Fee Calculator 2026 (Live Instant & Business Engine)',
    description:
      'Calculate exact deductions on Cash App transfers, instant deposits, and business invoicing.',
    images: ['https://www.smartratecalcs.com/og-image.png'],
  },
};

export default function CashAppCalculatorPage() {
  const pageUrl = 'https://www.smartratecalcs.com/calculators/cash-app-fee-calculator';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are Cash App fees in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In 2026, standard P2P transfers using a linked bank account, debit card, or Cash App balance are 100% free. Fees only apply to specific transaction types: Instant Deposits to a debit card cost 0.5% to 1.75% (minimum $0.25); Cash for Business accounts pay 2.75% on received payments; sending money with a linked credit card incurs a 3.0% fee; and out-of-network ATM withdrawals cost $2.50.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does Cash App charge for an instant deposit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cash App charges 1.75% of the total transfer amount for instant cash-outs to a debit card, with a minimum fee of $0.25. If you do not need the money immediately, you can choose Standard Deposit for free ($0), which takes 1 to 3 business days to arrive in your checking account.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the fee for a Cash App for Business account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cash App automatically deducts a 2.75% processing fee from every commercial payment received by a Cash for Business account. Unlike personal accounts, business accounts receive automatic free instant deposits to linked debit cards and can accept payments via Cash App Pay.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does Cash App charge 3% to send money with a credit card?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The 3% fee covers interchange and card network processing fees assessed by Visa, Mastercard, American Express, and Discover. To avoid this 3% fee, fund your transfers using your Cash App balance, linked debit card, or verified bank account.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will Cash App send me an IRS Form 1099-K in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cash App will issue Form 1099-K to Cash for Business accounts that receive more than $5,000 in gross payments during the calendar year under current IRS transition thresholds. Personal peer-to-peer transfers (splitting dinner, gifts, rent reimbursements) are not reported on Form 1099-K.',
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
        name: 'Cash App Fee Calculator',
        item: pageUrl,
      },
    ],
  };

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Cash App Fee & Payout Calculator (2026)',
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
              <Link href="/calculators/square-fee-calculator" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Square POS
              </Link>
              <Link href="/calculators/tiktok-shop-fee-calculator" className="hover:text-rose-500 transition-colors">
                TikTok Shop
              </Link>
              <Link href="/calculators/depop-fee-calculator" className="hover:text-red-500 transition-colors">
                Depop 0%
              </Link>
              <Link href="/calculators/1099-tax-calculator" className="hover:text-emerald-600 transition-colors">
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
            <span className="text-slate-900 dark:text-white font-bold">Cash App Fee Calculator</span>
          </nav>
        </div>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Hero Section */}
          <section className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold mb-4 font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Official 2026 Block Inc. Rates &bull; 1.75% Instant &bull; 2.75% Business Verified</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight leading-[1.2] mb-4">
              Cash App Fee &amp; Payout Calculator
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Calculate exact take-home funds on Cash App. Factor in the <strong className="text-slate-900 dark:text-white font-semibold">1.75% instant transfer fee</strong> ($0.25 minimum), 2.75% Cash for Business merchant deductions, and 3% credit card funding charges.
            </p>
          </section>

          {/* Calculator Widget */}
          <CashAppCalculatorWidget isStandalone={true} />

          {/* Editorial Analysis & Guide */}
          <div className="max-w-4xl mx-auto space-y-12 text-slate-700 dark:text-slate-300">
            {/* Section 1: The 2026 Cash App Fee Schedule */}
            <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <i className="fa-solid fa-table-list"></i>
                Official Fee Schedule
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
                How Cash App Calculates Fees in 2026
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Cash App operates on a freemium model. Basic peer-to-peer money transfers between family and friends funded by your Cash App balance, linked checking account, or debit card are completely free ($0). Fees are only assessed when users request speed (Instant Deposit), commercial processing (Cash for Business), or third-party network usage (credit cards and ATMs).
              </p>

              {/* Comprehensive Fee Table */}
              <div className="overflow-x-auto pt-4">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400">
                      <th className="py-2.5 px-3">Transaction Type</th>
                      <th className="py-2.5 px-3">Fee Rate</th>
                      <th className="py-2.5 px-3">Minimum Fee</th>
                      <th className="py-2.5 px-3">Who Pays</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                    <tr>
                      <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">Instant Deposit (Debit Card)</td>
                      <td className="py-3 px-3 text-emerald-600 dark:text-emerald-400 font-bold">1.75% (0.5% - 1.75%)</td>
                      <td className="py-3 px-3 font-bold">$0.25</td>
                      <td className="py-3 px-3">Sender / Cashing-Out User</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">Cash for Business (Received)</td>
                      <td className="py-3 px-3 text-emerald-600 dark:text-emerald-400 font-bold">2.75% flat</td>
                      <td className="py-3 px-3">$0.00</td>
                      <td className="py-3 px-3">Business Owner (Auto-deducted)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">Credit Card Funding</td>
                      <td className="py-3 px-3 text-rose-500 font-bold">3.0% added</td>
                      <td className="py-3 px-3">$0.00</td>
                      <td className="py-3 px-3">Sender</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">Standard Bank Deposit</td>
                      <td className="py-3 px-3 text-emerald-600 font-bold">FREE ($0.00)</td>
                      <td className="py-3 px-3">$0.00</td>
                      <td className="py-3 px-3">None (1-3 business days)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">Out-of-Network ATM</td>
                      <td className="py-3 px-3 text-amber-500 font-bold">$2.50 / withdrawal</td>
                      <td className="py-3 px-3">$2.50</td>
                      <td className="py-3 px-3">User ($0 with $300/mo Direct Deposit)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 2: Cash App Instant Deposit Math & The $0.25 Minimum Trap */}
            <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <i className="fa-solid fa-calculator"></i>
                Mathematical Analysis
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
                The 1.75% Instant Deposit Math: Watch the $0.25 Minimum
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                While Cash App advertises an Instant Deposit fee of 1.75%, the fee includes a non-negotiable <strong>$0.25 minimum charge</strong>. On small balances, this minimum fee substantially inflates your effective percentage cost:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs font-mono text-slate-500 uppercase font-bold mb-1">Cashing Out $10.00</div>
                  <div className="text-2xl font-black text-rose-500">$0.25 Fee</div>
                  <p className="text-[11px] text-slate-400 mt-1">Effective fee rate: <strong>2.50%</strong> (minimum fee applied).</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs font-mono text-slate-500 uppercase font-bold mb-1">Cashing Out $100.00</div>
                  <div className="text-2xl font-black text-emerald-500">$1.75 Fee</div>
                  <p className="text-[11px] text-slate-400 mt-1">Effective fee rate: <strong>1.75%</strong> (exact standard percentage).</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs font-mono text-slate-500 uppercase font-bold mb-1">Cashing Out $1,000.00</div>
                  <div className="text-2xl font-black text-emerald-500">$17.50 Fee</div>
                  <p className="text-[11px] text-slate-400 mt-1">Effective fee rate: <strong>1.75%</strong> (capped exactly at 1.75%).</p>
                </div>
              </div>
            </section>

            {/* Section 3: Cash App vs. Venmo vs. Zelle vs. PayPal */}
            <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-blue-500 uppercase tracking-wider">
                <i className="fa-solid fa-code-compare"></i>
                P2P Ecosystem Benchmark
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
                Cash App vs. Venmo vs. Zelle vs. PayPal
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Compare fees across the four major United States peer-to-peer and merchant transfer networks on a <strong>$200.00 transaction</strong>:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-950 text-white border border-emerald-800 text-center">
                  <div className="text-[11px] font-mono text-emerald-400 font-bold uppercase mb-1">Cash App Instant</div>
                  <div className="text-2xl font-extrabold font-mono text-white">$3.50</div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">1.75% ($0.25 min)</div>
                  <div className="mt-3 text-[11px] text-emerald-400 font-bold bg-emerald-900/60 py-1 rounded-lg border border-emerald-700/60">
                    Direct Debit Card Payout
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">Venmo Instant</div>
                  <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">$3.50</div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">1.75% ($0.25 min, $25 max)</div>
                  <div className="mt-3 text-[11px] text-blue-500 font-bold bg-blue-50 dark:bg-blue-950/50 py-1 rounded-lg border border-blue-200 dark:border-blue-900/40">
                    Social Feed Sharing
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">PayPal Instant</div>
                  <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">$3.50</div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">1.75% ($0.25 min, $25 max)</div>
                  <div className="mt-3 text-[11px] text-slate-500 font-bold bg-slate-100 dark:bg-slate-800 py-1 rounded-lg border border-slate-300 dark:border-slate-700">
                    Global Network
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">Zelle</div>
                  <div className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">$0.00</div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">100% Free Instant Bank-to-Bank</div>
                  <div className="mt-3 text-[11px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/50 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/40">
                    Zero Fees Always
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: 5 Actionable Ways to Avoid Cash App Fees */}
            <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
                <i className="fa-solid fa-shield-halved"></i>
                Pro Money Saving Tips
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
                5 Ways to Eliminate Cash App Fees Completely
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <strong className="text-slate-900 dark:text-white block">1. Use Standard ACH Deposit (Free)</strong>
                  <p className="text-slate-600 dark:text-slate-300">If you do not need cash within 30 minutes, choose Standard Deposit. It arrives in 1 to 3 business days with $0 fee.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <strong className="text-slate-900 dark:text-white block">2. Spend Directly via Cash Card</strong>
                  <p className="text-slate-600 dark:text-slate-300">Instead of cashing out to your external bank, use the free Cash App Visa Debit Card to make purchases or pay bills with 0% fee.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <strong className="text-slate-900 dark:text-white block">3. Never Fund with a Credit Card</strong>
                  <p className="text-slate-600 dark:text-slate-300">Link your checking account or debit card instead of a credit card to dodge the 3% transaction markup on every send.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <strong className="text-slate-900 dark:text-white block">4. Setup $300/Month Direct Deposit</strong>
                  <p className="text-slate-600 dark:text-slate-300">Receiving $300 in monthly paychecks unlocks free in-network ATM withdrawals and reimburses third-party ATM fees.</p>
                </div>
              </div>
            </section>

            {/* Section 5: Cash for Business & IRS 1099-K Taxes */}
            <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <i className="fa-solid fa-file-invoice-dollar"></i>
                Tax Compliance &amp; IRS 1099-K
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
                Cash App for Business Taxes &amp; Form 1099-K
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                If you use Cash App for Business to accept commercial client payments or retail goods sales, Cash App automatically deducts a <strong>2.75% processing fee</strong> per payment. Under IRS transition rules, Cash App must file and deliver <strong>Form 1099-K</strong> to business accounts that generate over <strong>$5,000 in gross annual sales</strong>.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Personal peer-to-peer accounts used exclusively for reimbursing friends, splitting meals, or gifts are exempt from 1099-K reporting. If you operate as a sole proprietor or 1099 contractor, use our companion{' '}
                <Link href="/calculators/1099-tax-calculator" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
                  1099 Tax Calculator
                </Link>{' '}
                to calculate self-employment tax deductions accurately.
              </p>
            </section>

            {/* Section 6: Frequently Asked Questions */}
            <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                <i className="fa-solid fa-circle-question"></i>
                Frequently Asked Questions
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
                Cash App Fee FAQs (2026)
              </h2>

              <div className="space-y-4 text-sm">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                    What are Cash App fees in 2026?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    In 2026, standard P2P transfers using a linked bank account, debit card, or Cash App balance are 100% free. Fees only apply to specific transaction types: Instant Deposits to a debit card cost 0.5% to 1.75% (minimum $0.25); Cash for Business accounts pay 2.75% on received payments; sending money with a linked credit card incurs a 3.0% fee; and out-of-network ATM withdrawals cost $2.50.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                    How much does Cash App charge for an instant deposit?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Cash App charges 1.75% of the total transfer amount for instant cash-outs to a debit card, with a minimum fee of $0.25. If you do not need the money immediately, you can choose Standard Deposit for free ($0), which takes 1 to 3 business days to arrive in your checking account.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                    What is the fee for a Cash App for Business account?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Cash App automatically deducts a 2.75% processing fee from every commercial payment received by a Cash for Business account. Unlike personal accounts, business accounts receive automatic free instant deposits to linked debit cards and can accept payments via Cash App Pay.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                    Why does Cash App charge 3% to send money with a credit card?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    The 3% fee covers interchange and card network processing fees assessed by Visa, Mastercard, American Express, and Discover. To avoid this 3% fee, fund your transfers using your Cash App balance, linked debit card, or verified bank account.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                    Will Cash App send me an IRS Form 1099-K in 2026?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Cash App will issue Form 1099-K to Cash for Business accounts that receive more than $5,000 in gross payments during the calendar year under current IRS transition thresholds. Personal peer-to-peer transfers (splitting dinner, gifts, rent reimbursements) are not reported on Form 1099-K.
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
