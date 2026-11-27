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
      // 1. Consolidate /calculators/<root-slug> -> /<root-slug> (Eliminates 10 duplicate 200 OK rewrites)
      { source: '/calculators/depop-fee-calculator', destination: '/depop-fee-calculator', permanent: true },
      { source: '/calculators/square-fee-calculator', destination: '/square-fee-calculator', permanent: true },
      { source: '/calculators/1099-tax-calculator', destination: '/1099-tax-calculator', permanent: true },
      { source: '/calculators/stripe-fee-calculator', destination: '/stripe-fee-calculator', permanent: true },
      { source: '/calculators/paypal-fee-calculator', destination: '/paypal-fee-calculator', permanent: true },
      { source: '/calculators/upwork-fee-calculator', destination: '/upwork-fee-calculator', permanent: true },
      { source: '/calculators/fiverr-fee-calculator', destination: '/fiverr-fee-calculator', permanent: true },
      { source: '/calculators/payoneer-fee-calculator', destination: '/payoneer-fee-calculator', permanent: true },
      { source: '/calculators/freelance-hourly-rate-calculator', destination: '/freelance-hourly-rate-calculator', permanent: true },
      { source: '/calculators/remitly-pakistan-rate', destination: '/remitly-pakistan-rate', permanent: true },

      // 2. Consolidate root aliases & programmatic clones -> canonical flagship /calculators/<slug>
      { source: '/cash-app-fee-calculator', destination: '/calculators/cash-app-fee-calculator', permanent: true },
      { source: '/etsy-fee-calculator', destination: '/calculators/etsy-fee-calculator', permanent: true },
      { source: '/whatnot-fee-calculator', destination: '/calculators/whatnot-fee-calculator', permanent: true },
      { source: '/ebay-fee-calculator', destination: '/calculators/ebay-fee-calculator', permanent: true },
      { source: '/amazon-fee-calculator', destination: '/calculators/amazon-fba-fee-calculator', permanent: true },
      { source: '/amazon-fba-fee-calculator', destination: '/calculators/amazon-fba-fee-calculator', permanent: true },
      { source: '/poshmark-fee-calculator', destination: '/calculators/poshmark-fee-calculator', permanent: true },
      { source: '/poshmark-calculator', destination: '/calculators/poshmark-fee-calculator', permanent: true },
      { source: '/reverb-fee-calculator', destination: '/calculators/reverb-fee-calculator', permanent: true },
      { source: '/mercari-fee-calculator', destination: '/calculators/mercari-fee-calculator', permanent: true },
      { source: '/venmo-business-fee-calculator', destination: '/calculators/venmo-business-fee-calculator', permanent: true },
      { source: '/upwork-to-jazzcash-calculator', destination: '/calculators/upwork-to-jazzcash-calculator', permanent: true },
      { source: '/calculators/upwork-to-jazzcash-payout-calculator', destination: '/calculators/upwork-to-jazzcash-calculator', permanent: true },
      { source: '/calculators/ebay-seller-fee-and-profit-calculator', destination: '/calculators/ebay-fee-calculator', permanent: true },
      { source: '/calculators/amazon-fba-profit-margin-calculator', destination: '/calculators/amazon-fba-fee-calculator', permanent: true },
      { source: '/calculators/etsy-seller-fee-and-profit-calculator', destination: '/calculators/etsy-fee-calculator', permanent: true },
      { source: '/calculators/poshmark-seller-fee-calculator', destination: '/calculators/poshmark-fee-calculator', permanent: true },
      { source: '/calculators/cash-app-business-fee-calculator', destination: '/calculators/cash-app-fee-calculator', permanent: true },
      { source: '/calculators/venmo-business-fee-calculator-legacy', destination: '/calculators/venmo-business-fee-calculator', permanent: true },

      // 3. Merge GSC-proven cannibalizing programmatic clones into their stronger winners
      { source: '/calculators/fiverr-commission-fee-calculator', destination: '/fiverr-fee-calculator', permanent: true },
      { source: '/calculators/paypal-goods-and-services-fee-calculator', destination: '/paypal-fee-calculator', permanent: true },
      { source: '/calculators/remitly-to-pakistan-fee-calculator', destination: '/remitly-pakistan-rate', permanent: true },
      { source: '/calculators/upwork-service-fee-payout-calculator', destination: '/upwork-fee-calculator', permanent: true },
      { source: '/calculators/wise-to-bdo-bank-php-calculator', destination: '/calculators/wise-to-bdo-philippines-calculator', permanent: true },
      { source: '/calculators/payoneer-to-gcash-philippines-calculator', destination: '/calculators/payoneer-to-gcash-fee-calculator', permanent: true },

      // 4. Existing permanent redirects
      { source: '/tiktok-shop-fee-calculator', destination: '/calculators/tiktok-shop-fee-calculator', permanent: true },
      { source: '/calculators/tiktok-shop-seller-fee-calculator', destination: '/calculators/tiktok-shop-fee-calculator', permanent: true },
      { source: '/tiktok-shop-seller-fee-calculator', destination: '/calculators/tiktok-shop-fee-calculator', permanent: true },
      { source: '/calculators/sadabiz-vs-payoneer-calculator', destination: '/calculators/sadabiz-vs-payoneer-fee-calculator', permanent: true },
      { source: '/calculators/wise-to-meezan-bank-transfer-fee-calculator', destination: '/calculators/wise-to-meezan-bank-fee-calculator', permanent: true },
      { source: '/calculators/wise-to-inr-transfer-fee-calculator', destination: '/calculators/wise-to-inr-fee-calculator', permanent: true },
      { source: '/calculators/wise-to-bdt-transfer-fee-calculator', destination: '/calculators/wise-to-bdt-fee-calculator', permanent: true },
    ];
  },
};

export default nextConfig;
