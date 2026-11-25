const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve(__dirname, '..');
const blogDir = path.join(rootDir, 'public', 'blog');
const imagesDir = path.join(blogDir, 'images');
const tmpDir = path.join(rootDir, '.tmp_render');

fs.mkdirSync(blogDir, { recursive: true });
fs.mkdirSync(imagesDir, { recursive: true });
fs.mkdirSync(tmpDir, { recursive: true });

function renderHtmlToPng(htmlContent, outPngPath, width, height) {
  const htmlPath = path.join(tmpDir, `${path.basename(outPngPath, '.png')}.html`);
  const fullHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: ${width}px;
    height: ${height}px;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
</style>
</head>
<body>
${htmlContent}
</body>
</html>`;
  fs.writeFileSync(htmlPath, fullHtml, 'utf8');
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  execFileSync(
    chromePath,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      `--window-size=${width},${height}`,
      `--screenshot=${outPngPath}`,
      fileUrl,
    ],
    { stdio: 'pipe' }
  );
  const stat = fs.statSync(outPngPath);
  console.log(`Rendered: ${path.relative(rootDir, outPngPath)} (${(stat.size / 1024).toFixed(1)} KB)`);
}

function cardFrame({ width, height, bgGradient, borderColor, badge, title, subtitle, bodyHtml, footerRight }) {
  return `
  <div style="width:${width}px;height:${height}px;background:${bgGradient};position:relative;padding:48px 56px;color:#f8fafc;display:flex;flex-direction:column;justify-content:space-between;border:3px solid ${borderColor};">
    <div style="position:absolute;top:-120px;right:-100px;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle, ${borderColor}33 0%, transparent 70%);pointer-events:none;"></div>
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:34px;height:34px;border-radius:10px;background:#10b981;color:#fff;font-weight:900;font-size:18px;display:flex;align-items:center;justify-content:center;">$</div>
        <span style="font-size:16px;font-weight:800;letter-spacing:1.5px;color:#94a3b8;">SMARTRATECALCS.COM</span>
      </div>
      <div style="padding:8px 18px;border-radius:999px;background:rgba(255,255,255,0.08);border:1px solid ${borderColor};font-size:13px;font-weight:800;letter-spacing:1.2px;color:#fff;">
        ${badge}
      </div>
    </div>

    <div style="margin-top:16px;">
      <h1 style="font-size:${width === 1200 && height === 630 ? '42px' : '34px'};font-weight:900;line-height:1.14;letter-spacing:-0.8px;color:#ffffff;margin-bottom:10px;">
        ${title}
      </h1>
      <p style="font-size:${width === 1200 && height === 630 ? '19px' : '17px'};font-weight:500;color:#cbd5e1;">
        ${subtitle}
      </p>
    </div>

    <div style="flex:1;display:flex;align-items:center;margin:20px 0;">
      ${bodyHtml}
    </div>

    <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(255,255,255,0.12);padding-top:14px;font-size:12px;font-weight:700;color:#94a3b8;letter-spacing:0.8px;">
      <span>VERIFIED 2026 FEE SCHEDULE ENGINEERING</span>
      <span>${footerRight || 'MUHAMMAD NAVEED | SMARTRATECALCS'}</span>
    </div>
  </div>`;
}

// =====================================================================
// 1. REVERB BLOG ASSETS (1 Cover + 3 Infographics)
// =====================================================================
const reverbCover = cardFrame({
  width: 1200,
  height: 630,
  bgGradient: 'linear-gradient(135deg, #1a0c04 0%, #2a1205 55%, #0f172a 100%)',
  borderColor: '#f97316',
  badge: '2026 MUSIC GEAR GUIDE',
  title: 'Reverb Seller Fees in 2026: Complete 5% Cap &amp; Net Payout Math',
  subtitle: '5% Selling Fee ($500 Cap) | 3.19% + $0.49 Tax-Inclusive Processing | Bump Ads vs eBay',
  bodyHtml: `
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:22px;width:100%;">
    <div style="background:rgba(255,255,255,0.04);border:1.5px solid rgba(249,115,22,0.45);border-radius:20px;padding:24px;">
      <div style="font-size:12px;font-weight:800;color:#fdba74;letter-spacing:1px;">SELLING FEE RATE</div>
      <div style="font-size:44px;font-weight:900;color:#ffffff;font-family:monospace;margin:10px 0;">5.0%</div>
      <div style="font-size:14px;color:#cbd5e1;line-height:1.45;">Min $0.50 | Hard capped at <strong>$500</strong> above $10,000 sale total.</div>
    </div>
    <div style="background:rgba(249,115,22,0.10);border:1.5px solid rgba(249,115,22,0.65);border-radius:20px;padding:24px;">
      <div style="font-size:12px;font-weight:800;color:#fed7aa;letter-spacing:1px;">REVERB PAYMENTS</div>
      <div style="font-size:40px;font-weight:900;color:#fb923c;font-family:monospace;margin:10px 0;">3.19%+$0.49</div>
      <div style="font-size:14px;color:#e2e8f0;line-height:1.45;">2.99% + $0.49 Preferred Seller. Charged on <strong>Tax-Included</strong> checkout!</div>
    </div>
    <div style="background:rgba(16,185,129,0.08);border:1.5px solid rgba(16,185,129,0.45);border-radius:20px;padding:24px;">
      <div style="font-size:12px;font-weight:800;color:#6ee7b7;letter-spacing:1px;">VS EBAY MUSIC GEAR</div>
      <div style="font-size:40px;font-weight:900;color:#34d399;font-family:monospace;margin:10px 0;">~8.19%</div>
      <div style="font-size:14px;color:#cbd5e1;line-height:1.45;">Saves $275+ vs eBay on a $1,500 amp and up to $380 on Vintage Gibsons.</div>
    </div>
  </div>`,
});

const reverbFig1 = cardFrame({
  width: 1200,
  height: 800,
  bgGradient: 'linear-gradient(155deg, #0f172a 0%, #1c1008 100%)',
  borderColor: '#f97316',
  badge: 'FIGURE 1: FEE CAP CURVE',
  title: 'Reverb $500 Selling Fee Cap vs Uncapped Sales',
  subtitle: 'At $10,000 (Item + Buyer Shipping), the 5.0% Reverb selling fee locks permanently at $500.00',
  bodyHtml: `
  <div style="width:100%;display:flex;flex-direction:column;gap:18px;">
    <div style="display:grid;grid-template-columns:160px 1fr 140px 140px;gap:16px;padding:12px 20px;font-size:13px;font-weight:800;color:#fdba74;border-bottom:1px solid rgba(255,255,255,0.15);">
      <span>GEAR VALUE</span><span>5% SELLING FEE BAR (MAX $500 CAP)</span><span>SELLING FEE</span><span>NET PAYOUT*</span>
    </div>
    ${[
      { label: '$500 Pedalboard', pct: 5, fee: '$25.00', net: '$458.56', color: '#fb923c' },
      { label: '$1,500 Fender Amp', pct: 15, fee: '$75.00', net: '$1,376.66', color: '#fb923c' },
      { label: '$5,000 Synth Rig', pct: 50, fee: '$250.00', net: '$4,590.01', color: '#f97316' },
      { label: '$10,000 Gibson VOS', pct: 100, fee: '$500.00 CAP', net: '$9,180.51', color: '#ef4444' },
      { label: '$18,000 Vintage Neve', pct: 100, fee: '$500.00 CAP', net: '$16,925.31', color: '#10b981' },
    ]
      .map(
        (r) => `
    <div style="display:grid;grid-template-columns:160px 1fr 140px 140px;gap:16px;align-items:center;background:rgba(255,255,255,0.03);padding:16px 20px;border-radius:14px;border:1px solid rgba(255,255,255,0.08);">
      <span style="font-size:15px;font-weight:800;color:#fff;">${r.label}</span>
      <div style="height:26px;background:rgba(255,255,255,0.08);border-radius:8px;overflow:hidden;">
        <div style="width:${r.pct}%;height:100%;background:${r.color};border-radius:8px;"></div>
      </div>
      <span style="font-size:15px;font-weight:800;font-family:monospace;color:${r.color};">${r.fee}</span>
      <span style="font-size:15px;font-weight:800;font-family:monospace;color:#34d399;">${r.net}</span>
    </div>`
      )
      .join('')}
    <div style="font-size:13px;color:#94a3b8;margin-top:4px;">*Net Payout assumes US standard 3.19% + $0.49 Reverb Payments processing at 0% tax, $0 buyer-paid shipping.</div>
  </div>`,
});

const reverbFig2 = cardFrame({
  width: 1200,
  height: 800,
  bgGradient: 'linear-gradient(155deg, #090d16 0%, #1e130c 100%)',
  borderColor: '#fb923c',
  badge: 'FIGURE 2: SALES TAX TRAP',
  title: 'Hidden Processing Bleed: Tax Is Charged Before 3.19% Fee',
  subtitle: 'Example: Selling a $1,200.00 Guitar + $65.00 Buyer Shipping to an 8.25% Sales Tax State',
  bodyHtml: `
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;width:100%;">
    <div style="background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.12);border-radius:20px;padding:28px;display:flex;flex-direction:column;gap:14px;">
      <div style="font-size:14px;font-weight:900;color:#fdba74;letter-spacing:1px;">CHECKOUT MATH BREAKDOWN</div>
      <div style="display:flex;justify-content:space-between;font-size:16px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
        <span>Guitar Item Price</span><strong style="font-family:monospace;">$1,200.00</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:16px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
        <span>Buyer-Paid Shipping</span><strong style="font-family:monospace;">$65.00</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:16px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
        <span>8.25% Sales Tax Collected</span><strong style="font-family:monospace;color:#f87171;">+$104.36</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:18px;padding-top:8px;color:#fb923c;">
        <span>Full Buyer Checkout Total</span><strong style="font-family:monospace;">$1,369.36</strong>
      </div>
    </div>
    <div style="background:rgba(249,115,22,0.08);border:1.5px solid rgba(249,115,22,0.5);border-radius:20px;padding:28px;display:flex;flex-direction:column;gap:14px;">
      <div style="font-size:14px;font-weight:900;color:#ffffff;letter-spacing:1px;">ACTUAL SELLER DEDUCTIONS</div>
      <div style="display:flex;justify-content:space-between;font-size:16px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
        <span>5% Selling Fee (on $1,265)</span><strong style="font-family:monospace;color:#fb923c;">-$63.25</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:16px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
        <span>3.19% + $0.49 (on $1,369.36!)</span><strong style="font-family:monospace;color:#f87171;">-$44.17</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:15px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#94a3b8;">
        <span>Extra Tax-Fee Bleed vs 0% Tax</span><strong style="font-family:monospace;color:#fbbf24;">-$3.33 hidden</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:20px;padding-top:8px;color:#34d399;">
        <span>Net Payout Before Label</span><strong style="font-family:monospace;">$1,157.58</strong>
      </div>
    </div>
  </div>`,
});

const reverbFig3 = cardFrame({
  width: 1200,
  height: 800,
  bgGradient: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)',
  borderColor: '#38bdf8',
  badge: 'FIGURE 3: CROSS-MARKETPLACE BENCHMARK',
  title: 'Where Should You Sell a $1,000 Instrument in 2026?',
  subtitle: 'Net Payout Comparison on $1,000.00 Sale (Free Shipping Model, 0% State Tax Adjustment)',
  bodyHtml: `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px;width:100%;">
    ${[
      { name: 'Reverb Preferred', fee: '$80.39', pct: '8.04%', net: '$919.61', border: '#10b981', badge: 'BEST NET' },
      { name: 'Reverb Standard', fee: '$82.39', pct: '8.24%', net: '$917.61', border: '#f97316', badge: 'MUSIC NICHE' },
      { name: 'eBay Guitars (6.35%+)', fee: '$66.85*', pct: '6.69%*', net: '$933.15*', border: '#38bdf8', badge: 'CATEGORY EXCEPTION' },
      { name: 'eBay Standard (13.6%)', fee: '$136.40', pct: '13.64%', net: '$863.60', border: '#ef4444', badge: 'PRO AUDIO / ACC' },
    ]
      .map(
        (c) => `
    <div style="background:rgba(255,255,255,0.04);border:2px solid ${c.border};border-radius:18px;padding:24px;display:flex;flex-direction:column;justify-content:space-between;height:280px;">
      <div>
        <div style="font-size:11px;font-weight:900;color:${c.border};letter-spacing:1px;">${c.badge}</div>
        <div style="font-size:18px;font-weight:800;color:#fff;margin-top:8px;">${c.name}</div>
      </div>
      <div>
        <div style="font-size:13px;color:#94a3b8;">Total Fees: <strong style="color:#f87171;">${c.fee} (${c.pct})</strong></div>
        <div style="font-size:30px;font-weight:900;color:#34d399;font-family:monospace;margin-top:8px;">${c.net}</div>
      </div>
    </div>`
      )
      .join('')}
  </div>`,
  footerRight: '*eBay Guitars/Basses rate (6.35% up to $7.5k) excludes Pro Audio/DJ 13.6% categories',
});

// =====================================================================
// 2. MERCARI BLOG ASSETS (1 Cover + 3 Infographics)
// =====================================================================
const mercariCover = cardFrame({
  width: 1200,
  height: 630,
  bgGradient: 'linear-gradient(135deg, #0c0a24 0%, #1e1b4b 55%, #0f172a 100%)',
  borderColor: '#6366f1',
  badge: '2026 RESELLER PLAYBOOK',
  title: 'Mercari Seller Fees 2026: Flat 10% + $0 Processing Guide',
  subtitle: '10% Flat on Item + Buyer Shipping | 3.6% Buyer Protection Fee | $3 Instant Pay vs $0 ACH',
  bodyHtml: `
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:22px;width:100%;">
    <div style="background:rgba(255,255,255,0.04);border:1.5px solid rgba(99,102,241,0.55);border-radius:20px;padding:24px;">
      <div style="font-size:12px;font-weight:800;color:#a5b4fc;letter-spacing:1px;">SELLER FEE RATE</div>
      <div style="font-size:44px;font-weight:900;color:#ffffff;font-family:monospace;margin:10px 0;">10.0%</div>
      <div style="font-size:14px;color:#cbd5e1;line-height:1.45;">Charged on <strong>Item Price + Buyer-Paid Shipping</strong>. Zero card fee!</div>
    </div>
    <div style="background:rgba(99,102,241,0.12);border:1.5px solid rgba(129,140,248,0.65);border-radius:20px;padding:24px;">
      <div style="font-size:12px;font-weight:800;color:#c7d2fe;letter-spacing:1px;">PROCESSING CUT</div>
      <div style="font-size:44px;font-weight:900;color:#34d399;font-family:monospace;margin:10px 0;">$0.00</div>
      <div style="font-size:14px;color:#e2e8f0;line-height:1.45;">Unlike eBay/Etsy (~3%), Mercari absorbs payment processing inside 10%.</div>
    </div>
    <div style="background:rgba(56,189,248,0.08);border:1.5px solid rgba(56,189,248,0.45);border-radius:20px;padding:24px;">
      <div style="font-size:12px;font-weight:800;color:#7dd3fc;letter-spacing:1px;">BUYER FEE CHECKOUT</div>
      <div style="font-size:44px;font-weight:900;color:#38bdf8;font-family:monospace;margin:10px 0;">3.6%</div>
      <div style="font-size:14px;color:#cbd5e1;line-height:1.45;">Buyer pays 3.6% Buyer Protection fee on checkout item + shipping total.</div>
    </div>
  </div>`,
});

const mercariFig1 = cardFrame({
  width: 1200,
  height: 800,
  bgGradient: 'linear-gradient(155deg, #0f172a 0%, #1e1b4b 100%)',
  borderColor: '#6366f1',
  badge: 'FIGURE 1: BUYER-PAID SHIPPING FEE RULE',
  title: 'Hidden 10% Leak: Charging Buyer $12 Shipping Costs You $1.20',
  subtitle: 'Selling a $60 Sneaker with $12 Buyer-Paid Label vs $72 Free Shipping Model',
  bodyHtml: `
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;width:100%;">
    <div style="background:rgba(255,255,255,0.04);border:1.5px solid rgba(248,113,113,0.45);border-radius:20px;padding:28px;display:flex;flex-direction:column;gap:14px;">
      <div style="font-size:14px;font-weight:900;color:#fca5a5;letter-spacing:1px;">BUYER-PAID MERCARI LABEL ($60 + $12)</div>
      <div style="display:flex;justify-content:space-between;font-size:16px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
        <span>Item Sale Price</span><strong style="font-family:monospace;">$60.00</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:16px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
        <span>Buyer Shipping Label</span><strong style="font-family:monospace;">$12.00</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:16px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
        <span>10% Fee Basis (Item + Ship!)</span><strong style="font-family:monospace;color:#fbbf24;">$72.00</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:16px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
        <span>Seller Fee Deducted (10%)</span><strong style="font-family:monospace;color:#f87171;">-$7.20 (12% of item!)</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:20px;padding-top:8px;color:#34d399;">
        <span>Seller Net Payout</span><strong style="font-family:monospace;">$52.80</strong>
      </div>
    </div>
    <div style="background:rgba(99,102,241,0.10);border:1.5px solid rgba(99,102,241,0.55);border-radius:20px;padding:28px;display:flex;flex-direction:column;gap:14px;">
      <div style="font-size:14px;font-weight:900;color:#a5b4fc;letter-spacing:1px;">SHIP-ON-OWN $72 FREE SHIP ($8.40 PIRATE SHIP)</div>
      <div style="display:flex;justify-content:space-between;font-size:16px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
        <span>All-In Listing Price</span><strong style="font-family:monospace;">$72.00</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:16px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
        <span>10% Seller Fee (on $72)</span><strong style="font-family:monospace;color:#f87171;">-$7.20</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:16px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
        <span>Commercial Cubic Label</span><strong style="font-family:monospace;color:#38bdf8;">-$8.40</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:16px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
        <span>Buyer Saves vs $72 + 3.6%</span><strong style="font-family:monospace;color:#a5b4fc;">Same Checkout!</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:20px;padding-top:8px;color:#34d399;">
        <span>Seller Net Payout</span><strong style="font-family:monospace;">$56.40 (+$3.60)</strong>
      </div>
    </div>
  </div>`,
});

const mercariFig2 = cardFrame({
  width: 1200,
  height: 800,
  bgGradient: 'linear-gradient(155deg, #090d16 0%, #17153b 100%)',
  borderColor: '#818cf8',
  badge: 'FIGURE 2: MARKETPLACE COMPARISON',
  title: 'Mercari vs Poshmark vs eBay vs Depop ($100 Apparel Sale)',
  subtitle: 'Take-home payout before COGS on a $100.00 item with buyer paying standard shipping',
  bodyHtml: `
  <div style="width:100%;display:flex;flex-direction:column;gap:18px;">
    ${[
      { name: 'Mercari (2026: 10% + $0 Processing)', fee: '$10.00 (10.0%)', net: '$90.00', bar: 90, color: '#6366f1' },
      { name: 'Depop US (0% Sell + 3.3% + $0.45)', fee: '$3.75 (3.75%)', net: '$96.25', bar: 96, color: '#10b981' },
      { name: 'eBay Managed Payments (13.6% + $0.40)', fee: '$14.00 (14.0%)', net: '$86.00', bar: 86, color: '#38bdf8' },
      { name: 'Poshmark Standard (Flat 20%)', fee: '$20.00 (20.0%)', net: '$80.00', bar: 80, color: '#f43f5e' },
    ]
      .map(
        (m) => `
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:18px 24px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:10px;font-size:17px;font-weight:800;">
        <span>${m.name}</span>
        <span>Fee: <span style="color:#f87171;">${m.fee}</span> &nbsp;|&nbsp; Net: <span style="color:#34d399;font-family:monospace;">${m.net}</span></span>
      </div>
      <div style="height:22px;background:rgba(255,255,255,0.08);border-radius:8px;overflow:hidden;">
        <div style="width:${m.bar}%;height:100%;background:${m.color};border-radius:8px;"></div>
      </div>
    </div>`
      )
      .join('')}
  </div>`,
});

const mercariFig3 = cardFrame({
  width: 1200,
  height: 800,
  bgGradient: 'linear-gradient(155deg, #0f172a 0%, #0b1426 100%)',
  borderColor: '#38bdf8',
  badge: 'FIGURE 3: PAYOUT VELOCITY TRAP',
  title: 'Why $3.00 Instant Pay Destroys Small Reseller Margins',
  subtitle: 'Effective cash drag of Instant Pay ($3 flat) vs Free Direct Deposit ACH ($0.00, 3 to 5 business days)',
  bodyHtml: `
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:22px;width:100%;">
    ${[
      { sale: '$25 Balance Cashout', ach: '$0.00 (0.0%)', inst: '$3.00 (12.0%!)', warn: 'Total cut hits 22%!' },
      { sale: '$50 Balance Cashout', ach: '$0.00 (0.0%)', inst: '$3.00 (6.0%)', warn: 'Total cut hits 16%!' },
      { sale: '$250 Batch Cashout', ach: '$0.00 (0.0%)', inst: '$3.00 (1.2%)', warn: 'Batch or wait 3 days = $0' },
    ]
      .map(
        (b) => `
    <div style="background:rgba(255,255,255,0.04);border:1.5px solid rgba(56,189,248,0.4);border-radius:20px;padding:28px;display:flex;flex-direction:column;justify-content:space-between;height:290px;">
      <div style="font-size:20px;font-weight:900;color:#fff;">${b.sale}</div>
      <div>
        <div style="font-size:13px;color:#94a3b8;margin-bottom:6px;">Standard ACH Transfer:</div>
        <div style="font-size:24px;font-weight:900;color:#34d399;font-family:monospace;">${b.ach}</div>
      </div>
      <div>
        <div style="font-size:13px;color:#94a3b8;margin-bottom:6px;">Instant Pay Debit Transfer:</div>
        <div style="font-size:24px;font-weight:900;color:#f87171;font-family:monospace;">${b.inst}</div>
      </div>
      <div style="padding:10px 14px;border-radius:10px;background:rgba(248,113,113,0.12);font-size:13px;font-weight:700;color:#fca5a5;">
        ${b.warn}
      </div>
    </div>`
      )
      .join('')}
  </div>`,
});

// =====================================================================
// 3. VENMO BUSINESS BLOG ASSETS (1 Cover + 3 Infographics)
// =====================================================================
const venmoCover = cardFrame({
  width: 1200,
  height: 630,
  bgGradient: 'linear-gradient(135deg, #041326 0%, #082f49 55%, #0f172a 100%)',
  borderColor: '#0ea5e9',
  badge: '2026 PAYMENT PROCESSING GUIDE',
  title: 'Venmo Business Profile Fees 2026: Complete Rate Schedule',
  subtitle: '1.9% + $0.10 QR &amp; G&amp;S | 2.29% + $0.10 Tap to Pay | 3.49% + $0.49 Online | 1.75% Instant Cap',
  bodyHtml: `
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:22px;width:100%;">
    <div style="background:rgba(255,255,255,0.04);border:1.5px solid rgba(14,165,233,0.55);border-radius:20px;padding:24px;">
      <div style="font-size:12px;font-weight:800;color:#7dd3fc;letter-spacing:1px;">BUSINESS &amp; GOODS/SERVICES</div>
      <div style="font-size:38px;font-weight:900;color:#ffffff;font-family:monospace;margin:10px 0;">1.90%+$0.10</div>
      <div style="font-size:14px;color:#cbd5e1;line-height:1.45;">Lowest flat rate for QR codes, Venmo Business Profiles, and tagged G&amp;S invoices.</div>
    </div>
    <div style="background:rgba(14,165,233,0.12);border:1.5px solid rgba(56,189,248,0.65);border-radius:20px;padding:24px;">
      <div style="font-size:12px;font-weight:800;color:#bae6fd;letter-spacing:1px;">TAP TO PAY IN-PERSON</div>
      <div style="font-size:38px;font-weight:900;color:#38bdf8;font-family:monospace;margin:10px 0;">2.29%+$0.10</div>
      <div style="font-size:14px;color:#e2e8f0;line-height:1.45;">Contactless iPhone/Android NFC card &amp; Apple Pay acceptance with $0 hardware.</div>
    </div>
    <div style="background:rgba(245,158,11,0.08);border:1.5px solid rgba(245,158,11,0.45);border-radius:20px;padding:24px;">
      <div style="font-size:12px;font-weight:800;color:#fcd34d;letter-spacing:1px;">INSTANT BANK TRANSFER</div>
      <div style="font-size:38px;font-weight:900;color:#fbbf24;font-family:monospace;margin:10px 0;">1.75% ($25)</div>
      <div style="font-size:14px;color:#cbd5e1;line-height:1.45;">$0.25 min to $25.00 max cap. Standard 1-3 day bank ACH remains <strong>$0.00</strong>.</div>
    </div>
  </div>`,
});

const venmoFig1 = cardFrame({
  width: 1200,
  height: 800,
  bgGradient: 'linear-gradient(155deg, #090d16 0%, #082f49 100%)',
  borderColor: '#0ea5e9',
  badge: 'FIGURE 1: THREE PAYMENT CHANNELS',
  title: 'Venmo 2026 Fee Tiers on a $500.00 Client Invoice',
  subtitle: 'Receiving fee difference between Standard Business Profile, Tap to Pay, and Online Store Checkout',
  bodyHtml: `
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;width:100%;">
    ${[
      { ch: 'Venmo Business / G&amp;S', rate: '1.90% + $0.10', fee: '$9.60', net: '$490.40', instNet: '$481.82', color: '#10b981' },
      { ch: 'Tap to Pay (NFC Card)', rate: '2.29% + $0.10', fee: '$11.55', net: '$488.45', instNet: '$479.90', color: '#38bdf8' },
      { ch: 'Online App Checkout', rate: '3.49% + $0.49', fee: '$17.94', net: '$482.06', instNet: '$473.62', color: '#f59e0b' },
    ]
      .map(
        (t) => `
    <div style="background:rgba(255,255,255,0.04);border:2px solid ${t.color};border-radius:20px;padding:28px;display:flex;flex-direction:column;justify-content:space-between;height:310px;">
      <div>
        <div style="font-size:13px;font-weight:800;color:${t.color};letter-spacing:0.8px;">${t.rate}</div>
        <div style="font-size:21px;font-weight:900;color:#fff;margin-top:8px;">${t.ch}</div>
      </div>
      <div>
        <div style="font-size:14px;color:#94a3b8;">Processing Deduction:</div>
        <div style="font-size:28px;font-weight:900;color:#f87171;font-family:monospace;">-${t.fee}</div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.12);padding-top:14px;">
        <div style="font-size:13px;color:#cbd5e1;">Standard ACH ($0): <strong style="color:#34d399;font-family:monospace;">${t.net}</strong></div>
        <div style="font-size:13px;color:#94a3b8;margin-top:6px;">With 1.75% Instant: <strong style="color:#fbbf24;font-family:monospace;">${t.instNet}</strong></div>
      </div>
    </div>`
      )
      .join('')}
  </div>`,
});

const venmoFig2 = cardFrame({
  width: 1200,
  height: 800,
  bgGradient: 'linear-gradient(155deg, #0f172a 0%, #0c233a 100%)',
  borderColor: '#38bdf8',
  badge: 'FIGURE 2: REVERSE REQUEST FORMULA',
  title: 'How to Invoice Exactly $1,000.00 Net After Venmo Fees',
  subtitle: 'Naive +1.9% loses money! Use P = (Target + $0.10) / (1 - 0.019) to net $1,000.00 to the penny',
  bodyHtml: `
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;width:100%;">
    <div style="background:rgba(239,68,68,0.08);border:1.5px solid rgba(239,68,68,0.45);border-radius:20px;padding:28px;display:flex;flex-direction:column;gap:14px;">
      <div style="font-size:14px;font-weight:900;color:#fca5a5;">WRONG: ADDING 1.9% + $0.10 ($1,019.10)</div>
      <div style="font-size:15px;color:#cbd5e1;">You ask client for: <strong style="font-family:monospace;">$1,019.10</strong></div>
      <div style="font-size:15px;color:#cbd5e1;">Venmo takes 1.9% of $1,019.10 + $0.10: <strong style="color:#f87171;font-family:monospace;">-$19.46</strong></div>
      <div style="font-size:24px;font-weight:900;color:#fbbf24;font-family:monospace;margin-top:14px;">You Only Net: $999.64</div>
      <div style="font-size:13px;color:#94a3b8;">Shortfall occurs because Venmo calculates 1.9% on top of the added fee buffer!</div>
    </div>
    <div style="background:rgba(16,185,129,0.10);border:1.5px solid rgba(16,185,129,0.55);border-radius:20px;padding:28px;display:flex;flex-direction:column;gap:14px;">
      <div style="font-size:14px;font-weight:900;color:#6ee7b7;">EXACT REVERSE SOLVER ($1,019.47)</div>
      <div style="font-size:15px;color:#e2e8f0;">Formula: <strong style="font-family:monospace;">($1,000 + $0.10) / 0.981</strong></div>
      <div style="font-size:15px;color:#e2e8f0;">Invoice client for: <strong style="color:#38bdf8;font-family:monospace;">$1,019.47</strong></div>
      <div style="font-size:15px;color:#e2e8f0;">Venmo deducts 1.9% + $0.10: <strong style="color:#f87171;font-family:monospace;">-$19.47</strong></div>
      <div style="font-size:26px;font-weight:900;color:#34d399;font-family:monospace;margin-top:6px;">Exact Bank Net: $1,000.00</div>
    </div>
  </div>`,
});

const venmoFig3 = cardFrame({
  width: 1200,
  height: 800,
  bgGradient: 'linear-gradient(155deg, #090d16 0%, #0f172a 100%)',
  borderColor: '#10b981',
  badge: 'FIGURE 3: US SMALL BUSINESS RATE WAR',
  title: 'Venmo Business vs Cash App vs Square vs PayPal ($1,000 Sale)',
  subtitle: 'Annualized fee savings for contractors and mobile vendors processing $50,000/yr ($1,000 avg ticket)',
  bodyHtml: `
  <div style="width:100%;display:flex;flex-direction:column;gap:16px;">
    ${[
      { p: 'Venmo Business QR / Profile (1.9% + $0.10)', ticket: '$19.10', yr: '$955 / yr', save: 'WINNER: Save $460-$790/yr', bar: 52, color: '#0ea5e9' },
      { p: 'Venmo Tap to Pay / In-Person (2.29% + $0.10)', ticket: '$23.00', yr: '$1,150 / yr', save: 'Beats Square 2.6%+$0.15', bar: 63, color: '#38bdf8' },
      { p: 'Cash App Business / Square Card (2.6% + $0.15)', ticket: '$26.15', yr: '$1,308 / yr', save: '+$353 costlier than Venmo QR', bar: 73, color: '#a855f7' },
      { p: 'PayPal Goods &amp; Services (2.99% + $0.49)', ticket: '$30.39', yr: '$1,520 / yr', save: '+$565 costlier than Venmo QR', bar: 85, color: '#f59e0b' },
      { p: 'PayPal Standard Checkout / Venmo Web (3.49%+$0.49)', ticket: '$35.39', yr: '$1,770 / yr', save: '+$815 costlier than Venmo QR', bar: 100, color: '#ef4444' },
    ]
      .map(
        (x) => `
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.09);border-radius:14px;padding:14px 20px;">
      <div style="display:flex;justify-content:space-between;font-size:15px;font-weight:800;margin-bottom:8px;">
        <span>${x.p}</span>
        <span>Per $1k: <strong style="color:#f87171;font-family:monospace;">${x.ticket}</strong> | 50k/yr: <strong style="color:${x.color};font-family:monospace;">${x.yr}</strong></span>
      </div>
      <div style="height:16px;background:rgba(255,255,255,0.07);border-radius:6px;overflow:hidden;">
        <div style="width:${x.bar}%;height:100%;background:${x.color};border-radius:6px;"></div>
      </div>
    </div>`
      )
      .join('')}
  </div>`,
});

const targets = [
  { html: reverbCover, out: path.join(blogDir, 'reverb-seller-fees-2026-complete-gear-profit-margin-guide.png'), w: 1200, h: 630 },
  { html: reverbFig1, out: path.join(imagesDir, 'reverb-fee-cap-curve.png'), w: 1200, h: 800 },
  { html: reverbFig2, out: path.join(imagesDir, 'reverb-tax-processing-math.png'), w: 1200, h: 800 },
  { html: reverbFig3, out: path.join(imagesDir, 'reverb-vs-ebay-music-gear.png'), w: 1200, h: 800 },

  { html: mercariCover, out: path.join(blogDir, 'mercari-seller-fees-2026-flat-10-percent-buyer-fee-margin-guide.png'), w: 1200, h: 630 },
  { html: mercariFig1, out: path.join(imagesDir, 'mercari-10pct-shipping-rule.png'), w: 1200, h: 800 },
  { html: mercariFig2, out: path.join(imagesDir, 'mercari-vs-depop-poshmark-ebay.png'), w: 1200, h: 800 },
  { html: mercariFig3, out: path.join(imagesDir, 'mercari-instant-pay-vs-ach.png'), w: 1200, h: 800 },

  { html: venmoCover, out: path.join(blogDir, 'venmo-business-profile-fees-2026-tap-to-pay-goods-services-guide.png'), w: 1200, h: 630 },
  { html: venmoFig1, out: path.join(imagesDir, 'venmo-channel-rates-2026.png'), w: 1200, h: 800 },
  { html: venmoFig2, out: path.join(imagesDir, 'venmo-reverse-grossup-formula.png'), w: 1200, h: 800 },
  { html: venmoFig3, out: path.join(imagesDir, 'venmo-vs-cashapp-square-paypal.png'), w: 1200, h: 800 },
];

for (const t of targets) {
  renderHtmlToPng(t.html, t.out, t.w, t.h);
}

fs.rmSync(tmpDir, { recursive: true, force: true });
console.log('Successfully generated all 12 branded high-res PNG infographics!');
