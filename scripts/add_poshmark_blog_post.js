// scripts/add_poshmark_blog_post.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'blog-posts.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const newPostCode = `  // ==========================================
  // US GOLDMINE 8: POSHMARK FEES & NET PROFIT GUIDE 2026
  // ==========================================
  {
    slug: 'poshmark-fees-2026-complete-seller-guide-shipping-margins',
    title: 'Poshmark Fees in 2026: Complete Seller Schedule, Shipping Discounts & Profit Guide',
    metaTitle: 'Poshmark Fees (2026): Seller Schedule, Shipping & Profit Calculator',
    metaDesc: 'Official 2026 Poshmark fee guide: $2.95 flat vs 20% commission, Offer to Likers shipping discounts, bundle math, 1099-K tax rules, and profit margins.',
    category: 'E-Commerce',
    readTime: '13 min read',
    publishedDate: '2026-11-17',
    updatedDate: '2026-11-17',
    primaryKeyword: 'poshmark fees 2026',
    secondaryKeywords: [
      'how much does poshmark take in fees',
      'poshmark shipping discount offer to likers cost',
      'poshmark fee on under 15 dollar sales',
      'poshmark bundle fee calculation',
      'poshmark vs depop vs ebay seller fees',
      'poshmark break even profit calculator'
    ],
    quickSummary:
      'In 2026, Poshmark operates a straightforward two-tier fee model: a flat $2.95 fee on all orders under $15.00, and a flat 20.0% commission on orders $15.00 and above. Poshmark does not charge separate listing fees, payment processing cuts, or monthly subscriptions. When sending an Offer to Likers (OTL), sellers are required to discount the item by at least 10% and subsidize buyer shipping ($2.02 for the $5.95 promo or $7.97 for free shipping). On bundle sales, Poshmark charges 20% on the combined total, and orders up to 5.0 lbs ship under a single flat USPS Priority Mail label.',
    relatedCalculatorSlug: '/calculators/poshmark-fee-calculator',
    images: [
      'https://www.smartratecalcs.com/blog/poshmark-fees-2026-complete-seller-guide-shipping-margins.png',
      'https://www.smartratecalcs.com/blog/images/poshmark-two-tier-fee-schedule.png',
      'https://www.smartratecalcs.com/blog/images/poshmark-offer-to-likers-profit-flow.png'
    ],
    wikidataEntities: [
      'https://www.wikidata.org/wiki/Q18389389', // Poshmark
      'https://www.wikidata.org/wiki/Q484876', // E-commerce
      'https://www.wikidata.org/wiki/Q110778747' // Online marketplace
    ],
    externalSources: [
      { name: 'Poshmark Support Official Fee Schedule (2026)', url: 'https://support.poshmark.com/s/article/How-much-does-Poshmark-take' },
      { name: 'USPS Priority Mail Commercial Base Schedule', url: 'https://www.usps.com/ship/priority-mail.htm' },
      { name: 'IRS Form 1099-K Guidance for Resellers', url: 'https://www.irs.gov/businesses/understanding-your-form-1099-k' }
    ],
    tableOfContents: [
      { id: 'poshmark-fee-structure-2026', title: '1. The Poshmark 2026 Fee Schedule: $2.95 vs 20% Commission' },
      { id: 'the-1499-pricing-trap', title: '2. The $14.99 Pricing Trap: Why Under-$15 Sales Destroy Net Margins' },
      { id: 'offer-to-likers-shipping-discounts', title: '3. Offer to Likers (OTL): The True Cost of Mandatory Shipping Subsidies' },
      { id: 'closet-bundle-arbitrage', title: '4. Closet Bundle Strategy: How to Turn Low-Cost Inventory into 35%+ Net Margins' },
      { id: 'poshmark-vs-depop-ebay-mercari', title: '5. Poshmark vs Depop vs eBay vs Mercari: 2026 Reseller Take-Rate Audit' },
      { id: 'reverse-pricing-1099k-taxes', title: '6. Reverse Break-Even Mathematical Formula & IRS 1099-K Tax Deductions' }
    ],
    contentHtml: \`
      <!-- Infographic 1: Two-Tier Fee Schedule -->
      <div class="my-8">
        <img
          src="/blog/images/poshmark-two-tier-fee-schedule.png"
          alt="Poshmark 2026 Fee Architecture: $2.95 vs 20 Percent Inflection Point"
          width="800"
          height="480"
          class="w-full rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800"
          loading="lazy"
        />
        <p class="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 font-mono">
          Figure 1: Official 2026 Poshmark fee schedule illustrating the critical $15 threshold inflection point.
        </p>
      </div>

      <!-- Section 1 -->
      <section id="poshmark-fee-structure-2026" class="space-y-4 scroll-mt-24">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          1. The Poshmark 2026 Fee Schedule: $2.95 vs 20% Commission
        </h2>
        <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Unlike competing marketplaces that nickel-and-dime sellers with insertion fees, payment processing cuts, promoted listing surcharges, and international cross-border fees, Poshmark maintains an all-inclusive two-tier commission structure in 2026:
        </p>
        <ul class="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300">
          <li><strong>Sales under $15.00:</strong> Poshmark charges a single flat fee of <strong>$2.95</strong> per transaction.</li>
          <li><strong>Sales of $15.00 and above:</strong> Poshmark charges a flat commission of <strong>20.0%</strong> on the gross sales price.</li>
        </ul>
        <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Crucially, Poshmark absorbs all credit card and digital wallet merchant processing charges (Visa, Mastercard, American Express, PayPal, Apple Pay, and Klarna). There are no secondary 2.9% + $0.30 merchant fees deducted from your balance. What Poshmark quotes as your earnings is what arrives directly in your linked bank account via direct deposit.
        </p>

        <!-- Benchmark Comparison Table -->
        <div class="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <table class="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                <th class="p-3.5">Listing Sold Price</th>
                <th class="p-3.5">Applicable Tier</th>
                <th class="p-3.5">Poshmark Fee</th>
                <th class="p-3.5">Effective Take-Rate</th>
                <th class="p-3.5">Seller Deposit (Gross)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800 font-medium bg-white dark:bg-slate-900">
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                <td class="p-3 font-semibold text-slate-900 dark:text-white">$8.00</td>
                <td class="p-3 text-amber-600 dark:text-amber-400 font-bold">Sub-$15 Flat</td>
                <td class="p-3 text-rose-600 dark:text-rose-400 font-mono font-bold">$2.95</td>
                <td class="p-3 text-rose-600 font-bold font-mono">36.88%</td>
                <td class="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">$5.05</td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                <td class="p-3 font-semibold text-slate-900 dark:text-white">$10.00</td>
                <td class="p-3 text-amber-600 dark:text-amber-400 font-bold">Sub-$15 Flat</td>
                <td class="p-3 text-rose-600 dark:text-rose-400 font-mono font-bold">$2.95</td>
                <td class="p-3 text-rose-600 font-bold font-mono">29.50%</td>
                <td class="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">$7.05</td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                <td class="p-3 font-semibold text-slate-900 dark:text-white">$14.00</td>
                <td class="p-3 text-amber-600 dark:text-amber-400 font-bold">Sub-$15 Flat</td>
                <td class="p-3 text-rose-600 dark:text-rose-400 font-mono font-bold">$2.95</td>
                <td class="p-3 text-rose-600 font-bold font-mono">21.07%</td>
                <td class="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">$11.05</td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors bg-rose-50/40 dark:bg-rose-950/20">
                <td class="p-3 font-semibold text-slate-900 dark:text-white">$15.00</td>
                <td class="p-3 text-rose-600 dark:text-rose-400 font-bold">20% Threshold</td>
                <td class="p-3 text-rose-600 dark:text-rose-400 font-mono font-bold">$3.00</td>
                <td class="p-3 text-emerald-600 font-bold font-mono">20.00%</td>
                <td class="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">$12.00</td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                <td class="p-3 font-semibold text-slate-900 dark:text-white">$45.00</td>
                <td class="p-3 text-rose-600 dark:text-rose-400 font-bold">Standard 20%</td>
                <td class="p-3 text-rose-600 dark:text-rose-400 font-mono font-bold">$9.00</td>
                <td class="p-3 text-emerald-600 font-bold font-mono">20.00%</td>
                <td class="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">$36.00</td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                <td class="p-3 font-semibold text-slate-900 dark:text-white">$120.00</td>
                <td class="p-3 text-rose-600 dark:text-rose-400 font-bold">Standard 20%</td>
                <td class="p-3 text-rose-600 dark:text-rose-400 font-mono font-bold">$24.00</td>
                <td class="p-3 text-emerald-600 font-bold font-mono">20.00%</td>
                <td class="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">$96.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          To model your specific inventory thrift cost and shipping promo combinations in real time, use our free <a href="/calculators/poshmark-fee-calculator" class="text-rose-600 dark:text-rose-400 font-bold underline hover:text-rose-500">Poshmark Fee &amp; Profit Calculator</a>.
        </p>
      </section>

      <!-- Section 2 -->
      <section id="the-1499-pricing-trap" class="space-y-4 scroll-mt-24">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          2. The $14.99 Pricing Trap: Why Under-$15 Sales Destroy Net Margins
        </h2>
        <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          One of the biggest pitfalls for new thrift and boutique sellers is the <strong>$14.99 Pricing Trap</strong>. Because Poshmark charges a flat $2.95 below $15.00, the effective fee percentage rises dramatically as the sale price drops:
        </p>
        <div class="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm text-amber-900 dark:text-amber-200 space-y-3">
          <div class="font-bold text-amber-800 dark:text-amber-300 text-sm flex items-center gap-2">
            <i class="fa-solid fa-triangle-exclamation"></i> Mathematical Proof of the $14 vs $15 Disparity:
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 space-y-1">
              <span class="font-bold text-slate-800 dark:text-slate-200">Sale at $14.00:</span>
              <p class="text-rose-600">Poshmark Fee: -$2.95 (21.07%)</p>
              <p class="text-slate-600 dark:text-slate-400">Thrift COGS: -$4.00</p>
              <p class="text-slate-600 dark:text-slate-400">Supplies: -$1.00</p>
              <p class="font-bold text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-700 pt-1">Net Take-Home: $6.05</p>
            </div>
            <div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 space-y-1">
              <span class="font-bold text-emerald-600 dark:text-emerald-400">Sale at $15.00:</span>
              <p class="text-rose-600">Poshmark Fee: -$3.00 (20.00%)</p>
              <p class="text-slate-600 dark:text-slate-400">Thrift COGS: -$4.00</p>
              <p class="text-slate-600 dark:text-slate-400">Supplies: -$1.00</p>
              <p class="font-bold text-emerald-600 dark:text-emerald-400 border-t border-slate-200 dark:border-slate-700 pt-1">Net Take-Home: $7.00 (+$0.95 Net!)</p>
            </div>
          </div>
          <p class="text-xs text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
            A seller who negotiates a buyer up from $14 to $15 keeps nearly 95% of that additional dollar! For this reason, professional sellers enforce a strict house rule: never list items under $15 individually. Bundle them together or counteroffer buyers at $15 minimum.
          </p>
        </div>
      </section>

      <!-- Section 3 -->
      <section id="offer-to-likers-shipping-discounts" class="space-y-4 scroll-mt-24">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          3. Offer to Likers (OTL): The True Cost of Mandatory Shipping Subsidies
        </h2>
        <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          On Poshmark, over 60% of all accepted transactions occur through private <strong>Offers to Likers (OTL)</strong>. However, sending an offer triggers two algorithmic prerequisites that directly erode your profit margins if not calculated in advance:
        </p>

        <!-- Infographic 2: Offer to Likers Profit Flow -->
        <div class="my-6">
          <img
            src="/blog/images/poshmark-offer-to-likers-profit-flow.png"
            alt="Poshmark Offer to Likers Cashflow: Price Drop, Commission and Shipping Subsidy"
            width="800"
            height="480"
            class="w-full rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800"
            loading="lazy"
          />
          <p class="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 font-mono">
            Figure 2: The step-by-step cashflow deduction breakdown of a private Poshmark Offer to Likers.
          </p>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">The Two Mandatory OTL Conditions:</h3>
          <ol class="list-decimal pl-6 space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300">
            <li>
              <strong>Mandatory 10% Price Drop:</strong> Your private offer must be at least 10% below the lowest historical price this specific listing has ever been offered at in the last 90 days.
            </li>
            <li>
              <strong>Mandatory Shipping Discount:</strong> Poshmark standard buyer shipping is <strong>$7.97</strong> for USPS Priority Mail (up to 5 lbs). The seller must select either:
              <ul class="list-disc pl-6 mt-1 space-y-1">
                <li><strong>$5.95 Buyer Rate:</strong> Poshmark gives the buyer a $2.02 discount and deducts <strong>$2.02</strong> straight from your earnings.</li>
                <li><strong>Free Shipping:</strong> Poshmark gives the buyer free postage and deducts the entire <strong>$7.97</strong> label cost from your earnings.</li>
              </ul>
            </li>
          </ol>
        </div>

        <div class="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 font-mono text-xs sm:text-sm space-y-2 my-4">
          <div class="text-xs text-rose-400 font-bold uppercase tracking-wider">// Net Poshmark Deposit Formula with OTL Discount</div>
          <p class="text-slate-300">NetDeposit = OfferPrice - (OfferPrice * 0.20) - ShippingSubsidy</p>
          <p class="text-emerald-400 font-bold">On a $30 Offer with $5.95 promo: $30.00 - $6.00 - $2.02 = $21.98</p>
        </div>

        <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Notice that on a $30 item, you give up $6.00 in commission plus $2.02 in shipping subsidy: a total platform deduction of <strong>$8.02 (26.73%)</strong>. Always pad your initial listing price by 20% to 25% so that when you send an Offer to Likers, your take-home margin remains protected.
        </p>
      </section>

      <!-- In-Article Interactive Utility CTA -->
      <div class="p-6 rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-slate-900 border border-rose-800/60 shadow-xl my-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="space-y-1 text-center sm:text-left">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-400">Interactive Reseller Engine</span>
          <h3 class="text-lg font-bold text-white">Solve Your Exact Poshmark Listing Price</h3>
          <p class="text-xs text-slate-300 max-w-md">
            Enter your thrift cost and desired net cash. Our Reverse Target Solver automatically calculates the required listing price including OTL discounts.
          </p>
        </div>
        <a
          href="/calculators/poshmark-fee-calculator"
          class="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition-all shadow-md whitespace-nowrap"
        >
          Open Poshmark Calculator &rarr;
        </a>
      </div>

      <!-- Section 4 -->
      <section id="closet-bundle-arbitrage" class="space-y-4 scroll-mt-24">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          4. Closet Bundle Strategy: How to Turn Low-Cost Inventory into 35%+ Net Margins
        </h2>
        <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          The single most lucrative feature on Poshmark is the <strong>Closet Bundle</strong>. Buyers can add multiple listings from your closet into a single cart. The entire bundle travels under a single <strong>$7.97 USPS Priority Mail label up to 5 lbs</strong>.
        </p>
        <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Here is why bundling transforms seller economics:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <span class="font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide">Case A: Three Items Sold Individually</span>
            <p class="text-slate-600 dark:text-slate-400">Sold at $12.00 each across 3 separate buyers:</p>
            <ul class="list-disc pl-4 space-y-1 font-mono text-slate-700 dark:text-slate-300">
              <li>Gross Revenue: $36.00</li>
              <li>Poshmark Fees: 3 x $2.95 = -$8.85 (24.6%)</li>
              <li>Total Shipping Paid by Buyers: 3 x $7.97 = $23.91</li>
              <li>Packaging Mailers Used: 3 polymailers</li>
              <li><strong>Net Seller Payout: $27.15</strong></li>
            </ul>
          </div>

          <div class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-2 text-xs">
            <span class="font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">Case B: Same 3 Items in a Bundle (15% Off)</span>
            <p class="text-slate-600 dark:text-slate-400">Bundle sold at $30.60 with 15% automatic discount:</p>
            <ul class="list-disc pl-4 space-y-1 font-mono text-slate-700 dark:text-slate-300">
              <li>Gross Revenue: $30.60</li>
              <li>Poshmark 20% Fee: -$6.12 (20.0%)</li>
              <li>Total Shipping Paid by Buyer: 1 x $7.97 = $7.97</li>
              <li>Packaging Mailers Used: 1 single box</li>
              <li><strong>Net Seller Payout: $24.48</strong></li>
            </ul>
          </div>
        </div>
        <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Notice that while the seller nets just $2.67 less on the bundle, the buyer saves a staggering <strong>$15.94 in shipping fees</strong>! This enormous shipping savings makes buyers far more likely to complete the checkout, turning stale inventory into immediate working capital.
        </p>
      </section>

      <!-- Section 5 -->
      <section id="poshmark-vs-depop-ebay-mercari" class="space-y-4 scroll-mt-24">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          5. Poshmark vs Depop vs eBay vs Mercari: 2026 Reseller Take-Rate Audit
        </h2>
        <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          When deciding where to cross-list inventory, sellers frequently compare Poshmark 20% commission against competing fashion platforms. Below is an objective fee audit modeling an identical <strong>$60.00 clothing sale</strong> across the four major US resale marketplaces:
        </p>

        <div class="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <table class="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                <th class="p-3">Platform</th>
                <th class="p-3">Seller Fee Schedule</th>
                <th class="p-3">Fee on $60 Sale</th>
                <th class="p-3">Shipping Integration</th>
                <th class="p-3">Best Reseller Niche</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800 font-medium bg-white dark:bg-slate-900">
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                <td class="p-3 font-semibold text-rose-600 dark:text-rose-400">Poshmark</td>
                <td class="p-3">20.0% ($2.95 under $15)</td>
                <td class="p-3 font-mono font-bold text-rose-600">$12.00</td>
                <td class="p-3 text-slate-600 dark:text-slate-400">Prepaid USPS Priority up to 5 lbs</td>
                <td class="p-3 text-slate-600 dark:text-slate-400">Mid-tier to luxury fashion, boots, bundles</td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                <td class="p-3 font-semibold text-rose-600 dark:text-rose-400">
                  <a href="/depop-fee-calculator" class="underline hover:text-rose-500">Depop</a>
                </td>
                <td class="p-3">0% selling fee + 3.3% + $0.45</td>
                <td class="p-3 font-mono font-bold text-emerald-600">$2.43</td>
                <td class="p-3 text-slate-600 dark:text-slate-400">Depop QR label or ship on own</td>
                <td class="p-3 text-slate-600 dark:text-slate-400">Gen-Z streetwear, Y2K, vintage tees</td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                <td class="p-3 font-semibold text-blue-600 dark:text-blue-400">
                  <a href="/calculators/ebay-fee-calculator" class="underline hover:text-blue-500">eBay</a>
                </td>
                <td class="p-3">13.25% + $0.40 Managed Payments</td>
                <td class="p-3 font-mono font-bold text-blue-600">$8.35</td>
                <td class="p-3 text-slate-600 dark:text-slate-400">Custom weight-based shipping labels</td>
                <td class="p-3 text-slate-600 dark:text-slate-400">Broad retail, electronics, sneakers, collectibles</td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                <td class="p-3 font-semibold text-indigo-600 dark:text-indigo-400">Mercari</td>
                <td class="p-3">0% selling fee + 2.9% + $0.50</td>
                <td class="p-3 font-mono font-bold text-emerald-600">$2.24</td>
                <td class="p-3 text-slate-600 dark:text-slate-400">Prepaid carrier QR or self-ship</td>
                <td class="p-3 text-slate-600 dark:text-slate-400">Quick household decluttering, toys, beauty</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          While Depop and Mercari offer lower platform cuts, Poshmark provides two massive operational advantages:
        </p>
        <ul class="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300">
          <li><strong>Free USPS Priority Mail Packaging:</strong> Because Poshmark uses a special contract with the USPS, sellers can walk into any post office and grab free Priority Mail boxes, envelopes, and regional mailers, completely eliminating packaging cardboard expenses.</li>
          <li><strong>Zero Return Disputes on Sizing:</strong> Poshmark terms of service clearly state that items cannot be returned for fit or buyer remorse. Once an item is delivered and accepted (or 72 hours elapse), the funds are permanently released to the seller.</li>
        </ul>
      </section>

      <!-- Section 6 -->
      <section id="reverse-pricing-1099k-taxes" class="space-y-4 scroll-mt-24">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          6. Reverse Break-Even Mathematical Formula &amp; IRS 1099-K Tax Deductions
        </h2>
        <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          To ensure that every listing generates your exact required dollar profit, use the reverse target solver formula:
        </p>

        <div class="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 shadow-xl font-mono text-xs sm:text-sm space-y-3 my-4">
          <div class="text-xs text-rose-400 font-bold uppercase tracking-wider">// Poshmark Minimum Required Listing Price Equation</div>
          <p class="text-slate-300">TotalOutflows = ItemThriftCost + ShippingDiscount + OverweightUpgrade + SuppliesCost</p>
          <p class="text-emerald-400 font-bold">RequiredListingPrice = (TotalOutflows + DesiredCashProfit) / 0.80</p>
          <div class="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            Example: If thrift cost is $10.00, polymailer is $1.00, shipping promo is $2.02, and you want $25.00 net profit:
            <br />
            RequiredListingPrice = ($10.00 + $1.00 + $2.02 + $25.00) / 0.80 = <strong>$47.53</strong>
          </div>
        </div>

        <h3 class="text-lg font-bold text-slate-900 dark:text-white pt-2">IRS 1099-K Tax Reporting for Resellers in 2026</h3>
        <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Under current IRS transition regulations, Poshmark reports gross sales volume to the IRS on <strong>Form 1099-K</strong> for sellers exceeding applicable federal reporting thresholds (with several states like Massachusetts, Virginia, and Maryland enforcing $600 thresholds).
        </p>
        <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Because the 1099-K reports <strong>gross buyer payments</strong> (including postage and sales tax collected), you must report these amounts on <strong>IRS Schedule C (Form 1040)</strong> and deduct all allowable business expenses to avoid overpaying taxes:
        </p>
        <ul class="list-disc pl-6 space-y-1 text-sm sm:text-base text-slate-700 dark:text-slate-300">
          <li><strong>Cost of Goods Sold (COGS):</strong> Original inventory purchase price at thrift stores, yard sales, or liquidation auctions.</li>
          <li><strong>Poshmark Platform Commissions:</strong> The full 20% or $2.95 fee deducted by Poshmark.</li>
          <li><strong>Shipping Subsidies:</strong> Every $2.02 or $7.97 shipping discount you absorbed.</li>
          <li><strong>Packaging Supplies:</strong> Tape, thank you stickers, labels, printer ink, and polymailers.</li>
          <li><strong>Standard Mileage Rate:</strong> Mileage driven to thrift stores, sourcing trips, and post office drop-offs.</li>
        </ul>
        <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          To calculate your exact self-employment tax obligations, use our companion <a href="/1099-tax-calculator" class="text-emerald-600 dark:text-emerald-400 font-bold underline hover:text-emerald-500">1099 Reseller Tax Calculator</a>.
        </p>
      </section>
    \`,
    faqs: [
      {
        q: 'What percentage does Poshmark take in fees in 2026?',
        a: 'Poshmark charges a flat 20.0% fee on sales of $15.00 or more, and a flat $2.95 fee on sales under $15.00. Poshmark does not charge separate listing fees or payment processing cuts.'
      },
      {
        q: 'How much does a shipping discount cost the seller on Poshmark?',
        a: 'When offering discounted shipping, Poshmark deducts $2.02 from seller earnings (giving the buyer a $5.95 rate). If the seller offers free shipping, Poshmark deducts the full $7.97 USPS Priority label from seller earnings.'
      },
      {
        q: 'Why should I avoid listing items at $14 on Poshmark?',
        a: 'On a $14 sale, the flat $2.95 fee leaves you with $11.05. On a $15 sale, the 20% commission ($3.00) leaves you with $12.00. You pocket $0.95 more profit by pricing just one dollar higher.'
      },
      {
        q: 'How does Poshmark bundle shipping work?',
        a: 'When a buyer purchases a bundle of multiple items from a single closet, Poshmark charges a 20% fee on the combined bundle total. The entire package ships under a single $7.97 USPS Priority Mail label up to 5 lbs.'
      },
      {
        q: 'Does Poshmark send a 1099-K tax form in 2026?',
        a: 'Yes, Poshmark issues IRS Form 1099-K to US sellers who exceed applicable federal or state volume thresholds. Sellers can write off their inventory acquisition costs, shipping subsidies, and packaging expenses on Schedule C.'
      }
    ]
  }
`;

// Insert right before the last closing array '];'
const lastBracketIdx = content.lastIndexOf('];');
if (lastBracketIdx === -1) {
  console.error('Could not find closing bracket in blog-posts.ts');
  process.exit(1);
}

const updatedContent = content.slice(0, lastBracketIdx) + ',\n' + newPostCode + '\n];\n';
fs.writeFileSync(filePath, updatedContent, 'utf-8');
console.log('Successfully added Poshmark Pillar Blog Post to data/blog-posts.ts!');
