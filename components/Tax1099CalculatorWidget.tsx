'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export default function Tax1099CalculatorWidget({ isStandalone = false }: { isStandalone?: boolean }) {
  const [grossIncome, setGrossIncome] = useState<number>(85000);
  const [expenses, setExpenses] = useState<number>(12000);
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');
  const [copied, setCopied] = useState<boolean>(false);

  const {
    netProfit,
    taxableSE,
    socialSecurityTax,
    medicareTax,
    totalSETax,
    seDeduction,
    estimatedFederalTax,
    totalTaxLiability,
    quarterlyEstimate,
    w2EquivalentSalary,
    effectiveTaxRate,
  } = useMemo(() => {
    const profit = Math.max(0, grossIncome - expenses);
    // IRS Schedule SE: 92.35% of net profit is subject to SE tax
    const seTaxable = profit * 0.9235;

    // 2026 Social Security wage cap is $168,600 at 12.4%
    const ssCap = 168600;
    const ssTaxable = Math.min(seTaxable, ssCap);
    const ssTax = ssTaxable * 0.124;

    // Medicare is 2.9% with no ceiling
    const medTax = seTaxable * 0.029;

    const totalSE = ssTax + medTax;
    // 50% of SE tax is deductible above-the-line from income
    const halfSE = totalSE * 0.5;

    // 2026 Standard Deduction estimate
    const stdDeduction = filingStatus === 'single' ? 14600 : 29200;
    const taxableIncome = Math.max(0, profit - halfSE - stdDeduction);

    // Simplified 2026 Federal Progressive Income Tax Brackets (Single)
    let fedTax = 0;
    if (filingStatus === 'single') {
      if (taxableIncome > 100525) {
        fedTax = 17400 + (taxableIncome - 100525) * 0.24;
      } else if (taxableIncome > 47150) {
        fedTax = 5426 + (taxableIncome - 47150) * 0.22;
      } else if (taxableIncome > 11600) {
        fedTax = 1160 + (taxableIncome - 11600) * 0.12;
      } else {
        fedTax = taxableIncome * 0.10;
      }
    } else {
      if (taxableIncome > 201050) {
        fedTax = 34800 + (taxableIncome - 201050) * 0.24;
      } else if (taxableIncome > 94300) {
        fedTax = 10852 + (taxableIncome - 94300) * 0.22;
      } else if (taxableIncome > 23200) {
        fedTax = 2320 + (taxableIncome - 23200) * 0.12;
      } else {
        fedTax = taxableIncome * 0.10;
      }
    }

    const totalTaxes = totalSE + fedTax;
    const quarterly = totalTaxes / 4;
    const effective = profit > 0 ? (totalTaxes / profit) * 100 : 0;

    // W-2 Equivalent: On W-2, employer pays half of FICA (7.65%), so a contractor needs ~15% higher gross to break even
    const w2Equiv = profit * 0.85;

    return {
      netProfit: profit,
      taxableSE: seTaxable,
      socialSecurityTax: ssTax,
      medicareTax: medTax,
      totalSETax: totalSE,
      seDeduction: halfSE,
      estimatedFederalTax: fedTax,
      totalTaxLiability: totalTaxes,
      quarterlyEstimate: quarterly,
      w2EquivalentSalary: w2Equiv,
      effectiveTaxRate: effective,
    };
  }, [grossIncome, expenses, filingStatus]);

  const handleCopy = () => {
    const text = `1099 Contractor Tax Estimate:
Gross 1099 Income: $${grossIncome.toLocaleString()}
Business Deductions: -$${expenses.toLocaleString()}
Net Schedule C Profit: $${netProfit.toLocaleString()}
-----------------------------------
Self-Employment Tax (15.3%): $${Math.round(totalSETax).toLocaleString()}
- Social Security (12.4%): $${Math.round(socialSecurityTax).toLocaleString()}
- Medicare (2.9%): $${Math.round(medicareTax).toLocaleString()}
Estimated Federal Income Tax: $${Math.round(estimatedFederalTax).toLocaleString()}
Total Estimated Tax Liability: $${Math.round(totalTaxLiability).toLocaleString()}
Quarterly Estimated Payment (1040-ES): $${Math.round(quarterlyEstimate).toLocaleString()}/qtr
Effective Tax Rate: ${effectiveTaxRate.toFixed(1)}%
W-2 Equivalent Salary: $${Math.round(w2EquivalentSalary).toLocaleString()}
Calculated on SmartRateCalcs.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xs">
              <i className="fa-solid fa-file-invoice-dollar"></i>
            </span>
            US 1099 Self-Employment &amp; Quarterly Tax Calculator (2026)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Calculate IRS Schedule C self-employment tax (15.3%), federal income tax, and quarterly estimated payments.
          </p>
        </div>

        {/* Filing Status Toggle */}
        <div className="inline-flex rounded-xl bg-slate-200 dark:bg-slate-700/80 p-1 self-start sm:self-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => setFilingStatus('single')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              filingStatus === 'single'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Single Filer
          </button>
          <button
            type="button"
            onClick={() => setFilingStatus('married')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              filingStatus === 'married'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Married Filing Jointly
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Gross Annual 1099 Income (USD)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-mono text-base">
                $
              </span>
              <input
                type="number"
                min="0"
                step="1000"
                value={grossIncome}
                onChange={(e) => setGrossIncome(parseFloat(e.target.value) || 0)}
                className="w-full pl-9 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-bold text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="85000"
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Total 1099-NEC &amp; 1099-K contractor earnings.</span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Annual Business Deductions / Expenses
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-mono text-base">
                $
              </span>
              <input
                type="number"
                min="0"
                step="500"
                value={expenses}
                onChange={(e) => setExpenses(parseFloat(e.target.value) || 0)}
                className="w-full pl-9 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-bold text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="12000"
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Home office, software, equipment, travel, health insurance.</span>
          </div>
        </div>

        {/* Results Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 shadow-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[11px] font-bold text-slate-400 uppercase font-mono block mb-1">
                Net Schedule C Profit
              </span>
              <div className="font-mono font-black text-2xl text-white">
                ${netProfit.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Gross minus expenses</span>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[11px] font-bold text-amber-400 uppercase font-mono block mb-1">
                Self-Employment Tax (15.3%)
              </span>
              <div className="font-mono font-black text-2xl text-amber-400">
                ${Math.round(totalSETax).toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                SS: ${Math.round(socialSecurityTax).toLocaleString()} | Med: ${Math.round(medicareTax).toLocaleString()}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[11px] font-bold text-rose-400 uppercase font-mono block mb-1">
                Total Est. Tax Liability
              </span>
              <div className="font-mono font-black text-2xl text-rose-400">
                ${Math.round(totalTaxLiability).toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {effectiveTaxRate.toFixed(1)}% effective rate
              </span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <span className="text-[11px] font-bold text-emerald-400 uppercase font-mono block mb-1">
                Quarterly Estimated (1040-ES)
              </span>
              <div className="font-mono font-black text-2xl text-emerald-400">
                ${Math.round(quarterlyEstimate).toLocaleString()}
              </div>
              <span className="text-[10px] text-emerald-300/80 font-mono">Pay quarterly to avoid penalty</span>
            </div>
          </div>

          {/* W-2 Equivalent Callout */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <div>
              <span className="text-slate-400">W-2 Salary Equivalent: </span>
              <strong className="text-emerald-400">${Math.round(w2EquivalentSalary).toLocaleString()} W-2 salary</strong>
              <span className="text-slate-400 text-[11px] block sm:inline sm:ml-2">
                (A $85k contractor takes home roughly the same as a ${Math.round(w2EquivalentSalary).toLocaleString()} W-2 employee due to employer-paid taxes and benefits).
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5"
            >
              <i className={`fa-solid ${copied ? 'fa-check text-white' : 'fa-copy'}`}></i>
              <span>{copied ? 'Copied Estimate!' : 'Copy Tax Summary'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
