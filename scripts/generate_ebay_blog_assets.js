// scripts/generate_ebay_blog_assets.js
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const blogDir = path.join(__dirname, '..', 'public', 'blog');
const imagesDir = path.join(blogDir, 'images');

if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function renderSvgToPng(svgContent, pngPath, width, height) {
  const htmlTemp = pngPath.replace('.png', '_temp.html');
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: ${width}px; height: ${height}px; overflow: hidden; background: #070d1e; }
  svg { display: block; width: ${width}px; height: ${height}px; }
</style>
</head>
<body>
${svgContent}
</body>
</html>`;
  fs.writeFileSync(htmlTemp, htmlContent, 'utf-8');

  try {
    execFileSync(chromePath, [
      '--headless=new',
      `--screenshot=${pngPath}`,
      `--window-size=${width},${height}`,
      '--hide-scrollbars',
      `file:///${htmlTemp.replace(/\\/g, '/')}`
    ]);
    const stats = fs.statSync(pngPath);
    console.log(`Rendered PNG: ${path.basename(pngPath)} (${stats.size} bytes)`);
  } catch (err) {
    console.error(`Render failed for ${pngPath}:`, err.message);
  } finally {
    if (fs.existsSync(htmlTemp)) fs.unlinkSync(htmlTemp);
  }
}

