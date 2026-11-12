// Centralized affiliate & internal tool destination resolver.
// Replace internal paths below with your approved affiliate URLs (Wise, Payoneer, Square, Shopify, etc.)
// as soon as partner links are issued, and all 80+ calculator widgets will update automatically.

export interface PartnerDestination {
  href: string;
  isExternal: boolean;
  label?: string;
}

const PARTNER_ROUTES: Array<{ match: RegExp; dest: PartnerDestination }> = [
  {
    match: /wise/i,
    dest: {
      href: '/calculators/wise-vs-payoneer-fee-calculator',
      isExternal: false,
      label: 'Wise Mid-Market Engine',
    },
  },
  {
    match: /payoneer|jazzcash|easypaisa|bkash/i,
    dest: {
      href: '/payoneer-fee-calculator',
      isExternal: false,
      label: 'Payoneer Payout Calculator',
    },
  },
  {
    match: /square/i,
    dest: {
      href: '/square-fee-calculator',
      isExternal: false,
      label: 'Square Fee Calculator (US)',
    },
  },
  {
    match: /stripe/i,
    dest: {
      href: '/stripe-fee-calculator',
      isExternal: false,
      label: 'Stripe Fee Calculator',
    },
  },
  {
    match: /shopify/i,
    dest: {
      href: '/calculators/shopify-break-even-roas-calculator',
      isExternal: false,
      label: 'Shopify Break-Even ROAS Engine',
    },
  },
  {
    match: /1099|tax|llc|s-corp|california|texas|irs/i,
    dest: {
      href: '/1099-tax-calculator',
      isExternal: false,
      label: '1099 Safe Harbor Tax Calculator',
    },
  },
  {
    match: /remitly/i,
    dest: {
      href: '/remitly-pakistan-rate',
      isExternal: false,
      label: 'Live Remitly Rate Tracker',
    },
  },
  {
    match: /upwork/i,
    dest: {
      href: '/upwork-fee-calculator',
      isExternal: false,
      label: 'Upwork Fee & Bid Engine',
    },
  },
  {
    match: /fiverr/i,
    dest: {
      href: '/fiverr-fee-calculator',
      isExternal: false,
      label: 'Fiverr Seller Net Calculator',
    },
  },
  {
    match: /paypal|venmo/i,
    dest: {
      href: '/paypal-fee-calculator',
      isExternal: false,
      label: 'PayPal US Fee Calculator',
    },
  },
];

export function resolvePartnerDestination(
  platform: string,
  slug: string
): PartnerDestination {
  const haystack = `${platform} ${slug}`;
  for (const rule of PARTNER_ROUTES) {
    if (rule.match.test(haystack) && !rule.dest.href.endsWith(`/${slug}`)) {
      return rule.dest;
    }
  }
  return {
    href: '/1099-tax-calculator',
    isExternal: false,
    label: 'Explore US Tax & Payout Tools',
  };
}
