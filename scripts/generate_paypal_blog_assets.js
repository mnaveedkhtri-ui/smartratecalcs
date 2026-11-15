// scripts/generate_paypal_blog_assets.js
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
  body { width: ${width}px; height: ${height}px; overflow: hidden; background: #0b1329; }
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
// 1. OPENGRAPH COVER CARD (1200 x 630)
// ========================================================
const coverSlug = 'paypal-goods-and-services-fee-who-pays-calculator-guide';
const coverSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#070d1e" />
      <stop offset="50%" stop-color="#0b1736" />
      <stop offset="100%" stop-color="#050a17" />
    </linearGradient>
    <radialGradient id="glowBlue" cx="20%" cy="20%" r="50%">
      <stop offset="0%" stop-color="#0070ba" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#0070ba" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glowEmerald" cx="80%" cy="80%" r="50%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#10b981" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="cardGrad" x1="0" y1="0" x2="480" y2="480" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02" />
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#glowBlue)" />
  <rect width="1200" height="630" fill="url(#glowEmerald)" />

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
    <rect width="44" height="44" rx="12" fill="#0070ba" />
    <text x="22" y="28" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="900" text-anchor="middle">SC</text>
    <text x="56" y="25" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800">SmartRate<tspan fill="#38bdf8">Calcs</tspan></text>
    <text x="56" y="40" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="1.2">PAYMENT FEE INTELLIGENCE - 2026</text>
  </g>

  <!-- Category Pill -->
  <g transform="translate(80, 140)">
    <rect width="320" height="34" rx="17" fill="#0070ba" fill-opacity="0.2" stroke="#0070ba" stroke-width="1.5" />
    <circle cx="20" cy="17" r="4" fill="#38bdf8" />
    <text x="34" y="22" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" letter-spacing="0.8">PAYPAL GOODS &amp; SERVICES 2026</text>
  </g>

  <!-- Headline -->
  <text x="80" y="230" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="38" font-weight="900" letter-spacing="-0.8">
    <tspan x="80" dy="0">PayPal Goods &amp; Services Fee:</tspan>
    <tspan x="80" dy="48" fill="#38bdf8">Who Pays, Rates &amp; Net Math</tspan>
  </text>

  <!-- Value Pill -->
  <g transform="translate(80, 330)">
    <rect width="460" height="38" rx="10" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-opacity="0.3" />
    <text x="16" y="25" fill="#34d399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">
      &#10003; 2.99% + $0.49 Domestic Cut - Seller Pays - IRS 1099-K Rules
    </text>
  </g>

  <!-- Trust Card -->
  <g transform="translate(80, 390)">
    <rect width="460" height="85" rx="16" fill="url(#cardGrad)" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1.5" />
    <circle cx="38" cy="42" r="18" fill="#0070ba" fill-opacity="0.3" />
    <text x="38" y="48" fill="#38bdf8" font-family="sans-serif" font-size="18" font-weight="900" text-anchor="middle">&#10003;</text>
    <text x="70" y="36" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">Empirical 2026 Fee Schedule</text>
    <text x="70" y="58" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500">Reverse Invoicing Solver - F&amp;F vs G&amp;S Protection Breakdown</text>
  </g>

  <!-- Author Sign-off Footer -->
  <g transform="translate(80, 550)">
    <text x="0" y="0" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600">
      Research Lead: <tspan fill="#e2e8f0" font-weight="800">Muhammad Naveed</tspan> - SmartRateCalcs Financial Team
    </text>
  </g>

  <!-- RIGHT COLUMN: FINANCIAL STAT CARD -->
  <g transform="translate(620, 80)">
    <rect width="500" height="460" rx="24" fill="#0f1f44" stroke="#1e3a7a" stroke-width="2" />

    <!-- Card Header -->
    <g transform="translate(30, 30)">
      <rect width="36" height="36" rx="10" fill="#0070ba" />
      <text x="18" y="24" fill="#ffffff" font-family="sans-serif" font-size="16" font-weight="900" text-anchor="middle">$</text>
      <text x="48" y="22" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800">TRANSACTION PAYOUT AUDIT ($100 SALE)</text>
      <text x="48" y="36" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600">Standard Domestic Checkout Rail (US)</text>
    </g>

    <!-- Row 1: Gross Buyer Payment -->
    <g transform="translate(30, 85)">
      <rect width="440" height="85" rx="14" fill="#182c5c" stroke="#25468d" stroke-width="1.5" />
      <text x="20" y="30" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">Buyer Total Sent</text>
      <text x="20" y="60" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="900">$100.00 USD</text>
      <rect x="290" y="24" width="130" height="30" rx="15" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="1" />
      <text x="355" y="44" fill="#93c5fd" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" text-anchor="middle">Buyer Pays $0 Fee</text>
    </g>

    <!-- Deduction Pill -->
    <g transform="translate(30, 185)">
      <rect width="440" height="65" rx="14" fill="#450a0a" fill-opacity="0.4" stroke="#dc2626" stroke-width="1.5" />
      <text x="20" y="28" fill="#fca5a5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">PayPal Fee Deduction (2.99% + $0.49)</text>
      <text x="20" y="52" fill="#ef4444" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900">-$3.48 Cut</text>
      <text x="420" y="42" fill="#f87171" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" text-anchor="end">Deducted from Seller</text>
    </g>

    <!-- Row 2: Seller Net Payout -->
    <g transform="translate(30, 265)">
      <rect width="440" height="95" rx="16" fill="#064e3b" fill-opacity="0.5" stroke="#10b981" stroke-width="2" />
      <text x="20" y="32" fill="#86efac" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700">Seller Net Deposit (Take-Home)</text>
      <text x="20" y="70" fill="#34d399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="32" font-weight="900">$96.52 USD</text>
      <rect x="280" y="28" width="140" height="34" rx="17" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1" />
      <text x="350" y="50" fill="#a7f3d0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Seller Pocketed</text>
    </g>

    <!-- Bottom Guarantee -->
    <g transform="translate(30, 385)">
      <rect width="440" height="55" rx="14" fill="#182c5c" stroke="#25468d" stroke-width="1" />
      <circle cx="28" cy="27" r="10" fill="#10b981" />
      <text x="28" y="32" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="900" text-anchor="middle">&#10003;</text>
      <text x="48" y="32" fill="#cbd5e1" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">100% Purchase Protection Included</text>
      <text x="420" y="32" fill="#38bdf8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" text-anchor="end">2026 AUDIT</text>
    </g>
  </g>
</svg>`;

const coverSvgPath = path.join(blogDir, `${coverSlug}.svg`);
const coverPngPath = path.join(blogDir, `${coverSlug}.png`);
fs.writeFileSync(coverSvgPath, coverSvg, 'utf-8');
renderSvgToPng(coverSvg, coverPngPath, 1200, 630);

// ========================================================
// 2. FIGURE 1: SETTLEMENT FLOWCHART (1000 x 520)
// ========================================================
const fig1Slug = 'paypal-fee-settlement-flowchart';
const fig1Svg = `<svg width="1000" height="520" viewBox="0 0 1000 520" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgCanvas" x1="0" y1="0" x2="1000" y2="520" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#070d1e" />
      <stop offset="100%" stop-color="#0f1f44" />
    </linearGradient>
  </defs>

  <rect width="1000" height="520" fill="url(#bgCanvas)" />

  <!-- Header -->
  <g transform="translate(50, 40)">
    <rect width="36" height="36" rx="10" fill="#0070ba" />
    <text x="18" y="24" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" text-anchor="middle">SC</text>
    <text x="48" y="22" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800">SmartRateCalcs <tspan fill="#38bdf8" font-size="13" font-weight="600">| Transaction Architecture</tspan></text>
    <text x="0" y="58" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900">Who Pays the PayPal Goods &amp; Services Fee? ($100 Example)</text>
    <text x="0" y="80" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">OFFICIAL US COMMERCIAL CHECKOUT RAIL - 2026 SPECIFICATION</text>
  </g>

  <!-- 3 Major Nodes -->
  <!-- Node 1: Buyer -->
  <g transform="translate(50, 150)">
    <rect width="260" height="240" rx="20" fill="#182c5c" stroke="#25468d" stroke-width="2" />
    <rect x="20" y="20" width="40" height="40" rx="12" fill="#3b82f6" />
    <text x="40" y="46" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="900" text-anchor="middle">1</text>
    <text x="72" y="38" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800">The Buyer</text>
    <text x="72" y="54" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">Customer Checkout</text>

    <text x="20" y="100" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">Total Charged to Card/Bank:</text>
    <text x="20" y="135" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="30" font-weight="900">$100.00</text>

    <rect x="20" y="165" width="220" height="50" rx="12" fill="#25468d" />
    <text x="35" y="188" fill="#93c5fd" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">&#10003; Zero Surcharge to Buyer</text>
    <text x="35" y="204" fill="#93c5fd" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">&#10003; 180-Day Purchase Protection</text>
  </g>

  <!-- Flow Arrow 1 -->
  <g transform="translate(325, 250)">
    <line x1="0" y1="0" x2="35" y2="0" stroke="#38bdf8" stroke-width="3" stroke-dasharray="6 4" />
    <polygon points="35,-6 45,0 35,6" fill="#38bdf8" />
    <text x="20" y="-12" fill="#38bdf8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" text-anchor="middle">$100 Gross</text>
  </g>

  <!-- Node 2: PayPal Middle Clearing -->
  <g transform="translate(380, 150)">
    <rect width="250" height="240" rx="20" fill="#450a0a" fill-opacity="0.5" stroke="#ef4444" stroke-width="2" />
    <rect x="20" y="20" width="40" height="40" rx="12" fill="#dc2626" />
    <text x="40" y="46" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="900" text-anchor="middle">2</text>
    <text x="72" y="38" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800">PayPal Fee Cut</text>
    <text x="72" y="54" fill="#fca5a5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">Processing Intermediary</text>

    <text x="20" y="100" fill="#fca5a5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">Automatic Deduction:</text>
    <text x="20" y="135" fill="#ef4444" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="30" font-weight="900">-$3.48</text>

    <rect x="20" y="165" width="210" height="50" rx="12" fill="#7f1d1d" fill-opacity="0.6" />
    <text x="32" y="188" fill="#fecaca" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">2.99% of $100 = $2.99</text>
    <text x="32" y="204" fill="#fecaca" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">+ Fixed Transaction Fee: $0.49</text>
  </g>

  <!-- Flow Arrow 2 -->
  <g transform="translate(645, 250)">
    <line x1="0" y1="0" x2="35" y2="0" stroke="#10b981" stroke-width="3" stroke-dasharray="6 4" />
    <polygon points="35,-6 45,0 35,6" fill="#10b981" />
    <text x="20" y="-12" fill="#10b981" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" text-anchor="middle">Net Payout</text>
  </g>

  <!-- Node 3: Seller -->
  <g transform="translate(695, 150)">
    <rect width="255" height="240" rx="20" fill="#064e3b" fill-opacity="0.6" stroke="#10b981" stroke-width="2" />
    <rect x="20" y="20" width="40" height="40" rx="12" fill="#10b981" />
    <text x="40" y="46" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="900" text-anchor="middle">3</text>
    <text x="72" y="38" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800">The Seller</text>
    <text x="72" y="54" fill="#a7f3d0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">Merchant / Freelancer</text>

    <text x="20" y="100" fill="#a7f3d0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">Actual Net Deposited:</text>
    <text x="20" y="135" fill="#34d399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="30" font-weight="900">$96.52</text>

    <rect x="20" y="165" width="215" height="50" rx="12" fill="#065f46" />
    <text x="32" y="188" fill="#a7f3d0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">&#10003; Seller Pays 100% of Fee</text>
    <text x="32" y="204" fill="#a7f3d0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">&#10003; IRS Form 1099-K Tracked</text>
  </g>

  <!-- Bottom Key Takeaway Banner -->
  <g transform="translate(50, 420)">
    <rect width="900" height="55" rx="14" fill="#0b1736" stroke="#1e3a7a" stroke-width="1.5" />
    <circle cx="30" cy="27" r="10" fill="#38bdf8" />
    <text x="30" y="32" fill="#070d1e" font-family="sans-serif" font-size="12" font-weight="900" text-anchor="middle">i</text>
    <text x="50" y="32" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700">
      Key Rule: <tspan fill="#fca5a5">The seller is always the entity charged.</tspan> The buyer pays nothing extra unless the seller deliberately adjusts the invoice.
    </text>
  </g>
</svg>`;

const fig1SvgPath = path.join(imagesDir, `${fig1Slug}.svg`);
const fig1PngPath = path.join(imagesDir, `${fig1Slug}.png`);
fs.writeFileSync(fig1SvgPath, fig1Svg, 'utf-8');
renderSvgToPng(fig1Svg, fig1PngPath, 1000, 520);

// ========================================================
// 3. FIGURE 2: F&F VS G&S DECISION MATRIX (1000 x 520)
// ========================================================
const fig2Slug = 'paypal-friends-family-vs-goods-services';
const fig2Svg = `<svg width="1000" height="520" viewBox="0 0 1000 520" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgCanvas2" x1="0" y1="0" x2="1000" y2="520" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#070d1e" />
      <stop offset="100%" stop-color="#0f1f44" />
    </linearGradient>
  </defs>

  <rect width="1000" height="520" fill="url(#bgCanvas2)" />

  <!-- Header -->
  <g transform="translate(50, 36)">
    <rect width="36" height="36" rx="10" fill="#0070ba" />
    <text x="18" y="24" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" text-anchor="middle">SC</text>
    <text x="48" y="22" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800">SmartRateCalcs <tspan fill="#38bdf8" font-size="13" font-weight="600">| Policy Comparison Matrix</tspan></text>
    <text x="0" y="58" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900">PayPal Friends &amp; Family vs. Goods &amp; Services (2026 Audit)</text>
    <text x="0" y="80" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">LEGAL COMPLIANCE, FEE SCHEDULE &amp; FRAUD PROTECTION COMPARISON</text>
  </g>

  <!-- Side-by-Side Cards -->
  <!-- Left: Friends & Family -->
  <g transform="translate(50, 135)">
    <rect width="430" height="330" rx="20" fill="#182c5c" stroke="#25468d" stroke-width="2" />
    <rect x="25" y="20" width="160" height="32" rx="16" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="1" />
    <text x="105" y="41" fill="#93c5fd" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" text-anchor="middle">FRIENDS &amp; FAMILY (F&amp;F)</text>

    <!-- Metrics -->
    <g transform="translate(25, 75)">
      <text x="0" y="16" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">Transaction Fee:</text>
      <text x="0" y="42" fill="#34d399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900">0.00% FREE (Bank / Balance)</text>
      <text x="0" y="60" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="500">(2.9% + $0.30 if sender uses a Credit Card)</text>

      <line x1="0" y1="75" x2="380" y2="75" stroke="#25468d" stroke-width="1" />

      <text x="0" y="100" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">Purchase Protection:</text>
      <text x="0" y="122" fill="#ef4444" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900">&#10007; NONE (Zero Recourse if Scammed)</text>

      <line x1="0" y1="135" x2="380" y2="135" stroke="#25468d" stroke-width="1" />

      <text x="0" y="160" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">IRS Form 1099-K Reporting:</text>
      <text x="0" y="182" fill="#e2e8f0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">EXEMPT (Personal transfers not reported)</text>

      <line x1="0" y1="195" x2="380" y2="195" stroke="#25468d" stroke-width="1" />

      <text x="0" y="220" fill="#fca5a5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800">&#9888; Warning: Prohibited for commercial sales</text>
    </g>
  </g>

  <!-- Right: Goods & Services -->
  <g transform="translate(520, 135)">
    <rect width="430" height="330" rx="20" fill="#0f2942" stroke="#0284c7" stroke-width="2" />
    <rect x="25" y="20" width="180" height="32" rx="16" fill="#0284c7" fill-opacity="0.25" stroke="#0284c7" stroke-width="1" />
    <text x="115" y="41" fill="#38bdf8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" text-anchor="middle">GOODS &amp; SERVICES (G&amp;S)</text>

    <!-- Metrics -->
    <g transform="translate(25, 75)">
      <text x="0" y="16" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">Transaction Fee:</text>
      <text x="0" y="42" fill="#f87171" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900">2.99% + $0.49 (Online)</text>
      <text x="0" y="60" fill="#38bdf8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600">(3.49% + $0.49 for Direct Invoicing)</text>

      <line x1="0" y1="75" x2="380" y2="75" stroke="#1e3a7a" stroke-width="1" />

      <text x="0" y="100" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">Purchase Protection:</text>
      <text x="0" y="122" fill="#34d399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900">&#10003; FULL COVERAGE (180-Day Disputes)</text>

      <line x1="0" y1="135" x2="380" y2="135" stroke="#1e3a7a" stroke-width="1" />

      <text x="0" y="160" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">IRS Form 1099-K Reporting:</text>
      <text x="0" y="182" fill="#fbbf24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">AUTOMATIC ($20,000 / 200 tx threshold)</text>

      <line x1="0" y1="195" x2="380" y2="195" stroke="#1e3a7a" stroke-width="1" />

      <text x="0" y="220" fill="#a7f3d0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800">&#10003; 100% Legal &amp; Safe for all commerce</text>
    </g>
  </g>
</svg>`;

const fig2SvgPath = path.join(imagesDir, `${fig2Slug}.svg`);
const fig2PngPath = path.join(imagesDir, `${fig2Slug}.png`);
fs.writeFileSync(fig2SvgPath, fig2Svg, 'utf-8');
renderSvgToPng(fig2Svg, fig2PngPath, 1000, 520);

// ========================================================
// 4. FIGURE 3: REVERSE SURCHARGE MATH (1000 x 520)
// ========================================================
const fig3Slug = 'paypal-reverse-surcharge-math-formula';
const fig3Svg = `<svg width="1000" height="520" viewBox="0 0 1000 520" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgCanvas3" x1="0" y1="0" x2="1000" y2="520" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#070d1e" />
      <stop offset="100%" stop-color="#0f1f44" />
    </linearGradient>
  </defs>

  <rect width="1000" height="520" fill="url(#bgCanvas3)" />

  <!-- Header -->
  <g transform="translate(50, 40)">
    <rect width="36" height="36" rx="10" fill="#0070ba" />
    <text x="18" y="24" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" text-anchor="middle">SC</text>
    <text x="48" y="22" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800">SmartRateCalcs <tspan fill="#38bdf8" font-size="13" font-weight="600">| Surcharge Mathematical Blueprint</tspan></text>
    <text x="0" y="58" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900">How to Receive Exactly $100 Net via PayPal (Reverse Solver)</text>
    <text x="0" y="80" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">SOLVING FOR THE COMMON SELLER MISTAKE OF ADDING RAW 2.99%</text>
  </g>

  <!-- Side-by-Side Comparison of Math -->
  <!-- Card Left: The Amateur Trap -->
  <g transform="translate(50, 140)">
    <rect width="430" height="260" rx="20" fill="#450a0a" fill-opacity="0.4" stroke="#dc2626" stroke-width="2" />
    <text x="25" y="40" fill="#fca5a5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">&#10007; THE AMATEUR ERROR: RAW ADDITION</text>
    
    <text x="25" y="75" fill="#e2e8f0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">Seller thinks: $100 + 2.99% + $0.49 =</text>
    <text x="25" y="110" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="900">Invoices $103.48</text>

    <rect x="25" y="135" width="380" height="90" rx="14" fill="#7f1d1d" fill-opacity="0.5" />
    <text x="40" y="162" fill="#fecaca" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">PayPal takes 2.99% of $103.48 + $0.49 = $3.58</text>
    <text x="40" y="188" fill="#fecaca" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">Seller Net Received: <tspan fill="#ffffff" font-weight="800">$99.90</tspan></text>
    <text x="40" y="210" fill="#f87171" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800">&#10007; Result: Underpaid by $0.10 every single sale!</text>
  </g>

  <!-- Card Right: The Top 1% Reverse Formula -->
  <g transform="translate(520, 140)">
    <rect width="430" height="260" rx="20" fill="#064e3b" fill-opacity="0.5" stroke="#10b981" stroke-width="2" />
    <text x="25" y="40" fill="#86efac" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">&#10003; THE TOP 1% MATHEMATICAL FORMULA</text>
    
    <text x="25" y="75" fill="#e2e8f0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">Gross = (Desired Net + $0.49) / (1 - 0.0299)</text>
    <text x="25" y="110" fill="#34d399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="900">Invoices Exactly $103.59</text>

    <rect x="25" y="135" width="380" height="90" rx="14" fill="#065f46" />
    <text x="40" y="162" fill="#a7f3d0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">PayPal takes 2.99% of $103.59 + $0.49 = $3.59</text>
    <text x="40" y="188" fill="#a7f3d0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">Seller Net Received: <tspan fill="#ffffff" font-weight="800">$100.00 EXACT</tspan></text>
    <text x="40" y="210" fill="#34d399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800">&#10003; Result: 100% margin protection guaranteed!</text>
  </g>

  <!-- Bottom Interactive CTA -->
  <g transform="translate(50, 425)">
    <rect width="900" height="55" rx="14" fill="#182c5c" stroke="#25468d" stroke-width="1.5" />
    <circle cx="30" cy="27" r="10" fill="#10b981" />
    <text x="30" y="32" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="900" text-anchor="middle">&#10003;</text>
    <text x="50" y="32" fill="#cbd5e1" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700">
      Need instant numbers? Use our <tspan fill="#38bdf8" font-weight="800">SmartRateCalcs PayPal Fee Calculator</tspan> to solve round amounts instantly.
    </text>
  </g>
</svg>`;

const fig3SvgPath = path.join(imagesDir, `${fig3Slug}.svg`);
const fig3PngPath = path.join(imagesDir, `${fig3Slug}.png`);
fs.writeFileSync(fig3SvgPath, fig3Svg, 'utf-8');
renderSvgToPng(fig3Svg, fig3PngPath, 1000, 520);

console.log('All 4 PayPal blog visual assets generated and rendered successfully!');