// ========================================================
// 1. OPENGRAPH & HERO COVER CARD (1200 x 630)
// ========================================================
const coverSlug = 'ebay-seller-fees-2026-complete-managed-payments-schedule-guide';
const coverSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#070d1e" />
      <stop offset="50%" stop-color="#0b1736" />
      <stop offset="100%" stop-color="#050a17" />
    </linearGradient>
    <radialGradient id="glowBlue" cx="20%" cy="20%" r="50%">
      <stop offset="0%" stop-color="#2563eb" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#2563eb" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glowIndigo" cx="80%" cy="80%" r="50%">
      <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.30" />
      <stop offset="100%" stop-color="#4f46e5" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="cardGrad" x1="0" y1="0" x2="480" y2="480" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02" />
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#glowBlue)" />
  <rect width="1200" height="630" fill="url(#glowIndigo)" />

  <!-- Subtle Blueprint Grid Lines -->
  <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
    <line x1="80" y1="0" x2="80" y2="630" />
    <line x1="320" y1="0" x2="320" y2="630" />
    <line x1="600" y1="0" x2="600" y2="630" />
    <line x1="880" y1="0" x2="880" y2="630" />
    <line x1="1120" y1="0" x2="1120" y2="630" />
    <line x1="0" y1="110" x2="1200" y2="110" />
    <line x1="0" y1="280" x2="1200" y2="280" />
    <line x1="0" y1="450" x2="1200" y2="450" />
  </g>

  <!-- LEFT COLUMN: AUTHORITY HEADLINE -->
  <g transform="translate(80, 60)">
    <rect width="44" height="44" rx="12" fill="#2563eb" />
    <text x="22" y="28" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="900" text-anchor="middle">SC</text>
    <text x="56" y="25" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800">SmartRate<tspan fill="#60a5fa">Calcs</tspan></text>
    <text x="56" y="40" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="1.2">E-COMMERCE SELLER INTELLIGENCE - 2026</text>
  </g>

  <!-- Category Pill -->
  <g transform="translate(80, 140)">
    <rect width="360" height="34" rx="17" fill="#2563eb" fill-opacity="0.2" stroke="#2563eb" stroke-width="1.5" />
    <circle cx="20" cy="17" r="4" fill="#60a5fa" />
    <text x="34" y="22" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" letter-spacing="0.8">EBAY MANAGED PAYMENTS 2026</text>
  </g>

  <!-- Headline -->
  <text x="80" y="230" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="38" font-weight="900" letter-spacing="-0.8">
    <tspan x="80" dy="0">eBay Seller Fees in 2026:</tspan>
    <tspan x="80" dy="48" fill="#60a5fa">Managed Payments Schedule &amp; Profit Math</tspan>
  </text>

  <!-- Value Pill -->
  <g transform="translate(80, 330)">
    <rect width="500" height="38" rx="10" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-opacity="0.3" />
    <text x="16" y="25" fill="#34d399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">
      &#10003; 13.25% + $0.30 Cut - Top Rated Plus 10% Rebate - UK 0% Rule
    </text>
  </g>

  <!-- Trust Card -->
  <g transform="translate(80, 390)">
    <rect width="500" height="85" rx="16" fill="url(#cardGrad)" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1.5" />
    <circle cx="38" cy="42" r="18" fill="#2563eb" fill-opacity="0.3" />
    <text x="38" y="48" fill="#60a5fa" font-family="sans-serif" font-size="18" font-weight="900" text-anchor="middle">&#10003;</text>
    <text x="70" y="36" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">Official Category Fee Matrix &amp; Reverse Solver</text>
    <text x="70" y="58" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500">Break-Even Pricing - Store Subscriptions - 1099-K Thresholds</text>
  </g>

  <!-- Author Sign-off Footer -->
  <g transform="translate(80, 550)">
    <text x="0" y="0" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600">
      Researched &amp; Mathematically Modeled by <tspan fill="#e2e8f0" font-weight="800">Muhammad Naveed</tspan> &bull; Lead Systems Engineer
    </text>
  </g>

  <!-- RIGHT COLUMN: VISUAL DASHBOARD MOCKUP -->
  <g transform="translate(680, 80)">
    <!-- Main Card Body -->
    <rect width="440" height="470" rx="24" fill="#0f172a" fill-opacity="0.85" stroke="#334155" stroke-width="2" />

    <!-- Card Header Bar -->
    <rect width="440" height="60" rx="24" fill="#1e293b" />
    <rect y="36" width="440" height="24" fill="#1e293b" />
    <circle cx="30" cy="30" r="6" fill="#ef4444" />
    <circle cx="50" cy="30" r="6" fill="#f59e0b" />
    <circle cx="70" cy="30" r="6" fill="#10b981" />
    <text x="100" y="36" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700">eBay Order Breakdown Engine (2026)</text>

    <!-- Stat Row 1: Sale Price -->
    <g transform="translate(30, 80)">
      <rect width="380" height="65" rx="14" fill="#1e293b" fill-opacity="0.6" stroke="#334155" stroke-width="1" />
      <text x="20" y="28" fill="#94a3b8" font-family="sans-serif" font-size="11" font-weight="600">TOTAL GROSS SALE (ITEM + SHIPPING)</text>
      <text x="20" y="52" fill="#ffffff" font-family="sans-serif" font-size="20" font-weight="900">$100.00 USD</text>
      <rect x="270" y="18" width="90" height="28" rx="8" fill="#2563eb" fill-opacity="0.2" />
      <text x="315" y="37" fill="#60a5fa" font-family="sans-serif" font-size="11" font-weight="800" text-anchor="middle">Standard Tier</text>
    </g>

    <!-- Stat Row 2: Final Value Fee -->
    <g transform="translate(30, 160)">
      <rect width="380" height="65" rx="14" fill="#1e293b" fill-opacity="0.6" stroke="#334155" stroke-width="1" />
      <text x="20" y="28" fill="#94a3b8" font-family="sans-serif" font-size="11" font-weight="600">EBAY FINAL VALUE FEE (13.25% + $0.30)</text>
      <text x="20" y="52" fill="#f87171" font-family="sans-serif" font-size="20" font-weight="900">-$13.55 USD</text>
      <rect x="270" y="18" width="90" height="28" rx="8" fill="#ef4444" fill-opacity="0.2" />
      <text x="315" y="37" fill="#f87171" font-family="sans-serif" font-size="11" font-weight="800" text-anchor="middle">eBay Take</text>
    </g>

    <!-- Stat Row 3: Top Rated Plus Discount -->
    <g transform="translate(30, 240)">
      <rect width="380" height="65" rx="14" fill="#1e293b" fill-opacity="0.6" stroke="#334155" stroke-width="1" />
      <text x="20" y="28" fill="#94a3b8" font-family="sans-serif" font-size="11" font-weight="600">TOP RATED PLUS (10% FVF REBATE)</text>
      <text x="20" y="52" fill="#34d399" font-family="sans-serif" font-size="20" font-weight="900">+$1.33 SAVED</text>
      <rect x="270" y="18" width="90" height="28" rx="8" fill="#10b981" fill-opacity="0.2" />
      <text x="315" y="37" fill="#34d399" font-family="sans-serif" font-size="11" font-weight="800" text-anchor="middle">10% Off FVF</text>
    </g>

    <!-- Stat Row 4: Net Seller Take-Home -->
    <g transform="translate(30, 320)">
      <rect width="380" height="80" rx="16" fill="#1e293b" stroke="#10b981" stroke-width="2" />
      <text x="20" y="30" fill="#94a3b8" font-family="sans-serif" font-size="11" font-weight="700">NET SELLER BANK DEPOSIT</text>
      <text x="20" y="62" fill="#10b981" font-family="sans-serif" font-size="30" font-weight="900">$87.78 USD</text>
      <rect x="260" y="22" width="100" height="36" rx="10" fill="#10b981" fill-opacity="0.2" />
      <text x="310" y="45" fill="#34d399" font-family="sans-serif" font-size="12" font-weight="900" text-anchor="middle">87.8% Payout</text>
    </g>

    <!-- Footer Tag inside card -->
    <g transform="translate(30, 420)">
      <text x="190" y="20" fill="#64748b" font-family="sans-serif" font-size="11" font-weight="600" text-anchor="middle">
        smartratecalcs.com/calculators/ebay-fee-calculator
      </text>
    </g>
  </g>
