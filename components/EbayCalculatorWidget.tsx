'use client';

import React, { useState, useMemo, useId } from 'react';
import Link from 'next/link';

export type EbayCategory =
  | 'standard' // 13.25% up to $7,500, 2.35% over
  | 'books_music' // 14.95% up to $7,500, 2.35% over
  | 'guitars' // 6.35% up to $7,500, 2.35% over
  | 'sneakers_over_150' // 8% over $150
  | 'sneakers_under_150' // 13.25% under $150
  | 'jewelry_watches' // 15% up to $1,000, 9% up to $7,500, 2.35% over
  | 'electronics' // 13.25% standard, 9.0% store up to $2,500
  | 'bullion_coins' // 13.25% up to $7,500, 7% over
  | 'heavy_equipment'; // 3% capped at $250

export default function EbayCalculatorWidget({ isStandalone = false }: { isStandalone?: boolean }) {
  const [calcMode, setCalcMode] = useState<'forward' | 'reverse'>('forward');
  const [region, setRegion] = useState<'US' | 'UK'>('US');
  const [sellerTypeUK, setSellerTypeUK] = useState<'private' | 'business'>('business');
  
  // Inputs
  const [soldPrice, setSoldPrice] = useState<number>(85);
  const [shippingCharged, setShippingCharged] = useState<number>(0); // Charged to buyer
  const [itemCost, setItemCost] = useState<number>(22); // Acquisition cost (COGS)
  const [shippingCost, setShippingCost] = useState<number>(7.5); // Actual label postage paid by seller
  const [category, setCategory] = useState<EbayCategory>('standard');
  const [hasStore, setHasStore] = useState<boolean>(false);
  const [isTopRatedPlus, setIsTopRatedPlus] = useState<boolean>(false); // 10% FVF discount
  const [promotedRate, setPromotedRate] = useState<number>(0); // 0% to 25%
  const [isInternational, setIsInternational] = useState<boolean>(false); // 1.65% intl fee
  const [insertionFee, setInsertionFee] = useState<number>(0); // Free 250 listings/mo or $0.35
  
  // Reverse Solver Input (Target Profit)
  const [targetProfit, setTargetProfit] = useState<number>(45);

  const [copied, setCopied] = useState<boolean>(false);

  const soldPriceId = useId();
  const shippingChargedId = useId();
  const itemCostId = useId();
  const shippingCostId = useId();
  const targetProfitId = useId();

  const currSym = region === 'US' ? '$' : '£';

  // Calculate Forward Fees & Profit
  const forwardCalc = useMemo(() => {
    const grossOrder = Math.max(0, soldPrice + shippingCharged);

    let variableRate = 0.1325;
    let threshold1 = 7500;
    let rateTier2 = 0.0235;

    // US Category Fee Logic (2026 Managed Payments)
    if (region === 'US') {
      if (category === 'standard') {
        variableRate = hasStore ? 0.1235 : 0.1325;
        threshold1 = hasStore ? 2500 : 7500;
        rateTier2 = 0.0235;
      } else if (category === 'books_music') {
        variableRate = hasStore ? 0.1325 : 0.1495;
        threshold1 = 7500;
        rateTier2 = 0.0235;
      } else if (category === 'guitars') {
        variableRate = 0.0635;
        threshold1 = 7500;
        rateTier2 = 0.0235;
      } else if (category === 'sneakers_over_150') {
        variableRate = soldPrice >= 150 ? 0.08 : 0.1325;
        threshold1 = 999999;
        rateTier2 = 0.08;
      } else if (category === 'sneakers_under_150') {
        variableRate = 0.1325;
        threshold1 = 7500;
        rateTier2 = 0.0235;
      } else if (category === 'jewelry_watches') {
        // Multi-tiered
        variableRate = 0.15;
      } else if (category === 'electronics') {
        variableRate = hasStore ? 0.09 : 0.1325;
        threshold1 = hasStore ? 2500 : 7500;
        rateTier2 = 0.0235;
      } else if (category === 'bullion_coins') {
        variableRate = 0.1325;
        threshold1 = 7500;
        rateTier2 = 0.07;
      } else if (category === 'heavy_equipment') {
        variableRate = 0.03;
        threshold1 = 999999;
        rateTier2 = 0.03;
      }
    } else {
      // UK Market (2026 Policy)
      if (sellerTypeUK === 'private') {
        // UK Private individual sellers have 0% basic selling fee in 2026
        variableRate = 0.0;
        threshold1 = 999999;
        rateTier2 = 0.0;
      } else {
        // UK Business Sellers: 12.9% standard or 10.9% tech + 0.42% regulatory fee
        variableRate = category === 'electronics' ? 0.109 : 0.129;
        threshold1 = 5000;
        rateTier2 = 0.02;
      }
    }

    // Calculate Final Value Fee (Variable portion)
    let fvfRaw = 0;
    if (grossOrder > 0) {
      if (region === 'US' && category === 'jewelry_watches') {
        // 15% up to $1,000, 9% from $1,000 to $7,500, 2.35% over $7,500
        if (grossOrder <= 1000) {
          fvfRaw = grossOrder * 0.15;
        } else if (grossOrder <= 7500) {
          fvfRaw = 1000 * 0.15 + (grossOrder - 1000) * 0.09;
        } else {
          fvfRaw = 1000 * 0.15 + 6500 * 0.09 + (grossOrder - 7500) * 0.0235;
        }
      } else if (category === 'heavy_equipment') {
        fvfRaw = Math.min(250, grossOrder * 0.03);
      } else {
        if (grossOrder <= threshold1) {
          fvfRaw = grossOrder * variableRate;
        } else {
          fvfRaw = threshold1 * variableRate + (grossOrder - threshold1) * rateTier2;
        }
      }
    }

    // Top Rated Plus 10% discount on FVF variable fee
    const trsDiscount = isTopRatedPlus && region === 'US' && fvfRaw > 0 ? fvfRaw * 0.10 : 0;
    const finalVariableFee = Math.max(0, fvfRaw - trsDiscount);

    // Fixed Per-Order Fee
    let fixedOrderFee = 0;
    if (grossOrder > 0) {
      if (region === 'US') {
        // In 2026: $0.30 standard ($0.40 if total order is $10.00 or less)
        fixedOrderFee = grossOrder <= 10 ? 0.40 : 0.30;
      } else {
        // UK: £0.30 fixed fee for business sellers, £0 for private sellers
        fixedOrderFee = sellerTypeUK === 'business' ? 0.30 : 0;
      }
    }

    // UK Regulatory Operating Fee (0.42% for UK business sellers)
    const ukRegulatoryFee = region === 'UK' && sellerTypeUK === 'business' && grossOrder > 0
      ? grossOrder * 0.0042
      : 0;

    // Promoted Listings Standard Ad Fee (applied to gross order)
    const adFee = grossOrder > 0 && promotedRate > 0 ? grossOrder * (promotedRate / 100) : 0;

    // International Fee (1.65%)
    const intlFee = isInternational && grossOrder > 0 ? grossOrder * 0.0165 : 0;

    // Total eBay Cut
    const totalEbayFees = grossOrder > 0
      ? finalVariableFee + fixedOrderFee + ukRegulatoryFee + adFee + intlFee + insertionFee
      : 0;

    // Net Payout from eBay to Bank Account
    const netPayout = Math.max(0, grossOrder - totalEbayFees);

    // Total Costs (Acquisition cost + actual shipping + packaging)
    const totalCosts = itemCost + shippingCost;

    // Net Take-Home Profit
    const netProfit = grossOrder > 0 ? netPayout - totalCosts : 0;

    // Margins
    const profitMargin = grossOrder > 0 ? (netProfit / grossOrder) * 100 : 0;
    const roi = totalCosts > 0 ? (netProfit / totalCosts) * 100 : 0;
    const effectiveFeeRate = grossOrder > 0 ? (totalEbayFees / grossOrder) * 100 : 0;

    // Break-Even Sold Price (Solve for sold price where netProfit = 0)
    // Revenue = SoldPrice + ShippingCharged
    // Expenses = fvf(Revenue) + fixedFee + adFee(Revenue) + intlFee(Revenue) + itemCost + shippingCost
    // Linear approximation within Tier 1:
    const effectiveVariableRate = (variableRate * (isTopRatedPlus && region === 'US' ? 0.90 : 1.0))
      + (promotedRate / 100)
      + (isInternational ? 0.0165 : 0)
      + (region === 'UK' && sellerTypeUK === 'business' ? 0.0042 : 0);

    const fixedDeductions = (grossOrder <= 10 && region === 'US' ? 0.40 : (region === 'US' ? 0.30 : (sellerTypeUK === 'business' ? 0.30 : 0)))
      + insertionFee + itemCost + shippingCost;

    const denominator = 1 - effectiveVariableRate;
    const breakEvenGross = denominator > 0 ? fixedDeductions / denominator : 0;
    const breakEvenSoldPrice = Math.max(0, breakEvenGross - shippingCharged);

    // Competitor Fee Comparisons on the exact same gross order
    // Mercari: 10% platform fee + $0.50 + 2.9% payment fee = approx 12.9% + $0.50
    const mercariFee = grossOrder > 0 ? (grossOrder * 0.10) + (grossOrder * 0.029) + 0.50 : 0;
    // Poshmark: 20% flat ($2.95 if under $15)
    const poshmarkFee = grossOrder > 0 ? (grossOrder < 15 ? 2.95 : grossOrder * 0.20) : 0;
    // Depop: 0% selling fee + 3.3% + $0.45 processing
    const depopFee = grossOrder > 0 ? (grossOrder * 0.033) + 0.45 : 0;

    return {
      grossOrder,
      finalVariableFee,
      fvfRaw,
      trsDiscount,
      fixedOrderFee,
      ukRegulatoryFee,
      adFee,
      intlFee,
      totalEbayFees,
      effectiveFeeRate,
      netPayout,
      totalCosts,
      netProfit,
      profitMargin,
      roi,
      breakEvenSoldPrice,
      mercariFee,
      poshmarkFee,
      depopFee,
    };
  }, [
    soldPrice,
    shippingCharged,
    itemCost,
    shippingCost,
    category,
    hasStore,
    isTopRatedPlus,
    promotedRate,
    isInternational,
    insertionFee,
    region,
    sellerTypeUK,
  ]);

  // Reverse Solver: Calculate required listing price to pocket targetProfit
  const reverseCalc = useMemo(() => {
    let variableRate = 0.1325;
    if (region === 'US') {
      if (category === 'standard') variableRate = hasStore ? 0.1235 : 0.1325;
      else if (category === 'books_music') variableRate = hasStore ? 0.1325 : 0.1495;
      else if (category === 'guitars') variableRate = 0.0635;
      else if (category === 'sneakers_over_150') variableRate = 0.08;
      else if (category === 'sneakers_under_150') variableRate = 0.1325;
      else if (category === 'jewelry_watches') variableRate = 0.15;
      else if (category === 'electronics') variableRate = hasStore ? 0.09 : 0.1325;
      else if (category === 'bullion_coins') variableRate = 0.1325;
      else if (category === 'heavy_equipment') variableRate = 0.03;
    } else {
      variableRate = sellerTypeUK === 'private' ? 0.0 : (category === 'electronics' ? 0.109 : 0.129);
    }

    const effectiveVariableRate = (variableRate * (isTopRatedPlus && region === 'US' ? 0.90 : 1.0))
      + (promotedRate / 100)
      + (isInternational ? 0.0165 : 0)
      + (region === 'UK' && sellerTypeUK === 'business' ? 0.0042 : 0);

    const estFixed = region === 'US' ? 0.30 : (sellerTypeUK === 'business' ? 0.30 : 0);
    const fixedOutflows = targetProfit + estFixed + insertionFee + itemCost + shippingCost - (shippingCharged * (1 - effectiveVariableRate));
    const denominator = 1 - effectiveVariableRate;
    const requiredSoldPrice = denominator > 0 ? Math.max(0, fixedOutflows / denominator) : 0;
    const reverseGross = requiredSoldPrice + shippingCharged;
    const reverseFees = (reverseGross * effectiveVariableRate) + estFixed + insertionFee;

    return {
      requiredSoldPrice,
      reverseGross,
      reverseFees,
    };
  }, [
    targetProfit,
    shippingCharged,
    itemCost,
    shippingCost,
    category,
    hasStore,
    isTopRatedPlus,
    promotedRate,
    isInternational,
    insertionFee,
    region,
    sellerTypeUK,
  ]);

  const handleCopyBreakdown = () => {
    const text = `SmartRateCalcs Breakdown for eBay Seller Fees (2026):
Mode: ${calcMode === 'forward' ? 'Profit Estimation' : 'Target Price Calculator'}
Market: ${region} (${region === 'US' ? 'Managed Payments' : (sellerTypeUK === 'private' ? 'Private 0% Fee' : 'Business Seller')})
Category: ${category}
Sold Price: ${currSym}${soldPrice.toFixed(2)}
Buyer Shipping: ${currSym}${shippingCharged.toFixed(2)}
Gross Total Order: ${currSym}${forwardCalc.grossOrder.toFixed(2)}
---------------------------------------------
eBay Final Value Fee: ${currSym}${forwardCalc.finalVariableFee.toFixed(2)}${isTopRatedPlus ? ' (Includes 10% TRS+ Discount)' : ''}
Per-Order Fixed Fee: ${currSym}${forwardCalc.fixedOrderFee.toFixed(2)}
${forwardCalc.adFee > 0 ? `Promoted Listings (${promotedRate}%): ${currSym}${forwardCalc.adFee.toFixed(2)}\n` : ''}${forwardCalc.intlFee > 0 ? `International Fee (1.65%): ${currSym}${forwardCalc.intlFee.toFixed(2)}\n` : ''}${forwardCalc.ukRegulatoryFee > 0 ? `UK Regulatory Fee (0.42%): ${currSym}${forwardCalc.ukRegulatoryFee.toFixed(2)}\n` : ''}Total eBay Deductions: ${currSym}${forwardCalc.totalEbayFees.toFixed(2)} (${forwardCalc.effectiveFeeRate.toFixed(2)}%)
---------------------------------------------
Net Payout to Bank: ${currSym}${forwardCalc.netPayout.toFixed(2)}
Total Costs (COGS + Label): ${currSym}${forwardCalc.totalCosts.toFixed(2)}
NET PROFIT: ${currSym}${forwardCalc.netProfit.toFixed(2)} (Margin: ${forwardCalc.profitMargin.toFixed(1)}%, ROI: ${forwardCalc.roi.toFixed(1)}%)
Break-Even Sold Price: ${currSym}${forwardCalc.breakEvenSoldPrice.toFixed(2)}
Calculated on: https://www.smartratecalcs.com/calculators/ebay-fee-calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const setPreset = (price: number, shipping: number, cost: number, postage: number, cat: EbayCategory, ads: number) => {
    setSoldPrice(price);
    setShippingCharged(shipping);
    setItemCost(cost);
    setShippingCost(postage);
    setCategory(cat);
    setPromotedRate(ads);
  };

  // Percentage shares for visual breakdown bar
  const profitPct = forwardCalc.grossOrder > 0 ? Math.max(0, (forwardCalc.netProfit / forwardCalc.grossOrder) * 100) : 0;
  const ebayFeePct = forwardCalc.grossOrder > 0 ? Math.min(100, (forwardCalc.totalEbayFees / forwardCalc.grossOrder) * 100) : 0;
  const itemCostPct = forwardCalc.grossOrder > 0 ? Math.min(100, (itemCost / forwardCalc.grossOrder) * 100) : 0;
  const shippingPct = forwardCalc.grossOrder > 0 ? Math.min(100, (shippingCost / forwardCalc.grossOrder) * 100) : 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden mb-12 transition-colors duration-200">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 font-mono tracking-wider uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Official 2026 eBay Managed Payments &bull; Real-Time Profit Engine
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
            <span>eBay Fee &amp; Profit Calculator</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-600/60 border border-blue-400/30 text-blue-200 uppercase">
              2026 Updated
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* US vs UK Region Switcher */}
          <div className="bg-slate-800/90 p-1 rounded-xl border border-slate-700 flex text-xs font-mono font-bold">
            <button
              onClick={() => setRegion('US')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                region === 'US' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🇺🇸 US ($)</span>
            </button>
            <button
              onClick={() => setRegion('UK')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                region === 'UK' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🇬🇧 UK (£)</span>
            </button>
          </div>

          <button
            onClick={handleCopyBreakdown}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5 text-white"
            title="Copy fee breakdown"
          >
            <i className={copied ? 'fa-solid fa-check text-emerald-400' : 'fa-regular fa-copy'}></i>
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="bg-slate-100 dark:bg-slate-950 p-2 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => setCalcMode('forward')}
          className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            calcMode === 'forward'
              ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <i className="fa-solid fa-calculator text-blue-500"></i>
          <span>Calculate Net Profit &amp; Fees (Standard Mode)</span>
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
          <span>Reverse Calculator (Target Net Profit)</span>
        </button>
      </div>

      {/* Quick Preset Badges */}
      <div className="px-6 py-3 bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
          <i className="fa-solid fa-bolt text-amber-500"></i> Quick Presets:
        </span>
        <button
          onClick={() => setPreset(65, 0, 15, 6.5, 'standard', 0)}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-200 text-[11px] font-medium transition-all"
        >
          Thrift Vintage Jacket ($65)
        </button>
        <button
          onClick={() => setPreset(220, 0, 140, 12, 'sneakers_over_150', 3)}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-200 text-[11px] font-medium transition-all"
        >
          Sneakers &gt;$150 (8% Tier)
        </button>
        <button
          onClick={() => setPreset(480, 15, 290, 18, 'electronics', 2)}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-200 text-[11px] font-medium transition-all"
        >
          Refurbished Laptop ($480)
        </button>
        <button
          onClick={() => setPreset(1200, 35, 750, 40, 'guitars', 0)}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-200 text-[11px] font-medium transition-all"
        >
          Electric Guitar (6.35% Tier)
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Controls & Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* UK Seller Type Switcher (only shown if UK is active) */}
          {region === 'UK' && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
              <div className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <i className="fa-solid fa-circle-info"></i>
                eBay UK 2026 Selling Policy Selection
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setSellerTypeUK('private')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    sellerTypeUK === 'private'
                      ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-amber-200 dark:border-amber-900/40 hover:border-amber-400'
                  }`}
                >
                  <div className="font-extrabold">Private Individual</div>
                  <div className="text-[10px] font-normal opacity-90 mt-0.5">0% Selling Fee (UK 2026 Policy)</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSellerTypeUK('business')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    sellerTypeUK === 'business'
                      ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-amber-200 dark:border-amber-900/40 hover:border-amber-400'
                  }`}
                >
                  <div className="font-extrabold">Business Seller</div>
                  <div className="text-[10px] font-normal opacity-90 mt-0.5">12.9% + £0.30 + 0.42% Reg Fee</div>
                </button>
              </div>
            </div>
          )}

          {/* Pricing Inputs Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <i className="fa-solid fa-tag text-blue-500"></i>
              Sale &amp; Shipping Inputs
            </h3>

            {calcMode === 'forward' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={soldPriceId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Sold Price ({currSym})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{currSym}</span>
                    <input
                      id={soldPriceId}
                      type="number"
                      step="any"
                      min="0"
                      value={soldPrice || ''}
                      onChange={(e) => setSoldPrice(parseFloat(e.target.value) || 0)}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="0.00"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Item listing or final winning bid</p>
                </div>

                <div>
                  <label htmlFor={shippingChargedId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Shipping Charged to Buyer ({currSym})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{currSym}</span>
                    <input
                      id={shippingChargedId}
                      type="number"
                      step="any"
                      min="0"
                      value={shippingCharged || ''}
                      onChange={(e) => setShippingCharged(parseFloat(e.target.value) || 0)}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="0.00"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Enter 0 if offering Free Shipping</p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 space-y-3">
                <label htmlFor={targetProfitId} className="block text-xs font-bold text-indigo-900 dark:text-indigo-200">
                  Desired Net Profit In Your Pocket ({currSym})
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400 font-bold text-lg">{currSym}</span>
                  <input
                    id={targetProfitId}
                    type="number"
                    step="any"
                    min="1"
                    value={targetProfit || ''}
                    onChange={(e) => setTargetProfit(parseFloat(e.target.value) || 0)}
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-300 font-black text-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="40.00"
                  />
                </div>
                <p className="text-[11px] text-indigo-700 dark:text-indigo-300">
                  Our algorithm calculates the exact listing price needed to cover all eBay fees, item cost, and postage.
                </p>
              </div>
            )}

            {/* Product Costs (COGS) & Actual Shipping Outflow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={itemCostId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Item Cost / COGS ({currSym})
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{currSym}</span>
                  <input
                    id={itemCostId}
                    type="number"
                    step="any"
                    min="0"
                    value={itemCost || ''}
                    onChange={(e) => setItemCost(parseFloat(e.target.value) || 0)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="0.00"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">What you paid to acquire inventory</p>
              </div>

              <div>
                <label htmlFor={shippingCostId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Actual Postage &amp; Packaging ({currSym})
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{currSym}</span>
                  <input
                    id={shippingCostId}
                    type="number"
                    step="any"
                    min="0"
                    value={shippingCost || ''}
                    onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="0.00"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">What you pay for shipping label + box</p>
              </div>
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              eBay Product Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as EbayCategory)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="standard">Most Categories (Clothing, Home, Toys, Sports) - 13.25%</option>
              <option value="books_music">Books, DVDs, Movies &amp; Music (excl Vinyl) - 14.95%</option>
              <option value="guitars">Musical Instruments &gt; Guitars &amp; Basses - 6.35%</option>
              <option value="sneakers_over_150">Sneakers &amp; Athletic Shoes ($150+) - 8.0%</option>
              <option value="sneakers_under_150">Sneakers &amp; Athletic Shoes (Under $150) - 13.25%</option>
              <option value="electronics">Computers, Tablets &amp; Tech - 13.25% (9.0% with Store)</option>
              <option value="jewelry_watches">Jewelry &amp; Luxury Watches - 15% / 9% / 2.35%</option>
              <option value="bullion_coins">Coins, Paper Money &amp; Bullion - 13.25% / 7.0%</option>
              <option value="heavy_equipment">Heavy Equipment / Commercial - 3.0% (Capped at $250)</option>
            </select>
          </div>

          {/* Advanced Toggles & Options */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3.5">
            <div className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Seller Status &amp; Add-on Features
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Store Subscription */}
              <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-blue-400 transition-all">
                <input
                  type="checkbox"
                  checked={hasStore}
                  onChange={(e) => setHasStore(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">eBay Store Subscription</div>
                  <div className="text-[10px] text-slate-400">Basic/Premium Store fee tier discounts</div>
                </div>
              </label>

              {/* Top Rated Plus (10% FVF discount) */}
              <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-blue-400 transition-all">
                <input
                  type="checkbox"
                  checked={isTopRatedPlus}
                  onChange={(e) => setIsTopRatedPlus(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">Top Rated Plus (TRS+)</div>
                  <div className="text-[10px] text-slate-400">10% discount on Final Value Fee cut</div>
                </div>
              </label>

              {/* International Sale Fee */}
              <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-blue-400 transition-all">
                <input
                  type="checkbox"
                  checked={isInternational}
                  onChange={(e) => setIsInternational(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">International Buyer (1.65%)</div>
                  <div className="text-[10px] text-slate-400">Cross-border payment conversion</div>
                </div>
              </label>

              {/* Insertion Fee Exceeded */}
              <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-blue-400 transition-all">
                <input
                  type="checkbox"
                  checked={insertionFee > 0}
                  onChange={(e) => setInsertionFee(e.target.checked ? (region === 'US' ? 0.35 : 0.35) : 0)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">Insertion Fee ({currSym}0.35)</div>
                  <div className="text-[10px] text-slate-400">Exceeded 250 free monthly listings</div>
                </div>
              </label>
            </div>

            {/* Promoted Listings Standard Slider */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <i className="fa-solid fa-bullhorn text-indigo-500"></i>
                  Promoted Listings Standard Ad Rate:
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono">
                  {promotedRate}% {promotedRate > 0 ? `(${currSym}${forwardCalc.adFee.toFixed(2)})` : '(Off)'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="0.5"
                value={promotedRate}
                onChange={(e) => setPromotedRate(parseFloat(e.target.value) || 0)}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>0% (Organic)</span>
                <span>5% Recommended</span>
                <span>10% High Push</span>
                <span>20% Aggressive</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Key Results & Financial Breakdown */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          {/* Main Profit Callout Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white shadow-xl border border-blue-900/40 relative overflow-hidden">
            <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>{calcMode === 'forward' ? 'Projected Net Profit' : 'Required Listing Price'}</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-sans font-semibold">
                {region === 'US' ? 'US Managed Payments' : (sellerTypeUK === 'private' ? 'UK Private (0% Fee)' : 'UK Business')}
              </span>
            </div>

            {calcMode === 'forward' ? (
              <div>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white flex items-baseline gap-1 my-2">
                  <span className="text-2xl text-blue-400">{currSym}</span>
                  <span className={forwardCalc.netProfit >= 0 ? 'text-white' : 'text-rose-400'}>
                    {forwardCalc.netProfit.toFixed(2)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-medium pt-3 border-t border-slate-800">
                  <div className="bg-slate-800/60 p-2.5 rounded-xl">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Profit Margin</span>
                    <span className={`text-base font-bold ${forwardCalc.profitMargin >= 25 ? 'text-emerald-400' : 'text-blue-300'}`}>
                      {forwardCalc.profitMargin.toFixed(1)}%
                    </span>
                  </div>
                  <div className="bg-slate-800/60 p-2.5 rounded-xl">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">ROI on Cost</span>
                    <span className={`text-base font-bold ${forwardCalc.roi >= 50 ? 'text-emerald-400' : 'text-blue-300'}`}>
                      {forwardCalc.roi.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white flex items-baseline gap-1 my-2">
                  <span className="text-2xl text-indigo-400">{currSym}</span>
                  <span className="text-indigo-300">{reverseCalc.requiredSoldPrice.toFixed(2)}</span>
                </div>
                <p className="text-xs text-slate-300 pt-2 border-t border-slate-800">
                  List at <strong className="text-white">{currSym}{reverseCalc.requiredSoldPrice.toFixed(2)}</strong> to pocket exactly <strong className="text-emerald-400">{currSym}{targetProfit.toFixed(2)}</strong> profit after covering all {currSym}{reverseCalc.reverseFees.toFixed(2)} eBay fees and expenses.
                </p>
              </div>
            )}

            {/* Break-even sale price footer tag */}
            {calcMode === 'forward' && (
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Break-Even Sale Price:</span>
                <span className="font-bold text-amber-400 font-mono">
                  {currSym}{forwardCalc.breakEvenSoldPrice.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* Visual Revenue Distribution Bar */}
          {calcMode === 'forward' && forwardCalc.grossOrder > 0 && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
                <span>Revenue Allocation</span>
                <span className="font-mono">{currSym}{forwardCalc.grossOrder.toFixed(2)} Total</span>
              </div>
              <div className="h-3.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div style={{ width: `${Math.min(100, profitPct)}%` }} className="bg-emerald-500 h-full transition-all" title={`Net Profit: ${profitPct.toFixed(1)}%`} />
                <div style={{ width: `${Math.min(100, itemCostPct)}%` }} className="bg-blue-500 h-full transition-all" title={`Inventory Cost: ${itemCostPct.toFixed(1)}%`} />
                <div style={{ width: `${Math.min(100, shippingPct)}%` }} className="bg-indigo-400 h-full transition-all" title={`Shipping: ${shippingPct.toFixed(1)}%`} />
                <div style={{ width: `${Math.min(100, ebayFeePct)}%` }} className="bg-rose-500 h-full transition-all" title={`eBay Fees: ${ebayFeePct.toFixed(1)}%`} />
              </div>
              <div className="grid grid-cols-4 gap-1 text-[9px] font-bold text-slate-500 dark:text-slate-400 text-center">
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Profit
                </span>
                <span className="text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Cost
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Postage
                </span>
                <span className="text-rose-600 dark:text-rose-400 flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> eBay
                </span>
              </div>
            </div>
          )}

          {/* Granular Fee Breakdown Table */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2.5 text-xs">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
              <span>Itemized Deductions</span>
              <span className="text-rose-600 dark:text-rose-400 font-mono font-bold">
                -{currSym}{forwardCalc.totalEbayFees.toFixed(2)} ({forwardCalc.effectiveFeeRate.toFixed(2)}%)
              </span>
            </div>

            <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>eBay Final Value Fee (FVF):</span>
                <span className="font-mono font-semibold">
                  {currSym}{forwardCalc.finalVariableFee.toFixed(2)}
                  {isTopRatedPlus && <span className="text-[10px] text-emerald-500 ml-1">(-10% TRS+)</span>}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Order Fixed Processing:</span>
                <span className="font-mono font-semibold">{currSym}{forwardCalc.fixedOrderFee.toFixed(2)}</span>
              </div>

              {forwardCalc.adFee > 0 && (
                <div className="flex justify-between text-indigo-600 dark:text-indigo-400 font-medium">
                  <span>Promoted Listings ({promotedRate}%):</span>
                  <span className="font-mono font-semibold">+{currSym}{forwardCalc.adFee.toFixed(2)}</span>
                </div>
              )}

              {forwardCalc.intlFee > 0 && (
                <div className="flex justify-between text-amber-600 dark:text-amber-400 font-medium">
                  <span>International Fee (1.65%):</span>
                  <span className="font-mono font-semibold">+{currSym}{forwardCalc.intlFee.toFixed(2)}</span>
                </div>
              )}

              {forwardCalc.ukRegulatoryFee > 0 && (
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>UK Regulatory Fee (0.42%):</span>
                  <span className="font-mono font-semibold">+{currSym}{forwardCalc.ukRegulatoryFee.toFixed(2)}</span>
                </div>
              )}

              {insertionFee > 0 && (
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Insertion Fee:</span>
                  <span className="font-mono font-semibold">+{currSym}{insertionFee.toFixed(2)}</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-slate-900 dark:text-white">
                <span>Net Bank Payout:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">
                  {currSym}{forwardCalc.netPayout.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: WhatsApp Share & Copy */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyBreakdown}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-700"
            >
              <i className={copied ? 'fa-solid fa-check text-emerald-400' : 'fa-regular fa-copy'}></i>
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Fee Breakdown'}</span>
            </button>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out my eBay profit breakdown: Sold for ${currSym}${soldPrice}, Net Take-Home Profit: ${currSym}${forwardCalc.netProfit.toFixed(2)} (${forwardCalc.profitMargin.toFixed(1)}% margin) via SmartRateCalcs: https://www.smartratecalcs.com/calculators/ebay-fee-calculator`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
              title="Share on WhatsApp"
            >
              <i className="fa-brands fa-whatsapp text-sm"></i>
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Competitor Comparison Drawer (eBay vs Mercari vs Poshmark vs Depop) */}
      <div className="bg-slate-50 dark:bg-slate-950 p-6 border-t border-slate-200 dark:border-slate-800">
        <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
          <i className="fa-solid fa-scale-balanced text-blue-500"></i>
          Marketplace Fee Comparison on This {currSym}{forwardCalc.grossOrder.toFixed(2)} Order
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border-2 border-blue-500/80 shadow-sm">
            <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">eBay (2026)</div>
            <div className="text-base font-black text-slate-900 dark:text-white my-0.5 font-mono">
              {currSym}{forwardCalc.totalEbayFees.toFixed(2)}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              {forwardCalc.effectiveFeeRate.toFixed(1)}% effective cut
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] font-bold text-slate-500 uppercase">Mercari</div>
            <div className="text-base font-black text-slate-800 dark:text-slate-200 my-0.5 font-mono">
              {currSym}{forwardCalc.mercariFee.toFixed(2)}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">10% + 2.9% + $0.50</div>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] font-bold text-slate-500 uppercase">Poshmark</div>
            <div className="text-base font-black text-slate-800 dark:text-slate-200 my-0.5 font-mono">
              {currSym}{forwardCalc.poshmarkFee.toFixed(2)}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Flat 20% commission</div>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] font-bold text-slate-500 uppercase">Depop</div>
            <div className="text-base font-black text-slate-800 dark:text-slate-200 my-0.5 font-mono">
              {currSym}{forwardCalc.depopFee.toFixed(2)}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">0% fee + 3.3% + $0.45</div>
          </div>
        </div>
      </div>
    </div>
  );
}
