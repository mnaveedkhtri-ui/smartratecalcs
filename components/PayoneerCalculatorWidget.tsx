'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface ReceivingMethod {
  name: string;
  pctFee: number;
  fixedFee: number;
  description: string;
  badge?: string;
}

const RECEIVING_METHODS: Record<string, ReceivingMethod> = {
  payoneer_to_payoneer: {
    name: 'Payoneer to Payoneer (In-Network)',
    pctFee: 0.0,
    fixedFee: 0.0,
    description: 'Free transfers between Payoneer account holders.',
    badge: '0% Free',
  },
  credit_card: {
    name: 'Payment Request via Credit Card',
    pctFee: 3.0,
    fixedFee: 0.0,
    description: 'Direct client payment via Visa, Mastercard, or Amex (3% charged to sender or receiver).',
    badge: '3.0%',
  },
  ach_debit: {
    name: 'Payment Request via US ACH Bank Debit',
    pctFee: 1.0,
    fixedFee: 0.0,
    description: 'Direct US client checking account debit (1% processing fee).',
    badge: '1.0%',
  },
  upwork_payout: {
    name: 'Upwork Payout to Payoneer',
    pctFee: 0.0,
    fixedFee: 2.0,
    description: '$2.00 flat fee charged per withdrawal from Upwork to Payoneer.',
    badge: '$2.00 Flat',
  },
  fiverr_payout: {
    name: 'Fiverr Revenue Card / Payoneer',
    pctFee: 0.0,
    fixedFee: 1.0,
    description: '$1.00 to $3.00 flat fee charged when withdrawing Fiverr funds.',
    badge: '$1.00 Flat',
  },
};

interface WithdrawalMethod {
  name: string;
  fixedFeeUsd: number;
  fxSpreadPct: number;
  description: string;
  recommended?: boolean;
}

const WITHDRAWAL_METHODS: Record<string, WithdrawalMethod> = {
  local_bank_fx: {
    name: 'Local Bank Account (Foreign Currency Deposit)',
    fixedFeeUsd: 1.5,
    fxSpreadPct: 2.0,
    description: 'Standard withdrawal to PKR/INR/BDT/PHP/EUR bank account. Up to 2.0% hidden FX spread + $1.50 fee.',
    recommended: true,
  },
  usd_bank: {
    name: 'Same-Currency USD Bank Account',
    fixedFeeUsd: 1.5,
    fxSpreadPct: 0.0,
    description: 'Withdrawal to a US-based or USD-denominated bank account. Flat 1.50% (or $1.50 min) transfer fee.',
  },
  atm_withdrawal: {
    name: 'Payoneer Mastercard ATM Cash Withdrawal',
    fixedFeeUsd: 3.15,
    fxSpreadPct: 3.5,
    description: '$3.15 fixed ATM transaction fee + up to 3.5% cross-currency conversion spread.',
  },
  pos_card: {
    name: 'Payoneer Card POS / Online Card Purchase',
    fixedFeeUsd: 0.0,
    fxSpreadPct: 3.5,
    description: 'Zero transaction fee in USD. Up to 3.5% foreign exchange fee on non-USD transactions.',
  },
};

const LOCAL_EXCHANGE_RATES: Record<string, { symbol: string; rate: number; name: string; bankSpreadNote: string }> = {
  USD: { symbol: '$', rate: 1.0, name: 'US Dollar (USD)', bankSpreadNote: 'No conversion applied' },
  PKR: { symbol: '₨', rate: 278.4, name: 'Pakistani Rupee (PKR)', bankSpreadNote: 'Interbank ~278.40 vs Payoneer ~272.80' },
  INR: { symbol: '₹', rate: 86.5, name: 'Indian Rupee (INR)', bankSpreadNote: 'Interbank ~86.50 vs Payoneer ~84.77' },
  BDT: { symbol: '৳', rate: 121.5, name: 'Bangladeshi Taka (BDT)', bankSpreadNote: 'Interbank ~121.50 vs Payoneer ~119.07' },
  PHP: { symbol: '₱', rate: 58.7, name: 'Philippine Peso (PHP)', bankSpreadNote: 'Interbank ~58.70 vs Payoneer ~57.52' },
  EUR: { symbol: '€', rate: 0.92, name: 'Euro (EUR)', bankSpreadNote: 'Interbank ~0.92 vs Payoneer ~0.90' },
  GBP: { symbol: '£', rate: 0.79, name: 'British Pound (GBP)', bankSpreadNote: 'Interbank ~0.79 vs Payoneer ~0.774' },
  AED: { symbol: 'AED ', rate: 3.67, name: 'UAE Dirham (AED)', bankSpreadNote: 'Interbank ~3.67 vs Payoneer ~3.60' },
  EGP: { symbol: 'EGP ', rate: 49.3, name: 'Egyptian Pound (EGP)', bankSpreadNote: 'Interbank ~49.30 vs Payoneer ~48.31' },
};

