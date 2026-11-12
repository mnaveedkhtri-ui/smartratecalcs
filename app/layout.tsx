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
  authors: [{ name: 'Muhammad Naveed', url: 'https://naveed-portfolio-kappa.vercel.app/' }],
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
    canonical: 'https://www.smartratecalcs.com/',
  },
  verification: {
    google: 'FzC73kAndsqrqsza438VtUdn49KmQZfgQm61v9-ukls',
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
        jobTitle: 'Lead Software & Automation Engineer',
        email: 'naveed@smartratecalcs.com',
        url: 'https://naveed-portfolio-kappa.vercel.app/',
        sameAs: [
          'https://github.com/mnaveedkhtri-ui',
          'https://naveed-portfolio-kappa.vercel.app/',
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
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="ZdZs4yu2IJtVFUgGS0MKdg"
          async
        ></script>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#f8fafc] dark:bg-[#070d17] text-slate-800 dark:text-slate-100 antialiased min-h-screen transition-colors duration-200">
        {/* Google Analytics 4 (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8JV66TTPEW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-init" strategy="afterInteractive">
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
