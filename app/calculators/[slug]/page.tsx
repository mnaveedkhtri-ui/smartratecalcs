import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PROGRAMMATIC_CALCULATORS } from '../../../data/programmatic-calculators';

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

  return {
    title: calc.metaTitle,
    description: calc.metaDesc,
    alternates: {
      canonical: `https://smartratecalcs.com/calculators/${calc.slug}`,
    },
    openGraph: {
      title: calc.metaTitle,
      description: calc.metaDesc,
      url: `https://smartratecalcs.com/calculators/${calc.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: calc.metaTitle,
      description: calc.metaDesc,
    },
  };
}

export default function CalculatorPage({ params }: Props) {
  const calc = PROGRAMMATIC_CALCULATORS.find((c) => c.slug === params.slug);
  if (!calc) notFound();

  // 1. FAQ Schema for Rich Snippets
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

  // 2. WebPage with Semantic Entity Grounding for AI Overviews
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: calc.title,
    description: calc.description,
    url: `https://smartratecalcs.com/calculators/${calc.slug}`,
    about: calc.wikidataEntities
      ? calc.wikidataEntities.map((uri) => ({
          '@type': 'Thing',
          sameAs: uri,
        }))
      : undefined,
    author: {
      '@type': 'Person',
      name: 'Muhammad Naveed',
      url: 'https://naveed-portfolio-kappa.vercel.app/',
    },
    dateModified: '2026-11-01',
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900">
            <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm">
              <i className="fa-solid fa-calculator"></i>
            </span>
            SmartRate<span className="text-emerald-600">Calcs</span>
          </Link>
          <Link
            href="/"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            &larr; View All Calculators
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Title & Meta Info */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold mb-3 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Verified 2026 Financial Specification &bull; Q4 Interbank Rates
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            {calc.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {calc.description}
          </p>
        </div>

        {/* AI OVERVIEW DIRECT ANSWER BOX (Engineered specifically for Google AI Overviews / SGE citation) */}
        <section className="mb-10 p-6 sm:p-7 rounded-3xl bg-emerald-50/80 border-2 border-emerald-500/80 shadow-sm relative">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 font-mono">
            <i className="fa-solid fa-sparkles text-emerald-600"></i>
            <span>Key Takeaway &amp; Summary (Direct Answer)</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium mb-4">
            {calc.quickAnswer}
          </p>
          <div className="pt-3 border-t border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 font-mono">
            <div>
              <strong className="text-slate-900">Formula:</strong> {calc.formula}
            </div>
            <div className="text-emerald-700 font-semibold">
              Verified by Muhammad Naveed
            </div>
          </div>
        </section>

        {/* Embedded Interactive Engine Banner */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md text-center space-y-4 mb-12">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl mx-auto">
            <i className="fa-solid fa-bolt"></i>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Launch Live Calculation Engine</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Input custom invoice values, compare Wise vs Payoneer vs SWIFT live, and compute real net take-home earnings.
          </p>
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              Open Full Interactive Suite &rarr;
            </Link>
          </div>
        </div>

        {/* FAQ Schema Section for Google Ranking */}
        <div className="space-y-4 mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 gap-4">
            {calc.faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <h3 className="font-bold text-sm text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        &copy; 2026 SmartRateCalcs. Built with mathematical precision by <strong>Muhammad Naveed</strong>. All rights reserved.
      </footer>
    </div>
  );
}
