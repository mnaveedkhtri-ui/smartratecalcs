import { Metadata } from 'next';
import Link from 'next/link';
import { SiteLegalFooter } from '../../components/SiteLegalFooter';

export const metadata: Metadata = {
  title: 'Privacy Policy | SmartRateCalcs',
  description: 'SmartRateCalcs privacy policy covering client-side financial calculations, Google AdSense advertising cookies, and affiliate disclosures.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | SmartRateCalcs',
    description: 'SmartRateCalcs privacy policy covering client-side calculation privacy, Google AdSense cookies, and partner disclosures.',
    url: 'https://www.smartratecalcs.com/privacy',
    type: 'website',
  },
};

export default function PrivacyPage() {
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
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Privacy Policy</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Last Updated: November 2026 &bull; SmartRateCalcs.com</p>
          </div>

          <div className="space-y-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Client-Side Financial Calculations</h2>
              <p>
                All fee, payout, and 1099 tax calculations on SmartRateCalcs run locally inside your web browser. We do not store, log, or sell the dollar amounts, tax inputs, or revenue numbers you enter into any calculator.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Advertising Partners &amp; Google AdSense Cookies</h2>
              <p>
                To keep our financial tools free to access, SmartRateCalcs displays or may display third-party advertisements through Google AdSense. Third-party vendors, including Google, use cookies to serve ads based on a visitor&apos;s prior visits to this website or other websites on the internet.
              </p>
              <p>
                Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to SmartRateCalcs and other sites. Visitors may opt out of personalized advertising at any time by visiting{' '}
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                  Google Ads Settings
                </a>{' '}
                or opt out of other third-party vendor cookies via{' '}
                <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                  aboutads.info
                </a>.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Affiliate &amp; Partner Disclosures</h2>
              <p>
                Some guides and comparison tables on SmartRateCalcs contain partner or affiliate links to financial and commerce platforms (such as Wise, Payoneer, QuickBooks, or Shopify). Clicking these links may generate a referral commission at no additional cost to you. Partner relationships never alter our published mathematical fee formulas.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">4. Hosting Telemetry &amp; External Links</h2>
              <p>
                Our hosting provider may record standard anonymous request metadata (such as HTTP status codes, browser user agents, and country-level routing logs) strictly for security, uptime, and abuse prevention. External websites linked from our guides operate under their own privacy policies.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">5. Contact &amp; Privacy Inquiries</h2>
              <p>
                For privacy questions or data removal requests, contact founder Muhammad Naveed directly at{' '}
                <a href="mailto:naveed@smartratecalcs.com" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                  naveed@smartratecalcs.com
                </a>{' '}
                or visit our{' '}
                <Link href="/contact" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                  Contact page
                </Link>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <SiteLegalFooter />
    </div>
  );
}
