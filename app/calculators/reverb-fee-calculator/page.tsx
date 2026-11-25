import { Metadata } from 'next';
import Link from 'next/link';
import ReverbCalculatorWidget from '../../../components/ReverbCalculatorWidget';
import ThemeToggle from '../../../components/ThemeToggle';
import { SiteLegalFooter } from '../../../components/SiteLegalFooter';

export const metadata: Metadata = {
  title: 'Reverb Fee Calculator [2026 Official] 5% Selling + 3.19% Payout Math',
  description:
    'Free 2026 Reverb fee calculator. Calculate exact net profit after the 5% selling fee ($500 cap), 3.19% vs 2.99% Preferred Seller processing on tax & shipping, Reverb Bump ads, and reverse pricing.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/calculators/reverb-fee-calculator',
  },
  openGraph: {
    title: 'Reverb Fee Calculator 2026 | Gear Net Payout & Reverse Price Solver',
    description:
      'Model exact Reverb payouts for guitars, synths, and studio gear. Includes 5% selling fee cap, tax-inclusive payment processing, Preferred Seller rates, and eBay Music comparisons.',
    url: 'https://www.smartratecalcs.com/calculators/reverb-fee-calculator',
    type: 'website',
    images: [
      {
        url: 'https://www.smartratecalcs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Reverb Fee Calculator 2026 - SmartRateCalcs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverb Fee Calculator 2026 (5% Selling + Preferred Seller Math)',
    description:
      'Calculate exact Reverb seller payouts after 5% commission ($500 max cap), 3.19% + $0.49 tax-inclusive processing, Bump fees, and shipping.',
    images: ['https://www.smartratecalcs.com/og-image.png'],
  },
};

export default function ReverbCalculatorPage() {
  const pageUrl = 'https://www.smartratecalcs.com/calculators/reverb-fee-calculator';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are Reverb seller fees in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Reverb charges a flat 5.0% selling fee on the item price plus buyer-paid shipping (minimum $0.50, capped at $500 per item), plus a Reverb Payments processing fee of 3.19% + $0.49 (or 2.99% + $0.49 for Preferred Sellers) calculated on the full order total including state sales tax.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Reverb charge payment processing fees on sales tax?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. While the 5.0% Reverb selling fee only applies to the item price plus shipping, the 3.19% + $0.49 Reverb Payments processing fee applies to the entire buyer checkout amount, including marketplace-collected state sales tax.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the $500 Reverb selling fee cap work on vintage guitars?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Because Reverb caps the 5.0% selling fee at $500 USD per item, any order where item price plus buyer-paid shipping exceeds $10,000 stops accruing additional 5% selling commission. However, the 3.19% (or 2.99%) payment processing fee continues to scale with total order price.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does Reverb Preferred Seller status save?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Reverb Preferred Sellers receive a discounted payment processing rate of 2.99% + $0.49 instead of the standard 3.19% + $0.49, saving $2.00 per $1,000 in gross gear sales.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Reverb cheaper than eBay for selling guitars and pedals?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Standard Reverb totals approximately 8.19% + $0.49 (plus tax drag), whereas eBay Musical Instruments & Gear charges 6.35% up to $7,500 (including payment processing) or 13.25% in general electronics categories. Reverb often delivers higher buyer trust and faster conversion for niche boutique gear.',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.smartratecalcs.com' },
      { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.smartratecalcs.com/#calculators' },
      { '@type': 'ListItem', position: 3, name: 'Reverb Fee Calculator', item: pageUrl },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SmartRateCalcs Reverb Fee & Profit Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    url: pageUrl,
    about: [
      { '@type': 'Thing', sameAs: 'https://www.wikidata.org/wiki/Q28402387' },
      { '@type': 'Thing', sameAs: 'https://www.wikidata.org/wiki/Q58024' },
    ],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Person', name: 'Muhammad Naveed', url: 'https://www.smartratecalcs.com/about' },
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Your Net Reverb Payout in 2026',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Enter Gear Sale Price & Buyer Shipping', text: 'Input your expected sold price and the shipping rate charged to the buyer.' },
      { '@type': 'HowToStep', position: 2, name: 'Account for Buyer Sales Tax & Seller Tier', text: 'Set average state sales tax (~7%) and choose Standard (3.19%) or Preferred Seller (2.99%) processing.' },
      { '@type': 'HowToStep', position: 3, name: 'Include Bump Ads & Actual Label Cost', text: 'Add any Reverb Bump percentage and subtract the actual carrier shipping label plus COGS.' },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform">
              R
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white leading-none">
                SmartRate<span className="text-orange-600 dark:text-orange-400">Calcs</span>
              </span>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono mt-0.5">
                Musical Gear Payout Suite
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/#calculators" className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-orange-600 hidden sm:inline">
              All Calculators
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <nav aria-label="Breadcrumbs" className="flex items-center justify-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mb-2">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span>/</span>
            <Link href="/#calculators" className="hover:text-orange-600">Calculators</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-semibold">Reverb Fee Calculator</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-900/60 text-xs font-bold text-orange-700 dark:text-orange-300">
            <span className="w-2 h-2 rounded-full bg-orange-600"></span>
            Updated for 2026 Official Reverb Selling &amp; Payment Rules
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Reverb Fee Calculator <span className="text-orange-600 dark:text-orange-400">(2026)</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Model your exact guitar, pedal, synth, and studio gear payout. Calculates Reverb&apos;s{' '}
            <strong>5.0% selling fee ($500 cap)</strong>, <strong>3.19% vs 2.99% Preferred Seller processing</strong>{' '}
            (including sales tax pass-through), optional <strong>Reverb Bump</strong> ad cuts, and reverse target pricing.
          </p>
        </div>

        {/* Interactive Calculator */}
        <section aria-label="Reverb Fee Calculator Widget">
          <ReverbCalculatorWidget isStandalone={false} />
        </section>

        {/* Quick Reference & Authority Guide */}
        <article className="mt-12 space-y-10 text-slate-800 dark:text-slate-200 max-w-4xl mx-auto pt-6 border-t border-slate-200 dark:border-slate-800">
          <section className="p-6 rounded-3xl bg-orange-50/70 dark:bg-orange-950/30 border-2 border-orange-500/40 space-y-3">
            <div className="text-xs font-mono font-bold text-orange-700 dark:text-orange-300 uppercase tracking-wider">
              AEO Direct Verdict &bull; 2026 Official Formula
            </div>
            <p className="text-sm sm:text-base leading-relaxed">
              On a standard US domestic order, Reverb deducts <strong>5.0%</strong> of (Item Price + Buyer Shipping, capped at $500) plus{' '}
              <strong>3.19% + $0.49</strong> payment processing calculated on the <em>entire buyer total including sales tax</em>. On an $850 guitar with $45 shipping and 7% tax, total Reverb fees equal <strong>$75.47</strong>, leaving <strong>$819.53</strong> before label cost and COGS.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              6-Tier Reverb Gear Payout Schedule (Standard Seller, $35 Shipping, 7% Tax)
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <th className="p-3.5 font-bold">Gear Price</th>
                    <th className="p-3.5 font-bold">5% Selling Fee</th>
                    <th className="p-3.5 font-bold">3.19% + $0.49 (w/ Tax)</th>
                    <th className="p-3.5 font-bold">Total Reverb Fees</th>
                    <th className="p-3.5 font-bold text-emerald-700 dark:text-emerald-400">Net Payout (Pre-Label)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    { p: 150, sell: 9.25, proc: 6.80, net: 168.95 },
                    { p: 400, sell: 21.75, proc: 15.34, net: 397.91 },
                    { p: 850, sell: 44.25, proc: 30.70, net: 810.05 },
                    { p: 1500, sell: 76.75, proc: 52.88, net: 1405.37 },
                    { p: 3500, sell: 176.75, proc: 121.15, net: 3237.10 },
                    { p: 12000, sell: 500.00, proc: 411.27, net: 11123.73 },
                  ].map((r) => (
                    <tr key={r.p} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold">${r.p.toLocaleString()}</td>
                      <td className="p-3.5 text-rose-600 dark:text-rose-400">-${r.sell.toFixed(2)}</td>
                      <td className="p-3.5 text-amber-600 dark:text-amber-400">-${r.proc.toFixed(2)}</td>
                      <td className="p-3.5 font-bold">-${(r.sell + r.proc).toFixed(2)}</td>
                      <td className="p-3.5 font-bold text-emerald-700 dark:text-emerald-400">${r.net.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 uppercase">Deep Pillar Research</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                Reverb Seller Fees 2026: The $500 Cap, Tax Processing Drag &amp; Reverb vs eBay
              </h3>
            </div>
            <Link
              href="/blog/reverb-seller-fees-2026-complete-gear-profit-margin-guide"
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shrink-0 transition"
            >
              Read Full Guide &rarr;
            </Link>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqSchema.mainEntity.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-1.5">{faq.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
      <SiteLegalFooter />
    </div>
  );
}
