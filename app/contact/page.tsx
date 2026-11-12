import { Metadata } from 'next';
import Link from 'next/link';
import { ContactFormClient } from '../../components/ContactFormClient';
import { SiteLegalFooter } from '../../components/SiteLegalFooter';

export const metadata: Metadata = {
  title: 'Contact Muhammad Naveed | SmartRateCalcs Support & Custom Calculators',
  description: 'Contact SmartRateCalcs founder Muhammad Naveed for fee schedule corrections, partnerships, or custom B2B financial calculators.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/contact',
  },
  openGraph: {
    title: 'Contact Muhammad Naveed | SmartRateCalcs',
    description: 'Reach Muhammad Naveed directly at naveed@smartratecalcs.com for custom financial calculators, bug reports, or partnerships.',
    url: 'https://www.smartratecalcs.com/contact',
    type: 'website',
  },
};

export default function ContactPage() {
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
          <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
            <span className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 font-bold">
              Direct Support &amp; Custom Engineering
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 mb-2">
              Contact SmartRateCalcs
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Founded and maintained by Muhammad Naveed. Reach out for fee schedule updates, data corrections, white-label ROI/tax calculators for SaaS and agencies, or general inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Official Business Email
                </div>
                <a
                  href="mailto:naveed@smartratecalcs.com"
                  className="text-base font-bold font-mono text-emerald-700 dark:text-emerald-400 hover:underline break-all"
                >
                  naveed@smartratecalcs.com
                </a>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                  Typical reply within 24 business hours.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1">
                  WhatsApp Direct Line
                </div>
                <a
                  href="https://wa.me/923323219981"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-bold font-mono text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  +92 332 3219981
                </a>
                <p className="text-xs text-emerald-700/80 dark:text-emerald-400/80 mt-1.5">
                  Hyderabad, Pakistan (UTC+5)
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Editorial &amp; Transparency
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Spot an outdated payment processor rate or state tax figure? Send the official schedule link to{' '}
                  <span className="font-mono text-slate-800 dark:text-slate-200">naveed@smartratecalcs.com</span> and we will verify and update the model.
                </p>
              </div>
            </div>

            <ContactFormClient />
          </div>
        </div>
      </main>

      <SiteLegalFooter />
    </div>
  );
}
