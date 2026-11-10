import { Metadata } from 'next';
import Link from 'next/link';
import PayoneerCalculatorWidget from '../../components/PayoneerCalculatorWidget';
import ThemeToggle from '../../components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Payoneer USD Withdrawal Fee & Currency Conversion Calculator (2026)',
  description:
    'Free 2026 Payoneer USD withdrawal fee calculator. Calculate exact deductions on Payoneer receiving fees (credit card 3%, ACH 1%), local bank 2% currency conversion FX spreads, ATM fees ($3.15), and net payouts.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/payoneer-fee-calculator',
  },
  openGraph: {
    title: 'Payoneer USD Withdrawal Fee & Currency Conversion Calculator (2026)',
    description:
      'Unmask hidden exchange rate markups and USD withdrawal costs on Payoneer payouts to Pakistan (PKR), India (INR), Bangladesh (BDT), Philippines (PHP), and Europe.',
    url: 'https://www.smartratecalcs.com/payoneer-fee-calculator',
    type: 'website',
    images: [
      {
        url: 'https://www.smartratecalcs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Payoneer Fee Calculator - SmartRateCalcs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Payoneer Fee Calculator 2026 (Live FX Spread & Reverse Invoice Formula)',
    description:
      'Instantly calculate Payoneer receiving fees, local bank withdrawal exchange rates, and ATM card charges.',
    images: ['https://www.smartratecalcs.com/og-image.png'],
  },
};

export default function PayoneerCalculatorPage() {
  const pageUrl = 'https://www.smartratecalcs.com/payoneer-fee-calculator';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the Payoneer USD withdrawal fee and currency conversion fee in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Payoneer USD withdrawal fee consists of a flat $1.50 USD transfer charge per withdrawal to your local bank account, plus an embedded 2.0% currency conversion fee (exchange rate spread) below the mid-market rate. Withdrawing $1,000 USD incurs $1.50 flat plus approximately $20.00 USD in currency spread, leaving roughly $978.50 USD net value delivered in local currency (PKR, INR, BDT, PHP).',
        },
      },
      {
        '@type': 'Question',
        name: 'What are Payoneer fees for withdrawing to a local bank in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'When withdrawing USD to a local currency bank account (PKR, INR, BDT, PHP, EUR, etc.), Payoneer deducts a fixed transfer fee (typically $1.50) plus an embedded foreign exchange markup of up to 2.0% to 2.5% below the mid-market interbank rate.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does Payoneer charge to receive money from a client?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Receiving payments from another Payoneer customer is 100% free (0%). If you send a Payment Request, receiving funds via credit card incurs a 3.00% fee, while ACH bank debit (US checking accounts) incurs a 1.00% fee. Marketplaces like Upwork charge $2.00 per withdrawal to Payoneer, while Fiverr charges $1.00 to $3.00.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Payoneer annual card and maintenance fee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Payoneer charges an annual account maintenance fee of $29.95 USD if your account receives less than $2,000.00 USD in payments over a 12-month period. An annual fee of $29.95 also applies for holding a physical or digital Payoneer Commercial Mastercard.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are Payoneer ATM withdrawal fees?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Using a Payoneer Mastercard at an ATM incurs a fixed fee of $3.15 USD per transaction, plus a foreign exchange conversion markup of up to 3.50% if withdrawing in a currency different from the card balance (plus any local ATM operator surcharge).',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I calculate how much to invoice my client so I receive an exact amount via Payoneer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the Reverse Calculation mode in our calculator. If the client pays via credit card (3% fee) and you withdraw to a local bank with a 2% spread, your formula is: Invoice = (Desired Local Bank Net / (Interbank Rate * 0.98) + $1.50) / 0.97. For example, to pocket $1,000 net, your client invoice must be approximately $1,053.10 USD.',
        },
      },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SmartRateCalcs Payoneer Fee Calculator',
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
        name: 'Payoneer Fee Calculator',
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070d17] text-slate-800 dark:text-slate-100 transition-colors duration-200">
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

      {/* Header */}
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
            <span className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center text-sm shadow-sm">
              <i className="fa-solid fa-calculator"></i>
            </span>
            SmartRate<span className="text-orange-600 dark:text-orange-400">Calcs</span>
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
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        {/* Breadcrumb Trail */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 font-mono">
          <Link href="/" className="hover:text-orange-600 dark:hover:text-orange-400">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 font-bold">Payoneer Fee Calculator</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/60 text-orange-800 dark:text-orange-300 text-[11px] font-bold mb-3 font-mono">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            Verified 2026 Payoneer Payout Schedule &bull; Real Bank Spread Matrix
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Payoneer Fee Calculator (2026)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Calculate exact net take-home earnings from Payoneer payouts. Unmask the hidden{' '}
            <strong className="text-slate-900 dark:text-white">2.0% currency exchange markup</strong>, receiving fees,
            and ATM cash deductions when withdrawing to banks in Pakistan, India, Bangladesh, the Philippines, and worldwide.
          </p>
        </div>

        {/* CALCULATOR WIDGET */}
        <PayoneerCalculatorWidget isStandalone={true} />

        {/* AI Overview / Direct Answer Callout */}
        <section className="mb-12 p-6 sm:p-8 rounded-3xl bg-orange-50/80 dark:bg-orange-950/40 border-2 border-orange-500/80 dark:border-orange-500/60 shadow-sm relative">
          <div className="flex items-center gap-2 text-xs font-bold text-orange-900 dark:text-orange-300 uppercase tracking-wider mb-2 font-mono">
            <i className="fa-solid fa-sparkles text-orange-600 dark:text-orange-400"></i>
            <span>Executive Takeaway &amp; Formula (Direct Answer)</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-relaxed font-medium mb-4">
            Payoneer advertises low flat fees, but the primary cost is the <strong>~2.00% foreign exchange spread</strong> applied below the interbank mid-market rate when funds are converted into your local currency. On a $2,000 USD payout to a Pakistani or Indian bank account, you pay $1.50 in fixed transfer fees and lose approximately <strong>$40.00 USD</strong> to the currency spread, totaling $41.50 in deductions.
          </p>
          <div className="pt-3 border-t border-orange-200/80 dark:border-orange-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-300 font-mono">
            <div>
              <strong className="text-slate-900 dark:text-white">Net Formula:</strong> Net Local = (Gross - ReceivingFee - $1.50) &times; (InterbankRate &times; 0.98)
            </div>
            <div className="text-orange-700 dark:text-orange-400 font-semibold">
              Verified by Muhammad Naveed
            </div>
          </div>
        </section>

        {/* Hire Naveed Services Callout */}
        <div className="mb-12 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xl border border-orange-500/40 shrink-0">
              <i className="fa-solid fa-code"></i>
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">Need Custom Fintech, Python, or API Automation?</h3>
              <p className="text-xs sm:text-sm text-slate-300">Automate your store, invoicing, payments, or data scrapers with custom production engineering.</p>
            </div>
          </div>
          <a
            href="https://naveed-portfolio-kappa.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs sm:text-sm font-bold transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            Hire Muhammad Naveed &rarr;
          </a>
        </div>

        {/* Complete 2026 Payoneer Fee Matrix Table */}
        <section className="mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono mb-2">
            <i className="fa-solid fa-table-list text-orange-600 dark:text-orange-400"></i>
            <span>Comprehensive Fee Matrix</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Payoneer Official Fee Schedule (2026)
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-mono uppercase text-[11px] border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3.5">Transaction Type</th>
                  <th className="px-4 py-3.5">Fee Rate / Cost</th>
                  <th className="px-4 py-3.5">Hidden Conditions / Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">Payoneer to Payoneer</td>
                  <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-mono font-bold">0.00% (FREE)</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">Instant in-network balance transfer between accounts.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">Payment Request (Credit Card)</td>
                  <td className="px-4 py-3 font-mono font-bold">3.00%</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">Visa, Mastercard, or Amex payments from clients worldwide.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">Payment Request (ACH Debit)</td>
                  <td className="px-4 py-3 font-mono font-bold">1.00%</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">US bank checking account direct debit.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">Local Bank Withdrawal (FX)</td>
                  <td className="px-4 py-3 text-orange-600 dark:text-orange-400 font-mono font-bold">$1.50 + Up to 2.0% Spread</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">Conversion from USD balance to local bank currency (PKR/INR/BDT/PHP).</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">USD Bank Withdrawal</td>
                  <td className="px-4 py-3 font-mono font-bold">1.50% (or $1.50 min)</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">Transferring to a local bank account held in USD.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">Mastercard ATM Withdrawal</td>
                  <td className="px-4 py-3 text-rose-600 dark:text-rose-400 font-mono font-bold">$3.15 + Up to 3.5% FX</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">Cash withdrawals at foreign ATMs plus local ATM bank surcharges.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">Annual Maintenance Fee</td>
                  <td className="px-4 py-3 font-mono font-bold">$29.95 / year</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">Charged if account receives less than $2,000 in 12 consecutive months.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="space-y-4 mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
            <i className="fa-solid fa-circle-question text-orange-600 dark:text-orange-400"></i>
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Payoneer Fees &amp; FX Spread Explained
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {faqSchema.mainEntity.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-2">
                  {faq.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-Platform Ecosystem Navigation Mesh */}
        <section className="space-y-4 mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
            <i className="fa-solid fa-sitemap text-orange-600 dark:text-orange-400"></i>
            <span>Related Financial Tools</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Compare Across Payment Platforms
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/calculators/wise-vs-payoneer-fee-calculator"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500 hover:shadow-md transition-all group"
            >
              <div className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase font-mono mb-1">
                Comparative
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">
                Wise vs Payoneer Fee Calculator &rarr;
              </div>
              <p className="text-[11px] text-slate-500 mt-1">See exact exchange rate difference on $1k-$5k.</p>
            </Link>

            <Link
              href="/upwork-fee-calculator"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase font-mono mb-1">
                Freelance Marketplace
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                Upwork Fee Calculator &rarr;
              </div>
              <p className="text-[11px] text-slate-500 mt-1">10% service fee and payout optimization.</p>
            </Link>

            <Link
              href="/fiverr-fee-calculator"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#1dbf73] hover:shadow-md transition-all group"
            >
              <div className="text-[10px] font-bold text-[#1dbf73] uppercase font-mono mb-1">
                Freelance Marketplace
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#1dbf73] transition-colors">
                Fiverr Fee Calculator &rarr;
              </div>
              <p className="text-[11px] text-slate-500 mt-1">20% seller cut and reverse gig pricing.</p>
            </Link>

            <Link
              href="/paypal-fee-calculator"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase font-mono mb-1">
                Payment Gateway
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                PayPal Fee Calculator &rarr;
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Standard 3.49% + $0.49 and international spreads.</p>
            </Link>
          </div>
        </section>

        {/* Author Bio Box */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-700 text-white font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-md">
            MN
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase font-mono">
              Lead Systems Engineer &bull; Verified Spec
            </div>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white">Muhammad Naveed</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Full-Stack &amp; Automation Engineer specializing in cross-border financial architectures, automated forex routing, and developer payout infrastructure.
            </p>
            <div className="pt-1 flex flex-wrap gap-3 justify-center sm:justify-start text-xs text-slate-500 dark:text-slate-400 font-mono">
              <a
                href="https://naveed-portfolio-kappa.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange-600 dark:hover:text-orange-400 underline font-semibold"
              >
                Portfolio &rarr;
              </a>
              <a
                href="https://github.com/mnaveedkhtri-ui"
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange-600 dark:hover:text-orange-400 underline"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
        &copy; 2026 SmartRateCalcs. Built with mathematical precision by{' '}
        <strong className="text-slate-700 dark:text-slate-200">Muhammad Naveed</strong>. All rights reserved.
      </footer>
    </div>
  );
}
