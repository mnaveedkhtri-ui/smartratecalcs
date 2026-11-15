// Centralized affiliate & partner redirect engine.
// All outbound affiliate links are routed through /go/[partner] for clean SEO,
// noindex tracking protection, and instant 1-click updates across 106+ engines.

export interface PartnerDestination {
  href: string;
  isExternal: boolean;
  label?: string;
}

// Master Affiliate Referral Mapping
// Replace default URLs with your specific personal/business referral codes as issued
export const AFFILIATE_TARGET_URLS: Record<string, string> = {
  wise: process.env.NEXT_PUBLIC_AFFILIATE_WISE || 'https://wise.com/',
  payoneer: process.env.NEXT_PUBLIC_AFFILIATE_PAYONEER || 'https://www.payoneer.com/',
  remitly: process.env.NEXT_PUBLIC_AFFILIATE_REMITLY || 'https://www.remitly.com/',
  shopify: process.env.NEXT_PUBLIC_AFFILIATE_SHOPIFY || 'https://www.shopify.com/',
  deel: process.env.NEXT_PUBLIC_AFFILIATE_DEEL || 'https://www.deel.com/',
  revolut: process.env.NEXT_PUBLIC_AFFILIATE_REVOLUT || 'https://www.revolut.com/',
  square: process.env.NEXT_PUBLIC_AFFILIATE_SQUARE || 'https://squareup.com/',
  stripe: 'https://stripe.com/',
};

export function getAffiliateRedirectUrl(partnerKey: string): string {
  const normalized = partnerKey.toLowerCase().trim();
  return AFFILIATE_TARGET_URLS[normalized] || 'https://www.smartratecalcs.com/';
}

const PARTNER_ROUTES: Array<{ match: RegExp; dest: PartnerDestination }> = [
  {
    match: /wise/i,
    dest: {
      href: '/go/wise',
      isExternal: true,
      label: 'Open Free Wise Multi-Currency Account',
    },
  },
  {
    match: /payoneer|jazzcash|easypaisa|bkash/i,
    dest: {
      href: '/go/payoneer',
      isExternal: true,
      label: 'Open Payoneer Account',
    },
  },
  {
    match: /shopify/i,
    dest: {
      href: '/go/shopify',
      isExternal: true,
      label: 'Start Shopify Free Trial',
    },
  },
  {
    match: /deel/i,
    dest: {
      href: '/go/deel',
      isExternal: true,
      label: 'Onboard via Deel Contractor Platform',
    },
  },
  {
    match: /remitly/i,
    dest: {
      href: '/go/remitly',
      isExternal: true,
      label: 'Transfer via Remitly Guaranteed Rate',
    },
  },
  {
    match: /square/i,
    dest: {
      href: '/square-fee-calculator',
      isExternal: false,
      label: 'Square POS Fee Calculator (US)',
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
    match: /1099|tax|llc|s-corp|california|texas|irs/i,
    dest: {
      href: '/1099-tax-calculator',
      isExternal: false,
      label: '1099 Safe Harbor Tax Calculator',
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
