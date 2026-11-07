'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface FiverrPayoutMethod {
  name: string;
  fixedFee: number;
  description: string;
}

const FIVERR_PAYOUTS: Record<string, FiverrPayoutMethod> = {
  bank: {
    name: 'Direct Bank Transfer (via Payoneer)',
    fixedFee: 3.0,
    description: '$3.00 flat fee per withdrawal to your local bank account.',
  },
  payoneer: {
    name: 'Fiverr Revenue Card / Payoneer',
    fixedFee: 1.0,
    description: '$1.00 fee for standard deposit (or $3.00 for instant load).',
  },
  paypal: {
    name: 'PayPal Transfer',
    fixedFee: 0.0,
    description: '$0.00 fee from Fiverr, but standard PayPal local receiving rules apply.',
  },
};

const LOCAL_EXCHANGE_RATES: Record<string, { symbol: string; rate: number; name: string }> = {
  USD: { symbol: '$', rate: 1.0, name: 'US Dollar (USD)' },
  PKR: { symbol: '₨', rate: 278.4, name: 'Pakistani Rupee (PKR)' },
  INR: { symbol: '₹', rate: 86.5, name: 'Indian Rupee (INR)' },
  BDT: { symbol: '৳', rate: 121.5, name: 'Bangladeshi Taka (BDT)' },
  PHP: { symbol: '₱', rate: 58.7, name: 'Philippine Peso (PHP)' },
  EUR: { symbol: '€', rate: 0.92, name: 'Euro (EUR)' },
  GBP: { symbol: '£', rate: 0.79, name: 'British Pound (GBP)' },
};

