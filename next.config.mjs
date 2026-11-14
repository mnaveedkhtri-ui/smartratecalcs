/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      {
        source: '/calculators/tiktok-shop-fee-calculator',
        destination: '/tiktok-shop-fee-calculator',
      },
      {
        source: '/calculators/depop-fee-calculator',
        destination: '/depop-fee-calculator',
      },
      {
        source: '/calculators/square-fee-calculator',
        destination: '/square-fee-calculator',
      },
      {
        source: '/calculators/1099-tax-calculator',
        destination: '/1099-tax-calculator',
      },
      {
        source: '/calculators/stripe-fee-calculator',
        destination: '/stripe-fee-calculator',
      },
      {
        source: '/calculators/paypal-fee-calculator',
        destination: '/paypal-fee-calculator',
      },
      {
        source: '/calculators/upwork-fee-calculator',
        destination: '/upwork-fee-calculator',
      },
      {
        source: '/calculators/fiverr-fee-calculator',
        destination: '/fiverr-fee-calculator',
      },
      {
        source: '/calculators/payoneer-fee-calculator',
        destination: '/payoneer-fee-calculator',
      },
      {
        source: '/calculators/freelance-hourly-rate-calculator',
        destination: '/freelance-hourly-rate-calculator',
      },
      {
        source: '/cash-app-fee-calculator',
        destination: '/calculators/cash-app-fee-calculator',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/calculators/sadabiz-vs-payoneer-calculator',
        destination: '/calculators/sadabiz-vs-payoneer-fee-calculator',
        permanent: true,
      },
      {
        source: '/calculators/wise-to-meezan-bank-transfer-fee-calculator',
        destination: '/calculators/wise-to-meezan-bank-fee-calculator',
        permanent: true,
      },
      {
        source: '/calculators/wise-to-inr-transfer-fee-calculator',
        destination: '/calculators/wise-to-inr-fee-calculator',
        permanent: true,
      },
      {
        source: '/calculators/wise-to-bdt-transfer-fee-calculator',
        destination: '/calculators/wise-to-bdt-fee-calculator',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
