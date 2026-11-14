import Link from 'next/link';

/**
 * Shared legal and trust navigation footer rendered across calculator, blog, and policy routes.
 */
export function SiteLegalFooter() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-10 px-4 text-center text-xs text-slate-500 dark:text-slate-400 space-y-4">
      {/* Quick Jump Flagships for Internal SEO Juice */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
        <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
          Home
        </Link>
        <span className="text-slate-300 dark:text-slate-700">&bull;</span>
        <Link href="/calculators/etsy-fee-calculator" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
          Etsy Fee Calculator
        </Link>
        <span className="text-slate-300 dark:text-slate-700">&bull;</span>
        <Link href="/calculators/cash-app-fee-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
          Cash App Calculator
        </Link>
        <span className="text-slate-300 dark:text-slate-700">&bull;</span>
        <Link href="/tiktok-shop-fee-calculator" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
          TikTok Shop Calculator
        </Link>
        <span className="text-slate-300 dark:text-slate-700">&bull;</span>
        <Link href="/depop-fee-calculator" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
          Depop Calculator
        </Link>
        <span className="text-slate-300 dark:text-slate-700">&bull;</span>
        <Link href="/1099-tax-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
          1099 Tax Calculator
        </Link>
        <span className="text-slate-300 dark:text-slate-700">&bull;</span>
        <Link href="/blog" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
          Payout Guides &amp; Research
        </Link>
      </div>

      {/* Legal & Trust Navigation */}
      <nav aria-label="Legal and trust navigation" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-medium text-slate-500 dark:text-slate-400 text-[11px]">
        <Link href="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
          About
        </Link>
        <Link href="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
          Contact
        </Link>
        <Link href="/privacy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
          Terms of Service
        </Link>
        <Link href="/disclaimer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
          Financial Disclaimer
        </Link>
      </nav>

      {/* Copyright */}
      <div className="text-[11px] text-slate-400 dark:text-slate-500">
        &copy; 2026 SmartRateCalcs. Built with mathematical precision by{' '}
        <strong className="text-slate-700 dark:text-slate-200">Muhammad Naveed</strong>. All rights reserved.
      </div>
    </footer>
  );
}