export default function FiverrCalculatorWidget({ isStandalone = false }: { isStandalone?: boolean }) {
  const [calcMode, setCalcMode] = useState<'forward' | 'reverse'>('forward');
  const [amount, setAmount] = useState<number>(100);
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [payoutRoute, setPayoutRoute] = useState<string>('bank');
  const [targetCurrency, setTargetCurrency] = useState<string>('PKR');
  const [copied, setCopied] = useState<boolean>(false);

  const activePayout = FIVERR_PAYOUTS[payoutRoute] || FIVERR_PAYOUTS.bank;
  const currInfo = LOCAL_EXCHANGE_RATES[targetCurrency] || LOCAL_EXCHANGE_RATES.PKR;

  const { gigPrice, sellerFee, tipDeduction, netEarningsUsd, withdrawalFee, finalInPocketUsd, finalInPocketLocal, buyerFee, buyerTotalCost } = useMemo(() => {
    let price = 0;
    let fee = 0;
    let net = 0;

    const sellerCutPct = 0.20; // Flat 20% on all orders & tips

    if (calcMode === 'forward') {
      price = Math.max(0, amount);
      fee = price * sellerCutPct;
      net = Math.max(0, price - fee);
    } else {
      // Reverse: amount is target take-home
      const target = Math.max(0, amount);
      price = target / (1 - sellerCutPct);
      fee = price - target;
      net = target;
    }

    // Tip math (Fiverr takes 20% on tips too!)
    const safeTip = Math.max(0, tipAmount);
    const tipCut = safeTip * sellerCutPct;
    const netTip = safeTip - tipCut;

    const totalNetEarnings = net + netTip;
    const withFee = activePayout.fixedFee;
    const finalUsd = Math.max(0, totalNetEarnings - withFee);
    const finalLocal = Math.round(finalUsd * currInfo.rate);

    // Buyer fee math (5.5% + $2.50 small order fee if under $75)
    let bFee = price * 0.055;
    if (price > 0 && price < 75) {
      bFee += 2.50;
    }
    const buyerTotal = price + bFee;

    return {
      gigPrice: price,
      sellerFee: fee,
      tipDeduction: tipCut,
      netEarningsUsd: totalNetEarnings,
      withdrawalFee: withFee,
      finalInPocketUsd: finalUsd,
      finalInPocketLocal: finalLocal,
      buyerFee: bFee,
      buyerTotalCost: buyerTotal,
    };
  }, [amount, tipAmount, calcMode, activePayout, currInfo]);

  const handleCopy = () => {
    const text = `Fiverr Fee & Pricing Summary:
- Gig Package Price: $${gigPrice.toFixed(2)} USD
- Fiverr 20% Seller Cut: -$${sellerFee.toFixed(2)} USD
- Freelancer Net Earnings: $${netEarningsUsd.toFixed(2)} USD
- Net In Pocket (${activePayout.name.split('(')[0]}): $${finalInPocketUsd.toFixed(2)} USD (${currInfo.symbol}${finalInPocketLocal.toLocaleString()} ${targetCurrency})
- Buyer Total Cost (incl. 5.5% Fiverr buyer fee): $${buyerTotalCost.toFixed(2)} USD
Calculated on SmartRateCalcs.com/fiverr-fee-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
      {/* Mode Switcher Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-2 sm:p-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex rounded-xl bg-slate-200/80 dark:bg-slate-800 p-1 w-full sm:w-auto">
          <button
            onClick={() => setCalcMode('forward')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              calcMode === 'forward'
                ? 'bg-[#1dbf73] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            I am pricing my Gig at $X
          </button>
          <button
            onClick={() => setCalcMode('reverse')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              calcMode === 'reverse'
                ? 'bg-[#1dbf73] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            I want $X in my pocket (Reverse Pricing)
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 px-2">
          <span className="w-2 h-2 rounded-full bg-[#1dbf73]"></span>
          <span>Fiverr 20% Cut &amp; Payout Rules</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8">
        {/* Left Column: Controls */}
        <div className="lg:col-span-6 space-y-5">
          {/* Amount Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {calcMode === 'forward' ? 'Fiverr Gig / Custom Offer Price' : 'Desired Net Earnings in Pocket'}
              </label>
              <span className="text-xs font-mono font-bold text-[#1dbf73]">
                ${amount.toLocaleString()} USD
              </span>
            </div>

            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-lg font-bold text-slate-400 font-mono">$</span>
              <input
                type="number"
                value={amount}
                min={5}
                max={10000}
                step={25}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="w-full pl-9 pr-24 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xl font-bold font-mono text-slate-900 dark:text-white focus:outline-none focus:border-[#1dbf73] transition-colors"
              />
              <span className="absolute right-3 px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-xs font-bold font-mono text-slate-700 dark:text-slate-200">
                USD ($)
              </span>
            </div>

            {/* Quick Pills */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {[25, 50, 100, 250, 500, 1000].map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    amount === val
                      ? 'bg-[#1dbf73] text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Tip Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <i className="fa-solid fa-gift text-amber-500"></i>
                <span>Client Tip (Optional)</span>
              </label>
              <span className="text-xs font-mono text-slate-500">Fiverr takes 20% on tips too</span>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-base font-bold text-slate-400 font-mono">$</span>
              <input
                type="number"
                value={tipAmount}
                min={0}
                max={500}
                step={5}
                onChange={(e) => setTipAmount(Number(e.target.value) || 0)}
                placeholder="0"
                className="w-full pl-9 pr-16 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold font-mono text-slate-900 dark:text-white focus:outline-none focus:border-[#1dbf73]"
              />
              <span className="absolute right-3 text-xs font-mono text-slate-400">Tip USD</span>
            </div>
          </div>

          {/* Withdrawal Route */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Withdrawal Method
            </label>
            <div className="space-y-2">
              {Object.entries(FIVERR_PAYOUTS).map(([key, item]) => (
                <label
                  key={key}
                  className={`flex items-start justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    payoutRoute === key
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/40 border-[#1dbf73] ring-1 ring-[#1dbf73]'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payoutRoute"
                      value={key}
                      checked={payoutRoute === key}
                      onChange={(e) => setPayoutRoute(e.target.value)}
                      className="mt-1 text-[#1dbf73] focus:ring-[#1dbf73] cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        {item.name}
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white shrink-0 ml-2">
                    {item.fixedFee > 0 ? `$${item.fixedFee.toFixed(2)}` : '$0'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Target Local Currency */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Target Currency for Payout Conversion
            </label>
            <select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#1dbf73]"
            >
              {Object.entries(LOCAL_EXCHANGE_RATES).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.name} (1 USD = {item.symbol}{item.rate})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column: Output Card */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/80 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {calcMode === 'forward' ? 'Fiverr Earnings Summary' : 'Required Gig Package Price'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                20% Fiverr Cut
              </span>
            </div>

            {/* Primary Big Stat */}
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                {calcMode === 'forward' ? 'Net In Your Pocket (Take-Home):' : 'Price to Set on Your Gig:'}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#1dbf73]">
                  ${calcMode === 'forward' ? finalInPocketUsd.toFixed(2) : gigPrice.toFixed(2)}
                </span>
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">USD</span>
              </div>
              {targetCurrency !== 'USD' && (
                <div className="mt-1 text-sm font-bold font-mono text-slate-700 dark:text-slate-300">
                  ≈ {currInfo.symbol}{finalInPocketLocal.toLocaleString()} {targetCurrency}
                </div>
              )}
            </div>

            {/* Detailed Breakdown */}
            <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600 dark:text-slate-400">Fiverr Gig Package Price:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  ${gigPrice.toFixed(2)} USD
                </span>
              </div>

              <div className="flex justify-between items-center py-1 text-rose-600 dark:text-rose-400">
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-scissors text-[10px]"></i>
                  Fiverr 20% Seller Deduction:
                </span>
                <span className="font-mono font-bold">
                  -${sellerFee.toFixed(2)} USD
                </span>
              </div>

              {tipAmount > 0 && (
                <div className="flex justify-between items-center py-1 text-emerald-600 dark:text-emerald-400">
                  <span>Net Tip Received (after 20% cut):</span>
                  <span className="font-mono font-bold">+${(tipAmount * 0.80).toFixed(2)} USD</span>
                </div>
              )}

              {withdrawalFee > 0 && (
                <div className="flex justify-between items-center py-1 text-amber-600 dark:text-amber-400">
                  <span>Withdrawal Fee ({activePayout.name.split('(')[0]}):</span>
                  <span className="font-mono font-bold">-${withdrawalFee.toFixed(2)} USD</span>
                </div>
              )}

              <div className="flex justify-between items-center py-2.5 px-3 rounded-xl bg-slate-200/60 dark:bg-slate-700/60 border border-slate-300/50 dark:border-slate-600/50 font-bold">
                <span className="text-slate-900 dark:text-white">Buyer Actually Pays (incl. 5.5% fee):</span>
                <span className="font-mono text-slate-900 dark:text-white">${buyerTotalCost.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Buyer Fee Insight */}
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
              <span className="font-bold">Did you know?</span> Fiverr charges the buyer an additional 5.5% (plus a $2.50 small order fee on orders under $75). On a ${gigPrice.toFixed(2)} Gig, your buyer is billed <strong className="text-slate-900 dark:text-white">${buyerTotalCost.toFixed(2)}</strong>!
            </div>
          </div>

          {/* Copy Button */}
          <div className="space-y-3">
            <button
              onClick={handleCopy}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-[#1dbf73] hover:bg-[#19a463] text-white shadow-md transition-all active:scale-[0.99]"
            >
              <i className={copied ? 'fa-solid fa-check' : 'fa-regular fa-copy'}></i>
              <span>{copied ? 'Copied Breakdown to Clipboard!' : 'Copy Fiverr Pricing Breakdown'}</span>
            </button>

            {!isStandalone && (
              <Link
                href="/fiverr-fee-calculator"
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span>Read Full 2026 Fiverr Fee &amp; Commission Guide</span>
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