</svg>`;

// Write cover SVG and render cover PNG
const coverSvgPath = path.join(blogDir, `${coverSlug}.svg`);
const coverPngPath = path.join(blogDir, `${coverSlug}.png`);
fs.writeFileSync(coverSvgPath, coverSvg, 'utf-8');
console.log(`Saved SVG: ${path.basename(coverSvgPath)}`);
renderSvgToPng(coverSvg, coverPngPath, 1200, 630);

// ========================================================
// 2. SUPPORTING INFOGRAPHIC: EBAY FEE TIER BREAKDOWN
// ========================================================
const tierBreakdownSvg = `<svg width="800" height="500" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="500" fill="#0b1329" rx="20" />
  <rect x="20" y="20" width="760" height="460" rx="16" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
  
  <text x="50" y="60" fill="#ffffff" font-family="sans-serif" font-size="20" font-weight="900">eBay 2026 Category Take Rates vs Store Rates</text>
  <text x="50" y="85" fill="#94a3b8" font-family="sans-serif" font-size="12" font-weight="600">Standard sellers vs Basic Store subscribers under Managed Payments</text>

  <!-- Item 1: Standard Categories -->
  <g transform="translate(50, 110)">
    <rect width="700" height="60" rx="12" fill="#1e293b" />
    <text x="20" y="35" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="700">Most Categories (Clothing, Toys, Home)</text>
    <rect x="420" y="16" width="120" height="28" rx="8" fill="#ef4444" fill-opacity="0.2" />
    <text x="480" y="35" fill="#f87171" font-family="sans-serif" font-size="12" font-weight="800" text-anchor="middle">Standard: 13.25%</text>
    <rect x="560" y="16" width="120" height="28" rx="8" fill="#10b981" fill-opacity="0.2" />
    <text x="620" y="35" fill="#34d399" font-family="sans-serif" font-size="12" font-weight="800" text-anchor="middle">Store: 12.35%</text>
  </g>

  <!-- Item 2: Electronics -->
  <g transform="translate(50, 185)">
    <rect width="700" height="60" rx="12" fill="#1e293b" />
    <text x="20" y="35" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="700">Computers, Tablets &amp; Hardware</text>
    <rect x="420" y="16" width="120" height="28" rx="8" fill="#ef4444" fill-opacity="0.2" />
    <text x="480" y="35" fill="#f87171" font-family="sans-serif" font-size="12" font-weight="800" text-anchor="middle">Standard: 13.25%</text>
    <rect x="560" y="16" width="120" height="28" rx="8" fill="#10b981" fill-opacity="0.2" />
    <text x="620" y="35" fill="#34d399" font-family="sans-serif" font-size="12" font-weight="800" text-anchor="middle">Store: 9.00%</text>
  </g>

  <!-- Item 3: Guitars -->
  <g transform="translate(50, 260)">
    <rect width="700" height="60" rx="12" fill="#1e293b" />
    <text x="20" y="35" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="700">Musical Instruments (Guitars &amp; Basses)</text>
    <rect x="420" y="16" width="120" height="28" rx="8" fill="#10b981" fill-opacity="0.2" />
    <text x="480" y="35" fill="#34d399" font-family="sans-serif" font-size="12" font-weight="800" text-anchor="middle">Standard: 6.35%</text>
    <rect x="560" y="16" width="120" height="28" rx="8" fill="#10b981" fill-opacity="0.2" />
    <text x="620" y="35" fill="#34d399" font-family="sans-serif" font-size="12" font-weight="800" text-anchor="middle">Store: 6.35%</text>
  </g>

  <!-- Item 4: Sneakers $150+ -->
  <g transform="translate(50, 335)">
    <rect width="700" height="60" rx="12" fill="#1e293b" />
    <text x="20" y="35" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="700">Athletic Sneakers ($150+ USD)</text>
    <rect x="420" y="16" width="120" height="28" rx="8" fill="#10b981" fill-opacity="0.2" />
    <text x="480" y="35" fill="#34d399" font-family="sans-serif" font-size="12" font-weight="800" text-anchor="middle">Standard: 8.00%</text>
    <rect x="560" y="16" width="120" height="28" rx="8" fill="#10b981" fill-opacity="0.2" />
    <text x="620" y="35" fill="#34d399" font-family="sans-serif" font-size="12" font-weight="800" text-anchor="middle">Store: 7.00%</text>
  </g>

  <!-- Footer -->
  <text x="400" y="440" fill="#64748b" font-family="sans-serif" font-size="11" font-weight="600" text-anchor="middle">
    Data verified from official eBay 2026 fee policies &bull; SmartRateCalcs Research
  </text>
