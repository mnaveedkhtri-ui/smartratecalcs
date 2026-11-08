import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PROGRAMMATIC_CALCULATORS } from '../../../data/programmatic-calculators';
import ProgrammaticCalculatorWidget from '../../../components/ProgrammaticCalculatorWidget';
import ThemeToggle from '../../../components/ThemeToggle';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return PROGRAMMATIC_CALCULATORS.map((calc) => ({
    slug: calc.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
  const calc = PROGRAMMATIC_CALCULATORS.find((c) => c.slug === params.slug);
  if (!calc) notFound();

  const currentUrl = `https://www.smartratecalcs.com/calculators/${calc.slug}`;

  // 1. FAQ Schema for Google Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: calc.faqs.map((faq) => ({
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
      url: 'https://naveed-portfolio-kappa.vercel.app/',
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
      url: 'https://naveed-portfolio-kappa.vercel.app/',
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
            {calc.faqs.map((faq, idx) => (
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
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
                href="https://naveed-portfolio-kappa.vercel.app/"
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

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
        &copy; 2026 SmartRateCalcs. Built with mathematical precision by{' '}
        <strong className="text-slate-700 dark:text-slate-200">Muhammad Naveed</strong>. All rights reserved.
      </footer>
    </div>
  );
}
