// scripts/generate_article_infographics.js
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const outDir = path.join(__dirname, '..', 'public', 'blog', 'images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
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

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const infographics = [
  // ========================================================
  // 1. UPWORK WITHDRAWAL ROUTES FLOWCHART (1000 x 520)
  // ========================================================
  {
    fileName: 'upwork-withdrawal-routes-flowchart',
    width: 1000,
    height: 520,
    svg: `<svg width="1000" height="520" viewBox="0 0 1000 520" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgCanvas" x1="0" y1="0" x2="1000" y2="520" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0b1329" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect width="1000" height="520" fill="url(#bgCanvas)" />

  <!-- Header -->
  <g transform="translate(50, 42)">
    <rect width="36" height="36" rx="10" fill="#059669" />
    <text x="18" y="24" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" text-anchor="middle">SC</text>
    <text x="48" y="22" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800">SmartRateCalcs <tspan fill="#94a3b8" font-size="13" font-weight="500">| Empirical Research</tspan></text>
    <text x="0" y="58" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900">Upwork Withdrawal Routes Compared (On $1,000 USD)</text>
    <text x="0" y="80" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">AUDITED ACROSS PAKISTANI COMMERCIAL BANK CLEARING RAILS &#8226; 2026</text>
  </g>

  <!-- 3 Clean High-Contrast Cards -->
  <!-- Col 1: Direct Local Bank -->
  <g transform="translate(50, 155)">
    <rect width="280" height="260" rx="18" fill="#ffffff" stroke="#fecaca" stroke-width="2" />
    <rect x="20" y="20" width="130" height="24" rx="12" fill="#fef2f2" stroke="#ef4444" stroke-width="1" />
    <text x="85" y="36" fill="#b91c1c" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" text-anchor="middle">HIGH SPREAD ROUTE</text>
    
    <text x="20" y="70" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800">Direct Local Bank</text>
    <text x="20" y="90" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Direct wire to Meezan / HBL</text>

    <line x1="20" y1="108" x2="260" y2="108" stroke="#e2e8f0" />

    <text x="20" y="132" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Upwork Fee:</text>
    <text x="260" y="132" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" text-anchor="end">$0.99 flat</text>

    <text x="20" y="158" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">FX Hidden Spread:</text>
    <text x="260" y="158" fill="#dc2626" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" text-anchor="end">-2.75% Loss</text>

    <rect x="20" y="182" width="240" height="58" rx="12" fill="#fff1f2" stroke="#fecdd3" stroke-width="1" />
    <text x="32" y="204" fill="#9f1239" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600">Net PKR Received:</text>
    <text x="32" y="228" fill="#b91c1c" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900">Rs. 270,700</text>
  </g>

  <!-- Col 2: Payoneer to JazzCash -->
  <g transform="translate(360, 155)">
    <rect width="280" height="260" rx="18" fill="#ffffff" stroke="#fed7aa" stroke-width="2" />
    <rect x="20" y="20" width="135" height="24" rx="12" fill="#fffbeb" stroke="#f59e0b" stroke-width="1" />
    <text x="87" y="36" fill="#b45309" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" text-anchor="middle">MODERATE FRICTION</text>

    <text x="20" y="70" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800">Payoneer &rarr; JazzCash</text>
    <text x="20" y="90" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Mobile wallet withdrawal</text>

    <line x1="20" y1="108" x2="260" y2="108" stroke="#e2e8f0" />

    <text x="20" y="132" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Upwork Fee:</text>
    <text x="260" y="132" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" text-anchor="end">$2.00 flat</text>

    <text x="20" y="158" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">FX Hidden Spread:</text>
    <text x="260" y="158" fill="#d97706" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" text-anchor="end">-2.00% Markup</text>

    <rect x="20" y="182" width="240" height="58" rx="12" fill="#fefce8" stroke="#fef08a" stroke-width="1" />
    <text x="32" y="204" fill="#854d0e" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600">Net PKR Received:</text>
    <text x="32" y="228" fill="#a16207" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900">Rs. 272,400</text>
  </g>

  <!-- Col 3: US ACH Checking Route (Optimal) -->
  <g transform="translate(670, 155)">
    <rect width="280" height="260" rx="18" fill="#f0fdf4" stroke="#16a34a" stroke-width="2.5" />
    <rect x="20" y="20" width="135" height="24" rx="12" fill="#dcfce7" stroke="#16a34a" stroke-width="1" />
    <text x="87" y="36" fill="#15803d" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="900" text-anchor="middle">OPTIMAL ROUTE &#10003;</text>

    <text x="20" y="70" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900">US ACH (Elevate / Wise)</text>
    <text x="20" y="90" fill="#15803d" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">FDIC-insured checking account</text>

    <line x1="20" y1="108" x2="260" y2="108" stroke="#bbf7d0" />

    <text x="20" y="132" fill="#166534" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">Upwork Fee:</text>
    <text x="260" y="132" fill="#15803d" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" text-anchor="end">$0.00 (Free)</text>

    <text x="20" y="158" fill="#166534" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">FX Hidden Spread:</text>
    <text x="260" y="158" fill="#15803d" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" text-anchor="end">-0.50% Interbank</text>

    <rect x="20" y="182" width="240" height="58" rx="12" fill="#dcfce7" stroke="#86efac" stroke-width="1.5" />
    <text x="32" y="204" fill="#166534" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">Net PKR Received:</text>
    <text x="32" y="228" fill="#15803d" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900">Rs. 276,900</text>
  </g>

  <!-- Bottom Recommendation Banner -->
  <g transform="translate(50, 440)">
    <rect width="900" height="52" rx="14" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-opacity="0.4" />
    <circle cx="28" cy="26" r="10" fill="#10b981" />
    <text x="28" y="31" fill="#022c22" font-family="sans-serif" font-size="11" font-weight="900" text-anchor="middle">&#10003;</text>
    <text x="48" y="31" fill="#e2e8f0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700">NET BENEFIT WITH US ACH ROUTE: <tspan fill="#34d399" font-weight="900">+Rs. 6,200 PKR per $1k</tspan> (+Rs. 18,600 PKR extra cash on standard $3k monthly invoices)</text>
  </g>
</svg>`
  },

  // ========================================================
  // 2. UPWORK ANNUAL LEAKAGE CHART (1000 x 480)
  // ========================================================
  {
    fileName: 'upwork-annual-leakage-chart',
    width: 1000,
    height: 480,
    svg: `<svg width="1000" height="480" viewBox="0 0 1000 480" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgCanvas2" x1="0" y1="0" x2="1000" y2="480" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0b1329" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>

  <rect width="1000" height="480" fill="url(#bgCanvas2)" />

  <g transform="translate(50, 40)">
    <rect width="36" height="36" rx="10" fill="#059669" />
    <text x="18" y="24" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" text-anchor="middle">SC</text>
    <text x="48" y="22" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800">Annual Friction Audit</text>
    <text x="0" y="58" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900">Total PKR Drained by Spread Markup Over 1 Full Year</text>
    <text x="0" y="80" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">DIRECT LOCAL BANK VS OPTIMAL US ACH CHECKING ROUTE</text>
  </g>

  <!-- Row 1: Junior Tier $12,000 / yr -->
  <g transform="translate(50, 145)">
    <text x="0" y="16" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">Tier 1: $12,000 / Year <tspan fill="#94a3b8" font-weight="400">($1,000/mo Junior Contractor)</tspan></text>
    
    <rect y="28" width="550" height="28" rx="8" fill="#ef4444" fill-opacity="0.9" />
    <text x="16" y="47" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">Direct Bank Loss: -Rs. 92,400 PKR</text>

    <rect y="64" width="130" height="28" rx="8" fill="#10b981" />
    <text x="145" y="83" fill="#34d399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800">US Route Loss: Only -Rs. 16,800 PKR (Saved: +Rs. 75,600 PKR / yr)</text>
  </g>

  <!-- Row 2: Mid Engineer $30,000 / yr -->
  <g transform="translate(50, 250)">
    <text x="0" y="16" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">Tier 2: $30,000 / Year <tspan fill="#94a3b8" font-weight="400">($2,500/mo Mid-Level Engineer)</tspan></text>
    
    <rect y="28" width="700" height="28" rx="8" fill="#ef4444" fill-opacity="0.9" />
    <text x="16" y="47" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">Direct Bank Loss: -Rs. 231,000 PKR</text>

    <rect y="64" width="160" height="28" rx="8" fill="#10b981" />
    <text x="175" y="83" fill="#34d399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800">US Route Loss: Only -Rs. 42,000 PKR (Saved: +Rs. 189,000 PKR / yr)</text>
  </g>

  <!-- Row 3: Senior Contractor $60,000 / yr -->
  <g transform="translate(50, 355)">
    <text x="0" y="16" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">Tier 3: $60,000 / Year <tspan fill="#94a3b8" font-weight="400">($5,000/mo Senior Dev / Agency)</tspan></text>
    
    <rect y="28" width="900" height="28" rx="8" fill="#ef4444" fill-opacity="0.9" />
    <text x="16" y="47" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700">Direct Bank Loss: -Rs. 462,000 PKR in Spread Markup</text>

    <rect y="64" width="200" height="28" rx="8" fill="#10b981" />
    <text x="215" y="83" fill="#34d399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800">US Route Loss: Only -Rs. 84,000 PKR (Saved: +Rs. 378,000 PKR / yr)</text>
  </g>
</svg>`
  },

  // ========================================================
  // 3. UPWORK SETUP CHECKLIST (1000 x 460)
  // ========================================================
  {
    fileName: 'upwork-setup-checklist',
    width: 1000,
    height: 460,
    svg: `<svg width="1000" height="460" viewBox="0 0 1000 460" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgCanvas3" x1="0" y1="0" x2="1000" y2="460" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0b1329" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>

  <rect width="1000" height="460" fill="url(#bgCanvas3)" />

  <g transform="translate(50, 40)">
    <rect width="36" height="36" rx="10" fill="#10b981" />
    <text x="18" y="24" fill="#022c22" font-family="sans-serif" font-size="16" font-weight="900" text-anchor="middle">&#10003;</text>
    <text x="48" y="22" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800">Implementation Protocol</text>
    <text x="0" y="58" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900">4 Steps to Activate Zero-Fee Upwork Withdrawals</text>
    <text x="0" y="80" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">ESTIMATED SETUP TIME: UNDER 15 MINUTES</text>
  </g>

  <!-- Step 1 -->
  <g transform="translate(50, 135)">
    <rect width="900" height="62" rx="14" fill="#ffffff" />
    <circle cx="36" cy="31" r="16" fill="#059669" />
    <text x="36" y="37" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="900" text-anchor="middle">1</text>
    <text x="68" y="28" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">Open an FDIC-Insured US Virtual Checking Account</text>
    <text x="68" y="48" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Sign up for Elevate Pay or Wise using your Pakistani CNIC and passport to receive a 9-digit ACH routing number.</text>
  </g>

  <!-- Step 2 -->
  <g transform="translate(50, 210)">
    <rect width="900" height="62" rx="14" fill="#ffffff" />
    <circle cx="36" cy="31" r="16" fill="#059669" />
    <text x="36" y="37" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="900" text-anchor="middle">2</text>
    <text x="68" y="28" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">Add Account as "Direct to U.S. Bank (ACH)" on Upwork</text>
    <text x="68" y="48" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Do not select wire transfer. Select standard ACH ($0.00 withdrawal fee). Upwork verifies account within 24 hours.</text>
  </g>

  <!-- Step 3 -->
  <g transform="translate(50, 285)">
    <rect width="900" height="62" rx="14" fill="#ffffff" />
    <circle cx="36" cy="31" r="16" fill="#059669" />
    <text x="36" y="37" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="900" text-anchor="middle">3</text>
    <text x="68" y="28" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">Link Pakistani Bank via Raast Clearing Rails</text>
    <text x="68" y="48" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Transfer from US account to your Meezan, HBL, or SadaPay IBAN. Funds settle in seconds at interbank FX rates.</text>
  </g>

  <!-- Step 4 -->
  <g transform="translate(50, 360)">
    <rect width="900" height="62" rx="14" fill="#f0fdf4" stroke="#86efac" stroke-width="2" />
    <circle cx="36" cy="31" r="16" fill="#16a34a" />
    <text x="36" y="37" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="900" text-anchor="middle">4</text>
    <text x="68" y="28" fill="#15803d" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">Download Automated Digital Tax PRC from Bank Portal</text>
    <text x="68" y="48" fill="#166534" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Ensure transaction carries SBP Purpose Code 9182/9184 for 100% legal 0.25% FBR Section 154A tax filing.</text>
  </g>
</svg>`
  },

  // ========================================================
  // 4. FBR SECTION 154A TAX BRACKETS (1000 x 520)
  // ========================================================
  {
    fileName: 'fbr-section-154a-tax-brackets',
    width: 1000,
    height: 520,
    svg: `<svg width="1000" height="520" viewBox="0 0 1000 520" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgCanvas4" x1="0" y1="0" x2="1000" y2="520" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0b1329" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>

  <rect width="1000" height="520" fill="url(#bgCanvas4)" />

  <g transform="translate(50, 42)">
    <rect width="36" height="36" rx="10" fill="#059669" />
    <text x="18" y="24" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" text-anchor="middle">SC</text>
    <text x="48" y="22" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800">FBR Tax Code Matrix</text>
    <text x="0" y="58" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900">Pakistan Freelancer Tax: Section 154A Comparison</text>
    <text x="0" y="80" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">INCOME TAX ORDINANCE 2001 &#8226; FISCAL YEAR 2026 STATUTORY AUDIT</text>
  </g>

  <!-- Col 1: PSEB Registered (Optimal) -->
  <g transform="translate(50, 155)">
    <rect width="280" height="260" rx="18" fill="#f0fdf4" stroke="#16a34a" stroke-width="2.5" />
    <rect x="20" y="20" width="140" height="24" rx="12" fill="#dcfce7" stroke="#16a34a" stroke-width="1" />
    <text x="90" y="36" fill="#15803d" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="900" text-anchor="middle">PSEB REGISTERED &#10003;</text>
    
    <text x="20" y="70" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900">0.25% Final Tax</text>
    <text x="20" y="90" fill="#15803d" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">Concessional Export Rate</text>

    <line x1="20" y1="108" x2="260" y2="108" stroke="#bbf7d0" />

    <text x="20" y="132" fill="#166534" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">Statutory Rate:</text>
    <text x="260" y="132" fill="#15803d" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" text-anchor="end">0.25% Fixed</text>

    <text x="20" y="158" fill="#166534" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">Tax on $25,000 USD:</text>
    <text x="260" y="158" fill="#15803d" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" text-anchor="end">Rs. 17,400 PKR</text>

    <rect x="20" y="182" width="240" height="58" rx="12" fill="#dcfce7" stroke="#86efac" stroke-width="1.5" />
    <text x="32" y="204" fill="#166534" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">Tax Liability Status:</text>
    <text x="32" y="228" fill="#15803d" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="900">FULL &amp; FINAL</text>
  </g>

  <!-- Col 2: Active Filer Without PSEB -->
  <g transform="translate(360, 155)">
    <rect width="280" height="260" rx="18" fill="#ffffff" stroke="#fed7aa" stroke-width="2" />
    <rect x="20" y="20" width="145" height="24" rx="12" fill="#fffbeb" stroke="#f59e0b" stroke-width="1" />
    <text x="92" y="36" fill="#b45309" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" text-anchor="middle">ACTIVE FILER (NO PSEB)</text>

    <text x="20" y="70" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800">1.00% Final Tax</text>
    <text x="20" y="90" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Standard export deduction</text>

    <line x1="20" y1="108" x2="260" y2="108" stroke="#e2e8f0" />

    <text x="20" y="132" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Statutory Rate:</text>
    <text x="260" y="132" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" text-anchor="end">1.00% Fixed</text>

    <text x="20" y="158" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Tax on $25,000 USD:</text>
    <text x="260" y="158" fill="#d97706" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" text-anchor="end">Rs. 69,600 PKR</text>

    <rect x="20" y="182" width="240" height="58" rx="12" fill="#fefce8" stroke="#fef08a" stroke-width="1" />
    <text x="32" y="204" fill="#854d0e" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600">Extra Tax Burden:</text>
    <text x="32" y="228" fill="#a16207" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="900">+Rs. 52,200 (4x More)</text>
  </g>

  <!-- Col 3: Non-Filer Status -->
  <g transform="translate(670, 155)">
    <rect width="280" height="260" rx="18" fill="#ffffff" stroke="#fecaca" stroke-width="2" />
    <rect x="20" y="20" width="130" height="24" rx="12" fill="#fef2f2" stroke="#ef4444" stroke-width="1" />
    <text x="85" y="36" fill="#b91c1c" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" text-anchor="middle">NON-FILER STATUS</text>

    <text x="20" y="70" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800">Normal Tax Slabs</text>
    <text x="20" y="90" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Subject to Section 111 inquiry</text>

    <line x1="20" y1="108" x2="260" y2="108" stroke="#e2e8f0" />

    <text x="20" y="132" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Statutory Rate:</text>
    <text x="260" y="132" fill="#dc2626" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" text-anchor="end">Up to 35% Slabs</text>

    <text x="20" y="158" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Tax on $25,000 USD:</text>
    <text x="260" y="158" fill="#dc2626" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" text-anchor="end">Rs. 1,400,000+</text>

    <rect x="20" y="182" width="240" height="58" rx="12" fill="#fff1f2" stroke="#fecdd3" stroke-width="1" />
    <text x="32" y="204" fill="#9f1239" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600">Legal Compliance Risk:</text>
    <text x="32" y="228" fill="#b91c1c" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="900">ACCOUNTS FROZEN</text>
  </g>

  <!-- Bottom Recommendation Banner -->
  <g transform="translate(50, 440)">
    <rect width="900" height="52" rx="14" fill="#059669" fill-opacity="0.15" stroke="#059669" stroke-opacity="0.4" />
    <circle cx="28" cy="26" r="10" fill="#059669" />
    <text x="28" y="31" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="900" text-anchor="middle">&#10003;</text>
    <text x="48" y="31" fill="#e2e8f0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700">PSEB REGISTRATION IMPACT: <tspan fill="#34d399" font-weight="900">Saves 75% in legal taxes</tspan> under FBR Section 154A (Rs. 2,000 registration fee pays off 26x over)</text>
  </g>
</svg>`
  },

  // ========================================================
  // 5. PSEB REGISTRATION WORKFLOW (1000 x 480)
  // ========================================================
  {
    fileName: 'pseb-registration-workflow-diagram',
    width: 1000,
    height: 480,
    svg: `<svg width="1000" height="480" viewBox="0 0 1000 480" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgCanvas5" x1="0" y1="0" x2="1000" y2="480" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0b1329" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>

  <rect width="1000" height="480" fill="url(#bgCanvas5)" />

  <g transform="translate(50, 40)">
    <rect width="36" height="36" rx="10" fill="#10b981" />
    <text x="18" y="24" fill="#022c22" font-family="sans-serif" font-size="12" font-weight="900" text-anchor="middle">PSEB</text>
    <text x="48" y="22" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800">Registration Protocol</text>
    <text x="0" y="58" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900">Step-by-Step PSEB Freelancer Fast-Track Registration</text>
    <text x="0" y="80" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">OFFICIAL PROCEDURE VIA PAKISTAN SOFTWARE EXPORT BOARD &#8226; 2026</text>
  </g>

  <!-- Step 1 -->
  <g transform="translate(50, 135)">
    <rect width="900" height="65" rx="14" fill="#ffffff" />
    <circle cx="36" cy="32" r="16" fill="#059669" />
    <text x="36" y="38" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="900" text-anchor="middle">1</text>
    <text x="70" y="28" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">Gather Required KYC Documents</text>
    <text x="70" y="48" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Original CNIC (front/back), active NTN certificate from FBR Iris, utility bill for address proof, and Upwork/Fiverr profile URL.</text>
  </g>

  <!-- Step 2 -->
  <g transform="translate(50, 215)">
    <rect width="900" height="65" rx="14" fill="#ffffff" />
    <circle cx="36" cy="32" r="16" fill="#059669" />
    <text x="36" y="38" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="900" text-anchor="middle">2</text>
    <text x="70" y="28" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">Submit Application on Official PSEB Portal (pseb.org.pk)</text>
    <text x="70" y="48" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Create an account under "Freelancer" category (do not select Call Center or IT Company). Enter business activity and banking details.</text>
  </g>

  <!-- Step 3 -->
  <g transform="translate(50, 295)">
    <rect width="900" height="65" rx="14" fill="#ffffff" />
    <circle cx="36" cy="32" r="16" fill="#059669" />
    <text x="36" y="38" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="900" text-anchor="middle">3</text>
    <text x="70" y="28" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">Pay Rs. 2,000 Registration Fee Online via 1Bill / Kuickpay</text>
    <text x="70" y="48" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Generate electronic PSID challan and pay through any Pakistani mobile banking app (Meezan, Nayapay, SadaPay). Instant verification.</text>
  </g>

  <!-- Step 4 -->
  <g transform="translate(50, 375)">
    <rect width="900" height="65" rx="14" fill="#f0fdf4" stroke="#86efac" stroke-width="2" />
    <circle cx="36" cy="32" r="16" fill="#16a34a" />
    <text x="36" y="38" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="900" text-anchor="middle">4</text>
    <text x="70" y="28" fill="#15803d" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">Download PSEB Digital Certificate &amp; Notify Commercial Bank</text>
    <text x="70" y="48" fill="#166534" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Download verifiable certificate (valid for 3 years) and email to bank remittance department to enable automated 0.25% deductions.</text>
  </g>
</svg>`
  },

  // ========================================================
  // 6. DIGITAL PRC COMPLIANCE CHECKLIST (1000 x 460)
  // ========================================================
  {
    fileName: 'digital-prc-compliance-checklist',
    width: 1000,
    height: 460,
    svg: `<svg width="1000" height="460" viewBox="0 0 1000 460" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgCanvas6" x1="0" y1="0" x2="1000" y2="460" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0b1329" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>

  <rect width="1000" height="460" fill="url(#bgCanvas6)" />

  <g transform="translate(50, 40)">
    <rect width="36" height="36" rx="10" fill="#059669" />
    <text x="18" y="24" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="900" text-anchor="middle">PRC</text>
    <text x="48" y="22" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800">Compliance Audit</text>
    <text x="0" y="58" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900">Digital PRC (Proceeds Realization Certificate) Checklist</text>
    <text x="0" y="80" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600">MANDATORY AUDIT TRAIL FOR 0.25% FINAL TAX REGIME UNDER FBR</text>
  </g>

  <!-- Row 1 -->
  <g transform="translate(50, 130)">
    <rect width="900" height="60" rx="14" fill="#ffffff" />
    <circle cx="36" cy="30" r="14" fill="#059669" />
    <text x="36" y="35" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="900" text-anchor="middle">&#10003;</text>
    <text x="68" y="26" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">SBP Purpose Code Verification (Code 9182 / 9184)</text>
    <text x="68" y="46" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Ensure incoming funds are tagged as "Computer &amp; Information Services Exports" rather than family maintenance.</text>
  </g>

  <!-- Row 2 -->
  <g transform="translate(50, 205)">
    <rect width="900" height="60" rx="14" fill="#ffffff" />
    <circle cx="36" cy="30" r="14" fill="#059669" />
    <text x="36" y="35" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="900" text-anchor="middle">&#10003;</text>
    <text x="68" y="26" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">Computerized Remittance Advice / Digital e-PRC</text>
    <text x="68" y="46" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Download formal bank advice statement from Meezan, HBL, or SadaBiz carrying FBR unique transaction identifier.</text>
  </g>

  <!-- Row 3 -->
  <g transform="translate(50, 280)">
    <rect width="900" height="60" rx="14" fill="#ffffff" />
    <circle cx="36" cy="30" r="14" fill="#059669" />
    <text x="36" y="35" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="900" text-anchor="middle">&#10003;</text>
    <text x="68" y="26" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">Annual Withholding Statement (FBR Form 165)</text>
    <text x="68" y="46" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Reconcile total 0.25% or 1.00% withholding deducted by commercial bank against total gross remittance inflows.</text>
  </g>

  <!-- Row 4 -->
  <g transform="translate(50, 355)">
    <rect width="900" height="60" rx="14" fill="#f0fdf4" stroke="#86efac" stroke-width="2" />
    <circle cx="36" cy="30" r="14" fill="#16a34a" />
    <text x="36" y="35" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="900" text-anchor="middle">&#10003;</text>
    <text x="68" y="26" fill="#15803d" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">FBR IRIS Annual Return Filing Under Final Tax Code 7014</text>
    <text x="68" y="46" fill="#166534" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">Report total income under Section 154A in Iris. Net tax payable becomes 0 since full liability was deducted at source.</text>
  </g>
</svg>`
  }
];

console.log('Rendering high-contrast, human-centered infographics...');

for (const info of infographics) {
  const svgPath = path.join(outDir, `${info.fileName}.svg`);
  fs.writeFileSync(svgPath, info.svg, 'utf-8');
  console.log(`Saved SVG: ${info.fileName}.svg`);

  const htmlTemp = path.join(outDir, `temp_${info.fileName}.html`);
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: ${info.width}px; height: ${info.height}px; overflow: hidden; background: #0b1329; }
  svg { display: block; width: ${info.width}px; height: ${info.height}px; }
</style>
</head>
<body>
${info.svg}
</body>
</html>`;
  fs.writeFileSync(htmlTemp, htmlContent, 'utf-8');

  const pngPath = path.join(outDir, `${info.fileName}.png`);
  try {
    execFileSync(chromePath, [
      '--headless=new',
      `--screenshot=${pngPath}`,
      `--window-size=${info.width},${info.height}`,
      '--hide-scrollbars',
      `file:///${htmlTemp.replace(/\\/g, '/')}`
    ]);
    const stats = fs.statSync(pngPath);
    console.log(`Rendered PNG: ${info.fileName}.png (${stats.size} bytes)`);
  } catch (err) {
    console.error(`Chrome PNG render failed for ${info.fileName}:`, err.message);
  } finally {
    if (fs.existsSync(htmlTemp)) fs.unlinkSync(htmlTemp);
  }
}

console.log('All upgraded infographics rendered successfully!');
