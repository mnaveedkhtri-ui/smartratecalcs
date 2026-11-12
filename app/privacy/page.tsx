import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Zero-Tracking Guarantee',
  description: 'SmartRateCalcs privacy policy: zero tracking cookies, 100% client-side financial calculations.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Zero-Tracking Guarantee',
    description: 'SmartRateCalcs privacy policy: zero tracking cookies, 100% client-side financial calculations.',
    url: 'https://www.smartratecalcs.com/privacy',
    type: 'website',
  },
};

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">Privacy Policy</h1>
          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <h2 className="text-sm font-bold text-slate-900">1. Zero Tracking Cookies</h2>
            <p>SmartRateCalcs does not deploy third-party advertising cookies, user fingerprinting, or tracking pixels.</p>
            <h2 className="text-sm font-bold text-slate-900">2. Client-Side Math</h2>
            <p>All calculations execute locally in your web browser. No financial data is sent to our servers.</p>
            <h2 className="text-sm font-bold text-slate-900">3. Contact</h2>
            <p>For inquiries, contact Muhammad Naveed at <a href="mailto:naveed@smartratecalcs.com" className="text-emerald-600 font-semibold hover:underline">naveed@smartratecalcs.com</a>.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