export default function PayoneerCalculatorWidget({ isStandalone = false }: { isStandalone?: boolean }) {
  const [calcMode, setCalcMode] = useState<'forward' | 'reverse'>('forward');
  const [amount, setAmount] = useState<number>(1000);
  const [receivingMethod, setReceivingMethod] = useState<string>('ach_debit');
  const [withdrawalMethod, setWithdrawalMethod] = useState<string>('local_bank_fx');
  const [targetCurrency, setTargetCurrency] = useState<string>('PKR');
  const [copied, setCopied] = useState<boolean>(false);

  const activeReceiving = RECEIVING_METHODS[receivingMethod] || RECEIVING_METHODS.ach_debit;
  const activeWithdrawal = WITHDRAWAL_METHODS[withdrawalMethod] || WITHDRAWAL_METHODS.local_bank_fx;
  const currInfo = LOCAL_EXCHANGE_RATES[targetCurrency] || LOCAL_EXCHANGE_RATES.PKR;

  // Calculation logic
  const {
    grossInput,
    receivingFeeDeduction,
    netPayoneerBalance,
    withdrawalFixedFee,
    fxSpreadDeductionUsd,
    effectiveExchangeRate,
    netTakeHomeUsd,
    netTakeHomeLocal,
    totalLossUsd,
    effectiveLossPercent,
    clientInvoiceRequirement,
    wiseComparisonSavings,
  } = useMemo(() => {
    let gross = 0;
    let recFee = 0;
    let balance = 0;
    let wFixed = activeWithdrawal.fixedFeeUsd;
    let fxLoss = 0;
    let netUsd = 0;
    let netLocal = 0;
    let invoiceNeeded = 0;

    if (calcMode === 'forward') {
      gross = Math.max(0, amount);
      recFee = (gross * activeReceiving.pctFee) / 100 + activeReceiving.fixedFee;
      balance = Math.max(0, gross - recFee);

      // Withdrawal calculations
      const baseWithdrawalUsd = Math.max(0, balance - wFixed);
      fxLoss = (baseWithdrawalUsd * activeWithdrawal.fxSpreadPct) / 100;
      netUsd = Math.max(0, baseWithdrawalUsd - fxLoss);

      // Effective rate applied
      const rateMultiplier = (100 - activeWithdrawal.fxSpreadPct) / 100;
      const appliedRate = currInfo.rate * (targetCurrency === 'USD' ? 1 : rateMultiplier);
      netLocal = Math.round(baseWithdrawalUsd * appliedRate);

      invoiceNeeded = gross;
    } else {
      // Reverse mode: User inputs desired Net in Bank (in targetCurrency or USD)
      const targetVal = Math.max(0, amount);
      const isTargetUsd = targetCurrency === 'USD';
      const targetInUsd = isTargetUsd ? targetVal : targetVal / (currInfo.rate * (1 - activeWithdrawal.fxSpreadPct / 100));

      // Solve backwards:
      // balance - wFixed - fxLoss = targetInUsd
      // (balance - wFixed) * (1 - fxSpread/100) = targetInUsd
      // balance = (targetInUsd / (1 - fxSpread/100)) + wFixed
      const spreadFactor = 1 - activeWithdrawal.fxSpreadPct / 100;
      balance = (targetInUsd / spreadFactor) + wFixed;

      // Solve gross before receiving fee:
      // gross - (gross * pct/100 + fixed) = balance
      // gross * (1 - pct/100) = balance + fixed
      const recFactor = 1 - activeReceiving.pctFee / 100;
      gross = (balance + activeReceiving.fixedFee) / (recFactor > 0 ? recFactor : 1);

      recFee = (gross * activeReceiving.pctFee) / 100 + activeReceiving.fixedFee;
      const baseWithdrawalUsd = Math.max(0, balance - wFixed);
      fxLoss = (baseWithdrawalUsd * activeWithdrawal.fxSpreadPct) / 100;
      netUsd = targetInUsd;
      netLocal = isTargetUsd ? Math.round(targetInUsd * currInfo.rate) : Math.round(targetVal);
      invoiceNeeded = gross;
    }

    const totalLoss = Math.max(0, gross - netUsd);
    const lossPct = gross > 0 ? (totalLoss / gross) * 100 : 0;
    const appliedEffectiveRate = targetCurrency === 'USD' ? 1 : currInfo.rate * (1 - activeWithdrawal.fxSpreadPct / 100);

    // Compare with Wise (0.45% fee + 0% FX spread)
    const wiseNetUsd = Math.max(0, gross * (1 - 0.0045));
    const wiseNetLocal = Math.round(wiseNetUsd * currInfo.rate);
    const wiseSavings = Math.max(0, wiseNetLocal - netLocal);

    return {
      grossInput: gross,
      receivingFeeDeduction: recFee,
      netPayoneerBalance: balance,
      withdrawalFixedFee: wFixed,
      fxSpreadDeductionUsd: fxLoss,
      effectiveExchangeRate: appliedEffectiveRate,
      netTakeHomeUsd: netUsd,
      netTakeHomeLocal: netLocal,
      totalLossUsd: totalLoss,
      effectiveLossPercent: lossPct,
      clientInvoiceRequirement: invoiceNeeded,
      wiseComparisonSavings: wiseSavings,
    };
  }, [amount, calcMode, activeReceiving, activeWithdrawal, targetCurrency, currInfo]);

  const handleCopy = () => {
    const text = `Payoneer Fee Breakdown (SmartRateCalcs.com):
Payment: $${grossInput.toFixed(2)} USD
- Receiving Deduction: -$${receivingFeeDeduction.toFixed(2)} (${activeReceiving.name})
- Payoneer Balance: $${netPayoneerBalance.toFixed(2)}
- Withdrawal Fee: -$${withdrawalFixedFee.toFixed(2)}
- Hidden FX Spread (2.0%): -$${fxSpreadDeductionUsd.toFixed(2)}
Net in Bank Account: ${currInfo.symbol}${netTakeHomeLocal.toLocaleString()} (${targetCurrency})
Total Payoneer Deductions: $${totalLossUsd.toFixed(2)} (${effectiveLossPercent.toFixed(2)}%)
Calculated on https://www.smartratecalcs.com/payoneer-fee-calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden mb-12">
      {/* Top Banner Mode Toggle */}
      <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
            <i className="fa-solid fa-coins"></i>
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
              Payoneer Fee &amp; FX Spread Engine
              <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60">
                2026 Spec
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Unmask 2.0% exchange spread markups &amp; receiving fees
            </p>
          </div>
        </div>

        {/* Calculation Mode Switcher */}
        <div className="inline-flex p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl border border-slate-300/60 dark:border-slate-700 text-xs font-bold w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setCalcMode('forward')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg transition-all ${
              calcMode === 'forward'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Forward (Invoice &rarr; Net)
          </button>
          <button
            type="button"
            onClick={() => setCalcMode('reverse')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg transition-all ${
              calcMode === 'reverse'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Reverse (Target &rarr; Invoice)
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-8 space-y-8">
        {/* Input Row 1: Amount + Currency */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-7 space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
              {calcMode === 'forward' ? 'Payment Amount (Invoiced USD)' : `Desired Net in Bank (${targetCurrency})`}
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-xl font-bold text-slate-400 dark:text-slate-500 font-mono">
                {calcMode === 'forward' ? '$' : currInfo.symbol}
              </span>
              <input
                type="number"
                min={10}
                max={500000}
                step={50}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-2xl font-extrabold font-mono text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          <div className="md:col-span-5 space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
              Target Payout Currency / Bank
            </label>
            <select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors cursor-pointer"
            >
              {Object.entries(LOCAL_EXCHANGE_RATES).map(([code, item]) => (
                <option key={code} value={code}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Input Row 2: Receiving Method Selection */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
            How Is The Money Received Into Payoneer?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(RECEIVING_METHODS).map(([key, method]) => {
              const isSelected = receivingMethod === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setReceivingMethod(key)}
                  className={`p-3.5 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50/70 dark:bg-orange-950/40 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      {method.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        isSelected
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {method.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    {method.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Row 3: Withdrawal / Payout Method */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
            How Do You Withdraw / Spend The Funds?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(WITHDRAWAL_METHODS).map(([key, method]) => {
              const isSelected = withdrawalMethod === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setWithdrawalMethod(key)}
                  className={`p-4 rounded-2xl text-left border-2 transition-all ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50/70 dark:bg-orange-950/40 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {method.name}
                      {method.recommended && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                          Popular
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">
                      {method.fxSpreadPct > 0 ? `~${method.fxSpreadPct}% FX` : '$0 FX'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {method.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= RESULT CARDS ================= */}
        <div className="pt-4 space-y-6">
          {/* Main Primary Result Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-orange-50/80 via-white to-amber-50/40 dark:from-orange-950/40 dark:via-slate-900 dark:to-slate-900 border-2 border-orange-500 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1 rounded-bl-xl shadow-sm flex items-center gap-1.5 font-mono">
              <i className="fa-solid fa-calculator"></i>
              {calcMode === 'forward' ? 'Net Payout Output' : 'Required Invoice Value'}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                  {calcMode === 'forward' ? 'Exact Net In Your Bank Account' : 'Invoice Amount To Send Client'}
                </div>
                <div className="text-3xl sm:text-5xl font-black font-mono text-slate-900 dark:text-white tabular">
                  {calcMode === 'forward' ? (
                    <>
                      {currInfo.symbol}
                      {netTakeHomeLocal.toLocaleString()}{' '}
                      <span className="text-lg font-bold text-slate-500 dark:text-slate-400">
                        {targetCurrency}
                      </span>
                    </>
                  ) : (
                    <>
                      ${clientInvoiceRequirement.toFixed(2)}{' '}
                      <span className="text-lg font-bold text-slate-500 dark:text-slate-400">USD</span>
                    </>
                  )}
                </div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex flex-wrap items-center gap-2 pt-1">
                  <span>
                    Net USD value:{' '}
                    <strong className="text-slate-900 dark:text-white font-mono">
                      ${netTakeHomeUsd.toFixed(2)} USD
                    </strong>
                  </span>
                  <span>&bull;</span>
                  <span className="text-rose-600 dark:text-rose-400 font-semibold font-mono">
                    Total Deductions: -${totalLossUsd.toFixed(2)} ({effectiveLossPercent.toFixed(2)}%)
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                  {copied ? 'Summary Copied to Clipboard!' : 'Copy Fee Breakdown'}
                </button>

                <Link
                  href="/calculators/wise-vs-payoneer-fee-calculator"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  Compare Directly with Wise &rarr;
                </Link>
              </div>
            </div>

            {/* Micro Breakdown Metrics */}
            <div className="mt-6 pt-5 border-t border-orange-200/60 dark:border-orange-800/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-mono">
                  Applied Exchange Rate:
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  1 USD = {effectiveExchangeRate.toFixed(2)} {targetCurrency}
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-mono">
                  Receiving Fee:
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  -${receivingFeeDeduction.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-mono">
                  Hidden 2% FX Spread:
                </span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                  -${fxSpreadDeductionUsd.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-mono">
                  Withdrawal Fixed Fee:
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  -${withdrawalFixedFee.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Wise Comparison Savings Box */}
          {targetCurrency !== 'USD' && wiseComparisonSavings > 0 && (
            <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-lg shrink-0">
                  W
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    You lose {currInfo.symbol}
                    {wiseComparisonSavings.toLocaleString()} {targetCurrency} on this transfer compared to Wise
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Payoneer marks up the currency exchange rate by ~2.00% below the real interbank rate.
                  </p>
                </div>
              </div>
              <Link
                href="/calculators/wise-vs-payoneer-fee-calculator"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0 text-center transition-colors"
              >
                See Full Comparison
              </Link>
            </div>
          )}

          {/* Inactivity & Hidden Policy Notice */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400">
            <i className="fa-solid fa-triangle-exclamation text-amber-500 text-sm mt-0.5 shrink-0"></i>
            <div>
              <strong className="text-slate-800 dark:text-slate-200">
                Payoneer Annual Fee Warning ($29.95 USD):
              </strong>{' '}
              Payoneer charges an annual account maintenance fee of <strong>$29.95</strong> if your account receives
              less than $2,000.00 USD in payments over a 12-month period. Maintaining an active balance without
              transactions also triggers a $29.95 inactivity fee.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
