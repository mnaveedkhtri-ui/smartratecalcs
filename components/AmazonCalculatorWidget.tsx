'use client';

import React, { useState, useMemo, useId } from 'react';
import Link from 'next/link';

export type AmazonCategory =
  | 'general' // 15% (Home, Kitchen, Toys, Sports, Tools)
  | 'apparel' // 5% under $15, 10% $15-$20, 17% over $20
  | 'electronics' // 8% flat
  | 'electronics_accessories' // 15% to $100, 8% over
  | 'beauty' // 8% under $10, 15% over
  | 'grocery' // 8% under $15, 15% over
  | 'books_media' // 15% + $1.80 closing fee
  | 'automotive' // 12%
  | 'jewelry' // 20% to $250, 5% over
  | 'shoes_handbags'; // 15%

export type FbaSizeTier =
  | 'small_std_4oz' // <= 4 oz
  | 'small_std_8oz' // 4-8 oz
  | 'small_std_12oz' // 8-12 oz
  | 'small_std_16oz' // 12-16 oz
  | 'large_std_4oz' // Large std <= 4 oz
  | 'large_std_8oz' // Large std 4-8 oz
  | 'large_std_12oz' // Large std 8-12 oz
  | 'large_std_16oz' // Large std 12-16 oz
  | 'large_std_1_5lb' // 1 - 1.5 lb
  | 'large_std_2lb' // 1.5 - 2 lb
  | 'large_std_3lb' // 2 - 3 lb
  | 'oversize_small' // Small oversize
  | 'oversize_medium'; // Medium oversize

