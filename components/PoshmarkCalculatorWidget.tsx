'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export default function PoshmarkCalculatorWidget({ isStandalone = false }: { isStandalone?: boolean }) {
  // Calculation mode: Forward (from price) or Reverse (from target profit)
  const [calcMode, setCalcMode] = useState<'forward' | 'reverse'>('forward');

  // Forward Mode Inputs
  const [listingPrice, setListingPrice] = useState<number>(45);
  const [itemCost, setItemCost] = useState<number>(8); // COGS (Thrift / wholesale cost)
  const [shippingDiscountType, setShippingDiscountType] = useState<'none' | '5.95' | 'free' | 'custom'>('5.95');
  const [customShippingDiscount, setCustomShippingDiscount] = useState<number>(2.02);
  const [overweightFee, setOverweightFee] = useState<number>(0); // Extra label upgrade for > 5 lbs
  const [suppliesCost, setSuppliesCost] = useState<number>(1.00); // Packaging, polymailers, thank you note
  const [promotedSpend, setPromotedSpend] = useState<number>(0); // Promoted closet ad spend

  // Reverse Mode Inputs
  const [targetProfit, setTargetProfit] = useState<number>(25);

  // Copy state
  const [copied, setCopied] = useState<boolean>(false);

  // Determine actual seller shipping discount deduction
  const sellerShippingDeduction = useMemo(() => {
    if (shippingDiscountType === 'none') return 0;
    if (shippingDiscountType === '5.95') return 2.02; // Poshmark $5.95 buyer promo (seller covers $2.02)
    if (shippingDiscountType === 'free') return 7.97; // Full label absorbed by seller ($7.97)
    return Math.max(0, customShippingDiscount);
  }, [shippingDiscountType, customShippingDiscount]);

  // Forward Calculation
  const forwardCalc = useMemo(() => {
    const price = Math.max(0, listingPrice);
    
    // Poshmark Official 2026 Fee Formula:
    // Sales under $15.00: Flat $2.95
    // Sales $15.00 and above: 20.0% of sold price
    const poshmarkFee = price === 0 ? 0 : price < 15 ? 2.95 : price * 0.20;
    const effectiveFeePercent = price > 0 ? (poshmarkFee / price) * 100 : 0;

    // Net Poshmark Earnings (what gets credited to Poshmark balance)
    const netDeposit = Math.max(0, price - poshmarkFee - sellerShippingDeduction - overweightFee);

    // Total seller out-of-pocket expenses
    const totalOutflows = itemCost + suppliesCost + promotedSpend;

    // Real Net Take-Home Profit
    const netProfit = netDeposit - totalOutflows;
    const profitMargin = price > 0 ? (netProfit / price) * 100 : 0;
    const roi = itemCost > 0 ? (netProfit / itemCost) * 100 : 0;

    // Competitor Comparisons on this identical sold price
    // Depop: 0% seller fee + 3.3% + $0.45 processing
    const depopFee = price > 0 ? (price * 0.033) + 0.45 : 0;
    // eBay: average clothing/reselling 13.25% + $0.40
    const ebayFee = price > 0 ? (price * 0.1325) + 0.40 : 0;
    // Mercari: 0% selling fee + 2.9% + $0.50 processing
    const mercariFee = price > 0 ? (price * 0.029) + 0.50 : 0;
    // Etsy: 6.5% transaction + 3% + $0.25 payment + $0.20 listing
    const etsyFee = price > 0 ? (price * 0.095) + 0.45 : 0;

    return {
      price,
      poshmarkFee,
      effectiveFeePercent,
      sellerShippingDeduction,
      overweightFee,
      netDeposit,
      totalOutflows,
      netProfit,
      profitMargin,
      roi,
      depopFee,
      ebayFee,
      mercariFee,
      etsyFee,
    };
  }, [
    listingPrice,
    itemCost,
    sellerShippingDeduction,
    overweightFee,
    suppliesCost,
    promotedSpend,
  ]);

  // Reverse Calculation (Find required listing price to pocket targetProfit)
  const reverseCalc = useMemo(() => {
    const fixedOutflows = sellerShippingDeduction + overweightFee + itemCost + suppliesCost + promotedSpend;
    const desiredTakeHome = Math.max(0, targetProfit);

    // Case 1: If resulting listing price is $15 or higher:
    // Profit = (Price * 0.80) - fixedOutflows
    // Price * 0.80 = Profit + fixedOutflows
    // Price = (Profit + fixedOutflows) / 0.80
    const priceTier20 = (desiredTakeHome + fixedOutflows) / 0.80;

    // Case 2: If resulting price is under $15:
    // Profit = Price - 2.95 - fixedOutflows
    // Price = Profit + fixedOutflows + 2.95
    const priceUnder15 = desiredTakeHome + fixedOutflows + 2.95;

    let solvedPrice = priceTier20 >= 15 ? priceTier20 : priceUnder15;
    if (solvedPrice < 0) solvedPrice = 0;

    const solvedPoshmarkFee = solvedPrice < 15 ? 2.95 : solvedPrice * 0.20;
    const solvedNetDeposit = Math.max(0, solvedPrice - solvedPoshmarkFee - sellerShippingDeduction - overweightFee);
    const solvedNetProfit = solvedNetDeposit - (itemCost + suppliesCost + promotedSpend);
    const solvedMargin = solvedPrice > 0 ? (solvedNetProfit / solvedPrice) * 100 : 0;

    return {
      solvedPrice,
      solvedPoshmarkFee,
      solvedNetDeposit,
      solvedNetProfit,
      solvedMargin,
      fixedOutflows,
    };
  }, [
    targetProfit,
    sellerShippingDeduction,
    overweightFee,
    itemCost,
    suppliesCost,
    promotedSpend,
  ]);

  // Quick Preset Handlers
  const applyPreset = (preset: 'thrift' | 'jeans' | 'sneakers' | 'coat' | 'bundle') => {
    setCalcMode('forward');
    if (preset === 'thrift') {
      setListingPrice(12);
      setItemCost(2);
      setShippingDiscountType('none');
      setOverweightFee(0);
      setSuppliesCost(0.75);
      setPromotedSpend(0);
    } else if (preset === 'jeans') {
      setListingPrice(42);
      setItemCost(7);
      setShippingDiscountType('5.95');
      setOverweightFee(0);
      setSuppliesCost(1.20);
      setPromotedSpend(0);
    } else if (preset === 'sneakers') {
      setListingPrice(125);
      setItemCost(45);
      setShippingDiscountType('5.95');
      setOverweightFee(0);
      setSuppliesCost(2.00);
      setPromotedSpend(0);
    } else if (preset === 'coat') {
      setListingPrice(95);
      setItemCost(18);
      setShippingDiscountType('5.95');
      setOverweightFee(4.50); // 6 lbs label upgrade
      setSuppliesCost(2.50);
      setPromotedSpend(0);
    } else if (preset === 'bundle') {
      setListingPrice(80);
      setItemCost(16);
      setShippingDiscountType('free'); // Free shipping promo on bundles
      setOverweightFee(0);
      setSuppliesCost(2.00);
      setPromotedSpend(0);
    }
  };

  // Copy Summary to Clipboard
  const copySummary = () => {
    const text =
      calcMode === 'forward'
        ? `Poshmark 2026 Fee Breakdown:\nListing Price: $${forwardCalc.price.toFixed(2)}\nPoshmark Fee: $${forwardCalc.poshmarkFee.toFixed(2)} (${forwardCalc.effectiveFeePercent.toFixed(1)}%)\nShipping Discount: $${forwardCalc.sellerShippingDeduction.toFixed(2)}\nNet Poshmark Payout: $${forwardCalc.netDeposit.toFixed(2)}\nItem Cost (COGS): $${itemCost.toFixed(2)}\nNet Profit: $${forwardCalc.netProfit.toFixed(2)} (${forwardCalc.profitMargin.toFixed(1)}% Margin)\nCalculated at SmartRateCalcs.com`
        : `Poshmark Reverse Target Pricing:\nTarget Profit: $${targetProfit.toFixed(2)}\nRequired Listing Price: $${reverseCalc.solvedPrice.toFixed(2)}\nPoshmark Fee: $${reverseCalc.solvedPoshmarkFee.toFixed(2)}\nCalculated at SmartRateCalcs.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // WhatsApp Share Link
  const shareWhatsApp = () => {
    const summary =
      calcMode === 'forward'
        ? `Poshmark Sale: Price $${forwardCalc.price.toFixed(2)} -> Net Profit $${forwardCalc.netProfit.toFixed(2)} (${forwardCalc.profitMargin.toFixed(1)}% margin) via SmartRateCalcs`
        : `Poshmark Target: To make $${targetProfit.toFixed(2)} profit, list at $${reverseCalc.solvedPrice.toFixed(2)} via SmartRateCalcs`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(summary + ' https://www.smartratecalcs.com/calculators/poshmark-fee-calculator')}`;
    window.open(url, '_blank');
  };

  return (
    <div
      className={`w-full max-w-4xl mx-auto ${
        isStandalone ? '' : 'p-4 sm:p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl'
      }`}
    >
      {/* Header and Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-600 animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 font-mono">
              2026 Official Poshmark Fee Schedule
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            Poshmark Fee &amp; Net Profit Calculator
          </h2>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setCalcMode('forward')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl transition-all ${
              calcMode === 'forward'
                ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm font-extrabold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Forward Mode (From Price)
          </button>
          <button
            type="button"
            onClick={() => setCalcMode('reverse')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl transition-all ${
              calcMode === 'reverse'
                ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm font-extrabold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Reverse Solver (Target Profit)
          </button>
        </div>
      </div>

      {/* Quick Scenario Presets */}
      <div className="py-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
            One-Click Reseller Presets:
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-500 font-medium hidden sm:inline">
            Load common closet scenarios
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          <button
            type="button"
            onClick={() => applyPreset('thrift')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors text-left"
          >
            <span className="block text-[10px] text-rose-600 dark:text-rose-400 font-bold">Sub-$15 Item</span>
            $12 Fast Thrift
          </button>
          <button
            type="button"
            onClick={() => applyPreset('jeans')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors text-left"
          >
            <span className="block text-[10px] text-rose-600 dark:text-rose-400 font-bold">Denim / Jeans</span>
            $42 with $5.95 Ship
          </button>
          <button
            type="button"
            onClick={() => applyPreset('sneakers')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors text-left"
          >
            <span className="block text-[10px] text-rose-600 dark:text-rose-400 font-bold">Designer Shoes</span>
            $125 Sneakers
          </button>
          <button
            type="button"
            onClick={() => applyPreset('coat')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors text-left"
          >
            <span className="block text-[10px] text-rose-600 dark:text-rose-400 font-bold">Heavy Coat (6 lbs)</span>
            $95 + Overweight
          </button>
          <button
            type="button"
            onClick={() => applyPreset('bundle')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors text-left col-span-2 sm:col-span-1"
          >
            <span className="block text-[10px] text-rose-600 dark:text-rose-400 font-bold">3-Item Bundle</span>
            $80 + Free Ship
          </button>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        {/* Left Column: Inputs Form (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {calcMode === 'forward' ? (
            /* Forward Input: Listing Price */
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="listingPrice" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                  Listing / Accepted Offer Price ($)
                </label>
                <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
                  {listingPrice < 15 ? 'Flat $2.95 Fee Applied' : 'Standard 20% Fee Applied'}
                </span>
              </div>
              <div className="relative rounded-2xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 font-bold text-lg">
                  $
                </div>
                <input
                  type="number"
                  id="listingPrice"
                  min="0"
                  step="1"
                  value={listingPrice || ''}
                  onChange={(e) => setListingPrice(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl text-lg font-black text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                  placeholder="45"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Slider Quick Adjust:</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">${listingPrice}</span>
              </div>
              <input
                type="range"
                min="5"
                max="300"
                step="1"
                value={listingPrice}
                onChange={(e) => setListingPrice(parseFloat(e.target.value) || 0)}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>
          ) : (
            /* Reverse Input: Desired Net Profit */
            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="targetProfit" className="text-xs font-bold text-rose-900 dark:text-rose-200 uppercase tracking-wide">
                  Desired Net Cash in Pocket ($)
                </label>
                <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
                  Target Profit Goal
                </span>
              </div>
              <div className="relative rounded-2xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 font-bold text-lg">
                  $
                </div>
                <input
                  type="number"
                  id="targetProfit"
                  min="1"
                  step="1"
                  value={targetProfit || ''}
                  onChange={(e) => setTargetProfit(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-3 bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-700 rounded-2xl text-lg font-black text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                  placeholder="25"
                />
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                The solver will calculate the minimum listing price required to pocket this exact amount after Poshmark fees, shipping discounts, and thrift costs.
              </p>
            </div>
          )}

          {/* Shipping Discount Offered to Buyer */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                Seller Shipping Discount (Offer to Likers)
              </label>
              <span className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">
                Buyer pays $7.97 std
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setShippingDiscountType('none')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  shippingDiscountType === 'none'
                    ? 'bg-white dark:bg-slate-900 border-rose-500 shadow-sm'
                    : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">No Discount</div>
                <div className="text-[10px] text-slate-500">Buyer pays $7.97</div>
                <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-1 font-mono">$0.00 Cost</div>
              </button>

              <button
                type="button"
                onClick={() => setShippingDiscountType('5.95')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  shippingDiscountType === '5.95'
                    ? 'bg-white dark:bg-slate-900 border-rose-500 shadow-sm'
                    : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">$5.95 Rate</div>
                <div className="text-[10px] text-slate-500">Most common promo</div>
                <div className="text-xs font-black text-rose-600 dark:text-rose-400 mt-1 font-mono">-$2.02 Cost</div>
              </button>

              <button
                type="button"
                onClick={() => setShippingDiscountType('free')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  shippingDiscountType === 'free'
                    ? 'bg-white dark:bg-slate-900 border-rose-500 shadow-sm'
                    : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">Free Shipping</div>
                <div className="text-[10px] text-slate-500">Seller covers label</div>
                <div className="text-xs font-black text-rose-600 dark:text-rose-400 mt-1 font-mono">-$7.97 Cost</div>
              </button>
            </div>
          </div>

          {/* Cost of Goods (COGS) & Outflows Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Item Purchase Cost (COGS) */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <label htmlFor="itemCost" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                Item Cost / Thrift Price ($)
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 font-bold text-sm">
                  $
                </div>
                <input
                  type="number"
                  id="itemCost"
                  min="0"
                  step="0.5"
                  value={itemCost || ''}
                  onChange={(e) => setItemCost(parseFloat(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                  placeholder="8"
                />
              </div>
              <p className="text-[10px] text-slate-500">What you paid at goodwill/thrift</p>
            </div>

            {/* Packaging & Supplies */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <label htmlFor="suppliesCost" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                Supplies &amp; Polymailers ($)
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 font-bold text-sm">
                  $
                </div>
                <input
                  type="number"
                  id="suppliesCost"
                  min="0"
                  step="0.25"
                  value={suppliesCost || ''}
                  onChange={(e) => setSuppliesCost(parseFloat(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                  placeholder="1.00"
                />
              </div>
              <p className="text-[10px] text-slate-500">Mailers, tissue, cards, tape</p>
            </div>
          </div>

          {/* Advanced Outflows (Overweight label & Promoted Closet) */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                Advanced Deductions (Overweight / Promoted)
              </span>
              <span className="text-[10px] text-slate-500">Optional</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Overweight Label Fee */}
              <div>
                <label htmlFor="overweightFee" className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Overweight Fee (&gt;5 lbs)
                </label>
                <select
                  id="overweightFee"
                  value={overweightFee}
                  onChange={(e) => setOverweightFee(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                >
                  <option value={0}>Under 5 lbs ($0.00 standard)</option>
                  <option value={4.50}>6 lbs label upgrade (+$4.50)</option>
                  <option value={9.00}>7 lbs label upgrade (+$9.00)</option>
                  <option value={13.50}>8 lbs label upgrade (+$13.50)</option>
                  <option value={18.00}>9 lbs label upgrade (+$18.00)</option>
                  <option value={22.50}>10 lbs label upgrade (+$22.50)</option>
                </select>
              </div>

              {/* Promoted Closet Ad Cost */}
              <div>
                <label htmlFor="promotedSpend" className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Promoted Closet Cost ($)
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 font-bold text-xs">
                    $
                  </div>
                  <input
                    type="number"
                    id="promotedSpend"
                    min="0"
                    step="0.5"
                    value={promotedSpend || ''}
                    onChange={(e) => setPromotedSpend(parseFloat(e.target.value) || 0)}
                    className="w-full pl-6 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Results Dashboard (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {calcMode === 'forward' ? (
            /* Forward Output Cards */
            <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950 text-white shadow-xl border border-rose-900/40 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">
                  Your Net Profit Summary
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {forwardCalc.price < 15 ? '$2.95 Flat Tier' : '20% Flat Commission'}
                </span>
              </div>

              {/* Primary Net Profit Callout */}
              <div className="space-y-1">
                <div className="text-xs text-slate-400 uppercase tracking-wide">Take-Home Cash Profit</div>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${
                      forwardCalc.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    ${forwardCalc.netProfit.toFixed(2)}
                  </span>
                  <span className="text-sm font-bold text-slate-300 font-mono">
                    ({forwardCalc.profitMargin.toFixed(1)}% margin)
                  </span>
                </div>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[11px] text-slate-400">Poshmark Payout</div>
                  <div className="text-lg font-black text-white font-mono mt-0.5">
                    ${forwardCalc.netDeposit.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-400">Direct deposit balance</div>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[11px] text-slate-400">Total Poshmark Fee</div>
                  <div className="text-lg font-black text-rose-400 font-mono mt-0.5">
                    -${forwardCalc.poshmarkFee.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-400">{forwardCalc.effectiveFeePercent.toFixed(1)}% of price</div>
                </div>
              </div>

              {/* Detailed Breakdown List */}
              <div className="pt-2 border-t border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Sold / Listing Price</span>
                  <span className="font-bold text-white">${forwardCalc.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-rose-300">
                  <span>Poshmark Commission Fee</span>
                  <span>-${forwardCalc.poshmarkFee.toFixed(2)}</span>
                </div>
                {forwardCalc.sellerShippingDeduction > 0 && (
                  <div className="flex justify-between text-rose-300">
                    <span>Seller Shipping Discount</span>
                    <span>-${forwardCalc.sellerShippingDeduction.toFixed(2)}</span>
                  </div>
                )}
                {forwardCalc.overweightFee > 0 && (
                  <div className="flex justify-between text-rose-300">
                    <span>Overweight Label Upgrade</span>
                    <span>-${forwardCalc.overweightFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-amber-300">
                  <span>Item Cost (COGS)</span>
                  <span>-${itemCost.toFixed(2)}</span>
                </div>
                {suppliesCost > 0 && (
                  <div className="flex justify-between text-slate-400">
                    <span>Packaging &amp; Supplies</span>
                    <span>-${suppliesCost.toFixed(2)}</span>
                  </div>
                )}
                {promotedSpend > 0 && (
                  <div className="flex justify-between text-slate-400">
                    <span>Promoted Closet Ads</span>
                    <span>-${promotedSpend.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm text-emerald-400">
                  <span>Net Return on Investment (ROI)</span>
                  <span>{itemCost > 0 ? `${forwardCalc.roi.toFixed(1)}%` : 'N/A'}</span>
                </div>
              </div>
            </div>
          ) : (
            /* Reverse Solver Output Card */
            <div className="p-5 rounded-3xl bg-gradient-to-br from-rose-950 via-slate-900 to-slate-900 text-white shadow-xl border border-rose-800/60 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">
                  Solved Required Listing Price
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Reverse Math Engine
                </span>
              </div>

              {/* Target Price Callout */}
              <div className="space-y-1">
                <div className="text-xs text-slate-400 uppercase tracking-wide">List Your Item At Minimum:</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
                    ${reverseCalc.solvedPrice.toFixed(2)}
                  </span>
                  <span className="text-sm font-bold text-rose-400 font-mono">
                    to pocket ${targetProfit.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Reverse Breakdown */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Poshmark Takes</span>
                  <span className="font-bold text-rose-400">-${reverseCalc.solvedPoshmarkFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Shipping &amp; Supplies Deducted</span>
                  <span className="font-bold text-slate-400">
                    -${(sellerShippingDeduction + overweightFee + suppliesCost + promotedSpend).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Item Cost Reimbursed</span>
                  <span className="font-bold text-amber-400">-${itemCost.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm text-emerald-400">
                  <span>Net Cash in Pocket</span>
                  <span>+${reverseCalc.solvedNetProfit.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed">
                Tip: If you plan to send a <strong>10% or 20% Offer to Likers</strong> later, list at{' '}
                <strong className="text-white">${(reverseCalc.solvedPrice * 1.25).toFixed(2)}</strong> to leave negotiation room!
              </div>
            </div>
          )}

          {/* Action Buttons: Copy & Share */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={copySummary}
              className="w-full py-2.5 px-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-700"
            >
              {copied ? (
                <>
                  <span className="text-emerald-500 font-bold">&#10003;</span>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  <span>Copy Breakdown</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={shareWhatsApp}
              className="w-full py-2.5 px-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-emerald-200 dark:border-emerald-800/60"
            >
              <i className="fa-brands fa-whatsapp text-emerald-600 text-sm"></i>
              <span>Share Result</span>
            </button>
          </div>

          {/* Competitor Platform Comparison Mini-Table */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
              <span>Platform Fee Comparison</span>
              <span className="text-[10px] text-slate-500 font-mono">On ${forwardCalc.price.toFixed(0)} Sale</span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-600"></span> Poshmark (20% or $2.95)
                </span>
                <span className="font-mono font-black text-rose-600 dark:text-rose-400">
                  ${forwardCalc.poshmarkFee.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between p-1.5 px-2 rounded-xl bg-white/60 dark:bg-slate-900/60">
                <span className="text-slate-600 dark:text-slate-400">Depop (0% fee + 3.3% proc)</span>
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                  ${forwardCalc.depopFee.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between p-1.5 px-2 rounded-xl bg-white/60 dark:bg-slate-900/60">
                <span className="text-slate-600 dark:text-slate-400">eBay (~13.25% + $0.40)</span>
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                  ${forwardCalc.ebayFee.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between p-1.5 px-2 rounded-xl bg-white/60 dark:bg-slate-900/60">
                <span className="text-slate-600 dark:text-slate-400">Mercari (2.9% + $0.50)</span>
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                  ${forwardCalc.mercariFee.toFixed(2)}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 leading-tight pt-1">
              Note: Poshmark includes prepaid USPS Priority Mail shipping up to 5 lbs on all orders, which saves packaging label hassle compared to other platforms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
