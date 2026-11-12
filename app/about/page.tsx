import { Metadata } from 'next';
import Link from 'next/link';
import { SiteLegalFooter } from '../../components/SiteLegalFooter';

export const metadata: Metadata = {
  title: 'About Muhammad Naveed | Founder & Lead Engineer at SmartRateCalcs',
  description: 'Learn about the engineering mission, methodology, and editorial standards behind SmartRateCalcs, founded by software engineer Muhammad Naveed.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/about',
  },
  openGraph: {
    title: 'About Muhammad Naveed | Founder of SmartRateCalcs',
    description: 'Engineering methodology, fee verification process, and mission behind SmartRateCalcs.',
    url: 'https://www.smartratecalcs.com/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b1120] text-slate-800 dark:text-slate-200 flex flex-col">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-lg text-slate-900 dark:text-white">
            SmartRate<span className="text-emerald-600 dark:text-emerald-400">Calcs</span>
          </Link>
          <Link href="/" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
            &larr; Back to Calculators
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-14">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-md space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-2xl font-mono shrink-0">
              MN
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Muhammad Naveed</h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Founder &amp; Lead Software Engineer &bull; SmartRateCalcs &bull; Hyderabad, Pakistan
              </p>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Our Engineering Mission</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              As a full-stack and automation software engineer working across US, European, and South Asian software contracts, I repeatedly saw how percentage processor fees, fixed transaction surcharges, foreign exchange markups, and quarterly self-employment tax withholdings quietly erode contractor and e-commerce margins.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              SmartRateCalcs was built to eliminate guesswork with transparent, zero-signup interactive models grounded in publicly documented fee schedules and tax tables. Every calculator executes locally in your browser with full formula visibility.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">How We Verify Fee Schedules &amp; Tax Formulas</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <li>
                <strong>Official Documentation First:</strong> Every percentage cut, fixed fee, ACH cap, and international surcharge is benchmarked directly against published merchant pricing pages (Stripe, Square, PayPal, Shopify, eBay, Poshmark, Venmo, Cash App, Wise, Payoneer, Upwork, Fiverr).
              </li>
              <li>
                <strong>2026 Tax Reference Alignment:</strong> US 1099 self-employment tax (15.3% OASDI + Medicare with the 92.35% net-earnings multiplier), federal safe-harbor rules, and state tax assumptions are structured from public IRS Form 1040-ES and state franchise tax documentation.
              </li>
              <li>
                <strong>Transparent Updates:</strong> Whenever a platform revises merchant rates or state filing thresholds, users can flag any discrepancy through our{' '}
                <Link href="/contact" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                  Contact page
                </Link>{' '}
                or directly via <span className="font-mono">naveed@smartratecalcs.com</span>.
              </li>
            </ul>
          </section>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-4 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <a href="https://naveed-portfolio-kappa.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Engineering Portfolio
            </a>
            <span className="text-slate-300 dark:text-slate-700">&bull;</span>
            <a href="https://github.com/mnaveedkhtri-ui" target="_blank" rel="noopener noreferrer" className="hover:underline">
              GitHub Profile
            </a>
            <span className="text-slate-300 dark:text-slate-700">&bull;</span>
            <a href="mailto:naveed@smartratecalcs.com" className="hover:underline">
              naveed@smartratecalcs.com
            </a>
            <span className="text-slate-300 dark:text-slate-700">&bull;</span>
            <Link href="/contact" className="hover:underline">
              Contact &amp; Custom Builds
            </Link>
          </div>
        </div>
      </main>

      <SiteLegalFooter />
    </div>
  );
}
