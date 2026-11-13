'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export default function DepopCalculatorWidget({ isStandalone = false }: { isStandalone?: boolean }) {
  const [calcMode, setCalcMode] = useState<'forward' | 'reverse'>('forward');
  const [region, setRegion] = useState<'US' | 'UK'>('US');
  const [listingPrice, setListingPrice] = useState<number>(65);
  const [shippingCharged, setShippingCharged] = useState<number>(0); // Buyer pays or free shipping
  const [shippingCost, setShippingCost] = useState<number>(6.50); // What seller actually pays for label
  const [itemCost, setItemCost] = useState<number>(15); // COGS (Thrift/Inventory cost)
  const [isBoosted, setIsBoosted] = useState<boolean>(false);
  const [targetProfit, setTargetProfit] = useState<number>(40);
  const [copied, setCopied] = useState<boolean>(false);

  const currSym = region === 'US' ? '$' : '£';
  const processingPct = region === 'US' ? 0.033 : 0.029; // 3.3% US vs 2.9% UK
  const processingFixed = region === 'US' ? 0.45 : 0.30; // $0.45 US vs £0.30 UK
  const boostPct = 0.08; // 8% Depop Boost fee

  // Forward Calculation
  const forwardCalc = useMemo(() => {
    const totalTransaction = Math.max(0, listingPrice + shippingCharged);
    const depopSellingFee = 0; // 0% Depop seller fee in 2026
    const paymentProcessingFee = totalTransaction > 0
      ? (totalTransaction * processingPct) + processingFixed
      : 0;
    const boostFee = isBoosted ? (listingPrice * boostPct) : 0;
    const totalFees = depopSellingFee + paymentProcessingFee + boostFee;
    const netDeposit = Math.max(0, totalTransaction - totalFees);
    const actualShippingSpend = shippingCost;
    const totalSpend = itemCost + actualShippingSpend;
    const netProfit = Math.max(0, netDeposit - totalSpend);
    const profitMargin = totalTransaction > 0 ? (netProfit / totalTransaction) * 100 : 0;

    // Competitor Comparisons on this same sale amount (Listing Price + Shipping)
    const poshmarkFee = totalTransaction >= 15 ? totalTransaction * 0.20 : 2.95;
    const ebayFee = (totalTransaction * 0.1325) + 0.40;
    const poshmarkSavings = Math.max(0, poshmarkFee - totalFees);
    const ebaySavings = Math.max(0, ebayFee - totalFees);

    return {
      totalTransaction,
      depopSellingFee,
      paymentProcessingFee,
      boostFee,
      totalFees,
      netDeposit,
      netProfit,
      profitMargin,
      poshmarkFee,
      ebayFee,
      poshmarkSavings,
      ebaySavings,
    };
  }, [listingPrice, shippingCharged, shippingCost, itemCost, isBoosted, processingPct, processingFixed]);

  // Reverse Calculation (Find required listing price to pocket targetProfit)
  const reverseCalc = useMemo(() => {
    // Goal: netProfit = totalTransaction - (totalTransaction * processingPct + processingFixed) - (listingPrice * (isBoosted ? 0.08 : 0)) - itemCost - shippingCost
    // Assuming shippingCharged equals actual shippingCost for neutral shipping:
    // If shippingCharged is separate, we solve for listingPrice (L):
    // Target = (L + S_charged) - [(L + S_charged)*P_pct + P_fixed] - [L * B_pct] - ItemCost - S_actual
    // Target + P_fixed + ItemCost + S_actual - S_charged*(1 - P_pct) = L * (1 - P_pct - B_pct)
    const effectiveFeeRate = 1 - processingPct - (isBoosted ? boostPct : 0);
    const fixedOutflows = targetProfit + processingFixed + itemCost + shippingCost - (shippingCharged * (1 - processingPct));
    const requiredListingPrice = effectiveFeeRate > 0 ? Math.max(0, fixedOutflows / effectiveFeeRate) : 0;

    const reverseTotal = requiredListingPrice + shippingCharged;
    const reverseProcessing = (reverseTotal * processingPct) + processingFixed;
    const reverseBoost = isBoosted ? (requiredListingPrice * boostPct) : 0;
    const reverseTotalFees = reverseProcessing + reverseBoost;

    return {
      requiredListingPrice,
      reverseTotal,
      reverseTotalFees,
    };
  }, [targetProfit, shippingCharged, shippingCost, itemCost, isBoosted, processingPct, processingFixed]);

  const handleCopy = () => {
    const text = `SmartRateCalcs Breakdown for Depop Seller Fees (2026):
Mode: ${calcMode === 'forward' ? 'Profit Estimation' : 'Target Price Calculator'}
Listing Price: ${currSym}${listingPrice.toFixed(2)}
Depop Selling Fee: 0% (${currSym}0.00)
Payment Processing (${(processingPct * 100).toFixed(1)}% + ${currSym}${processingFixed.toFixed(2)}): ${currSym}${forwardCalc.paymentProcessingFee.toFixed(2)}
${isBoosted ? `Boost Feature (8%): ${currSym}${forwardCalc.boostFee.toFixed(2)}\n` : ''}Net Profit In Pocket: ${currSym}${forwardCalc.netProfit.toFixed(2)} (Margin: ${forwardCalc.profitMargin.toFixed(1)}%)
Calculated on: https://www.smartratecalcs.com/depop-fee-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden mb-12 transition-colors duration-200">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 font-mono tracking-wider uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
            Official 2026 Policy &bull; 0% Depop Selling Fee Rule
          </div>
          <h2 className="text-xl sm:text-2xl font-black">Depop Fee &amp; Profit Engine</h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Region Toggle */}
          <div className="bg-slate-800/80 p-1 rounded-xl border border-slate-700 flex text-xs font-mono font-bold">
            <button
              onClick={() => setRegion('US')}
              className={`px-3 py-1 rounded-lg transition-all ${
                region === 'US' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              US ($)
            </button>
            <button
              onClick={() => setRegion('UK')}
              className={`px-3 py-1 rounded-lg transition-all ${
                region === 'UK' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              UK (£)
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5"
            title="Copy fee breakdown"
          >
            <i className={copied ? 'fa-solid fa-check text-emerald-400' : 'fa-regular fa-copy'}></i>
            <span>{copied ? 'Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="bg-slate-100 dark:bg-slate-950 p-2 border-b border-slate-200 dark:border-slate-800 flex">
        <button
          onClick={() => setCalcMode('forward')}
          className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            calcMode === 'forward'
              ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <i className="fa-solid fa-calculator text-rose-500"></i>
          <span>Calculate Net Profit (Standard)</span>
        </button>

        <button
          onClick={() => setCalcMode('reverse')}
          className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            calcMode === 'reverse'
              ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <i className="fa-solid fa-bullseye text-indigo-500"></i>
          <span>Reverse Target Pricing (Goal &rarr; Price)</span>
        </button>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* FORWARD MODE */}
        {calcMode === 'forward' && (
          <div className="space-y-8">
            {/* Input Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 font-mono">
                  Item Listing Price ({currSym}):
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{currSym}</span>
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={listingPrice}
                    onChange={(e) => setListingPrice(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-8 pr-3 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-rose-500 text-slate-900 dark:text-white text-lg font-black outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 font-mono">
                  Shipping Charged to Buyer:
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{currSym}</span>
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={shippingCharged}
                    onChange={(e) => setShippingCharged(Math.max(0, Number(e.target.value)))}
                    placeholder="0 (Free Shipping)"
                    className="w-full pl-8 pr-3 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-rose-500 text-slate-900 dark:text-white text-lg font-black outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 font-mono">
                  Item Original Cost (COGS):
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{currSym}</span>
                  <input
                    type="number"
                    min="0"
                    max="5000"
                    value={itemCost}
                    onChange={(e) => setItemCost(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-8 pr-3 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-rose-500 text-slate-900 dark:text-white text-lg font-black outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 font-mono">
                  Actual Shipping Cost:
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{currSym}</span>
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={shippingCost}
                    onChange={(e) => setShippingCost(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-8 pr-3 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-rose-500 text-slate-900 dark:text-white text-lg font-black outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Boost Toggle Banner */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-lg shrink-0">
                  <i className="fa-solid fa-rocket"></i>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Did you Boost this listing? (+8% Fee)
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Depop charges an additional 8% only if the item sells via a boosted tile within 28 days.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsBoosted(!isBoosted)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                  isBoosted
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600'
                }`}
              >
                <span>{isBoosted ? 'Boost Active (8% Enabled)' : 'No Boost (0%)'}</span>
                <i className={`fa-solid ${isBoosted ? 'fa-toggle-on text-sm' : 'fa-toggle-off text-sm'}`}></i>
              </button>
            </div>

            {/* Result Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Box 1: 0% Depop Commission */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
                <div className="text-xs text-emerald-800 dark:text-emerald-300 font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Depop Selling Fee</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-mono text-[10px]">0% Fee</span>
                </div>
                <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                  {currSym}0.00
                </div>
                <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 mt-1">
                  100% free seller commission in 2026.
                </p>
              </div>

              {/* Box 2: Payment Processing Fee */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">
                  Payment Processing
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {currSym}{forwardCalc.paymentProcessingFee.toFixed(2)}
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-mono">
                  {(processingPct * 100).toFixed(1)}% + {currSym}{processingFixed.toFixed(2)} on total order
                </p>
              </div>

              {/* Box 3: Total Deductions */}
              <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
                <div className="text-xs text-amber-900 dark:text-amber-300 font-bold uppercase tracking-wider mb-1">
                  Total Depop Take
                </div>
                <div className="text-2xl font-black text-amber-700 dark:text-amber-400">
                  {currSym}{forwardCalc.totalFees.toFixed(2)}
                </div>
                <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80 mt-1 font-mono">
                  {isBoosted ? `Includes ${currSym}${forwardCalc.boostFee.toFixed(2)} (8% Boost)` : 'No boost deductions'}
                </p>
              </div>

              {/* Box 4: Net In-Pocket Profit (Hero) */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50 to-emerald-50 dark:from-slate-800 dark:to-emerald-950/40 border-2 border-emerald-500 shadow-md">
                <div className="text-xs text-emerald-800 dark:text-emerald-300 font-black uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Net Take-Home Profit
                </div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">
                  {currSym}{forwardCalc.netProfit.toFixed(2)}
                </div>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold mt-1 font-mono">
                  Net Margin: {forwardCalc.profitMargin.toFixed(1)}% | Depop Deposit: {currSym}{forwardCalc.netDeposit.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Savings Comparison Callout (Depop vs Poshmark vs eBay) */}
            <div className="p-5 rounded-2xl bg-slate-900 dark:bg-slate-950 text-white border border-slate-800 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs text-rose-400 font-mono font-bold uppercase tracking-wider">
                    Marketplace Fee Comparison (Same {currSym}{forwardCalc.totalTransaction.toFixed(2)} Order)
                  </div>
                  <div className="text-sm text-slate-200">
                    Selling on Depop saves you <strong className="text-emerald-400">{currSym}{forwardCalc.poshmarkSavings.toFixed(2)}</strong> vs Poshmark (20% fee) and <strong className="text-emerald-400">{currSym}{forwardCalc.ebaySavings.toFixed(2)}</strong> vs eBay (13.25%).
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href="/calculators/poshmark-seller-fee-calculator"
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors"
                  >
                    Poshmark Calc &rarr;
                  </Link>
                  <Link
                    href="/calculators/ebay-seller-fee-and-profit-calculator"
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors"
                  >
                    eBay Calc &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REVERSE MODE */}
        {calcMode === 'reverse' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 font-mono">
                  Desired Net Profit Goal ({currSym}):
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{currSym}</span>
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={targetProfit}
                    onChange={(e) => setTargetProfit(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-8 pr-3 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-900/60 focus:border-indigo-500 text-slate-900 dark:text-white text-lg font-black outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 font-mono">
                  Item Cost (COGS):
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{currSym}</span>
                  <input
                    type="number"
                    min="0"
                    max="5000"
                    value={itemCost}
                    onChange={(e) => setItemCost(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-8 pr-3 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-indigo-500 text-slate-900 dark:text-white text-lg font-black outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 font-mono">
                  Actual Shipping Label Cost:
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{currSym}</span>
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={shippingCost}
                    onChange={(e) => setShippingCost(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-8 pr-3 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-indigo-500 text-slate-900 dark:text-white text-lg font-black outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Reverse Hero Card */}
            <div className="p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border-2 border-indigo-500 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="text-xs text-indigo-900 dark:text-indigo-300 font-bold uppercase tracking-wider font-mono mb-1">
                  Required Depop Listing Price
                </div>
                <div className="text-3xl sm:text-4xl font-black text-indigo-950 dark:text-white">
                  {currSym}{reverseCalc.requiredListingPrice.toFixed(2)}
                </div>
                <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-1">
                  List at this exact price to walk away with <strong className="underline">{currSym}{targetProfit.toFixed(2)}</strong> clear profit after all fees and inventory costs.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900 text-xs space-y-1 shrink-0 font-mono">
                <div className="text-slate-500">Total Buyer Total: <span className="text-slate-900 dark:text-white font-bold">{currSym}{reverseCalc.reverseTotal.toFixed(2)}</span></div>
                <div className="text-slate-500">Depop Processing: <span className="text-rose-600 font-bold">-{currSym}{reverseCalc.reverseTotalFees.toFixed(2)}</span></div>
                <div className="text-slate-500">Item Cost: <span className="text-slate-800 dark:text-slate-200 font-bold">-{currSym}{itemCost.toFixed(2)}</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
