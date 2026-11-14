'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export type CashAppTxType = 'instant' | 'business' | 'creditCard' | 'standard' | 'atm';

export default function CashAppCalculatorWidget({ isStandalone = false }: { isStandalone?: boolean }) {
  const [txType, setTxType] = useState<CashAppTxType>('instant');
  const [calcMode, setCalcMode] = useState<'forward' | 'reverse'>('forward');
  const [amount, setAmount] = useState<number>(250);
  const [targetNet, setTargetNet] = useState<number>(250);
  const [customInstantRate, setCustomInstantRate] = useState<number>(1.75); // 0.5% to 1.75%
  const [hasDirectDeposit, setHasDirectDeposit] = useState<boolean>(false); // for ATM fee reimbursement
  const [copied, setCopied] = useState<boolean>(false);

  // Cash App Official Fee Rates (2026)
  // 1. Instant Deposit: 0.5% to 1.75% (minimum $0.25)
  // 2. Business: 2.75% flat on received payments
  // 3. Credit Card: 3.0% added to send amount
  // 4. Standard: 0% (Free, 1-3 business days)
  // 5. ATM: $2.50 per withdrawal ($0 if receiving $300+/month direct deposits)

  const forwardCalc = useMemo(() => {
    let fee = 0;
    let net = amount;
    let totalDebit = amount;
    let effectiveRatePct = 0;

    if (txType === 'instant') {
      const rate = customInstantRate / 100;
      const rawFee = amount * rate;
      fee = amount > 0 ? Math.max(0.25, rawFee) : 0;
      net = Math.max(0, amount - fee);
      totalDebit = amount;
      effectiveRatePct = amount > 0 ? (fee / amount) * 100 : 0;
    } else if (txType === 'business') {
      fee = amount * 0.0275;
      net = Math.max(0, amount - fee);
      totalDebit = amount;
      effectiveRatePct = 2.75;
    } else if (txType === 'creditCard') {
      fee = amount * 0.03;
      net = amount; // Recipient gets full amount
      totalDebit = amount + fee; // Sender pays extra 3%
      effectiveRatePct = 3.0;
    } else if (txType === 'standard') {
      fee = 0;
      net = amount;
      totalDebit = amount;
      effectiveRatePct = 0;
    } else if (txType === 'atm') {
      fee = hasDirectDeposit ? 0 : 2.50;
      net = Math.max(0, amount - fee);
      totalDebit = amount + (hasDirectDeposit ? 0 : 2.50);
      effectiveRatePct = amount > 0 ? (fee / amount) * 100 : 0;
    }

    // Comparison against alternatives on same amount
    const venmoInstantFee = amount > 0 ? Math.min(25, Math.max(0.25, amount * 0.0175)) : 0;
    const paypalInstantFee = amount > 0 ? Math.min(25, Math.max(0.25, amount * 0.0175)) : 0;
    const zelleFee = 0;

    return {
      fee,
      net,
      totalDebit,
      effectiveRatePct,
      venmoInstantFee,
      paypalInstantFee,
      zelleFee,
    };
  }, [amount, txType, customInstantRate, hasDirectDeposit]);

  // Reverse Solver: "I want to receive/pocket exact $targetNet. How much should be sent?"
  const reverseCalc = useMemo(() => {
    let requiredSend = targetNet;
    let fee = 0;

    if (txType === 'business') {
      // Net = Send * (1 - 0.0275) => Send = Net / 0.9725
      requiredSend = targetNet > 0 ? targetNet / 0.9725 : 0;
      fee = requiredSend - targetNet;
    } else if (txType === 'instant') {
      const rate = customInstantRate / 100;
      // If fee > $0.25: Net = Send * (1 - rate) => Send = Net / (1 - rate)
      const calculatedSend = (1 - rate) > 0 ? targetNet / (1 - rate) : targetNet;
      if (calculatedSend * rate < 0.25) {
        requiredSend = targetNet + 0.25;
        fee = 0.25;
      } else {
        requiredSend = calculatedSend;
        fee = requiredSend - targetNet;
      }
    } else if (txType === 'creditCard') {
      requiredSend = targetNet;
      fee = targetNet * 0.03;
    } else if (txType === 'atm') {
      fee = hasDirectDeposit ? 0 : 2.50;
      requiredSend = targetNet + fee;
    } else {
      fee = 0;
      requiredSend = targetNet;
    }

    return {
      requiredSend,
      fee,
    };
  }, [targetNet, txType, customInstantRate, hasDirectDeposit]);

  const handleCopy = () => {
    const text = `SmartRateCalcs Breakdown for Cash App Fees (2026):
Transaction Type: ${txType.toUpperCase()}
${calcMode === 'forward' ? `Amount: $${amount.toFixed(2)}` : `Desired Net In Hand: $${targetNet.toFixed(2)}`}
Cash App Fee: $${(calcMode === 'forward' ? forwardCalc.fee : reverseCalc.fee).toFixed(2)}
Net Take-Home: $${(calcMode === 'forward' ? forwardCalc.net : targetNet).toFixed(2)}
Calculated on: https://www.smartratecalcs.com/calculators/cash-app-fee-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const setPreset = (val: number) => {
    setAmount(val);
    setTargetNet(val);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden mb-12 transition-colors duration-200">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono tracking-wider uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Official 2026 Cash App Fee Specifications
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-sm">
              $
            </span>
            Cash App Fee &amp; Payout Calculator
          </h2>
        </div>

        {/* Forward vs Reverse Mode Toggle */}
        <div className="inline-flex p-1 rounded-xl bg-slate-900/90 border border-slate-700/80">
          <button
            onClick={() => setCalcMode('forward')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              calcMode === 'forward'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Calculate Fee
          </button>
          <button
            onClick={() => setCalcMode('reverse')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              calcMode === 'reverse'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Invoice Solver (Reverse)
          </button>
        </div>
      </div>

      {/* Transaction Type Selector Bar */}
      <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800">
        <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2.5">
          Select Cash App Transaction Type:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          <button
            onClick={() => setTxType('instant')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              txType === 'instant'
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
            }`}
          >
            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Instant Deposit</span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">1.75%</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Debit card cash out ($0.25 min)</div>
          </button>

          <button
            onClick={() => setTxType('business')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              txType === 'business'
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
            }`}
          >
            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Cash for Business</span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">2.75%</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Receiving customer payments</div>
          </button>

          <button
            onClick={() => setTxType('creditCard')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              txType === 'creditCard'
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
            }`}
          >
            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Credit Card Send</span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">3.0%</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Sending with linked card</div>
          </button>

          <button
            onClick={() => setTxType('standard')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              txType === 'standard'
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
            }`}
          >
            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Standard Deposit</span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">FREE (0%)</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">1-3 business days payout</div>
          </button>

          <button
            onClick={() => setTxType('atm')}
            className={`p-3 rounded-2xl border text-left transition-all col-span-2 sm:col-span-1 ${
              txType === 'atm'
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
            }`}
          >
            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>ATM Cash Out</span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">$2.50</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">ATM withdrawal flat fee</div>
          </button>
        </div>

        {/* Quick Amount Presets */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono text-slate-500 font-semibold mr-1">Quick Presets:</span>
          {[25, 50, 100, 250, 500, 1000].map((p) => (
            <button
              key={p}
              onClick={() => setPreset(p)}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 font-mono font-bold text-slate-700 dark:text-slate-300 transition-colors"
            >
              ${p}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {calcMode === 'forward' ? (
          /* ================= FORWARD CALCULATION ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Transaction Amount ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-mono text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={amount}
                    onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full pl-8 pr-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-extrabold text-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 shadow-inner"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Enter total dollar amount being sent, cashed out, or invoiced.
                </span>
              </div>

              {/* Instant Transfer Custom Rate Slider (if applicable) */}
              {txType === 'instant' && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-bold text-slate-700 dark:text-slate-300">
                      Cash App Instant Fee Rate:
                    </label>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60">
                      {customInstantRate}% (Standard 1.75%)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.75"
                    step="0.05"
                    value={customInstantRate}
                    onChange={(e) => setCustomInstantRate(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>0.5% (Special Promotion)</span>
                    <span>1.5% (Legacy)</span>
                    <span>1.75% (Standard 2026 Rate)</span>
                  </div>
                </div>
              )}

              {/* ATM Direct Deposit Waiver Toggle */}
              {txType === 'atm' && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Qualifying Direct Deposit ($300+/mo)?</div>
                    <div className="text-[11px] text-slate-500">Cash App waives ATM fees with $300 monthly direct deposit</div>
                  </div>
                  <button
                    onClick={() => setHasDirectDeposit(!hasDirectDeposit)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
                      hasDirectDeposit
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {hasDirectDeposit ? 'Fee Waived ($0)' : 'Standard ($2.50)'}
                  </button>
                </div>
              )}

              {/* Helpful Fee Facts Box */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-info"></i>
                  <span>2026 Cash App Policy Note:</span>
                </div>
                <p>
                  {txType === 'instant' && 'Instant deposits charge 1.75% with a strictly enforced $0.25 minimum fee. For transfers under $14.28, the $0.25 minimum fee results in an effective rate higher than 1.75%.'}
                  {txType === 'business' && 'Cash for Business accounts automatically deduct a 2.75% processing fee on all received payments. Friends & Family personal transfers between Cash App balances are 100% free.'}
                  {txType === 'creditCard' && 'Sending money using a linked credit card incurs a 3% fee charged directly to the sender. Using a linked bank account, debit card, or Cash App balance has 0% sending fee.'}
                  {txType === 'standard' && 'Standard ACH bank deposits are 100% free with zero fees, taking between 1 to 3 business days to settle into your checking account.'}
                  {txType === 'atm' && 'Cash App charges $2.50 per ATM withdrawal plus any third-party ATM operator fees. Receive $300 or more in monthly paychecks to get unlimited in-network fee reimbursements.'}
                </p>
              </div>
            </div>

            {/* Results Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="p-6 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
                <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                    {txType === 'creditCard' ? 'Total Charged to Sender' : 'Net Take-Home Deposit'}
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                    2026 Verified
                  </span>
                </div>

                <div className="relative z-10 py-1">
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight text-emerald-400">
                    ${(txType === 'creditCard' ? forwardCalc.totalDebit : forwardCalc.net).toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <span>Effective Fee Drag:</span>
                    <strong className="text-white font-mono font-bold">{forwardCalc.effectiveRatePct.toFixed(2)}%</strong>
                  </div>
                </div>

                {/* Line Item Breakdown */}
                <div className="relative z-10 space-y-2 pt-3 border-t border-slate-800 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Transfer Principal:</span>
                    <span className="font-bold">${amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-rose-400 font-bold">
                    <span>Cash App Deduction:</span>
                    <span>-${forwardCalc.fee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-200 font-bold pt-1 border-t border-slate-800">
                    <span>{txType === 'creditCard' ? 'Recipient Gets:' : 'In Your Bank / Pocket:'}</span>
                    <span className="text-emerald-400">${forwardCalc.net.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCopy}
                  className="relative z-10 w-full mt-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                  <span>{copied ? 'Copied Report!' : 'Copy Fee & Payout Report'}</span>
                </button>
              </div>

              {/* Competitor P2P Comparison Table */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span>P2P Instant Fee Comparison</span>
                  <span className="text-[10px] text-slate-400 font-mono">On ${amount.toFixed(2)} Transfer</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-400">Cash App Instant</div>
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">${forwardCalc.fee.toFixed(2)}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-400">Venmo Instant</div>
                    <div className="font-mono font-bold text-blue-500">${forwardCalc.venmoInstantFee.toFixed(2)}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-400">Zelle</div>
                    <div className="font-mono font-bold text-emerald-500">FREE ($0)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================= REVERSE CALCULATION (INVOICE SOLVER) ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Desired Net In-Pocket Amount ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-mono text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={targetNet}
                    onChange={(e) => setTargetNet(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full pl-8 pr-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-extrabold text-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 shadow-inner"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  The exact net amount you need after Cash App takes its cut.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <i className="fa-solid fa-lightbulb"></i>
                  <span>Invoicing &amp; Billing Rule:</span>
                </div>
                <p>
                  To receive exactly <strong>${targetNet.toFixed(2)}</strong> via Cash App for Business, you must invoice the client <strong>${reverseCalc.requiredSend.toFixed(2)}</strong>. Cash App will deduct its 2.75% fee (${reverseCalc.fee.toFixed(2)}), leaving you with your full requested payment.
                </p>
              </div>
            </div>

            {/* Reverse Results Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="p-6 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
                <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                    Required Billing / Send Target
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                    Reverse Solver
                  </span>
                </div>

                <div className="relative z-10 py-1">
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight text-emerald-400">
                    ${reverseCalc.requiredSend.toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Ask sender for this exact amount to pocket your <strong>${targetNet.toFixed(2)}</strong> net.
                  </div>
                </div>

                <div className="relative z-10 space-y-2 pt-3 border-t border-slate-800 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Total Requested Amount:</span>
                    <span className="font-bold">${reverseCalc.requiredSend.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-rose-400">
                    <span>Cash App Fee ({txType === 'business' ? '2.75%' : `${customInstantRate}%`}):</span>
                    <span>-${reverseCalc.fee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-slate-800 text-sm">
                    <span>Your Guaranteed Net Take-Home:</span>
                    <span>${targetNet.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Internal Navigation Cross-Links */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-slate-500 font-mono">Related Payment &amp; POS Calculators:</span>
        <div className="flex flex-wrap gap-2">
          <Link href="/calculators/square-fee-calculator" className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-900 font-semibold text-slate-700 dark:text-slate-200 transition-colors">
            Square Fee Calculator
          </Link>
          <Link href="/calculators/paypal-fee-calculator" className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 font-semibold text-slate-700 dark:text-slate-200 transition-colors">
            PayPal Fee Calculator
          </Link>
          <Link href="/calculators/stripe-fee-calculator" className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-600 font-semibold text-slate-700 dark:text-slate-200 transition-colors">
            Stripe Fee Calculator
          </Link>
          <Link href="/calculators/1099-tax-calculator" className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-600 font-semibold text-slate-700 dark:text-slate-200 transition-colors">
            1099 Tax Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}
