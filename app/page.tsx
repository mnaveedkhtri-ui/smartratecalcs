'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PROGRAMMATIC_CALCULATORS } from '../data/programmatic-calculators';
import { BLOG_POSTS } from '../data/blog-posts';
import PayPalCalculatorWidget from '../components/PayPalCalculatorWidget';
import StripeCalculatorWidget from '../components/StripeCalculatorWidget';
import ThemeToggle from '../components/ThemeToggle';
import { ContactFormClient } from '../components/ContactFormClient';

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
  const [activeTab, setActiveTab] = useState<'payout' | 'gateway' | 'ecom' | 'freelance'>('payout');
  const [gatewayVendor, setGatewayVendor] = useState<'paypal' | 'stripe'>('paypal');
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
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070d17] text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <button onClick={() => navigateTo('home')} className="flex items-center gap-2.5 sm:gap-3.5 text-left group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 dark:bg-emerald-600 text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-sm group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-calculator text-emerald-400 dark:text-white"></i>
            </div>
            <div>
              <div className="font-heading font-extrabold text-[17px] sm:text-[19px] tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 sm:gap-2">
                SmartRate<span className="text-emerald-600 dark:text-emerald-400">Calcs</span>
                <span className="text-[9px] sm:text-[10px] uppercase font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  v3.0 PRO
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400 font-medium">Independent Financial &amp; Payout Intelligence</p>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 text-[13.5px] xl:text-[14px] font-semibold text-slate-600 dark:text-slate-300">
            <button onClick={() => navigateTo('home')} className={`hover:text-slate-900 dark:hover:text-white transition-colors py-2 whitespace-nowrap ${currentPage === 'home' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}>
              Calculators
            </button>
            <button onClick={() => navigateTo('matrix')} className={`hover:text-slate-900 dark:hover:text-white transition-colors py-2 whitespace-nowrap ${currentPage === 'matrix' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}>
              Fee Matrix
            </button>
            <button onClick={() => navigateTo('methodology')} className={`hover:text-slate-900 dark:hover:text-white transition-colors py-2 whitespace-nowrap ${currentPage === 'methodology' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}>
              Methodology
            </button>
            <button onClick={() => navigateTo('faq')} className={`hover:text-slate-900 dark:hover:text-white transition-colors py-2 whitespace-nowrap ${currentPage === 'faq' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}>
              FAQ
            </button>
            <button onClick={() => navigateTo('about')} className={`hover:text-slate-900 dark:hover:text-white transition-colors py-2 whitespace-nowrap ${currentPage === 'about' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}>
              About
            </button>
            <Link href="/blog" className="hover:text-emerald-600 dark:hover:text-emerald-400 font-bold text-slate-800 dark:text-slate-200 transition-colors py-2 flex items-center gap-1.5 whitespace-nowrap">
              <span>Guides</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-slate-900 dark:text-white">USD/PKR:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">278.40</span>
            </div>

            {/* Mobile & Desktop Dark Mode Toggle */}
            <ThemeToggle />

            <button onClick={() => navigateTo('contact')} className="hidden sm:inline-flex px-3.5 xl:px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[12.5px] xl:text-[13px] font-bold shadow-sm transition-all active:scale-95 whitespace-nowrap">
              Contact
            </button>

            {/* Mobile Menu Toggle Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center border border-slate-200 dark:border-slate-700 focus:outline-none" aria-label="Toggle Menu">
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-sm`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-1.5 shadow-lg">
            <button onClick={() => navigateTo('home')} className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 flex items-center gap-2.5">
              <i className="fa-solid fa-calculator text-xs"></i> Calculators Suite
            </button>
            <Link href="/paypal-fee-calculator" className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-blue-700 dark:text-blue-300 bg-blue-50/50 dark:bg-blue-950/40 hover:bg-blue-50 flex items-center gap-2.5">
              <i className="fa-brands fa-paypal text-xs text-blue-600 dark:text-blue-400"></i> PayPal Fee Calculator
            </Link>
            <Link href="/stripe-fee-calculator" className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-indigo-700 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-950/40 hover:bg-indigo-50 flex items-center gap-2.5">
              <i className="fa-brands fa-stripe text-xs text-indigo-600 dark:text-indigo-400"></i> Stripe Fee Calculator
            </Link>
            <Link href="/upwork-fee-calculator" className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/40 hover:bg-emerald-50 flex items-center gap-2.5">
              <i className="fa-solid fa-briefcase text-xs text-emerald-600 dark:text-emerald-400"></i> Upwork Fee Calculator
            </Link>
            <Link href="/fiverr-fee-calculator" className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-[#1dbf73] dark:text-[#1dbf73] bg-emerald-50/30 dark:bg-emerald-950/30 hover:bg-emerald-50 flex items-center gap-2.5">
              <i className="fa-solid fa-tag text-xs text-[#1dbf73]"></i> Fiverr Fee Calculator
            </Link>
            <Link href="/payoneer-fee-calculator" className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-orange-700 dark:text-orange-300 bg-orange-50/50 dark:bg-orange-950/40 hover:bg-orange-50 flex items-center gap-2.5">
              <i className="fa-solid fa-coins text-xs text-orange-600 dark:text-orange-400"></i> Payoneer Fee Calculator
            </Link>
            <Link href="/freelance-hourly-rate-calculator" className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-teal-700 dark:text-teal-300 bg-teal-50/50 dark:bg-teal-950/40 hover:bg-teal-50 flex items-center gap-2.5">
              <i className="fa-solid fa-business-time text-xs text-teal-600 dark:text-teal-400"></i> Freelance Hourly Rate Architect
            </Link>
            <button onClick={() => navigateTo('matrix')} className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5">
              <i className="fa-solid fa-table-cells text-xs text-slate-400"></i> Fee Matrix 2026
            </button>
            <button onClick={() => navigateTo('methodology')} className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5">
              <i className="fa-solid fa-square-root-variable text-xs text-slate-400"></i> Calculation Methodology
            </button>
            <button onClick={() => navigateTo('faq')} className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5">
              <i className="fa-solid fa-circle-question text-xs text-slate-400"></i> Frequently Asked Questions
            </button>
            <button onClick={() => navigateTo('about')} className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5">
              <i className="fa-solid fa-user-shield text-xs text-slate-400"></i> About Muhammad Naveed
            </button>
            <Link href="/blog" className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/50 hover:bg-emerald-50 flex items-center gap-2.5">
              <i className="fa-solid fa-book-open text-xs text-emerald-600 dark:text-emerald-400"></i> Financial Guides &amp; Research
            </Link>
            <button onClick={() => navigateTo('contact')} className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2.5 shadow-sm">
              <i className="fa-solid fa-envelope text-xs"></i> Contact &amp; Bug Bounty
            </button>
            <div className="pt-2 pb-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-3.5">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Appearance:</span>
              <ThemeToggle showLabel={true} />
            </div>
          </div>
        )}
      </header>

      {/* ================= PAGE VIEW 1: HOME CALCULATORS ================= */}
      {currentPage === 'home' && (
        <div>
          <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-[12px] font-bold mb-4">
              <i className="fa-solid fa-shield-check text-emerald-600 dark:text-emerald-400"></i>
              <span>Open Financial Intelligence &bull; Zero Sponsored Bias &bull; Real Math</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-5xl text-slate-900 dark:text-white tracking-tight leading-[1.2] sm:leading-[1.15] mb-4">
              Radical fee transparency for global contractors &amp; founders.
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Payment gateways silently shave <strong className="text-slate-900 dark:text-white font-semibold">2% to 4% off international payouts</strong> through padded exchange spreads. See your exact take-home pay before you withdraw.
            </p>

            <div className="mt-6 grid grid-cols-2 lg:inline-flex lg:flex-row p-1.5 bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl border border-slate-300/70 dark:border-slate-700 gap-1.5 w-full sm:w-auto">
              <button onClick={() => setActiveTab('payout')} className={`py-2.5 px-3 sm:px-4 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${activeTab === 'payout' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                <i className="fa-solid fa-money-bill-transfer text-emerald-600 dark:text-emerald-400"></i>
                <span className="truncate">Global Payouts</span>
              </button>
              <button onClick={() => setActiveTab('gateway')} className={`py-2.5 px-3 sm:px-4 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${activeTab === 'gateway' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                <i className="fa-brands fa-paypal text-blue-600 dark:text-blue-400"></i>
                <span className="truncate">PayPal &amp; Stripe</span>
                <span className="hidden sm:inline px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-[9px] font-mono">NEW</span>
              </button>
              <button onClick={() => setActiveTab('ecom')} className={`py-2.5 px-3 sm:px-4 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${activeTab === 'ecom' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                <i className="fa-solid fa-cart-shopping"></i>
                <span className="truncate">E-Com Profit</span>
              </button>
              <button onClick={() => setActiveTab('freelance')} className={`py-2.5 px-3 sm:px-4 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${activeTab === 'freelance' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                <i className="fa-solid fa-user-clock"></i>
                <span className="truncate">Rate Architect</span>
              </button>
            </div>

            {/* Flagship Engines Quick-Launcher */}
            <div className="mt-8 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-left">
              <Link href="/upwork-fee-calculator" className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:shadow-sm transition-all group">
                <div className="text-[11px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center gap-1.5">
                  <i className="fa-solid fa-briefcase text-emerald-500 text-[10px]"></i> Upwork
                </div>
                <div className="text-[9px] text-slate-400 font-mono mt-0.5">10% Cut &amp; Bid</div>
              </Link>
              <Link href="/fiverr-fee-calculator" className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-[#1dbf73] hover:shadow-sm transition-all group">
                <div className="text-[11px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#1dbf73] flex items-center gap-1.5">
                  <i className="fa-solid fa-tag text-[#1dbf73] text-[10px]"></i> Fiverr
                </div>
                <div className="text-[9px] text-slate-400 font-mono mt-0.5">20% Seller Cut</div>
              </Link>
              <Link href="/payoneer-fee-calculator" className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-orange-500 hover:shadow-sm transition-all group">
                <div className="text-[11px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 flex items-center gap-1.5">
                  <i className="fa-solid fa-coins text-orange-500 text-[10px]"></i> Payoneer
                </div>
                <div className="text-[9px] text-slate-400 font-mono mt-0.5">2% FX Spread</div>
              </Link>
              <Link href="/freelance-hourly-rate-calculator" className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-teal-500 hover:shadow-sm transition-all group">
                <div className="text-[11px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 flex items-center gap-1.5">
                  <i className="fa-solid fa-business-time text-teal-500 text-[10px]"></i> Hourly Rate
                </div>
                <div className="text-[9px] text-slate-400 font-mono mt-0.5">Pricing Architect</div>
              </Link>
              <Link href="/paypal-fee-calculator" className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:shadow-sm transition-all group">
                <div className="text-[11px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center gap-1.5">
                  <i className="fa-brands fa-paypal text-blue-500 text-[10px]"></i> PayPal
                </div>
                <div className="text-[9px] text-slate-400 font-mono mt-0.5">3.49% + $0.49</div>
              </Link>
              <Link href="/stripe-fee-calculator" className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:shadow-sm transition-all group">
                <div className="text-[11px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1.5">
                  <i className="fa-brands fa-stripe text-indigo-500 text-[10px]"></i> Stripe
                </div>
                <div className="text-[9px] text-slate-400 font-mono mt-0.5">2.9% + $0.30</div>
              </Link>
              <Link href="/square-fee-calculator" className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white hover:shadow-sm transition-all group">
                <div className="text-[11px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white flex items-center gap-1.5">
                  <i className="fa-solid fa-square text-slate-700 dark:text-slate-300 text-[10px]"></i> Square POS
                </div>
                <div className="text-[9px] text-slate-400 font-mono mt-0.5">2.6% + $0.10</div>
              </Link>
              <Link href="/1099-tax-calculator" className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-emerald-600 hover:shadow-sm transition-all group">
                <div className="text-[11px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 flex items-center gap-1.5">
                  <i className="fa-solid fa-file-invoice-dollar text-emerald-500 text-[10px]"></i> US 1099 Tax
                </div>
                <div className="text-[9px] text-slate-400 font-mono mt-0.5">15.3% SE Tax</div>
              </Link>
            </div>
          </section>

          {/* TAB 1: Global Payouts */}
          {activeTab === 'payout' && (
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="bg-white dark:bg-slate-900/90 rounded-2xl sm:rounded-3xl p-4 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-8 border-b border-slate-100 dark:border-slate-800">
                  <div className="md:col-span-7 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Gross Invoiced Amount
                      </label>
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">${grossAmount.toLocaleString()} {currency}</span>
                    </div>

                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-lg sm:text-xl font-bold text-slate-400 dark:text-slate-500 font-mono">$</span>
                      <input
                        type="number"
                        value={grossAmount}
                        min={50}
                        max={50000}
                        step={50}
                        onChange={(e) => setGrossAmount(Number(e.target.value) || 0)}
                        className="w-full pl-8 sm:pl-10 pr-28 sm:pr-32 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="absolute right-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
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
                      <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-1">
                        <span>$100</span>
                        <span>$5,000</span>
                        <span>$10,000</span>
                        <span>$20,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-5 space-y-3">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Receiving Bank Country
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="PKR">🇵🇰 Pakistan (PKR &bull; Raast / IBAN)</option>
                      <option value="INR">🇮🇳 India (INR &bull; UPI / NEFT)</option>
                      <option value="BDT">🇧🇩 Bangladesh (BDT &bull; BEFTN)</option>
                    </select>

                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Live Interbank Benchmark:</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">1 {currency} = {baseRate.toFixed(2)} {country}</span>
                    </div>
                  </div>
                </div>

                <div className="py-6 border-b border-slate-100 dark:border-slate-800">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
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
                        className={`p-3 rounded-2xl text-left transition-all ${
                          platform === p.id 
                            ? 'border-2 border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40' 
                            : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                          {p.name}
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${platform === p.id ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>{p.cut}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{p.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">Comparative Take-Home Verdict</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Live sequential mathematical deduction</p>
                    </div>
                    <button onClick={handleCopy} className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <i className="fa-regular fa-copy mr-1"></i> {copied ? 'Copied!' : 'Copy Summary'}
                    </button>
                  </div>

                  {/* Wise Card */}
                  <div className="p-6 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/30 border-2 border-emerald-500 relative overflow-hidden">
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
                            <h4 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">Wise (TransferWise)</h4>
                            <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full">Recommended</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Zero currency markup &bull; 0.45% transparent transfer fee</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Net in Bank Account</div>
                        <div className="text-3xl font-extrabold font-mono text-emerald-700 dark:text-emerald-400 tabular">{prefix}{wiseNetLocal.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-emerald-800/40 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div><span className="text-slate-400 dark:text-slate-500 block text-[10px]">Applied Rate:</span><span className="font-mono font-bold text-slate-800 dark:text-slate-200">{baseRate.toFixed(2)}</span></div>
                      <div><span className="text-slate-400 dark:text-slate-500 block text-[10px]">Transfer Fee:</span><span className="font-mono font-bold text-slate-800 dark:text-slate-200">${wiseFee.toFixed(2)}</span></div>
                      <div><span className="text-slate-400 dark:text-slate-500 block text-[10px]">Hidden FX Loss:</span><span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">$0.00 (0%)</span></div>
                      <div><span className="text-slate-400 dark:text-slate-500 block text-[10px]">Settlement:</span><span className="font-bold text-slate-800 dark:text-slate-200">Same Day / 2h</span></div>
                    </div>
                  </div>

                  {/* Payoneer Card */}
                  <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-extrabold flex items-center justify-center text-xl border border-orange-200 dark:border-orange-800/50">
                          P
                        </div>
                        <div>
                          <h4 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">Payoneer to Bank / JazzCash</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">$1.50 withdrawal fee + 2.0% currency spread</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Net in Bank Account</div>
                        <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular">{prefix}{payoneerNetLocal.toLocaleString()}</div>
                        <div className="text-xs font-bold text-rose-600 dark:text-rose-400 font-mono">-{prefix}{payDiff.toLocaleString()} vs Wise</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div><span className="text-slate-400 dark:text-slate-500 block text-[10px]">Applied Rate:</span><span className="font-mono font-bold text-slate-800 dark:text-slate-200">{payoneerRate.toFixed(2)}</span></div>
                      <div><span className="text-slate-400 dark:text-slate-500 block text-[10px]">Fixed Fee:</span><span className="font-mono font-bold text-slate-800 dark:text-slate-200">$1.50</span></div>
                      <div><span className="text-slate-400 dark:text-slate-500 block text-[10px]">Spread Loss:</span><span className="font-mono font-bold text-rose-600 dark:text-rose-400">${(netInvoiced * 0.02).toFixed(2)} (2.0%)</span></div>
                      <div><span className="text-slate-400 dark:text-slate-500 block text-[10px]">Settlement:</span><span className="font-bold text-slate-800 dark:text-slate-200">2 - 24 Hours</span></div>
                    </div>
                  </div>

                  {/* Bank Wire Card */}
                  <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-extrabold flex items-center justify-center text-xl border border-blue-200 dark:border-blue-800/50">
                          <i className="fa-solid fa-building-columns"></i>
                        </div>
                        <div>
                          <h4 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">Commercial Bank SWIFT Wire</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Meezan, HBL intermediary fees + 2.8% bank margin</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Net in Bank Account</div>
                        <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular">{prefix}{wireNetLocal.toLocaleString()}</div>
                        <div className="text-xs font-bold text-rose-600 dark:text-rose-400 font-mono">-{prefix}{wireDiff.toLocaleString()} vs Wise</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div><span className="text-slate-400 dark:text-slate-500 block text-[10px]">Applied Rate:</span><span className="font-mono font-bold text-slate-800 dark:text-slate-200">{wireRate.toFixed(2)}</span></div>
                      <div><span className="text-slate-400 dark:text-slate-500 block text-[10px]">Intermediary Fee:</span><span className="font-mono font-bold text-slate-800 dark:text-slate-200">$25.00</span></div>
                      <div><span className="text-slate-400 dark:text-slate-500 block text-[10px]">Total Bank Take:</span><span className="font-mono font-bold text-rose-600 dark:text-rose-400">${(wireFee + netInvoiced * 0.028).toFixed(2)} (4.0%)</span></div>
                      <div><span className="text-slate-400 dark:text-slate-500 block text-[10px]">Settlement:</span><span className="font-bold text-slate-800 dark:text-slate-200">3 - 5 Days</span></div>
                    </div>
                  </div>

                  {/* Verdict Banner */}
                  <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <i className="fa-solid fa-lightbulb text-amber-500 text-sm"></i>
                      <span>Financial Verdict: By using <strong className="text-slate-900 dark:text-white">Wise</strong> instead of Payoneer on this invoice, you keep:</span>
                    </span>
                    <span className="font-extrabold font-mono text-emerald-600 dark:text-emerald-400 text-sm">+{prefix}{payDiff.toLocaleString()} in pocket</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB: PayPal & Stripe Gateway Fees */}
          {activeTab === 'gateway' && (
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              {/* Gateway Sub-Toggle */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex p-1.5 bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl border border-slate-300/70 dark:border-slate-700 gap-2">
                  <button
                    onClick={() => setGatewayVendor('paypal')}
                    className={`py-2 px-5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      gatewayVendor === 'paypal'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <i className="fa-brands fa-paypal text-sm"></i> PayPal Calculator
                  </button>
                  <button
                    onClick={() => setGatewayVendor('stripe')}
                    className={`py-2 px-5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      gatewayVendor === 'stripe'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <i className="fa-brands fa-stripe text-sm"></i> Stripe Calculator
                  </button>
                </div>
              </div>

              {gatewayVendor === 'paypal' ? (
                <PayPalCalculatorWidget />
              ) : (
                <StripeCalculatorWidget />
              )}
            </section>
          )}

          {/* TAB 2: E-Com */}
          {activeTab === 'ecom' && (
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-md">
                <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white mb-2">E-Commerce Unit Economics &amp; ROAS</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-8">Calculate true net profit after product cost, ad spend, and gateway cuts.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Retail Selling Price ($)</label>
                      <input type="number" value={ecomPrice} onChange={(e) => setEcomPrice(Number(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Product Cost + Shipping ($)</label>
                      <input type="number" value={ecomCogs} onChange={(e) => setEcomCogs(Number(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Marketing CPA / Ad Cost ($)</label>
                      <input type="number" value={ecomCpa} onChange={(e) => setEcomCpa(Number(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 uppercase">Net Profit Per Order</div>
                      <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">${ecomProfit.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 uppercase">Break-Even ROAS</div>
                      <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">{ecomRoas.toFixed(2)}x</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 uppercase">Monthly Net Profit (500 Orders)</div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">${Math.round(ecomProfit * 500).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB 3: Freelance */}
          {activeTab === 'freelance' && (
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-md">
                <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white mb-2">Freelance Rate Architect</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-8">Calculate sustainable hourly and daily rates based on real personal overhead and taxes.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Target Net Monthly Take-Home ($)</label>
                      <input type="number" value={flNet} onChange={(e) => setFlNet(Number(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Monthly Business Overhead ($)</label>
                      <input type="number" value={flOverhead} onChange={(e) => setFlOverhead(Number(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Billable Hours Per Week</label>
                      <input type="number" value={flHours} onChange={(e) => setFlHours(Number(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 uppercase">Recommended Hourly Rate</div>
                      <div className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">${Math.round(flHourly)} / hr</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 uppercase">Standard Day Rate (7h)</div>
                      <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">${Math.round(flHourly * 7)} / day</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 uppercase">Gross Monthly Billing Target</div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">${Math.round(flGross).toLocaleString()} / mo</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ================= PROGRAMMATIC CALCULATORS DIRECTORY (53 Dedicated Engines) ================= */}
          <section id="calculators" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold mb-2 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  53 Programmatic Financial Tools &bull; Live 2026 Interbank Models
                </div>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                  Dedicated Corridors &amp; Platform Calculators
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                  Engineered for high-intent search queries. Direct take-home models with zero hidden spreads.
                </p>
              </div>

              {/* Instant Search Box */}
              <div className="w-full md:w-72 relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-xs">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  type="text"
                  placeholder="Search JazzCash, Meezan, Upwork..."
                  value={calcSearch}
                  onChange={(e) => setCalcSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 shadow-sm"
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
                      ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
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
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase mb-2">
                      <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/60">
                        {calc.targetCurrency ? `${calc.sourceCurrency || 'USD'} → ${calc.targetCurrency}` : calc.category}
                      </span>
                      <span className="text-slate-400 dark:text-slate-500">2026 Spec</span>
                    </div>
                    <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 mb-2">
                      {calc.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {calc.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                    <span>Launch Calculator</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </Link>
              ))}
            </div>

            {filteredCalculators.length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">No calculators found matching &quot;{calcSearch}&quot;.</p>
              </div>
            )}
          </section>

          {/* ================= HIGH-AUTHORITY GUIDES SECTION ================= */}
          <section id="guides" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 pb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold mb-2 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Financial Research &amp; Regulatory Guides
                </div>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                  Latest Payout &amp; Tax Guides
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                  In-depth empirical research on bank clearing spreads, FBR tax compliance, and payment gateway unit economics.
                </p>
              </div>
              <Link
                href="/blog"
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1.5 self-start sm:self-auto"
              >
                View All {BLOG_POSTS.length} Guides &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BLOG_POSTS.slice(0, 3).map((post) => (
                <article
                  key={post.slug}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <Link href={`/blog/${post.slug}`} className="block mb-3.5 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-950 aspect-[1200/630]">
                      <img
                        src={`/blog/${post.slug}.png`}
                        alt={post.title}
                        width={1200}
                        height={630}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </Link>
                    <div className="flex items-center justify-between text-[11px] font-mono mb-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 font-bold">
                        {post.category}
                      </span>
                      <span className="text-slate-400 dark:text-slate-500">{post.readTime}</span>
                    </div>
                    <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug mb-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {post.metaDesc}
                    </p>
                  </div>
                  <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-bold">
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
            <h2 className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white mb-3">
              The 2026 International Gateway Fee Matrix
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Verified empirical test data collected across live withdrawals into commercial bank accounts.</p>
          </div>
          <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-md">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-mono uppercase text-[11px]">
                  <th className="py-4 px-5">Provider</th>
                  <th className="py-4 px-5">FX Markup Spread</th>
                  <th className="py-4 px-5">Fixed Fee</th>
                  <th className="py-4 px-5">Local Wallet Support</th>
                  <th className="py-4 px-5">Settlement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-5 font-bold text-slate-900 dark:text-white">Wise</td>
                  <td className="py-4 px-5 text-emerald-600 dark:text-emerald-400 font-bold font-mono">0.45% (Interbank)</td>
                  <td className="py-4 px-5 font-mono">$0.45 - $1.20</td>
                  <td className="py-4 px-5 font-semibold">Direct IBAN / Raast</td>
                  <td className="py-4 px-5">Same Day (2h)</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-5 font-bold text-slate-900 dark:text-white">Payoneer</td>
                  <td className="py-4 px-5 text-amber-600 dark:text-amber-400 font-bold font-mono">2.00% to 2.50%</td>
                  <td className="py-4 px-5 font-mono">$1.50</td>
                  <td className="py-4 px-5">JazzCash, Nayapay, Bank</td>
                  <td className="py-4 px-5">2 to 24 Hours</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-5 font-bold text-slate-900 dark:text-white">SWIFT Wire</td>
                  <td className="py-4 px-5 text-rose-600 dark:text-rose-400 font-bold font-mono">2.80% - 3.50%</td>
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
            <span className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 font-bold">Open Mathematical Principles</span>
            <h2 className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white mt-2 mb-3">How We Calculate Net Take-Home Payouts</h2>
          </div>
          <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">The Sequential Clearing Model</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li><strong className="text-slate-900 dark:text-white">Platform Commission:</strong> Upwork (10%) or Fiverr (20%) is deducted immediately from gross value.</li>
              <li><strong className="text-slate-900 dark:text-white">Fixed Gateway Fee:</strong> Payoneer ($1.50) or SWIFT ($25.00) is deducted from principal.</li>
              <li><strong className="text-slate-900 dark:text-white">Hidden FX Markup:</strong> The gateway applies a spread margin (typically 2.0% to 2.8%) below interbank mid-market.</li>
              <li><strong className="text-slate-900 dark:text-white">Final Settlement:</strong> The net foreign currency is converted and deposited to your IBAN.</li>
            </ol>
            <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 font-mono text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              <div className="text-slate-400 dark:text-slate-500">// Exact Payout Equation:</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">
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
            <span className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 font-bold">Financial Q&amp;A</span>
            <h2 className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white mt-2 mb-3">Frequently Asked Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white mb-2">Why does Payoneer rate differ from Google?</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Google shows the mid-market rate. Payoneer adds a 2.0% to 2.5% spread margin on that rate as revenue, on top of their fixed $1.50 fee.</p>
            </div>
            <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white mb-2">How can developers save the most on fees?</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Invoice direct clients via Wise Multi-Currency IBANs. On $2,000, Wise costs ~$9, while Payoneer costs ~$41.50 and wires eat $60 to $85.</p>
            </div>
            <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white mb-2">Is JazzCash better than commercial banks?</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">JazzCash provides instant access but uses the same 2% spread. For larger sums ($1,000+), bank withdrawals provide cleaner tax trails.</p>
            </div>
            <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white mb-2">Are my calculations stored on your servers?</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Zero financial data is stored. 100% of calculations execute locally in your browser using client-side JavaScript.</p>
            </div>
          </div>
        </div>
      )}

      {/* ================= PAGE VIEW 5: ABOUT CREATOR ================= */}
      {currentPage === 'about' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-md">
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white text-3xl font-heading font-extrabold shadow-md shrink-0">
                MN
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">Muhammad Naveed</h2>
                  <span className="text-xs bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800/60">
                    Verified Creator
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Full-Stack &amp; Automation Software Engineer</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Hyderabad, Sindh, Pakistan</p>
              </div>
            </div>

            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-3">The Engineering Mission</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              &quot;As a remote software developer working with international clients across Europe and the US, I repeatedly noticed hundreds of dollars disappearing into undisclosed FX spreads and correspondent fees. I engineered SmartRate to give independent engineers, freelancers, and store founders radical fee transparency before initiating a withdrawal.&quot;
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Direct WhatsApp (Immediate):</span>
                <a href="https://wa.me/923323219981" target="_blank" rel="noopener noreferrer" className="font-mono font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-2">
                  <i className="fa-brands fa-whatsapp text-lg"></i> +92 332 3219981
                </a>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Primary Email Address:</span>
                <a href="mailto:naveed@smartratecalcs.com" className="font-mono font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-2">
                  <i className="fa-solid fa-envelope text-base"></i> naveed@smartratecalcs.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <a href="https://naveed-portfolio-kappa.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1.5">
                <i className="fa-solid fa-arrow-up-right-from-square"></i> Verified Portfolio
              </a>
              <span className="text-slate-300 dark:text-slate-600">&bull;</span>
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
          <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-md">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white mb-2">Get in Touch Directly</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-8">Reach out directly to Muhammad Naveed for custom financial calculators or consulting.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
                  <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1">WhatsApp Direct Support</div>
                  <a href="https://wa.me/923323219981" target="_blank" rel="noopener noreferrer" className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-2">
                    <i className="fa-brands fa-whatsapp text-xl"></i> +92 332 3219981
                  </a>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400/80 mt-1">Instant reply &bull; Hyderabad, Pakistan (PKT)</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Email Inquiries</div>
                  <a href="mailto:naveed@smartratecalcs.com" className="text-base font-bold font-mono text-slate-800 dark:text-slate-200 hover:underline flex items-center gap-2">
                    <i className="fa-solid fa-envelope"></i> naveed@smartratecalcs.com
                  </a>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Direct inbox of Muhammad Naveed</p>
                </div>
              </div>

              <ContactFormClient />
            </div>
          </div>
        </div>
      )}

      {/* ================= PAGE VIEW 7: PRIVACY POLICY ================= */}
      {currentPage === 'privacy' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
              <span className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 font-bold">Legal Compliance</span>
              <h2 className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white mt-1 mb-2">Privacy Policy</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Effective Date: November 2026 &bull; SmartRateCalcs.com</p>
            </div>
            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">1. 100% Client-Side Calculations</h3>
              <p>All calculations execute locally inside your web browser. No financial amounts, salaries, or tax inputs are stored or sold to remote servers.</p>
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">2. Advertising &amp; Third-Party Vendors</h3>
              <p>SmartRateCalcs displays or may display advertisements via Google AdSense and contain disclosed partner/affiliate links. Third-party vendors including Google use cookies to serve ads based on prior visits to this site or other sites. You may opt out of personalized advertising via Google Ads Settings or aboutads.info.</p>
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">3. Data Controller Contact</h3>
              <p>For inquiries, contact Muhammad Naveed directly at <a href="mailto:naveed@smartratecalcs.com" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">naveed@smartratecalcs.com</a> or visit our <Link href="/privacy" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">full Privacy Policy page</Link>.</p>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => navigateTo('home')} className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-emerald-600 text-white text-xs font-bold">
                Return to Calculators
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PAGE VIEW 8: TERMS ================= */}
      {currentPage === 'terms' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
              <span className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 font-bold">User Agreement</span>
              <h2 className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white mt-1 mb-2">Terms of Service</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Effective Date: November 2026 &bull; SmartRateCalcs.com</p>
            </div>
            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">1. Educational Purpose</h3>
              <p>SmartRateCalcs is an independent analytical tool. Calculations represent mathematical models based on publicly available rates.</p>
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">2. Trademark Disclaimer</h3>
              <p>Wise, Payoneer, Upwork, and Stripe are registered trademarks of their respective owners. SmartRateCalcs is an independent tool.</p>
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">3. Governing Law</h3>
              <p>These terms are governed in accordance with international digital standards and the laws of Sindh, Pakistan.</p>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => navigateTo('home')} className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-emerald-600 text-white text-xs font-bold">
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
      <footer className="bg-white dark:bg-[#070d17] border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-100 dark:border-slate-800/80">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  <i className="fa-solid fa-calculator text-emerald-400 dark:text-white"></i>
                </div>
                <span className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
                  SmartRate<span className="text-emerald-600 dark:text-emerald-400">Calcs</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                The independent mathematical benchmark for global contractors, remote software engineers, and e-commerce founders. Built for radical fee transparency with live interbank exchange modeling.
              </p>
              <div className="flex items-center gap-3 text-slate-400 dark:text-slate-400 text-sm">
                <a href="https://github.com/mnaveedkhtri-ui" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <i className="fa-brands fa-github"></i>
                </a>
                <a href="https://naveed-portfolio-kappa.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <i className="fa-solid fa-globe"></i>
                </a>
                <a href="mailto:naveed@smartratecalcs.com" aria-label="Email Muhammad Naveed" className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <i className="fa-solid fa-envelope"></i>
                </a>
                <a href="https://wa.me/923323219981" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
              </div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-[11px] font-mono text-emerald-700 dark:text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>All FX Engines Operational (0.02s sync)</span>
              </div>
            </div>

            <div>
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-4">Flagship Calculators</h4>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <li><Link href="/square-fee-calculator" className="hover:text-slate-900 dark:hover:text-white font-semibold transition-colors flex items-center gap-1.5"><i className="fa-solid fa-square text-slate-800 dark:text-slate-200 text-xs"></i> Square Fee Calculator (US)</Link></li>
                <li><Link href="/1099-tax-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold transition-colors flex items-center gap-1.5"><i className="fa-solid fa-file-invoice-dollar text-emerald-500 text-xs"></i> 1099 Tax Calculator (IRS)</Link></li>
                <li><Link href="/stripe-fee-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors flex items-center gap-1.5"><i className="fa-brands fa-stripe text-indigo-500 text-xs"></i> Stripe Fee Calculator</Link></li>
                <li><Link href="/paypal-fee-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors flex items-center gap-1.5"><i className="fa-brands fa-paypal text-blue-500 text-xs"></i> PayPal Fee Calculator</Link></li>
                <li><Link href="/upwork-fee-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold transition-colors flex items-center gap-1.5"><i className="fa-solid fa-briefcase text-emerald-500 text-xs"></i> Upwork Fee Calculator</Link></li>
                <li><Link href="/fiverr-fee-calculator" className="hover:text-[#1dbf73] dark:hover:text-[#1dbf73] font-semibold transition-colors flex items-center gap-1.5"><i className="fa-solid fa-tag text-[#1dbf73] text-xs"></i> Fiverr Fee Calculator</Link></li>
                <li><Link href="/payoneer-fee-calculator" className="hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors flex items-center gap-1.5"><i className="fa-solid fa-coins text-orange-500 text-xs"></i> Payoneer Fee Calculator</Link></li>
                <li><Link href="/freelance-hourly-rate-calculator" className="hover:text-teal-600 dark:hover:text-teal-400 font-semibold transition-colors flex items-center gap-1.5"><i className="fa-solid fa-business-time text-teal-500 text-xs"></i> Freelance Rate Calculator</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-4">Comparisons &amp; Corridors</h4>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <li><Link href="/calculators/stripe-vs-square-fee-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors flex items-center gap-1.5"><span className="text-[10px] px-1 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-mono font-bold">US</span> Stripe vs Square Calculator</Link></li>
                <li><Link href="/calculators/wise-vs-revolut-fee-calculator" className="hover:text-sky-600 dark:hover:text-sky-400 font-semibold transition-colors flex items-center gap-1.5"><span className="text-[10px] px-1 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-300 font-mono font-bold">UK</span> Wise vs Revolut Calculator</Link></li>
                <li><Link href="/calculators/shopify-payments-vs-stripe-fee-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Shopify vs Stripe Payments</Link></li>
                <li><Link href="/calculators/wise-vs-payoneer-fee-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Wise vs Payoneer Fee Calculator</Link></li>
                <li><Link href="/calculators/deel-to-wise-payout-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Deel to Wise Payout Calculator</Link></li>
                <li><Link href="/calculators/wise-to-meezan-bank-fee-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">USD to PKR (Meezan Bank Raast)</Link></li>
                <li><Link href="/calculators/wise-to-inr-fee-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">USD to INR (India UPI / NEFT)</Link></li>
                <li><Link href="/calculators/wise-to-bdt-fee-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">USD to BDT (Bangladesh BEFTN)</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-4">Legal &amp; Trust</h4>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <li><Link href="/blog" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1.5"><i className="fa-solid fa-book-open text-xs text-emerald-600 dark:text-emerald-400"></i> Payout Guides &amp; Research</Link></li>
                <li><button onClick={() => navigateTo('methodology')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Calculation Methodology</button></li>
                <li><button onClick={() => navigateTo('matrix')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Interbank Fee Matrix 2026</button></li>
                <li><Link href="/privacy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/disclaimer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Financial Disclaimer</Link></li>
                <li><Link href="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">About Muhammad Naveed</Link></li>
                <li><Link href="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact &amp; Bug Bounty</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div>
              &copy; 2026 SmartRateCalcs. Built with mathematical precision by <strong className="text-slate-900 dark:text-white">Muhammad Naveed</strong>. All rights reserved.
            </div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 text-center md:text-right">
              Disclaimer: SmartRateCalcs is an independent educational utility and is not affiliated with Wise, Payoneer, Upwork, or Stripe.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
