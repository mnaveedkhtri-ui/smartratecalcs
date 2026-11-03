'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface PayPalRate {
  name: string;
  percent: number;
  fixed: number;
  description: string;
}

const PAYPAL_RATES: Record<string, PayPalRate> = {
  domestic: {
    name: 'US Domestic (Standard)',
    percent: 2.99,
    fixed: 0.49,
    description: 'Standard online transactions (credit/debit cards, PayPal balance).',
  },
  international: {
    name: 'International (Cross-Border)',
    percent: 4.49,
    fixed: 0.49,
    description: 'Payments sent by international clients outside your home country (+1.50% cross-border surcharge).',
  },
  donation: {
    name: 'Donation / Non-Profit',
    percent: 1.99,
    fixed: 0.49,
    description: 'Verified 501(c)(3) registered non-profit and charity transactions.',
  },
  qrcode: {
    name: 'QR Code / In-Person (Over $10)',
    percent: 1.90,
    fixed: 0.10,
    description: 'In-person contact-free QR code transactions over $10.',
  },
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'CA$',
  AUD: 'AU$',
};

export default function PayPalCalculatorWidget({ isStandalone = false }: { isStandalone?: boolean }) {
  const [calcMode, setCalcMode] = useState<'forward' | 'reverse'>('forward');
  const [amount, setAmount] = useState<number>(500);
  const [rateType, setRateType] = useState<string>('domestic');
  const [currency, setCurrency] = useState<string>('USD');
  const [copied, setCopied] = useState<boolean>(false);

  const activeRate = PAYPAL_RATES[rateType] || PAYPAL_RATES.domestic;
  const currSym = CURRENCY_SYMBOLS[currency] || '$';

  // Math calculation
  // Forward: Enter Invoiced/Sent Amount -> calculate Fee & Net Received
  // Fee = (Amount * (percent / 100)) + fixed
  // Net = Amount - Fee
  //
  // Reverse: Enter Net Target -> calculate How much to Invoice
  // Target = Invoice - (Invoice * (percent / 100) + fixed)
  // Target = Invoice * (1 - percent / 100) - fixed
  // Invoice = (Target + fixed) / (1 - percent / 100)

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

    // Stripe comparison (Domestic: 2.9% + 0.30, International: 4.4% + 0.30)
    const stripeP = rateType === 'international' ? 0.044 : 0.029;
    const stripeF = 0.30;
    const stripeFee = grossVal > 0 ? grossVal * stripeP + stripeF : 0;
    const stripeNet = Math.max(0, grossVal - stripeFee);
    const stripeSaving = stripeNet - netVal;

    return {
      gross: grossVal,
      fee: feeVal,
      net: netVal,
      effectiveFeePct: effective,
      stripeComparison: {
        stripeFee,
        stripeNet,
        stripeSaving,
      },
    };
  }, [amount, calcMode, activeRate, rateType]);

  const handleCopy = () => {
    const text = `SmartRate PayPal Calculation (${currency}):\nInvoiced Amount: ${currSym}${gross.toFixed(2)}\nPayPal Fee (${activeRate.name}): -${currSym}${fee.toFixed(2)} (${effectiveFeePct.toFixed(2)}%)\nNet Take-Home: ${currSym}${net.toFixed(2)}\nStripe Alternative Savings: +${currSym}${stripeComparison.stripeSaving.toFixed(2)}\nCalculated via SmartRateCalcs.com/paypal-fee-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-md">
      {/* Top Banner / Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-xl">
            <i className="fa-brands fa-paypal"></i>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-extrabold text-slate-900 text-lg sm:text-xl">
                PayPal Fee Calculator (2026 Live Rates)
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold font-mono">
                Verified Rates
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Calculate exact merchant deductions or reverse-calculate invoice amounts.
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
            I am receiving money
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
                {calcMode === 'forward' ? 'Payment Amount (You Receive)' : 'Net Target In Pocket (You Want)'}
              </label>
              <span className="text-xs font-mono font-bold text-blue-600">
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
                className="w-full pl-9 pr-24 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-xl font-bold font-mono text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
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
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {currSym}{val}
                </button>
              ))}
            </div>
          </div>

          {/* Transaction Type Radio Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              PayPal Transaction Type
            </label>
            <div className="space-y-2">
              {Object.entries(PAYPAL_RATES).map(([key, item]) => (
                <label
                  key={key}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    rateType === key
                      ? 'bg-blue-50/50 border-blue-400 ring-1 ring-blue-400'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="rateType"
                    checked={rateType === key}
                    onChange={() => setRateType(key)}
                    className="mt-1 accent-blue-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{item.name}</span>
                      <span className="text-xs font-mono font-bold text-blue-700">
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

        {/* Right Column: Live Calculation Breakdown Result */}
        <div className="md:col-span-6 flex flex-col justify-between">
          <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {calcMode === 'forward' ? 'Net Payout in Your Account' : 'Required Invoice Amount'}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {calcMode === 'forward' ? 'Take-Home' : 'Ask Client To Send'}
              </span>
            </div>

            <div className="py-2">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 tracking-tight">
                {currSym}
                {calcMode === 'forward' ? net.toFixed(2) : gross.toFixed(2)}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {calcMode === 'forward'
                  ? `From an original customer payment of ${currSym}${gross.toFixed(2)}`
                  : `Invoice your client this amount so you receive exactly ${currSym}${net.toFixed(2)}`}
              </p>
            </div>

            {/* Deductions Breakdown */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>Gross Payment:</span>
                <span className="font-mono font-bold text-white">{currSym}{gross.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-rose-300">
                <span>PayPal Fee ({activeRate.percent}% + {currSym}{activeRate.fixed.toFixed(2)}):</span>
                <span className="font-mono font-bold">-{currSym}{fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Effective Fee Percentage:</span>
                <span className="font-mono font-bold text-amber-300">{effectiveFeePct.toFixed(2)}%</span>
              </div>
            </div>

            {/* Stripe Comparison Banner */}
            <div className="pt-3 border-t border-slate-800">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                    <i className="fa-brands fa-stripe text-indigo-400 text-sm"></i>
                    <span>Stripe Alternative:</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Stripe Fee: {currSym}{stripeComparison.stripeFee.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold font-mono ${
                    stripeComparison.stripeSaving > 0 ? 'text-emerald-400' : 'text-slate-300'
                  }`}>
                    {stripeComparison.stripeSaving > 0 ? `+${currSym}${stripeComparison.stripeSaving.toFixed(2)} Saved` : 'Identical'}
                  </span>
                  <p className="text-[10px] text-slate-400">with Stripe</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <i className={`fa-solid ${copied ? 'fa-check text-emerald-300' : 'fa-copy'}`}></i>
                <span>{copied ? 'Calculation Copied!' : 'Copy Fee Summary'}</span>
              </button>

              {!isStandalone && (
                <Link
                  href="/paypal-fee-calculator"
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
