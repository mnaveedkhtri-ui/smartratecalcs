import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#059669',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://smartratecalcs.com'),
  title: {
    default: 'SmartRateCalcs | Independent Financial & Payout Intelligence Platform',
    template: '%s | SmartRateCalcs',
  },
  description:
    'Sub-second payout and fee calculation engine for remote software engineers, global contractors, and e-commerce founders. Zero hidden spreads.',
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
    url: 'https://smartratecalcs.com/',
    siteName: 'SmartRateCalcs',
    title: 'SmartRateCalcs | Independent Cross-Border Fee & Payout Calculator',
    description:
      'Compare exact net payouts across Wise, Payoneer, Upwork, and international wire transfers with real-time interbank rates.',
    images: [
      {
        url: 'https://smartratecalcs.com/og-image.png',
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
    images: ['https://smartratecalcs.com/og-image.png'],
    creator: '@naveed_engineer',
  },
  alternates: {
    canonical: 'https://smartratecalcs.com/',
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
        '@type': 'WebSite',
        '@id': 'https://smartratecalcs.com/#website',
        url: 'https://smartratecalcs.com/',
        name: 'SmartRateCalcs',
        description: 'Independent Financial Calculation & Payout Engine',
        publisher: {
          '@id': 'https://smartratecalcs.com/#author',
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://smartratecalcs.com/#app',
        name: 'SmartRateCalcs Financial Intelligence Engine',
        url: 'https://smartratecalcs.com/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        author: {
          '@id': 'https://smartratecalcs.com/#author',
        },
      },
      {
        '@type': 'Person',
        '@id': 'https://smartratecalcs.com/#author',
        name: 'Muhammad Naveed',
        jobTitle: 'Lead Software & Automation Engineer',
        url: 'https://naveed-portfolio-kappa.vercel.app/',
        sameAs: [
          'https://github.com/mnaveedkhtri-ui',
          'https://naveed-portfolio-kappa.vercel.app/',
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'SmartRateCalcs',
          url: 'https://smartratecalcs.com/',
        },
      },
    ],
  };

  return (
    <html lang="en" className="light scroll-smooth">
      <head>
        <meta name="google-site-verification" content="FzC73kAndsqrqsza438VtUdn49KmQZfgQm61v9-ukls" />
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
      <body className="bg-[#f8fafc] text-slate-800 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
