// components/ProgrammaticCalculatorWidget.tsx
'use client';

import React, { useState } from 'react';
import { ProgrammaticCalculator } from '../data/programmatic-calculators';

interface Props {
  calc: ProgrammaticCalculator;
}

export default function ProgrammaticCalculatorWidget({ calc }: Props) {
  const initialAmount = calc.defaultAmount || 1000;
  const [amount, setAmount] = useState<number>(initialAmount);
  const [copied, setCopied] = useState<boolean>(false);

  const baseRate = calc.baseExchangeRate || 1.0;
  const fixedFee = calc.fixedFee || 0;
  const percentFee = calc.percentFee || 0;
  const spread = calc.exchangeRateSpread || 0;

  // Platform math
  const effectiveRate = baseRate * (1 - spread);
  const calculatedFee = (amount * percentFee) + fixedFee;
  const netBeforeConversion = Math.max(0, amount - calculatedFee);
  const finalLocalAmount = Math.round(netBeforeConversion * effectiveRate);

  // Ideal baseline (Zero spread mid-market rate)
  const trueIdealLocal = Math.round((amount - (amount * 0.005)) * baseRate);
  const hiddenSpreadLoss = Math.max(0, trueIdealLocal - finalLocalAmount);

  // Currency symbols
  const targetSymbol =
    calc.targetCurrency === 'PKR'
      ? '₨ '
      : calc.targetCurrency === 'INR'
      ? '₹ '
      : calc.targetCurrency === 'BDT'
      ? '৳ '
      : calc.targetCurrency === 'PHP'
      ? '₱ '
      : calc.targetCurrency === 'NGN'
      ? '₦ '
      : '$ ';

  const sourceSymbol = '$ ';

  const handleCopy = () => {
    const text = `SmartRateCalcs Breakdown for ${calc.title}:
Input: ${sourceSymbol}${amount.toLocaleString()}
Deductions: ${sourceSymbol}${calculatedFee.toFixed(2)}
Net Payout: ${targetSymbol}${finalLocalAmount.toLocaleString()}
Calculated on: https://www.smartratecalcs.com/calculators/${calc.slug}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    Math.round(initialAmount * 0.25),
    Math.round(initialAmount * 0.5),
    initialAmount,
    Math.round(initialAmount * 2),
    Math.round(initialAmount * 5),
  ].filter((v, i, a) => v > 0 && a.indexOf(v) === i);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-12">
      {/* Widget Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono tracking-wider uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Interactive Live Engine &bull; Q4 Interbank Rates
          </div>
          <h2 className="text-lg sm:text-xl font-bold">{calc.title}</h2>
        </div>
        <button
          onClick={handleCopy}
          className="self-start sm:self-center px-4 py-2 rounded-xl bg-slate-700/80 hover:bg-slate-700 border border-slate-600 text-xs font-semibold transition-all flex items-center gap-2"
        >
          <i className={copied ? 'fa-solid fa-check text-emerald-400' : 'fa-regular fa-copy'}></i>
          <span>{copied ? 'Copied Summary!' : 'Share Breakdown'}</span>
        </button>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Amount Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 font-mono">
            Enter Amount ({calc.sourceCurrency || 'USD'}):
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">
              $
            </span>
            <input
              type="number"
              min="1"
              max="500000"
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
              className="w-full pl-9 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-slate-900 text-xl font-extrabold transition-all outline-none"
            />
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-[11px] text-slate-400 self-center mr-1 font-mono">Quick:</span>
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  amount === p
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                ${p.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Result Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Box 1: Platform Fee */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xs text-slate-500 font-semibold mb-1">
              Platform &amp; Service Fee
            </div>
            <div className="text-2xl font-extrabold text-slate-800">
              {sourceSymbol}{calculatedFee.toFixed(2)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {percentFee > 0 ? `${(percentFee * 100).toFixed(1)}%` : ''}{' '}
              {fixedFee > 0 ? `+ $${fixedFee.toFixed(2)} fixed` : ''}
            </div>
          </div>

          {/* Box 2: Hidden FX Spread */}
          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200">
            <div className="text-xs text-amber-900 font-semibold mb-1 flex items-center justify-between">
              <span>Hidden FX Spread Loss</span>
              <i className="fa-solid fa-triangle-exclamation text-amber-600 text-xs"></i>
            </div>
            <div className="text-2xl font-extrabold text-amber-700">
              {spread > 0 ? `-${(spread * 100).toFixed(1)}%` : '0% (Zero Spread)'}
            </div>
            <div className="text-[11px] text-amber-800 mt-1">
              {hiddenSpreadLoss > 0
                ? `You lose ~${targetSymbol}${hiddenSpreadLoss.toLocaleString()} below market rate`
                : 'Mid-market interbank rate applied'}
            </div>
          </div>

          {/* Box 3: Net Take-Home Payout */}
          <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-500 shadow-sm">
            <div className="text-xs text-emerald-900 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Net Amount Received
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-800">
              {targetSymbol}
              {finalLocalAmount.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1">
              Effective Net Rate: 1 USD = {effectiveRate.toFixed(2)} {calc.targetCurrency || 'USD'}
            </div>
          </div>
        </div>

        {/* High-Converting Affiliate & Recommendation Card */}
        {calc.recommendation && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold font-mono">
                <i className="fa-solid fa-shield-halved text-emerald-400"></i>
                <span>SmartRate Recommendation &bull; {calc.recommendation.badge}</span>
              </div>
              <h3 className="text-base font-bold">
                Save up to {calc.recommendation.savingPct} on this transfer
              </h3>
              <p className="text-xs text-slate-300">
                Eliminate hidden foreign exchange spreads by switching to verified zero-spread routes.
              </p>
            </div>
            <a
              href={`https://www.smartratecalcs.com/?ref=${calc.slug}`}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all shadow-md hover:shadow-lg whitespace-nowrap text-center"
            >
              {calc.recommendation.ctaText} &rarr;
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
