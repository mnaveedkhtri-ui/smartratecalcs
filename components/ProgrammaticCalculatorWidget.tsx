// components/ProgrammaticCalculatorWidget.tsx
'use client';

import React, { useState } from 'react';
import { ProgrammaticCalculator } from '../data/programmatic-calculators';

interface Props {
  calc: ProgrammaticCalculator;
}

export default function ProgrammaticCalculatorWidget({ calc }: Props) {
  // Mode: 'payout' (Standard: USD -> Local Net) | 'reverse' (Invoicing: Local Goal -> Gross USD to bill)
  const [mode, setMode] = useState<'payout' | 'reverse'>('payout');

  // Currency symbols
  const targetSymbol =
    calc.targetCurrency === 'PKR'
      ? 'Rs. '
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

  const initialSourceAmount = calc.defaultAmount || 1000;
  // Estimate realistic local target default (e.g. 100,000 PKR or 50,000 INR/PHP)
  const initialTargetAmount =
    calc.targetCurrency === 'PKR'
      ? 100000
      : calc.targetCurrency === 'INR'
      ? 50000
      : calc.targetCurrency === 'PHP'
      ? 50000
      : calc.targetCurrency === 'BDT'
      ? 100000
      : 1000;

  const [payoutAmount, setPayoutAmount] = useState<number>(initialSourceAmount);
  const [reverseGoalAmount, setReverseGoalAmount] = useState<number>(initialTargetAmount);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedInvoice, setCopiedInvoice] = useState<boolean>(false);
  const [showEmbedModal, setShowEmbedModal] = useState<boolean>(false);
  const [embedCopied, setEmbedCopied] = useState<boolean>(false);

  const baseRate = calc.baseExchangeRate || 1.0;
  const fixedFee = calc.fixedFee || 0;
  const percentFee = calc.percentFee || 0;
  const spread = calc.exchangeRateSpread || 0;

  // 1. Payout Mode Calculations
  const effectiveRate = baseRate * (1 - spread);
  const calculatedFee = (payoutAmount * percentFee) + fixedFee;
  const netBeforeConversion = Math.max(0, payoutAmount - calculatedFee);
  const finalLocalAmount = Math.round(netBeforeConversion * effectiveRate);

  // Ideal baseline (Zero spread mid-market rate)
  const trueIdealLocal = Math.round((payoutAmount - (payoutAmount * 0.005)) * baseRate);
  const hiddenSpreadLoss = Math.max(0, trueIdealLocal - finalLocalAmount);

  // 2. Reverse Invoicing Calculations (How much USD to bill for exact Local Goal)
  const requiredNetUSD = effectiveRate > 0 ? reverseGoalAmount / effectiveRate : 0;
  const grossToInvoiceUSD = percentFee < 1 ? (requiredNetUSD + fixedFee) / (1 - percentFee) : requiredNetUSD;
  const totalPlatformCutUSD = Math.max(0, grossToInvoiceUSD - (reverseGoalAmount / baseRate));
  const totalPlatformCutLocal = Math.round(totalPlatformCutUSD * baseRate);

  const handleCopyBreakdown = () => {
    const text = `SmartRateCalcs Breakdown for ${calc.title}:
Mode: Payout Calculation
Gross Amount: ${sourceSymbol}${payoutAmount.toLocaleString()}
Platform Fees: ${sourceSymbol}${calculatedFee.toFixed(2)}
Net Take-Home: ${targetSymbol}${finalLocalAmount.toLocaleString()}
Effective Rate: 1 USD = ${effectiveRate.toFixed(2)} ${calc.targetCurrency || 'USD'}
Calculated on: https://www.smartratecalcs.com/calculators/${calc.slug}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyInvoiceNote = () => {
    const text = `Client Invoicing Note for ${calc.title}:
Please process invoice for: ${sourceSymbol}${grossToInvoiceUSD.toFixed(2)} USD
Expected Net Payout: ${targetSymbol}${reverseGoalAmount.toLocaleString()}
(Calculated with zero hidden shortfall via SmartRateCalcs: https://www.smartratecalcs.com/calculators/${calc.slug})`;
    navigator.clipboard.writeText(text);
    setCopiedInvoice(true);
    setTimeout(() => setCopiedInvoice(false), 2000);
  };

  const embedCode = `<iframe src="https://www.smartratecalcs.com/embed/${calc.slug}" width="100%" height="450" frameborder="0" style="border-radius:16px; border:1px solid #e2e8f0; overflow:hidden;" title="${calc.title}"></iframe><div style="font-size:11px; text-align:right; margin-top:4px;"><a href="https://www.smartratecalcs.com/calculators/${calc.slug}" target="_blank" rel="noopener" style="color:#059669; text-decoration:none; font-family:sans-serif;">Powered by SmartRateCalcs</a></div>`;

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setEmbedCopied(true);
    setTimeout(() => setEmbedCopied(false), 2000);
  };

  const payoutPresets = [
    Math.round(initialSourceAmount * 0.25),
    Math.round(initialSourceAmount * 0.5),
    initialSourceAmount,
    Math.round(initialSourceAmount * 2),
    Math.round(initialSourceAmount * 5),
  ].filter((v, i, a) => v > 0 && a.indexOf(v) === i);

  const reversePresets = [
    Math.round(initialTargetAmount * 0.25),
    Math.round(initialTargetAmount * 0.5),
    initialTargetAmount,
    Math.round(initialTargetAmount * 2.5),
    Math.round(initialTargetAmount * 5),
  ].filter((v, i, a) => v > 0 && a.indexOf(v) === i);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden mb-12 transition-colors duration-200">
      {/* Widget Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono tracking-wider uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Interactive Live Engine &bull; Q4 Interbank Rates
          </div>
          <h2 className="text-lg sm:text-xl font-bold">{calc.title}</h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Share Breakdown Button */}
          <button
            onClick={mode === 'payout' ? handleCopyBreakdown : handleCopyInvoiceNote}
            className="px-3.5 py-1.5 rounded-xl bg-slate-700/80 hover:bg-slate-700 border border-slate-600 text-xs font-semibold transition-all flex items-center gap-1.5"
            title="Share or copy calculation"
          >
            <i className={copied || copiedInvoice ? 'fa-solid fa-check text-emerald-400' : 'fa-regular fa-copy'}></i>
            <span>{copied || copiedInvoice ? 'Copied!' : 'Share'}</span>
          </button>

          {/* Embed Modal Trigger */}
          <button
            onClick={() => setShowEmbedModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-all flex items-center gap-1.5"
            title="Embed this calculator on your blog or site"
          >
            <i className="fa-solid fa-code"></i>
            <span>Embed</span>
          </button>
        </div>
      </div>

      {/* DUAL MODE SELECTOR TABS */}
      <div className="bg-slate-100/80 dark:bg-slate-950/80 p-2 border-b border-slate-200 dark:border-slate-800 flex rounded-t-none">
        <button
          onClick={() => setMode('payout')}
          className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            mode === 'payout'
              ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <i className="fa-solid fa-money-bill-transfer text-emerald-600 dark:text-emerald-400"></i>
          <span>Payout Mode (Withdraw &rarr; Take-Home)</span>
        </button>

        <button
          onClick={() => setMode('reverse')}
          className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            mode === 'reverse'
              ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <i className="fa-solid fa-file-invoice-dollar text-indigo-600 dark:text-indigo-400"></i>
          <span>Reverse Invoicing (Goal &rarr; Bill Client)</span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-[10px] font-mono">
            New
          </span>
        </button>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* MODE 1: STANDARD PAYOUT MODE */}
        {mode === 'payout' && (
          <div className="space-y-8">
            {/* Amount Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 font-mono">
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
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-9 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white text-xl font-extrabold transition-all outline-none"
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-[11px] text-slate-400 dark:text-slate-500 self-center mr-1 font-mono">Quick:</span>
                {payoutPresets.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPayoutAmount(p)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      payoutAmount === p
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
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
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
                  Platform &amp; Service Fee
                </div>
                <div className="text-2xl font-extrabold text-slate-800 dark:text-white">
                  {sourceSymbol}{calculatedFee.toFixed(2)}
                </div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                  {percentFee > 0 ? `${(percentFee * 100).toFixed(1)}%` : ''}{' '}
                  {fixedFee > 0 ? `+ $${fixedFee.toFixed(2)} fixed` : ''}
                </div>
              </div>

              {/* Box 2: Hidden FX Spread */}
              <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
                <div className="text-xs text-amber-900 dark:text-amber-300 font-semibold mb-1 flex items-center justify-between">
                  <span>Hidden FX Spread Loss</span>
                  <i className="fa-solid fa-triangle-exclamation text-amber-600 dark:text-amber-400 text-xs"></i>
                </div>
                <div className="text-2xl font-extrabold text-amber-700 dark:text-amber-400">
                  {spread > 0 ? `-${(spread * 100).toFixed(1)}%` : '0% (Zero Spread)'}
                </div>
                <div className="text-[11px] text-amber-800 dark:text-amber-300/80 mt-1">
                  {hiddenSpreadLoss > 0
                    ? `You lose ~${targetSymbol}${hiddenSpreadLoss.toLocaleString()} below market rate`
                    : 'Mid-market interbank rate applied'}
                </div>
              </div>

              {/* Box 3: Net Take-Home Payout */}
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 dark:border-emerald-500 shadow-sm">
                <div className="text-xs text-emerald-900 dark:text-emerald-300 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
                  Net Amount Received
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-800 dark:text-emerald-300">
                  {targetSymbol}
                  {finalLocalAmount.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
                  Effective Net Rate: 1 USD = {effectiveRate.toFixed(2)} {calc.targetCurrency || 'USD'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: REVERSE INVOICING MODE */}
        {mode === 'reverse' && (
          <div className="space-y-8">
            {/* Target Goal Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 font-mono">
                Enter Desired In-Hand Payout ({calc.targetCurrency || 'PKR'}):
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-base">
                  {targetSymbol}
                </span>
                <input
                  type="number"
                  min="100"
                  max="100000000"
                  value={reverseGoalAmount}
                  onChange={(e) => setReverseGoalAmount(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-900/60 focus:border-indigo-600 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white text-xl font-extrabold transition-all outline-none"
                />
              </div>

              {/* Quick Goal Presets */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-[11px] text-slate-400 dark:text-slate-500 self-center mr-1 font-mono">Goal:</span>
                {reversePresets.map((p) => (
                  <button
                    key={p}
                    onClick={() => setReverseGoalAmount(p)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      reverseGoalAmount === p
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {targetSymbol}{p.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Reverse Invoicing Result Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1: Exact Gross Invoice to Bill Client (Hero) */}
              <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border-2 border-indigo-600 dark:border-indigo-500 shadow-sm md:col-span-1">
                <div className="text-xs text-indigo-950 dark:text-indigo-300 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <i className="fa-solid fa-file-invoice text-indigo-600 dark:text-indigo-400"></i>
                  Exact Invoice to Bill Client
                </div>
                <div className="text-2xl sm:text-3xl font-black text-indigo-900 dark:text-indigo-200">
                  ${grossToInvoiceUSD.toFixed(2)}
                </div>
                <div className="text-[11px] text-indigo-700 dark:text-indigo-400 font-semibold mt-1">
                  Bill this amount to cover all fees
                </div>
              </div>

              {/* Box 2: Total Deductions Covered */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
                  Estimated Fee &amp; Spread Cushion
                </div>
                <div className="text-2xl font-extrabold text-slate-800 dark:text-white">
                  ${totalPlatformCutUSD.toFixed(2)}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  ~{targetSymbol}{totalPlatformCutLocal.toLocaleString()} absorbed by client invoice
                </div>
              </div>

              {/* Box 3: Guaranteed Target Bank Credit */}
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/60">
                <div className="text-xs text-emerald-900 dark:text-emerald-300 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
                  Guaranteed Bank Credit
                </div>
                <div className="text-2xl font-extrabold text-emerald-800 dark:text-emerald-300">
                  {targetSymbol}{reverseGoalAmount.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
                  Exact net cash credited into your account
                </div>
              </div>
            </div>

            {/* Copy Client Invoice Message Button */}
            <div className="p-4 rounded-2xl bg-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-indigo-900">
              <div className="text-xs text-indigo-200 text-center sm:text-left">
                <span className="font-bold text-white">Need to email your client?</span> Copy a verified invoice payment note with transparent calculations.
              </div>
              <button
                onClick={handleCopyInvoiceNote}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-indigo-50 text-indigo-950 font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap shadow-sm"
              >
                <i className={copiedInvoice ? 'fa-solid fa-check text-emerald-600' : 'fa-regular fa-copy'}></i>
                <span>{copiedInvoice ? 'Copied Client Note!' : 'Copy Invoicing Note'}</span>
              </button>
            </div>
          </div>
        )}

        {/* High-Converting Affiliate & Recommendation Card */}
        {calc.recommendation && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 dark:from-emerald-950 dark:to-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-emerald-800/40">
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

      {/* EMBED CODE MODAL */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-sm font-bold">
                  <i className="fa-solid fa-code"></i>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Embed This Calculator</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Free responsive widget for bloggers &amp; media</p>
                </div>
              </div>
              <button
                onClick={() => setShowEmbedModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center justify-center text-sm transition"
              >
                &times;
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Paste this responsive HTML code into your WordPress, Ghost, Webflow, or custom website. The widget automatically recalculates live exchange rates.
            </p>

            <div className="relative">
              <textarea
                readOnly
                value={embedCode}
                rows={4}
                className="w-full p-3 rounded-xl bg-slate-900 dark:bg-slate-950 text-emerald-400 font-mono text-[11px] leading-relaxed resize-none outline-none border border-slate-800 selection:bg-emerald-500 selection:text-black"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                100% Free &bull; No API Key Needed
              </span>
              <button
                onClick={handleCopyEmbed}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-sm"
              >
                <i className={embedCopied ? 'fa-solid fa-check' : 'fa-regular fa-copy'}></i>
                <span>{embedCopied ? 'Copied HTML!' : 'Copy Embed Code'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
