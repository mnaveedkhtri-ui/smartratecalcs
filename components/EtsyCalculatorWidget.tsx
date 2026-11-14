'use client';

import React, { useState, useId } from 'react';

type OffsiteAdOption = 'none' | 'optional15' | 'mandatory12';

export default function EtsyCalculatorWidget() {
  const [itemPrice, setItemPrice] = useState<number>(35);
  const [shippingCharged, setShippingCharged] = useState<number>(5);
  const [itemCost, setItemCost] = useState<number>(8);
  const [shippingCost, setShippingCost] = useState<number>(4.5);
  const [offsiteAds, setOffsiteAds] = useState<OffsiteAdOption>('none');
  const [isEtsyPlus, setIsEtsyPlus] = useState<boolean>(false);
  const [country, setCountry] = useState<'US' | 'UK' | 'CA' | 'EU'>('US');
  const [copied, setCopied] = useState(false);

  // Reverse Calculator state
  const [reverseGoal, setReverseGoal] = useState<number>(25);

  const priceInputId = useId();
  const shippingChargedInputId = useId();
  const itemCostInputId = useId();
  const shippingCostInputId = useId();

  // Calculations
  const grossRevenue = (itemPrice || 0) + (shippingCharged || 0);

  // 1. Listing Fee ($0.20 USD)
  const listingFee = 0.20;

  // 2. Transaction Fee (6.5% on item price + shipping charged to buyer)
  const transactionFeeRate = 0.065;
  const transactionFee = grossRevenue * transactionFeeRate;

  // 3. Payment Processing Fee (US: 3% + $0.25; UK: 4% + 0.20 GBP; CA: 3-4% + $0.25)
  let paymentPercent = 0.03;
  let paymentFixed = 0.25;
  let regulatoryPercent = 0;

  if (country === 'UK') {
    paymentPercent = 0.04;
    paymentFixed = 0.25; // standardized USD equivalent
    regulatoryPercent = 0.0032; // 0.32% UK regulatory fee
  } else if (country === 'CA') {
    paymentPercent = 0.035;
    paymentFixed = 0.25;
    regulatoryPercent = 0.0115; // 1.15% Canada regulatory fee
  } else if (country === 'EU') {
    paymentPercent = 0.04;
    paymentFixed = 0.30;
    regulatoryPercent = 0.004; // 0.4% France/Spain
  }

  const paymentProcessingFee = grossRevenue > 0 ? (grossRevenue * paymentPercent) + paymentFixed : 0;
  const regulatoryFee = grossRevenue * regulatoryPercent;

  // 4. Offsite Ads Fee
  let offsiteAdsRate = 0;
  if (offsiteAds === 'optional15') offsiteAdsRate = 0.15;
  if (offsiteAds === 'mandatory12') offsiteAdsRate = 0.12;
  const offsiteAdsFee = grossRevenue * offsiteAdsRate;

  // Total Etsy Fees
  const totalEtsyFees = grossRevenue > 0 
    ? listingFee + transactionFee + paymentProcessingFee + offsiteAdsFee + regulatoryFee 
    : 0;

  const effectiveFeePercentage = grossRevenue > 0 ? (totalEtsyFees / grossRevenue) * 100 : 0;

  // Seller Total Costs (COGS + Shipping paid by seller + Etsy fees)
  const cogsTotal = (itemCost || 0) + (shippingCost || 0);
  const totalExpenses = cogsTotal + totalEtsyFees;

  // Net Profit & Margins
  const netProfit = grossRevenue - totalExpenses;
  const profitMargin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;
  const returnOnInvestment = cogsTotal > 0 ? (netProfit / cogsTotal) * 100 : 0;

  // Break-even Sale Price (Assuming same shipping charged and costs)
  // Revenue - (listingFee + 0.25 + Revenue * (0.065 + paymentPercent + offsiteAdsRate + regulatoryPercent)) - cogsTotal = 0
  const combinedFeePercent = transactionFeeRate + paymentPercent + offsiteAdsRate + regulatoryPercent;
  const fixedFees = listingFee + paymentFixed;
  const breakEvenGross = (combinedFeePercent < 1) 
    ? (cogsTotal + fixedFees) / (1 - combinedFeePercent)
    : 0;
  const breakEvenItemPrice = Math.max(0, breakEvenGross - (shippingCharged || 0));

  // Reverse Solver: Price needed to achieve reverseGoal net profit
  // netProfit = Revenue * (1 - combinedFeePercent) - fixedFees - cogsTotal = reverseGoal
  const targetGrossNeeded = (combinedFeePercent < 1)
    ? (reverseGoal + cogsTotal + fixedFees) / (1 - combinedFeePercent)
    : 0;
  const targetItemPriceNeeded = Math.max(0, targetGrossNeeded - (shippingCharged || 0));

  const handleCopy = () => {
    const text = `Etsy Fee & Profit Breakdown (2026 Model):
Listing Price: $${(itemPrice || 0).toFixed(2)}
Shipping Charged: $${(shippingCharged || 0).toFixed(2)}
Total Buyer Paid: $${grossRevenue.toFixed(2)}
--------------------------------
Etsy Listing Fee: $${listingFee.toFixed(2)}
Etsy Transaction Fee (6.5%): $${transactionFee.toFixed(2)}
Payment Processing (${(paymentPercent * 100).toFixed(1)}% + $${paymentFixed.toFixed(2)}): $${paymentProcessingFee.toFixed(2)}
Offsite Ads (${(offsiteAdsRate * 100)}%): $${offsiteAdsFee.toFixed(2)}
Total Etsy Take: $${totalEtsyFees.toFixed(2)} (${effectiveFeePercentage.toFixed(2)}%)
--------------------------------
Item Cost (COGS): $${(itemCost || 0).toFixed(2)}
Seller Shipping: $${(shippingCost || 0).toFixed(2)}
Net Take-Home Profit: $${netProfit.toFixed(2)}
Profit Margin: ${profitMargin.toFixed(1)}%
Calculated via SmartRateCalcs: https://www.smartratecalcs.com/calculators/etsy-fee-calculator`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const setPreset = (presetPrice: number, presetShipping: number, presetCost: number, presetPostage: number, presetAds: OffsiteAdOption) => {
    setItemPrice(presetPrice);
    setShippingCharged(presetShipping);
    setItemCost(presetCost);
    setShippingCost(presetPostage);
    setOffsiteAds(presetAds);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/60 text-orange-800 dark:text-orange-300 text-[11px] font-bold mb-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            2026 Etsy Seller Fee Schedule Active
          </div>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
            Etsy Profit, Fee &amp; Break-Even Architect
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Exact deduction modeling: 6.5% transaction, $0.20 listing, 3% + $0.25 processing, and Offsite Ads.
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
          Quick Preset Scenarios
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => setPreset(6, 0, 0, 0, 'none')}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-500 bg-slate-50 dark:bg-slate-800/60 text-left transition-all group"
          >
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400">Digital Printable</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">$6 Item &bull; $0 Ship &bull; $0 Cost</div>
          </button>
          <button
            type="button"
            onClick={() => setPreset(28, 4.5, 6, 4.2, 'none')}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-500 bg-slate-50 dark:bg-slate-800/60 text-left transition-all group"
          >
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400">Handmade Craft</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">$28 Item &bull; $4.50 Ship &bull; $6 COGS</div>
          </button>
          <button
            type="button"
            onClick={() => setPreset(75, 8.5, 22, 8.0, 'optional15')}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-500 bg-slate-50 dark:bg-slate-800/60 text-left transition-all group"
          >
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400">Vintage Item + Ads</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">$75 Item &bull; 15% Offsite Ads</div>
          </button>
          <button
            type="button"
            onClick={() => setPreset(180, 0, 55, 18, 'mandatory12')}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-500 bg-slate-50 dark:bg-slate-800/60 text-left transition-all group"
          >
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400">High-Ticket / Free Ship</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">$180 Free Ship &bull; 12% Ads</div>
          </button>
        </div>
      </div>

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Pricing & Revenue */}
        <div className="space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-black">1</span>
              Listing &amp; Revenue Settings
            </h3>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value as any)}
              className="text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <option value="US">🇺🇸 United States (3% + $0.25)</option>
              <option value="UK">🇬🇧 United Kingdom (4% + £0.20)</option>
              <option value="CA">🇨🇦 Canada (3.5% + $0.25)</option>
              <option value="EU">🇪🇺 Europe (4% + €0.30)</option>
            </select>
          </div>

          <div>
            <label htmlFor={priceInputId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Item Listing Price ($ USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                id={priceInputId}
                type="number"
                min="0"
                step="0.5"
                value={itemPrice || ''}
                onChange={(e) => setItemPrice(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor={shippingChargedInputId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Shipping Charged to Buyer ($ USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                id={shippingChargedInputId}
                type="number"
                min="0"
                step="0.5"
                value={shippingCharged || ''}
                onChange={(e) => setShippingCharged(parseFloat(e.target.value) || 0)}
                placeholder="0.00 (or 0 for Free Shipping)"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 italic">
              Note: Etsy charges 6.5% transaction cut on shipping too.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-orange-50/70 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/40 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-600 dark:text-slate-400">Total Buyer Invoice:</span>
            <span className="font-bold text-orange-900 dark:text-orange-300 text-sm">${grossRevenue.toFixed(2)}</span>
          </div>
        </div>

        {/* Right Column: Costs & Offsite Ads */}
        <div className="space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
          <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px] font-black">2</span>
            Seller COGS &amp; Marketing Layer
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor={itemCostInputId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Item Cost / Materials
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">$</span>
                <input
                  id={itemCostInputId}
                  type="number"
                  min="0"
                  step="0.5"
                  value={itemCost || ''}
                  onChange={(e) => setItemCost(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 font-mono text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor={shippingCostInputId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Postage Cost You Pay
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">$</span>
                <input
                  id={shippingCostInputId}
                  type="number"
                  min="0"
                  step="0.5"
                  value={shippingCost || ''}
                  onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 font-mono text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Etsy Offsite Ads Fee
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setOffsiteAds('none')}
                className={`p-2 rounded-xl text-center text-xs font-bold transition-all ${
                  offsiteAds === 'none'
                    ? 'border-2 border-orange-500 bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300'
                    : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div>No Ads (0%)</div>
                <div className="text-[10px] font-normal text-slate-400 mt-0.5">Organic Sale</div>
              </button>
              <button
                type="button"
                onClick={() => setOffsiteAds('optional15')}
                className={`p-2 rounded-xl text-center text-xs font-bold transition-all ${
                  offsiteAds === 'optional15'
                    ? 'border-2 border-orange-500 bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300'
                    : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div>15% Cut</div>
                <div className="text-[10px] font-normal text-slate-400 mt-0.5">&lt; $10k Sales</div>
              </button>
              <button
                type="button"
                onClick={() => setOffsiteAds('mandatory12')}
                className={`p-2 rounded-xl text-center text-xs font-bold transition-all ${
                  offsiteAds === 'mandatory12'
                    ? 'border-2 border-orange-500 bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300'
                    : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div>12% Cut</div>
                <div className="text-[10px] font-normal text-slate-400 mt-0.5">&gt; $10k Sales</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Results Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Net Profit Card */}
        <div className={`p-5 rounded-2xl border-2 relative overflow-hidden transition-all ${
          netProfit >= 0
            ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500'
            : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-500'
        }`}>
          <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Net Take-Home Profit
          </div>
          <div className={`text-3xl font-extrabold font-mono mt-1 ${
            netProfit >= 0 ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'
          }`}>
            ${netProfit.toFixed(2)}
          </div>
          <div className="text-xs font-bold mt-2 flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-full text-[11px] ${
              netProfit >= 0 ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300'
            }`}>
              {profitMargin.toFixed(1)}% Profit Margin
            </span>
            <span className="text-slate-500 text-[11px]">
              ROI: {returnOnInvestment.toFixed(0)}%
            </span>
          </div>
        </div>

        {/* Total Etsy Fees Card */}
        <div className="p-5 rounded-2xl bg-orange-50/60 dark:bg-orange-950/20 border-2 border-orange-500 relative overflow-hidden">
          <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Total Etsy Platform Cut
          </div>
          <div className="text-3xl font-extrabold font-mono mt-1 text-orange-700 dark:text-orange-300">
            ${totalEtsyFees.toFixed(2)}
          </div>
          <div className="text-xs font-bold text-orange-800 dark:text-orange-300 mt-2 font-mono">
            {effectiveFeePercentage.toFixed(1)}% Effective Commission
          </div>
        </div>

        {/* Break-Even Sale Price */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Break-Even List Price
          </div>
          <div className="text-3xl font-extrabold font-mono mt-1 text-slate-900 dark:text-white">
            ${breakEvenItemPrice.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Zero profit boundary (covers item COGS, shipping &amp; fees).
          </div>
        </div>
      </div>

      {/* Itemized Fee Breakdown Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 font-heading font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Itemized Mathematical Deduction Breakdown
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          <div className="px-4 py-2.5 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400">Total Buyer Gross Payment</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">${grossRevenue.toFixed(2)}</span>
          </div>
          <div className="px-4 py-2.5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30">
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              Listing Fee (Fixed per 4-month cycle)
            </span>
            <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-${listingFee.toFixed(2)}</span>
          </div>
          <div className="px-4 py-2.5 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              Transaction Fee (6.5% on Item + Shipping)
            </span>
            <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-${transactionFee.toFixed(2)}</span>
          </div>
          <div className="px-4 py-2.5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30">
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              Etsy Payments Processing ({(paymentPercent * 100).toFixed(1)}% + ${paymentFixed.toFixed(2)})
            </span>
            <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-${paymentProcessingFee.toFixed(2)}</span>
          </div>
          {offsiteAdsRate > 0 && (
            <div className="px-4 py-2.5 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                Offsite Ads Cut ({(offsiteAdsRate * 100)}% on total)
              </span>
              <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-${offsiteAdsFee.toFixed(2)}</span>
            </div>
          )}
          {regulatoryPercent > 0 && (
            <div className="px-4 py-2.5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30">
              <span className="text-slate-600 dark:text-slate-400">Regulatory Operating Fee ({(regulatoryPercent * 100).toFixed(2)}%)</span>
              <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-${regulatoryFee.toFixed(2)}</span>
            </div>
          )}
          <div className="px-4 py-2.5 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400">Item Production / COGS</span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-300">-${(itemCost || 0).toFixed(2)}</span>
          </div>
          <div className="px-4 py-2.5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30">
            <span className="text-slate-600 dark:text-slate-400">Actual Postage Cost Paid by Seller</span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-300">-${(shippingCost || 0).toFixed(2)}</span>
          </div>
          <div className="px-4 py-3 flex items-center justify-between bg-emerald-50/60 dark:bg-emerald-950/40 text-sm font-bold">
            <span className="text-emerald-950 dark:text-emerald-200">Final Clean Net Take-Home</span>
            <span className="font-mono text-emerald-700 dark:text-emerald-300 text-base">${netProfit.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Reverse Target Profit Solver */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-orange-50/30 dark:from-slate-800/70 dark:to-orange-950/20 border border-orange-200/80 dark:border-orange-800/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-bullseye text-orange-500"></i>
              Reverse Target Price Solver
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Specify how much net profit you want to pocket, and calculate the exact listing price required.
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
                className="w-full pl-7 pr-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 font-mono text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="text-slate-600 dark:text-slate-400">
            To pocket <strong className="text-emerald-600 dark:text-emerald-400">${reverseGoal.toFixed(2)} net</strong> (keeping shipping at ${(shippingCharged || 0).toFixed(2)} and COGS at ${cogsTotal.toFixed(2)}):
          </span>
          <div className="font-mono font-bold text-sm sm:text-base text-orange-700 dark:text-orange-300 px-3 py-1 rounded-xl bg-orange-100/70 dark:bg-orange-950/60 border border-orange-300 dark:border-orange-800">
            Set Listing Price to: ${targetItemPriceNeeded.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
