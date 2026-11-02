// scripts/generate_blog_images.js
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const blogDir = path.join(__dirname, '..', 'public', 'blog');
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const posts = [
  {
    slug: 'upwork-pakistan-lowest-withdrawal-fee-guide',
    badge: 'UPWORK WITHDRAWAL AUDIT',
    title: 'Upwork to Pakistan:\nLowest Fee Guide',
    highlight: 'Save Rs. 19,000 PKR / month',
    statLabel: 'Bank Spread Loss:',
    statValue: '2.75%',
    rightHeading: 'FEE COMPARISON MATRIX',
    rightRow1Label: 'Direct to Bank Spread',
    rightRow1Val: '-2.75% Hidden Loss',
    rightRow2Label: 'Elevate / Wise US Route',
    rightRow2Val: '$0 Fee + 0.5% Spread',
    rightTag: 'Verified Net Take-Home: +Rs. 19,250 PKR',
    color: '#10b981'
  },
  {
    slug: 'pakistan-freelancer-tax-section-154a-pseb-guide',
    badge: 'FBR SECTION 154A COMPLIANCE',
    title: 'Pakistan Freelancer Tax:\n0.25% Complete Guide',
    highlight: 'PSEB Registered Final Tax Regime',
    statLabel: 'Concessional Tax Rate:',
    statValue: '0.25%',
    rightHeading: 'TAX COMPLIANCE ENGINE',
    rightRow1Label: 'Non-PSEB Standard Rate',
    rightRow1Val: '1.00% Final Tax',
    rightRow2Label: 'PSEB Certified Freelancers',
    rightRow2Val: '0.25% (Save 75% Tax)',
    rightTag: 'Automated Digital PRC Verification',
    color: '#059669'
  },
  {
    slug: 'wise-vs-payoneer-vs-elevate-pay-freelancer-comparison',
    badge: 'CROSS-BORDER BENCHMARK',
    title: 'Wise vs Payoneer\nvs Elevate Pay (2026)',
    highlight: 'Full Cost & Spread Breakdown',
    statLabel: 'Annual Gain on $30k:',
    statValue: '+$500 USD',
    rightHeading: 'ANNUAL PAYOUT BENCHMARK',
    rightRow1Label: 'Payoneer Standard Spread',
    rightRow1Val: '2.0% - 2.75% Forex Margin',
    rightRow2Label: 'Elevate Pay FDIC Checking',
    rightRow2Val: '0.50% Interbank Spread',
    rightTag: 'FDIC Insured Up To $250,000 USD',
    color: '#0284c7'
  },
  {
    slug: 'indian-freelancers-paypal-alternatives-firc-guide',
    badge: 'INDIA EXPORT REGULATION',
    title: 'PayPal India Alternatives:\nSave 8% in Fees',
    highlight: 'Instant e-FIRC & RBI Compliance',
    statLabel: 'Saved per $1k Received:',
    statValue: '₹6,900 INR',
    rightHeading: 'RBI EXPORT AUDIT',
    rightRow1Label: 'PayPal India Effective Fee',
    rightRow1Val: '4.4% Fee + 3.5% Spread',
    rightRow2Label: 'Skydo / Winvesta Route',
    rightRow2Val: 'Flat $19 + Zero Spread',
    rightTag: 'Automated 24h Digital e-FIRC Credit',
    color: '#6366f1'
  },
  {
    slug: 'shopify-dropshipping-break-even-roas-profit-formula',
    badge: 'UNIT ECONOMICS MASTERCLASS',
    title: 'Shopify Break-Even ROAS:\nProfit Formula (2026)',
    highlight: 'Real Net Margin Financial Model',
    statLabel: 'Target Break-Even ROAS:',
    statValue: '1.70x',
    rightHeading: 'ECOMMERCE MARGIN MATRIX',
    rightRow1Label: 'COGS + Payment Processing',
    rightRow1Val: '42.0% Gross Revenue',
    rightRow2Label: 'Estimated Ad CPA Ceiling',
    rightRow2Val: 'Target ROAS >= 1.70x',
    rightTag: 'Includes Stripe + Shopify 2.9% Fees',
    color: '#f59e0b'
  },
  {
    slug: 'how-to-transfer-wise-to-meezan-bank-instantly',
    badge: 'RAAST CLEARING PROTOCOL',
    title: 'Transfer Wise to Meezan\nBank Instantly (2026)',
    highlight: 'Instant 60-Second Raast Credit',
    statLabel: 'Incoming Remittance Fee:',
    statValue: '₨ 0 (Free)',
    rightHeading: 'INTERBANK SETTLEMENT',
    rightRow1Label: 'Meezan Bank Raast Protocol',
    rightRow1Val: 'Instant 24/7 Credit',
    rightRow2Label: 'FBR Export Tax PRC Support',
    rightRow2Val: 'Computerized Tax Advice',
    rightTag: '100% SBP Home Remittance Scheme (PRI)',
    color: '#10b981'
  },
  {
    slug: 'meezan-vs-hbl-vs-ubl-freelance-remittance-rates-audit',
    badge: 'PAKISTAN BANKING BENCHMARK',
    title: 'Meezan vs HBL vs UBL:\nRemittance Audit 2026',
    highlight: 'USD Conversion Rates & Speeds',
    statLabel: 'Meezan Raast Settlement:',
    statValue: 'Under 60 Sec',
    rightHeading: 'BANK PERFORMANCE INDEX',
    rightRow1Label: 'Meezan Bank Settlement',
    rightRow1Val: 'Instant Raast Credit (99.8%)',
    rightRow2Label: 'HBL / UBL Processing Speed',
    rightRow2Val: '2 to 6 Hours Batch Processing',
    rightTag: 'Meezan Freelancer Account Recommended',
    color: '#059669'
  },
  {
    slug: 'stripe-vs-sadabiz-pakistan-freelancer-payment-guide',
    badge: 'GLOBAL CLIENT INVOICING',
    title: 'Stripe vs SadaBiz:\nFreelancer Guide (2026)',
    highlight: 'Direct US Client Invoicing',
    statLabel: 'SadaBiz Clean Flat Fee:',
    statValue: '1.5% Flat',
    rightHeading: 'CLIENT PAYMENT PROTOCOL',
    rightRow1Label: 'US LLC Stripe Structure',
    rightRow1Val: '$400 Setup + 2.9% Fees',
    rightRow2Label: 'SadaBiz Invoicing Link',
    rightRow2Val: '1.5% Flat + Apple Pay',
    rightTag: 'Zero US LLC Incorporation Required',
    color: '#10b981'
  }
];

