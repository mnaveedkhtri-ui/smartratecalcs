export interface ProgrammaticCalculator {
  slug: string;
  title: string;
  category: 'payout' | 'ecommerce' | 'freelance';
  sourceCurrency?: string;
  targetCurrency?: string;
  defaultAmount?: number;
  description: string;
  metaTitle: string;
  metaDesc: string;
  primaryKeyword: string;
  quickAnswer: string;
  formula: string;
  wikidataEntities?: string[];
  faqs: { q: string; a: string }[];
}

export const PROGRAMMATIC_CALCULATORS: ProgrammaticCalculator[] = [
  {
    slug: 'wise-to-pkr-fee-calculator',
    title: 'Wise to PKR Exchange Rate & Real Fee Calculator (2026)',
    category: 'payout',
    sourceCurrency: 'USD',
    targetCurrency: 'PKR',
    defaultAmount: 1000,
    description: 'Calculate exact net PKR received in your Pakistani bank account or Nayapay/Sadapay via Wise with zero hidden spreads.',
    metaTitle: 'Wise to PKR Fee & Net Payout Calculator (2026 Live Rate)',
    metaDesc: 'Compare exact Wise to PKR conversion rates, transfer fees, and net amount received in Pakistan. Live interbank benchmark without hidden bank spread.',
    primaryKeyword: 'wise to pkr fee calculator',
    quickAnswer: 'Wise charges an upfront fee of approximately 0.45% to 0.55% with zero currency conversion markup (using the mid-market interbank exchange rate). On a $1,000 USD transfer to a Pakistani bank account or Nayapay/Sadapay, the fee is approximately $4.50 to $5.50, and the recipient receives approximately Rs. 277,100 PKR.',
    formula: 'Net PKR = (USD Amount - Wise Fee) * Interbank Mid-Market Rate',
    wikidataEntities: [
      'https://www.wikidata.org/wiki/Q16958465', // Wise
      'https://www.wikidata.org/wiki/Q188289',   // Pakistani rupee
    ],
    faqs: [
      {
        q: 'What is the fee for sending money via Wise to Pakistan?',
        a: 'Wise applies mid-market interbank exchange rates and charges a transparent service fee between 0.45% and 0.65% depending on the payment method.'
      },
      {
        q: 'Does Wise transfer directly to Nayapay and Sadapay?',
        a: 'Yes, Wise transfers directly to Pakistani IBANs including Nayapay, Sadapay, Meezan, and HBL with Raast instant settlement.'
      }
    ]
  },
  {
    slug: 'payoneer-to-jazzcash-fee-calculator',
    title: 'Payoneer to JazzCash & Bank Withdrawal Fee Calculator',
    category: 'payout',
    sourceCurrency: 'USD',
    targetCurrency: 'PKR',
    defaultAmount: 500,
    description: 'Calculate exact JazzCash and Pakistani bank account payout after Payoneer 2% currency conversion and withdrawal fees.',
    metaTitle: 'Payoneer to JazzCash Fee & Payout Calculator (2026)',
    metaDesc: 'Accurately calculate net PKR received from Payoneer to JazzCash or local bank accounts after 2% conversion spread and withdrawal charges.',
    primaryKeyword: 'payoneer to jazzcash fee calculator',
    quickAnswer: 'Payoneer applies a 2.0% currency conversion markup below wholesale interbank exchange rates plus a standard $1.50 fixed withdrawal fee when withdrawing USD to JazzCash or Pakistani bank accounts. On a $500 withdrawal, the conversion spread costs approximately $10.00 and the recipient receives approximately Rs. 136,400 PKR.',
    formula: 'Net PKR = (USD Amount - $1.50) * (Interbank Rate * 0.98)',
    wikidataEntities: [
      'https://www.wikidata.org/wiki/Q7140685',  // Payoneer
      'https://www.wikidata.org/wiki/Q6168535',  // JazzCash
      'https://www.wikidata.org/wiki/Q188289',   // Pakistani rupee
    ],
    faqs: [
      {
        q: 'How much does Payoneer charge to withdraw to JazzCash?',
        a: 'Payoneer charges up to a 2% currency conversion spread above wholesale interbank rates when converting USD to PKR, plus a $1.50 flat fee.'
      },
      {
        q: 'Is JazzCash withdrawal instant from Payoneer?',
        a: 'Yes, once linked, Payoneer to JazzCash transfers generally settle within 10 to 60 seconds into your mobile wallet balance.'
      }
    ]
  },
  {
    slug: 'shopify-break-even-roas-calculator',
    title: 'Shopify Break-Even ROAS & Profit Margin Calculator',
    category: 'ecommerce',
    defaultAmount: 65,
    description: 'Calculate the minimum Return on Ad Spend (ROAS) required for Meta, TikTok, and Google Ads before losing money on your Shopify store.',
    metaTitle: 'Shopify Break-Even ROAS Calculator (Free E-Commerce Tool)',
    metaDesc: 'Instant break-even ROAS formula for dropshipping and DTC brands. Input product cost, shipping, and transaction fees to stop unprofitable ads.',
    primaryKeyword: 'shopify break even roas calculator',
    quickAnswer: 'Break-Even ROAS (Return on Ad Spend) is the exact multiplier at which your advertising revenue equals your total expenses (product cost, shipping, and payment gateway fees), yielding exactly $0 net profit. It is calculated as Retail Price divided by (Retail Price minus Total Non-Ad Cost). For example, a $60 product costing $20 to source and ship has a Break-Even ROAS of 1.50x.',
    formula: 'Break-Even ROAS = Retail Price / (Retail Price - COGS - Shipping - Gateway Fee)',
    wikidataEntities: [
      'https://www.wikidata.org/wiki/Q7501140', // Shopify
      'https://www.wikidata.org/wiki/Q278358',  // ROAS
    ],
    faqs: [
      {
        q: 'How do you calculate break-even ROAS on Shopify?',
        a: 'Break-Even ROAS is calculated by dividing your Selling Price by your Gross Profit Per Order before ad spend. If product sells for $50 and costs $25 to source, Break-Even ROAS is 50 / 25 = 2.0x.'
      },
      {
        q: 'What is a good target ROAS for e-commerce?',
        a: 'While break-even ROAS ensures you do not lose cash, a healthy profitable target ROAS is typically 2.5x to 4.0x depending on overhead and team payroll.'
      }
    ]
  },
  {
    slug: 'upwork-service-fee-payout-calculator',
    title: 'Upwork 10% Freelancer Fee & Local Bank Payout Calculator',
    category: 'payout',
    sourceCurrency: 'USD',
    targetCurrency: 'PKR',
    defaultAmount: 1500,
    description: 'Calculate exact net earnings after Upwork flat 10% freelancer service fee and local bank withdrawal or direct wire fees.',
    metaTitle: 'Upwork Fee & Payout Calculator (2026 Net Take-Home)',
    metaDesc: 'Calculate your exact net Upwork earnings after the 10% contract fee and compare direct wire vs Payoneer local withdrawal in Pakistan and India.',
    primaryKeyword: 'upwork fee calculator',
    quickAnswer: 'Upwork deducts a flat 10% freelancer service fee on all contracts. When withdrawing earnings to a local Pakistani bank account, Upwork applies a $0.99 direct local bank transfer fee plus an internal currency exchange margin of approximately 2.5% to 3.0% below the mid-market interbank rate.',
    formula: 'Net Payout = (Gross Upwork Invoice * 0.90 - $0.99) * (Interbank Rate * 0.975)',
    wikidataEntities: [
      'https://www.wikidata.org/wiki/Q20078713', // Upwork
    ],
    faqs: [
      {
        q: 'Does Upwork charge 10% or 20% in 2026?',
        a: 'Upwork standardized its freelancer service fee to a flat 10% across all client contracts, replacing the legacy 20%/10%/5% sliding scale.'
      }
    ]
  },
  {
    slug: 'fiverr-commission-fee-calculator',
    title: 'Fiverr 20% Seller Fee & Currency Withdrawal Calculator',
    category: 'payout',
    sourceCurrency: 'USD',
    targetCurrency: 'PKR',
    defaultAmount: 500,
    description: 'Calculate how much money you actually keep after Fiverr 20% platform commission and currency conversion spreads.',
    metaTitle: 'Fiverr Fee & Net Seller Payout Calculator (2026)',
    metaDesc: 'Input your Fiverr gig order price to calculate the 20% commission cut and your exact net payout into JazzCash, Nayapay, or commercial bank account.',
    primaryKeyword: 'fiverr fee calculator',
    quickAnswer: 'Fiverr takes a flat 20% commission from the seller on every gig order and tip. On a $100 order, the seller receives $80. When withdrawing that $80 to Payoneer or local bank, an additional withdrawal and conversion fee applies, resulting in approximately $77 to $78 net take-home value.',
    formula: 'Net Invoiced = Fiverr Gig Price * 0.80',
    wikidataEntities: [
      'https://www.wikidata.org/wiki/Q5456382', // Fiverr
    ],
    faqs: [
      {
        q: 'Does Fiverr take 20% of tips as well?',
        a: 'Yes, Fiverr deducts the same standard 20% service fee from all client tips and order extras.'
      }
    ]
  },
  {
    slug: 'freelance-hourly-rate-calculator-pakistan',
    title: 'Freelance Hourly & Monthly Billing Rate Calculator',
    category: 'freelance',
    defaultAmount: 2500,
    description: 'Calculate the exact hourly quote and project day rate needed to hit your target monthly net income after software expenses and taxes.',
    metaTitle: 'Freelance Hourly Rate Calculator (Sustainable Rate Architecture)',
    metaDesc: 'Determine your minimum hourly billing rate and day rate based on billable hours, non-billable time, and annual business overhead.',
    primaryKeyword: 'freelance hourly rate calculator',
    quickAnswer: 'To calculate your sustainable freelance hourly rate, add your target monthly take-home income, business overhead, and a 15% tax/sick leave buffer. Divide this gross required monthly revenue by your actual billable client hours (typically 20 to 25 hours per week, since 15 hours are lost to pitching, emails, and administration).',
    formula: 'Hourly Rate = ((Target Net + Overhead) / (1 - Tax Rate)) / (Billable Hours * 4.2)',
    faqs: [
      {
        q: 'How many hours a week can a freelancer realistically bill?',
        a: 'Most full-time independent software engineers and designers realistically bill 20 to 28 hours per week. The remaining 12 to 20 hours are spent on client communication, code reviews, invoicing, and professional development.'
      }
    ]
  },
  {
    slug: 'stripe-vs-paypal-international-fee-calculator',
    title: 'Stripe vs PayPal International Transaction Fee Calculator',
    category: 'ecommerce',
    defaultAmount: 1000,
    description: 'Compare credit card processing fees, cross-border surcharges, and payout rates between Stripe and PayPal for global merchants.',
    metaTitle: 'Stripe vs PayPal Fee Calculator (International Comparison 2026)',
    metaDesc: 'Compare exact merchant processing fees between Stripe and PayPal for international cross-border sales and recurring subscription payments.',
    primaryKeyword: 'stripe vs paypal fee calculator',
    quickAnswer: 'Stripe standard pricing is 2.9% + $0.30 per transaction plus a 1.0% cross-border surcharge for international cards. PayPal charges 3.49% + $0.49 for domestic and up to 4.49% plus fixed fees for cross-border transactions, making Stripe approximately 1.0% to 1.5% cheaper per international order.',
    formula: 'Stripe Fee = (Amount * 0.039) + $0.30 | PayPal Fee = (Amount * 0.0449) + $0.49',
    wikidataEntities: [
      'https://www.wikidata.org/wiki/Q284532', // PayPal
      'https://www.wikidata.org/wiki/Q2583592', // Stripe
    ],
    faqs: [
      {
        q: 'Which is cheaper for international e-commerce: Stripe or PayPal?',
        a: 'Stripe is generally 1% to 2% cheaper on international credit card transactions and offers transparent exchange settlement compared to PayPal.'
      }
    ]
  }
];
