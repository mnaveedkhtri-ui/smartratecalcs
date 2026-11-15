'use client';

import React, { useState, useId } from 'react';

export default function WhatnotCalculatorWidget() {
  const [salePrice, setSalePrice] = useState<number>(45);
  const [shippingCharged, setShippingCharged] = useState<number>(6);
  const [itemCost, setItemCost] = useState<number>(12);
  const [shippingCost, setShippingCost] = useState<number>(5.5);
  const [tips, setTips] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Reverse Calculator state
  const [reverseGoal, setReverseGoal] = useState<number>(30);

  const salePriceId = useId();
  const shippingChargedId = useId();
  const itemCostId = useId();
  const shippingCostId = useId();
  const tipsId = useId();

  // Math Calculations (2026 Whatnot Official Rules)
  // 1. Base order subject to 8% commission (Sale Price + Buyer Shipping)
  const commissionableTotal = (salePrice || 0) + (shippingCharged || 0);
  const commissionFee = commissionableTotal * 0.08;

  // 2. Payment processing fee: 2.9% + $0.30 on entire transaction (including tips)
  const grossTransactionTotal = commissionableTotal + (tips || 0);
  const paymentProcessingFee = grossTransactionTotal > 0 ? (grossTransactionTotal * 0.029) + 0.30 : 0;

  // Total Whatnot Platform Cut
  const totalWhatnotFees = grossTransactionTotal > 0 ? commissionFee + paymentProcessingFee : 0;
  const effectiveFeePercentage = grossTransactionTotal > 0 ? (totalWhatnotFees / grossTransactionTotal) * 100 : 0;

  // Seller Costs (COGS + Postage paid by seller + Whatnot fees)
  const sellerExpenses = (itemCost || 0) + (shippingCost || 0);
  const totalCostBasis = sellerExpenses + totalWhatnotFees;

  // Net Profit & Margins
  const netTakeHome = grossTransactionTotal - totalCostBasis;
  const profitMargin = grossTransactionTotal > 0 ? (netTakeHome / grossTransactionTotal) * 100 : 0;
  const returnOnInvestment = sellerExpenses > 0 ? (netTakeHome / sellerExpenses) * 100 : 0;

  // Break-Even Sale Price
  // SalePrice + ShippingCharged - (0.08*(SalePrice+ShippingCharged) + 0.029*(SalePrice+ShippingCharged) + 0.30) - sellerExpenses = 0
  // Combined rate = 0.08 + 0.029 = 0.109 (10.9%)
  const combinedRate = 0.109;
  const fixedProcessing = 0.30;
  const breakEvenGross = (sellerExpenses + fixedProcessing) / (1 - combinedRate);
  const breakEvenPrice = Math.max(0, breakEvenGross - (shippingCharged || 0));

  // Reverse Solver: Set price needed to achieve target net profit
  // targetNet = Gross*(1 - combinedRate) - fixedProcessing - sellerExpenses
  const targetGrossNeeded = (reverseGoal + sellerExpenses + fixedProcessing) / (1 - combinedRate);
  const targetPriceNeeded = Math.max(0, targetGrossNeeded - (shippingCharged || 0));

  const handleCopy = () => {
    const text = `Whatnot Fee & Net Profit Breakdown (2026 Model):
Sale Price: $${(salePrice || 0).toFixed(2)}
Buyer Shipping: $${(shippingCharged || 0).toFixed(2)}
Tips Received: $${(tips || 0).toFixed(2)}
Gross Total: $${grossTransactionTotal.toFixed(2)}
--------------------------------
Whatnot 8% Commission: -$${commissionFee.toFixed(2)}
Payment Processing (2.9% + $0.30): -$${paymentProcessingFee.toFixed(2)}
Total Whatnot Cut: -$${totalWhatnotFees.toFixed(2)} (${effectiveFeePercentage.toFixed(2)}%)
--------------------------------
Item Cost (COGS): -$${(itemCost || 0).toFixed(2)}
Seller Postage Cost: -$${(shippingCost || 0).toFixed(2)}
Clean Net Take-Home: $${netTakeHome.toFixed(2)}
Profit Margin: ${profitMargin.toFixed(1)}%
Calculated via SmartRateCalcs: https://www.smartratecalcs.com/calculators/whatnot-fee-calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const setPreset = (price: number, shipCharge: number, cost: number, postage: number, tipVal: number) => {
    setSalePrice(price);
    setShippingCharged(shipCharge);
    setItemCost(cost);
    setShippingCost(postage);
    setTips(tipVal);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-[11px] font-bold mb-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            2026 Official Whatnot Fee Structure (8% Commission + 2.9% + $0.30)
          </div>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
            Whatnot Seller Commission &amp; Profit Architect
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time live stream profit engine: 8% platform cut on item + shipping, payment processing, and tips breakdown.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
          >
            <i className="fa-regular fa-copy text-xs"></i>
            <span>{copied ? 'Copied Report!' : 'Copy Summary'}</span>
          </button>
        </div>
      </div>

      {/* Preset Profiles */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
          Stream Category Quick Presets
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => setPreset(12, 4.25, 4.5, 4.0, 2)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 bg-slate-50 dark:bg-slate-800/60 text-left transition-all group"
          >
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400">Pokemon / TCG Pack</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">$12 Sale &bull; $4.50 COGS &bull; $2 Tip</div>
          </button>
          <button
            type="button"
            onClick={() => setPreset(48, 6.5, 12, 6.0, 0)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 bg-slate-50 dark:bg-slate-800/60 text-left transition-all group"
          >
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400">Vintage Apparel</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">$48 Sale &bull; $12 Thrift &bull; $6 Ship</div>
          </button>
          <button
            type="button"
            onClick={() => setPreset(210, 14, 115, 13, 5)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 bg-slate-50 dark:bg-slate-800/60 text-left transition-all group"
          >
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400">Sneakers / Grail</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">$210 Sale &bull; $115 Cost &bull; $5 Tip</div>
          </button>
          <button
            type="button"
            onClick={() => setPreset(5, 3.8, 1, 3.5, 0)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 bg-slate-50 dark:bg-slate-800/60 text-left transition-all group"
          >
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400">Dollar Start Auction</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">$5 Sale &bull; Low Margin Test</div>
          </button>
        </div>
      </div>

      {/* Main Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Live Sale & Revenue */}
        <div className="space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
          <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[10px] font-black">1</span>
            Live Stream Sale &amp; Revenue
          </h3>

          <div>
            <label htmlFor={salePriceId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Item Final Hammer / Buy-It-Now Price ($ USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                id={salePriceId}
                type="number"
                min="0"
                step="0.5"
                value={salePrice || ''}
                onChange={(e) => setSalePrice(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor={shippingChargedId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Shipping Charged to Buyer ($ USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                id={shippingChargedId}
                type="number"
                min="0"
                step="0.5"
                value={shippingCharged || ''}
                onChange={(e) => setShippingCharged(parseFloat(e.target.value) || 0)}
                placeholder="0.00 (or 0 for Free Shipping)"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 italic">
              Crucial: Whatnot applies the 8.0% commission to shipping too.
            </p>
          </div>

          <div>
            <label htmlFor={tipsId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Live Stream Tips Received ($ USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                id={tipsId}
                type="number"
                min="0"
                step="1"
                value={tips || ''}
                onChange={(e) => setTips(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 font-mono text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
              Pro Tip: Whatnot takes 0% commission on tips (only 2.9% + $0.30 processing applies).
            </p>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-600 dark:text-slate-400">Total Buyer Gross Charge:</span>
            <span className="font-bold text-amber-900 dark:text-amber-300 text-sm">${grossTransactionTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Right Column: Costs & COGS */}
        <div className="space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
          <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px] font-black">2</span>
            Seller Cost of Goods &amp; Postage
          </h3>

          <div>
            <label htmlFor={itemCostId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Item Cost / Inventory Purchase (COGS)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                id={itemCostId}
                type="number"
                min="0"
                step="0.5"
                value={itemCost || ''}
                onChange={(e) => setItemCost(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor={shippingCostId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Actual Postage / Packaging Paid by You
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                id={shippingCostId}
                type="number"
                min="0"
                step="0.5"
                value={shippingCost || ''}
                onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 italic">
              Bubble mailer, top loader, box, or shipping label cost.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
            <div className="font-bold text-slate-700 dark:text-slate-300">The 10.9% Rule on Whatnot:</div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
              8% commission plus 2.9% payment processing equals <strong>10.9% + $0.30</strong>. On every $100 sold on stream, Whatnot keeps approx $11.20.
            </p>
          </div>
        </div>
      </div>

      {/* Main Results Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Net Take-Home Profit */}
        <div className={`p-5 rounded-2xl border-2 relative overflow-hidden transition-all ${
          netTakeHome >= 0
            ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500'
            : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-500'
        }`}>
          <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Net Take-Home Profit
          </div>
          <div className={`text-3xl font-extrabold font-mono mt-1 ${
            netTakeHome >= 0 ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'
          }`}>
            ${netTakeHome.toFixed(2)}
          </div>
          <div className="text-xs font-bold mt-2 flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-full text-[11px] ${
              netTakeHome >= 0 ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300'
            }`}>
              {profitMargin.toFixed(1)}% Profit Margin
            </span>
            <span className="text-slate-500 text-[11px]">
              ROI: {returnOnInvestment.toFixed(0)}%
            </span>
          </div>
        </div>

        {/* Total Whatnot Platform Cut */}
        <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border-2 border-amber-500 relative overflow-hidden">
          <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Total Whatnot Platform Cut
          </div>
          <div className="text-3xl font-extrabold font-mono mt-1 text-amber-700 dark:text-amber-300">
            ${totalWhatnotFees.toFixed(2)}
          </div>
          <div className="text-xs font-bold text-amber-800 dark:text-amber-300 mt-2 font-mono">
            {effectiveFeePercentage.toFixed(1)}% Effective Take-Rate
          </div>
        </div>

        {/* Break-Even Hammer Price */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Break-Even Hammer Price
          </div>
          <div className="text-3xl font-extrabold font-mono mt-1 text-slate-900 dark:text-white">
            ${breakEvenPrice.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Minimum bid to avoid losing money after all fees and item costs.
          </div>
        </div>
      </div>

      {/* Itemized Deduction Breakdown Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 font-heading font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Itemized Whatnot Deduction Math
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          <div className="px-4 py-2.5 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400">Total Buyer Gross Payment (Items + Shipping + Tips)</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">${grossTransactionTotal.toFixed(2)}</span>
          </div>
          <div className="px-4 py-2.5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30">
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Whatnot Commission (8.0% on Item + Shipping)
            </span>
            <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-${commissionFee.toFixed(2)}</span>
          </div>
          <div className="px-4 py-2.5 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Payment Processing Fee (2.9% + $0.30 on Gross)
            </span>
            <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-${paymentProcessingFee.toFixed(2)}</span>
          </div>
          <div className="px-4 py-2.5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30">
            <span className="text-slate-600 dark:text-slate-400">Item Cost of Goods Sold (COGS)</span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-300">-${(itemCost || 0).toFixed(2)}</span>
          </div>
          <div className="px-4 py-2.5 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400">Actual Packaging &amp; Postage Paid by Seller</span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-300">-${(shippingCost || 0).toFixed(2)}</span>
          </div>
          <div className="px-4 py-3 flex items-center justify-between bg-emerald-50/60 dark:bg-emerald-950/40 text-sm font-bold">
            <span className="text-emerald-950 dark:text-emerald-200">Final Clean Net Take-Home Payout</span>
            <span className="font-mono text-emerald-700 dark:text-emerald-300 text-base">${netTakeHome.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Reverse Target Profit Solver */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-amber-50/30 dark:from-slate-800/70 dark:to-amber-950/20 border border-amber-200/80 dark:border-amber-800/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-bullseye text-amber-500"></i>
              Reverse Target Hammer Price Solver
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Specify your target net cash profit, and calculate the exact minimum stream bid required.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Target Profit:</span>
            <div className="relative w-28">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">$</span>
              <input
                type="number"
                min="1"
                step="5"
                value={reverseGoal || ''}
                onChange={(e) => setReverseGoal(parseFloat(e.target.value) || 0)}
                className="w-full pl-7 pr-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 font-mono text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="text-slate-600 dark:text-slate-400">
            To pocket <strong className="text-emerald-600 dark:text-emerald-400">${reverseGoal.toFixed(2)} clean profit</strong> (with ${(shippingCharged || 0).toFixed(2)} buyer shipping and ${sellerExpenses.toFixed(2)} total costs):
          </span>
          <div className="font-mono font-bold text-sm sm:text-base text-amber-800 dark:text-amber-300 px-3 py-1 rounded-xl bg-amber-100/70 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800">
            Set Starting / Hammer Bid to: ${targetPriceNeeded.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
