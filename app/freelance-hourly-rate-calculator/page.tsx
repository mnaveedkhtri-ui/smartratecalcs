import { Metadata } from 'next';
import Link from 'next/link';
import FreelanceRateCalculatorWidget from '../../components/FreelanceRateCalculatorWidget';
import ThemeToggle from '../../components/ThemeToggle';
import { SiteLegalFooter } from '../../components/SiteLegalFooter';

export const metadata: Metadata = {
  title: 'Freelance Hourly Rate Calculator (2026) | Target Pricing & Retainer Tool',
  description:
    'Free 2026 freelance hourly rate calculator. Accurately calculate your required hourly rate, day rate, and monthly retainers based on desired take-home salary, non-billable hours, software overhead, and taxes.',
  alternates: {
    canonical: 'https://www.smartratecalcs.com/freelance-hourly-rate-calculator',
  },
  openGraph: {
    title: 'Freelance Hourly Rate Calculator 2026 | Value Pricing & Day Rate Architect',
    description:
      'Never undercharge again. Calculate your true hourly billing rate by factoring in 30% non-billable administrative time, business subscriptions, taxes, and vacation weeks.',
    url: 'https://www.smartratecalcs.com/freelance-hourly-rate-calculator',
    type: 'website',
    images: [
      {
        url: 'https://www.smartratecalcs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Freelance Hourly Rate Calculator - SmartRateCalcs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Freelance Hourly Rate Calculator 2026 (Live Pricing & Retainer Formula)',
    description:
      'Instantly calculate your ideal freelance hourly rate, day rate, and monthly retainer target.',
    images: ['https://www.smartratecalcs.com/og-image.png'],
  },
};

export default function FreelanceRateCalculatorPage() {
  const pageUrl = 'https://www.smartratecalcs.com/freelance-hourly-rate-calculator';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I calculate my freelance hourly rate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To calculate your freelance hourly rate: 1. Add your desired net annual take-home salary to your annual business overhead. 2. Adjust for taxes (e.g., divide by 1 - tax_rate). 3. Divide that gross total by your realistic annual billable hours (weekly billable hours multiplied by working weeks per year). For example, to take home $42,000 net with $4,200 overhead across 1,200 billable hours, your base rate is approximately $40/hour.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why should I only count 20 to 30 billable hours per week?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unlike salaried 40-hour office jobs, freelancers spend between 25% and 40% of their working hours on non-billable tasks: writing proposals, communicating with leads, invoicing, client discovery calls, updating portfolios, and professional skill learning. If you divide your expenses by 40 hours, you will severely underbill and struggle financially.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert my freelance hourly rate to a day rate or monthly retainer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A standard freelance day rate is typically 7 times your hourly rate (e.g., $50/hr = $350/day). A dedicated monthly full-time retainer covers roughly 100 to 120 billable hours per month (e.g., $50/hr x 100 hrs = $5,000/month retainer). Retainers give clients priority scheduling in exchange for income predictability.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do platform cuts (Upwork 10%, Fiverr 20%) affect my rate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If you quote through Upwork, the platform takes a 10% freelancer service fee. To keep your target rate of $50/hr, you must quote $55.56/hr ($50 / 0.90). On Fiverr, where seller fees are 20%, you must quote $62.50/hr ($50 / 0.80) to pocket $50 net.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much should international freelancers in Pakistan or India charge foreign clients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Global software engineers and creative professionals should charge based on the value provided, not their geographical cost of living. Entry-level independent developers typically charge $25 to $40/hour, experienced mid-level engineers charge $50 to $85/hour, and specialized senior systems architects charge $90 to $150+/hour.',
        },
      },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SmartRateCalcs Freelance Hourly Rate Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    url: pageUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'Muhammad Naveed',
      url: 'https://naveed-portfolio-kappa.vercel.app/',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.smartratecalcs.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Freelance Hourly Rate Calculator',
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070d17] text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
            <span className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center text-sm shadow-sm">
              <i className="fa-solid fa-calculator"></i>
            </span>
            SmartRate<span className="text-teal-600 dark:text-teal-400">Calcs</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            >
              &larr; <span className="hidden sm:inline">All</span> Calculators
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        {/* Breadcrumb Trail */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 font-mono">
          <Link href="/" className="hover:text-teal-600 dark:hover:text-teal-400">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 font-bold">Freelance Hourly Rate Calculator</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/60 text-teal-800 dark:text-teal-300 text-[11px] font-bold mb-3 font-mono">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            Independent Pricing Architect &bull; 2026 Capacity Models
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Freelance Hourly Rate Calculator (2026)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Never underprice your technical or creative services again. Calculate your true required hourly rate,
            day rate, and monthly retainers by factoring in{' '}
            <strong className="text-slate-900 dark:text-white">non-billable hours</strong>, software subscriptions,
            vacations, tax withholdings, and platform commission cuts.
          </p>
        </div>

        {/* CALCULATOR WIDGET */}
        <FreelanceRateCalculatorWidget isStandalone={true} />

        {/* AI Overview Direct Answer Callout */}
        <section className="mb-12 p-6 sm:p-8 rounded-3xl bg-teal-50/80 dark:bg-teal-950/40 border-2 border-teal-500/80 dark:border-teal-500/60 shadow-sm relative">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-900 dark:text-teal-300 uppercase tracking-wider mb-2 font-mono">
            <i className="fa-solid fa-sparkles text-teal-600 dark:text-teal-400"></i>
            <span>Executive Pricing Takeaway &amp; Formula (Direct Answer)</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-relaxed font-medium mb-4">
            The fatal mistake most freelancers make is dividing their salary by 2,080 hours (40 hrs &times; 52 weeks). In reality, client acquisition, invoicing, and project management consume <strong>30% of your time</strong>, leaving only <strong>1,000 to 1,200 true billable hours</strong> per year. Your hourly billing rate must be at least <strong>2.5&times; higher</strong> than an equivalent corporate hourly wage to cover taxes, software, health insurance, and unpaid business overhead.
          </p>
          <div className="pt-3 border-t border-teal-200/80 dark:border-teal-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-300 font-mono">
            <div>
              <strong className="text-slate-900 dark:text-white">Core Formula:</strong> Base Rate = [ (Annual Take-Home + Overhead) / (1 - TaxRate) ] / (WeeklyBillableHours &times; WeeksWorked)
            </div>
            <div className="text-teal-700 dark:text-teal-400 font-semibold">
              Verified by Muhammad Naveed
            </div>
          </div>
        </section>

        {/* Educational Pricing Tiers Guide */}
        <section className="mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono mb-2">
            <i className="fa-solid fa-book-open text-teal-600 dark:text-teal-400"></i>
            <span>Market Benchmark Guide</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            How Top Global Freelancers Quote Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-base mb-3 font-mono">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Hourly Billing</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Best for open-ended consulting, bug fixes, code audits, or tasks where the client cannot specify
                a strict scope. Use time-trackers like Upwork Desktop or Clockify.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-base mb-3 font-mono">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Weekly Sprints</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Bill a flat fee per 1-week sprint (e.g., $1,250/week for 25 hours). This eliminates tedious minute-by-minute
                auditing and gives both you and the client crystal-clear cash flow transparency.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-base mb-3 font-mono">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Monthly Retainers</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Reserved for ongoing maintenance, fractional CTO services, or dedicated feature roadmap execution.
                Guarantees recurring monthly revenue while locking in client priority.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="space-y-4 mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
            <i className="fa-solid fa-circle-question text-teal-600 dark:text-teal-400"></i>
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Freelance Rate Calculations Explained
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {faqSchema.mainEntity.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-2">
                  {faq.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-Platform Ecosystem Navigation Mesh */}
        <section className="space-y-4 mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
            <i className="fa-solid fa-sitemap text-teal-600 dark:text-teal-400"></i>
            <span>Related Financial Tools</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Explore Payout &amp; Fee Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/upwork-fee-calculator"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase font-mono mb-1">
                Freelance Marketplace
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                Upwork Fee Calculator &rarr;
              </div>
              <p className="text-[11px] text-slate-500 mt-1">10% service fee and reverse bid proposal tool.</p>
            </Link>

            <Link
              href="/fiverr-fee-calculator"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#1dbf73] hover:shadow-md transition-all group"
            >
              <div className="text-[10px] font-bold text-[#1dbf73] uppercase font-mono mb-1">
                Freelance Marketplace
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#1dbf73] transition-colors">
                Fiverr Fee Calculator &rarr;
              </div>
              <p className="text-[11px] text-slate-500 mt-1">20% seller cut and reverse gig pricing.</p>
            </Link>

            <Link
              href="/payoneer-fee-calculator"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500 hover:shadow-md transition-all group"
            >
              <div className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase font-mono mb-1">
                Payout Engine
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">
                Payoneer Fee Calculator &rarr;
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Unmask 2% hidden bank FX spread and card costs.</p>
            </Link>

            <Link
              href="/stripe-fee-calculator"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:shadow-md transition-all group"
            >
              <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase font-mono mb-1">
                Direct Invoicing
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                Stripe Fee Calculator &rarr;
              </div>
              <p className="text-[11px] text-slate-500 mt-1">2.9% + $0.30 credit card invoice processing.</p>
            </Link>
          </div>
        </section>

        {/* Author Bio Box */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-700 text-white font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-md">
            MN
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase font-mono">
              Lead Systems Engineer &bull; Verified Spec
            </div>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white">Muhammad Naveed</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Full-Stack &amp; Automation Engineer specializing in cross-border financial architectures, automated forex routing, and developer payout infrastructure.
            </p>
            <div className="pt-1 flex flex-wrap gap-3 justify-center sm:justify-start text-xs text-slate-500 dark:text-slate-400 font-mono">
              <a
                href="https://naveed-portfolio-kappa.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-600 dark:hover:text-teal-400 underline font-semibold"
              >
                Portfolio &rarr;
              </a>
              <a
                href="https://github.com/mnaveedkhtri-ui"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-600 dark:hover:text-teal-400 underline"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </main>

      <SiteLegalFooter />
    </div>
  );
}
