// scripts/generate_amazon_blog_assets.js
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
  body { width: ${width}px; height: ${height}px; overflow: hidden; background: #070d1e; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
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
const coverSlug = 'amazon-fba-fees-2026-complete-seller-schedule-guide';
const coverSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0a0f1d" />
      <stop offset="50%" stop-color="#141a2e" />
      <stop offset="100%" stop-color="#080c18" />
    </linearGradient>
    <radialGradient id="glowAmber" cx="20%" cy="20%" r="55%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glowOrange" cx="80%" cy="75%" r="50%">
      <stop offset="0%" stop-color="#ea580c" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#ea580c" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#glowAmber)" />
  <rect width="1200" height="630" fill="url(#glowOrange)" />

  <!-- Subtle Grid Lines -->
  <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
    <line x1="80" y1="0" x2="80" y2="630" />
    <line x1="200" y1="0" x2="200" y2="630" />
    <line x1="400" y1="0" x2="400" y2="630" />
    <line x1="600" y1="0" x2="600" y2="630" />
    <line x1="800" y1="0" x2="800" y2="630" />
    <line x1="1000" y1="0" x2="1000" y2="630" />
    <line x1="0" y1="120" x2="1200" y2="120" />
    <line x1="0" y1="260" x2="1200" y2="260" />
    <line x1="0" y1="420" x2="1200" y2="420" />
    <line x1="0" y1="540" x2="1200" y2="540" />
  </g>

  <!-- Top Brand Header -->
  <g transform="translate(80, 60)">
    <rect width="36" height="36" rx="10" fill="#f59e0b" />
    <text x="18" y="24" fill="#ffffff" font-size="16" font-weight="900" text-anchor="middle" font-family="monospace">SR</text>
    <text x="48" y="24" fill="#ffffff" font-size="20" font-weight="800" letter-spacing="-0.5">SmartRate<tspan fill="#f59e0b">Calcs</tspan></text>
    <text x="210" y="23" fill="#64748b" font-size="14" font-weight="600">/ E-Commerce Seller Research</text>
  </g>

  <!-- Verified Badge -->
  <g transform="translate(930, 60)">
    <rect width="190" height="36" rx="18" fill="#1e293b" stroke="#f59e0b" stroke-width="1" />
    <circle cx="22" cy="18" r="5" fill="#f59e0b" />
    <text x="36" y="23" fill="#fbbf24" font-size="12" font-weight="700" letter-spacing="0.5">VERIFIED 2026 RATES</text>
  </g>

  <!-- Category Tag -->
  <g transform="translate(80, 140)">
    <rect width="210" height="30" rx="8" fill="#f59e0b" fill-opacity="0.15" stroke="#f59e0b" stroke-opacity="0.3" stroke-width="1" />
    <text x="16" y="20" fill="#fbbf24" font-size="12" font-weight="800" letter-spacing="1">AMAZON FBA &amp; FBM 2026</text>
  </g>

  <!-- Main Headline -->
  <text x="80" y="235" fill="#ffffff" font-size="44" font-weight="900" letter-spacing="-1.2">
    Amazon FBA Fees in 2026:
  </text>
  <text x="80" y="295" fill="#f59e0b" font-size="40" font-weight="800" letter-spacing="-1">
    Complete Seller Schedule &amp; Margin Guide
  </text>

  <!-- Subtitle -->
  <text x="80" y="348" fill="#94a3b8" font-size="18" font-weight="500">
    FBA Pick &amp; Pack Tiers | 8% - 15% Referral Rates | Inbound Placement &amp; Net Margin Math
  </text>

  <!-- 3 Pillar Data Cards at Bottom -->
  <g transform="translate(80, 400)">
    <!-- Card 1: Referral Rates -->
    <rect x="0" y="0" width="320" height="150" rx="16" fill="#0f172a" stroke="#334155" stroke-width="1" />
    <text x="24" y="36" fill="#94a3b8" font-size="12" font-weight="700" letter-spacing="0.5">CATEGORY REFERRAL CUT</text>
    <text x="24" y="80" fill="#f59e0b" font-size="34" font-weight="900" font-family="monospace">8% - 15%</text>
    <text x="24" y="112" fill="#cbd5e1" font-size="13" font-weight="500">Standard $0.30 per-item min</text>
    <text x="24" y="130" fill="#64748b" font-size="11" font-weight="500">Apparel 5% under $15 | Tech 8%</text>
  </g>

  <g transform="translate(440, 400)">
    <!-- Card 2: FBA Pick & Pack -->
    <rect x="0" y="0" width="320" height="150" rx="16" fill="#0f172a" stroke="#334155" stroke-width="1" />
    <text x="24" y="36" fill="#94a3b8" font-size="12" font-weight="700" letter-spacing="0.5">FBA PICK &amp; PACK FEES</text>
    <text x="24" y="80" fill="#38bdf8" font-size="34" font-weight="900" font-family="monospace">$3.22 - $7+</text>
    <text x="24" y="112" fill="#cbd5e1" font-size="13" font-weight="500">Tiered by shipping weight &amp; size</text>
    <text x="24" y="130" fill="#64748b" font-size="11" font-weight="500">Small standard &amp; Large standard</text>
  </g>

  <g transform="translate(800, 400)">
    <!-- Card 3: Inbound Placement -->
    <rect x="0" y="0" width="320" height="150" rx="16" fill="#0f172a" stroke="#334155" stroke-width="1" />
    <text x="24" y="36" fill="#94a3b8" font-size="12" font-weight="700" letter-spacing="0.5">2026 INBOUND PLACEMENT</text>
    <text x="24" y="80" fill="#10b981" font-size="34" font-weight="900" font-family="monospace">$0.21 - $0.34</text>
    <text x="24" y="112" fill="#cbd5e1" font-size="13" font-weight="500">Single destination split fee</text>
    <text x="24" y="130" fill="#64748b" font-size="11" font-weight="500">$0.00 on distributed splits</text>
  </g>
</svg>`;

// ========================================================
// 2. INFOGRAPHIC FIGURE 1: AMZN FEE DEDUCTION FLOW (800 x 480)
// ========================================================
const fig1Slug = 'amazon-fee-structure-breakdown';
const fig1Svg = `<svg width="800" height="480" viewBox="0 0 800 480" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="480" rx="16" fill="#090e1d" />
  <rect width="798" height="478" x="1" y="1" rx="15" stroke="#1e293b" stroke-width="1" />

  <!-- Title Header -->
  <text x="40" y="45" fill="#ffffff" font-size="20" font-weight="800">Figure 1: Anatomy of an Amazon FBA Sale Payout (2026)</text>
  <text x="40" y="70" fill="#94a3b8" font-size="12" font-weight="500">How gross customer payment is deducted before seller bank disbursement</text>

  <!-- Step 1: Gross Sale -->
  <g transform="translate(40, 100)">
    <rect width="210" height="340" rx="14" fill="#0f172a" stroke="#334155" stroke-width="1" />
    <rect width="210" height="40" rx="14" fill="#f59e0b" fill-opacity="0.15" />
    <text x="16" y="26" fill="#fbbf24" font-size="13" font-weight="800">1. GROSS REVENUE</text>
    
    <text x="16" y="75" fill="#cbd5e1" font-size="12" font-weight="600">Product List Price</text>
    <text x="16" y="98" fill="#ffffff" font-size="20" font-weight="900" font-family="monospace">$35.00</text>
    
    <text x="16" y="140" fill="#cbd5e1" font-size="12" font-weight="600">Shipping Charged</text>
    <text x="16" y="160" fill="#94a3b8" font-size="14" font-weight="700" font-family="monospace">$0.00 (Prime)</text>

    <text x="16" y="205" fill="#cbd5e1" font-size="12" font-weight="600">Total Buyer Paid</text>
    <text x="16" y="228" fill="#38bdf8" font-size="22" font-weight="900" font-family="monospace">$35.00</text>

    <text x="16" y="275" fill="#64748b" font-size="11" font-weight="500">Collected by Amazon</text>
    <text x="16" y="295" fill="#64748b" font-size="11" font-weight="500">at checkout</text>
  </g>

  <!-- Arrow 1 -->
  <path d="M 265 260 L 295 260" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 4" />
  <polygon points="295,255 305,260 295,265" fill="#f59e0b" />

  <!-- Step 2: Amazon Deductions -->
  <g transform="translate(315, 100)">
    <rect width="240" height="340" rx="14" fill="#0f172a" stroke="#e11d48" stroke-opacity="0.4" stroke-width="1" />
    <rect width="240" height="40" rx="14" fill="#e11d48" fill-opacity="0.15" />
    <text x="16" y="26" fill="#fb7185" font-size="13" font-weight="800">2. AMAZON FEES (2026)</text>

    <text x="16" y="75" fill="#cbd5e1" font-size="11" font-weight="600">Referral Fee (15%)</text>
    <text x="190" y="75" fill="#fb7185" font-size="12" font-weight="800" font-family="monospace">-$5.25</text>

    <text x="16" y="115" fill="#cbd5e1" font-size="11" font-weight="600">FBA Pick &amp; Pack (Large Std)</text>
    <text x="190" y="115" fill="#fb7185" font-size="12" font-weight="800" font-family="monospace">-$4.08</text>

    <text x="16" y="155" fill="#cbd5e1" font-size="11" font-weight="600">Inbound Placement Fee</text>
    <text x="190" y="155" fill="#fb7185" font-size="12" font-weight="800" font-family="monospace">-$0.27</text>

    <text x="16" y="195" fill="#cbd5e1" font-size="11" font-weight="600">Monthly Storage (Est)</text>
    <text x="190" y="195" fill="#fb7185" font-size="12" font-weight="800" font-family="monospace">-$0.22</text>

    <line x1="16" y1="225" x2="224" y2="225" stroke="#334155" stroke-width="1" />

    <text x="16" y="255" fill="#cbd5e1" font-size="12" font-weight="700">Total Amazon Take</text>
    <text x="16" y="285" fill="#f43f5e" font-size="22" font-weight="900" font-family="monospace">-$9.82 (28%)</text>

    <text x="16" y="315" fill="#64748b" font-size="11" font-weight="500">Auto-deducted from balance</text>
  </g>

  <!-- Arrow 2 -->
  <path d="M 570 260 L 600 260" stroke="#10b981" stroke-width="2" stroke-dasharray="4 4" />
  <polygon points="600,255 610,260 600,265" fill="#10b981" />

  <!-- Step 3: Net Cash In Hand -->
  <g transform="translate(620, 100)">
    <rect width="140" height="340" rx="14" fill="#0f172a" stroke="#10b981" stroke-opacity="0.5" stroke-width="1" />
    <rect width="140" height="40" rx="14" fill="#10b981" fill-opacity="0.15" />
    <text x="12" y="26" fill="#34d399" font-size="12" font-weight="800">3. NET PROFIT</text>

    <text x="12" y="75" fill="#cbd5e1" font-size="10" font-weight="600">Net Amazon Payout</text>
    <text x="12" y="98" fill="#38bdf8" font-size="15" font-weight="900" font-family="monospace">$25.18</text>

    <text x="12" y="135" fill="#cbd5e1" font-size="10" font-weight="600">Product COGS</text>
    <text x="12" y="155" fill="#f43f5e" font-size="13" font-weight="700" font-family="monospace">-$8.50</text>

    <text x="12" y="185" fill="#cbd5e1" font-size="10" font-weight="600">Inbound Freight</text>
    <text x="12" y="205" fill="#f43f5e" font-size="13" font-weight="700" font-family="monospace">-$0.85</text>

    <line x1="12" y1="225" x2="128" y2="225" stroke="#334155" stroke-width="1" />

    <text x="12" y="250" fill="#34d399" font-size="11" font-weight="700">Clear Profit</text>
    <text x="12" y="280" fill="#10b981" font-size="20" font-weight="900" font-family="monospace">+$15.83</text>
    <text x="12" y="305" fill="#34d399" font-size="11" font-weight="700">45.2% Margin</text>
  </g>
</svg>`;

// ========================================================
// 3. INFOGRAPHIC FIGURE 2: FBA VS FBM COMPARISON (800 x 480)
// ========================================================
const fig2Slug = 'amazon-fba-vs-fbm-flowchart';
const fig2Svg = `<svg width="800" height="480" viewBox="0 0 800 480" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="480" rx="16" fill="#090e1d" />
  <rect width="798" height="478" x="1" y="1" rx="15" stroke="#1e293b" stroke-width="1" />

  <!-- Title Header -->
  <text x="40" y="45" fill="#ffffff" font-size="20" font-weight="800">Figure 2: Amazon FBA vs FBM Strategic Decision Matrix</text>
  <text x="40" y="70" fill="#94a3b8" font-size="12" font-weight="500">Choosing the optimal fulfillment method based on unit weight, margins, and sales velocity</text>

  <!-- Column 1: FBA Prime Path -->
  <g transform="translate(40, 100)">
    <rect width="340" height="340" rx="14" fill="#0f172a" stroke="#f59e0b" stroke-opacity="0.4" stroke-width="1" />
    <rect width="340" height="45" rx="14" fill="#f59e0b" fill-opacity="0.15" />
    <text x="20" y="28" fill="#fbbf24" font-size="14" font-weight="800">PATH A: FBA (Fulfilled by Amazon)</text>

    <!-- Checklist items -->
    <g transform="translate(20, 65)">
      <circle cx="10" cy="10" r="8" fill="#10b981" />
      <text x="28" y="15" fill="#ffffff" font-size="12" font-weight="700">Prime Badge: 2x to 4x Higher Conversion</text>
      <text x="28" y="32" fill="#94a3b8" font-size="11">Algorithm prioritizes Prime for Buy Box dominance</text>
    </g>

    <g transform="translate(20, 120)">
      <circle cx="10" cy="10" r="8" fill="#10b981" />
      <text x="28" y="15" fill="#ffffff" font-size="12" font-weight="700">Zero Customer Support Overhead</text>
      <text x="28" y="32" fill="#94a3b8" font-size="11">Amazon manages packing, shipping, 24/7 returns</text>
    </g>

    <g transform="translate(20, 175)">
      <circle cx="10" cy="10" r="8" fill="#f59e0b" />
      <text x="28" y="15" fill="#ffffff" font-size="12" font-weight="700">Best For: Lightweight Products (&lt; 2 lbs)</text>
      <text x="28" y="32" fill="#94a3b8" font-size="11">Standard sizes keep Pick &amp; Pack under $5.40</text>
    </g>

    <g transform="translate(20, 230)">
      <circle cx="10" cy="10" r="8" fill="#e11d48" />
      <text x="28" y="15" fill="#ffffff" font-size="12" font-weight="700">Warning: Inbound &amp; Storage Fees</text>
      <text x="28" y="32" fill="#94a3b8" font-size="11">Q4 storage jumps 3.1x; requires 30-day inventory turns</text>
    </g>

    <rect x="20" y="280" width="300" height="36" rx="8" fill="#f59e0b" fill-opacity="0.1" stroke="#f59e0b" stroke-opacity="0.3" stroke-width="1" />
    <text x="170" y="303" fill="#fbbf24" font-size="11" font-weight="800" text-anchor="middle">VERDICT: Best for Scale &amp; Fast-Turnover Goods</text>
  </g>

  <!-- Column 2: FBM Merchant Path -->
  <g transform="translate(420, 100)">
    <rect width="340" height="340" rx="14" fill="#0f172a" stroke="#38bdf8" stroke-opacity="0.4" stroke-width="1" />
    <rect width="340" height="45" rx="14" fill="#38bdf8" fill-opacity="0.15" />
    <text x="20" y="28" fill="#38bdf8" font-size="14" font-weight="800">PATH B: FBM (Fulfilled by Merchant)</text>

    <!-- Checklist items -->
    <g transform="translate(20, 65)">
      <circle cx="10" cy="10" r="8" fill="#10b981" />
      <text x="28" y="15" fill="#ffffff" font-size="12" font-weight="700">Zero Amazon Storage or Inbound Fees</text>
      <text x="28" y="32" fill="#94a3b8" font-size="11">Store goods in own garage, office, or local 3PL</text>
    </g>

    <g transform="translate(20, 120)">
      <circle cx="10" cy="10" r="8" fill="#10b981" />
      <text x="28" y="15" fill="#ffffff" font-size="12" font-weight="700">Best For: Heavy, Oversize, or Custom</text>
      <text x="28" y="32" fill="#94a3b8" font-size="11">Furniture, commercial gear, custom engravings</text>
    </g>

    <g transform="translate(20, 175)">
      <circle cx="10" cy="10" r="8" fill="#f59e0b" />
      <text x="28" y="15" fill="#ffffff" font-size="12" font-weight="700">Complete Brand Control Over Packaging</text>
      <text x="28" y="32" fill="#94a3b8" font-size="11">Insert promotional cards, stickers, and branded boxes</text>
    </g>

    <g transform="translate(20, 230)">
      <circle cx="10" cy="10" r="8" fill="#e11d48" />
      <text x="28" y="15" fill="#ffffff" font-size="12" font-weight="700">Warning: Lower Buy Box Win Rate</text>
      <text x="28" y="32" fill="#94a3b8" font-size="11">Must price 5% to 10% below FBA to win Buy Box</text>
    </g>

    <rect x="20" y="280" width="300" height="36" rx="8" fill="#38bdf8" fill-opacity="0.1" stroke="#38bdf8" stroke-opacity="0.3" stroke-width="1" />
    <text x="170" y="303" fill="#38bdf8" font-size="11" font-weight="800" text-anchor="middle">VERDICT: Best for Bulky, Heavy &amp; Low-Velocity Items</text>
  </g>
</svg>`;

// Write SVGs
fs.writeFileSync(path.join(blogDir, `${coverSlug}.svg`), coverSvg, 'utf-8');
fs.writeFileSync(path.join(imagesDir, `${fig1Slug}.svg`), fig1Svg, 'utf-8');
fs.writeFileSync(path.join(imagesDir, `${fig2Slug}.svg`), fig2Svg, 'utf-8');

console.log('Saved 3 SVGs. Now rendering to high-res PNG...');

// Render PNGs
renderSvgToPng(coverSvg, path.join(blogDir, `${coverSlug}.png`), 1200, 630);
renderSvgToPng(fig1Svg, path.join(imagesDir, `${fig1Slug}.png`), 800, 480);
renderSvgToPng(fig2Svg, path.join(imagesDir, `${fig2Slug}.png`), 800, 480);

console.log('All Amazon blog assets generated successfully!');
