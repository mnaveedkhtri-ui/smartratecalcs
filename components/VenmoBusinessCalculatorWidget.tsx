'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

type VenmoPaymentChannel = 'business_p2p' | 'tap_to_pay' | 'online_checkout';

export default function VenmoBusinessCalculatorWidget({ isStandalone = false }: { isStandalone?: boolean }) {
  const [mode, setMode] = useState<'forward' | 'reverse'>('forward');
  const [amount, setAmount] = useState<number>(500);
  const [channel, setChannel] = useState<VenmoPaymentChannel>('business_p2p');
  const [instantTransfer, setInstantTransfer] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const channelSpec = useMemo(() => {
    if (channel === 'tap_to_pay') {
      return { label: 'Tap to Pay (Contactless)', rate: 0.0229, fixed: 0.10 };
    }
    if (channel === 'online_checkout') {
      return { label: 'Online / App Checkout', rate: 0.0349, fixed: 0.49 };
    }
    return { label: 'Business Profile / Goods & Services', rate: 0.019, fixed: 0.10 };
  }, [channel]);

  const calc = useMemo(() => {
    const val = Math.max(0, amount);
    const { rate, fixed } = channelSpec;

    // Forward: Payment Received -> Net After Venmo Fee -> Optional Instant Transfer (1.75%, $0.25 min, $25 cap)
    const processingFee = val === 0 ? 0 : val * rate + fixed;
    const netAfterVenmo = Math.max(0, val - processingFee);
    const instantFee =
      instantTransfer && netAfterVenmo > 0
        ? Math.min(25, Math.max(0.25, netAfterVenmo * 0.0175))
        : 0;
    const finalBankPayout = Math.max(0, netAfterVenmo - instantFee);
    const effectivePct = val > 0 ? ((processingFee + instantFee) / val) * 100 : 0;

    // Reverse: How much to Request so user clears `val` Net after Venmo processing (and optional instant transfer)
    let requiredAfterVenmo = val;
    if (instantTransfer && val > 0) {
      // Check standard 1.75% vs $25 cap vs $0.25 min
      const candidate = val / (1 - 0.0175);
      const feePart = candidate - val;
      if (feePart >= 25) requiredAfterVenmo = val + 25;
      else if (feePart <= 0.25) requiredAfterVenmo = val + 0.25;
      else requiredAfterVenmo = candidate;
    }
    const reverseGrossToRequest = val === 0 ? 0 : (requiredAfterVenmo + fixed) / (1 - rate);
    const reverseVenmoFee = Math.max(0, reverseGrossToRequest - requiredAfterVenmo);

    // Gateway Comparison at same amount
    const cashAppBizFee = val === 0 ? 0 : val * 0.0275;
    const squareInvFee = val === 0 ? 0 : val * 0.033 + 0.30;
    const paypalGnsFee = val === 0 ? 0 : val * 0.0299 + 0.49;
    const stripeFee = val === 0 ? 0 : val * 0.029 + 0.30;

    return {
      val,
      processingFee,
      netAfterVenmo,
      instantFee,
      finalBankPayout,
      effectivePct,
      reverseGrossToRequest,
      reverseVenmoFee,
      cashAppBizFee,
      squareInvFee,
      paypalGnsFee,
      stripeFee,
    };
  }, [amount, channelSpec, instantTransfer]);

  const handleCopy = () => {
    const text =
      mode === 'forward'
        ? `Venmo Business Fee Breakdown (SmartRateCalcs):\nPayment Received: $${calc.val.toFixed(2)}\nChannel: ${channelSpec.label} (${(channelSpec.rate * 100).toFixed(2)}% + $${channelSpec.fixed.toFixed(2)})\nVenmo Fee: -$${calc.processingFee.toFixed(2)}\n${instantTransfer ? `Instant Bank Transfer (1.75%): -$${calc.instantFee.toFixed(2)}\n` : ''}Net Bank Payout: $${calc.finalBankPayout.toFixed(2)}\nCalculated on: https://www.smartratecalcs.com/calculators/venmo-business-fee-calculator`
        : `Venmo Business Invoice Request (SmartRateCalcs):\nTo receive $${calc.val.toFixed(2)} net after Venmo fees, request: $${calc.reverseGrossToRequest.toFixed(2)} USD.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors duration-200">
      {/* Header */}
      <div className="bg-slate-900 dark:bg-slate-950 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center font-black text-lg shadow-sm">
            <i className="fa-solid fa-money-bill-transfer"></i>
          </div>
          <div>
            <h2 className="text-white font-bold text-sm sm:text-base leading-tight">
              Venmo Business &amp; Goods/Services Fee Engine
            </h2>
            <p className="text-[11px] text-sky-300 font-mono">
              2026 Rates: 1.9% + $0.10 Biz | 2.29% Tap to Pay | 3.49% Online | 1.75% Instant
            </p>
          </div>
        </div>

        <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMode('forward')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'forward' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            Fee &amp; Payout
          </button>
          <button
            type="button"
            onClick={() => setMode('reverse')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'reverse' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            Reverse Request
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-5">
          <div>
            <label htmlFor="venmo-amt" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              {mode === 'forward' ? 'Gross Payment Received ($ USD)' : 'Desired Net Payout ($ USD)'}
            </label>
            <input
              id="venmo-amt"
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
            />
            <div className="flex flex-wrap gap-2 mt-2.5">
              {[50, 150, 500, 1000, 2500].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-sky-900/40 text-slate-700 dark:text-slate-300 transition"
                >
                  ${preset.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
              Select Payment Channel
            </span>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: 'business_p2p' as const, title: 'Business Profile / Goods & Services', rate: '1.9% + $0.10' },
                { id: 'tap_to_pay' as const, title: 'Tap to Pay (iPhone / Android POS)', rate: '2.29% + $0.10' },
                { id: 'online_checkout' as const, title: 'Online / App Checkout Button', rate: '3.49% + $0.49' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setChannel(opt.id)}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition ${
                    channel === opt.id
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{opt.title}</span>
                  <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">{opt.rate}</span>
                </button>
              ))}
            </div>
          </div>

          <label className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2.5 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={instantTransfer}
              onChange={(e) => setInstantTransfer(e.target.checked)}
              className="rounded border-slate-300 text-sky-500 focus:ring-sky-500"
            />
            <span>
              Use <strong>Instant Bank Transfer</strong> (+1.75%, $0.25 min, $25 cap vs $0.00 Standard 1-3 day ACH)
            </span>
          </label>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-5">
          {mode === 'forward' ? (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase text-sky-400 font-bold block">
                    Net Bank Take-Home
                  </span>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400">
                    ${calc.finalBankPayout.toFixed(2)}
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-xs text-slate-400">Effective Drag</div>
                  <div className="text-lg font-bold text-sky-400">{calc.effectivePct.toFixed(2)}%</div>
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Gross Payment Amount:</span>
                  <span className="font-bold text-white">${calc.val.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-rose-300">
                  <span>{channelSpec.label} Fee ({(channelSpec.rate * 100).toFixed(2)}% + ${channelSpec.fixed.toFixed(2)}):</span>
                  <span>-${calc.processingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-amber-300">
                  <span>Instant Bank Withdrawal Fee:</span>
                  <span>{instantTransfer ? `-$${calc.instantFee.toFixed(2)}` : '$0.00 (Standard Free)'}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-950 to-slate-950 text-white border border-sky-500/40 space-y-4">
              <span className="text-[11px] font-mono uppercase text-sky-300 font-bold block">
                Exact Amount to Request on Venmo
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white">
                ${calc.reverseGrossToRequest.toFixed(2)}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Request <strong>${calc.reverseGrossToRequest.toFixed(2)}</strong> so that after Venmo deducts{' '}
                <strong className="text-rose-300">${calc.reverseVenmoFee.toFixed(2)}</strong>
                {instantTransfer ? ` and instant transfer fees` : ''}, exactly{' '}
                <strong className="text-emerald-400">${calc.val.toFixed(2)}</strong> lands cleanly in your account.
              </p>
            </div>
          )}

          {/* Gateway Comparison */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
              US Merchant Fee Comparison on ${calc.val.toFixed(0)} Payment
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-500/40">
                <div className="text-[10px] text-sky-600 dark:text-sky-400 font-bold">Venmo Biz</div>
                <div className="font-bold text-slate-900 dark:text-white">${calc.processingFee.toFixed(2)}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Cash App (2.75%)</div>
                <div className="font-bold text-slate-900 dark:text-white">${calc.cashAppBizFee.toFixed(2)}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">Stripe (2.9%)</div>
                <div className="font-bold text-slate-900 dark:text-white">${calc.stripeFee.toFixed(2)}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">PayPal G&amp;S</div>
                <div className="font-bold text-slate-900 dark:text-white">${calc.paypalGnsFee.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-2"
            >
              <i className={`fa-solid ${copied ? 'fa-check text-emerald-400' : 'fa-copy'}`}></i>
              <span>{copied ? 'Copied!' : mode === 'forward' ? 'Copy Fee Breakdown' : 'Copy Request Amount'}</span>
            </button>

            {!isStandalone && (
              <Link
                href="/blog/venmo-business-profile-fees-2026-tap-to-pay-goods-services-guide"
                className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
              >
                <span>Read 2026 Venmo Business Fee Guide</span>
                <span>&rarr;</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
