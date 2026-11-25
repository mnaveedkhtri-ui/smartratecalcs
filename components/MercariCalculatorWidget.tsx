'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export default function MercariCalculatorWidget({ isStandalone = false }: { isStandalone?: boolean }) {
  const [calcMode, setCalcMode] = useState<'forward' | 'reverse'>('forward');

  // Forward Inputs
  const [itemPrice, setItemPrice] = useState<number>(65);
  const [shippingMode, setShippingMode] = useState<'buyer' | 'seller'>('buyer');
  const [buyerShippingCharge, setBuyerShippingCharge] = useState<number>(7.99);
  const [actualLabelCost, setActualLabelCost] = useState<number>(0);
  const [itemCost, setItemCost] = useState<number>(18);
  const [suppliesCost, setSuppliesCost] = useState<number>(1.0);
  const [instantPay, setInstantPay] = useState<boolean>(false);

  // Reverse Target Profit Input
  const [targetProfit, setTargetProfit] = useState<number>(35);
  const [copied, setCopied] = useState<boolean>(false);

  const forwardCalc = useMemo(() => {
    const price = Math.max(0, itemPrice);
    const shipCollected = shippingMode === 'buyer' ? Math.max(0, buyerShippingCharge) : 0;
    const sellerLabelPaid = shippingMode === 'seller' ? Math.max(0, actualLabelCost) : 0;

    // Mercari 2026 Official Fee Rule:
    // 10% flat selling fee on (Item Price + Buyer-Paid Shipping)
    // $0.00 separate payment processing fee
    const feeableTotal = price + shipCollected;
    const mercariSellerFee = feeableTotal * 0.10;

    // Informational: Buyer pays 3.6% Buyer Protection Fee on (Item Price + Shipping)
    const buyerProtectionFee = (price + shipCollected) * 0.036;
    const totalBuyerPays = price + shipCollected + buyerProtectionFee;

    const payoutFee = instantPay && price > 0 ? 3.0 : 0;
    // If buyer pays shipping via Mercari prepaid label, shipCollected passes through to label carrier
    const netDeposit = Math.max(0, price - mercariSellerFee - sellerLabelPaid - payoutFee);
    const totalOutflows = itemCost + suppliesCost;
    const netProfit = netDeposit - totalOutflows;
    const effectiveSellerRate = price > 0 ? (mercariSellerFee / price) * 100 : 0;
    const marginPct = price > 0 ? (netProfit / price) * 100 : 0;
    const roiPct = itemCost > 0 ? (netProfit / itemCost) * 100 : 0;

    // Reseller Competitor Benchmarks at same price
    const poshmarkFee = price === 0 ? 0 : price < 15 ? 2.95 : price * 0.20;
    const depopFee = price === 0 ? 0 : price * 0.033 + 0.45;
    const ebayFee = price === 0 ? 0 : price * 0.1325 + 0.30;

    return {
      price,
      shipCollected,
      sellerLabelPaid,
      feeableTotal,
      mercariSellerFee,
      buyerProtectionFee,
      totalBuyerPays,
      payoutFee,
      netDeposit,
      netProfit,
      effectiveSellerRate,
      marginPct,
      roiPct,
      poshmarkFee,
      depopFee,
      ebayFee,
    };
  }, [itemPrice, shippingMode, buyerShippingCharge, actualLabelCost, itemCost, suppliesCost, instantPay]);

  const reverseCalc = useMemo(() => {
    const shipCollected = shippingMode === 'buyer' ? Math.max(0, buyerShippingCharge) : 0;
    const sellerLabelPaid = shippingMode === 'seller' ? Math.max(0, actualLabelCost) : 0;
    const payoutFee = instantPay ? 3.0 : 0;
    const fixedDrag = itemCost + suppliesCost + sellerLabelPaid + payoutFee + shipCollected * 0.10;
    // NetProfit = Price * 0.90 - fixedDrag => Price = (Target + fixedDrag) / 0.90
    const solvedPrice = Math.max(0, (targetProfit + fixedDrag) / 0.90);
    const solvedFee = (solvedPrice + shipCollected) * 0.10;
    const solvedBuyerProt = (solvedPrice + shipCollected) * 0.036;
    const solvedNetProfit = solvedPrice - solvedFee - sellerLabelPaid - payoutFee - itemCost - suppliesCost;

    return {
      solvedPrice,
      solvedFee,
      solvedBuyerProt,
      solvedNetProfit,
    };
  }, [targetProfit, shippingMode, buyerShippingCharge, actualLabelCost, itemCost, suppliesCost, instantPay]);

  const handleCopy = () => {
    const text =
      calcMode === 'forward'
        ? `Mercari 2026 Profit Breakdown (SmartRateCalcs):\nListing Price: $${forwardCalc.price.toFixed(2)}\n10% Mercari Seller Fee (on item + buyer shipping): -$${forwardCalc.mercariSellerFee.toFixed(2)}\nPayment Processing Fee: $0.00\nNet Profit (after COGS & supplies): $${forwardCalc.netProfit.toFixed(2)} (${forwardCalc.marginPct.toFixed(1)}% margin)\nCalculated on: https://www.smartratecalcs.com/calculators/mercari-fee-calculator`
        : `Mercari Reverse Listing Target (SmartRateCalcs):\nTo pocket $${targetProfit.toFixed(2)} net profit, list at: $${reverseCalc.solvedPrice.toFixed(2)} (10% Mercari fee = -$${reverseCalc.solvedFee.toFixed(2)}).`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors duration-200">
      {/* Header */}
      <div className="bg-slate-900 dark:bg-slate-950 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
            <i className="fa-solid fa-bag-shopping"></i>
          </div>
          <div>
            <h2 className="text-white font-bold text-sm sm:text-base leading-tight">
              Mercari Seller Fee &amp; Margin Engine
            </h2>
            <p className="text-[11px] text-indigo-300 font-mono">
              2026 Rules: 10% Seller Fee (Item + Shipping) | $0 Processing | 3.6% Buyer Fee
            </p>
          </div>
        </div>

        <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setCalcMode('forward')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              calcMode === 'forward' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            Payout &amp; Profit
          </button>
          <button
            type="button"
            onClick={() => setCalcMode('reverse')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              calcMode === 'reverse' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            Reverse Price Solver
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-5">
          {calcMode === 'forward' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="mer-price" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                  Item Listing Price ($)
                </label>
                <input
                  id="mer-price"
                  type="number"
                  min={0}
                  value={itemPrice}
                  onChange={(e) => setItemPrice(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="mer-cogs" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                  Item Cost / COGS ($)
                </label>
                <input
                  id="mer-cogs"
                  type="number"
                  min={0}
                  value={itemCost}
                  onChange={(e) => setItemCost(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="mer-target" className="block text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase mb-1.5">
                  Target Net Profit ($)
                </label>
                <input
                  id="mer-target"
                  type="number"
                  min={0}
                  value={targetProfit}
                  onChange={(e) => setTargetProfit(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-indigo-500 bg-indigo-50/40 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="mer-cogs-rev" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                  Item Cost / COGS ($)
                </label>
                <input
                  id="mer-cogs-rev"
                  type="number"
                  min={0}
                  value={itemCost}
                  onChange={(e) => setItemCost(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {/* Shipping Selector */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Shipping Setup:</span>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setShippingMode('buyer')}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold font-mono transition ${
                    shippingMode === 'buyer'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Buyer Pays Label
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShippingMode('seller');
                    if (actualLabelCost === 0) setActualLabelCost(7.99);
                  }}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold font-mono transition ${
                    shippingMode === 'seller'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Free Shipping (You Pay)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {shippingMode === 'buyer' ? (
                <div>
                  <label htmlFor="mer-ship-buyer" className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Buyer-Paid Shipping ($)
                  </label>
                  <input
                    id="mer-ship-buyer"
                    type="number"
                    min={0}
                    step="0.01"
                    value={buyerShippingCharge}
                    onChange={(e) => setBuyerShippingCharge(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs font-bold text-slate-900 dark:text-white"
                  />
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono">
                    Mercari charges 10% fee on this too!
                  </span>
                </div>
              ) : (
                <div>
                  <label htmlFor="mer-ship-label" className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Actual Label Cost You Pay ($)
                  </label>
                  <input
                    id="mer-ship-label"
                    type="number"
                    min={0}
                    step="0.01"
                    value={actualLabelCost}
                    onChange={(e) => setActualLabelCost(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>
              )}

              <div>
                <label htmlFor="mer-supplies" className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Packaging / Polybags ($)
                </label>
                <input
                  id="mer-supplies"
                  type="number"
                  min={0}
                  step="0.25"
                  value={suppliesCost}
                  onChange={(e) => setSuppliesCost(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-600 dark:text-slate-300 pt-1">
              <input
                type="checkbox"
                checked={instantPay}
                onChange={(e) => setInstantPay(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Withdraw via Instant Pay (-$3.00 flat fee vs $0.00 Standard Direct Deposit)</span>
            </label>
          </div>
        </div>

        {/* Right Live Output */}
        <div className="lg:col-span-6 space-y-5">
          {calcMode === 'forward' ? (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase text-indigo-400 font-bold block">
                    Real Net Take-Home Profit
                  </span>
                  <div className={`text-3xl sm:text-4xl font-black font-mono ${forwardCalc.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    ${forwardCalc.netProfit.toFixed(2)}
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-xs text-slate-400">Mercari Balance Credit</div>
                  <div className="text-lg font-bold text-white">${forwardCalc.netDeposit.toFixed(2)}</div>
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-rose-300">
                  <span>10.0% Seller Fee (on ${forwardCalc.feeableTotal.toFixed(2)} item + buyer shipping):</span>
                  <span>-${forwardCalc.mercariSellerFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-300">
                  <span>Payment Processing Fee (2026 Eliminated):</span>
                  <span>$0.00</span>
                </div>
                {forwardCalc.sellerLabelPaid > 0 && (
                  <div className="flex justify-between text-rose-300">
                    <span>Free Shipping Label Deducted:</span>
                    <span>-${forwardCalc.sellerLabelPaid.toFixed(2)}</span>
                  </div>
                )}
                {forwardCalc.payoutFee > 0 && (
                  <div className="flex justify-between text-amber-300">
                    <span>Instant Pay Fee:</span>
                    <span>-${forwardCalc.payoutFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800">
                  <span>Inventory Cost + Packaging Supplies:</span>
                  <span>-${(itemCost + suppliesCost).toFixed(2)}</span>
                </div>
              </div>

              {/* Buyer Checkout Transparency Pill */}
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-[11px] font-mono text-indigo-200 flex items-center justify-between">
                <span>Buyer Checkout Total (incl. 3.6% Buyer Protection):</span>
                <strong className="text-white">${forwardCalc.totalBuyerPays.toFixed(2)}</strong>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center font-mono">
                <div className="p-2 rounded-xl bg-white/5">
                  <div className="text-[10px] text-slate-400">Eff. Fee Rate</div>
                  <div className="text-sm font-bold text-indigo-400">{forwardCalc.effectiveSellerRate.toFixed(2)}%</div>
                </div>
                <div className="p-2 rounded-xl bg-white/5">
                  <div className="text-[10px] text-slate-400">Net Margin</div>
                  <div className="text-sm font-bold text-emerald-400">{forwardCalc.marginPct.toFixed(1)}%</div>
                </div>
                <div className="p-2 rounded-xl bg-white/5">
                  <div className="text-[10px] text-slate-400">Item ROI</div>
                  <div className="text-sm font-bold text-cyan-400">{forwardCalc.roiPct.toFixed(1)}%</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-950 text-white border border-indigo-500/40 space-y-4">
              <span className="text-[11px] font-mono uppercase text-indigo-300 font-bold block">
                Required Mercari Listing Price
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white">
                ${reverseCalc.solvedPrice.toFixed(2)}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                List your item at <strong>${reverseCalc.solvedPrice.toFixed(2)}</strong> to clear{' '}
                <strong className="text-emerald-400">${targetProfit.toFixed(2)}</strong> net profit after Mercari&apos;s 10% seller cut (including 10% on buyer-paid shipping), supplies, and COGS.
              </p>
              <div className="space-y-1.5 text-xs font-mono pt-3 border-t border-white/10 text-slate-300">
                <div className="flex justify-between">
                  <span>Solved 10% Seller Fee:</span>
                  <span className="text-rose-300">-${reverseCalc.solvedFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Buyer Sees 3.6% Protection Fee:</span>
                  <span className="text-indigo-300">+${reverseCalc.solvedBuyerProt.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-400 pt-1">
                  <span>Verified Net Profit:</span>
                  <span>${reverseCalc.solvedNetProfit.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Cross-Platform Reseller Comparison */}
          {calcMode === 'forward' && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
              <div className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                Reseller Fee Comparison at ${forwardCalc.price.toFixed(0)} Sale Price
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-indigo-500/40">
                  <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">Mercari</div>
                  <div className="font-bold text-slate-900 dark:text-white">${forwardCalc.mercariSellerFee.toFixed(2)}</div>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-rose-600 dark:text-rose-400 font-bold">Depop (0%)</div>
                  <div className="font-bold text-slate-900 dark:text-white">${forwardCalc.depopFee.toFixed(2)}</div>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">eBay</div>
                  <div className="font-bold text-slate-900 dark:text-white">${forwardCalc.ebayFee.toFixed(2)}</div>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-pink-600 dark:text-pink-400 font-bold">Poshmark</div>
                  <div className="font-bold text-slate-900 dark:text-white">${forwardCalc.poshmarkFee.toFixed(2)}</div>
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
                href="/blog/mercari-seller-fees-2026-flat-10-percent-buyer-fee-margin-guide"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>Read 2026 Mercari Fee Guide</span>
                <span>&rarr;</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
