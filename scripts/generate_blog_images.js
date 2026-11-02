// scripts/generate_blog_images.js
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const blogDir = path.join(__dirname, '..', 'public', 'blog');
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

const posts = [
  {
    slug: 'upwork-pakistan-lowest-withdrawal-fee-guide',
    badge: 'UPWORK WITHDRAWAL AUDIT',
    title: 'Upwork to Pakistan: Lowest Fee Guide',
    highlight: 'Save Rs. 19,000 PKR / month',
    statLabel: 'Bank Spread Loss:',
    statValue: '2.75%',
    icon: 'fa-money-bill-transfer',
    color: '#10b981'
  },
  {
    slug: 'pakistan-freelancer-tax-section-154a-pseb-guide',
    badge: 'FBR SECTION 154A COMPLIANCE',
    title: 'Pakistan Freelancer Tax: 0.25% Guide',
    highlight: 'PSEB Registered Final Tax',
    statLabel: 'Concessional Tax Rate:',
    statValue: '0.25%',
    icon: 'fa-file-invoice-dollar',
    color: '#059669'
  },
  {
    slug: 'wise-vs-payoneer-vs-elevate-pay-freelancer-comparison',
    badge: 'CROSS-BORDER BENCHMARK',
    title: 'Wise vs Payoneer vs Elevate Pay',
    highlight: 'Full 2026 Cost & Spread Breakdown',
    statLabel: 'Annual Difference on $30k:',
    statValue: '+$500 USD',
    icon: 'fa-scale-balanced',
    color: '#0284c7'
  },
  {
    slug: 'indian-freelancers-paypal-alternatives-firc-guide',
    badge: 'INDIA EXPORT REGULATION',
    title: 'PayPal India Alternatives: Save 8% Fees',
    highlight: 'Instant e-FIRC & RBI Compliance',
    statLabel: 'Saved per $1k Received:',
    statValue: '₹6,900 INR',
    icon: 'fa-building-columns',
    color: '#6366f1'
  },
  {
    slug: 'shopify-dropshipping-break-even-roas-profit-formula',
    badge: 'UNIT ECONOMICS MASTERCLASS',
    title: 'Shopify Break-Even ROAS Formula',
    highlight: 'Real Net Margin Modeling',
    statLabel: 'Standard Target ROAS:',
    statValue: '1.70x',
    icon: 'fa-chart-line',
    color: '#f59e0b'
  },
  {
    slug: 'how-to-transfer-wise-to-meezan-bank-instantly',
    badge: 'RAAST CLEARING PROTOCOL',
    title: 'Transfer Wise to Meezan Bank',
    highlight: 'Instant 60-Second Credit',
    statLabel: 'Incoming Remittance Fee:',
    statValue: '₨ 0 (Free)',
    icon: 'fa-bolt',
    color: '#10b981'
  },
  {
    slug: 'meezan-vs-hbl-vs-ubl-freelance-remittance-rates-audit',
    badge: 'PAKISTAN BANKING BENCHMARK',
    title: 'Meezan vs HBL vs UBL: 2026 Audit',
    highlight: 'USD Conversion Rates & Raast Speeds',
    statLabel: 'Meezan Raast Settlement:',
    statValue: '< 60 Seconds',
    icon: 'fa-building-columns',
    color: '#059669'
  },
  {
    slug: 'stripe-vs-sadabiz-pakistan-freelancer-payment-guide',
    badge: 'GLOBAL CLIENT INVOICING',
    title: 'Stripe vs SadaBiz: 2026 Client Guide',
    highlight: 'Charge US Clients via Apple Pay',
    statLabel: 'SadaBiz Clean Flat Fee:',
    statValue: '1.5% Flat',
    icon: 'fa-credit-card',
    color: '#10b981'
  }
];

