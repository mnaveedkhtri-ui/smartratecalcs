import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteLegalFooter } from '../../../components/SiteLegalFooter';
import { BLOG_POSTS } from '../../../data/blog-posts';
import ThemeToggle from '../../../components/ThemeToggle';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};

  const url = `https://www.smartratecalcs.com/blog/${post.slug}`;

  return {
    title: post.metaTitle,
    description: post.metaDesc,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDesc,
      url,
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedDate,
      authors: ['Muhammad Naveed'],
      images: [
        {
          url: `https://www.smartratecalcs.com/blog/${post.slug}.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDesc,
      images: [`https://www.smartratecalcs.com/blog/${post.slug}.png`],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const currentUrl = `https://www.smartratecalcs.com/blog/${post.slug}`;

  // 1. Article / BlogPosting Schema for Google Search
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDesc,
    url: currentUrl,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': currentUrl,
    },
    author: {
      '@type': 'Person',
      name: 'Muhammad Naveed',
      jobTitle: 'Lead Financial Systems & Full-Stack Engineer',
      url: 'https://naveed-portfolio-kappa.vercel.app/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SmartRateCalcs',
      url: 'https://www.smartratecalcs.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.smartratecalcs.com/icon.png',
      },
    },
    image: post.images && post.images.length > 0
      ? post.images
      : post.slug === 'upwork-pakistan-lowest-withdrawal-fee-guide'
      ? [
          `https://www.smartratecalcs.com/blog/${post.slug}.png`,
          'https://www.smartratecalcs.com/blog/images/upwork-withdrawal-routes-flowchart.png',
          'https://www.smartratecalcs.com/blog/images/upwork-annual-leakage-chart.png',
          'https://www.smartratecalcs.com/blog/images/upwork-setup-checklist.png',
        ]
      : [
          `https://www.smartratecalcs.com/blog/${post.slug}.png`,
          'https://www.smartratecalcs.com/blog/images/fbr-section-154a-tax-brackets.png',
          'https://www.smartratecalcs.com/blog/images/pseb-registration-workflow-diagram.png',
          'https://www.smartratecalcs.com/blog/images/digital-prc-compliance-checklist.png',
        ],
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(', '),
    ...(post.wikidataEntities && post.wikidataEntities.length > 0
      ? {
          about: post.wikidataEntities.map((uri) => ({
            '@type': 'Thing',
            sameAs: uri,
          })),
        }
      : {}),
    ...(post.externalSources && post.externalSources.length > 0
      ? {
          citation: post.externalSources.map((src) => ({
            '@type': 'CreativeWork',
            name: src.name,
            url: src.url,
          })),
        }
      : {}),
  };

  // 2. BreadcrumbList Schema
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
        name: 'Guides',
        item: 'https://www.smartratecalcs.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: currentUrl,
      },
    ],
  };

  // 3. FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  // Related posts (excluding current)
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070d17] text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
            <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm shadow-sm">
              <i className="fa-solid fa-calculator"></i>
            </span>
            SmartRate<span className="text-emerald-600 dark:text-emerald-400">Calcs</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link
              href="/blog"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            >
              &larr; <span className="hidden sm:inline">All</span> Guides
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Breadcrumb Trail */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 font-mono">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-emerald-600 dark:hover:text-emerald-400">
            Guides
          </Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 font-bold truncate max-w-[200px] sm:max-w-none">
            {post.category}
          </span>
        </nav>

        {/* Title & Metadata */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold font-mono">
              {post.category}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">&bull;</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{post.readTime}</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">&bull;</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Verified Nov 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 pt-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
              MN
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white">Muhammad Naveed</span> &bull; Lead Systems Engineer
            </div>
          </div>
        </div>

        {/* Featured Hero Banner Image */}
        <div className="mb-10 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-950 aspect-[1200/630]">
          <img
            src={`/blog/${post.slug}.png`}
            alt={post.title}
            width={1200}
            height={630}
            className="w-full h-auto object-cover"
            loading="eager"
          />
        </div>

        {/* AI OVERVIEW DIRECT ANSWER BOX (For Google SGE / Gemini citation) */}
        <section className="mb-10 p-6 sm:p-7 rounded-3xl bg-emerald-50/80 dark:bg-emerald-950/35 border-2 border-emerald-500/80 dark:border-emerald-500/50 shadow-sm relative">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider mb-2 font-mono">
            <i className="fa-solid fa-sparkles text-emerald-600 dark:text-emerald-400"></i>
            <span>Executive Summary &amp; Direct Answer</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium mb-4">
            {post.quickSummary}
          </p>
          <div className="pt-3 border-t border-emerald-200/80 dark:border-emerald-800/60 flex flex-wrap gap-2 items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-mono">
            <span>Primary Focus: {post.primaryKeyword}</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold">Verified Empirical Data</span>
          </div>
        </section>

        {/* HIGH-INTENT INTERNAL CALCULATOR LINKING CLUSTER */}
        {post.slug === 'credit-card-surcharge-formula-invoice-square-fees-guide' && (
          <div className="mb-10 p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  US Merchant Surcharge &amp; Reverse Fee Tools (2026)
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Instant USD Math</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/square-fee-calculator"
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/80 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 flex items-center justify-between">
                    <span>Square Reverse Fee Calculator</span>
                    <span className="text-emerald-400 text-sm">&rarr;</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Compute exact invoice gross-up for 3.3% + $0.30 invoices and 2.6% + $0.10 POS swipes.
                  </p>
                </div>
                <div className="mt-3 text-[10px] font-mono text-emerald-300 font-semibold">
                  Reverse Gross-Up Mode &bull; US 2026
                </div>
              </Link>

              <Link
                href="/calculators/stripe-vs-square-fee-calculator"
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/80 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 flex items-center justify-between">
                    <span>Stripe vs Square Fee Comparison</span>
                    <span className="text-emerald-400 text-sm">&rarr;</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Compare 2.9% + $0.30 online checkout vs 3.3% + $0.30 Square Invoices side-by-side.
                  </p>
                </div>
                <div className="mt-3 text-[10px] font-mono text-emerald-300 font-semibold">
                  Merchant Margin Audit &bull; Free
                </div>
              </Link>

              <Link
                href="/stripe-fee-calculator"
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/80 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 flex items-center justify-between">
                    <span>Stripe Invoice Fee Calculator</span>
                    <span className="text-emerald-400 text-sm">&rarr;</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Calculate exact card processing deductions and international card markups on Stripe.
                  </p>
                </div>
                <div className="mt-3 text-[10px] font-mono text-emerald-300 font-semibold">
                  Domestic &amp; International &bull; 2026
                </div>
              </Link>

              <Link
                href="/paypal-fee-calculator"
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/80 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 flex items-center justify-between">
                    <span>PayPal Business Fee Calculator</span>
                    <span className="text-emerald-400 text-sm">&rarr;</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Audit PayPal 3.49% + $0.49 commercial invoicing cost vs Square and ACH transfers.
                  </p>
                </div>
                <div className="mt-3 text-[10px] font-mono text-emerald-300 font-semibold">
                  Zero Shortfall Formula &bull; Live
                </div>
              </Link>
            </div>
          </div>
        )}

        {post.slug === '1099-safe-harbor-rule-quarterly-estimated-taxes-guide' && (
          <div className="mb-10 p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  US 1099 Contractor Tax &amp; Rate Calculators (2026 IRS)
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Form 1040-ES &amp; Schedule C</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/1099-tax-calculator"
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/80 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 flex items-center justify-between">
                    <span>1099 Tax &amp; Quarterly Voucher Calculator</span>
                    <span className="text-emerald-400 text-sm">&rarr;</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Calculate 15.3% SE tax (92.35% net profit), Social Security cap, and Form 1040-ES payments.
                  </p>
                </div>
                <div className="mt-3 text-[10px] font-mono text-emerald-300 font-semibold">
                  IRS Safe Harbor Ready &bull; 2026
                </div>
              </Link>

              <Link
                href="/freelance-hourly-rate-calculator"
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/80 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 flex items-center justify-between">
                    <span>1099 vs W-2 Hourly Rate Calculator</span>
                    <span className="text-emerald-400 text-sm">&rarr;</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Convert your target W-2 salary into an exact billable 1099 hourly consulting rate.
                  </p>
                </div>
                <div className="mt-3 text-[10px] font-mono text-emerald-300 font-semibold">
                  Tax &amp; Overhead Adjusted &bull; Free
                </div>
              </Link>

              <Link
                href="/stripe-fee-calculator"
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/80 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 flex items-center justify-between">
                    <span>Stripe Client Invoice Deductions</span>
                    <span className="text-emerald-400 text-sm">&rarr;</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Track merchant processing fees eligible as 100% deductible Schedule C business expenses.
                  </p>
                </div>
                <div className="mt-3 text-[10px] font-mono text-emerald-300 font-semibold">
                  Schedule C Write-Offs &bull; Live
                </div>
              </Link>

              <Link
                href="/calculators/wise-vs-revolut-fee-calculator"
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/80 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 flex items-center justify-between">
                    <span>Wise vs Revolut Business Transfers</span>
                    <span className="text-emerald-400 text-sm">&rarr;</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Eliminate FX markups when receiving cross-border USD, GBP, or EUR contractor retainers.
                  </p>
                </div>
                <div className="mt-3 text-[10px] font-mono text-emerald-300 font-semibold">
                  International Contractors &bull; 2026
                </div>
              </Link>
            </div>
          </div>
        )}

        {post.slug === 'upwork-pakistan-lowest-withdrawal-fee-guide' && (
          <div className="mb-10 p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Instant Payout Calculators (2026 Rates)
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Live PKR Conversion</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/calculators/upwork-to-jazzcash-payout-calculator"
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/80 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 flex items-center justify-between">
                    <span>Upwork to JazzCash Calculator</span>
                    <span className="text-emerald-400 text-sm">&rarr;</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Compare Upwork Direct ($0.99 + 2.75%) vs Payoneer to JazzCash payout.
                  </p>
                </div>
                <div className="mt-3 text-[10px] font-mono text-emerald-300 font-semibold">
                  Zero Hidden Fees Check &bull; 100% Free
                </div>
              </Link>

              <Link
                href="/calculators/payoneer-to-jazzcash-fee-calculator"
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/80 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 flex items-center justify-between">
                    <span>Payoneer to JazzCash Calculator</span>
                    <span className="text-emerald-400 text-sm">&rarr;</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Calculate exact PKR received after Payoneer 2% conversion spread.
                  </p>
                </div>
                <div className="mt-3 text-[10px] font-mono text-emerald-300 font-semibold">
                  Real-time Interbank Rate &bull; Instant
                </div>
              </Link>

              <Link
                href="/calculators/upwork-direct-to-local-bank-pakistan-calculator"
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/80 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 flex items-center justify-between">
                    <span>Upwork Direct to Local Bank</span>
                    <span className="text-emerald-400 text-sm">&rarr;</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Calculate HBL, Meezan, UBL, and MCB direct wire deduction losses.
                  </p>
                </div>
                <div className="mt-3 text-[10px] font-mono text-emerald-300 font-semibold">
                  Bank Spread Audit &bull; 2026
                </div>
              </Link>

              <Link
                href="/calculators/wise-to-meezan-bank-fee-calculator"
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/80 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 flex items-center justify-between">
                    <span>Wise to Meezan Bank IBAN</span>
                    <span className="text-emerald-400 text-sm">&rarr;</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Calculate USD to PKR Islamic IBAN transfer at Google mid-market rate.
                  </p>
                </div>
                <div className="mt-3 text-[10px] font-mono text-emerald-300 font-semibold">
                  Zero Hidden Markup &bull; Fast Payout
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Table of Contents */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm mb-10">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Table of Contents
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {post.tableOfContents.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline transition-colors leading-snug inline-block"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Article HTML Body */}
        <div
          className="blog-article max-w-none text-slate-800 dark:text-slate-200 leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Embedded Calculator Callout Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-900 dark:to-emerald-950/60 border border-slate-800 dark:border-emerald-500/30 text-white shadow-xl my-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
              <i className="fa-solid fa-calculator text-emerald-400"></i>
              <span>Interactive Utility</span>
            </div>
            <h3 className="text-xl font-bold text-white">Run the Exact Live Calculation</h3>
            <p className="text-xs text-slate-300 max-w-md">
              Calculate your personal invoice payout, compare platform deductions, and eliminate hidden currency conversion spreads.
            </p>
          </div>
          <Link
            href={
              post.relatedCalculatorSlug.startsWith('/')
                ? post.relatedCalculatorSlug
                : `/calculators/${post.relatedCalculatorSlug}`
            }
            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-md whitespace-nowrap"
          >
            Open Dedicated Calculator &rarr;
          </Link>
        </div>

        {/* Knowledge Base FAQs */}
        <section id="faqs" className="space-y-4 mb-12 scroll-mt-24 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
            8. Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {post.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/40 transition-colors"
              >
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-2 flex items-start gap-2.5">
                  <span className="shrink-0 mt-0.5 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 font-mono text-[11px]">
                    Q{idx + 1}
                  </span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-9">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Author Bio Box */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-5 mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white font-black text-2xl flex items-center justify-center shrink-0 shadow-md">
            MN
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase font-mono">
              Written by Chief Systems Engineer
            </div>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
              Muhammad Naveed
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Full-Stack and Automation Engineer specializing in cross-border fintech architectures, automated forex modeling, and developer payout infrastructure.
            </p>
            <div className="pt-1 flex flex-wrap gap-3 justify-center sm:justify-start text-xs text-slate-500 dark:text-slate-400 font-mono">
              <a
                href="https://naveed-portfolio-kappa.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 underline font-semibold"
              >
                Portfolio &rarr;
              </a>
              <a
                href="https://github.com/mnaveedkhtri-ui"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 underline"
              >
                GitHub
              </a>
              <a
                href="mailto:naveed@smartratecalcs.com"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 underline"
              >
                naveed@smartratecalcs.com
              </a>
            </div>
          </div>
        </div>

        {/* Related Guides Grid */}
        {relatedPosts.length > 0 && (
          <div className="space-y-4 mb-12">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recommended Reading</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase font-mono mb-1">
                      {rel.category}
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {rel.title}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-mono">
                    {rel.readTime} &rarr;
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <SiteLegalFooter />
    </div>
  );
}
