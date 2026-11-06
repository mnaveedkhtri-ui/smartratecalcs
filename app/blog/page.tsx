import { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '../../data/blog-posts';
import BlogDirectoryClient from '../../components/BlogDirectoryClient';
import ThemeToggle from '../../components/ThemeToggle';

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
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070d17] text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
            <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm shadow-sm">
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
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold mb-3 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Empirical Financial Research &bull; 2026 Standards
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            Financial &amp; Cross-Border Guides
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            In-depth engineering analysis on exchange rate spreads, bank withholding taxes, and remittance clearing rails.
          </p>
        </div>

        {/* Client-Side Interactive Directory (Search & Categories) */}
        <BlogDirectoryClient posts={BLOG_POSTS} />

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
