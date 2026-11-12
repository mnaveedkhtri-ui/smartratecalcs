import { Metadata } from 'next';
import Link from 'next/link';
import { SiteLegalFooter } from '../../components/SiteLegalFooter';

export const metadata: Metadata = {
  title: 'Terms of Service | SmartRateCalcs User Agreement',
  description: 'Terms of service governing use of SmartRateCalcs interactive financial calculators, guides, and embeddable tools.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/terms',
  },
  openGraph: {
    title: 'Terms of Service | SmartRateCalcs User Agreement',
    description: 'Terms of service for SmartRateCalcs independent financial calculation platform.',
    url: 'https://www.smartratecalcs.com/terms',
    type: 'website',
  },
};

export default function TermsPage() {
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
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Terms of Service</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Effective Date: November 2026 &bull; SmartRateCalcs.com</p>
          </div>

          <div className="space-y-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Acceptance &amp; Educational Modeling Scope</h2>
              <p>
                By accessing SmartRateCalcs (smartratecalcs.com), you agree to these Terms of Service. SmartRateCalcs is an independent analytical modeling utility built for educational, planning, and comparison purposes based on publicly documented fee schedules, tax tables, and exchange rates.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Independent Entity &amp; Trademark Ownership</h2>
              <p>
                Stripe, Square, PayPal, Shopify, eBay, Poshmark, Venmo, Cash App, Zelle, Wise, Payoneer, Upwork, Fiverr, Deel, QuickBooks, and Intuit are registered trademarks of their respective owners. SmartRateCalcs is an independent software platform and has no official endorsement, sponsorship, or corporate affiliation with any listed payment processor unless explicitly disclosed.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Permitted Use &amp; Embed Guidelines</h2>
              <p>
                Visitors, accountants, freelancers, and publishers may freely use our web calculators and official <span className="font-mono">/embed/</span> endpoints with attribution links preserved. Automated denial-of-service scraping or republishing full proprietary guide content as your own work without permission is prohibited.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">4. Limitation of Liability</h2>
              <p>
                While every formula is maintained with engineering precision, financial institutions, card networks, and tax authorities change rates and regulations without prior notice. SmartRateCalcs and founder Muhammad Naveed are provided &ldquo;as is&rdquo; without warranties of merchantability or fitness for a particular regulatory filing. Always verify final figures on your official processor checkout screen or with a licensed CPA.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">5. Advertising, Privacy &amp; Contact</h2>
              <p>
                Use of this platform is also governed by our{' '}
                <Link href="/privacy" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link href="/disclaimer" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                  Financial Disclaimer
                </Link>. Questions regarding these terms may be sent to{' '}
                <a href="mailto:naveed@smartratecalcs.com" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                  naveed@smartratecalcs.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <SiteLegalFooter />
    </div>
  );
}
