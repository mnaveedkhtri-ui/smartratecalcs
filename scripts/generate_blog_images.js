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
    badge: 'UPWORK WITHDRAWAL AUDIT 2026',
    title: 'Upwork to Pakistan:\nLowest Fee Guide',
    highlight: 'Save up to Rs. 19,250 PKR per Month',
    cardHeader: 'REAL PAYOUT COMPARISON ($1,000 USD)',
    row1Label: 'Direct to Local Bank (PK)',
    row1Rate: '1 USD = 270.70 PKR',
    row1Net: 'Net: Rs. 270,700',
    row1Badge: '-2.75% Spread Loss',
    row1BadgeColor: '#ef4444',
    row1BadgeBg: '#fef2f2',
    row2Label: 'Optimal US Checking Route',
    row2Rate: '1 USD = 276.90 PKR',
    row2Net: 'Net: Rs. 276,900',
    row2Badge: '+$6,200 PKR EXTRA CASH',
    row2BadgeColor: '#059669',
    row2BadgeBg: '#ecfdf5',
    footerTag: '100% Legal & SBP Compliant Route',
    accentColor: '#10b981'
  },
  {
    slug: 'pakistan-freelancer-tax-section-154a-pseb-guide',
    badge: 'FBR SECTION 154A COMPLIANCE',
    title: 'Pakistan Freelancer Tax:\n0.25% Complete Guide',
    highlight: 'PSEB Registered Final Tax Regime',
    cardHeader: 'STATUTORY TAX ON $25,000 USD EXPORTS',
    row1Label: 'Active Filer Without PSEB',
    row1Rate: '1.00% Statutory Withholding',
    row1Net: 'Tax Paid: Rs. 69,600 PKR',
    row1Badge: 'Standard Rate',
    row1BadgeColor: '#d97706',
    row1BadgeBg: '#fffbeb',
    row2Label: 'PSEB Certified Freelancer',
    row2Rate: '0.25% Concessional Final Tax',
    row2Net: 'Tax Paid: Rs. 17,400 PKR',
    row2Badge: 'SAVE 75% IN TAXES',
    row2BadgeColor: '#059669',
    row2BadgeBg: '#ecfdf5',
    footerTag: 'Full & Final Discharge u/s 154A',
    accentColor: '#059669'
  }
];

