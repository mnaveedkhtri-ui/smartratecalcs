import Link from 'next/link';

/**
 * Shared legal and trust navigation footer rendered across calculator, blog, and policy routes.
 */
export function SiteLegalFooter() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-8 px-4 text-center text-xs text-slate-500 dark:text-slate-400 space-y-3">
      <nav aria-label="Legal and trust navigation" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-medium text-slate-600 dark:text-slate-300">
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
      <div>
        &copy; 2026 SmartRateCalcs. Built with mathematical precision by{' '}
        <strong className="text-slate-700 dark:text-slate-200">Muhammad Naveed</strong>. All rights reserved.
      </div>
    </footer>
  );
}
