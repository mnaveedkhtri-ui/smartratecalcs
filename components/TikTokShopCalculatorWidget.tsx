'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export default function TikTokShopCalculatorWidget({ isStandalone = false }: { isStandalone?: boolean }) {
  const [calcMode, setCalcMode] = useState<'forward' | 'reverse'>('forward');
  const [region, setRegion] = useState<'US' | 'UK'>('US');
  const [sellingPrice, setSellingPrice] = useState<number>(35);
  const [shippingCharged, setShippingCharged] = useState<number>(0); // Customer paid shipping
  const [cogs, setCogs] = useState<number>(8.50); // Cost of goods
  const [actualShipping, setActualShipping] = useState<number>(4.80); // Seller shipping label cost
  const [affiliateRate, setAffiliateRate] = useState<number>(10); // 10% affiliate creator cut
  const [adSpend, setAdSpend] = useState<number>(0); // TikTok Ads CPA per order
  const [targetProfit, setTargetProfit] = useState<number>(15);
  const [copied, setCopied] = useState<boolean>(false);

  // Region parameters
  const currSym = region === 'US' ? '$' : '£';
  // 2026 TikTok Shop base referral fee: 6% for US, 5% for UK
  const baseReferralRate = region === 'US' ? 0.06 : 0.05;
  const minReferralFee = region === 'US' ? 0.30 : 0.20;

  // Forward Calculation
  const forwardCalc = useMemo(() => {
    const grossOrder = Math.max(0, sellingPrice + shippingCharged);
    
    // TikTok Shop Referral Commission (calculated on total order price including buyer shipping)
    const rawReferral = grossOrder * baseReferralRate;
    const referralFee = grossOrder > 0 ? Math.max(minReferralFee, rawReferral) : 0;
    
    // Creator Affiliate Commission (usually calculated on item price excluding shipping)
    const affiliateCut = sellingPrice > 0 ? (sellingPrice * (affiliateRate / 100)) : 0;
    
    // Total Platform Deductions
    const totalPlatformFees = referralFee + affiliateCut;
    
    // Net Payout from TikTok (what hits bank before product & shipping costs)
    const netDeposit = Math.max(0, grossOrder - totalPlatformFees);
    
    // Total Out-of-Pocket Fulfillment & Marketing
    const totalCosts = cogs + actualShipping + adSpend;
    
    // Final Net Take-Home Profit
    const netProfit = netDeposit - totalCosts;
    const profitMargin = grossOrder > 0 ? (netProfit / grossOrder) * 100 : 0;
    const roi = totalCosts > 0 ? (netProfit / totalCosts) * 100 : 0;

    // Marketplace Competitor Comparison (on same sale value)
    // Amazon: 15% standard category referral
    const amazonFee = grossOrder * 0.15;
    // Shopify: 2.9% + $0.30 processing (assuming merchant's store)
    const shopifyFee = grossOrder > 0 ? (grossOrder * 0.029) + (region === 'US' ? 0.30 : 0.25) : 0;
    // Etsy: 6.5% transaction + 3% + $0.25 processing (9.5% + $0.25)
    const etsyFee = grossOrder > 0 ? (grossOrder * 0.095) + (region === 'US' ? 0.25 : 0.20) : 0;

    return {
      grossOrder,
      referralFee,
      affiliateCut,
      totalPlatformFees,
      netDeposit,
      totalCosts,
      netProfit,
      profitMargin,
      roi,
      amazonFee,
      shopifyFee,
      etsyFee,
    };
  }, [sellingPrice, shippingCharged, cogs, actualShipping, affiliateRate, adSpend, baseReferralRate, minReferralFee, region]);

  // Reverse Calculation (Find required selling price to pocket desired Net Profit)
  const reverseCalc = useMemo(() => {
    // Equation:
    // NetProfit = (P + S_charged) - (P + S_charged)*baseRate - P*(affiliateRate/100) - COGS - S_actual - AdSpend
    // NetProfit + COGS + S_actual + AdSpend - S_charged*(1 - baseRate) = P * [1 - baseRate - (affiliateRate/100)]
    const effectiveMultiplier = 1 - baseReferralRate - (affiliateRate / 100);
    const fixedTotal = targetProfit + cogs + actualShipping + adSpend - (shippingCharged * (1 - baseReferralRate));
    
    const requiredPrice = effectiveMultiplier > 0 ? Math.max(0, fixedTotal / effectiveMultiplier) : 0;
    const revGross = requiredPrice + shippingCharged;
    const revReferral = Math.max(minReferralFee, revGross * baseReferralRate);
    const revAffiliate = requiredPrice * (affiliateRate / 100);
    const revTotalFees = revReferral + revAffiliate;

    return {
      requiredPrice,
      revGross,
      revTotalFees,
      revReferral,
      revAffiliate,
    };
  }, [targetProfit, cogs, actualShipping, adSpend, shippingCharged, baseReferralRate, affiliateRate, minReferralFee]);

  const handleCopy = () => {
    const text = `SmartRateCalcs Breakdown for TikTok Shop Seller Fees (2026):
Mode: ${calcMode === 'forward' ? 'Profit & Payout Estimation' : 'Target Price Calculator'}
Region: TikTok Shop ${region}
Listing Price: ${currSym}${sellingPrice.toFixed(2)}
TikTok Referral Fee (${(baseReferralRate * 100).toFixed(0)}%): ${currSym}${forwardCalc.referralFee.toFixed(2)}
Creator Affiliate Cut (${affiliateRate}%): ${currSym}${forwardCalc.affiliateCut.toFixed(2)}
COGS & Shipping: ${currSym}${(cogs + actualShipping).toFixed(2)}
${adSpend > 0 ? `Ad Spend per Order: ${currSym}${adSpend.toFixed(2)}\n` : ''}Net Take-Home Profit: ${currSym}${forwardCalc.netProfit.toFixed(2)} (Margin: ${forwardCalc.profitMargin.toFixed(1)}%)
Calculated on: https://www.smartratecalcs.com/tiktok-shop-fee-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadArchetype = (price: number, cost: number, ship: number, aff: number, ad: number) => {
    setSellingPrice(price);
    setCogs(cost);
    setActualShipping(ship);
    setAffiliateRate(aff);
    setAdSpend(ad);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden mb-12 transition-colors duration-200">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-black via-slate-950 to-[#0d1117] text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00f2fe] font-mono tracking-wider uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-[#fe2c55] animate-pulse"></span>
            Official 2026 TikTok Shop Fee Architecture
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white flex items-center gap-2.5">
            <i className="fa-brands fa-tiktok text-[#fe2c55]"></i>
            TikTok Shop Fee &amp; Profit Calculator
          </h2>
        </div>

        {/* Region & Mode Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {/* US / UK Toggle */}
          <div className="inline-flex p-1 rounded-xl bg-slate-900/90 border border-slate-700/80">
            <button
              onClick={() => setRegion('US')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                region === 'US'
                  ? 'bg-[#fe2c55] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🇺🇸 US (6%)
            </button>
            <button
              onClick={() => setRegion('UK')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                region === 'UK'
                  ? 'bg-[#00f2fe] text-slate-900 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🇬🇧 UK (5%)
            </button>
          </div>

          {/* Forward vs Reverse Mode Toggle */}
          <div className="inline-flex p-1 rounded-xl bg-slate-900/90 border border-slate-700/80">
            <button
              onClick={() => setCalcMode('forward')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                calcMode === 'forward'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Take-Home Profit
            </button>
            <button
              onClick={() => setCalcMode('reverse')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                calcMode === 'reverse'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Target Price Goal
            </button>
          </div>
        </div>
      </div>

      {/* Preset Archetypes Bar */}
      <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-mono text-slate-500 dark:text-slate-400 font-semibold mr-1">
          <i className="fa-solid fa-wand-magic-sparkles text-[#fe2c55] mr-1"></i> Quick Presets:
        </span>
        <button
          onClick={() => loadArchetype(25, 4.5, 3.8, 15, 0)}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#fe2c55] font-medium text-slate-700 dark:text-slate-300 transition-colors"
        >
          Viral Beauty ($25 &bull; 15% Aff)
        </button>
        <button
          onClick={() => loadArchetype(55, 14, 6.5, 10, 0)}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#00f2fe] font-medium text-slate-700 dark:text-slate-300 transition-colors"
        >
          Streetwear Hoodie ($55 &bull; 10% Aff)
        </button>
        <button
          onClick={() => loadArchetype(18, 3.2, 3.5, 12, 0)}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 font-medium text-slate-700 dark:text-slate-300 transition-colors"
        >
          TikTok Gadget ($18 &bull; 12% Aff)
        </button>
        <button
          onClick={() => loadArchetype(39.99, 9, 4.5, 10, 8)}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-purple-500 font-medium text-slate-700 dark:text-slate-300 transition-colors"
        >
          Paid Ads Model ($40 &bull; $8 CPA)
        </button>
      </div>

      <div className="p-6 sm:p-8">
        {calcMode === 'forward' ? (
          /* ================= FORWARD PROFIT ESTIMATION ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Form Column (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Selling Price */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Item Selling Price ({currSym})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-mono">
                      {currSym}
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/90 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#fe2c55] shadow-inner text-sm"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">What customer pays for product</span>
                </div>

                {/* Shipping Charged to Buyer */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Buyer Shipping Fee ({currSym})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-mono">
                      {currSym}
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={shippingCharged}
                      onChange={(e) => setShippingCharged(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/90 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#fe2c55] shadow-inner text-sm"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Enter 0 if offering Free Shipping</span>
                </div>
              </div>

              {/* COGS and Shipping Cost */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Product Cost / COGS ({currSym})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-mono">
                      {currSym}
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={cogs}
                      onChange={(e) => setCogs(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/90 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-slate-500 shadow-inner text-sm"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Wholesale, manufacturing or thrift cost</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Actual Shipping Cost ({currSym})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-mono">
                      {currSym}
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={actualShipping}
                      onChange={(e) => setActualShipping(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/90 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-slate-500 shadow-inner text-sm"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Postage label, packaging box, polymailer</span>
                </div>
              </div>

              {/* Affiliate Creator Commission Slider */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <i className="fa-solid fa-users text-[#fe2c55]"></i>
                    Creator Affiliate Commission Rate
                  </label>
                  <span className="text-xs font-mono font-bold text-[#fe2c55] bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/40 px-2 py-0.5 rounded-md">
                    {affiliateRate}% ({currSym}{forwardCalc.affiliateCut.toFixed(2)})
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={affiliateRate}
                  onChange={(e) => setAffiliateRate(Number(e.target.value))}
                  className="w-full accent-[#fe2c55] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0% (Own Store Only)</span>
                  <span>10% (Standard)</span>
                  <span>15% (Viral Push)</span>
                  <span>20%+ (High Margin)</span>
                </div>
              </div>

              {/* TikTok Ad Spend CPA (Optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  TikTok Paid Ads Spend Per Order ({currSym})
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-mono">
                    {currSym}
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={adSpend}
                    onChange={(e) => setAdSpend(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/90 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-slate-500 shadow-inner text-sm"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Cost per acquisition (CPA). Leave $0 for organic / affiliate sales.</span>
              </div>
            </div>

            {/* Results Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="p-6 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#fe2c55]/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00f2fe]/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">Net Take-Home Profit</span>
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    forwardCalc.netProfit > 0 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'
                  }`}>
                    {forwardCalc.profitMargin.toFixed(1)}% Margin
                  </span>
                </div>

                <div className="relative z-10 py-1">
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight text-white">
                    {currSym}{forwardCalc.netProfit.toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <span>ROI on Capital:</span>
                    <strong className="text-emerald-400 font-mono font-bold">{forwardCalc.roi.toFixed(1)}%</strong>
                  </div>
                </div>

                {/* Line Item Breakdown */}
                <div className="relative z-10 space-y-2 pt-3 border-t border-slate-800 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Total Customer Paid:</span>
                    <span className="font-bold">{currSym}{forwardCalc.grossOrder.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-rose-400">
                    <span>TikTok Referral Fee ({(baseReferralRate * 100).toFixed(0)}%):</span>
                    <span>-{currSym}{forwardCalc.referralFee.toFixed(2)}</span>
                  </div>
                  {forwardCalc.affiliateCut > 0 && (
                    <div className="flex justify-between text-amber-400">
                      <span>Creator Affiliate ({affiliateRate}%):</span>
                      <span>-{currSym}{forwardCalc.affiliateCut.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-200 font-bold pt-1 border-t border-slate-800">
                    <span>TikTok Direct Payout:</span>
                    <span className="text-[#00f2fe]">{currSym}{forwardCalc.netDeposit.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Product COGS:</span>
                    <span>-{currSym}{cogs.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Postage &amp; Box:</span>
                    <span>-{currSym}{actualShipping.toFixed(2)}</span>
                  </div>
                  {adSpend > 0 && (
                    <div className="flex justify-between text-slate-400">
                      <span>Ad Spend (CPA):</span>
                      <span>-{currSym}{adSpend.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleCopy}
                  className="relative z-10 w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-[#fe2c55] to-[#ff0050] hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                  <span>{copied ? 'Copied Breakdown!' : 'Copy Fee & Profit Report'}</span>
                </button>
              </div>

              {/* Platform Fee Comparison Pill */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span>Platform Fee Comparison</span>
                  <span className="text-[10px] text-slate-400 font-mono">On {currSym}{forwardCalc.grossOrder.toFixed(2)} Sale</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-400">TikTok (6%)</div>
                    <div className="font-mono font-bold text-[#fe2c55]">{currSym}{forwardCalc.referralFee.toFixed(2)}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-400">Amazon (15%)</div>
                    <div className="font-mono font-bold text-amber-500">{currSym}{forwardCalc.amazonFee.toFixed(2)}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-400">Etsy (9.5%+)</div>
                    <div className="font-mono font-bold text-orange-500">{currSym}{forwardCalc.etsyFee.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================= REVERSE TARGET PRICE SOLVER ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Desired Net Profit In Pocket ({currSym})
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-mono">
                    {currSym}
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={targetProfit}
                    onChange={(e) => setTargetProfit(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-extrabold text-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#fe2c55] shadow-inner"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Exact net amount you want to pocket after all TikTok cuts, shipping, and product costs.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Product Cost / COGS ({currSym})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={cogs}
                    onChange={(e) => setCogs(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-slate-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Actual Shipping Cost ({currSym})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={actualShipping}
                    onChange={(e) => setActualShipping(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-slate-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Creator Affiliate Cut (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="35"
                    step="1"
                    value={affiliateRate}
                    onChange={(e) => setAffiliateRate(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-slate-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Ad Spend per Order ({currSym})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={adSpend}
                    onChange={(e) => setAdSpend(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-slate-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Reverse Results Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="p-6 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
                <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">Required Listing Price</span>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/40">
                    Reverse Target
                  </span>
                </div>

                <div className="relative z-10 py-1">
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight text-[#00f2fe]">
                    {currSym}{reverseCalc.requiredPrice.toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    List at this exact price to guarantee your <strong>{currSym}{targetProfit.toFixed(2)}</strong> take-home pay.
                  </div>
                </div>

                <div className="relative z-10 space-y-2 pt-3 border-t border-slate-800 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Total Customer Pays:</span>
                    <span className="font-bold">{currSym}{reverseCalc.revGross.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-rose-400">
                    <span>TikTok Commission ({(baseReferralRate * 100).toFixed(0)}%):</span>
                    <span>-{currSym}{reverseCalc.revReferral.toFixed(2)}</span>
                  </div>
                  {reverseCalc.revAffiliate > 0 && (
                    <div className="flex justify-between text-amber-400">
                      <span>Affiliate Cut ({affiliateRate}%):</span>
                      <span>-{currSym}{reverseCalc.revAffiliate.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>Product COGS &amp; Shipping:</span>
                    <span>-{currSym}{(cogs + actualShipping).toFixed(2)}</span>
                  </div>
                  {adSpend > 0 && (
                    <div className="flex justify-between text-slate-400">
                      <span>Ad Spend:</span>
                      <span>-{currSym}{adSpend.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-emerald-400 font-bold pt-2 border-t border-slate-800 text-sm">
                    <span>Guaranteed Net Take-Home:</span>
                    <span>{currSym}{targetProfit.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Internal Navigation Cross-Links */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-slate-500 font-mono">Related Reseller &amp; Marketplace Engines:</span>
        <div className="flex flex-wrap gap-2">
          <Link href="/depop-fee-calculator" className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-red-500 font-semibold text-slate-700 dark:text-slate-200 transition-colors">
            Depop 0% Calculator
          </Link>
          <Link href="/square-fee-calculator" className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-900 font-semibold text-slate-700 dark:text-slate-200 transition-colors">
            Square POS Calculator
          </Link>
          <Link href="/1099-tax-calculator" className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-600 font-semibold text-slate-700 dark:text-slate-200 transition-colors">
            US 1099 Tax Calculator
          </Link>
          <Link href="/stripe-fee-calculator" className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-600 font-semibold text-slate-700 dark:text-slate-200 transition-colors">
            Stripe Fee Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}
