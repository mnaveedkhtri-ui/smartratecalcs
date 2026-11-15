// scripts/append_paypal_blog_post.js
const fs = require('fs');
const path = require('path');

const blogPostsPath = path.join(__dirname, '..', 'data', 'blog-posts.ts');
let content = fs.readFileSync(blogPostsPath, 'utf-8');

const newPost = `  // ==========================================
  // US GOLDMINE 5: PAYPAL GOODS AND SERVICES FEE - WHO PAYS, RATES & NET MATH (2026)
  // ==========================================
  {
    slug: 'paypal-goods-and-services-fee-who-pays-calculator-guide',
    title: 'PayPal Goods and Services Fee (2026): Who Pays, Rates & Net Math',
    metaTitle: 'PayPal Goods and Services Fee: Who Pays & Net Math (2026)',
    metaDesc: 'Who pays the PayPal Goods and Services fee in 2026? Learn the exact 2.99%+$0.49 rate math, seller vs buyer rules, and reverse invoicing formula.',
    category: 'Banking',
    readTime: '12 min read',
    publishedDate: '2026-11-15',
    updatedDate: '2026-11-15',
    primaryKeyword: 'paypal goods and services fee',
    secondaryKeywords: [
      'who pays paypal goods and services fee',
      'paypal goods and services fee calculator',
      'paypal goods and services fee percentage 2026',
      'paypal friends and family vs goods and services fee',
      'how to avoid paypal goods and services fee',
      'how much does paypal charge goods and services'
    ],
    quickSummary: 'Under official 2026 PayPal commercial settlement rules, the seller (recipient) always pays the Goods and Services fee. The standard US domestic rate is 2.99% + $0.49 per transaction for online checkouts, or 3.49% + $0.49 for direct PayPal invoices. The buyer pays $0.00 in fees. For a $100.00 transaction, PayPal deducts $3.48, leaving the seller with a net payout of $96.52. Commercial transactions trigger automatic IRS Form 1099-K reporting once you exceed $20,000 in gross payments and 200 transactions.',
    relatedCalculatorSlug: '/paypal-fee-calculator',
    images: [
      '/blog/paypal-goods-and-services-fee-who-pays-calculator-guide.png',
      '/blog/images/paypal-fee-settlement-flowchart.png',
      '/blog/images/paypal-friends-family-vs-goods-services.png',
      '/blog/images/paypal-reverse-surcharge-math-formula.png'
    ],
    externalSources: [
      { name: 'PayPal Official Merchant Fees (US)', url: 'https://www.paypal.com/us/webapps/mpp/merchant-fees' },
      { name: 'IRS Form 1099-K Information Reporting Guidelines', url: 'https://www.irs.gov/businesses/understanding-your-form-1099-k' }
    ],
    wikidataEntities: [
      'PayPal (Q483951)',
      'Transaction cost (Q1128390)',
      'Electronic funds transfer (Q1048625)'
    ],
    tableOfContents: [
      { id: 'who-pays-quick-answer', title: '1. Quick Answer: Who Pays the PayPal Goods and Services Fee?' },
      { id: 'fee-structure-2026', title: '2. 2026 PayPal Fee Schedule: Standard vs. Invoicing Rates' },
      { id: 'exact-math-examples', title: '3. Exact Calculation Math: What Happens to a $10, $50, $100 & $500 Payment' },
      { id: 'reverse-invoicing-formula', title: '4. The Reverse Invoicing Formula: How to Pocket an Exact Net Amount' },
      { id: 'friends-family-vs-goods-services', title: '5. Friends & Family vs. Goods & Services: The Critical Differences' },
      { id: 'irs-1099k-rules', title: '6. IRS Form 1099-K Tax Reporting Rules for 2026' },
      { id: 'how-to-minimize-fees', title: '7. 4 Legal Strategies to Minimize PayPal Seller Fees' },
      { id: 'faqs', title: '8. Frequently Asked Questions (FAQs)' }
    ],
    contentHtml: \`
      <section id="who-pays-quick-answer" class="space-y-4">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900">1. Quick Answer: Who Pays the PayPal Goods and Services Fee?</h2>
        <p class="text-slate-700 leading-relaxed text-sm sm:text-base">
          <strong>The seller (recipient) always pays the PayPal Goods and Services fee.</strong> When a customer purchases an item, pays for freelance work, or sends money marked for commercial goods, the buyer is charged exactly the listed purchase price ($0.00 fee to the buyer). PayPal automatically intercepts the funds, deducts its mandatory merchant processing fee, and deposits the net remaining balance into the seller's PayPal account.
        </p>

        <div class="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 text-sm sm:text-base space-y-2">
          <p class="font-bold flex items-center gap-2 text-emerald-900">
            <span class="w-3 h-3 rounded-full bg-emerald-600 inline-block"></span>
            The 2026 Baseline Rule in Brief:
          </p>
          <ul class="list-disc list-inside space-y-1 text-xs sm:text-sm text-emerald-900">
            <li><strong>Buyer pays:</strong> Exactly $100.00 (Zero transaction surcharge from PayPal).</li>
            <li><strong>PayPal deducts:</strong> 2.99% + $0.49 = <strong>$3.48</strong> (Standard US checkout rail).</li>
            <li><strong>Seller receives:</strong> Exactly <strong>$96.52</strong> in available funds.</li>
            <li><strong>Protection:</strong> Both parties receive 180-day PayPal Purchase and Seller Protection.</li>
          </ul>
        </div>

        <div class="my-6 rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-950">
          <img
            src="/blog/images/paypal-fee-settlement-flowchart.png"
            alt="Who pays PayPal Goods and Services fee money flow settlement diagram showing buyer sending $100, PayPal deducting $3.48 cut, and seller receiving $96.52 net"
            width="1000"
            height="520"
            class="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
        <p class="text-xs text-slate-500 italic text-center">
          Figure 1: Financial settlement architecture of a standard $100.00 PayPal commercial transaction under 2026 processing rules.
        </p>
      </section>

      <section id="fee-structure-2026" class="space-y-4 pt-6">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900">2. 2026 PayPal Fee Schedule: Standard vs. Invoicing Rates</h2>
        <p class="text-slate-700 leading-relaxed text-sm sm:text-base">
          PayPal does not charge one universal fee. Depending on whether you accept payment through an online checkout integration, send a direct digital invoice, or process an international buyer, the percentage rate and fixed fee fluctuate significantly:
        </p>

        <div class="overflow-x-auto my-4 rounded-xl border border-slate-200">
          <table class="w-full text-left text-xs sm:text-sm">
            <thead class="bg-slate-100 text-slate-700 font-bold uppercase text-xs">
              <tr>
                <th class="p-3">Payment Method</th>
                <th class="p-3">Percentage Fee</th>
                <th class="p-3">Fixed Fee (USD)</th>
                <th class="p-3">Net Fee on $100</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 bg-white">
              <tr>
                <td class="p-3 font-semibold text-slate-900">Standard Online Checkout (E-Commerce)</td>
                <td class="p-3 font-mono text-slate-700">2.99%</td>
                <td class="p-3 font-mono text-slate-700">+$0.49</td>
                <td class="p-3 font-mono text-red-600 font-bold">$3.48</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="p-3 font-semibold text-slate-900">PayPal Invoicing / Payment Requests</td>
                <td class="p-3 font-mono text-slate-700">3.49%</td>
                <td class="p-3 font-mono text-slate-700">+$0.49</td>
                <td class="p-3 font-mono text-red-600 font-bold">$3.98</td>
              </tr>
              <tr>
                <td class="p-3 font-semibold text-slate-900">PayPal QR Code Transactions ($10.01+)</td>
                <td class="p-3 font-mono text-slate-700">1.90%</td>
                <td class="p-3 font-mono text-slate-700">+$0.10</td>
                <td class="p-3 font-mono text-emerald-700 font-bold">$2.00</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="p-3 font-semibold text-slate-900">PayPal QR Code Transactions (&lt;=$10.00)</td>
                <td class="p-3 font-mono text-slate-700">2.40%</td>
                <td class="p-3 font-mono text-slate-700">+$0.05</td>
                <td class="p-3 font-mono text-emerald-700 font-bold">$0.29 (on $10)</td>
              </tr>
              <tr>
                <td class="p-3 font-semibold text-slate-900">International Commercial Transactions</td>
                <td class="p-3 font-mono text-slate-700">4.49%</td>
                <td class="p-3 font-mono text-slate-700">+$0.49 + FX spread</td>
                <td class="p-3 font-mono text-red-700 font-bold">$4.98+</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-700 leading-relaxed text-sm sm:text-base">
          Notice the critical difference between <strong>Standard Online Checkout (2.99% + $0.49)</strong> and <strong>PayPal Invoices (3.49% + $0.49)</strong>. If you generate a formal invoice through PayPal's dashboard, you are paying an extra 0.50% convenience surcharge on every dollar collected.
        </p>
      </section>

      <!-- HIGH CONVERTING CALCULATOR CTA CARD -->
      <div class="my-8 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-500/30 shadow-xl text-white">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-2">
              INTERACTIVE TOOL
            </span>
            <h3 class="text-lg sm:text-xl font-bold">Calculate Your Exact PayPal Payout Now</h3>
            <p class="text-sm text-slate-300 mt-1 max-w-xl">
              Don't do the math manually. Plug in any sale amount into our official PayPal Fee Calculator to see exact fee deductions, reverse invoice pricing, and international rates.
            </p>
          </div>
          <a
            href="/paypal-fee-calculator"
            class="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-blue-500/25 whitespace-nowrap"
          >
            Open PayPal Calculator &rarr;
          </a>
        </div>
      </div>

      <section id="exact-math-examples" class="space-y-4 pt-6">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900">3. Exact Calculation Math: What Happens to a $10, $50, $100 &amp; $500 Payment</h2>
        <p class="text-slate-700 leading-relaxed text-sm sm:text-base">
          The mathematical formula for standard domestic PayPal commercial payments is:
        </p>

        <div class="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-sm sm:text-base text-center shadow-inner">
          Total Fee = (Gross Payment &times; 0.0299) + $0.49
        </div>

        <p class="text-slate-700 leading-relaxed text-sm sm:text-base">
          Because of the fixed $0.49 fee component, smaller transactions suffer a much higher effective percentage penalty than larger transactions:
        </p>

        <div class="overflow-x-auto my-4 rounded-xl border border-slate-200">
          <table class="w-full text-left text-xs sm:text-sm">
            <thead class="bg-slate-100 text-slate-700 font-bold uppercase text-xs">
              <tr>
                <th class="p-3">Gross Payment</th>
                <th class="p-3">Variable Fee (2.99%)</th>
                <th class="p-3">Fixed Fee</th>
                <th class="p-3">Total PayPal Cut</th>
                <th class="p-3">Seller Net Payout</th>
                <th class="p-3">Effective Fee Rate</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 bg-white font-mono">
              <tr>
                <td class="p-3 font-bold text-slate-900 font-sans">$10.00</td>
                <td class="p-3 text-slate-600">$0.30</td>
                <td class="p-3 text-slate-600">$0.49</td>
                <td class="p-3 text-red-600 font-bold">-$0.79</td>
                <td class="p-3 text-emerald-700 font-bold">$9.21</td>
                <td class="p-3 text-amber-700 font-bold font-sans">7.89%</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="p-3 font-bold text-slate-900 font-sans">$50.00</td>
                <td class="p-3 text-slate-600">$1.50</td>
                <td class="p-3 text-slate-600">$0.49</td>
                <td class="p-3 text-red-600 font-bold">-$1.99</td>
                <td class="p-3 text-emerald-700 font-bold">$48.01</td>
                <td class="p-3 text-slate-700 font-sans">3.97%</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900 font-sans">$100.00</td>
                <td class="p-3 text-slate-600">$2.99</td>
                <td class="p-3 text-slate-600">$0.49</td>
                <td class="p-3 text-red-600 font-bold">-$3.48</td>
                <td class="p-3 text-emerald-700 font-bold">$96.52</td>
                <td class="p-3 text-slate-700 font-sans">3.48%</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="p-3 font-bold text-slate-900 font-sans">$250.00</td>
                <td class="p-3 text-slate-600">$7.48</td>
                <td class="p-3 text-slate-600">$0.49</td>
                <td class="p-3 text-red-600 font-bold">-$7.97</td>
                <td class="p-3 text-emerald-700 font-bold">$242.03</td>
                <td class="p-3 text-slate-700 font-sans">3.19%</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900 font-sans">$500.00</td>
                <td class="p-3 text-slate-600">$14.95</td>
                <td class="p-3 text-slate-600">$0.49</td>
                <td class="p-3 text-red-600 font-bold">-$15.44</td>
                <td class="p-3 text-emerald-700 font-bold">$484.56</td>
                <td class="p-3 text-slate-700 font-sans">3.09%</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="p-3 font-bold text-slate-900 font-sans">$1,000.00</td>
                <td class="p-3 text-slate-600">$29.90</td>
                <td class="p-3 text-slate-600">$0.49</td>
                <td class="p-3 text-red-600 font-bold">-$30.39</td>
                <td class="p-3 text-emerald-700 font-bold">$969.61</td>
                <td class="p-3 text-slate-700 font-sans">3.04%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="text-xs text-slate-500 italic">
          Takeaway: On micro-transactions below $15, the $0.49 fixed fee consumes almost 8% of total revenue. For micro-ticket sales, QR code payments (1.90% + $0.10) provide substantial fee relief.
        </p>
      </section>

      <section id="reverse-invoicing-formula" class="space-y-4 pt-6">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900">4. The Reverse Invoicing Formula: How to Pocket an Exact Net Amount</h2>
        <p class="text-slate-700 leading-relaxed text-sm sm:text-base">
          The single most common financial mistake freelancers and sellers make is simply adding 2.99% onto their target price. If you want to receive exactly $100.00 net and invoice the customer $103.48, you will end up with <strong>$99.90</strong>, shortchanging yourself by $0.10.
        </p>

        <p class="text-slate-700 leading-relaxed text-sm sm:text-base">
          Why? Because PayPal calculates its 2.99% fee on the <em>new total invoice amount</em>, not your original baseline! To solve this mathematically, use the official reverse surcharge formula:
        </p>

        <div class="p-5 rounded-xl bg-slate-900 text-slate-100 font-mono text-sm sm:text-base text-center shadow-inner">
          Gross Invoice Amount = (Desired Net + Fixed Fee) / (1 - Percentage Rate)
        </div>

        <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-sm sm:text-base space-y-2">
          <p class="font-bold text-slate-900">Solving for Exactly $100.00 Net (Standard 2.99% + $0.49):</p>
          <ol class="list-decimal list-inside space-y-1 font-mono text-xs sm:text-sm text-slate-800">
            <li>Numerator = Desired Net ($100.00) + Fixed Fee ($0.49) = $100.49</li>
            <li>Denominator = 1 - 0.0299 = 0.9701</li>
            <li>Gross Invoice = $100.49 / 0.9701 = <strong>$103.587 &rarr; $103.59</strong></li>
            <li>Proof Check: $103.59 &times; 2.99% = $3.10 + $0.49 = $3.59 cut. Net Payout = <strong>$100.00 EXACT</strong>.</li>
          </ol>
        </div>

        <div class="my-6 rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-950">
          <img
            src="/blog/images/paypal-reverse-surcharge-math-formula.png"
            alt="Comparison diagram of amateur raw addition vs professional reverse invoicing formula to receive exactly $100 net via PayPal"
            width="1000"
            height="520"
            class="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
        <p class="text-xs text-slate-500 italic text-center">
          Figure 2: Mathematical breakdown showing why raw percentage addition leaks revenue and how reverse pricing guarantees exact net margin settlement.
        </p>
      </section>

      <section id="friends-family-vs-goods-services" class="space-y-4 pt-6">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900">5. Friends &amp; Family vs. Goods &amp; Services: The Critical Differences</h2>
        <p class="text-slate-700 leading-relaxed text-sm sm:text-base">
          Every month, thousands of buyers and sellers debate whether to conduct transactions via Friends &amp; Family (F&amp;F) to avoid fees. While F&amp;F transfers are free when funded by a linked bank account or PayPal balance, using F&amp;F for commercial purchases carries severe legal and financial liabilities:
        </p>

        <div class="my-6 rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-950">
          <img
            src="/blog/images/paypal-friends-family-vs-goods-services.png"
            alt="Side by side comparison of PayPal Friends and Family vs Goods and Services showing fees, purchase protection, and IRS 1099-K tax rules"
            width="1000"
            height="520"
            class="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
        <p class="text-xs text-slate-500 italic text-center">
          Figure 3: Policy, fraud protection, and regulatory comparison between personal and commercial payment classifications.
        </p>

        <div class="overflow-x-auto my-4 rounded-xl border border-slate-200">
          <table class="w-full text-left text-xs sm:text-sm">
            <thead class="bg-slate-100 text-slate-700 font-bold uppercase text-xs">
              <tr>
                <th class="p-3">Feature / Parameter</th>
                <th class="p-3">Friends &amp; Family (F&amp;F)</th>
                <th class="p-3">Goods &amp; Services (G&amp;S)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 bg-white">
              <tr>
                <td class="p-3 font-semibold text-slate-900">Cost to Buyer / Sender</td>
                <td class="p-3 text-emerald-700 font-bold">0% Free (Bank/Balance) <span class="text-xs text-slate-500 font-normal">or 2.9%+$0.30 via Credit Card</span></td>
                <td class="p-3 text-slate-700 font-bold">0% Free (Always)</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="p-3 font-semibold text-slate-900">Cost to Seller / Recipient</td>
                <td class="p-3 text-emerald-700 font-bold">0% Free</td>
                <td class="p-3 text-red-600 font-bold">2.99% + $0.49 (Online)</td>
              </tr>
              <tr>
                <td class="p-3 font-semibold text-slate-900">Buyer Purchase Protection</td>
                <td class="p-3 text-red-600 font-bold">&#10007; ZERO (No dispute rights)</td>
                <td class="p-3 text-emerald-700 font-bold">&#10003; Full 180-day coverage</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="p-3 font-semibold text-slate-900">Seller Chargeback Defense</td>
                <td class="p-3 text-red-600 font-bold">&#10007; None</td>
                <td class="p-3 text-emerald-700 font-bold">&#10003; Full Seller Protection</td>
              </tr>
              <tr>
                <td class="p-3 font-semibold text-slate-900">Permitted Use Cases</td>
                <td class="p-3 text-slate-700">Splitting dinners, gifts, rent with roommates</td>
                <td class="p-3 text-slate-700">Physical goods, digital items, freelance services</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="p-3 font-semibold text-slate-900">Account Risk if Abused</td>
                <td class="p-3 text-red-700 font-bold">&#9888; Permanent ban &amp; 180-day fund freeze</td>
                <td class="p-3 text-emerald-700 font-bold">&#10003; 100% Terms of Service Compliant</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs sm:text-sm">
          <strong>The Danger of F&amp;F Scams:</strong> If a seller asks you to pay via Friends &amp; Family to "give you a discount on fees", you lose 100% of your buyer protection. If the seller never ships the item or sends a counterfeit, PayPal support will deny your claim immediately. Never use F&amp;F with strangers or commercial vendors.
        </div>
      </section>

      <section id="irs-1099k-rules" class="space-y-4 pt-6">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900">6. IRS Form 1099-K Tax Reporting Rules for 2026</h2>
        <p class="text-slate-700 leading-relaxed text-sm sm:text-base">
          A major point of anxiety for online sellers is whether accepting Goods &amp; Services payments triggers an automatic report to the IRS. Here is the verified regulatory reality for 2026:
        </p>

        <ul class="list-disc list-inside space-y-2 text-slate-700 text-sm sm:text-base">
          <li><strong>Federal Threshold Restored:</strong> Following congressional revisions, the widely contested $600 reporting mandate was repealed. For federal tax filings in 2026, PayPal is legally mandated to issue a Form 1099-K only if you exceed <strong>both $20,000 in gross commercial payments AND 200 separate transactions</strong> within the calendar year.</li>
          <li><strong>State-Level Exceptions:</strong> Certain states maintain independent, lower reporting thresholds. If you reside in states such as Massachusetts ($600), Maryland ($600), Vermont ($600), Virginia ($600), or Illinois ($1,000 and 4+ transactions), PayPal will file a state-level 1099-K even if you do not hit the federal $20,000 limit.</li>
          <li><strong>Personal Payments Are Never Reported:</strong> Funds received through Friends &amp; Family for personal reimbursements are legally exempt and never included on Form 1099-K.</li>
          <li><strong>Taxability vs. Form Issuance:</strong> Receiving or not receiving a 1099-K does not determine whether your income is taxable. Under IRS tax law, all earned net business profit must be reported on your Form 1040 Schedule C, regardless of whether a third-party settlement organization sends a formal form.</li>
        </ul>
      </section>

      <section id="how-to-minimize-fees" class="space-y-4 pt-6">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900">7. 4 Legal Strategies to Minimize PayPal Seller Fees</h2>
        <p class="text-slate-700 leading-relaxed text-sm sm:text-base">
          If transaction processing cuts are eroding your profit margins, employ these four fully compliant tactics to reduce your effective payment overhead:
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">Strategy 1</span>
            <h4 class="font-bold text-slate-900 text-base">Switch from Invoices to Standard Checkout</h4>
            <p class="text-xs sm:text-sm text-slate-600">
              PayPal Invoicing charges 3.49% + $0.49. By sending buyers through a standard PayPal checkout button or website integration, you immediately lower the rate to 2.99% + $0.49, saving $5.00 on every $1,000 processed.
            </p>
          </div>

          <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">Strategy 2</span>
            <h4 class="font-bold text-slate-900 text-base">Utilize PayPal QR Codes In-Person</h4>
            <p class="text-xs sm:text-sm text-slate-600">
              For pop-up shops, trade shows, or local pickups, have customers scan your PayPal seller QR code. Transactions over $10.00 are charged at just <strong>1.90% + $0.10</strong>, nearly cutting your fee in half compared to card swipes.
            </p>
          </div>

          <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800">Strategy 3</span>
            <h4 class="font-bold text-slate-900 text-base">Deduct PayPal Fees as Business Expenses</h4>
            <p class="text-xs sm:text-sm text-slate-600">
              Every penny PayPal deducts is a 100% tax-deductible ordinary and necessary business expense. Record all merchant processing fees on IRS Schedule C (Line 10: Commissions and fees) to reduce your taxable net income dollar-for-dollar.
            </p>
          </div>

          <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">Strategy 4</span>
            <h4 class="font-bold text-slate-900 text-base">Apply the Exact Reverse Surcharge</h4>
            <p class="text-xs sm:text-sm text-slate-600">
              Where permitted by contract and state law, adjust your service quotation using the reverse formula so processing costs are built directly into the client's gross agreed contract price.
            </p>
          </div>
        </div>
      </section>

      <section id="faqs" class="space-y-4 pt-6">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900">8. Frequently Asked Questions (FAQs)</h2>
        <div class="space-y-4">
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 class="font-bold text-slate-900 text-sm sm:text-base">Who pays the PayPal Goods and Services fee, buyer or seller?</h4>
            <p class="text-xs sm:text-sm text-slate-700 mt-1">
              The seller always pays the fee. PayPal automatically deducts 2.99% + $0.49 (or 3.49% + $0.49 for invoices) from the incoming payment before depositing the net amount. The buyer is never charged an extra payment fee by PayPal.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 class="font-bold text-slate-900 text-sm sm:text-base">What percentage does PayPal take for Goods and Services in 2026?</h4>
            <p class="text-xs sm:text-sm text-slate-700 mt-1">
              For US domestic online sales, PayPal takes 2.99% plus a $0.49 fixed fee per transaction. Direct electronic invoices are billed at 3.49% + $0.49. International sales incur 4.49% + $0.49 plus currency conversion spreads.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 class="font-bold text-slate-900 text-sm sm:text-base">Can a buyer pay the PayPal Goods and Services fee for the seller?</h4>
            <p class="text-xs sm:text-sm text-slate-700 mt-1">
              PayPal does not have an automatic toggle for the buyer to absorb the fee directly during checkout. However, the seller can use the reverse calculation formula to increase the gross invoice price to $103.59 so that after PayPal's cut, the seller receives exactly $100.00 net.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 class="font-bold text-slate-900 text-sm sm:text-base">Does PayPal Goods and Services trigger an IRS Form 1099-K?</h4>
            <p class="text-xs sm:text-sm text-slate-700 mt-1">
              At the federal level for 2026, PayPal only issues a 1099-K if you receive over $20,000 in gross payments AND process more than 200 commercial transactions. However, specific states (such as MA, VA, VT, MD at $600, or IL at $1,000) mandate state-level reporting at lower thresholds.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 class="font-bold text-slate-900 text-sm sm:text-base">What happens if I use Friends and Family for commercial goods?</h4>
            <p class="text-xs sm:text-sm text-slate-700 mt-1">
              Both parties face severe risks. The buyer loses all 180-day purchase protection and cannot dispute items not received. The seller violates PayPal's User Agreement, which can lead to permanent account suspension, loss of merchant privileges, and a 180-day hold on all account funds.
            </p>
          </div>
        </div>
      </section>
    \`,
    faqs: [
      {
        q: 'Who pays the PayPal Goods and Services fee, buyer or seller?',
        a: 'The seller always pays the fee. PayPal automatically deducts 2.99% + $0.49 (or 3.49% + $0.49 for invoices) from the payment before depositing the net amount into the seller account. The buyer pays nothing extra.'
      },
      {
        q: 'What percentage does PayPal take for Goods and Services in 2026?',
        a: 'For US domestic online sales, PayPal takes 2.99% plus a $0.49 fixed fee per transaction. Direct electronic invoices are charged at 3.49% + $0.49, while international commercial sales incur 4.49% + $0.49.'
      },
      {
        q: 'Can a buyer pay the PayPal Goods and Services fee for the seller?',
        a: 'PayPal does not provide a buyer fee toggle, but sellers can use reverse surcharge math to price invoices (e.g., billing $103.59 to pocket exactly $100.00 net after PayPal deductions).'
      },
      {
        q: 'Does PayPal Goods and Services trigger an IRS Form 1099-K?',
        a: 'At the federal level for 2026, PayPal issues Form 1099-K if gross payments exceed $20,000 AND 200 commercial transactions occur. Certain states maintain lower thresholds (such as $600 in MA, MD, VA, VT).'
      },
      {
        q: 'What happens if I use Friends and Family for commercial goods?',
        a: 'The buyer loses all purchase protection and dispute recourse, while the seller risks permanent account termination and 180-day fund freezes for violating PayPal User Agreement.'
      }
    ]
  }
`;

// Insert newPost before the last "];"
const lastIndex = content.lastIndexOf('];');
if (lastIndex === -1) {
  throw new Error('Could not find closing bracket in blog-posts.ts');
}

const updatedContent = content.slice(0, lastIndex) + ',\n' + newPost + '\n];\n';
fs.writeFileSync(blogPostsPath, updatedContent, 'utf-8');
console.log('Successfully appended PayPal blog post to data/blog-posts.ts!');