</svg>`;

const tierSvgPath = path.join(imagesDir, 'ebay-fee-tier-breakdown.svg');
const tierPngPath = path.join(imagesDir, 'ebay-fee-tier-breakdown.png');
fs.writeFileSync(tierSvgPath, tierBreakdownSvg, 'utf-8');
renderSvgToPng(tierBreakdownSvg, tierPngPath, 800, 500);

// ========================================================
// 3. SUPPORTING INFOGRAPHIC: MANAGED PAYMENTS FLOW
// ========================================================
const flowSvg = `<svg width="800" height="420" viewBox="0 0 800 420" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="420" fill="#0b1329" rx="20" />
  <rect x="20" y="20" width="760" height="380" rx="16" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
  
  <text x="50" y="60" fill="#ffffff" font-family="sans-serif" font-size="20" font-weight="900">eBay Managed Payments Deduction Flow</text>
  <text x="50" y="85" fill="#94a3b8" font-family="sans-serif" font-size="12" font-weight="600">How gross buyer checkout is distributed before bank deposit</text>

  <!-- Step 1: Buyer Pays -->
  <g transform="translate(50, 120)">
    <rect width="200" height="180" rx="16" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
    <rect x="20" y="20" width="40" height="40" rx="10" fill="#2563eb" fill-opacity="0.2" />
    <text x="40" y="46" fill="#60a5fa" font-family="sans-serif" font-size="18" font-weight="900" text-anchor="middle">1</text>
    <text x="20" y="85" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="700">Gross Payment</text>
    <text x="20" y="110" fill="#94a3b8" font-family="sans-serif" font-size="11" font-weight="500">&bull; Item Listing Price</text>
    <text x="20" y="130" fill="#94a3b8" font-family="sans-serif" font-size="11" font-weight="500">&bull; Buyer Shipping</text>
    <text x="20" y="150" fill="#94a3b8" font-family="sans-serif" font-size="11" font-weight="500">&bull; State Sales Tax</text>
  </g>

  <!-- Arrow 1 -->
  <path d="M 270 210 L 300 210" stroke="#60a5fa" stroke-width="3" stroke-linecap="round" marker-end="url(#arrow)" />

  <!-- Step 2: eBay Cuts -->
  <g transform="translate(310, 120)">
    <rect width="200" height="180" rx="16" fill="#1e293b" stroke="#ef4444" stroke-width="1.5" />
    <rect x="20" y="20" width="40" height="40" rx="10" fill="#ef4444" fill-opacity="0.2" />
    <text x="40" y="46" fill="#f87171" font-family="sans-serif" font-size="18" font-weight="900" text-anchor="middle">2</text>
    <text x="20" y="85" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="700">eBay Deductions</text>
    <text x="20" y="110" fill="#f87171" font-family="sans-serif" font-size="11" font-weight="500">&bull; 13.25% FVF Cut</text>
    <text x="20" y="130" fill="#f87171" font-family="sans-serif" font-size="11" font-weight="500">&bull; $0.30 Fixed Fee</text>
    <text x="20" y="150" fill="#f87171" font-family="sans-serif" font-size="11" font-weight="500">&bull; Promoted Ads (opt)</text>
  </g>

  <!-- Arrow 2 -->
  <path d="M 530 210 L 560 210" stroke="#10b981" stroke-width="3" stroke-linecap="round" />

  <!-- Step 3: Payout to Bank -->
  <g transform="translate(570, 120)">
    <rect width="180" height="180" rx="16" fill="#1e293b" stroke="#10b981" stroke-width="2" />
    <rect x="20" y="20" width="40" height="40" rx="10" fill="#10b981" fill-opacity="0.2" />
    <text x="40" y="46" fill="#34d399" font-family="sans-serif" font-size="18" font-weight="900" text-anchor="middle">3</text>
    <text x="20" y="85" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="700">Bank Deposit</text>
    <text x="20" y="110" fill="#34d399" font-family="sans-serif" font-size="12" font-weight="800">Net Seller Payout</text>
    <text x="20" y="135" fill="#94a3b8" font-family="sans-serif" font-size="11" font-weight="500">Daily / Weekly ACH</text>
    <text x="20" y="155" fill="#94a3b8" font-family="sans-serif" font-size="11" font-weight="500">Zero PayPal Drag</text>
  </g>

  <!-- Footer -->
  <text x="400" y="360" fill="#64748b" font-family="sans-serif" font-size="11" font-weight="600" text-anchor="middle">
    Direct bank settlement via automated ACH &bull; SmartRateCalcs Architecture
  </text>
</svg>`;

const flowSvgPath = path.join(imagesDir, 'ebay-managed-payments-flow.svg');
const flowPngPath = path.join(imagesDir, 'ebay-managed-payments-flow.png');
fs.writeFileSync(flowSvgPath, flowSvg, 'utf-8');
renderSvgToPng(flowSvg, flowPngPath, 800, 420);

console.log('All eBay blog assets generated successfully!');
