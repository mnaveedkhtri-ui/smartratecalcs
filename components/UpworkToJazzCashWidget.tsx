'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export default function UpworkToJazzCashWidget() {
  const [usdAmount, setUsdAmount] = useState<number>(500);
  const [usdToPkrRate, setUsdToPkrRate] = useState<number>(278.50);
  const [taxFilerStatus, setTaxFilerStatus] = useState<'filer' | 'non-filer' | 'none'>('filer');
  const [copied, setCopied] = useState<boolean>(false);

  const quickAmounts = [100, 250, 500, 1000, 2500, 5000];

  // Mathematical Models
  const calculations = useMemo(() => {
    const rawRate = Number(usdToPkrRate) || 278.50;
    const amount = Math.max(0, Number(usdAmount) || 0);

    const taxPercent = taxFilerStatus === 'filer' ? 0.01 : taxFilerStatus === 'non-filer' ? 0.02 : 0.0;

    // 1. Upwork Direct to Local Bank / JazzCash IBAN
    // Upwork cuts $0.99 fixed fee, and marks down PKR exchange rate by approx 2.5%
    const upworkDirectFeeUsd = amount > 0.99 ? 0.99 : 0;
    const netUsdUpworkDirect = Math.max(0, amount - upworkDirectFeeUsd);
    const upworkDirectRate = rawRate * 0.975; // 2.5% markdown
    const grossPkrUpworkDirect = netUsdUpworkDirect * upworkDirectRate;
    const taxUpworkDirect = grossPkrUpworkDirect * taxPercent;
    const netPkrUpworkDirect = grossPkrUpworkDirect - taxUpworkDirect;
    const hiddenFxLossUpworkDirect = netUsdUpworkDirect * (rawRate - upworkDirectRate);

    // 2. Upwork -> Payoneer -> JazzCash In-App Link
    // Upwork to Payoneer is $2.00 fee. Payoneer to JazzCash applies a 2.0% conversion spread.
    const payoneerFeeUsd = amount > 2.0 ? 2.0 : 0;
    const netUsdPayoneer = Math.max(0, amount - payoneerFeeUsd);
    const payoneerToJazzCashRate = rawRate * 0.98; // 2% fee
    const grossPkrPayoneer = netUsdPayoneer * payoneerToJazzCashRate;
    const taxPayoneer = grossPkrPayoneer * taxPercent;
    const netPkrPayoneer = grossPkrPayoneer - taxPayoneer;
    const hiddenLossPayoneer = netUsdPayoneer * (rawRate - payoneerToJazzCashRate) + (payoneerFeeUsd * rawRate);

    // 3. Upwork Direct to SadaPay / Nayapay (Freelancer IBAN)
    // Upwork treats SadaPay/Nayapay as Direct to Local Bank ($0.99 fee + 2.5% FX markdown)
    const sadaPayFeeUsd = amount > 0.99 ? 0.99 : 0;
    const netUsdSadaPay = Math.max(0, amount - sadaPayFeeUsd);
    const sadaPayRate = rawRate * 0.975;
    const grossPkrSadaPay = netUsdSadaPay * sadaPayRate;
    const taxSadaPay = grossPkrSadaPay * taxPercent;
    const netPkrSadaPay = grossPkrSadaPay - taxSadaPay;

    // 4. Upwork -> Wise USD (ACH) -> Pakistani Bank / Wallet
    // Upwork to US Bank (Wise ACH routing) is $0.00 100% Free!
    // Wise converts at true interbank rate with transparent ~0.53% transfer fee
    const wiseFeeUsd = amount > 10 ? (amount * 0.0053 + 0.45) : 0;
    const netUsdWise = Math.max(0, amount - wiseFeeUsd);
    const grossPkrWise = netUsdWise * rawRate; // Exact mid-market rate
    const taxWise = grossPkrWise * taxPercent;
    const netPkrWise = grossPkrWise - taxWise;

    // Best method comparison
    const allMethods = [
      { id: 'wise', name: 'Upwork via Wise USD (ACH)', netPkr: netPkrWise, speed: '1-3 Hours' },
      { id: 'upwork_direct', name: 'Upwork Direct to Local Bank / IBAN', netPkr: netPkrUpworkDirect, speed: '1-3 Business Days' },
      { id: 'sadapay', name: 'Upwork Direct to SadaPay / Nayapay', netPkr: netPkrSadaPay, speed: '1 Business Day' },
      { id: 'payoneer_jazzcash', name: 'Upwork to Payoneer -> JazzCash', netPkr: netPkrPayoneer, speed: 'Instant (5-10 Mins)' },
    ];

    allMethods.sort((a, b) => b.netPkr - a.netPkr);
    const bestMethod = allMethods[0];
    const diffVsDirect = netPkrWise - netPkrUpworkDirect;

    return {
      amount,
      rawRate,
      taxPercent,
      upworkDirect: {
        feeUsd: upworkDirectFeeUsd,
        effectiveRate: upworkDirectRate,
        grossPkr: grossPkrUpworkDirect,
        taxPkr: taxUpworkDirect,
        netPkr: netPkrUpworkDirect,
        fxLossPkr: hiddenFxLossUpworkDirect,
      },
      payoneer: {
        feeUsd: payoneerFeeUsd,
        effectiveRate: payoneerToJazzCashRate,
        grossPkr: grossPkrPayoneer,
        taxPkr: taxPayoneer,
        netPkr: netPkrPayoneer,
        totalLossPkr: hiddenLossPayoneer,
      },
      sadaPay: {
        feeUsd: sadaPayFeeUsd,
        effectiveRate: sadaPayRate,
        grossPkr: grossPkrSadaPay,
        taxPkr: taxSadaPay,
        netPkr: netPkrSadaPay,
      },
      wise: {
        feeUsd: wiseFeeUsd,
        effectiveRate: rawRate,
        grossPkr: grossPkrWise,
        taxPkr: taxWise,
        netPkr: netPkrWise,
        extraPkrSaved: diffVsDirect,
      },
      bestMethod,
    };
  }, [usdAmount, usdToPkrRate, taxFilerStatus]);

  const handleCopyBreakdown = () => {
    const text = `Upwork to Pakistan Net Payout Breakdown ($${calculations.amount} USD)
- Google Interbank Rate: 1 USD = Rs. ${calculations.rawRate.toFixed(2)}
- 1. Wise USD (ACH): Rs. ${Math.round(calculations.wise.netPkr).toLocaleString()} (Highest Net)
- 2. Upwork Direct to Bank: Rs. ${Math.round(calculations.upworkDirect.netPkr).toLocaleString()}
- 3. SadaPay / Nayapay: Rs. ${Math.round(calculations.sadaPay.netPkr).toLocaleString()}
- 4. Payoneer to JazzCash: Rs. ${Math.round(calculations.payoneer.netPkr).toLocaleString()} (Instant)
Calculated via SmartRateCalcs: https://www.smartratecalcs.com/calculators/upwork-to-jazzcash-calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `Check your exact Upwork payout in PKR! On $${calculations.amount} USD, Wise gives Rs. ${Math.round(calculations.wise.netPkr).toLocaleString()} vs Payoneer Rs. ${Math.round(calculations.payoneer.netPkr).toLocaleString()}. Compare fees here: https://www.smartratecalcs.com/calculators/upwork-to-jazzcash-calculator`
  )}`;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-6 sm:p-8 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-2">
              <i className="fa-solid fa-bolt text-amber-300"></i> Pakistan Freelancer Intelligence 2026
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Upwork to JazzCash &amp; SadaPay Payout Calculator
            </h2>
            <p className="text-emerald-100 text-sm mt-1 max-w-xl">
              Model real net bank payouts after platform withdrawal fees, hidden currency exchange markups, and PSEB tax withholding.
            </p>
          </div>
          <div className="text-right bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15">
            <div className="text-xs text-emerald-200 font-medium">Interbank Mid-Market Rate</div>
            <div className="text-2xl font-black font-mono tracking-tight">
              Rs. {calculations.rawRate.toFixed(2)}
            </div>
            <div className="text-[10px] text-emerald-300 mt-0.5">Google / Live Interbank</div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Input Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* USD Earnings */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Upwork Payout Amount (USD)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">${calculations.amount}</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                type="number"
                min="1"
                step="10"
                value={usdAmount}
                onChange={(e) => setUsdAmount(Number(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-mono text-lg font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
            {/* Quick Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setUsdAmount(amt)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                    usdAmount === amt
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

          {/* USD to PKR Rate */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>USD to PKR Base Rate</span>
              <span className="text-xs text-slate-400">Editable</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">PKR</span>
              <input
                type="number"
                step="0.10"
                value={usdToPkrRate}
                onChange={(e) => setUsdToPkrRate(Number(e.target.value) || 0)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-mono text-lg font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
              Google interbank rate. Upwork and Payoneer discount this by 2% to 3%.
            </div>
          </div>

          {/* FBR / PSEB Tax Status */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Tax Withholding Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTaxFilerStatus('filer')}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                  taxFilerStatus === 'filer'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <div>IT Filer</div>
                <div className="text-[10px] opacity-80 font-normal">1% Tax (PSEB)</div>
              </button>
              <button
                type="button"
                onClick={() => setTaxFilerStatus('non-filer')}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                  taxFilerStatus === 'non-filer'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <div>Non-Filer</div>
                <div className="text-[10px] opacity-80 font-normal">2% Tax</div>
              </button>
              <button
                type="button"
                onClick={() => setTaxFilerStatus('none')}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                  taxFilerStatus === 'none'
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <div>Zero Tax</div>
                <div className="text-[10px] opacity-80 font-normal">0% (Gross)</div>
              </button>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
              {taxFilerStatus === 'filer' && 'PSEB registered IT exporters pay a concessional 1% final income tax.'}
              {taxFilerStatus === 'non-filer' && 'Unregistered freelancers have 2% withheld at bank credit.'}
              {taxFilerStatus === 'none' && 'Displaying gross cash received without local tax deduction.'}
            </div>
          </div>
        </div>

        {/* Highlight Winner Card */}
        {calculations.amount > 0 && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl shrink-0 shadow-md shadow-emerald-600/20">
                <i className="fa-solid fa-trophy"></i>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  Maximum Take-Home Payout Winner
                </div>
                <div className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                  {calculations.bestMethod.name}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Yields <strong className="text-emerald-700 dark:text-emerald-400 font-mono">Rs. {Math.round(calculations.bestMethod.netPkr).toLocaleString()}</strong> in your Pakistani bank.
                </div>
              </div>
            </div>

            {calculations.wise.extraPkrSaved > 0 && (
              <div className="bg-white dark:bg-slate-800 px-4 py-2.5 rounded-xl border border-emerald-300 dark:border-emerald-700 text-right">
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Extra Cash in Hand vs Upwork Direct:
                </div>
                <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  + Rs. {Math.round(calculations.wise.extraPkrSaved).toLocaleString()}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Comprehensive Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Method 1: Upwork Direct to Local Bank */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-4 hover:border-emerald-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                Standard Bank
              </span>
              <span className="text-[11px] text-slate-500 font-mono font-medium">1-3 Days</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Upwork Direct to Local Bank
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Direct to HBL, Meezan, Alfalah, or JazzCash via IBAN.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 dark:text-slate-400">Final Net Deposit</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                Rs. {Math.round(calculations.upworkDirect.netPkr).toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-1">
                Effective: Rs. {calculations.upworkDirect.effectiveRate.toFixed(2)}/USD
              </div>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1 pt-2 border-t border-dashed border-slate-200 dark:border-slate-700">
              <div className="flex justify-between">
                <span>Upwork Fee:</span>
                <span className="font-mono text-rose-500 font-semibold">-$0.99</span>
              </div>
              <div className="flex justify-between">
                <span>Hidden FX Spread:</span>
                <span className="font-mono text-rose-500 font-semibold">~2.50%</span>
              </div>
              <div className="flex justify-between">
                <span>FX Markdown Loss:</span>
                <span className="font-mono text-rose-600 font-semibold">
                  -Rs. {Math.round(calculations.upworkDirect.fxLossPkr).toLocaleString()}
                </span>
              </div>
              {calculations.taxPercent > 0 && (
                <div className="flex justify-between">
                  <span>Withholding Tax:</span>
                  <span className="font-mono text-slate-500">
                    -Rs. {Math.round(calculations.upworkDirect.taxPkr).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Method 2: Upwork -> Payoneer -> JazzCash */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-4 hover:border-orange-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-900/60 text-orange-700 dark:text-orange-300">
                Fastest (Mobile)
              </span>
              <span className="text-[11px] text-emerald-600 font-bold font-mono">Instant</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Payoneer to JazzCash
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Upwork to Payoneer ($2), then in-app transfer to JazzCash.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 dark:text-slate-400">Final Net Deposit</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                Rs. {Math.round(calculations.payoneer.netPkr).toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-1">
                Effective: Rs. {calculations.payoneer.effectiveRate.toFixed(2)}/USD
              </div>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1 pt-2 border-t border-dashed border-slate-200 dark:border-slate-700">
              <div className="flex justify-between">
                <span>Upwork to Payoneer:</span>
                <span className="font-mono text-rose-500 font-semibold">-$2.00</span>
              </div>
              <div className="flex justify-between">
                <span>JazzCash FX Spread:</span>
                <span className="font-mono text-rose-500 font-semibold">~2.00%</span>
              </div>
              <div className="flex justify-between">
                <span>Total Fee + FX Loss:</span>
                <span className="font-mono text-rose-600 font-semibold">
                  -Rs. {Math.round(calculations.payoneer.totalLossPkr).toLocaleString()}
                </span>
              </div>
              {calculations.taxPercent > 0 && (
                <div className="flex justify-between">
                  <span>Withholding Tax:</span>
                  <span className="font-mono text-slate-500">
                    -Rs. {Math.round(calculations.payoneer.taxPkr).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Method 3: Upwork Direct to SadaPay / Nayapay */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-4 hover:border-teal-500 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300">
                Fintech EMI
              </span>
              <span className="text-[11px] text-slate-500 font-mono font-medium">Same Day</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Upwork to SadaPay / Nayapay
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Direct to SadaPay Freelancer Account via IBAN.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 dark:text-slate-400">Final Net Deposit</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                Rs. {Math.round(calculations.sadaPay.netPkr).toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-1">
                Effective: Rs. {calculations.sadaPay.effectiveRate.toFixed(2)}/USD
              </div>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1 pt-2 border-t border-dashed border-slate-200 dark:border-slate-700">
              <div className="flex justify-between">
                <span>Upwork Fee:</span>
                <span className="font-mono text-rose-500 font-semibold">-$0.99</span>
              </div>
              <div className="flex justify-between">
                <span>Hidden FX Spread:</span>
                <span className="font-mono text-rose-500 font-semibold">~2.50%</span>
              </div>
              <div className="flex justify-between">
                <span>SadaPay Deposit Fee:</span>
                <span className="font-mono text-emerald-600 font-semibold">Rs. 0 (Free)</span>
              </div>
              {calculations.taxPercent > 0 && (
                <div className="flex justify-between">
                  <span>Withholding Tax:</span>
                  <span className="font-mono text-slate-500">
                    -Rs. {Math.round(calculations.sadaPay.taxPkr).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Method 4: Upwork -> Wise USD Account */}
          <div className="p-5 rounded-2xl border-2 border-emerald-500 dark:border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-4 shadow-lg shadow-emerald-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-bl-lg tracking-wider">
              Recommended
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200">
                Highest Payout
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">1-3 Hours</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Upwork via Wise USD (ACH)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Upwork to US Bank (0% fee), then Wise to Pakistani Bank.
              </p>
            </div>
            <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800">
              <div className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">Final Net Deposit</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                Rs. {Math.round(calculations.wise.netPkr).toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-300 font-mono mt-1">
                Effective: Rs. {calculations.wise.effectiveRate.toFixed(2)}/USD
              </div>
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1 pt-2 border-t border-dashed border-emerald-200 dark:border-emerald-800">
              <div className="flex justify-between">
                <span>Upwork ACH Fee:</span>
                <span className="font-mono text-emerald-600 font-semibold">$0.00 (Free)</span>
              </div>
              <div className="flex justify-between">
                <span>Wise Transfer Fee:</span>
                <span className="font-mono text-slate-700 dark:text-slate-200 font-semibold">
                  -${calculations.wise.feeUsd.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Currency Spread:</span>
                <span className="font-mono text-emerald-600 font-semibold">0.00% (Mid-Market)</span>
              </div>
              {calculations.taxPercent > 0 && (
                <div className="flex justify-between">
                  <span>Withholding Tax:</span>
                  <span className="font-mono text-slate-500">
                    -Rs. {Math.round(calculations.wise.taxPkr).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons: Copy Breakdown & WhatsApp Share */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopyBreakdown}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-bold transition-all shadow-sm"
            >
              <i className={`fa-solid ${copied ? 'fa-check text-emerald-400' : 'fa-copy'}`}></i>
              {copied ? 'Copied to Clipboard!' : 'Copy Payout Breakdown'}
            </button>

            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-sm"
            >
              <i className="fa-brands fa-whatsapp text-sm"></i>
              Share on WhatsApp
            </a>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <i className="fa-solid fa-shield-halved text-emerald-500"></i>
            Updated with 2026 Upwork, Payoneer &amp; JazzCash fee tariffs.
          </div>
        </div>
      </div>
    </div>
  );
}
