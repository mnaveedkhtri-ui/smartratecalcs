'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export default function ReverbCalculatorWidget({ isStandalone = false }: { isStandalone?: boolean }) {
  const [calcMode, setCalcMode] = useState<'forward' | 'reverse'>('forward');

  // Forward Inputs
  const [itemPrice, setItemPrice] = useState<number>(850);
  const [buyerShipping, setBuyerShipping] = useState<number>(45);
  const [actualShippingCost, setActualShippingCost] = useState<number>(48);
  const [itemCost, setItemCost] = useState<number>(520);
  const [salesTaxPct, setSalesTaxPct] = useState<number>(7.0);
  const [sellerTier, setSellerTier] = useState<'standard' | 'preferred'>('standard');
  const [bumpRatePct, setBumpRatePct] = useState<number>(0);
  const [crossBorderFx, setCrossBorderFx] = useState<boolean>(false);

  // Reverse Target Profit Input
  const [targetProfit, setTargetProfit] = useState<number>(250);
  const [copied, setCopied] = useState<boolean>(false);

  const procRate = sellerTier === 'preferred' ? 0.0299 : 0.0319;
  const fxRate = crossBorderFx ? 0.01 : 0;
  const taxDec = Math.max(0, salesTaxPct) / 100;
  const bumpDec = Math.max(0, bumpRatePct) / 100;

  const forwardCalc = useMemo(() => {
    const price = Math.max(0, itemPrice);
    const shipCharged = Math.max(0, buyerShipping);
    const totalOrderSubtotal = price + shipCharged;
    const collectedSalesTax = totalOrderSubtotal * taxDec;
    const grossPaidByBuyer = totalOrderSubtotal + collectedSalesTax;

    // 1. Reverb 5.0% Selling Fee on (Item + Buyer Shipping), capped at $500, min $0.50 if > 0
    const rawSellingFee = totalOrderSubtotal * 0.05;
    const sellingFee =
      totalOrderSubtotal === 0 ? 0 : Math.min(500, Math.max(0.5, rawSellingFee));

    // 2. Reverb Payments Fee (3.19% or 2.99% + $0.49) on FULL total including sales tax
    const processingFee =
      grossPaidByBuyer === 0 ? 0 : grossPaidByBuyer * (procRate + fxRate) + 0.49;

    // 3. Optional Reverb Bump Ad Fee on (Item + Buyer Shipping)
    const bumpFee = totalOrderSubtotal * bumpDec;

    const totalReverbFees = sellingFee + processingFee + bumpFee;
    const netDeposit = Math.max(0, totalOrderSubtotal - totalReverbFees);
    const netProfit = netDeposit - actualShippingCost - itemCost;
    const effectiveFeePct = totalOrderSubtotal > 0 ? (totalReverbFees / totalOrderSubtotal) * 100 : 0;
    const profitMargin = price > 0 ? (netProfit / price) * 100 : 0;
    const roi = itemCost > 0 ? (netProfit / itemCost) * 100 : 0;

    // Competitor comparison at same totalOrderSubtotal
    const ebayMusicFee = totalOrderSubtotal > 0 ? totalOrderSubtotal * 0.0635 + 0.30 : 0; // eBay Musical Instruments 6.35% below $7500
    const ebayGeneralFee = totalOrderSubtotal > 0 ? totalOrderSubtotal * 0.1325 + 0.30 : 0;
    const mercariFee = totalOrderSubtotal > 0 ? totalOrderSubtotal * 0.10 : 0;

    return {
      price,
      shipCharged,
      totalOrderSubtotal,
      collectedSalesTax,
      grossPaidByBuyer,
      sellingFee,
      processingFee,
      bumpFee,
      totalReverbFees,
      netDeposit,
      netProfit,
      effectiveFeePct,
      profitMargin,
      roi,
      ebayMusicFee,
      ebayGeneralFee,
      mercariFee,
      capTriggered: rawSellingFee > 500,
    };
  }, [itemPrice, buyerShipping, actualShippingCost, itemCost, taxDec, procRate, fxRate, bumpDec]);

  const reverseCalc = useMemo(() => {
    const fixedCosts = actualShippingCost + itemCost + 0.49;
    const shipCharged = Math.max(0, buyerShipping);
    const combinedProcMult = (1 + taxDec) * (procRate + fxRate);
    const totalLinearRate = 0.05 + bumpDec + combinedProcMult;

    // Solve uncapped: Subtotal * (1 - totalLinearRate) = targetProfit + fixedCosts + shipCharged?
    // Actually NetProfit = Subtotal - SellingFee(Subtotal) - Subtotal*combinedProcMult - 0.49 - Subtotal*bumpDec - actualShippingCost - itemCost
    let solvedSubtotal = totalLinearRate < 1 ? (targetProfit + fixedCosts) / (1 - totalLinearRate) : 0;
    // Check if selling fee hits $500 cap (when Subtotal > $10,000)
    if (solvedSubtotal * 0.05 > 500) {
      const cappedRate = bumpDec + combinedProcMult;
      solvedSubtotal = cappedRate < 1 ? (targetProfit + fixedCosts + 500) / (1 - cappedRate) : solvedSubtotal;
    }

    const solvedPrice = Math.max(0, solvedSubtotal - shipCharged);
    const solvedSellingFee = solvedSubtotal === 0 ? 0 : Math.min(500, Math.max(0.5, solvedSubtotal * 0.05));
    const solvedProcFee = solvedSubtotal === 0 ? 0 : solvedSubtotal * combinedProcMult + 0.49;
    const solvedBumpFee = solvedSubtotal * bumpDec;
    const solvedTotalFees = solvedSellingFee + solvedProcFee + solvedBumpFee;
    const solvedNetProfit = solvedSubtotal - solvedTotalFees - actualShippingCost - itemCost;

    return {
      solvedPrice,
      solvedSubtotal,
      solvedSellingFee,
      solvedProcFee,
      solvedBumpFee,
      solvedTotalFees,
      solvedNetProfit,
    };
  }, [targetProfit, actualShippingCost, itemCost, buyerShipping, taxDec, procRate, fxRate, bumpDec]);

  const handleCopy = () => {
    const summary =
      calcMode === 'forward'
        ? `Reverb 2026 Payout Breakdown (SmartRateCalcs):\nSold Price: $${forwardCalc.price.toFixed(2)} + Shipping: $${forwardCalc.shipCharged.toFixed(2)}\n5% Selling Fee: -$${forwardCalc.sellingFee.toFixed(2)}\nReverb Payments (${(procRate * 100).toFixed(2)}% + $0.49 incl. tax): -$${forwardCalc.processingFee.toFixed(2)}\nNet Profit: $${forwardCalc.netProfit.toFixed(2)} (${forwardCalc.profitMargin.toFixed(1)}% margin)\nCalculated on: https://www.smartratecalcs.com/calculators/reverb-fee-calculator`
        : `Reverb Reverse Target Price (SmartRateCalcs):\nTo pocket $${targetProfit.toFixed(2)} net profit after COGS & fees, list your gear at: $${reverseCalc.solvedPrice.toFixed(2)} (+ $${buyerShipping.toFixed(2)} buyer shipping).\nTotal Reverb Fees: $${reverseCalc.solvedTotalFees.toFixed(2)}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors duration-200">
      {/* Top Mode Toggle Header */}
      <div className="bg-slate-900 dark:bg-slate-950 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
            <i className="fa-solid fa-guitar"></i>
          </div>
          <div>
            <h2 className="text-white font-bold text-sm sm:text-base leading-tight">
              Reverb Seller Fee &amp; Gear Profit Engine
            </h2>
            <p className="text-[11px] text-orange-300 font-mono">
              2026 Verified: 5% Selling ($500 Cap) + {(procRate * 100).toFixed(2)}% + $0.49 Processing
            </p>
          </div>
        </div>

        <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setCalcMode('forward')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              calcMode === 'forward' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            Payout &amp; Profit
          </button>
          <button
            type="button"
            onClick={() => setCalcMode('reverse')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              calcMode === 'reverse' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            Reverse Price Solver
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          {calcMode === 'forward' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="rev-price" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                  Gear Sale Price ($)
                </label>
                <input
                  id="rev-price"
                  type="number"
                  min={0}
                  value={itemPrice}
                  onChange={(e) => setItemPrice(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label htmlFor="rev-cogs" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                  Your Gear Cost / COGS ($)
                </label>
                <input
                  id="rev-cogs"
                  type="number"
                  min={0}
                  value={itemCost}
                  onChange={(e) => setItemCost(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="rev-target" className="block text-xs font-bold text-orange-700 dark:text-orange-400 uppercase mb-1.5">
                  Target Net Profit ($)
                </label>
                <input
                  id="rev-target"
                  type="number"
                  min={0}
                  value={targetProfit}
                  onChange={(e) => setTargetProfit(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-orange-500 bg-orange-50/40 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="rev-cogs-rev" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                  Your Gear Cost / COGS ($)
                </label>
                <input
                  id="rev-cogs-rev"
                  type="number"
                  min={0}
                  value={itemCost}
                  onChange={(e) => setItemCost(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="rev-ship-buyer" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Buyer Shipping Charged ($)
              </label>
              <input
                id="rev-ship-buyer"
                type="number"
                min={0}
                value={buyerShipping}
                onChange={(e) => setBuyerShipping(Number(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="rev-ship-cost" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Actual Shipping + Box ($)
              </label>
              <input
                id="rev-ship-cost"
                type="number"
                min={0}
                value={actualShippingCost}
                onChange={(e) => setActualShippingCost(Number(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="rev-tax" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Buyer State Sales Tax (%)
              </label>
              <input
                id="rev-tax"
                type="number"
                step="0.5"
                min={0}
                max={15}
                value={salesTaxPct}
                onChange={(e) => setSalesTaxPct(Number(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
              <span className="text-[10px] text-slate-400 font-mono">Reverb processing applies to tax too</span>
            </div>
            <div>
              <label htmlFor="rev-bump" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Reverb Bump Ad Rate (%)
              </label>
              <input
                id="rev-bump"
                type="number"
                step="0.5"
                min={0}
                max={15}
                value={bumpRatePct}
                onChange={(e) => setBumpRatePct(Number(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
              <span className="text-[10px] text-slate-400 font-mono">Set 0% for organic non-bumped sale</span>
            </div>
          </div>

          {/* Seller Status & Cross-Border Toggles */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Reverb Seller Tier:</span>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setSellerTier('standard')}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold font-mono transition ${
                    sellerTier === 'standard'
                      ? 'bg-orange-600 text-white'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Standard (3.19%)
                </button>
                <button
                  type="button"
                  onClick={() => setSellerTier('preferred')}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold font-mono transition ${
                    sellerTier === 'preferred'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Preferred (2.99%)
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={crossBorderFx}
                onChange={(e) => setCrossBorderFx(e.target.checked)}
                className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
              />
              <span>International Buyer Cross-Currency Conversion (+1.0% FX fee)</span>
            </label>
          </div>
        </div>

        {/* Right Live Output (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          {calcMode === 'forward' ? (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase text-orange-400 font-bold block">
                    Real Net Take-Home Profit
                  </span>
                  <div className={`text-3xl sm:text-4xl font-black font-mono ${forwardCalc.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    ${forwardCalc.netProfit.toFixed(2)}
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-xs text-slate-400">Net Reverb Payout</div>
                  <div className="text-lg font-bold text-white">${forwardCalc.netDeposit.toFixed(2)}</div>
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Order Subtotal (Gear + Buyer Shipping):</span>
                  <span className="font-bold text-white">${forwardCalc.totalOrderSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-rose-300">
                  <span>5.0% Selling Fee {forwardCalc.capTriggered ? '($500 Max Cap!)' : ''}:</span>
                  <span>-${forwardCalc.sellingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-rose-300">
                  <span>
                    Reverb Payments ({((procRate + fxRate) * 100).toFixed(2)}% + $0.49 on ${forwardCalc.grossPaidByBuyer.toFixed(0)} w/ tax):
                  </span>
                  <span>-${forwardCalc.processingFee.toFixed(2)}</span>
                </div>
                {forwardCalc.bumpFee > 0 && (
                  <div className="flex justify-between text-amber-300">
                    <span>Reverb Bump Ad Fee ({bumpRatePct}%):</span>
                    <span>-${forwardCalc.bumpFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800">
                  <span>Actual Shipping + Gear Cost (COGS):</span>
                  <span>-${(actualShippingCost + itemCost).toFixed(2)}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center font-mono">
                <div className="p-2 rounded-xl bg-white/5">
                  <div className="text-[10px] text-slate-400">Effective Fee</div>
                  <div className="text-sm font-bold text-orange-400">{forwardCalc.effectiveFeePct.toFixed(2)}%</div>
                </div>
                <div className="p-2 rounded-xl bg-white/5">
                  <div className="text-[10px] text-slate-400">Net Margin</div>
                  <div className="text-sm font-bold text-emerald-400">{forwardCalc.profitMargin.toFixed(1)}%</div>
                </div>
                <div className="p-2 rounded-xl bg-white/5">
                  <div className="text-[10px] text-slate-400">Gear ROI</div>
                  <div className="text-sm font-bold text-cyan-400">{forwardCalc.roi.toFixed(1)}%</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-950 to-slate-950 text-white border border-orange-500/40 space-y-4">
              <span className="text-[11px] font-mono uppercase text-orange-300 font-bold block">
                Required Reverb Listing Price
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white">
                ${reverseCalc.solvedPrice.toFixed(2)}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                List your instrument at <strong>${reverseCalc.solvedPrice.toFixed(2)}</strong> (+ ${buyerShipping.toFixed(2)} buyer shipping) to clear{' '}
                <strong className="text-emerald-400">${targetProfit.toFixed(2)}</strong> net profit after paying all Reverb fees, tax processing, shipping, and COGS.
              </p>
              <div className="space-y-1.5 text-xs font-mono pt-3 border-t border-white/10 text-slate-300">
                <div className="flex justify-between">
                  <span>Solved 5% Selling Fee:</span>
                  <span className="text-rose-300">-${reverseCalc.solvedSellingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Solved Payments Processing:</span>
                  <span className="text-rose-300">-${reverseCalc.solvedProcFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-400 pt-1">
                  <span>Verified Net Profit:</span>
                  <span>${reverseCalc.solvedNetProfit.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Cross-Marketplace Comparison Box */}
          {calcMode === 'forward' && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
              <div className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                Platform Fee Comparison on ${forwardCalc.totalOrderSubtotal.toFixed(0)} Gear Sale
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-orange-500/40">
                  <div className="text-[10px] text-orange-600 dark:text-orange-400 font-bold">Reverb Total</div>
                  <div className="font-bold text-slate-900 dark:text-white">${forwardCalc.totalReverbFees.toFixed(2)}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">eBay Gear (6.35%)</div>
                  <div className="font-bold text-slate-900 dark:text-white">${forwardCalc.ebayMusicFee.toFixed(2)}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">Mercari (10%)</div>
                  <div className="font-bold text-slate-900 dark:text-white">${forwardCalc.mercariFee.toFixed(2)}</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-2"
            >
              <i className={`fa-solid ${copied ? 'fa-check text-emerald-400' : 'fa-copy'}`}></i>
              <span>{copied ? 'Breakdown Copied!' : 'Copy Payout Breakdown'}</span>
            </button>

            {!isStandalone && (
              <Link
                href="/blog/reverb-seller-fees-2026-complete-gear-profit-margin-guide"
                className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
              >
                <span>Read 2026 Reverb Fee Guide</span>
                <span>&rarr;</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
