import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Muhammad Naveed | Founder of SmartRateCalcs',
  description: 'Learn about the engineering mission behind SmartRateCalcs, founded by full-stack and automation software engineer Muhammad Naveed.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/about',
  },
  openGraph: {
    title: 'About Muhammad Naveed | Founder of SmartRateCalcs',
    description: 'Learn about the engineering mission behind SmartRateCalcs, founded by full-stack and automation software engineer Muhammad Naveed.',
    url: 'https://www.smartratecalcs.com/about',
    type: 'website',
  },
};

export default function AboutPage() {
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
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-2xl font-mono">
              MN
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Muhammad Naveed</h1>
              <p className="text-xs text-slate-500">Lead Full-Stack &amp; Automation Software Engineer &bull; Hyderabad, Pakistan</p>
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-900">The Mission</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            As a software engineer handling cross-border contractor payouts across Europe and the US, I experienced firsthand how hidden foreign exchange spreads erode contractor earnings. SmartRateCalcs was engineered to provide open mathematical transparency to fellow engineers and digital commerce founders worldwide.
          </p>

          <div className="pt-4 border-t border-slate-100 flex items-center gap-4 text-xs font-bold text-emerald-600">
            <a href="https://naveed-portfolio-kappa.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Verified Portfolio
            </a>
            <span>&bull;</span>
            <a href="https://github.com/mnaveedkhtri-ui" target="_blank" rel="noopener noreferrer" className="hover:underline">
              GitHub Profile
            </a>
            <span>&bull;</span>
            <a href="mailto:naveedkhtri7@gmail.com" className="hover:underline">
              naveedkhtri7@gmail.com
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
