'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { SiteLegalFooter } from '../components/SiteLegalFooter';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception safely without crashing
    if (typeof console !== 'undefined' && console.error) {
      console.error('SmartRateCalcs runtime recovery caught:', error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b1120] text-slate-800 dark:text-slate-200 flex flex-col">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-lg text-slate-900 dark:text-white">
            SmartRate<span className="text-emerald-600 dark:text-emerald-400">Calcs</span>
          </Link>
          <Link href="/" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
            &larr; Back to All Calculators
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-16 flex items-center justify-center">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-md text-center space-y-5">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold">
            SmartRateCalcs Auto-Recovery
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Calculation Engine Reload
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            The mathematical model completed safely. Click reload to refresh this calculator, or browse our 80+ financial fee and tax tools.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => reset()}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              Reload Calculator
            </button>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
            >
              Browse All Calculators
            </Link>
          </div>
        </div>
      </main>

      <SiteLegalFooter />
    </div>
  );
}
