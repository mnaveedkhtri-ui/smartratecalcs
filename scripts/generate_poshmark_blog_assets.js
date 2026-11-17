// scripts/generate_poshmark_blog_assets.js
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
  body { width: ${width}px; height: ${height}px; overflow: hidden; background: #0f0206; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
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
const coverSlug = 'poshmark-fees-2026-complete-seller-guide-shipping-margins';
const coverSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#140308" />
      <stop offset="50%" stop-color="#2a0614" />
      <stop offset="100%" stop-color="#0d0205" />
    </linearGradient>
    <radialGradient id="glowRose" cx="20%" cy="20%" r="55%">
      <stop offset="0%" stop-color="#e11d48" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#e11d48" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glowPink" cx="80%" cy="75%" r="50%">
      <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.20" />
      <stop offset="100%" stop-color="#f43f5e" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#glowRose)" />
  <rect width="1200" height="630" fill="url(#glowPink)" />

  <!-- Subtle Grid lines -->
  <g stroke="rgba(255,255,255,0.04)" stroke-width="1">
    <line x1="0" y1="126" x2="1200" y2="126" />
    <line x1="0" y1="252" x2="1200" y2="252" />
    <line x1="0" y1="378" x2="1200" y2="378" />
    <line x1="0" y1="504" x2="1200" y2="504" />
    <line x1="240" y1="0" x2="240" y2="630" />
    <line x1="480" y1="0" x2="480" y2="630" />
    <line x1="720" y1="0" x2="720" y2="630" />
    <line x1="960" y1="0" x2="960" y2="630" />
  </g>

  <!-- Brand Pill -->
  <g transform="translate(80, 70)">
    <rect width="320" height="38" rx="19" fill="rgba(225, 29, 72, 0.15)" stroke="rgba(225, 29, 72, 0.4)" stroke-width="1" />
    <circle cx="20" cy="19" r="6" fill="#e11d48" />
    <text x="36" y="24" fill="#fda4af" font-size="13" font-family="-apple-system, sans-serif" font-weight="700" letter-spacing="1.2">SMARTRATECALCS RESELLER HUB</text>
  </g>

  <!-- Year Badge -->
  <g transform="translate(1010, 70)">
    <rect width="110" height="38" rx="19" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
    <text x="55" y="24" text-anchor="middle" fill="#ffffff" font-size="14" font-family="-apple-system, sans-serif" font-weight="800">2026 GUIDE</text>
  </g>

  <!-- Main Headline -->
  <text x="80" y="180" fill="#ffffff" font-size="52" font-family="-apple-system, sans-serif" font-weight="900" letter-spacing="-1.5">
    Poshmark Fees in 2026:
  </text>
  <text x="80" y="242" fill="#fb7185" font-size="44" font-family="-apple-system, sans-serif" font-weight="800" letter-spacing="-1">
    Complete Seller Schedule &amp; Profit Guide
  </text>

  <!-- Subhead -->
  <text x="80" y="295" fill="#e2e8f0" font-size="19" font-family="-apple-system, sans-serif" font-weight="500">
    $2.95 Flat vs 20% Fee Tiers | Offer to Likers Math | USPS Priority Labels | Reverse Solver
  </text>

  <!-- 3 Pillar Stat Cards -->
  <g transform="translate(80, 345)">
    <!-- Card 1: Sub-$15 Tier -->
    <rect width="320" height="195" rx="20" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(251, 113, 133, 0.3)" stroke-width="1.5" />
    <text x="24" y="40" fill="#94a3b8" font-size="12" font-weight="700" letter-spacing="1">SALES UNDER $15.00</text>
    <text x="24" y="92" fill="#fda4af" font-size="38" font-weight="900" font-family="monospace">$2.95</text>
    <text x="24" y="125" fill="#f43f5e" font-size="14" font-weight="700">Flat Platform Fee</text>
    <text x="24" y="152" fill="#cbd5e1" font-size="13">High effective cut (up to 37%)</text>
    <text x="24" y="172" fill="#64748b" font-size="11">Group low items into bundles</text>

    <!-- Card 2: Standard 20% Tier -->
    <g transform="translate(345, 0)">
      <rect width="330" height="195" rx="20" fill="rgba(225, 29, 72, 0.08)" stroke="rgba(225, 29, 72, 0.45)" stroke-width="1.5" />
      <text x="24" y="40" fill="#fda4af" font-size="12" font-weight="700" letter-spacing="1">SALES $15.00 AND ABOVE</text>
      <text x="24" y="92" fill="#ffffff" font-size="38" font-weight="900" font-family="monospace">20.0%</text>
      <text x="24" y="125" fill="#fb7185" font-size="14" font-weight="700">Flat Commission</text>
      <text x="24" y="152" fill="#e2e8f0" font-size="13">Zero separate payment cuts</text>
      <text x="24" y="172" fill="#94a3b8" font-size="11">Keep 80% of listing gross</text>
    </g>

    <!-- Card 3: Shipping Subsidies -->
    <g transform="translate(700, 0)">
      <rect width="340" height="195" rx="20" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1.5" />
      <text x="24" y="40" fill="#94a3b8" font-size="12" font-weight="700" letter-spacing="1">OFFER TO LIKERS (OTL)</text>
      <text x="24" y="92" fill="#38bdf8" font-size="38" font-weight="900" font-family="monospace">-$2.02</text>
      <text x="24" y="125" fill="#7dd3fc" font-size="14" font-weight="700">Seller Shipping Deduction</text>
      <text x="24" y="152" fill="#cbd5e1" font-size="13">Covers buyer $5.95 promo</text>
      <text x="24" y="172" fill="#64748b" font-size="11">Prepaid USPS Priority up to 5 lbs</text>
    </g>
  </g>

  <!-- Bottom Authority Bar -->
  <g transform="translate(80, 575)">
    <text x="0" y="18" fill="#64748b" font-size="12" font-weight="600">SMARTRATECALCS.COM / RESEARCH &amp; VALUATION ENGINEERING</text>
    <text x="1040" y="18" text-anchor="end" fill="#94a3b8" font-size="12" font-weight="700">AUTHORED BY MUHAMMAD NAVEED</text>
  </g>
</svg>`;

// ========================================================
// 2. INFOGRAPHIC 1: TWO-TIER FEE SCHEDULE (800 x 480)
// ========================================================
const info1Path = path.join(imagesDir, 'poshmark-two-tier-fee-schedule');
const info1Svg = `<svg width="800" height="480" viewBox="0 0 800 480" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="480" rx="20" fill="#140308" />
  <rect width="800" height="480" rx="20" stroke="rgba(225, 29, 72, 0.3)" stroke-width="2" />

  <!-- Title -->
  <text x="40" y="45" fill="#fda4af" font-size="12" font-weight="800" letter-spacing="1.5">POSHMARK FEE ARCHITECTURE</text>
  <text x="40" y="80" fill="#ffffff" font-size="24" font-weight="800">The $15 Inflection Point: Sub-$15 vs Standard Tiers</text>

  <!-- Left Column: Under $15 -->
  <g transform="translate(40, 115)">
    <rect width="340" height="310" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(251, 113, 133, 0.35)" stroke-width="1.5" />
    <rect width="340" height="44" rx="16" fill="rgba(225, 29, 72, 0.15)" />
    <text x="20" y="28" fill="#fda4af" font-size="14" font-weight="800">SALES UNDER $15.00</text>

    <text x="20" y="80" fill="#ffffff" font-size="13" font-weight="600">Fee Calculation:</text>
    <text x="20" y="115" fill="#f43f5e" font-size="28" font-weight="900" font-family="monospace">Flat $2.95</text>

    <g transform="translate(20, 135)" font-size="12" fill="#cbd5e1">
      <text y="20">• $8.00 Sale → $2.95 Fee (36.9% effective)</text>
      <text y="45">• $10.00 Sale → $2.95 Fee (29.5% effective)</text>
      <text y="70">• $14.00 Sale → $2.95 Fee (21.1% effective)</text>
    </g>

    <rect x="20" y="230" width="300" height="60" rx="10" fill="rgba(244, 63, 94, 0.1)" stroke="rgba(244, 63, 94, 0.3)" />
    <text x="30" y="252" fill="#fb7185" font-size="11" font-weight="700">WARNING: The $14.99 Pricing Trap</text>
    <text x="30" y="272" fill="#e2e8f0" font-size="10">Selling at $14 nets $11.05. Selling at $15 nets $12.00!</text>
  </g>

  <!-- Right Column: $15 and Above -->
  <g transform="translate(420, 115)">
    <rect width="340" height="310" rx="16" fill="rgba(225, 29, 72, 0.06)" stroke="rgba(225, 29, 72, 0.45)" stroke-width="1.5" />
    <rect width="340" height="44" rx="16" fill="rgba(225, 29, 72, 0.25)" />
    <text x="20" y="28" fill="#ffffff" font-size="14" font-weight="800">SALES $15.00 AND ABOVE</text>

    <text x="20" y="80" fill="#ffffff" font-size="13" font-weight="600">Fee Calculation:</text>
    <text x="20" y="115" fill="#4ade80" font-size="28" font-weight="900" font-family="monospace">Flat 20.0%</text>

    <g transform="translate(20, 135)" font-size="12" fill="#cbd5e1">
      <text y="20">• $25.00 Sale → $5.00 Fee (Net: $20.00)</text>
      <text y="45">• $50.00 Sale → $10.00 Fee (Net: $40.00)</text>
      <text y="70">• $100.00 Sale → $20.00 Fee (Net: $80.00)</text>
    </g>

    <rect x="20" y="230" width="300" height="60" rx="10" fill="rgba(74, 222, 128, 0.1)" stroke="rgba(74, 222, 128, 0.3)" />
    <text x="30" y="252" fill="#4ade80" font-size="11" font-weight="700">ADVANTAGE: No Hidden Gateway Cuts</text>
    <text x="30" y="272" fill="#e2e8f0" font-size="10">Unlike eBay/Etsy, zero separate 3% credit card fees!</text>
  </g>
</svg>`;

// ========================================================
// 3. INFOGRAPHIC 2: OFFER TO LIKERS PROFIT FLOW (800 x 480)
// ========================================================
const info2Path = path.join(imagesDir, 'poshmark-offer-to-likers-profit-flow');
const info2Svg = `<svg width="800" height="480" viewBox="0 0 800 480" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="480" rx="20" fill="#140308" />
  <rect width="800" height="480" rx="20" stroke="rgba(225, 29, 72, 0.3)" stroke-width="2" />

  <!-- Title -->
  <text x="40" y="45" fill="#38bdf8" font-size="12" font-weight="800" letter-spacing="1.5">OFFER TO LIKERS (OTL) CASHFLOW</text>
  <text x="40" y="80" fill="#ffffff" font-size="24" font-weight="800">Where Does Your Sale Money Actually Go?</text>

  <!-- Step-by-Step Flowchart -->
  <g transform="translate(40, 115)">
    <!-- Box 1: Listing Price -->
    <rect width="150" height="110" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
    <text x="15" y="30" fill="#94a3b8" font-size="11" font-weight="700">LISTING PRICE</text>
    <text x="15" y="65" fill="#ffffff" font-size="22" font-weight="900" font-family="monospace">$50.00</text>
    <text x="15" y="90" fill="#64748b" font-size="10">Initial listing</text>

    <!-- Arrow 1 -->
    <text x="165" y="65" fill="#fb7185" font-size="18" font-weight="900">→</text>

    <!-- Box 2: 10% Drop Offer -->
    <g transform="translate(190, 0)">
      <rect width="165" height="110" rx="12" fill="rgba(251, 113, 133, 0.08)" stroke="rgba(251, 113, 133, 0.4)" />
      <text x="15" y="30" fill="#fda4af" font-size="11" font-weight="700">10% OTL DROP</text>
      <text x="15" y="65" fill="#fb7185" font-size="22" font-weight="900" font-family="monospace">$45.00</text>
      <text x="15" y="90" fill="#fda4af" font-size="10">Mandatory 10%+ cut</text>
    </g>

    <!-- Arrow 2 -->
    <text x="370" y="65" fill="#fb7185" font-size="18" font-weight="900">→</text>

    <!-- Box 3: Poshmark 20% -->
    <g transform="translate(395, 0)">
      <rect width="165" height="110" rx="12" fill="rgba(244, 63, 94, 0.12)" stroke="rgba(244, 63, 94, 0.5)" />
      <text x="15" y="30" fill="#f43f5e" font-size="11" font-weight="700">POSHMARK 20%</text>
      <text x="15" y="65" fill="#f43f5e" font-size="22" font-weight="900" font-family="monospace">-$9.00</text>
      <text x="15" y="90" fill="#fca5a5" font-size="10">20% of $45 offer</text>
    </g>

    <!-- Arrow 3 -->
    <text x="575" y="65" fill="#38bdf8" font-size="18" font-weight="900">→</text>

    <!-- Box 4: Shipping Subsidy -->
    <g transform="translate(600, 0)">
      <rect width="120" height="110" rx="12" fill="rgba(56, 189, 248, 0.1)" stroke="rgba(56, 189, 248, 0.4)" />
      <text x="12" y="30" fill="#38bdf8" font-size="11" font-weight="700">SHIP PROMO</text>
      <text x="12" y="65" fill="#38bdf8" font-size="22" font-weight="900" font-family="monospace">-$2.02</text>
      <text x="12" y="90" fill="#7dd3fc" font-size="10">$5.95 buyer rate</text>
    </g>
  </g>

  <!-- Payout Summary Bar -->
  <g transform="translate(40, 255)">
    <rect width="720" height="175" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" />
    
    <text x="25" y="35" fill="#94a3b8" font-size="12" font-weight="700">NET CASH BREAKDOWN ON $45 ACCEPTED OFFER:</text>

    <g transform="translate(25, 60)" font-size="13" font-family="monospace">
      <text y="0" fill="#e2e8f0">Poshmark Net Deposit: <tspan fill="#38bdf8" font-weight="700">$33.98</tspan> ($45.00 - $9.00 - $2.02)</text>
      <text y="28" fill="#e2e8f0">Minus Thrift Cost (COGS): <tspan fill="#fbbf24" font-weight="700">-$8.00</tspan></text>
      <text y="56" fill="#e2e8f0">Minus Polymailer &amp; Supplies: <tspan fill="#94a3b8">-$1.20</tspan></text>
      <line x1="0" y1="70" x2="670" y2="70" stroke="rgba(255,255,255,0.15)" />
      <text y="95" fill="#4ade80" font-size="16" font-weight="900">REAL NET CASH IN POCKET: $24.78 (55.1% Real Profit Margin)</text>
    </g>
  </g>
</svg>`;

// Write SVGs and Render PNGs
console.log('Generating Poshmark Blog Graphics...');

// 1. Cover
const coverSvgPath = path.join(blogDir, `${coverSlug}.svg`);
const coverPngPath = path.join(blogDir, `${coverSlug}.png`);
fs.writeFileSync(coverSvgPath, coverSvg, 'utf-8');
renderSvgToPng(coverSvg, coverPngPath, 1200, 630);

// 2. Infographic 1
fs.writeFileSync(`${info1Path}.svg`, info1Svg, 'utf-8');
renderSvgToPng(info1Svg, `${info1Path}.png`, 800, 480);

// 3. Infographic 2
fs.writeFileSync(`${info2Path}.svg`, info2Svg, 'utf-8');
renderSvgToPng(info2Svg, `${info2Path}.png`, 800, 480);

console.log('All Poshmark Blog Graphics generated successfully!');
