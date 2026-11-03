'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface StripeRate {
  name: string;
  percent: number;
  fixed: number;
  description: string;
}

const STRIPE_RATES: Record<string, StripeRate> = {
  domestic: {
    name: 'Standard Domestic Card',
    percent: 2.90,
    fixed: 0.30,
    description: 'Standard credit/debit card transactions within your domestic country.',
  },
  international: {
    name: 'International Cards (+1.5%)',
    percent: 4.40,
    fixed: 0.30,
    description: 'Cards issued outside your domestic country (standard cross-border fee).',
  },
  international_fx: {
    name: 'International + Currency Conversion (+2.5%)',
    percent: 5.40,
    fixed: 0.30,
    description: 'Foreign card payment requiring multi-currency conversion to your settlement bank.',
  },
  invoicing: {
    name: 'Stripe Invoicing / Recurring (+0.5%)',
    percent: 3.40,
    fixed: 0.30,
    description: 'Automated invoices and recurring subscriptions via Stripe Billing.',
  },
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'CA$',
  AUD: 'AU$',
};

export default function StripeCalculatorWidget({ isStandalone = false }: { isStandalone?: boolean }) {
  const [calcMode, setCalcMode] = useState<'forward' | 'reverse'>('forward');
  const [amount, setAmount] = useState<number>(500);
  const [rateType, setRateType] = useState<string>('domestic');
  const [currency, setCurrency] = useState<string>('USD');
  const [copied, setCopied] = useState<boolean>(false);

  const activeRate = STRIPE_RATES[rateType] || STRIPE_RATES.domestic;
  const currSym = CURRENCY_SYMBOLS[currency] || '$';

  const { gross, fee, net, effectiveFeePct, paypalComparison } = useMemo(() => {
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

    // PayPal comparison (Domestic: 2.99% + 0.49, International: 4.49% + 0.49)
    const ppP = rateType.includes('international') ? 0.0449 : 0.0299;
    const ppF = 0.49;
    const paypalFee = grossVal > 0 ? grossVal * ppP + ppF : 0;
    const paypalNet = Math.max(0, grossVal - paypalFee);
    const stripeAdvantage = netVal - paypalNet;

    return {
      gross: grossVal,
      fee: feeVal,
      net: netVal,
      effectiveFeePct: effective,
      paypalComparison: {
        paypalFee,
        paypalNet,
        stripeAdvantage,
      },
    };
  }, [amount, calcMode, activeRate, rateType]);

  const handleCopy = () => {
    const text = `SmartRate Stripe Calculation (${currency}):\nInvoiced Amount: ${currSym}${gross.toFixed(2)}\nStripe Processing Fee (${activeRate.name}): -${currSym}${fee.toFixed(2)} (${effectiveFeePct.toFixed(2)}%)\nNet Payout to Bank: ${currSym}${net.toFixed(2)}\nAdvantage vs PayPal: +${currSym}${paypalComparison.stripeAdvantage.toFixed(2)} saved\nCalculated via SmartRateCalcs.com/stripe-fee-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-md">
      {/* Top Banner / Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold text-xl">
            <i className="fa-brands fa-stripe"></i>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-extrabold text-slate-900 text-lg sm:text-xl">
                Stripe Fee &amp; Net Payout Calculator (2026)
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold font-mono">
                Official Pricing
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Calculate exact credit card processing fees, international surcharges, and reverse payouts.
            </p>
          </div>
        </div>

        {/* Mode Selector Toggle */}
        <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setCalcMode('forward')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg transition-all ${
              calcMode === 'forward'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            I am receiving payment
          </button>
          <button
            onClick={() => setCalcMode('reverse')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg transition-all ${
              calcMode === 'reverse'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            I want to receive $X
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 pb-6">
        {/* Left Column: Inputs */}
        <div className="md:col-span-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {calcMode === 'forward' ? 'Customer Charge Amount' : 'Net Target In Bank Account'}
              </label>
              <span className="text-xs font-mono font-bold text-indigo-600">
                {currSym}{amount.toLocaleString()} {currency}
              </span>
            </div>

            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-lg font-bold text-slate-400 font-mono">
                {currSym}
              </span>
              <input
                type="number"
                value={amount}
                min={1}
                max={100000}
                step={25}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="w-full pl-9 pr-24 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-xl font-bold font-mono text-slate-900 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="absolute right-2 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 cursor-pointer focus:outline-none"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD (CA$)</option>
                <option value="AUD">AUD (AU$)</option>
              </select>
            </div>

            {/* Quick Amount Pills */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[50, 100, 250, 500, 1000, 2500, 5000].map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all ${
                    amount === val
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {currSym}{val}
                </button>
              ))}
            </div>
          </div>

          {/* Stripe Card / Transaction Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Payment &amp; Card Processing Tier
            </label>
            <div className="space-y-2">
              {Object.entries(STRIPE_RATES).map(([key, item]) => (
                <label
                  key={key}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    rateType === key
                      ? 'bg-indigo-50/50 border-indigo-400 ring-1 ring-indigo-400'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="stripeRateType"
                    checked={rateType === key}
                    onChange={() => setRateType(key)}
                    className="mt-1 accent-indigo-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{item.name}</span>
                      <span className="text-xs font-mono font-bold text-indigo-700">
                        {item.percent}% + {currSym}{item.fixed.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Breakdown */}
        <div className="md:col-span-6 flex flex-col justify-between">
          <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {calcMode === 'forward' ? 'Net Payout Sent to Bank' : 'Required Customer Charge'}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {calcMode === 'forward' ? 'Take-Home' : 'Bill This Amount'}
              </span>
            </div>

            <div className="py-2">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 tracking-tight">
                {currSym}
                {calcMode === 'forward' ? net.toFixed(2) : gross.toFixed(2)}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {calcMode === 'forward'
                  ? `From customer payment of ${currSym}${gross.toFixed(2)}`
                  : `Charge this amount on Stripe to net exactly ${currSym}${net.toFixed(2)}`}
              </p>
            </div>

            {/* Deductions Breakdown */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>Gross Transaction:</span>
                <span className="font-mono font-bold text-white">{currSym}{gross.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-rose-300">
                <span>Stripe Processing Fee ({activeRate.percent}% + {currSym}{activeRate.fixed.toFixed(2)}):</span>
                <span className="font-mono font-bold">-{currSym}{fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Effective Fee Percentage:</span>
                <span className="font-mono font-bold text-amber-300">{effectiveFeePct.toFixed(2)}%</span>
              </div>
            </div>

            {/* PayPal Comparison Banner */}
            <div className="pt-3 border-t border-slate-800">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                    <i className="fa-brands fa-paypal text-blue-400 text-sm"></i>
                    <span>PayPal Equivalent Fee:</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    PayPal Fee: {currSym}{paypalComparison.paypalFee.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold font-mono ${
                    paypalComparison.stripeAdvantage > 0 ? 'text-emerald-400' : 'text-slate-300'
                  }`}>
                    {paypalComparison.stripeAdvantage > 0 ? `+${currSym}${paypalComparison.stripeAdvantage.toFixed(2)} Saved` : 'Identical'}
                  </span>
                  <p className="text-[10px] text-slate-400">by using Stripe</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <i className={`fa-solid ${copied ? 'fa-check text-emerald-300' : 'fa-copy'}`}></i>
                <span>{copied ? 'Calculation Copied!' : 'Copy Fee Summary'}</span>
              </button>

              {!isStandalone && (
                <Link
                  href="/stripe-fee-calculator"
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-slate-700"
                >
                  <span>Full Guide</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