function generateSvg(p) {
  const titleLines = p.title.split('\n');
  const titleLine1 = escapeXml(titleLines[0]);
  const titleLine2 = titleLines[1] ? escapeXml(titleLines[1]) : '';

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient: Deep Slate to Navy -->
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0b1329" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>

    <!-- Subtle Ambient Glow -->
    <radialGradient id="glowLeft" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(180 160) rotate(90) scale(340 340)">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#10b981" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glowRight" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1000 400) rotate(90) scale(300 300)">
      <stop offset="0%" stop-color="#0284c7" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0" />
    </radialGradient>

    <!-- Card Background: Clean Frosted Glass -->
    <linearGradient id="cardBg" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.03" />
    </linearGradient>

    <!-- White Widget Card -->
    <linearGradient id="widgetBg" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f8fafc" />
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#glowLeft)" />
  <rect width="1200" height="630" fill="url(#glowRight)" />

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

  <!-- ================= LEFT COLUMN: AUTHORITY HEADLINE ================= -->
  <!-- Brand Pill -->
  <g transform="translate(80, 60)">
    <rect width="44" height="44" rx="12" fill="#059669" />
    <text x="22" y="28" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="900" text-anchor="middle">SC</text>
    <text x="56" y="25" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800">SmartRate<tspan fill="#34d399">Calcs</tspan></text>
    <text x="56" y="40" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="1.2">FINANCIAL INTELLIGENCE &#8226; 2026</text>
  </g>

  <!-- Category Audit Pill -->
  <g transform="translate(80, 140)">
    <rect width="300" height="34" rx="17" fill="${p.accentColor}" fill-opacity="0.18" stroke="${p.accentColor}" stroke-width="1.5" />
    <circle cx="20" cy="17" r="4" fill="${p.accentColor}" />
    <text x="34" y="22" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" letter-spacing="0.8">${escapeXml(p.badge)}</text>
  </g>

  <!-- Main Headline -->
  <text x="80" y="228" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="40" font-weight="900" letter-spacing="-0.8">
    <tspan x="80" dy="0">${titleLine1}</tspan>
    ${titleLine2 ? `<tspan x="80" dy="50">${titleLine2}</tspan>` : ''}
  </text>

  <!-- Value Proposition Highlight Subtitle -->
  <g transform="translate(80, ${titleLine2 ? 345 : 300})">
    <rect width="420" height="38" rx="10" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-opacity="0.3" />
    <text x="16" y="25" fill="#34d399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800">
      &#10003; ${escapeXml(p.highlight)}
    </text>
  </g>

  <!-- Trust Matrix Pill -->
  <g transform="translate(80, ${titleLine2 ? 405 : 360})">
    <rect width="450" height="85" rx="16" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1.5" />
    <circle cx="38" cy="42" r="18" fill="#059669" fill-opacity="0.25" />
    <text x="38" y="48" fill="#34d399" font-family="sans-serif" font-size="18" font-weight="900" text-anchor="middle">&#10003;</text>
    <text x="70" y="36" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">Empirical Bank Settlement Audit</text>
    <text x="70" y="58" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500">Zero sponsored bias &#8226; Real SBP foreign exchange math</text>
  </g>

  <!-- Author Sign-off Footer -->
  <g transform="translate(80, 550)">
    <circle cx="20" cy="20" r="20" fill="#10b981" />
    <text x="20" y="26" fill="#022c22" font-family="sans-serif" font-size="14" font-weight="900" text-anchor="middle">MN</text>
    <text x="52" y="22" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800">Muhammad Naveed</text>
    <text x="52" y="38" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500">Lead Systems Engineer &#8226; SmartRateCalcs</text>
  </g>

  <!-- ================= RIGHT COLUMN: HIGH-TRUST FINTECH CARD ================= -->
  <g transform="translate(620, 80)">
    <!-- Main Card Body -->
    <rect width="500" height="470" rx="24" fill="url(#widgetBg)" />
    
    <!-- Outer Border -->
    <rect width="500" height="470" rx="24" stroke="#cbd5e1" stroke-width="1.5" fill="none" />

    <!-- Card Header Banner -->
    <g transform="translate(30, 32)">
      <rect width="440" height="38" rx="10" fill="#0f172a" />
      <circle cx="22" cy="19" r="5" fill="#10b981" />
      <text x="36" y="23" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" letter-spacing="0.5">${escapeXml(p.cardHeader)}</text>
    </g>

    <!-- Row 1: Traditional High Friction Route -->
    <g transform="translate(30, 92)">
      <rect width="440" height="110" rx="16" fill="#ffffff" stroke="#fecaca" stroke-width="1.5" />
      <text x="22" y="34" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600">${escapeXml(p.row1Label)}</text>
      <text x="22" y="60" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700">${escapeXml(p.row1Rate)}</text>
      <text x="22" y="90" fill="#b91c1c" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900">${escapeXml(p.row1Net)}</text>
      
      <!-- Friction Badge -->
      <rect x="260" y="20" width="160" height="28" rx="14" fill="${p.row1BadgeBg}" stroke="${p.row1BadgeColor}" stroke-opacity="0.3" stroke-width="1" />
      <text x="340" y="38" fill="${p.row1BadgeColor}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" text-anchor="middle">${escapeXml(p.row1Badge)}</text>
    </g>

    <!-- VS Divider -->
    <g transform="translate(250, 218)">
      <circle cx="0" cy="0" r="14" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1" />
      <text x="0" y="4" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" text-anchor="middle">VS</text>
    </g>

    <!-- Row 2: Optimized Route (Highlighted in Green) -->
    <g transform="translate(30, 235)">
      <rect width="440" height="120" rx="16" fill="#f0fdf4" stroke="#86efac" stroke-width="2" />
      <text x="22" y="34" fill="#15803d" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700">${escapeXml(p.row2Label)}</text>
      <text x="22" y="62" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800">${escapeXml(p.row2Rate)}</text>
      <text x="22" y="96" fill="#047857" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="900">${escapeXml(p.row2Net)}</text>

      <!-- Gain Badge -->
      <rect x="240" y="20" width="180" height="32" rx="16" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5" />
      <text x="330" y="41" fill="#15803d" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="900" text-anchor="middle">${escapeXml(p.row2Badge)}</text>
    </g>

    <!-- Card Bottom Guarantee -->
    <g transform="translate(30, 385)">
      <rect width="440" height="55" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
      <circle cx="28" cy="27" r="10" fill="#059669" />
      <text x="28" y="32" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="900" text-anchor="middle">&#10003;</text>
      <text x="48" y="32" fill="#334155" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">${escapeXml(p.footerTag)}</text>
      <text x="420" y="32" fill="#059669" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" text-anchor="end">AUDITED 2026</text>
    </g>
  </g>
</svg>`;
}

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

console.log('Rendering elite, human-centered fintech cover cards...');

for (const p of posts) {
  const svgContent = generateSvg(p);
  const svgPath = path.join(blogDir, `${p.slug}.svg`);
  fs.writeFileSync(svgPath, svgContent, 'utf-8');
  console.log(`Generated SVG: ${p.slug}.svg`);

  const htmlTemp = path.join(blogDir, `temp_${p.slug}.html`);
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; background: #0b1329; }
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
    console.log(`Rendered PNG: ${p.slug}.png (${stats.size} bytes)`);
  } catch (err) {
    console.error(`Chrome PNG render failed for ${p.slug}:`, err.message);
  } finally {
    if (fs.existsSync(htmlTemp)) fs.unlinkSync(htmlTemp);
  }
}

console.log('Elite cover images rendered successfully!');
