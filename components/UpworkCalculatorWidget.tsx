'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface UpworkContractTier {
  name: string;
  percent: number;
  fixed: number;
  description: string;
  badge: string;
}

const UPWORK_TIERS: Record<string, UpworkContractTier> = {
  standard: {
    name: 'Standard Upwork Contract (10%)',
    percent: 10.0,
    fixed: 0.0,
    description: 'Flat 10% freelancer service fee on all fixed-price and hourly projects (2026 standard).',
    badge: 'Standard',
  },
  direct: {
    name: 'Upwork Direct Contracts (3.4%)',
    percent: 3.4,
    fixed: 0.0,
    description: 'Bring non-Upwork clients through escrow. Freelancer pays only 3.4%, client pays 0% fees.',
    badge: 'Lowest Fee',
  },
  enterprise: {
    name: 'Enterprise / Pre-2023 Grandfathered (5.0%)',
    percent: 5.0,
    fixed: 0.0,
    description: 'Enterprise contract tier or legacy contracts over $10,000 lifetime billing.',
    badge: 'Enterprise',
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
  us_ach: {
    name: 'US Bank ACH (Elevate / Wise / Payoneer US)',
    fixedFeeUsd: 0.0,
    fxSpreadPct: 0.0,
    description: 'Free ($0) transfer to US checking details with 0% Upwork FX spread. 100% recommended.',
    recommended: true,
  },
  local_bank: {
    name: 'Direct to Local Bank (PKR / INR / BDT / PHP)',
    fixedFeeUsd: 0.99,
    fxSpreadPct: 2.75,
    description: '$0.99 flat fee + hidden ~2.75% bank exchange spread below interbank rate.',
  },
  payoneer: {
    name: 'Payoneer Transfer',
    fixedFeeUsd: 2.0,
    fxSpreadPct: 2.0,
    description: '$2.00 flat fee per withdrawal + Payoneer local withdrawal fee (up to 2%).',
  },
  wire: {
    name: 'USD Wire Transfer',
    fixedFeeUsd: 30.0,
    fxSpreadPct: 0.0,
    description: '$30.00 flat wire fee. Recommended only for withdrawals exceeding $3,000 USD.',
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

export default function UpworkCalculatorWidget({ isStandalone = false }: { isStandalone?: boolean }) {
  const [calcMode, setCalcMode] = useState<'forward' | 'reverse'>('forward');
  const [amount, setAmount] = useState<number>(1000);
  const [contractTier, setContractTier] = useState<string>('standard');
  const [payoutMethod, setPayoutMethod] = useState<string>('us_ach');
  const [targetCurrency, setTargetCurrency] = useState<string>('PKR');
  const [copied, setCopied] = useState<boolean>(false);

  const activeTier = UPWORK_TIERS[contractTier] || UPWORK_TIERS.standard;
  const activePayout = WITHDRAWAL_METHODS[payoutMethod] || WITHDRAWAL_METHODS.us_ach;
  const currInfo = LOCAL_EXCHANGE_RATES[targetCurrency] || LOCAL_EXCHANGE_RATES.PKR;

  // Calculation logic
  const { grossBid, serviceFee, netUsdEarned, withdrawalDeduction, netTakeHomeUsd, netTakeHomeLocal, clientTotalCost, savingsVsLocalBank } = useMemo(() => {
    let gross = 0;
    let fee = 0;
    let netUsd = 0;

    const feePct = activeTier.percent / 100;

    if (calcMode === 'forward') {
      gross = Math.max(0, amount);
      fee = gross * feePct;
      netUsd = Math.max(0, gross - fee);
    } else {
      // Reverse: amount is target take-home USD
      const targetNet = Math.max(0, amount);
      if (feePct < 1) {
        gross = targetNet / (1 - feePct);
        fee = gross - targetNet;
        netUsd = targetNet;
      }
    }

    // Withdrawal deduction
    const fxLoss = (netUsd * (activePayout.fxSpreadPct / 100));
    const totalWithdrawalDeduct = activePayout.fixedFeeUsd + fxLoss;
    const finalUsd = Math.max(0, netUsd - totalWithdrawalDeduct);

    // Local conversion
    const localAmount = Math.round(finalUsd * currInfo.rate);

    // Client total cost (Standard Upwork contracts charge client 5% marketplace fee + $4.95 initiation)
    const clientFeePct = contractTier === 'direct' ? 0 : 0.05;
    const clientInitiation = contractTier === 'direct' ? 0 : 4.95;
    const clientTotal = gross > 0 ? gross + (gross * clientFeePct) + clientInitiation : 0;

    // Savings if using US ACH vs Direct to Local Bank
    const localBankLoss = 0.99 + (netUsd * 0.0275);
    const achLoss = 0;
    const saving = Math.max(0, localBankLoss - achLoss);

    return {
      grossBid: gross,
      serviceFee: fee,
      netUsdEarned: netUsd,
      withdrawalDeduction: totalWithdrawalDeduct,
      netTakeHomeUsd: finalUsd,
      netTakeHomeLocal: localAmount,
      clientTotalCost: clientTotal,
      savingsVsLocalBank: saving,
    };
  }, [amount, calcMode, activeTier, activePayout, currInfo, contractTier]);

  const handleCopy = () => {
    const text = `Upwork Fee & Proposal Calculation:
- Project Bid / Gross: $${grossBid.toFixed(2)} USD
- Upwork Service Fee (${activeTier.percent}%): -$${serviceFee.toFixed(2)} USD
- Freelancer Net Earnings: $${netUsdEarned.toFixed(2)} USD
- Payout via ${activePayout.name}: Net $${netTakeHomeUsd.toFixed(2)} USD (${currInfo.symbol}${netTakeHomeLocal.toLocaleString()} ${targetCurrency})
- Client Total Bill (incl. fees): $${clientTotalCost.toFixed(2)} USD
Calculated on SmartRateCalcs.com/upwork-fee-calculator`;
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
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            I am bidding $X (Standard)
          </button>
          <button
            onClick={() => setCalcMode('reverse')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              calcMode === 'reverse'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            I want to take home $X (Reverse Bid)
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 px-2">
          <i className="fa-solid fa-bolt text-amber-500"></i>
          <span>2026 Upwork Fee Structure</span>
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
                {calcMode === 'forward' ? 'Upwork Proposal / Contract Bid' : 'Desired Net Earnings in Pocket'}
              </label>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                ${amount.toLocaleString()} USD
              </span>
            </div>

            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-lg font-bold text-slate-400 font-mono">$</span>
              <input
                type="number"
                value={amount}
                min={5}
                max={50000}
                step={50}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="w-full pl-9 pr-24 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xl font-bold font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <span className="absolute right-3 px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-xs font-bold font-mono text-slate-700 dark:text-slate-200">
                USD ($)
              </span>
            </div>

            {/* Quick Pills */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {[100, 250, 500, 1000, 2000, 5000].map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    amount === val
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>
          </div>

          {/* Upwork Contract Tier */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Upwork Contract Type
            </label>
            <div className="space-y-2">
              {Object.entries(UPWORK_TIERS).map(([key, item]) => (
                <label
                  key={key}
                  className={`flex items-start justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    contractTier === key
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="contractTier"
                      value={key}
                      checked={contractTier === key}
                      onChange={(e) => setContractTier(e.target.value)}
                      className="mt-1 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {item.name}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white shrink-0 ml-2">
                    {item.percent}%
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Withdrawal & Payout Method */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Withdrawal &amp; Payout Route
            </label>
            <div className="space-y-2">
              {Object.entries(WITHDRAWAL_METHODS).map(([key, item]) => (
                <label
                  key={key}
                  className={`flex items-start justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    payoutMethod === key
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payoutMethod"
                      value={key}
                      checked={payoutMethod === key}
                      onChange={(e) => setPayoutMethod(e.target.value)}
                      className="mt-1 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {item.name}
                        </span>
                        {item.recommended && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white shrink-0 ml-2">
                    {item.fixedFeeUsd > 0 ? `$${item.fixedFeeUsd}` : '$0'}
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
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              {Object.entries(LOCAL_EXCHANGE_RATES).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.name} (Live Benchmark: 1 USD = {item.symbol}{item.rate})
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
                {calcMode === 'forward' ? 'Take-Home Earnings Summary' : 'Required Proposal Quotation'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                {activeTier.percent}% Service Fee
              </span>
            </div>

            {/* Primary Big Stat */}
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                {calcMode === 'forward' ? 'Net Take-Home (In Your Pocket):' : 'Amount to Submit on Upwork Bid:'}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                  ${calcMode === 'forward' ? netTakeHomeUsd.toFixed(2) : grossBid.toFixed(2)}
                </span>
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">USD</span>
              </div>
              {targetCurrency !== 'USD' && (
                <div className="mt-1 text-sm font-bold font-mono text-slate-700 dark:text-slate-300">
                  ≈ {currInfo.symbol}{netTakeHomeLocal.toLocaleString()} {targetCurrency}
                </div>
              )}
            </div>

            {/* Detailed Breakdown */}
            <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600 dark:text-slate-400">Upwork Contract Gross Bid:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  ${grossBid.toFixed(2)} USD
                </span>
              </div>

              <div className="flex justify-between items-center py-1 text-rose-600 dark:text-rose-400">
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-scissors text-[10px]"></i>
                  Upwork Service Fee ({activeTier.percent}%):
                </span>
                <span className="font-mono font-bold">
                  -${serviceFee.toFixed(2)} USD
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600 dark:text-slate-400">Gross Freelancer Earnings:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  ${netUsdEarned.toFixed(2)} USD
                </span>
              </div>

              {withdrawalDeduction > 0 && (
                <div className="flex justify-between items-center py-1 text-amber-600 dark:text-amber-400">
                  <span>Payout Fee &amp; FX Spread ({activePayout.name.split('(')[0]}):</span>
                  <span className="font-mono font-bold">-${withdrawalDeduction.toFixed(2)} USD</span>
                </div>
              )}

              <div className="flex justify-between items-center py-2.5 px-3 rounded-xl bg-slate-200/60 dark:bg-slate-700/60 border border-slate-300/50 dark:border-slate-600/50 font-bold">
                <span className="text-slate-900 dark:text-white">Client Pays (Gross + 5% Fee):</span>
                <span className="font-mono text-slate-900 dark:text-white">${clientTotalCost.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Smart Tip / Savings Insight */}
            {payoutMethod !== 'us_ach' && savingsVsLocalBank > 0 && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                <i className="fa-solid fa-lightbulb text-emerald-600 dark:text-emerald-400 mt-0.5"></i>
                <div>
                  <span className="font-bold">Pro-Tip for International Freelancers:</span> By switching from direct bank/Payoneer to a free US ACH account (Wise or Elevate Pay), you save <span className="font-bold underline">${savingsVsLocalBank.toFixed(2)} USD</span> on this single withdrawal!
                </div>
              </div>
            )}
          </div>

          {/* Copy Button */}
          <div className="space-y-3">
            <button
              onClick={handleCopy}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all active:scale-[0.99]"
            >
              <i className={copied ? 'fa-solid fa-check' : 'fa-regular fa-copy'}></i>
              <span>{copied ? 'Copied Breakdown to Clipboard!' : 'Copy Proposal Breakdown'}</span>
            </button>

            {!isStandalone && (
              <Link
                href="/upwork-fee-calculator"
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span>Read Full 2026 Upwork Fee &amp; Tax Guide</span>
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
