import { Metadata } from 'next';
import Link from 'next/link';
import { SiteLegalFooter } from '../../components/SiteLegalFooter';

export const metadata: Metadata = {
  title: 'Financial & Tax Disclaimer | SmartRateCalcs',
  description: 'Important financial, tax, foreign exchange, and affiliate transparency disclosures for SmartRateCalcs tools and guides.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/disclaimer',
  },
  openGraph: {
    title: 'Financial Disclaimer | SmartRateCalcs',
    description: 'SmartRateCalcs financial, tax modeling, and data source transparency.',
    url: 'https://www.smartratecalcs.com/disclaimer',
    type: 'website',
  },
};

export default function DisclaimerPage() {
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
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Financial &amp; Tax Disclaimer</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Last Updated: November 2026 &bull; SmartRateCalcs.com</p>
          </div>

          <div className="space-y-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Modeling &amp; Estimation Purposes Only</h2>
              <p>
                All fee breakdowns, net profit margins, cross-border exchange spreads, and 1099 estimated tax figures displayed on SmartRateCalcs are mathematical estimates calculated from publicly listed 2026 fee schedules and standard statutory rates. Actual settlement amounts depend on merchant volume tiers, cross-border card surcharges, bank correspondent fees, filing status, itemized deductions, and real-time spot exchange spreads.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">2. No Legal, Accounting, or Tax Advice</h2>
              <p>
                Content published across our calculators and payout research guides is strictly informational. Using SmartRateCalcs does not establish an accountant-client, fiduciary, or legal advisory relationship. Consult a licensed Certified Public Accountant (CPA), Enrolled Agent, or qualified tax advisor before submitting IRS Form 1040-ES payments, state franchise tax filings, or merchant surcharge notices.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Compensation &amp; Editorial Independence</h2>
              <p>
                SmartRateCalcs may earn commissions when users open accounts through partner links or view third-party Google AdSense placements. Compensation never influences our calculator formulas, rate tables, or editorial fee comparisons.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">4. Report a Rate Update</h2>
              <p>
                If a payment processor or tax authority adjusts its fee structure, please notify Muhammad Naveed via our{' '}
                <Link href="/contact" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                  Contact page
                </Link>{' '}
                or email <span className="font-mono">naveed@smartratecalcs.com</span>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <SiteLegalFooter />
    </div>
  );
}