export default function AmazonCalculatorWidget({ isStandalone = false }: { isStandalone?: boolean }) {
  const [calcMode, setCalcMode] = useState<'forward' | 'reverse'>('forward');
  const [fulfillmentMethod, setFulfillmentMethod] = useState<'FBA' | 'FBM'>('FBA');
  const [region, setRegion] = useState<'US' | 'UK'>('US');

  // Core Financial Inputs
  const [sellingPrice, setSellingPrice] = useState<number>(34.99);
  const [shippingCharged, setShippingCharged] = useState<number>(0); // For FBM orders
  const [itemCost, setItemCost] = useState<number>(8.50); // COGS (manufacturing / inventory cost)
  const [category, setCategory] = useState<AmazonCategory>('general');
  const [fbaSizeTier, setFbaSizeTier] = useState<FbaSizeTier>('large_std_8oz');
  
  // FBA Inbound & Logistics Inputs
  const [inboundShippingCost, setInboundShippingCost] = useState<number>(0.85); // Per unit freight to Amazon FC
  const [inboundPlacementFee, setInboundPlacementFee] = useState<number>(0.27); // Amazon 2026 Inbound Placement fee
  const [monthlyStorageFee, setMonthlyStorageFee] = useState<number>(0.22); // Estimated monthly storage per unit
  const [isQ4Storage, setIsQ4Storage] = useState<boolean>(false); // Q4 Peak storage (Oct-Dec)
  const [adSpendCPA, setAdSpendCPA] = useState<number>(0); // Amazon PPC cost per sale (optional)

  // FBM Logistics Inputs
  const [fbmShippingCost, setFbmShippingCost] = useState<number>(5.50); // Actual merchant postage (USPS / UPS / Royal Mail)
  const [fbmPackagingCost, setFbmPackagingCost] = useState<number>(0.75); // Box, tape, label

  // Reverse Solver Input (Target Profit)
  const [targetProfit, setTargetProfit] = useState<number>(10.00);

  const [copied, setCopied] = useState<boolean>(false);

  const sellingPriceId = useId();
  const shippingChargedId = useId();
  const itemCostId = useId();
  const targetProfitId = useId();
  const inboundShippingId = useId();
  const fbmShippingCostId = useId();

  const currSym = region === 'US' ? '$' : '£';

  // Preset archetypes for 1-click testing
  const applyPreset = (preset: 'tech_accessory' | 'apparel' | 'heavy_home' | 'beauty') => {
    if (preset === 'tech_accessory') {
      setSellingPrice(24.99);
      setItemCost(4.50);
      setCategory('electronics_accessories');
      setFbaSizeTier('small_std_8oz');
      setInboundShippingCost(0.45);
      setInboundPlacementFee(0.21);
      setFbmShippingCost(4.25);
    } else if (preset === 'apparel') {
      setSellingPrice(18.50);
      setItemCost(5.00);
      setCategory('apparel');
      setFbaSizeTier('large_std_8oz');
      setInboundShippingCost(0.65);
      setInboundPlacementFee(0.24);
      setFbmShippingCost(4.90);
    } else if (preset === 'heavy_home') {
      setSellingPrice(79.99);
      setItemCost(22.00);
      setCategory('general');
      setFbaSizeTier('large_std_3lb');
      setInboundShippingCost(2.20);
      setInboundPlacementFee(0.42);
      setFbmShippingCost(11.50);
    } else if (preset === 'beauty') {
      setSellingPrice(14.99);
      setItemCost(2.80);
      setCategory('beauty');
      setFbaSizeTier('small_std_4oz');
      setInboundShippingCost(0.35);
      setInboundPlacementFee(0.18);
      setFbmShippingCost(3.95);
    }
  };

  // Helper: Calculate 2026 Amazon Referral Fee
  const calcReferralFee = (price: number, cat: AmazonCategory): { fee: number; rateStr: string } => {
    let fee = 0;
    let rateStr = '15%';
    const minFee = region === 'US' ? 0.30 : 0.25;

    if (cat === 'general' || cat === 'shoes_handbags') {
      fee = Math.max(minFee, price * 0.15);
      rateStr = '15.0%';
    } else if (cat === 'apparel') {
      if (price <= 15) {
        fee = Math.max(minFee, price * 0.05);
        rateStr = '5.0% (Under $15)';
      } else if (price <= 20) {
        fee = Math.max(minFee, price * 0.10);
        rateStr = '10.0% ($15-$20)';
      } else {
        fee = Math.max(minFee, price * 0.17);
        rateStr = '17.0% (Over $20)';
      }
    } else if (cat === 'electronics') {
      fee = Math.max(minFee, price * 0.08);
      rateStr = '8.0% Flat';
    } else if (cat === 'electronics_accessories') {
      if (price <= 100) {
        fee = Math.max(minFee, price * 0.15);
        rateStr = '15.0%';
      } else {
        fee = Math.max(minFee, 100 * 0.15 + (price - 100) * 0.08);
        rateStr = '15% to $100, 8% over';
      }
    } else if (cat === 'beauty') {
      if (price <= 10) {
        fee = Math.max(minFee, price * 0.08);
        rateStr = '8.0% (Under $10)';
      } else {
        fee = Math.max(minFee, price * 0.15);
        rateStr = '15.0%';
      }
    } else if (cat === 'grocery') {
      if (price <= 15) {
        fee = Math.max(minFee, price * 0.08);
        rateStr = '8.0% (Under $15)';
      } else {
        fee = Math.max(minFee, price * 0.15);
        rateStr = '15.0%';
      }
    } else if (cat === 'books_media') {
      fee = Math.max(minFee, price * 0.15);
      rateStr = '15% + $1.80 closing';
    } else if (cat === 'automotive') {
      fee = Math.max(minFee, price * 0.12);
      rateStr = '12.0%';
    } else if (cat === 'jewelry') {
      if (price <= 250) {
        fee = Math.max(minFee, price * 0.20);
        rateStr = '20.0%';
      } else {
        fee = Math.max(minFee, 250 * 0.20 + (price - 250) * 0.05);
        rateStr = '20% to $250, 5% over';
      }
    }

    return { fee, rateStr };
  };

  // Helper: 2026 FBA Fulfillment Pick & Pack Fee Lookup
  const getFbaPickAndPackFee = (tier: FbaSizeTier): number => {
    if (region === 'US') {
      switch (tier) {
        case 'small_std_4oz': return 3.22;
        case 'small_std_8oz': return 3.40;
        case 'small_std_12oz': return 3.58;
        case 'small_std_16oz': return 3.77;
        case 'large_std_4oz': return 3.86;
        case 'large_std_8oz': return 4.08;
        case 'large_std_12oz': return 4.75;
        case 'large_std_16oz': return 5.40;
        case 'large_std_1_5lb': return 5.69;
        case 'large_std_2lb': return 6.10;
        case 'large_std_3lb': return 6.59;
        case 'oversize_small': return 9.73;
        case 'oversize_medium': return 19.05;
        default: return 4.08;
      }
    } else {
      // UK rates in GBP
      switch (tier) {
        case 'small_std_4oz': return 1.65;
        case 'small_std_8oz': return 1.95;
        case 'small_std_12oz': return 2.25;
        case 'small_std_16oz': return 2.55;
        case 'large_std_4oz': return 2.40;
        case 'large_std_8oz': return 2.65;
        case 'large_std_12oz': return 2.90;
        case 'large_std_16oz': return 3.20;
        case 'large_std_1_5lb': return 3.60;
        case 'large_std_2lb': return 3.95;
        case 'large_std_3lb': return 4.45;
        case 'oversize_small': return 6.85;
        case 'oversize_medium': return 12.50;
        default: return 2.65;
      }
    }
  };

  // Comprehensive Calculation for Both FBA and FBM
  const calculations = useMemo(() => {
    const grossPrice = Math.max(0, sellingPrice);
    const fbmGross = grossPrice + Math.max(0, shippingCharged);

    // 1. Referral Fee
    const { fee: fbaReferralFee, rateStr: refRateStr } = calcReferralFee(grossPrice, category);
    const { fee: fbmReferralFee } = calcReferralFee(fbmGross, category);

    // Closing Fee (for Books/Media)
    const closingFee = category === 'books_media' ? (region === 'US' ? 1.80 : 1.00) : 0;

    // 2. FBA Costs
    const fbaPickPack = getFbaPickAndPackFee(fbaSizeTier);
    const fbaPlacement = Math.max(0, inboundPlacementFee);
    const effectiveStorage = isQ4Storage ? monthlyStorageFee * 3.1 : monthlyStorageFee;
    const fbaTotalAmazonFees = fbaReferralFee + closingFee + fbaPickPack + fbaPlacement + effectiveStorage;
    const fbaTotalCost = itemCost + inboundShippingCost + adSpendCPA + fbaTotalAmazonFees;
    const fbaNetProfit = grossPrice - fbaTotalCost;
    const fbaMarginPct = grossPrice > 0 ? (fbaNetProfit / grossPrice) * 100 : 0;
    const fbaRoiPct = (itemCost + inboundShippingCost) > 0 ? (fbaNetProfit / (itemCost + inboundShippingCost)) * 100 : 0;

    // 3. FBM Costs
    const fbmTotalAmazonFees = fbmReferralFee + closingFee;
    const fbmTotalCost = itemCost + fbmShippingCost + fbmPackagingCost + adSpendCPA + fbmTotalAmazonFees;
    const fbmNetProfit = fbmGross - fbmTotalCost;
    const fbmMarginPct = fbmGross > 0 ? (fbmNetProfit / fbmGross) * 100 : 0;
    const fbmRoiPct = (itemCost + fbmShippingCost + fbmPackagingCost) > 0 
      ? (fbmNetProfit / (itemCost + fbmShippingCost + fbmPackagingCost)) * 100 
      : 0;

    // Active Selection Metrics
    const isFba = fulfillmentMethod === 'FBA';
    const activeNetProfit = isFba ? fbaNetProfit : fbmNetProfit;
    const activeMarginPct = isFba ? fbaMarginPct : fbmMarginPct;
    const activeRoiPct = isFba ? fbaRoiPct : fbmRoiPct;
    const activeAmazonCut = isFba ? fbaTotalAmazonFees : fbmTotalAmazonFees;
    const activeAmazonCutPct = (isFba ? grossPrice : fbmGross) > 0 
      ? (activeAmazonCut / (isFba ? grossPrice : fbmGross)) * 100 
      : 0;

    // Difference between FBA and FBM
    const fbaVsFbmDiff = fbaNetProfit - fbmNetProfit;

    return {
      grossPrice,
      fbmGross,
      refRateStr,
      fbaReferralFee,
      fbmReferralFee,
      closingFee,
      fbaPickPack,
      fbaPlacement,
      effectiveStorage,
      fbaTotalAmazonFees,
      fbaTotalCost,
      fbaNetProfit,
      fbaMarginPct,
      fbaRoiPct,
      fbmTotalAmazonFees,
      fbmTotalCost,
      fbmNetProfit,
      fbmMarginPct,
      fbmRoiPct,
      activeNetProfit,
      activeMarginPct,
      activeRoiPct,
      activeAmazonCut,
      activeAmazonCutPct,
      fbaVsFbmDiff
    };
  }, [
    sellingPrice,
    shippingCharged,
    itemCost,
    category,
    fbaSizeTier,
    inboundShippingCost,
    inboundPlacementFee,
    monthlyStorageFee,
    isQ4Storage,
    adSpendCPA,
    fbmShippingCost,
    fbmPackagingCost,
    fulfillmentMethod,
    region
  ]);

  // Reverse Target Profit Solver
  const reverseCalc = useMemo(() => {
    const desiredProfit = Math.max(0, targetProfit);
    const isFba = fulfillmentMethod === 'FBA';
    const closingFee = category === 'books_media' ? (region === 'US' ? 1.80 : 1.00) : 0;

    if (isFba) {
      const fbaPickPack = getFbaPickAndPackFee(fbaSizeTier);
      const effectiveStorage = isQ4Storage ? monthlyStorageFee * 3.1 : monthlyStorageFee;
      const fixedOutflows = itemCost + inboundShippingCost + adSpendCPA + fbaPickPack + inboundPlacementFee + effectiveStorage + closingFee + desiredProfit;
      
      // Approximate category variable referral percentage
      let approxRate = 0.15;
      if (category === 'electronics') approxRate = 0.08;
      else if (category === 'automotive') approxRate = 0.12;
      else if (category === 'jewelry') approxRate = 0.20;

      const requiredPrice = fixedOutflows / (1 - approxRate);
      return {
        requiredPrice: Math.max(requiredPrice, 0.99),
        fixedOutflows,
        targetProfit: desiredProfit
      };
    } else {
      const fixedOutflows = itemCost + fbmShippingCost + fbmPackagingCost + adSpendCPA + closingFee + desiredProfit;
      let approxRate = 0.15;
      if (category === 'electronics') approxRate = 0.08;
      else if (category === 'automotive') approxRate = 0.12;

      const requiredGross = fixedOutflows / (1 - approxRate);
      const requiredPrice = Math.max(requiredGross - shippingCharged, 0.99);
      return {
        requiredPrice,
        fixedOutflows,
        targetProfit: desiredProfit
      };
    }
  }, [
    targetProfit,
    fulfillmentMethod,
    category,
    fbaSizeTier,
    itemCost,
    inboundShippingCost,
    inboundPlacementFee,
    monthlyStorageFee,
    isQ4Storage,
    adSpendCPA,
    fbmShippingCost,
    fbmPackagingCost,
    shippingCharged,
    region
  ]);

  const copyBreakdown = () => {
    const text = `Amazon Seller & FBA Calculation (${fulfillmentMethod} - ${region}):\nSelling Price: ${currSym}${calculations.grossPrice.toFixed(2)}\nItem Cost (COGS): -${currSym}${itemCost.toFixed(2)}\nAmazon Fees (${calculations.refRateStr}): -${currSym}${calculations.activeAmazonCut.toFixed(2)} (${calculations.activeAmazonCutPct.toFixed(1)}%)\nNet Profit: ${currSym}${calculations.activeNetProfit.toFixed(2)}\nProfit Margin: ${calculations.activeMarginPct.toFixed(1)}%\nROI: ${calculations.activeRoiPct.toFixed(1)}%\nFBA vs FBM Difference: ${currSym}${Math.abs(calculations.fbaVsFbmDiff).toFixed(2)} (${calculations.fbaVsFbmDiff >= 0 ? 'FBA wins' : 'FBM wins'})\nCalculated via SmartRateCalcs.com/calculators/amazon-fba-fee-calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
      {/* Top Header Bar */}
      <div className="px-6 py-5 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md font-bold text-lg">
            a
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Amazon Seller &amp; FBA Fee Calculator</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-800">
                2026 Policy
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Official FBA Pick &amp; Pack, Referral, Inbound Placement &amp; Net Margin Engine
            </p>
          </div>
        </div>

        {/* Region & Mode Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {/* US / UK Market Toggle */}
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setRegion('US')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                region === 'US'
                  ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              US ($)
            </button>
            <button
              type="button"
              onClick={() => setRegion('UK')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                region === 'UK'
                  ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              UK (£)
            </button>
          </div>

          {/* Fulfillment Method Toggle (FBA vs FBM) */}
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setFulfillmentMethod('FBA')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                fulfillmentMethod === 'FBA'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <span>FBA</span>
              <span className="text-[10px] opacity-80">(Prime)</span>
            </button>
            <button
              type="button"
              onClick={() => setFulfillmentMethod('FBM')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                fulfillmentMethod === 'FBM'
                  ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <span>FBM</span>
              <span className="text-[10px] opacity-80">(Merchant)</span>
            </button>
          </div>

          {/* Forward vs Reverse Mode Toggle */}
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setCalcMode('forward')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                calcMode === 'forward'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Profit
            </button>
            <button
              type="button"
              onClick={() => setCalcMode('reverse')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                calcMode === 'reverse'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Reverse Target
            </button>
          </div>
        </div>
      </div>

      {/* Preset Archetypes Bar */}
      <div className="px-6 py-2.5 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-600 dark:text-slate-300 font-semibold whitespace-nowrap">1-Click Presets:</span>
        <button
          type="button"
          onClick={() => applyPreset('tech_accessory')}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-500 font-medium text-slate-700 dark:text-slate-300 transition-colors whitespace-nowrap"
        >
          Tech Accessory ($24.99)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('apparel')}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-500 font-medium text-slate-700 dark:text-slate-300 transition-colors whitespace-nowrap"
        >
          Apparel T-Shirt ($18.50)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('beauty')}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-500 font-medium text-slate-700 dark:text-slate-300 transition-colors whitespace-nowrap"
        >
          Beauty Serum ($14.99)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('heavy_home')}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-500 font-medium text-slate-700 dark:text-slate-300 transition-colors whitespace-nowrap"
        >
          Kitchen Blender ($79.99)
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 p-6 space-y-5">
          {calcMode === 'forward' ? (
            <>
              {/* Product Selling Price & Cost Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor={sellingPriceId} className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                    Amazon Listing Price ({currSym})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-400 font-bold text-sm">
                      {currSym}
                    </span>
                    <input
                      id={sellingPriceId}
                      type="number"
                      step="0.01"
                      min="0"
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                      className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-base focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor={itemCostId} className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                    Item Unit Cost / COGS ({currSym})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-400 font-bold text-sm">
                      {currSym}
                    </span>
                    <input
                      id={itemCostId}
                      type="number"
                      step="0.01"
                      min="0"
                      value={itemCost}
                      onChange={(e) => setItemCost(parseFloat(e.target.value) || 0)}
                      className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-base focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Product Category Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  Product Category (2026 Referral Schedule)
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as AmazonCategory)}
                  aria-label="Product Category"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                >
                  <option value="general">Home, Kitchen, Toys, Sports &amp; Tools (15% standard)</option>
                  <option value="apparel">Clothing &amp; Apparel (5% under $15, 10% $15-$20, 17% over $20)</option>
                  <option value="electronics">Computers &amp; Consumer Electronics (8% flat)</option>
                  <option value="electronics_accessories">Electronics Accessories (15% to $100, 8% balance)</option>
                  <option value="beauty">Beauty &amp; Personal Care (8% under $10, 15% over $10)</option>
                  <option value="grocery">Grocery &amp; Gourmet Food (8% under $15, 15% over $15)</option>
                  <option value="books_media">Books, DVDs &amp; Media (15% + $1.80 Closing Fee)</option>
                  <option value="automotive">Automotive &amp; Powersports (12% flat)</option>
                  <option value="jewelry">Jewelry &amp; Fine Watches (20% to $250, 5% balance)</option>
                  <option value="shoes_handbags">Shoes, Handbags &amp; Sunglasses (15% flat)</option>
                </select>
              </div>

              {/* FBA Specific Controls */}
              {fulfillmentMethod === 'FBA' ? (
                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      FBA Logistics &amp; Storage Parameters
                    </span>
                    <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400">
                      Pick &amp; Pack: {currSym}{calculations.fbaPickPack.toFixed(2)}
                    </span>
                  </div>

                  {/* FBA Package Size Tier */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      FBA Package Size &amp; Weight Tier
                    </label>
                    <select
                      value={fbaSizeTier}
                      onChange={(e) => setFbaSizeTier(e.target.value as FbaSizeTier)}
                      aria-label="FBA Package Size and Weight Tier"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-none"
                    >
                      <option value="small_std_4oz">Small Standard (up to 4 oz) - {currSym}{region === 'US' ? '3.22' : '1.65'}</option>
                      <option value="small_std_8oz">Small Standard (4 to 8 oz) - {currSym}{region === 'US' ? '3.40' : '1.95'}</option>
                      <option value="small_std_12oz">Small Standard (8 to 12 oz) - {currSym}{region === 'US' ? '3.58' : '2.25'}</option>
                      <option value="small_std_16oz">Small Standard (12 to 16 oz) - {currSym}{region === 'US' ? '3.77' : '2.55'}</option>
                      <option value="large_std_4oz">Large Standard (up to 4 oz) - {currSym}{region === 'US' ? '3.86' : '2.40'}</option>
                      <option value="large_std_8oz">Large Standard (4 to 8 oz) - {currSym}{region === 'US' ? '4.08' : '2.65'}</option>
                      <option value="large_std_12oz">Large Standard (8 to 12 oz) - {currSym}{region === 'US' ? '4.75' : '2.90'}</option>
                      <option value="large_std_16oz">Large Standard (12 to 16 oz) - {currSym}{region === 'US' ? '5.40' : '3.20'}</option>
                      <option value="large_std_1_5lb">Large Standard (1 to 1.5 lb) - {currSym}{region === 'US' ? '5.69' : '3.60'}</option>
                      <option value="large_std_2lb">Large Standard (1.5 to 2 lb) - {currSym}{region === 'US' ? '6.10' : '3.95'}</option>
                      <option value="large_std_3lb">Large Standard (2 to 3 lb) - {currSym}{region === 'US' ? '6.59' : '4.45'}</option>
                      <option value="oversize_small">Small Oversize - {currSym}{region === 'US' ? '9.73' : '6.85'}</option>
                      <option value="oversize_medium">Medium Oversize - {currSym}{region === 'US' ? '19.05' : '12.50'}</option>
                    </select>
                  </div>

                  {/* Inbound Shipping & Placement Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor={inboundShippingId} className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Inbound Freight to FC ({currSym}/unit)
                      </label>
                      <input
                        id={inboundShippingId}
                        type="number"
                        step="0.05"
                        min="0"
                        value={inboundShippingCost}
                        onChange={(e) => setInboundShippingCost(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        2026 Inbound Placement ({currSym})
                      </label>
                      <input
                        type="number"
                        step="0.05"
                        min="0"
                        value={inboundPlacementFee}
                        onChange={(e) => setInboundPlacementFee(parseFloat(e.target.value) || 0)}
                        aria-label="2026 Inbound Placement Fee"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Monthly Storage and Q4 Peak Toggle */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-amber-200/50 dark:border-amber-900/30">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="q4Toggle"
                        checked={isQ4Storage}
                        onChange={(e) => setIsQ4Storage(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300"
                      />
                      <label htmlFor="q4Toggle" className="text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                        Q4 Holiday Peak Storage (Oct-Dec rate: ~3.1x)
                      </label>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      Est. Storage: {currSym}{calculations.effectiveStorage.toFixed(2)}/mo
                    </span>
                  </div>
                </div>
              ) : (
                /* FBM Specific Controls */
                <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 space-y-4">
                  <span className="text-xs font-bold text-blue-900 dark:text-blue-200 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    FBM Merchant Fulfillment Costs
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor={shippingChargedId} className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Shipping Charged to Buyer ({currSym})
                      </label>
                      <input
                        id={shippingChargedId}
                        type="number"
                        step="0.50"
                        min="0"
                        value={shippingCharged}
                        onChange={(e) => setShippingCharged(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor={fbmShippingCostId} className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Actual Postage Paid by You ({currSym})
                      </label>
                      <input
                        id={fbmShippingCostId}
                        type="number"
                        step="0.50"
                        min="0"
                        value={fbmShippingCost}
                        onChange={(e) => setFbmShippingCost(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      Packaging &amp; Box Cost ({currSym})
                    </label>
                    <input
                      type="number"
                      step="0.10"
                      min="0"
                      value={fbmPackagingCost}
                      onChange={(e) => setFbmPackagingCost(parseFloat(e.target.value) || 0)}
                      aria-label="Packaging and Box Cost"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Optional PPC Ad Spend per Sale */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Amazon Ads PPC Cost Per Sale (Optional CPA)
                  </label>
                  <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                    {currSym}{adSpendCPA.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  value={adSpendCPA}
                  onChange={(e) => setAdSpendCPA(parseFloat(e.target.value))}
                  aria-label="Amazon Ads PPC Cost Per Sale"
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-600 dark:text-slate-400 font-mono">
                  <span>{currSym}0 (Organic)</span>
                  <span>{currSym}5</span>
                  <span>{currSym}10</span>
                  <span>{currSym}20</span>
                </div>
              </div>
            </>
          ) : (
            /* Reverse Mode Solver Inputs */
            <div className="space-y-6 py-2">
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40">
                <h3 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Reverse Amazon Target Pricing Engine
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Set your desired net profit per unit. We automatically solve the exact minimum listing price needed on Amazon to cover all referral fees, FBA pick &amp; pack charges, logistics, and product costs.
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor={targetProfitId} className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  Desired Net Profit Per Unit ({currSym})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-400 font-bold text-base">
                    {currSym}
                  </span>
                  <input
                    id={targetProfitId}
                    type="number"
                    step="1"
                    min="1"
                    value={targetProfit}
                    onChange={(e) => setTargetProfit(parseFloat(e.target.value) || 0)}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  Unit Cost (COGS) ({currSym})
                </label>
                <input
                  type="number"
                  step="0.50"
                  min="0"
                  value={itemCost}
                  onChange={(e) => setItemCost(parseFloat(e.target.value) || 0)}
                  aria-label="Unit Cost COGS"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-base focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 dark:bg-slate-950 text-white space-y-2 border border-slate-800">
                <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Required Minimum Amazon Price</span>
                <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                  {currSym}{reverseCalc.requiredPrice.toFixed(2)}
                </div>
                <p className="text-xs text-slate-400">
                  At {currSym}{reverseCalc.requiredPrice.toFixed(2)}, you absorb {currSym}{reverseCalc.fixedOutflows.toFixed(2)} in total product &amp; Amazon deductions and pocket exactly {currSym}{reverseCalc.targetProfit.toFixed(2)} in net cash profit.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Output Summary Cards & Line Items (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-50/70 dark:bg-slate-950/50 space-y-5">
          {/* Main Profit Stat Box */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Net Profit Per Sale ({fulfillmentMethod})
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  calculations.activeNetProfit >= 0
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                    : 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300'
                }`}
              >
                {calculations.activeMarginPct.toFixed(1)}% Margin
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div
                className={`text-3xl sm:text-4xl font-extrabold font-mono ${
                  calculations.activeNetProfit >= 0
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {currSym}{calculations.activeNetProfit.toFixed(2)}
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Unit ROI</span>
                <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">
                  {calculations.activeRoiPct.toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Visual Profit Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${Math.min(Math.max(calculations.activeMarginPct, 0), 100)}%` }}
                className="bg-emerald-500 h-full transition-all duration-300"
              />
              <div
                style={{ width: `${Math.min(Math.max(calculations.activeAmazonCutPct, 0), 100)}%` }}
                className="bg-amber-500 h-full transition-all duration-300"
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> Net Margin ({calculations.activeMarginPct.toFixed(1)}%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span> Amazon Cut ({calculations.activeAmazonCutPct.toFixed(1)}%)
              </span>
            </div>
          </div>

          {/* FBA vs FBM Real-Time Comparative Winner Pill */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">
                {calculations.fbaVsFbmDiff >= 0 ? 'FBA earns more profit' : 'FBM earns more profit'}
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                Difference: {currSym}{Math.abs(calculations.fbaVsFbmDiff).toFixed(2)} per unit
              </span>
            </div>
            <button
              type="button"
              onClick={() => setFulfillmentMethod(fulfillmentMethod === 'FBA' ? 'FBM' : 'FBA')}
              className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors"
            >
              Switch to {fulfillmentMethod === 'FBA' ? 'FBM' : 'FBA'}
            </button>
          </div>

          {/* Itemized Fee Breakdown Table */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden text-xs">
            <div className="p-3 bg-slate-100 dark:bg-slate-800/80 font-bold text-slate-900 dark:text-white flex justify-between items-center">
              <span>Itemized Deductions ({fulfillmentMethod})</span>
              <span className="font-mono text-[11px] text-slate-500">2026 Schedule</span>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              <div className="p-2.5 flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Referral Fee ({calculations.refRateStr})</span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                  -{currSym}{(fulfillmentMethod === 'FBA' ? calculations.fbaReferralFee : calculations.fbmReferralFee).toFixed(2)}
                </span>
              </div>

              {calculations.closingFee > 0 && (
                <div className="p-2.5 flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Media Closing Fee</span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    -{currSym}{calculations.closingFee.toFixed(2)}
                  </span>
                </div>
              )}

              {fulfillmentMethod === 'FBA' ? (
                <>
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">FBA Pick &amp; Pack Fee</span>
                    <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                      -{currSym}{calculations.fbaPickPack.toFixed(2)}
                    </span>
                  </div>
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Inbound Placement Fee</span>
                    <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                      -{currSym}{calculations.fbaPlacement.toFixed(2)}
                    </span>
                  </div>
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Monthly Storage (Est.)</span>
                    <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                      -{currSym}{calculations.effectiveStorage.toFixed(2)}
                    </span>
                  </div>
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Inbound Freight to FC</span>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                      -{currSym}{inboundShippingCost.toFixed(2)}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Merchant Postage Shipping</span>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                      -{currSym}{fbmShippingCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Packaging &amp; Materials</span>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                      -{currSym}{fbmPackagingCost.toFixed(2)}
                    </span>
                  </div>
                </>
              )}

              <div className="p-2.5 flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Inventory Product Cost (COGS)</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                  -{currSym}{itemCost.toFixed(2)}
                </span>
              </div>

              {adSpendCPA > 0 && (
                <div className="p-2.5 flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Amazon Ads PPC Spend</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    -{currSym}{adSpendCPA.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 flex justify-between font-bold">
                <span className="text-slate-900 dark:text-white">Total Amazon Platform Take</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">
                  -{currSym}{calculations.activeAmazonCut.toFixed(2)} ({calculations.activeAmazonCutPct.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Copy & Share */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={copyBreakdown}
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Fee Breakdown'}</span>
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Amazon ${fulfillmentMethod} Calculation: Selling Price ${currSym}${calculations.grossPrice.toFixed(2)} yields Net Profit of ${currSym}${calculations.activeNetProfit.toFixed(2)} (${calculations.activeMarginPct.toFixed(1)}% margin) via SmartRateCalcs.com`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-all flex items-center justify-center shadow-sm"
              title="Share to WhatsApp"
            >
              Share
            </a>
          </div>

          {/* Related E-Commerce Tools Links */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-2">
              Compare Across Top Reselling Marketplaces:
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              <Link
                href="/calculators/ebay-fee-calculator"
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-500 font-semibold text-slate-700 dark:text-slate-200 transition-colors"
              >
                eBay Calculator
              </Link>
              <Link
                href="/calculators/etsy-fee-calculator"
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-500 font-semibold text-slate-700 dark:text-slate-200 transition-colors"
              >
                Etsy Calculator
              </Link>
              <Link
                href="/depop-fee-calculator"
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-500 font-semibold text-slate-700 dark:text-slate-200 transition-colors"
              >
                Depop Calculator
              </Link>
              <Link
                href="/tiktok-shop-fee-calculator"
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-500 font-semibold text-slate-700 dark:text-slate-200 transition-colors"
              >
                TikTok Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