function generateSvg(p) {
  const titleLines = p.title.split('\n');
  const titleLine1 = escapeXml(titleLines[0]);
  const titleLine2 = titleLines[1] ? escapeXml(titleLines[1]) : '';

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
    <linearGradient id="cardBg" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02" />
    </linearGradient>
    <linearGradient id="rightCardBg" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0f172a" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#090d16" stop-opacity="0.98" />
    </linearGradient>
    <radialGradient id="glowLeft" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 180) rotate(90) scale(320 320)">
      <stop offset="0%" stop-color="${p.color}" stop-opacity="0.25" />
      <stop offset="100%" stop-color="${p.color}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glowRight" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1000 450) rotate(90) scale(280 280)">
      <stop offset="0%" stop-color="${p.color}" stop-opacity="0.20" />
      <stop offset="100%" stop-color="${p.color}" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#glowLeft)" />
  <rect width="1200" height="630" fill="url(#glowRight)" />

  <!-- Subtle Precision Grid -->
  <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
    <line x1="80" y1="0" x2="80" y2="630" />
    <line x1="280" y1="0" x2="280" y2="630" />
    <line x1="480" y1="0" x2="480" y2="630" />
    <line x1="680" y1="0" x2="680" y2="630" />
    <line x1="880" y1="0" x2="880" y2="630" />
    <line x1="1080" y1="0" x2="1080" y2="630" />
    <line x1="0" y1="100" x2="1200" y2="100" />
    <line x1="0" y1="260" x2="1200" y2="260" />
    <line x1="0" y1="420" x2="1200" y2="420" />
    <line x1="0" y1="580" x2="1200" y2="580" />
  </g>

  <!-- LEFT CONTENT COLUMN -->
  <!-- Brand Header -->
  <g transform="translate(80, 55)">
    <rect width="42" height="42" rx="10" fill="#059669" />
    <text x="21" y="27" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="900" text-anchor="middle">SC</text>
    <text x="54" y="23" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800">SmartRate<tspan fill="#34d399">Calcs</tspan></text>
    <text x="54" y="38" fill="#94a3b8" font-family="monospace" font-size="10" font-weight="700" letter-spacing="1.5">FINANCIAL INTELLIGENCE ENGINE &#8226; 2026</text>
  </g>

  <!-- Category Badge -->
  <g transform="translate(80, 130)">
    <rect width="320" height="34" rx="17" fill="${p.color}" fill-opacity="0.18" stroke="${p.color}" stroke-width="1.5" />
    <circle cx="20" cy="17" r="4" fill="${p.color}" />
    <text x="34" y="22" fill="#ffffff" font-family="monospace" font-size="12" font-weight="800" letter-spacing="1">${escapeXml(p.badge)}</text>
  </g>

  <!-- Main Headline -->
  <text x="80" y="215" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="38" font-weight="900" letter-spacing="-0.5">
    <tspan x="80" dy="0">${titleLine1}</tspan>
    ${titleLine2 ? `<tspan x="80" dy="48">${titleLine2}</tspan>` : ''}
  </text>

  <!-- Highlight Subtitle -->
  <text x="80" y="${titleLine2 ? 335 : 290}" fill="#34d399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700">
    ${escapeXml(p.highlight)}
  </text>

  <!-- Stat Metric Card -->
  <g transform="translate(80, ${titleLine2 ? 380 : 350})">
    <rect width="480" height="110" rx="18" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.14" stroke-width="1.5" />
    <text x="32" y="44" fill="#94a3b8" font-family="monospace" font-size="13" font-weight="600">${escapeXml(p.statLabel)}</text>
    <text x="32" y="86" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="32" font-weight="900">${escapeXml(p.statValue)}</text>
    <circle cx="430" cy="55" r="24" fill="${p.color}" fill-opacity="0.2" />
    <text x="430" y="61" fill="${p.color}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="900" text-anchor="middle">&#10003;</text>
  </g>

  <!-- Author Sign-off Footer -->
  <g transform="translate(80, 555)">
    <circle cx="16" cy="16" r="16" fill="#10b981" />
    <text x="16" y="21" fill="#022c22" font-family="sans-serif" font-size="12" font-weight="900" text-anchor="middle">MN</text>
    <text x="44" y="21" fill="#cbd5e1" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700">Muhammad Naveed <tspan fill="#64748b" font-weight="400">&#8226; Lead Systems Engineer</tspan></text>
  </g>

  <!-- RIGHT GLASS TERMINAL WIDGET (from x=620 to 1120) -->
  <g transform="translate(630, 95)">
    <!-- Terminal Outer Frame -->
    <rect width="490" height="440" rx="22" fill="url(#rightCardBg)" stroke="${p.color}" stroke-opacity="0.35" stroke-width="1.5" />
    
    <!-- Top Terminal Bar -->
    <rect width="490" height="52" rx="22" fill="#0b1120" />
    <rect y="30" width="490" height="22" fill="#0b1120" />
    <line x1="0" y1="52" x2="490" y2="52" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1" />
    
    <!-- Mac Window Dots -->
    <circle cx="28" cy="26" r="6" fill="#ef4444" />
    <circle cx="48" cy="26" r="6" fill="#f59e0b" />
    <circle cx="68" cy="26" r="6" fill="#10b981" />
    
    <!-- Terminal Title -->
    <text x="92" y="30" fill="#94a3b8" font-family="monospace" font-size="11" font-weight="700" letter-spacing="1">${escapeXml(p.rightHeading)}</text>
    
    <!-- Live Pulse Pill -->
    <rect x="390" y="16" width="75" height="20" rx="10" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1" />
    <circle cx="402" cy="26" r="3" fill="#10b981" />
    <text x="412" y="30" fill="#34d399" font-family="monospace" font-size="10" font-weight="800">LIVE 2026</text>

    <!-- Terminal Content Area -->
    <!-- Row 1: Traditional Route -->
    <g transform="translate(25, 80)">
      <rect width="440" height="85" rx="14" fill="#ffffff" fill-opacity="0.03" stroke="#ffffff" stroke-opacity="0.06" stroke-width="1" />
      <text x="20" y="34" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">${escapeXml(p.rightRow1Label)}</text>
      <text x="20" y="65" fill="#f87171" font-family="monospace" font-size="18" font-weight="800">${escapeXml(p.rightRow1Val)}</text>
    </g>

    <!-- Row 2: Optimized Smart Route -->
    <g transform="translate(25, 185)">
      <rect width="440" height="95" rx="14" fill="${p.color}" fill-opacity="0.08" stroke="${p.color}" stroke-opacity="0.4" stroke-width="1.5" />
      <text x="20" y="36" fill="#34d399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">${escapeXml(p.rightRow2Label)}</text>
      <text x="20" y="70" fill="#ffffff" font-family="monospace" font-size="22" font-weight="900">${escapeXml(p.rightRow2Val)}</text>
    </g>

    <!-- Row 3: Verified Badge Tag -->
    <g transform="translate(25, 305)">
      <rect width="440" height="50" rx="12" fill="#ffffff" fill-opacity="0.04" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1" />
      <circle cx="28" cy="25" r="8" fill="#10b981" />
      <text x="28" y="29" fill="#022c22" font-family="sans-serif" font-size="9" font-weight="900" text-anchor="middle">&#10003;</text>
      <text x="46" y="29" fill="#e2e8f0" font-family="monospace" font-size="11" font-weight="700">${escapeXml(p.rightTag)}</text>
    </g>

    <!-- Bottom Hash & Speed Ticker -->
    <g transform="translate(25, 385)">
      <text x="0" y="15" fill="#64748b" font-family="monospace" font-size="10" font-weight="600">SMARTRATE ENGINE ID: SR-CALC-PROD</text>
      <text x="440" y="15" fill="#10b981" font-family="monospace" font-size="10" font-weight="700" text-anchor="end">&#9679; LATENCY: 12ms</text>
    </g>
  </g>
