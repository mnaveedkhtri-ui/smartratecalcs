import { Metadata } from 'next';
import Link from 'next/link';
import UpworkToJazzCashWidget from '../../components/UpworkToJazzCashWidget';
import ThemeToggle from '../../components/ThemeToggle';
import { SiteLegalFooter } from '../../components/SiteLegalFooter';

export const metadata: Metadata = {
  title: 'Upwork to JazzCash & SadaPay Fee Calculator (2026) | Real PKR Net Payout',
  description:
    'Calculate exact PKR received when withdrawing from Upwork to JazzCash, SadaPay, Nayapay, or Pakistani banks. Compare Upwork Direct ($0.99 fee) vs Payoneer (2% spread) vs Wise with live conversion rates.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/upwork-to-jazzcash-calculator',
  },
  openGraph: {
    title: 'Upwork to JazzCash & SadaPay Fee Calculator (2026) | Real PKR Net Payout',
    description:
      'Calculate exact net PKR bank deposits for Upwork withdrawals. Compare Upwork Direct, Payoneer to JazzCash, SadaPay, and Wise with zero hidden spreads.',
    url: 'https://www.smartratecalcs.com/upwork-to-jazzcash-calculator',
    type: 'website',
    images: [
      {
        url: 'https://www.smartratecalcs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Upwork to JazzCash & SadaPay Calculator - SmartRateCalcs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upwork to JazzCash & SadaPay Fee Calculator (2026)',
    description:
      'Compare exact take-home PKR from Upwork across JazzCash, SadaPay, Payoneer, and Wise with 2026 fee breakdowns.',
    images: ['https://www.smartratecalcs.com/og-image.png'],
  },
};

export default function UpworkToJazzCashPage() {
  const pageUrl = 'https://www.smartratecalcs.com/upwork-to-jazzcash-calculator';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does Upwork charge to withdraw to JazzCash?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Upwork charges either $0.99 for Direct to Local Bank via JazzCash IBAN, or $2.00 if you withdraw to Payoneer and then transfer to JazzCash. In addition to the flat fee, both methods apply a 2% to 2.5% currency exchange rate markdown below the Google interbank rate.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Upwork Direct to Local Bank better than Payoneer to JazzCash?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For payouts over $150 USD, Upwork Direct to Local Bank via IBAN is slightly cheaper ($0.99 fee vs $2.00 Payoneer fee). However, Payoneer to JazzCash in-app transfer is instant (under 10 minutes), whereas Direct to Local Bank takes 1 to 3 business days to clear.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I withdraw from Upwork directly to SadaPay or Nayapay?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! SadaPay and Nayapay provide standard 24-digit Pakistani IBAN numbers. You can add them under Upwork Payment Methods as Direct to Local Bank (PKR). Upwork charges its standard $0.99 flat fee with no receiving fees charged by SadaPay or Nayapay.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can Pakistani freelancers avoid Upwork hidden exchange rate cuts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The most cost-effective method is withdrawing USD from Upwork to a US checking account (such as Wise or Elevate Pay) via ACH. Upwork charges $0.00 (free) for US bank transfers. You can then convert USD to PKR inside Wise at the true Google mid-market exchange rate with only a 0.5% transparent fee.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the PSEB tax deduction on Upwork foreign remittance in Pakistan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Under FBR Section 154A, registered IT exporters with the Pakistan Software Export Board (PSEB) pay a final concessional income tax rate of 1% on foreign export proceeds. Unregistered freelancers pay 2% withholding tax upon bank conversion.',
        },
      },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Upwork to JazzCash & SadaPay Calculator',
    operatingSystem: 'All',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: pageUrl,
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
        name: 'Upwork to JazzCash & SadaPay',
        item: pageUrl,
      },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070d17] text-slate-800 dark:text-slate-100 flex flex-col justify-between transition-colors duration-200">
        {/* Navigation Bar */}
        <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                <i className="fa-solid fa-calculator text-sm"></i>
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                SmartRate<span className="text-emerald-600 dark:text-emerald-400">Calcs</span>
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/upwork-fee-calculator"
                className="hidden sm:inline-flex text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Upwork Bid Fee Calc &rarr;
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow max-w-5xl mx-auto px-4 py-8 sm:py-12 w-full space-y-12">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/upwork-fee-calculator" className="hover:text-emerald-600 transition-colors">Upwork</Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200 font-medium">JazzCash &amp; SadaPay Payout</span>
          </nav>

          {/* Core Interactive Calculator Widget */}
          <section>
            <UpworkToJazzCashWidget />
          </section>

          {/* In-Depth Educational Guide & Research Breakdown */}
          <article className="prose dark:prose-invert max-w-none space-y-8 bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Upwork Payout to Pakistan: The Complete 2026 Guide for JazzCash, SadaPay &amp; Banks
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                By Muhammad Naveed, Lead Engineer at SmartRateCalcs &bull; Updated November 2026
              </p>
            </div>

            {/* Section 1: The Hidden Reality */}
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
                <i className="fa-solid fa-triangle-exclamation text-amber-500"></i>
                The Silent Cost: Upwork Exchange Rate Markdown
              </h2>
              <p>
                When Pakistani freelancers withdraw their hard-earned dollars from Upwork, most look only at the flat <strong>$0.99 withdrawal fee</strong> (or $2.00 for Payoneer). However, the real cost lies in the <strong>foreign exchange spread</strong>.
              </p>
              <p>
                Upwork does not use Google&apos;s interbank mid-market rate. Instead, Upwork&apos;s banking partners apply a currency conversion markdown ranging from <strong>2.2% to 2.8% below the real market rate</strong>. On a $1,000 withdrawal, while you only see a $0.99 deduction on your transaction receipt, you quietly lose an extra <strong>Rs. 6,000 to Rs. 7,800 PKR</strong> in hidden exchange rate spreads before the funds ever touch your Pakistani bank or mobile wallet.
              </p>
            </div>

            {/* Section 2: Comparison of the 4 Main Methods */}
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
                <i className="fa-solid fa-table-cells text-emerald-500"></i>
                Comparison: Which Method Gives the Most PKR?
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 dark:border-slate-700">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
                      <th className="p-3 border border-slate-200 dark:border-slate-700">Withdrawal Method</th>
                      <th className="p-3 border border-slate-200 dark:border-slate-700">Fixed Fee</th>
                      <th className="p-3 border border-slate-200 dark:border-slate-700">FX Markup</th>
                      <th className="p-3 border border-slate-200 dark:border-slate-700">Transfer Speed</th>
                      <th className="p-3 border border-slate-200 dark:border-slate-700">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200">
                        Upwork Direct to Local Bank (IBAN)
                      </td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700 font-mono">$0.99</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700 text-rose-500 font-semibold">~2.50%</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700">1 to 3 Business Days</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700">Withdrawals under $300</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200">
                        Payoneer to JazzCash (In-App)
                      </td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700 font-mono">$2.00</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700 text-rose-500 font-semibold">~2.00%</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700 text-emerald-600 font-bold">Instant (5-10 mins)</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700">Urgent cash needs &amp; bills</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200">
                        Upwork Direct to SadaPay / Nayapay
                      </td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700 font-mono">$0.99</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700 text-rose-500 font-semibold">~2.50%</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700">Same day or 1 day</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700">Fast digital wallet debit spending</td>
                    </tr>
                    <tr className="bg-emerald-50/60 dark:bg-emerald-950/30">
                      <td className="p-3 border border-slate-200 dark:border-slate-700 font-bold text-emerald-800 dark:text-emerald-300">
                        Upwork to Wise USD (ACH) &rarr; Bank
                      </td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700 font-mono text-emerald-600 font-bold">$0.00 (Free)</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700 text-emerald-600 font-bold">0.00% (Mid-Market)</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700">1 to 3 Hours</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-700 font-bold text-emerald-700 dark:text-emerald-400">
                        Withdrawals $500+ (Maximum Take-Home)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 3: Step by Step Setup for JazzCash */}
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
                <i className="fa-solid fa-mobile-screen-button text-purple-500"></i>
                How to Link JazzCash to Upwork via IBAN (Direct to Local Bank)
              </h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  Open your <strong>JazzCash App</strong> &rarr; Tap on your profile or Account Details &rarr; Locate your <strong>24-digit IBAN</strong> (starts with <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">PK...MOBK...</code> for Mobilink Microfinance Bank).
                </li>
                <li>
                  Log into Upwork &rarr; Go to <strong>Settings</strong> &rarr; <strong>Get Paid</strong> &rarr; Click <strong>Add Method</strong>.
                </li>
                <li>
                  Select <strong>Direct to Local Bank (PKR)</strong>.
                </li>
                <li>
                  Enter your JazzCash IBAN, branch code (often 0001 or as listed on your JazzCash statement), and ensure the name on Upwork exactly matches your CNIC registered with JazzCash.
                </li>
                <li>
                  Wait 3 days for Upwork&apos;s security hold to expire. Once approved, you can withdraw for a flat $0.99 fee.
                </li>
              </ol>
            </div>

            {/* Section 4: Tax Rules for Pakistani Freelancers */}
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
                <i className="fa-solid fa-scale-balanced text-indigo-500"></i>
                FBR &amp; PSEB Tax Rules for Freelancers (Section 154A)
              </h2>
              <p>
                In Pakistan, export of computer software and IT-enabled services (ITeS) is taxed under a final withholding regime:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>PSEB Registered Active Taxpayers:</strong> Eligible for a concessional <strong>1% final withholding tax</strong> rate on export remittances. No further income tax audit or liability applies.
                </li>
                <li>
                  <strong>Non-Registered Freelancers:</strong> Pakistani banks are mandated to deduct <strong>2% withholding tax</strong> at the time of foreign inward remittance conversion into PKR.
                </li>
                <li>
                  <strong>PRC (Proceeds Realization Certificate):</strong> Always request your electronic PRC (e-PRC) from your receiving bank or wallet as legal proof of foreign income remittance for your annual tax return filing.
                </li>
              </ul>
            </div>
          </article>

          {/* Cross-Link Hub */}
          <div className="bg-slate-100 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Explore More Freelance &amp; Remittance Calculators
            </h3>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <Link href="/upwork-fee-calculator" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-500 transition-colors">
                Upwork Bid &amp; Contract Fee Calculator
              </Link>
              <Link href="/fiverr-fee-calculator" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-500 transition-colors">
                Fiverr Fee Calculator
              </Link>
              <Link href="/payoneer-fee-calculator" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-500 transition-colors">
                Payoneer Withdrawal Fee Calculator
              </Link>
              <Link href="/remitly-pakistan-rate" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-500 transition-colors">
                Remitly Pakistan Exchange Rate Calculator
              </Link>
              <Link href="/freelance-hourly-rate-calculator" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-500 transition-colors">
                Freelance Hourly Rate Calculator
              </Link>
            </div>
          </div>
        </main>

        {/* Global Footer */}
        <SiteLegalFooter />
      </div>
    </>
  );
}
