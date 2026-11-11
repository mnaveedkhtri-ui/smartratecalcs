'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface SquareRate {
  name: string;
  percent: number;
  fixed: number;
  description: string;
}

const SQUARE_RATES: Record<string, SquareRate> = {
  in_person: {
    name: 'In-Person (Swipe / Chip / Contactless)',
    percent: 2.60,
    fixed: 0.10,
    description: 'Standard in-person payments taken via Square Terminal, Register, or Reader (Apple Pay, Google Pay).',
  },
  online: {
    name: 'Square Online & E-Commerce',
    percent: 2.90,
    fixed: 0.30,
    description: 'Transactions processed through your Square Online store, API checkout, or eCommerce integrations.',
  },
  invoices: {
    name: 'Square Invoices (ACH or Card)',
    percent: 3.30,
    fixed: 0.30,
    description: 'Electronic invoices paid online by customer credit or debit card.',
  },
  manual_keyed: {
    name: 'Manually Keyed-In / Virtual Terminal',
    percent: 3.50,
    fixed: 0.15,
    description: 'Phone orders or manually typed card numbers via Square Virtual Terminal.',
  },
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  CAD: 'CA$',
  GBP: '£',
  AUD: 'AU$',
};

export default function SquareCalculatorWidget({ isStandalone = false }: { isStandalone?: boolean }) {
  const [calcMode, setCalcMode] = useState<'forward' | 'reverse'>('forward');
  const [amount, setAmount] = useState<number>(500);
  const [rateType, setRateType] = useState<string>('in_person');
  const [currency, setCurrency] = useState<string>('USD');
  const [copied, setCopied] = useState<boolean>(false);

  const activeRate = SQUARE_RATES[rateType] || SQUARE_RATES.in_person;
  const currSym = CURRENCY_SYMBOLS[currency] || '$';

  const { gross, fee, net, effectiveFeePct, stripeComparison } = useMemo(() => {
    let grossVal = 0;
    let feeVal = 0;
    let netVal = 0;

    const p = activeRate.percent / 100;
    const f = activeRate.fixed;

    if (calcMode === 'forward') {
      grossVal = Math.max(0, amount);
      feeVal = grossVal > 0 ? grossVal * p + f : 0;
      netVal = Math.max(0, grossVal - feeVal);
    } else {
      netVal = Math.max(0, amount);
      if (p < 1) {
        grossVal = (netVal + f) / (1 - p);
        feeVal = grossVal - netVal;
      }
    }

    const effective = grossVal > 0 ? (feeVal / grossVal) * 100 : 0;

    // Stripe comparison (Standard Online: 2.9% + 0.30)
    const stripeFee = grossVal > 0 ? grossVal * 0.029 + 0.30 : 0;
    const diffVsStripe = stripeFee - feeVal; // positive = Square saves money

    return {
      gross: grossVal,
      fee: feeVal,
      net: netVal,
      effectiveFeePct: effective,
      stripeComparison: {
        stripeFee,
        diffVsStripe,
      },
    };
  }, [calcMode, amount, activeRate]);

  const handleCopy = () => {
    const text = `Square Fee Breakdown (${activeRate.name}):
Total Charged: ${currSym}${gross.toFixed(2)}
Square Fee (${activeRate.percent}% + ${currSym}${activeRate.fixed.toFixed(2)}): -${currSym}${fee.toFixed(2)}
Net Bank Deposit: ${currSym}${net.toFixed(2)}
Effective Processing Cost: ${effectiveFeePct.toFixed(2)}%
Calculated on SmartRateCalcs.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
      {/* Header Tabs */}
      <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center text-xs">
              <i className="fa-solid fa-square"></i>
            </span>
            Square Fee &amp; Net Payout Calculator (2026)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Official Square POS, Online, Invoices, and Virtual Terminal fee schedule.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="inline-flex rounded-xl bg-slate-200 dark:bg-slate-700/80 p-1 self-start sm:self-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => setCalcMode('forward')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              calcMode === 'forward'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            I am Charging
          </button>
          <button
            type="button"
            onClick={() => setCalcMode('reverse')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              calcMode === 'reverse'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            I Need Exactly
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Input & Tier Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              {calcMode === 'forward' ? 'Amount to Charge Customer' : 'Desired Net Bank Deposit'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-mono text-base">
                {currSym}
              </span>
              <input
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-full pl-9 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-bold text-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400"
                placeholder="500.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400"
            >
              <option value="USD">USD ($) - United States</option>
              <option value="CAD">CAD (CA$) - Canada</option>
              <option value="GBP">GBP (£) - United Kingdom</option>
              <option value="AUD">AUD (AU$) - Australia</option>
            </select>
          </div>
        </div>

        {/* Square Tier Buttons */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
            Payment Processing Method
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {Object.entries(SQUARE_RATES).map(([key, item]) => {
              const isSelected = rateType === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setRateType(key)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-slate-900 dark:border-white bg-slate-900 text-white dark:bg-slate-800 shadow-md ring-1 ring-slate-900'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold leading-tight mb-1">
                      {item.name}
                    </div>
                    <div className="font-mono text-xs opacity-80">
                      {item.percent}% + {currSym}{item.fixed.toFixed(2)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            {activeRate.description}
          </p>
        </div>

        {/* Results Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/80 dark:to-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 shadow-sm">
              <span className="text-[11px] font-bold text-slate-500 uppercase font-mono block mb-1">
                {calcMode === 'forward' ? 'Customer Pays' : 'You Must Bill'}
              </span>
              <div className="font-mono font-black text-xl sm:text-2xl text-slate-900 dark:text-white">
                {currSym}{gross.toFixed(2)}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 shadow-sm">
              <span className="text-[11px] font-bold text-rose-500 uppercase font-mono block mb-1">
                Square Processing Fee
              </span>
              <div className="font-mono font-black text-xl sm:text-2xl text-rose-600 dark:text-rose-400">
                -{currSym}{fee.toFixed(2)}
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {effectiveFeePct.toFixed(2)}% effective cost
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 shadow-sm">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase font-mono block mb-1">
                Net Deposited in Bank
              </span>
              <div className="font-mono font-black text-xl sm:text-2xl text-emerald-600 dark:text-emerald-400">
                {currSym}{net.toFixed(2)}
              </div>
              <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 font-mono">
                Next business day transfer
              </span>
            </div>
          </div>

          {/* Comparison vs Stripe */}
          <div className="p-3.5 rounded-xl bg-slate-900 dark:bg-slate-950 text-white text-xs flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
            <div>
              <span className="text-slate-400">Comparison vs Stripe Online (2.9% + $0.30): </span>
              {stripeComparison.diffVsStripe >= 0 ? (
                <strong className="text-emerald-400">
                  Square is {currSym}{stripeComparison.diffVsStripe.toFixed(2)} CHEAPER
                </strong>
              ) : (
                <strong className="text-amber-400">
                  Stripe is {currSym}{Math.abs(stripeComparison.diffVsStripe).toFixed(2)} cheaper
                </strong>
              )}
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5"
            >
              <i className={`fa-solid ${copied ? 'fa-check text-emerald-400' : 'fa-copy'}`}></i>
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
