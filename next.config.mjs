/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
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
