import { Metadata } from 'next';
import Link from 'next/link';
import MercariCalculatorWidget from '../../../components/MercariCalculatorWidget';
import ThemeToggle from '../../../components/ThemeToggle';
import { SiteLegalFooter } from '../../../components/SiteLegalFooter';

export const metadata: Metadata = {
  title: 'Mercari Fee Calculator [2026 Official] 10% Seller Fee + Buyer Protection Math',
  description:
    'Free 2026 Mercari fee calculator. Calculate exact net profits after the flat 10% selling fee on item + buyer shipping, $0 payment processing, 3.6% buyer fee preview, Instant Pay $3 cut, and reverse pricing.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/calculators/mercari-fee-calculator',
  },
  openGraph: {
    title: 'Mercari Fee Calculator 2026 | 10% Flat Fee & Net Profit Solver',
    description:
      'Accurately calculate Mercari seller payouts under 2026 rules: 10% flat commission on item + buyer shipping, zero processing fees, Free Shipping traps, and Depop/Poshmark/eBay comparisons.',
    url: 'https://www.smartratecalcs.com/calculators/mercari-fee-calculator',
    type: 'website',
    images: [
      {
        url: 'https://www.smartratecalcs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mercari Fee Calculator 2026 - SmartRateCalcs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercari Fee Calculator 2026 (10% Flat Fee + Free Shipping Math)',
    description:
      'Calculate exact Mercari seller take-home pay, 10% fee on buyer shipping, 3.6% buyer checkout total, and reverse target listing prices.',
    images: ['https://www.smartratecalcs.com/og-image.png'],
  },
};

export default function MercariCalculatorPage() {
  const pageUrl = 'https://www.smartratecalcs.com/calculators/mercari-fee-calculator';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are Mercari seller fees in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In 2026, Mercari charges sellers a flat 10.0% selling fee applied to the combined item price plus buyer-paid shipping. Separate payment processing fees for sellers are $0.00, while buyers pay a 3.6% Buyer Protection fee at checkout.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Mercari take 10% out of buyer-paid shipping?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Even when the buyer selects and pays for shipping, Mercari calculates the 10% selling fee on the sum of the item price plus the buyer-paid shipping label cost. On a $50 item with $10 shipping, the seller fee is $6.00 (10% of $60), not $5.00.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Mercari Instant Pay vs Direct Deposit withdrawal fee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Standard Direct Deposit ACH transfers to a linked US checking account are completely free ($0.00, 3 to 5 business days). Instant Pay transfers to an eligible debit card incur a flat $3.00 fee per withdrawal.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why should sellers avoid the Mercari shipping weight adjustment trap?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If a shipped package weighs more or exceeds dimensional weight limits compared to the prepaid Mercari label purchased, the carrier bills Mercari for the shortage, and Mercari deducts both the label adjustment and an extra fee penalty directly from your seller payout.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Mercari cheaper than Poshmark and eBay in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes for sellers: Mercari takes 10% (plus 10% of buyer shipping) compared to Poshmark 20% and eBay 13.25% + $0.30. However, Depop charges 0% selling fee plus 3.3% + $0.45 processing, making Depop slightly cheaper on net seller take-home.',
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
      { '@type': 'ListItem', position: 3, name: 'Mercari Fee Calculator', item: pageUrl },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SmartRateCalcs Mercari Fee & Profit Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    url: pageUrl,
    about: [
      { '@type': 'Thing', sameAs: 'https://www.wikidata.org/wiki/Q20042246' },
      { '@type': 'Thing', sameAs: 'https://www.wikidata.org/wiki/Q21029449' },
    ],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Person', name: 'Muhammad Naveed', url: 'https://www.smartratecalcs.com/about' },
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Mercari Seller Profit in 2026',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Input Item Listing Price & COGS', text: 'Enter the sold price and your inventory cost.' },
      { '@type': 'HowToStep', position: 2, name: 'Choose Buyer-Paid vs Free Shipping', text: 'Select whether the buyer pays shipping (10% fee applies on shipping too) or you absorb the label.' },
      { '@type': 'HowToStep', position: 3, name: 'Select Direct Deposit vs Instant Pay', text: 'Toggle $3.00 Instant Pay if withdrawing immediately to a debit card.' },
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
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white leading-none">
                SmartRate<span className="text-indigo-600 dark:text-indigo-400">Calcs</span>
              </span>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono mt-0.5">
                Mercari Reseller Suite
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/#calculators" className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 hidden sm:inline">
              All Calculators
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <nav aria-label="Breadcrumbs" className="flex items-center justify-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mb-2">
            <Link href="/" className="hover:text-indigo-600">Home</Link>
            <span>/</span>
            <Link href="/#calculators" className="hover:text-indigo-600">Calculators</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-semibold">Mercari Fee Calculator</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900/60 text-xs font-bold text-indigo-700 dark:text-indigo-300">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Updated for 2026 Mercari 10% Seller Fee + 3.6% Buyer Fee Structure
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Mercari Fee Calculator <span className="text-indigo-600 dark:text-indigo-400">(2026)</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Calculate your true Mercari seller profit under the updated 2026 policy: <strong>10% flat selling fee</strong> applied to{' '}
            <strong>item price + buyer-paid shipping</strong>, <strong>$0.00 payment processing</strong>, live{' '}
            <strong>3.6% buyer checkout total</strong>, and reverse listing price solving.
          </p>
        </div>

        <section aria-label="Mercari Fee Calculator Widget">
          <MercariCalculatorWidget isStandalone={false} />
        </section>

        <article className="mt-12 space-y-10 text-slate-800 dark:text-slate-200 max-w-4xl mx-auto pt-6 border-t border-slate-200 dark:border-slate-800">
          <section className="p-6 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/30 border-2 border-indigo-500/40 space-y-3">
            <div className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
              AEO Direct Verdict &bull; 2026 Official Math
            </div>
            <p className="text-sm sm:text-base leading-relaxed">
              Mercari charges a flat <strong>10.0% selling fee</strong> on <em>Item Price + Buyer-Paid Shipping</em> and{' '}
              <strong>$0.00 payment processing</strong>. On a $65 item with $7.99 buyer-paid shipping, Mercari deducts <strong>$7.30</strong> (10% of $72.99), crediting <strong>$57.70</strong> before your COGS.
            </p>
          </section>

          <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">Complete Reseller Guide</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                Mercari Seller Fees 2026: The 10% Shipping Rule, Buyer Fees &amp; Mercari vs Depop vs Poshmark
              </h3>
            </div>
            <Link
              href="/blog/mercari-seller-fees-2026-flat-10-percent-buyer-fee-margin-guide"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shrink-0 transition"
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
