import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#059669',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.smartratecalcs.com'),
  title: {
    default: 'SmartRateCalcs | 2026 Freelance Fee & Net Payout Calculator',
    template: '%s',
  },
  description:
    'Calculate exact net payouts and compare fees for PayPal, Stripe, Wise, Payoneer & Upwork. Free 2026 currency conversion rates with zero hidden spreads.',
  keywords: [
    'wise vs payoneer fee calculator',
    'upwork to jazzcash payout calculator',
    'freelance hourly rate calculator pakistan',
    'shopify break even roas calculator',
    'international wire fee comparison',
    'usd to pkr real exchange rate',
  ],
  authors: [{ name: 'Muhammad Naveed', url: 'https://www.smartratecalcs.com/about' }],
  creator: 'Muhammad Naveed',
  publisher: 'SmartRateCalcs',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.smartratecalcs.com/',
    siteName: 'SmartRateCalcs',
    title: 'SmartRateCalcs | 2026 Freelance Fee & Net Payout Calculator',
    description:
      'Calculate exact net payouts and compare fees for PayPal, Stripe, Wise, Payoneer & Upwork. Free 2026 conversion rates with zero hidden spreads.',
    images: [
      {
        url: 'https://www.smartratecalcs.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SmartRateCalcs Financial Intelligence Engine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartRateCalcs | Real Take-Home Payout Calculator',
    description:
      'Eliminate hidden FX markups and calculate exact bank payouts across Wise, Payoneer, and SWIFT wires.',
    images: ['https://www.smartratecalcs.com/og-image.png'],
    creator: '@naveed_engineer',
  },
  alternates: {
    canonical: 'https://www.smartratecalcs.com',
  },
  verification: {
    google: 'FzC73kAndsqrqsza438VtUdn49KmQZfgQm61v9-ukls',
    other: {
      'msvalidate.01': '7AE1E81DB909ABEB0E3E32E59E18A963',
      'p:domain_verify': 'a8d45f72fc74186b14b460995c711d27',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.smartratecalcs.com/#organization',
        name: 'SmartRateCalcs',
        url: 'https://www.smartratecalcs.com/',
        email: 'naveed@smartratecalcs.com',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'naveed@smartratecalcs.com',
        },
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.smartratecalcs.com/icon.png',
        },
        description: 'Independent Financial Calculation & Payout Engine',
        sameAs: [
          'https://github.com/mnaveedkhtri-ui',
          'https://github.com/mnaveedkhtri-ui/2026-fee-and-ergonomics-formulas',
          'https://mnaveedkhtri-ui.github.io/2026-fee-and-ergonomics-formulas/',
          'https://peerlist.io/naveedkhtri7',
          'https://smartrate-notes.hashnode.dev',
          'https://dev.to/naveed_khatri_a387d7fe997',
          'https://www.linkedin.com/pulse/how-freelancers-e-commerce-sellers-can-stop-losing-12-naveed-khatri-fnzuf/',
          'https://www.smartratecalcs.com/research/2026-marketplace-fee-index',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.smartratecalcs.com/#website',
        url: 'https://www.smartratecalcs.com/',
        name: 'SmartRateCalcs',
        description: 'Independent Financial Calculation & Payout Engine',
        publisher: {
          '@id': 'https://www.smartratecalcs.com/#organization',
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.smartratecalcs.com/#app',
        name: 'SmartRateCalcs Financial Intelligence Engine',
        url: 'https://www.smartratecalcs.com/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        author: {
          '@id': 'https://www.smartratecalcs.com/#author',
        },
      },
      {
        '@type': 'Person',
        '@id': 'https://www.smartratecalcs.com/#author',
        name: 'Muhammad Naveed',
        alternateName: 'Naveed Khatri',
        jobTitle: 'Lead Software & Automation Engineer',
        email: 'naveed@smartratecalcs.com',
        url: 'https://www.smartratecalcs.com/about',
        sameAs: [
          'https://github.com/mnaveedkhtri-ui',
          'https://github.com/mnaveedkhtri-ui/2026-fee-and-ergonomics-formulas',
          'https://mnaveedkhtri-ui.github.io/2026-fee-and-ergonomics-formulas/',
          'https://peerlist.io/naveedkhtri7',
          'https://smartrate-notes.hashnode.dev',
          'https://dev.to/naveed_khatri_a387d7fe997',
          'https://naveedkhtri.medium.com',
          'https://www.linkedin.com/pulse/how-freelancers-e-commerce-sellers-can-stop-losing-12-naveed-khatri-fnzuf/',
          'https://www.moderntrendsnow.store/about',
          'https://www.smartratecalcs.com/about',
        ],
        worksFor: {
          '@id': 'https://www.smartratecalcs.com/#organization',
        },
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('smartrate_theme');if(s==='dark'){document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');}else{document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');}}catch(e){}})();`,
          }}
        />
        <meta name="google-site-verification" content="FzC73kAndsqrqsza438VtUdn49KmQZfgQm61v9-ukls" />
        <meta name="msvalidate.01" content="7AE1E81DB909ABEB0E3E32E59E18A963" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="me" href="https://github.com/mnaveedkhtri-ui" />
        <link rel="me" href="https://peerlist.io/naveedkhtri7" />
        <link rel="me" href="https://smartrate-notes.hashnode.dev" />
        <link rel="me" href="https://dev.to/naveed_khatri_a387d7fe997" />
        <link rel="me" href="https://naveedkhtri.medium.com" />
        <link rel="alternate" type="application/json" title="SmartRateCalcs 2026 Fee Rates API" href="https://www.smartratecalcs.com/api/v1/rates" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <link
          rel="preload"
          as="style"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              function loadCSS(href){
                var l=document.createElement('link');
                l.rel='stylesheet';
                l.href=href;
                document.head.appendChild(l);
              }
              loadCSS('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
              loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');
            })();`,
          }}
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#f8fafc] dark:bg-[#070d17] text-slate-800 dark:text-slate-100 antialiased min-h-screen transition-colors duration-200">
        {/* Google AdSense Verification & Auto Ads (deferred for 95+ Core Web Vitals) */}
        <Script
          id="google-adsense"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8616861763785858"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        {/* Ahrefs Web Analytics */}
        <Script
          id="ahrefs-analytics"
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="ZdZs4yu2IJtVFUgGS0MKdg"
          strategy="lazyOnload"
        />
        {/* Google Analytics 4 (GA4) */}
        <Script
          id="google-analytics-gtag"
          src="https://www.googletagmanager.com/gtag/js?id=G-8JV66TTPEW"
          strategy="lazyOnload"
        />
        <Script id="google-analytics-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8JV66TTPEW', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
