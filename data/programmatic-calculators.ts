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
  },
  {
    slug: 'wise-to-inr-fee-calculator',
    title: 'Wise to INR (India) Fee & Live Interbank Payout Calculator',
    category: 'payout',
    sourceCurrency: 'USD',
    targetCurrency: 'INR',
    defaultAmount: 1000,
    description: 'Calculate exact Indian Rupee (INR) payout into HDFC, ICICI, SBI or any Indian bank account via Wise zero-markup mid-market rates.',
    metaTitle: 'Wise to INR Fee & Transfer Calculator (2026 Live Interbank Rate)',
    metaDesc: 'Compare exact Wise to INR conversion rates and transfer fees. Discover net rupees credited to your Indian bank account with zero hidden markup.',
    primaryKeyword: 'wise to inr fee calculator',
    quickAnswer: 'Wise transfers USD to INR at the true mid-market interbank exchange rate with a transparent service fee of approximately 0.43% to 0.52%. On a $1,000 USD transfer to an Indian bank account (via NEFT/RTGS), the fee is roughly $4.50 to $5.20, and the recipient receives approximately ₹86,300 to ₹86,450 INR with zero hidden bank FX spread.',
    formula: 'Net INR = (USD Amount - Wise Fee) * Interbank INR Rate',
    wikidataEntities: [
      'https://www.wikidata.org/wiki/Q16958465', // Wise
      'https://www.wikidata.org/wiki/Q80524',    // Indian rupee
    ],
    faqs: [
      {
        q: 'Does Wise charge any hidden currency conversion markup on INR transfers?',
        a: 'No. Unlike traditional Indian banks and PayPal which add a 2% to 4% spread, Wise uses the exact Reuters mid-market interbank exchange rate.'
      },
      {
        q: 'Do I get a FIRC (Foreign Inward Remittance Certificate) with Wise in India?',
        a: 'Yes, Wise automatically provides an electronic FIRC (e-FIRC) for inward remittances to Indian business and freelancer accounts for GST and IT returns.'
      }
    ]
  },
  {
    slug: 'payoneer-to-inr-withdrawal-calculator',
    title: 'Payoneer to Indian Bank (INR) Withdrawal & FX Fee Calculator',
    category: 'payout',
    sourceCurrency: 'USD',
    targetCurrency: 'INR',
    defaultAmount: 1000,
    description: 'Calculate net INR received from Payoneer after their standard 2.0% currency conversion markup and local auto-withdrawal.',
    metaTitle: 'Payoneer to INR Fee Calculator (2026 Bank Auto-Withdrawal)',
    metaDesc: 'Calculate exact net INR deposited into your Indian bank from Payoneer. Includes 2% currency exchange margin and daily forex clearing benchmarks.',
    primaryKeyword: 'payoneer to inr fee calculator',
    quickAnswer: 'Payoneer charges up to a 2.0% currency conversion fee below the official wholesale interbank rate when auto-withdrawing USD earnings into an Indian bank account. On a $1,000 USD transfer, the currency spread costs roughly $20.00 (₹1,735 INR), resulting in a net credit of approximately ₹84,950 INR into your HDFC, ICICI, or Axis bank account.',
    formula: 'Net INR = USD Amount * (Interbank INR Rate * 0.98)',
    wikidataEntities: [
      'https://www.wikidata.org/wiki/Q7140685', // Payoneer
      'https://www.wikidata.org/wiki/Q80524',   // Indian rupee
    ],
    faqs: [
      {
        q: 'Why does Payoneer automatically withdraw USD to INR?',
        a: 'Under Reserve Bank of India (RBI) guidelines, Indian freelancers and businesses cannot hold foreign currency balances in Payoneer accounts; funds must be automatically transferred to an Indian bank within 24 to 48 hours.'
      }
    ]
  },
  {
    slug: 'wise-to-bdt-fee-calculator',
    title: 'Wise to BDT (Bangladesh) Fee & bKash Payout Calculator',
    category: 'payout',
    sourceCurrency: 'USD',
    targetCurrency: 'BDT',
    defaultAmount: 500,
    description: 'Calculate exact Bangladeshi Taka (BDT) payout into bKash, Nagad, or Dutch-Bangla Bank via Wise live mid-market rates and government incentive.',
    metaTitle: 'Wise to BDT Fee Calculator (2026 bKash & Bank Payout)',
    metaDesc: 'Accurately calculate net BDT received from USD via Wise. Compare bKash wallet settlement and commercial bank transfers with zero hidden spread.',
    primaryKeyword: 'wise to bdt fee calculator',
    quickAnswer: 'Wise converts USD to BDT at the official mid-market rate with a transparent fee of around 0.55% to 0.70%. On a $500 USD payout to a bKash mobile wallet or Bangladeshi bank account, the fee is approximately $3.20, and the recipient receives approximately ৳60,300 to ৳60,600 BDT plus any applicable 2.5% Bangladesh government remittance incentive.',
    formula: 'Net BDT = (USD Amount - Wise Fee) * Interbank BDT Rate',
    wikidataEntities: [
      'https://www.wikidata.org/wiki/Q16958465', // Wise
      'https://www.wikidata.org/wiki/Q125999',   // Bangladeshi taka
    ],
    faqs: [
      {
        q: 'Can I send money directly from Wise to bKash?',
        a: 'Yes, Wise supports instant direct wallet deposits into registered bKash and Nagad accounts across Bangladesh in real-time.'
      }
    ]
  },
  {
    slug: 'payoneer-to-bkash-fee-calculator',
    title: 'Payoneer to bKash Fee & Real Exchange Rate Calculator',
    category: 'payout',
    sourceCurrency: 'USD',
    targetCurrency: 'BDT',
    defaultAmount: 300,
    description: 'Calculate exact BDT credited to your bKash wallet from Payoneer after conversion markups and platform processing deductions.',
    metaTitle: 'Payoneer to bKash Fee Calculator (2026 Live Rate Bangladesh)',
    metaDesc: 'Instant Payoneer to bKash conversion calculation. See actual take-home Taka after 2% spread for Bangladeshi IT freelancers and remote contractors.',
    primaryKeyword: 'payoneer to bkash fee calculator',
    quickAnswer: 'When transferring from Payoneer directly into bKash, Payoneer applies a 2.0% currency conversion margin against the wholesale market rate. On a $300 USD transfer, the spread deduction is $6.00, yielding approximately ৳35,600 BDT directly credited to your bKash wallet balance within seconds.',
    formula: 'Net BDT = USD Amount * (Interbank BDT Rate * 0.98)',
    wikidataEntities: [
      'https://www.wikidata.org/wiki/Q7140685',  // Payoneer
      'https://www.wikidata.org/wiki/Q16958465', // Wise
      'https://www.wikidata.org/wiki/Q125999',   // Bangladeshi taka
    ],
    faqs: [
      {
        q: 'What is the minimum withdrawal from Payoneer to bKash?',
        a: 'The minimum withdrawal limit from a Payoneer USD balance to bKash is $8 USD, which makes it ideal for frequent micro-earnings.'
      }
    ]
  },
  {
    slug: 'wise-to-php-fee-calculator',
    title: 'Wise to PHP (Philippines) Fee & GCash Payout Calculator',
    category: 'payout',
    sourceCurrency: 'USD',
    targetCurrency: 'PHP',
    defaultAmount: 1000,
    description: 'Calculate exact Philippine Peso (PHP) payout into GCash, Maya, BDO, or BPI via Wise zero-markup mid-market exchange rates.',
    metaTitle: 'Wise to PHP Fee Calculator (2026 GCash & Maya Payout)',
    metaDesc: 'Calculate net Philippine Peso (PHP) received from USD using Wise mid-market rate. Compare GCash instant wallet settlement vs traditional bank wire.',
    primaryKeyword: 'wise to php fee calculator',
    quickAnswer: 'Wise converts USD to Philippine Peso (PHP) using the genuine mid-market exchange rate with a transparent fee of roughly 0.45% to 0.55%. On a $1,000 USD transfer, Wise charges around $4.90, depositing approximately ₱57,800 to ₱58,100 PHP directly into GCash, Maya, or any major Philippine bank account.',
    formula: 'Net PHP = (USD Amount - Wise Fee) * Interbank PHP Rate',
    wikidataEntities: [
      'https://www.wikidata.org/wiki/Q16958465', // Wise
      'https://www.wikidata.org/wiki/Q171503',   // Philippine peso
    ],
    faqs: [
      {
        q: 'Is Wise transfer to GCash instant?',
        a: 'Yes, transfers from Wise balances or debit cards to verified GCash mobile wallets in the Philippines usually credit within 1 to 5 minutes.'
      }
    ]
  },
  {
    slug: 'paypal-to-gcash-fee-calculator',
    title: 'PayPal to GCash Cash-In & Conversion Fee Calculator (2026)',
    category: 'payout',
    sourceCurrency: 'USD',
    targetCurrency: 'PHP',
    defaultAmount: 500,
    description: 'Calculate how much Philippine Peso you lose to PayPal 3% to 4% padded exchange markups when cashing in to GCash.',
    metaTitle: 'PayPal to GCash Fee Calculator (Hidden Conversion Spread)',
    metaDesc: 'See exact Peso deductions when withdrawing USD from PayPal to GCash. Calculate the hidden 3.5% exchange spread before cashing in your salary.',
    primaryKeyword: 'paypal to gcash fee calculator',
    quickAnswer: 'While GCash does not charge a direct cash-in fee for linking PayPal, PayPal applies an internal foreign exchange markup of 3.5% to 4.0% below the mid-market rate when converting USD to PHP. On a $500 USD cash-in, you lose approximately $18 to $20 USD (around ₱1,050 to ₱1,150 PHP) solely in hidden exchange rate padding.',
    formula: 'Net PHP = USD Amount * (Interbank PHP Rate * 0.962)',
    wikidataEntities: [
      'https://www.wikidata.org/wiki/Q284532', // PayPal
      'https://www.wikidata.org/wiki/Q171503', // Philippine peso
    ],
    faqs: [
      {
        q: 'How to avoid PayPal high conversion fee to GCash?',
        a: 'Convert your PayPal USD balance to a Wise USD virtual debit card or withdraw via Maya Visa to capture tighter wholesale interbank rates.'
      }
    ]
  },
  {
    slug: 'wise-to-ngn-fee-calculator',
    title: 'Wise to NGN (Nigeria) & Black Market vs Official Rate Calculator',
    category: 'payout',
    sourceCurrency: 'USD',
    targetCurrency: 'NGN',
    defaultAmount: 500,
    description: 'Calculate Nigerian Naira (NGN) payout comparing Wise, Geegpay, and Grey with real-time central bank and parallel market clearing.',
    metaTitle: 'Wise to NGN Fee Calculator (2026 Nigerian Naira Payout)',
    metaDesc: 'Calculate exact NGN received from USD client payouts. Compare real clearing rates across Nigerian commercial banks and domiciliary accounts.',
    primaryKeyword: 'wise to ngn fee calculator',
    quickAnswer: 'Wise processes payouts to Nigerian Naira (NGN) bank accounts using official NAFEM interbank exchange rates with a low transparent fee of 0.6% to 0.8%. On a $500 USD payout, the fee is roughly $3.50, and the recipient receives approximately ₦780,000 to ₦810,000 NGN depending on current central bank rate adjustments.',
    formula: 'Net NGN = (USD Amount - Wise Fee) * NAFEM Interbank Rate',
    wikidataEntities: [
      'https://www.wikidata.org/wiki/Q16958465', // Wise
      'https://www.wikidata.org/wiki/Q201880',   // Nigerian naira
    ],
    faqs: [
      {
        q: 'Can Wise send USD to a Nigerian Domiciliary account?',
        a: 'Yes, Wise allows sending USD directly to USD domiciliary accounts in Nigeria via SWIFT network clearing.'
      }
    ]
  },
  {
    slug: 'paypal-goods-and-services-fee-calculator',
    title: 'PayPal Goods & Services vs Friends & Family Fee Calculator',
    category: 'ecommerce',
    defaultAmount: 250,
    description: 'Calculate exact seller deductions on PayPal Goods & Services invoices and discover how much extra to invoice to cover PayPal cuts.',
    metaTitle: 'PayPal Goods and Services Fee Calculator (2026 Deductions)',
    metaDesc: 'Instant PayPal fee formula for buyers and sellers. Calculate standard 2.99% + $0.49 domestic and 4.49% international seller charges accurately.',
    primaryKeyword: 'paypal goods and services fee calculator',
    quickAnswer: 'For standard US domestic transactions, PayPal Goods & Services charges 2.99% + $0.49 per transaction. For international transactions, the fee jumps to 4.49% + fixed currency fee (approx $0.49). On a $100 international payment, PayPal deducts $4.98, leaving the seller with $95.02. To receive an exact $100 net, you must invoice $105.17.',
    formula: 'Seller Receives = (Invoice Amount * (1 - 0.0449)) - $0.49 | Gross to Ask = (Target Net + $0.49) / (1 - 0.0449)',
    wikidataEntities: [
      'https://www.wikidata.org/wiki/Q284532', // PayPal
    ],
    faqs: [
      {
        q: 'Who pays the PayPal Goods and Services fee?',
        a: 'The seller (recipient of the payment) always pays the Goods and Services fee automatically deducted from the incoming amount.'
      }
    ]
  },
  {
    slug: 'etsy-seller-fee-and-profit-calculator',
    title: 'Etsy Seller Fee, Listing & Profit Margin Calculator (2026)',
    category: 'ecommerce',
    defaultAmount: 45,
    description: 'Calculate net profit after Etsy $0.20 listing fee, 6.5% transaction cut, 3% + $0.25 payment processing, and optional 15% offsite ads.',
    metaTitle: 'Etsy Seller Fee & Net Profit Calculator (2026 Free Tool)',
    metaDesc: 'Discover your exact Etsy take-home profit per order after all hidden Etsy deductions: listing, 6.5% transaction, payment processing, and offsite ads.',
    primaryKeyword: 'etsy fee calculator',
    quickAnswer: 'On every Etsy sale, you pay a $0.20 listing fee, a 6.5% transaction fee on item price + shipping, plus payment processing of 3.0% + $0.25 (US). Total Etsy fees consume approximately 10% to 13% of gross order value (or up to 25% if an Offsite Ad generated the sale). On a $40 order with $5 shipping, Etsy takes roughly $5.08.',
    formula: 'Etsy Total Fee = $0.20 + (Gross Total * 0.065) + (Gross Total * 0.030) + $0.25',
    wikidataEntities: [
      'https://www.wikidata.org/wiki/Q1372346', // Etsy
    ],
    faqs: [
      {
        q: 'What is the total percentage Etsy takes from each sale?',
        a: 'Between the 6.5% transaction fee and the 3% + $0.25 payment processing fee, Etsy takes roughly 9.5% + $0.45 per standard domestic sale.'
      }
    ]
  }
];
