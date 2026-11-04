import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | User Agreement',
  description: 'Terms of service for SmartRateCalcs independent financial calculation platform.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/terms',
  },
  openGraph: {
    title: 'Terms of Service | User Agreement',
    description: 'Terms of service for SmartRateCalcs independent financial calculation platform.',
    url: 'https://www.smartratecalcs.com/terms',
    type: 'website',
  },
};

export default function TermsPage() {
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
          <h1 className="text-3xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">Terms of Service</h1>
          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <h2 className="text-sm font-bold text-slate-900">1. Educational Modeling Tool</h2>
            <p>SmartRateCalcs is an independent analytical tool for computational modeling based on public exchange rates and fees.</p>
            <h2 className="text-sm font-bold text-slate-900">2. Trademark Ownership</h2>
            <p>Wise, Payoneer, Upwork, and Stripe are trademarks of their respective owners. SmartRateCalcs is an independent entity.</p>
            <h2 className="text-sm font-bold text-slate-900">3. Jurisdiction</h2>
            <p>Governed by digital standards under the laws of Sindh, Pakistan.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