</svg>`;
}

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

console.log('Generating pristine SVG & PNG images for all 8 blog guides...');

for (const p of posts) {
  const svgContent = generateSvg(p);
  const svgPath = path.join(blogDir, `${p.slug}.svg`);
  fs.writeFileSync(svgPath, svgContent, 'utf-8');
  console.log(`Generated SVG: ${p.slug}.svg`);

  // Render to PNG via Headless Chrome using direct HTML file with inline SVG
  const htmlTemp = path.join(blogDir, `temp_${p.slug}.html`);
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; background: #090d16; }
  svg { display: block; width: 1200px; height: 630px; }
</style>
</head>
<body>
${svgContent}
</body>
</html>`;
  fs.writeFileSync(htmlTemp, htmlContent, 'utf-8');

  const pngPath = path.join(blogDir, `${p.slug}.png`);
  try {
    execFileSync(chromePath, [
      '--headless=new',
      `--screenshot=${pngPath}`,
      '--window-size=1200,630',
      '--hide-scrollbars',
      `file:///${htmlTemp.replace(/\\/g, '/')}`
    ]);
    const stats = fs.statSync(pngPath);
    console.log(`Rendered PNG: ${p.slug}.png (size: ${stats.size} bytes)`);
  } catch (err) {
    console.error(`Chrome PNG render failed for ${p.slug}:`, err.message);
  } finally {
    if (fs.existsSync(htmlTemp)) fs.unlinkSync(htmlTemp);
  }
}

console.log('All 8 blog featured images generated and rendered successfully!');
