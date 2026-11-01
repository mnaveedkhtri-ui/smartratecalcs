import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Financial Disclaimer | Educational Modeling Notice',
  description: 'SmartRateCalcs financial disclaimer and data sources transparency.',
  alternates: {
    canonical: 'https://smartratecalcs.com/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800">
      <header className="bg-white border-b border-slate-200 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-lg text-slate-900">
            SmartRate<span className="text-emerald-600">Calcs</span>
          </Link>
          <Link href="/" className="text-xs font-semibold text-emerald-600 hover:underline">
            &larr; Back to Calculators
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md space-y-6">
          <h1 className="text-3xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">Financial Disclaimer</h1>
          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <h2 className="text-sm font-bold text-slate-900">1. Modeling Purposes Only</h2>
            <p>All calculations provided on SmartRateCalcs are estimates based on published mid-market exchange rates and published fee schedules.</p>
            <h2 className="text-sm font-bold text-slate-900">2. No Financial Advice</h2>
            <p>The information on this website does not constitute financial, investment, or legal advice.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