function generateSvg(p) {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
    <linearGradient id="cardBg" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.07" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02" />
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="600" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${p.color}" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#059669" stop-opacity="0" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)" />
  <circle cx="150" cy="150" r="350" fill="url(#glow)" filter="blur(80px)" />
  <circle cx="1050" cy="500" r="280" fill="url(#glow)" filter="blur(90px)" />

  <!-- Grid Lines -->
  <g stroke="#ffffff" stroke-opacity="0.03" stroke-width="1">
    <line x1="100" y1="0" x2="100" y2="630" />
    <line x1="300" y1="0" x2="300" y2="630" />
    <line x1="500" y1="0" x2="500" y2="630" />
    <line x1="700" y1="0" x2="700" y2="630" />
    <line x1="900" y1="0" x2="900" y2="630" />
    <line x1="1100" y1="0" x2="1100" y2="630" />
    <line x1="0" y1="120" x2="1200" y2="120" />
    <line x1="0" y1="280" x2="1200" y2="280" />
    <line x1="0" y1="440" x2="1200" y2="440" />
  </g>

  <!-- Header -->
  <g transform="translate(80, 70)">
    <rect width="44" height="44" rx="12" fill="#059669" />
    <text x="22" y="29" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900" text-anchor="middle">SC</text>
    <text x="58" y="24" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800">SmartRate<tspan fill="#34d399">Calcs</tspan></text>
    <text x="58" y="40" fill="#94a3b8" font-family="monospace" font-size="11" font-weight="700" letter-spacing="1.5">FINANCIAL INTELLIGENCE ENGINE &bull; 2026</text>
  </g>

  <!-- Category Badge -->
  <g transform="translate(80, 160)">
    <rect width="280" height="34" rx="17" fill="${p.color}" fill-opacity="0.18" stroke="${p.color}" stroke-width="1.5" />
    <circle cx="20" cy="17" r="4" fill="${p.color}" />
    <text x="32" y="22" fill="#ffffff" font-family="monospace" font-size="12" font-weight="800" letter-spacing="1">${p.badge}</text>
  </g>

  <!-- Main Title -->
  <text x="80" y="270" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="900" letter-spacing="-1">
    ${p.title}
  </text>

  <!-- Highlight Subtitle -->
  <text x="80" y="325" fill="#34d399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="700">
    ${p.highlight}
  </text>

  <!-- Stat Metric Card -->
  <g transform="translate(80, 390)">
    <rect width="480" height="110" rx="20" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1.5" />
    <text x="35" y="48" fill="#94a3b8" font-family="monospace" font-size="14" font-weight="600">${p.statLabel}</text>
    <text x="35" y="88" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="900">${p.statValue}</text>
  </g>

  <!-- Author Badge -->
  <g transform="translate(80, 560)">
    <circle cx="16" cy="16" r="16" fill="#10b981" />
    <text x="16" y="21" fill="#022c22" font-family="sans-serif" font-size="12" font-weight="900" text-anchor="middle">MN</text>
    <text x="44" y="21" fill="#cbd5e1" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700">Muhammad Naveed <tspan fill="#64748b" font-weight="400">&bull; Lead Systems Engineer</tspan></text>
  </g>
</svg>`;
}

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

for (const p of posts) {
  const svgContent = generateSvg(p);
  const svgPath = path.join(blogDir, `${p.slug}.svg`);
  fs.writeFileSync(svgPath, svgContent, 'utf-8');
  console.log(`Generated SVG: ${p.slug}.svg`);

  // Render to PNG via Headless Chrome
  const htmlTemp = path.join(blogDir, `temp_${p.slug}.html`);
  fs.writeFileSync(
    htmlTemp,
    `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#090d16;overflow:hidden;"><img src="data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}" style="width:1200px;height:630px;display:block;" /></body></html>`,
    'utf-8'
  );

  const pngPath = path.join(blogDir, `${p.slug}.png`);
  try {
    execFileSync(chromePath, [
      '--headless=new',
      `--screenshot=${pngPath}`,
      '--window-size=1200,630',
      '--hide-scrollbars',
      `file:///${htmlTemp.replace(/\\/g, '/')}`
    ]);
    console.log(`Rendered PNG: ${p.slug}.png`);
  } catch (err) {
    console.error(`Chrome PNG render failed for ${p.slug}:`, err.message);
  } finally {
    if (fs.existsSync(htmlTemp)) fs.unlinkSync(htmlTemp);
  }
}

console.log('All 6 blog featured images generated successfully!');
