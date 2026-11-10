import { Metadata } from 'next';
import Link from 'next/link';
import { PROGRAMMATIC_CALCULATORS } from '../../data/programmatic-calculators';
import ProgrammaticCalculatorWidget from '../../components/ProgrammaticCalculatorWidget';
import ThemeToggle from '../../components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Remitly Pakistan Rate Today (2026) | USD to PKR Fee & Exchange Rate Calculator',
  description:
    'Check live Remitly Pakistan exchange rates today (USD to PKR). Calculate exact PKR received in bank accounts, JazzCash, or Easypaisa with zero-fee thresholds and Economy vs Express comparison.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/remitly-pakistan-rate',
  },
  openGraph: {
    title: 'Remitly Pakistan Rate Today (2026) | USD to PKR Fee & Rate Calculator',
    description:
      'Check live Remitly Pakistan exchange rates today (USD to PKR). Calculate exact PKR received in bank accounts, JazzCash, or Easypaisa with zero-fee thresholds.',
    url: 'https://www.smartratecalcs.com/remitly-pakistan-rate',
    type: 'website',
    images: [
      {
        url: 'https://www.smartratecalcs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Remitly Pakistan Rate Today - SmartRateCalcs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remitly Pakistan Rate Today (2026) | Live USD to PKR Fee & Rate Calculator',
    description:
      'Calculate exact Remitly payout to Pakistani banks and mobile wallets. Compare Economy vs Express delivery.',
    images: ['https://www.smartratecalcs.com/og-image.png'],
  },
};

export default function RemitlyPakistanRatePage() {
  const calc = PROGRAMMATIC_CALCULATORS.find((c) => c.slug === 'remitly-to-pakistan-fee-calculator')!;
  const pageUrl = 'https://www.smartratecalcs.com/remitly-pakistan-rate';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the Remitly Pakistan rate today for USD to PKR?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Remitly everyday exchange rates for Pakistan typically trade 1.2% to 1.8% below the interbank mid-market rate. Transfers of $1,000+ USD qualify for zero transfer fees on the Economy tier with direct deposit to Pakistani banks, JazzCash, or Easypaisa.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Remitly free to send money to Pakistan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Economy transfers of $1,000 USD or more are 100% fee-free (0 transfer fee). Transfers below $1,000 incur a small fixed fee (typically $1.99 to $3.99 depending on payment method).',
        },
      },
      {
        '@type': 'Question',
        name: 'Can Remitly deposit directly to JazzCash and Easypaisa in Pakistan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Remitly supports direct mobile wallet transfers to JazzCash and Easypaisa with instant receipt (within minutes via Express delivery), as well as direct deposits to all major Pakistani banks including HBL, Meezan Bank, UBL, and MCB.',
        },
      },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SmartRateCalcs Remitly Pakistan Rate Calculator',
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
        name: 'Remitly Pakistan Rate',
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
          <span className="text-slate-800 dark:text-slate-200 font-bold">Remitly Pakistan Rate Today</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold mb-3 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Verified 2026 Remitly USD to PKR Payout Rates &bull; Zero-Fee Thresholds
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Remitly Pakistan Rate Today (2026)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Calculate exact PKR credited into Pakistani bank accounts, JazzCash, or Easypaisa wallets using Remitly.
            Compare <strong className="text-slate-900 dark:text-white">Economy vs Express transfer fees</strong>, everyday FX spreads, and promotional bonus rates.
          </p>
        </div>

        {/* CALCULATOR WIDGET */}
        {calc && <ProgrammaticCalculatorWidget calc={calc} />}

        {/* Direct Answer Takeaway Callout */}
        <section className="mt-8 mb-12 p-6 sm:p-8 rounded-3xl bg-emerald-50/80 dark:bg-emerald-950/40 border-2 border-emerald-500/80 dark:border-emerald-500/60 shadow-sm relative">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider mb-2 font-mono">
            <i className="fa-solid fa-sparkles text-emerald-600 dark:text-emerald-400"></i>
            <span>Executive Takeaway &amp; Formula (Direct Answer)</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-relaxed font-medium mb-4">
            Remitly offers <strong>0 transfer fees</strong> for Economy transfers sending $1,000 USD or more to Pakistan. The embedded foreign exchange markup averages <strong>1.2% to 1.8% below mid-market</strong>. On a $1,000 USD transfer, you receive approximately <strong>Rs. 273,800 to Rs. 275,000 PKR</strong>, which is delivered in 3 to 5 business days for Economy, or within minutes for Express.
          </p>
          <div className="pt-3 border-t border-emerald-200/80 dark:border-emerald-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-300 font-mono">
            <div>
              <strong className="text-slate-900 dark:text-white">Net Formula:</strong> Net PKR = (USD - TransferFee) &times; (InterbankRate &times; 0.985)
            </div>
            <div className="text-emerald-700 dark:text-emerald-400 font-semibold">
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
      </main>
    </div>
  );
}
