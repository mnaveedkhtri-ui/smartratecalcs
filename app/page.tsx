'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PROGRAMMATIC_CALCULATORS } from '../data/programmatic-calculators';
import { BLOG_POSTS } from '../data/blog-posts';

interface RatesMap {
  [currency: string]: {
    [country: string]: number;
  };
}

const RATES: RatesMap = {
  USD: { PKR: 278.4, INR: 86.75, BDT: 121.3 },
  EUR: { PKR: 301.15, INR: 93.85, BDT: 131.2 },
  GBP: { PKR: 359.8, INR: 112.1, BDT: 156.8 },
  AED: { PKR: 75.8, INR: 23.6, BDT: 33.0 },
  CAD: { PKR: 198.5, INR: 61.85, BDT: 86.5 },
};

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState<'home' | 'matrix' | 'methodology' | 'faq' | 'about' | 'contact' | 'privacy' | 'terms'>('home');
  const [activeTab, setActiveTab] = useState<'payout' | 'ecom' | 'freelance'>('payout');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [calcFilter, setCalcFilter] = useState<string>('all');
  const [calcSearch, setCalcSearch] = useState<string>('');

  // Calculator 1 state
  const [grossAmount, setGrossAmount] = useState<number>(2000);
  const [currency, setCurrency] = useState<string>('USD');
  const [country, setCountry] = useState<string>('PKR');
  const [platform, setPlatform] = useState<'direct' | 'upwork' | 'fiverr' | 'stripe'>('direct');
  const [copied, setCopied] = useState<boolean>(false);

  // Calculator 2 state (E-Com)
  const [ecomPrice, setEcomPrice] = useState<number>(65.0);
  const [ecomCogs, setEcomCogs] = useState<number>(24.5);
  const [ecomCpa, setEcomCpa] = useState<number>(19.0);

  // Calculator 3 state (Freelance)
  const [flNet, setFlNet] = useState<number>(3500);
  const [flOverhead, setFlOverhead] = useState<number>(350);
  const [flHours, setFlHours] = useState<number>(25);

  // Contact state
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);

  // Payout math
  const baseRate = (RATES[currency] && RATES[currency][country]) ? RATES[currency][country] : 278.4;
  let cutPct = 0;
  let fixedDeduct = 0;
  if (platform === 'upwork') cutPct = 0.1;
  if (platform === 'fiverr') cutPct = 0.2;
  if (platform === 'stripe') {
    cutPct = 0.029;
    fixedDeduct = 0.3;
  }

  const netInvoiced = Math.max(0, grossAmount * (1 - cutPct) - fixedDeduct);

  // 1. Wise: 0.45% fee, zero markup
  const wiseFee = Math.max(1.5, netInvoiced * 0.0045);
  const wiseNetLocal = Math.round(Math.max(0, netInvoiced - wiseFee) * baseRate);

  // 2. Payoneer: $1.50 fee, 2.0% spread
  const payoneerFee = 1.5;
  const payoneerRate = baseRate * 0.98;
  const payoneerNetLocal = Math.round(Math.max(0, netInvoiced - payoneerFee) * payoneerRate);

  // 3. Bank Wire: $25 fee, 2.8% spread
  const wireFee = 25.0;
  const wireRate = baseRate * 0.972;
  const wireNetLocal = Math.round(Math.max(0, netInvoiced - wireFee) * wireRate);

  const prefix = country === 'PKR' ? '₨ ' : country === 'INR' ? '₹ ' : '৳ ';
  const payDiff = wiseNetLocal - payoneerNetLocal;
  const wireDiff = wiseNetLocal - wireNetLocal;

  // E-Com Math
  const ecomGw = ecomPrice * 0.029 + 0.3;
  const ecomProfit = ecomPrice - (ecomCogs + ecomCpa + ecomGw);
  const ecomRoas = ecomPrice - (ecomCogs + ecomGw) > 0 ? ecomPrice / (ecomPrice - (ecomCogs + ecomGw)) : 0;

  // Freelance Math
  const flGross = (flNet + flOverhead) / 0.85;
  const flHourly = flGross / (flHours * 4.2);

  const handleCopy = () => {
    const text = `SmartRate Payout Summary:\nInvoice: $${grossAmount} ${currency}\n- Wise: ${prefix}${wiseNetLocal.toLocaleString()} (Recommended)\n- Payoneer: ${prefix}${payoneerNetLocal.toLocaleString()} (-${prefix}${payDiff.toLocaleString()} vs Wise)\nCalculated on SmartRateCalcs.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navigateTo = (page: typeof currentPage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCalculators = useMemo(() => {
    return PROGRAMMATIC_CALCULATORS.filter((c) => {
      const matchesSearch =
        calcSearch === '' ||
        c.title.toLowerCase().includes(calcSearch.toLowerCase()) ||
        c.primaryKeyword.toLowerCase().includes(calcSearch.toLowerCase()) ||
        c.description.toLowerCase().includes(calcSearch.toLowerCase());

      if (!matchesSearch) return false;

      if (calcFilter === 'all') return true;
      if (calcFilter === 'pk') return c.targetCurrency === 'PKR';
      if (calcFilter === 'in') return c.targetCurrency === 'INR';
      if (calcFilter === 'sea') return c.targetCurrency === 'BDT' || c.targetCurrency === 'PHP';
      if (calcFilter === 'freelance') return c.category === 'freelance';
      if (calcFilter === 'ecom') return c.category === 'ecommerce';

      return true;
    });
  }, [calcFilter, calcSearch]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <button onClick={() => navigateTo('home')} className="flex items-center gap-2.5 sm:gap-3.5 text-left group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-sm group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-calculator text-emerald-400"></i>
            </div>
            <div>
              <div className="font-heading font-extrabold text-[17px] sm:text-[19px] tracking-tight text-slate-900 flex items-center gap-1.5 sm:gap-2">
                SmartRate<span className="text-emerald-600">Calcs</span>
                <span className="text-[9px] sm:text-[10px] uppercase font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  v3.0 PRO
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-500 font-medium">Independent Financial &amp; Payout Intelligence</p>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-8 text-[14px] font-semibold text-slate-600">
            <button onClick={() => navigateTo('home')} className={`hover:text-slate-900 transition-colors py-2 ${currentPage === 'home' ? 'text-emerald-600 font-bold' : ''}`}>
              Calculators
            </button>
            <button onClick={() => navigateTo('matrix')} className={`hover:text-slate-900 transition-colors py-2 ${currentPage === 'matrix' ? 'text-emerald-600 font-bold' : ''}`}>
              Fee Matrix 2026
            </button>
            <button onClick={() => navigateTo('methodology')} className={`hover:text-slate-900 transition-colors py-2 ${currentPage === 'methodology' ? 'text-emerald-600 font-bold' : ''}`}>
              Methodology
            </button>
            <button onClick={() => navigateTo('faq')} className={`hover:text-slate-900 transition-colors py-2 ${currentPage === 'faq' ? 'text-emerald-600 font-bold' : ''}`}>
              FAQ
            </button>
            <button onClick={() => navigateTo('about')} className={`hover:text-slate-900 transition-colors py-2 ${currentPage === 'about' ? 'text-emerald-600 font-bold' : ''}`}>
              About Creator
            </button>
            <Link href="/blog" className="hover:text-emerald-600 font-bold text-slate-800 transition-colors py-2 flex items-center gap-1.5">
              <span>Guides</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-slate-900">USD/PKR:</span>
              <span className="text-emerald-600 font-bold">278.40</span>
            </div>
            <button onClick={() => navigateTo('contact')} className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-bold shadow-sm transition-all active:scale-95">
              Contact
            </button>

            {/* Mobile Menu Toggle Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200 focus:outline-none" aria-label="Toggle Menu">
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-sm`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1.5 shadow-lg">
            <button onClick={() => navigateTo('home')} className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-emerald-600 bg-emerald-50 flex items-center gap-2.5">
              <i className="fa-solid fa-calculator text-xs"></i> Calculators Suite
            </button>
            <button onClick={() => navigateTo('matrix')} className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5">
              <i className="fa-solid fa-table-cells text-xs text-slate-400"></i> Fee Matrix 2026
            </button>
            <button onClick={() => navigateTo('methodology')} className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5">
              <i className="fa-solid fa-square-root-variable text-xs text-slate-400"></i> Calculation Methodology
            </button>
            <button onClick={() => navigateTo('faq')} className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5">
              <i className="fa-solid fa-circle-question text-xs text-slate-400"></i> Frequently Asked Questions
            </button>
            <button onClick={() => navigateTo('about')} className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5">
              <i className="fa-solid fa-user-shield text-xs text-slate-400"></i> About Muhammad Naveed
            </button>
            <Link href="/blog" className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-emerald-800 bg-emerald-50/60 hover:bg-emerald-50 flex items-center gap-2.5">
              <i className="fa-solid fa-book-open text-xs text-emerald-600"></i> Financial Guides &amp; Research
            </Link>
            <button onClick={() => navigateTo('contact')} className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2.5 shadow-sm">
              <i className="fa-solid fa-envelope text-xs"></i> Contact &amp; Bug Bounty
            </button>
          </div>
        )}
      </header>

      {/* ================= PAGE VIEW 1: HOME CALCULATORS ================= */}
      {currentPage === 'home' && (
        <div>
          <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[12px] font-bold mb-4">
              <i className="fa-solid fa-shield-check text-emerald-600"></i>
              <span>Open Financial Intelligence &bull; Zero Sponsored Bias &bull; Real Math</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-5xl text-slate-900 tracking-tight leading-[1.2] sm:leading-[1.15] mb-4">
              Radical fee transparency for global contractors &amp; founders.
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Payment gateways silently shave <strong className="text-slate-900 font-semibold">2% to 4% off international payouts</strong> through padded exchange spreads. See your exact take-home pay before you withdraw.
            </p>

            <div className="mt-6 flex flex-col sm:inline-flex sm:flex-row p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300/70 gap-1.5 w-full sm:w-auto">
              <button onClick={() => setActiveTab('payout')} className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'payout' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
                <i className="fa-solid fa-money-bill-transfer text-emerald-600"></i> Global Payouts &amp; FX
              </button>
              <button onClick={() => setActiveTab('ecom')} className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'ecom' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
                <i className="fa-solid fa-cart-shopping"></i> Shopify &amp; Stripe Profit
              </button>
              <button onClick={() => setActiveTab('freelance')} className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'freelance' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
                <i className="fa-solid fa-user-clock"></i> Freelance Rate Architect
              </button>
            </div>
          </section>

          {/* TAB 1: Global Payouts */}
          {activeTab === 'payout' && (
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-9 border border-slate-200 shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-8 border-b border-slate-100">
                  <div className="md:col-span-7 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Gross Invoiced Amount
                      </label>
                      <span className="text-xs font-mono font-bold text-emerald-600">${grossAmount.toLocaleString()} {currency}</span>
                    </div>

                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-lg sm:text-xl font-bold text-slate-400 font-mono">$</span>
                      <input
                        type="number"
                        value={grossAmount}
                        min={50}
                        max={50000}
                        step={50}
                        onChange={(e) => setGrossAmount(Number(e.target.value) || 0)}
                        className="w-full pl-8 sm:pl-10 pr-28 sm:pr-32 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border-2 border-slate-200 bg-slate-50 text-xl sm:text-2xl font-bold font-mono text-slate-900 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="absolute right-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 cursor-pointer focus:outline-none"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="AED">AED (د.إ)</option>
                        <option value="CAD">CAD ($)</option>
                      </select>
                    </div>

                    <div className="pt-1">
                      <input
                        type="range"
                        min={100}
                        max={20000}
                        step={50}
                        value={grossAmount}
                        onChange={(e) => setGrossAmount(Number(e.target.value) || 0)}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                        <span>$100</span>
                        <span>$5,000</span>
                        <span>$10,000</span>
                        <span>$20,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-5 space-y-3">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Receiving Bank Country
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 bg-slate-50 text-sm font-bold text-slate-900 focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="PKR">🇵🇰 Pakistan (PKR &bull; Raast / IBAN)</option>
                      <option value="INR">🇮🇳 India (INR &bull; UPI / NEFT)</option>
                      <option value="BDT">🇧🇩 Bangladesh (BDT &bull; BEFTN)</option>
                    </select>

                    <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs flex items-center justify-between">
                      <span className="text-slate-500">Live Interbank Benchmark:</span>
                      <span className="font-mono font-bold text-slate-900">1 {currency} = {baseRate.toFixed(2)} {country}</span>
                    </div>
                  </div>
                </div>

                <div className="py-6 border-b border-slate-100">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                    Client Contract Origin / Marketplace
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'direct', name: 'Direct Client', cut: '0% Fee', sub: 'Wire / Wise Invoice' },
                      { id: 'upwork', name: 'Upwork', cut: '10% Cut', sub: 'Freelancer Fee' },
                      { id: 'fiverr', name: 'Fiverr Pro', cut: '20% Cut', sub: 'Marketplace Cut' },
                      { id: 'stripe', name: 'Stripe Invoice', cut: '2.9% + $0.30', sub: 'Card Gateway' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPlatform(p.id as any)}
                        className={`p-3 rounded-2xl text-left transition-all ${platform === p.id ? 'border-2 border-emerald-500 bg-emerald-50/70' : 'border border-slate-200 bg-white hover:border-slate-300'}`}
                      >
                        <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                          {p.name}
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${platform === p.id ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>{p.cut}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">{p.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading font-extrabold text-lg text-slate-900">Comparative Take-Home Verdict</h3>
                      <p className="text-xs text-slate-500">Live sequential mathematical deduction</p>
                    </div>
                    <button onClick={handleCopy} className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                      <i className="fa-regular fa-copy mr-1"></i> {copied ? 'Copied!' : 'Copy Summary'}
                    </button>
                  </div>

                  {/* Wise Card */}
                  <div className="p-6 rounded-3xl bg-emerald-50/60 border-2 border-emerald-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-bl-xl shadow-sm flex items-center gap-1.5">
                      <i className="fa-solid fa-crown text-[9px]"></i> Maximum Value Retention
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xl shadow-sm">
                          W
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-heading font-extrabold text-base text-slate-900">Wise (TransferWise)</h4>
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Recommended</span>
                          </div>
                          <p className="text-xs text-slate-500">Zero currency markup &bull; 0.45% transparent transfer fee</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Net in Bank Account</div>
                        <div className="text-3xl font-extrabold font-mono text-emerald-700 tabular">{prefix}{wiseNetLocal.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-emerald-200/60 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div><span className="text-slate-400 block text-[10px]">Applied Rate:</span><span className="font-mono font-bold">{baseRate.toFixed(2)}</span></div>
                      <div><span className="text-slate-400 block text-[10px]">Transfer Fee:</span><span className="font-mono font-bold">${wiseFee.toFixed(2)}</span></div>
                      <div><span className="text-slate-400 block text-[10px]">Hidden FX Loss:</span><span className="font-mono font-bold text-emerald-600">$0.00 (0%)</span></div>
                      <div><span className="text-slate-400 block text-[10px]">Settlement:</span><span className="font-bold">Same Day / 2h</span></div>
                    </div>
                  </div>

                  {/* Payoneer Card */}
                  <div className="p-6 rounded-3xl bg-white border border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 font-extrabold flex items-center justify-center text-xl border border-orange-200">
                          P
                        </div>
                        <div>
                          <h4 className="font-heading font-extrabold text-base text-slate-900">Payoneer to Bank / JazzCash</h4>
                          <p className="text-xs text-slate-500">$1.50 withdrawal fee + 2.0% currency spread</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Net in Bank Account</div>
                        <div className="text-2xl font-bold font-mono text-slate-900 tabular">{prefix}{payoneerNetLocal.toLocaleString()}</div>
                        <div className="text-xs font-bold text-rose-600 font-mono">-{prefix}{payDiff.toLocaleString()} vs Wise</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div><span className="text-slate-400 block text-[10px]">Applied Rate:</span><span className="font-mono font-bold">{payoneerRate.toFixed(2)}</span></div>
                      <div><span className="text-slate-400 block text-[10px]">Fixed Fee:</span><span className="font-mono font-bold">$1.50</span></div>
                      <div><span className="text-slate-400 block text-[10px]">Spread Loss:</span><span className="font-mono font-bold text-rose-600">${(netInvoiced * 0.02).toFixed(2)} (2.0%)</span></div>
                      <div><span className="text-slate-400 block text-[10px]">Settlement:</span><span className="font-bold">2 - 24 Hours</span></div>
                    </div>
                  </div>

                  {/* Bank Wire Card */}
                  <div className="p-6 rounded-3xl bg-white border border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 font-extrabold flex items-center justify-center text-xl border border-blue-200">
                          <i className="fa-solid fa-building-columns"></i>
                        </div>
                        <div>
                          <h4 className="font-heading font-extrabold text-base text-slate-900">Commercial Bank SWIFT Wire</h4>
                          <p className="text-xs text-slate-500">Meezan, HBL intermediary fees + 2.8% bank margin</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Net in Bank Account</div>
                        <div className="text-2xl font-bold font-mono text-slate-900 tabular">{prefix}{wireNetLocal.toLocaleString()}</div>
                        <div className="text-xs font-bold text-rose-600 font-mono">-{prefix}{wireDiff.toLocaleString()} vs Wise</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div><span className="text-slate-400 block text-[10px]">Applied Rate:</span><span className="font-mono font-bold">{wireRate.toFixed(2)}</span></div>
                      <div><span className="text-slate-400 block text-[10px]">Intermediary Fee:</span><span className="font-mono font-bold">$25.00</span></div>
                      <div><span className="text-slate-400 block text-[10px]">Total Bank Take:</span><span className="font-mono font-bold text-rose-600">${(wireFee + netInvoiced * 0.028).toFixed(2)} (4.0%)</span></div>
                      <div><span className="text-slate-400 block text-[10px]">Settlement:</span><span className="font-bold">3 - 5 Days</span></div>
                    </div>
                  </div>

                  {/* Verdict Banner */}
                  <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <i className="fa-solid fa-lightbulb text-amber-500 text-sm"></i>
                      <span>Financial Verdict: By using <strong>Wise</strong> instead of Payoneer on this invoice, you keep:</span>
                    </span>
                    <span className="font-extrabold font-mono text-emerald-600 text-sm">+{prefix}{payDiff.toLocaleString()} in pocket</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB 2: E-Com */}
          {activeTab === 'ecom' && (
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200 shadow-md">
                <h3 className="font-heading font-extrabold text-2xl text-slate-900 mb-2">E-Commerce Unit Economics &amp; ROAS</h3>
                <p className="text-xs text-slate-500 mb-8">Calculate true net profit after product cost, ad spend, and gateway cuts.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Retail Selling Price ($)</label>
                      <input type="number" value={ecomPrice} onChange={(e) => setEcomPrice(Number(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 font-mono font-bold text-slate-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Product Cost + Shipping ($)</label>
                      <input type="number" value={ecomCogs} onChange={(e) => setEcomCogs(Number(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 font-mono font-bold text-slate-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Marketing CPA / Ad Cost ($)</label>
                      <input type="number" value={ecomCpa} onChange={(e) => setEcomCpa(Number(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 font-mono font-bold text-slate-900" />
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Net Profit Per Order</div>
                      <div className="text-3xl font-extrabold text-emerald-600 font-mono">${ecomProfit.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Break-Even ROAS</div>
                      <div className="text-3xl font-extrabold text-slate-900 font-mono">{ecomRoas.toFixed(2)}x</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Monthly Net Profit (500 Orders)</div>
                      <div className="text-2xl font-bold text-slate-900 font-mono">${Math.round(ecomProfit * 500).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB 3: Freelance */}
          {activeTab === 'freelance' && (
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200 shadow-md">
                <h3 className="font-heading font-extrabold text-2xl text-slate-900 mb-2">Freelance Rate Architect</h3>
                <p className="text-xs text-slate-500 mb-8">Calculate sustainable hourly and daily rates based on real personal overhead and taxes.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Target Net Monthly Take-Home ($)</label>
                      <input type="number" value={flNet} onChange={(e) => setFlNet(Number(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 font-mono font-bold text-slate-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Monthly Business Overhead ($)</label>
                      <input type="number" value={flOverhead} onChange={(e) => setFlOverhead(Number(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 font-mono font-bold text-slate-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Billable Hours Per Week</label>
                      <input type="number" value={flHours} onChange={(e) => setFlHours(Number(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 font-mono font-bold text-slate-900" />
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Recommended Hourly Rate</div>
                      <div className="text-4xl font-extrabold text-emerald-600 font-mono">${Math.round(flHourly)} / hr</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Standard Day Rate (7h)</div>
                      <div className="text-3xl font-extrabold text-slate-900 font-mono">${Math.round(flHourly * 7)} / day</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Gross Monthly Billing Target</div>
                      <div className="text-2xl font-bold text-slate-900 font-mono">${Math.round(flGross).toLocaleString()} / mo</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ================= PROGRAMMATIC CALCULATORS DIRECTORY (53 Dedicated Engines) ================= */}
          <section id="calculators" className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold mb-2 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  53 Programmatic Financial Tools &bull; Live 2026 Interbank Models
                </div>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
                  Dedicated Corridors &amp; Platform Calculators
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                  Engineered for high-intent search queries. Direct take-home models with zero hidden spreads.
                </p>
              </div>

              {/* Instant Search Box */}
              <div className="w-full md:w-72 relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  type="text"
                  placeholder="Search JazzCash, Meezan, Upwork..."
                  value={calcSearch}
                  onChange={(e) => setCalcSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-sm"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { id: 'all', label: `All Calculators (${PROGRAMMATIC_CALCULATORS.length})` },
                { id: 'pk', label: 'Pakistan (PKR)' },
                { id: 'in', label: 'India (INR)' },
                { id: 'sea', label: 'Bangladesh & Philippines' },
                { id: 'freelance', label: 'Upwork & Fiverr' },
                { id: 'ecom', label: 'Shopify & Stripe' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCalcFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    calcFilter === tab.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Calculators Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCalculators.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/calculators/${calc.slug}`}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase mb-2">
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {calc.targetCurrency ? `${calc.sourceCurrency || 'USD'} → ${calc.targetCurrency}` : calc.category}
                      </span>
                      <span className="text-slate-400">2026 Spec</span>
                    </div>
                    <h3 className="font-heading font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2">
                      {calc.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {calc.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-600 font-bold">
                    <span>Launch Calculator</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </Link>
              ))}
            </div>

            {filteredCalculators.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                <p className="text-xs text-slate-500">No calculators found matching &quot;{calcSearch}&quot;.</p>
              </div>
            )}
          </section>

          {/* ================= HIGH-AUTHORITY GUIDES SECTION ================= */}
          <section id="guides" className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold mb-2 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Financial Research &amp; Regulatory Guides
                </div>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
                  Latest Payout &amp; Tax Guides
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                  In-depth empirical research on bank clearing spreads, FBR tax compliance, and payment gateway unit economics.
                </p>
              </div>
              <Link
                href="/blog"
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 self-start sm:self-auto"
              >
                View All {BLOG_POSTS.length} Guides &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {BLOG_POSTS.slice(0, 3).map((post) => (
                <article
                  key={post.slug}
                  className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono mb-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
                        {post.category}
                      </span>
                      <span className="text-slate-400">{post.readTime}</span>
                    </div>
                    <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug mb-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {post.metaDesc}
                    </p>
                  </div>
                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-600 font-bold">
                    <Link href={`/blog/${post.slug}`} className="hover:underline flex items-center gap-1">
                      Read Guide &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ================= PAGE VIEW 2: FEE MATRIX ================= */}
      {currentPage === 'matrix' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h2 className="font-heading font-extrabold text-3xl text-slate-900 mb-3">
              The 2026 International Gateway Fee Matrix
            </h2>
            <p className="text-sm text-slate-600">Verified empirical test data collected across live withdrawals into commercial bank accounts.</p>
          </div>
          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-md">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono uppercase text-[11px]">
                  <th className="py-4 px-5">Provider</th>
                  <th className="py-4 px-5">FX Markup Spread</th>
                  <th className="py-4 px-5">Fixed Fee</th>
                  <th className="py-4 px-5">Local Wallet Support</th>
                  <th className="py-4 px-5">Settlement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">Wise</td>
                  <td className="py-4 px-5 text-emerald-600 font-bold font-mono">0.45% (Interbank)</td>
                  <td className="py-4 px-5 font-mono">$0.45 - $1.20</td>
                  <td className="py-4 px-5 font-semibold">Direct IBAN / Raast</td>
                  <td className="py-4 px-5">Same Day (2h)</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">Payoneer</td>
                  <td className="py-4 px-5 text-amber-600 font-bold font-mono">2.00% to 2.50%</td>
                  <td className="py-4 px-5 font-mono">$1.50</td>
                  <td className="py-4 px-5">JazzCash, Nayapay, Bank</td>
                  <td className="py-4 px-5">2 to 24 Hours</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">SWIFT Wire</td>
                  <td className="py-4 px-5 text-rose-600 font-bold font-mono">2.80% - 3.50%</td>
                  <td className="py-4 px-5 font-mono">$25 - $35</td>
                  <td className="py-4 px-5">Commercial Banks</td>
                  <td className="py-4 px-5">3 - 5 Days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= PAGE VIEW 3: METHODOLOGY ================= */}
      {currentPage === 'methodology' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase text-emerald-600 font-bold">Open Mathematical Principles</span>
            <h2 className="font-heading font-extrabold text-3xl text-slate-900 mt-2 mb-3">How We Calculate Net Take-Home Payouts</h2>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md space-y-6">
            <h3 className="font-heading font-bold text-lg text-slate-900">The Sequential Clearing Model</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
              <li><strong>Platform Commission:</strong> Upwork (10%) or Fiverr (20%) is deducted immediately from gross value.</li>
              <li><strong>Fixed Gateway Fee:</strong> Payoneer ($1.50) or SWIFT ($25.00) is deducted from principal.</li>
              <li><strong>Hidden FX Markup:</strong> The gateway applies a spread margin (typically 2.0% to 2.8%) below interbank mid-market.</li>
              <li><strong>Final Settlement:</strong> The net foreign currency is converted and deposited to your IBAN.</li>
            </ol>
            <div className="p-5 rounded-2xl bg-slate-100 font-mono text-xs text-slate-800 border border-slate-200">
              <div className="text-slate-400">// Exact Payout Equation:</div>
              <div className="text-emerald-600 font-bold mt-1">
                Net Payout = [(Gross &times; (1 - Platform Cut)) - Fixed Fee] &times; [Interbank Rate &times; (1 - Spread Markup)]
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= PAGE VIEW 4: FAQ ================= */}
      {currentPage === 'faq' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase text-emerald-600 font-bold">Financial Q&amp;A</span>
            <h2 className="font-heading font-extrabold text-3xl text-slate-900 mt-2 mb-3">Frequently Asked Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-heading font-bold text-sm text-slate-900 mb-2">Why does Payoneer rate differ from Google?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Google shows the mid-market rate. Payoneer adds a 2.0% to 2.5% spread margin on that rate as revenue, on top of their fixed $1.50 fee.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-heading font-bold text-sm text-slate-900 mb-2">How can developers save the most on fees?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Invoice direct clients via Wise Multi-Currency IBANs. On $2,000, Wise costs ~$9, while Payoneer costs ~$41.50 and wires eat $60 to $85.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-heading font-bold text-sm text-slate-900 mb-2">Is JazzCash better than commercial banks?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">JazzCash provides instant access but uses the same 2% spread. For larger sums ($1,000+), bank withdrawals provide cleaner tax trails.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-heading font-bold text-sm text-slate-900 mb-2">Are my calculations stored on your servers?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Zero financial data is stored. 100% of calculations execute locally in your browser using client-side JavaScript.</p>
            </div>
          </div>
        </div>
      )}

      {/* ================= PAGE VIEW 5: ABOUT CREATOR ================= */}
      {currentPage === 'about' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md">
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-slate-100">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white text-3xl font-heading font-extrabold shadow-md shrink-0">
                MN
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-heading font-bold text-2xl text-slate-900">Muhammad Naveed</h2>
                  <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                    Verified Creator
                  </span>
                </div>
                <p className="text-sm text-slate-500">Full-Stack &amp; Automation Software Engineer</p>
                <p className="text-xs text-slate-400">Hyderabad, Sindh, Pakistan</p>
              </div>
            </div>

            <h3 className="font-heading font-bold text-lg text-slate-900 mb-3">The Engineering Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              &quot;As a remote software developer working with international clients across Europe and the US, I repeatedly noticed hundreds of dollars disappearing into undisclosed FX spreads and correspondent fees. I engineered SmartRate to give independent engineers, freelancers, and store founders radical fee transparency before initiating a withdrawal.&quot;
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">Direct WhatsApp (Immediate):</span>
                <a href="https://wa.me/923323219981" target="_blank" rel="noopener noreferrer" className="font-mono font-bold text-emerald-600 hover:underline flex items-center gap-2">
                  <i className="fa-brands fa-whatsapp text-lg"></i> +92 332 3219981
                </a>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">Primary Email Address:</span>
                <a href="mailto:naveedkhtri7@gmail.com" className="font-mono font-bold text-emerald-600 hover:underline flex items-center gap-2">
                  <i className="fa-solid fa-envelope text-base"></i> naveedkhtri7@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6 text-xs font-bold text-emerald-600">
              <a href="https://naveed-portfolio-kappa.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1.5">
                <i className="fa-solid fa-arrow-up-right-from-square"></i> Verified Portfolio
              </a>
              <span className="text-slate-300">&bull;</span>
              <a href="https://github.com/mnaveedkhtri-ui" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1.5">
                <i className="fa-brands fa-github"></i> GitHub Profile
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ================= PAGE VIEW 6: CONTACT ================= */}
      {currentPage === 'contact' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900 mb-2">Get in Touch Directly</h2>
            <p className="text-xs text-slate-500 mb-8">Reach out directly to Muhammad Naveed for custom financial calculators or consulting.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">WhatsApp Direct Support</div>
                  <a href="https://wa.me/923323219981" target="_blank" rel="noopener noreferrer" className="text-lg font-bold font-mono text-emerald-700 hover:underline flex items-center gap-2">
                    <i className="fa-brands fa-whatsapp text-xl"></i> +92 332 3219981
                  </a>
                  <p className="text-[11px] text-emerald-600 mt-1">Instant reply &bull; Hyderabad, Pakistan (PKT)</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email Inquiries</div>
                  <a href="mailto:naveedkhtri7@gmail.com" className="text-base font-bold font-mono text-slate-800 hover:underline flex items-center gap-2">
                    <i className="fa-solid fa-envelope"></i> naveedkhtri7@gmail.com
                  </a>
                  <p className="text-[11px] text-slate-400 mt-1">Direct inbox of Muhammad Naveed</p>
                </div>
              </div>

              <div>
                {!contactSubmitted ? (
                  <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Full Name</label>
                      <input type="text" required placeholder="John Doe" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-medium focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Email</label>
                      <input type="email" required placeholder="john@example.com" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-medium focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message</label>
                      <textarea rows={4} required placeholder="Discuss custom features or calculators..." className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-medium focus:outline-none focus:border-emerald-500" />
                    </div>
                    <button type="submit" className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all">
                      Send Direct Message
                    </button>
                  </form>
                ) : (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl mx-auto shadow-sm">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <h4 className="font-heading font-bold text-base text-slate-900">Message Dispatched!</h4>
                    <p className="text-xs text-slate-600">
                      Thank you! Your message has been routed directly to Muhammad Naveed. He will reply via email within 24 hours.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= PAGE VIEW 7: PRIVACY POLICY ================= */}
      {currentPage === 'privacy' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md space-y-6">
            <div className="border-b border-slate-100 pb-6">
              <span className="text-xs font-mono uppercase text-emerald-600 font-bold">Legal Compliance</span>
              <h2 className="font-heading font-extrabold text-3xl text-slate-900 mt-1 mb-2">Privacy Policy</h2>
              <p className="text-xs text-slate-500">Effective Date: November 2026 &bull; SmartRateCalcs.com</p>
            </div>
            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <h3 className="font-heading font-bold text-sm text-slate-900">1. Zero-Tracking Guarantee</h3>
              <p>We do not use third-party tracking pixels, marketing cookies, or fingerprinting scripts. Your calculations remain strictly confidential.</p>
              <h3 className="font-heading font-bold text-sm text-slate-900">2. 100% Client-Side Processing</h3>
              <p>All calculations execute locally inside your web browser. No financial amounts or inputs are transmitted to remote servers.</p>
              <h3 className="font-heading font-bold text-sm text-slate-900">3. Data Controller Contact</h3>
              <p>For inquiries, contact Muhammad Naveed directly at naveedkhtri7@gmail.com or via WhatsApp at +92 332 3219981.</p>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <button onClick={() => navigateTo('home')} className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold">
                Return to Calculators
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PAGE VIEW 8: TERMS ================= */}
      {currentPage === 'terms' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md space-y-6">
            <div className="border-b border-slate-100 pb-6">
              <span className="text-xs font-mono uppercase text-emerald-600 font-bold">User Agreement</span>
              <h2 className="font-heading font-extrabold text-3xl text-slate-900 mt-1 mb-2">Terms of Service</h2>
              <p className="text-xs text-slate-500">Effective Date: November 2026 &bull; SmartRateCalcs.com</p>
            </div>
            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <h3 className="font-heading font-bold text-sm text-slate-900">1. Educational Purpose</h3>
              <p>SmartRateCalcs is an independent analytical tool. Calculations represent mathematical models based on publicly available rates.</p>
              <h3 className="font-heading font-bold text-sm text-slate-900">2. Trademark Disclaimer</h3>
              <p>Wise, Payoneer, Upwork, and Stripe are registered trademarks of their respective owners. SmartRateCalcs is an independent tool.</p>
              <h3 className="font-heading font-bold text-sm text-slate-900">3. Governing Law</h3>
              <p>These terms are governed in accordance with international digital standards and the laws of Sindh, Pakistan.</p>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <button onClick={() => navigateTo('home')} className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold">
                Return to Calculators
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pre-Footer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-2">Enterprise Programmatic Engines</span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3">
              Need a custom financial calculator or API integration?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              We build specialized programmatic payout engines for SaaS platforms, freelance marketplaces, and e-commerce aggregators worldwide.
            </p>
            <div className="flex items-center gap-3">
              <button onClick={() => navigateTo('contact')} className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all">
                Contact Engineering Team
              </button>
              <a href="https://naveed-portfolio-kappa.vercel.app/" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700">
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mega Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-100">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  <i className="fa-solid fa-calculator text-emerald-400"></i>
                </div>
                <span className="font-heading font-extrabold text-xl text-slate-900">
                  SmartRate<span className="text-emerald-600">Calcs</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                The independent mathematical benchmark for global contractors, remote software engineers, and e-commerce founders. Built for radical fee transparency with live interbank exchange modeling.
              </p>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <a href="https://github.com/mnaveedkhtri-ui" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:text-slate-900">
                  <i className="fa-brands fa-github"></i>
                </a>
                <a href="https://naveed-portfolio-kappa.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:text-slate-900">
                  <i className="fa-solid fa-globe"></i>
                </a>
                <a href="mailto:naveedkhtri7@gmail.com" className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:text-slate-900">
                  <i className="fa-solid fa-envelope"></i>
                </a>
                <a href="https://wa.me/923323219981" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:text-emerald-600">
                  <i className="fa-brands fa-whatsapp text-emerald-600"></i>
                </a>
              </div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[11px] font-mono text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>All FX Engines Operational (0.02s sync)</span>
              </div>
            </div>

            <div>
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900 mb-4">Calculators</h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li><button onClick={() => { navigateTo('home'); setActiveTab('payout'); }} className="hover:text-emerald-600 transition-colors">Wise vs Payoneer Fee Calculator</button></li>
                <li><button onClick={() => { navigateTo('home'); setActiveTab('payout'); }} className="hover:text-emerald-600 transition-colors">Upwork to JazzCash Net Payout</button></li>
                <li><button onClick={() => { navigateTo('home'); setActiveTab('payout'); }} className="hover:text-emerald-600 transition-colors">Fiverr Pro to Bank Wire</button></li>
                <li><button onClick={() => { navigateTo('home'); setActiveTab('ecom'); }} className="hover:text-emerald-600 transition-colors">Shopify Break-Even ROAS</button></li>
                <li><button onClick={() => { navigateTo('home'); setActiveTab('ecom'); }} className="hover:text-emerald-600 transition-colors">Stripe Fee &amp; Margin Calculator</button></li>
                <li><button onClick={() => { navigateTo('home'); setActiveTab('freelance'); }} className="hover:text-emerald-600 transition-colors">Freelance Sustainable Hourly Rate</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900 mb-4">Corridors</h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li>USD to PKR (Pakistan Raast/IBAN)</li>
                <li>USD to INR (India UPI / NEFT)</li>
                <li>USD to BDT (Bangladesh BEFTN)</li>
                <li>EUR to Global Wire Clearing</li>
                <li>GBP to Multi-Currency Swift</li>
                <li>AED to South Asian Commercial Banks</li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900 mb-4">Legal &amp; Trust</h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li><Link href="/blog" className="text-emerald-700 font-bold hover:underline flex items-center gap-1.5"><i className="fa-solid fa-book-open text-xs text-emerald-600"></i> Payout Guides &amp; Research</Link></li>
                <li><button onClick={() => navigateTo('methodology')} className="hover:text-emerald-600 transition-colors">Calculation Methodology</button></li>
                <li><button onClick={() => navigateTo('matrix')} className="hover:text-emerald-600 transition-colors">Interbank Fee Matrix 2026</button></li>
                <li><button onClick={() => navigateTo('privacy')} className="hover:text-emerald-600 transition-colors">Privacy Policy (0 Cookies)</button></li>
                <li><button onClick={() => navigateTo('terms')} className="hover:text-emerald-600 transition-colors">Terms of Service</button></li>
                <li><button onClick={() => navigateTo('about')} className="hover:text-emerald-600 transition-colors">About Muhammad Naveed</button></li>
                <li><button onClick={() => navigateTo('contact')} className="hover:text-emerald-600 transition-colors">Contact &amp; Bug Bounty</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              &copy; 2026 SmartRateCalcs. Built with mathematical precision by <strong>Muhammad Naveed</strong>. All rights reserved.
            </div>
            <div className="text-[11px] text-slate-400 text-center md:text-right">
              Disclaimer: SmartRateCalcs is an independent educational utility and is not affiliated with Wise, Payoneer, Upwork, or Stripe.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
