import { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '../../data/blog-posts';

export const metadata: Metadata = {
  title: 'Financial & Cross-Border Payout Guides (2026)',
  description:
    'In-depth, mathematically verified guides to cross-border payouts, freelance tax compliance, and payment gateway unit economics.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/blog',
  },
  openGraph: {
    title: 'Financial & Cross-Border Payout Guides | SmartRateCalcs',
    description:
      'In-depth, mathematically verified guides to cross-border payouts, freelance tax compliance, and payment gateway unit economics.',
    url: 'https://www.smartratecalcs.com/blog',
    type: 'website',
  },
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900">
            <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm shadow-sm">
              <i className="fa-solid fa-calculator"></i>
            </span>
            SmartRate<span className="text-emerald-600">Calcs</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              &larr; All 53 Calculators
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold mb-3 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Empirical Financial Research &bull; 2026 Standards
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Financial &amp; Cross-Border Guides
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            In-depth engineering analysis on exchange rate spreads, bank withholding taxes, and remittance clearing rails.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-3xl border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all p-5 sm:p-6 flex flex-col justify-between group"
            >
              <div>
                <Link href={`/blog/${post.slug}`} className="block mb-4 rounded-2xl overflow-hidden border border-slate-100 bg-slate-950 aspect-[1200/630]">
                  <img
                    src={`/blog/${post.slug}.svg`}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </Link>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[11px]">
                    {post.category}
                  </span>
                  <span className="text-slate-400">{post.readTime}</span>
                </div>
                <h2 className="font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug mb-3">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                  {post.metaDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  {post.publishedDate}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1"
                >
                  Read Full Guide &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black text-2xl flex items-center justify-center shrink-0 shadow-md">
            MN
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase">
              Chief Editor &amp; Lead Systems Engineer
            </div>
            <h3 className="text-lg font-bold">Muhammad Naveed</h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
              Software Engineer and automation specialist designing mathematical models for radical fee transparency across global payment rails.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 justify-center sm:justify-start text-xs text-slate-400 font-mono">
              <a
                href="https://naveed-portfolio-kappa.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 underline font-semibold"
              >
                Portfolio &rarr;
              </a>
              <a
                href="https://github.com/mnaveedkhtri-ui"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 underline"
              >
                GitHub Profile
              </a>
            </div>
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
