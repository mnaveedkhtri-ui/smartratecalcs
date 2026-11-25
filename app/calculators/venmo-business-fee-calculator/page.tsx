import { Metadata } from 'next';
import Link from 'next/link';
import VenmoBusinessCalculatorWidget from '../../../components/VenmoBusinessCalculatorWidget';
import ThemeToggle from '../../../components/ThemeToggle';
import { SiteLegalFooter } from '../../../components/SiteLegalFooter';

export const metadata: Metadata = {
  title: 'Venmo Business Fee Calculator [2026 Official] 1.9% + $0.10 & Tap to Pay',
  description:
    'Free 2026 Venmo Business fee calculator. Calculate exact deductions for Venmo Business Profile & Goods and Services (1.9% + $0.10), Tap to Pay (2.29% + $0.10), Online Checkout (3.49% + $0.49), Instant 1.75% transfers, and reverse payment requests.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/calculators/venmo-business-fee-calculator',
  },
  openGraph: {
    title: 'Venmo Business Fee Calculator 2026 | Goods & Services + Reverse Solver',
    description:
      'Model exact Venmo Business Profile fees (1.9% + $0.10), Tap to Pay contactless charges, instant bank transfer fees, and reverse request totals.',
    url: 'https://www.smartratecalcs.com/calculators/venmo-business-fee-calculator',
    type: 'website',
    images: [
      {
        url: 'https://www.smartratecalcs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Venmo Business Fee Calculator 2026 - SmartRateCalcs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Venmo Business Fee Calculator 2026 (1.9% + $0.10 & Reverse Request)',
    description:
      'Calculate Venmo Business Profile, Goods & Services, Tap to Pay, and Instant Transfer fees in seconds.',
    images: ['https://www.smartratecalcs.com/og-image.png'],
  },
};

export default function VenmoBusinessCalculatorPage() {
  const pageUrl = 'https://www.smartratecalcs.com/calculators/venmo-business-fee-calculator';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the Venmo Business Profile and Goods and Services fee in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In 2026, Venmo charges 1.9% + $0.10 per transaction for payments received via a Venmo Business Profile or personal Goods and Services Purchase Protection payments from another Venmo user.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does Venmo Tap to Pay cost for in-person sales?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Accepting contactless credit cards or digital wallets via Venmo Tap to Pay on iPhone or Android carries a 2.29% + $0.10 processing fee per transaction.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I calculate how much to request on Venmo to cover fees?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the reverse gross-up equation: Gross Request = (Desired Net Payout + $0.10) / 0.981 for standard 1.9% + $0.10 payments. To net exactly $500.00 after Venmo fees, request $509.79.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Venmo Instant Bank Transfer fee vs Standard Transfer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Standard 1 to 3 business day ACH bank transfers are completely free ($0.00). Instant Bank Transfers carry a 1.75% fee with a $0.25 minimum and a $25.00 maximum cap per transfer.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Venmo Business cheaper than Cash App for Business, Square, and PayPal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Venmo Business Profile payments (1.9% + $0.10) cost less than Cash App Business (2.75%), Square Invoices (3.3% + $0.30), Stripe (2.9% + $0.30), and PayPal Goods & Services (2.99% + $0.49).',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.smartratecalcs.com' },
      { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.smartratecalcs.com/#calculators' },
      { '@type': 'ListItem', position: 3, name: 'Venmo Business Fee Calculator', item: pageUrl },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SmartRateCalcs Venmo Business Fee Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    url: pageUrl,
    about: [
      { '@type': 'Thing', sameAs: 'https://www.wikidata.org/wiki/Q7920046' },
      { '@type': 'Thing', sameAs: 'https://www.wikidata.org/wiki/Q483959' },
    ],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Person', name: 'Muhammad Naveed', url: 'https://www.smartratecalcs.com/about' },
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Venmo Business Fees & Pass Them Through',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Enter Payment Amount', text: 'Input the gross invoice or desired net payout amount.' },
      { '@type': 'HowToStep', position: 2, name: 'Pick Payment Channel', text: 'Choose Business Profile (1.9% + $0.10), Tap to Pay (2.29% + $0.10), or Online Checkout (3.49% + $0.49).' },
      { '@type': 'HowToStep', position: 3, name: 'Toggle Transfer Speed', text: 'Select Standard ACH ($0) or Instant Bank Transfer (1.75%, $25 cap) to see final bank take-home.' },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform">
              V
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white leading-none">
                SmartRate<span className="text-sky-600 dark:text-sky-400">Calcs</span>
              </span>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono mt-0.5">
                Venmo Merchant Fee Suite
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/#calculators" className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-sky-600 hidden sm:inline">
              All Calculators
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <nav aria-label="Breadcrumbs" className="flex items-center justify-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mb-2">
            <Link href="/" className="hover:text-sky-600">Home</Link>
            <span>/</span>
            <Link href="/#calculators" className="hover:text-sky-600">Calculators</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-semibold">Venmo Business Fee Calculator</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-900/60 text-xs font-bold text-sky-700 dark:text-sky-300">
            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
            2026 Verified: Business Profile, Tap to Pay &amp; Goods/Services
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Venmo Business Fee Calculator <span className="text-sky-600 dark:text-sky-400">(2026)</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Instantly calculate exact Venmo deductions across <strong>Business Profile (1.9% + $0.10)</strong>,{' '}
            <strong>Tap to Pay (2.29% + $0.10)</strong>, <strong>Online Checkout (3.49% + $0.49)</strong>, and{' '}
            <strong>1.75% Instant Bank Transfers</strong> - plus reverse gross-up requests.
          </p>
        </div>

        <section aria-label="Venmo Business Fee Calculator Widget">
          <VenmoBusinessCalculatorWidget isStandalone={false} />
        </section>

        <article className="mt-12 space-y-10 text-slate-800 dark:text-slate-200 max-w-4xl mx-auto pt-6 border-t border-slate-200 dark:border-slate-800">
          <section className="p-6 rounded-3xl bg-sky-50/70 dark:bg-sky-950/30 border-2 border-sky-500/40 space-y-3">
            <div className="text-xs font-mono font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider">
              AEO Direct Verdict &bull; 2026 Official Math
            </div>
            <p className="text-sm sm:text-base leading-relaxed">
              Venmo deducts <strong>1.9% + $0.10</strong> on standard Business Profile and Goods &amp; Services receipts. On a <strong>$500.00</strong> invoice, Venmo deducts <strong>$9.60</strong>, leaving <strong>$490.40</strong> net. To clear a full $500.00 net, bill <strong>$509.79</strong>.
            </p>
          </section>

          <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">Complete Merchant Research</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                Venmo Business Fees 2026: Tap to Pay, 1099-K Rules &amp; Venmo vs Cash App vs Square
              </h3>
            </div>
            <Link
              href="/blog/venmo-business-profile-fees-2026-tap-to-pay-goods-services-guide"
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shrink-0 transition"
            >
              Read Full Guide &rarr;
            </Link>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqSchema.mainEntity.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-1.5">{faq.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
      <SiteLegalFooter />
    </div>
  );
}
