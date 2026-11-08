'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface TaxPreset {
  name: string;
  pct: number;
  description: string;
}

const TAX_PRESETS: Record<string, TaxPreset> = {
  pk_pseb: {
    name: 'Pakistan PSEB Export (0.25%)',
    pct: 0.25,
    description: 'FBR Section 154A final tax regime for registered IT exporters.',
  },
  pk_non_pseb: {
    name: 'Pakistan Non-PSEB (1.00%)',
    pct: 1.0,
    description: 'FBR Section 154A tax for non-PSEB registered freelance banking.',
  },
  in_presumptive: {
    name: 'India 44ADA Presumptive (~8.0%)',
    pct: 8.0,
    description: 'Presumptive taxation scheme for professionals in India.',
  },
  global_standard: {
    name: 'Global Standard Tax Reserve (15.0%)',
    pct: 15.0,
    description: 'Recommended general tax buffer for international independent contractors.',
  },
  us_eu_selfemployed: {
    name: 'US / UK / EU Self-Employment (25.0%)',
    pct: 25.0,
    description: 'Standard self-employment and income tax reserve for Western jurisdictions.',
  },
};

interface PlatformFeePreset {
  name: string;
  pct: number;
  description: string;
}

const PLATFORM_PRESETS: Record<string, PlatformFeePreset> = {
  direct_wire: {
    name: 'Direct Client (Wise / Bank Wire - 0%)',
    pct: 0.0,
    description: 'Direct contractor invoicing with zero platform deductions.',
  },
  direct_stripe: {
    name: 'Direct via Stripe Invoice (2.9%)',
    pct: 2.9,
    description: 'Credit card invoice processing deduction.',
  },
  upwork: {
    name: 'Upwork (10.0% Flat)',
    pct: 10.0,
    description: 'Standard 10% Upwork freelancer service cut.',
  },
  fiverr: {
    name: 'Fiverr (20.0% Cut)',
    pct: 20.0,
    description: 'Standard 20% Fiverr seller marketplace fee.',
  },
};

export default function FreelanceRateCalculatorWidget({ isStandalone = false }: { isStandalone?: boolean }) {
  // Inputs
  const [netMonthlyIncome, setNetMonthlyIncome] = useState<number>(3500);
  const [monthlyOverhead, setMonthlyOverhead] = useState<number>(350);
  const [taxPreset, setTaxPreset] = useState<string>('pk_pseb');
  const [customTaxPct, setCustomTaxPct] = useState<number>(0.25);
  const [useCustomTax, setUseCustomTax] = useState<boolean>(false);
  const [platformPreset, setPlatformPreset] = useState<string>('direct_wire');
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(25);
  const [workingWeeksPerYear, setWorkingWeeksPerYear] = useState<number>(48);
  const [nonBillablePct, setNonBillablePct] = useState<number>(30); // 30% time spent on marketing/admin
  const [copied, setCopied] = useState<boolean>(false);
  const [pitchCopied, setPitchCopied] = useState<boolean>(false);

  const activeTaxRate = useCustomTax ? customTaxPct : (TAX_PRESETS[taxPreset]?.pct ?? 0.25);
  const activePlatform = PLATFORM_PRESETS[platformPreset] || PLATFORM_PRESETS.direct_wire;

  // Mathematical Calculation Engine
  const {
    annualNetTakeHome,
    annualOverhead,
    annualSubtotalBeforeTax,
    annualTaxAmount,
    annualGrossRequiredBeforePlatform,
    annualPlatformFees,
    totalGrossAnnualBilling,
    totalAnnualBillableHours,
    baseBreakEvenHourlyRate,
    recommendedTargetHourlyRate,
    premiumValueHourlyRate,
    dayRate7Hours,
    weeklyBillingTarget,
    monthlyRetainerTarget,
    totalWorkingHoursWeekly,
  } = useMemo(() => {
    const annualNet = Math.max(0, netMonthlyIncome) * 12;
    const annualOver = Math.max(0, monthlyOverhead) * 12;
    const subtotal = annualNet + annualOver;

    // Gross needed before taxes: Subtotal / (1 - taxRate / 100)
    const taxFactor = 1 - activeTaxRate / 100;
    const grossBeforePlatform = taxFactor > 0 ? subtotal / taxFactor : subtotal;
    const taxes = grossBeforePlatform - subtotal;

    // Gross needed after platform fee: grossBeforePlatform / (1 - platformCut / 100)
    const platFactor = 1 - activePlatform.pct / 100;
    const grossTotal = platFactor > 0 ? grossBeforePlatform / platFactor : grossBeforePlatform;
    const platformCut = grossTotal - grossBeforePlatform;

    // Hours calculation:
    // Total working hours = billable / (1 - nonBillablePct/100)
    const billableHrsPerWeek = Math.max(1, billableHoursPerWeek);
    const weeksYear = Math.max(1, Math.min(52, workingWeeksPerYear));
    const annualBillableHours = billableHrsPerWeek * weeksYear;

    const baseRate = annualBillableHours > 0 ? grossTotal / annualBillableHours : 0;
    const targetRate = baseRate * 1.15; // 15% profit buffer
    const premiumRate = baseRate * 1.35; // 35% growth/agency rate

    const dayRate = targetRate * 7;
    const weeklyTarget = weeksYear > 0 ? grossTotal / weeksYear : 0;
    const monthlyRetainer = grossTotal / 12;

    const nonBillFactor = 1 - nonBillablePct / 100;
    const totalWeeklyHrs = nonBillFactor > 0 ? billableHrsPerWeek / nonBillFactor : billableHrsPerWeek;

    return {
      annualNetTakeHome: annualNet,
      annualOverhead: annualOver,
      annualSubtotalBeforeTax: subtotal,
      annualTaxAmount: taxes,
      annualGrossRequiredBeforePlatform: grossBeforePlatform,
      annualPlatformFees: platformCut,
      totalGrossAnnualBilling: grossTotal,
      totalAnnualBillableHours: annualBillableHours,
      baseBreakEvenHourlyRate: baseRate,
      recommendedTargetHourlyRate: targetRate,
      premiumValueHourlyRate: premiumRate,
      dayRate7Hours: dayRate,
      weeklyBillingTarget: weeklyTarget,
      monthlyRetainerTarget: monthlyRetainer,
      totalWorkingHoursWeekly: totalWeeklyHrs,
    };
  }, [
    netMonthlyIncome,
    monthlyOverhead,
    activeTaxRate,
    activePlatform,
    billableHoursPerWeek,
    workingWeeksPerYear,
    nonBillablePct,
  ]);

  const handleCopySummary = () => {
    const text = `Freelance Rate Architecture (SmartRateCalcs.com):
- Target Take-Home: $${netMonthlyIncome.toLocaleString()} / mo ($${annualNetTakeHome.toLocaleString()} / yr)
- Monthly Expenses: $${monthlyOverhead.toLocaleString()} / mo
- Tax Reserve: ${activeTaxRate}% ($${annualTaxAmount.toFixed(0)} / yr)
- Platform Buffer: ${activePlatform.name}
- Billable Capacity: ${billableHoursPerWeek} hrs/week (${workingWeeksPerYear} weeks/yr)
---
RECOMMENDED HOURLY RATE: $${Math.round(recommendedTargetHourlyRate)} / hr
BASE BREAK-EVEN RATE: $${Math.round(baseBreakEvenHourlyRate)} / hr
PREMIUM VALUE RATE: $${Math.round(premiumValueHourlyRate)} / hr
DAY RATE (7h): $${Math.round(dayRate7Hours)} / day
MONTHLY RETAINER: $${Math.round(monthlyRetainerTarget).toLocaleString()} / mo
Calculated at https://www.smartratecalcs.com/freelance-hourly-rate-calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPitch = () => {
    const text = `Hi [Client Name],
Thanks for reaching out! For this scope, my standard consulting rate is $${Math.round(recommendedTargetHourlyRate)}/hour, or alternatively, a dedicated weekly sprint retainer of $${Math.round(weeklyBillingTarget)}/week (covering up to ${billableHoursPerWeek} focused production hours with guaranteed turnaround). Let me know which model fits your roadmap best!`;

    navigator.clipboard.writeText(text);
    setPitchCopied(true);
    setTimeout(() => setPitchCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden mb-12">
      {/* Widget Header Banner */}
      <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
            <i className="fa-solid fa-business-time"></i>
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
              Freelance Hourly Rate Architect
              <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                2026 Engine
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Factor in non-billable hours, taxes, software overhead, and platform cuts
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopySummary}
          className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
        >
          <i className={`fa-solid ${copied ? 'fa-check text-emerald-500' : 'fa-copy'}`}></i>
          {copied ? 'Copied!' : 'Copy Summary'}
        </button>
      </div>

      <div className="p-4 sm:p-8 space-y-8">
        {/* Step 1: Financial Targets */}
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold mb-3 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">1</span>
            Target Income &amp; Operating Expenses
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Desired Net Take-Home Salary (Monthly)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-lg font-bold text-slate-400 font-mono">$</span>
                <input
                  type="number"
                  min={200}
                  max={100000}
                  step={100}
                  value={netMonthlyIncome}
                  onChange={(e) => setNetMonthlyIncome(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-16 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-lg font-bold font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
                <span className="absolute right-3.5 text-xs font-mono text-slate-400">/ month</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Personal living expenses, savings, and discretionary income.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Business Overhead &amp; Software (Monthly)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-lg font-bold text-slate-400 font-mono">$</span>
                <input
                  type="number"
                  min={0}
                  max={20000}
                  step={50}
                  value={monthlyOverhead}
                  onChange={(e) => setMonthlyOverhead(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-16 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-lg font-bold font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
                <span className="absolute right-3.5 text-xs font-mono text-slate-400">/ month</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Subscriptions (ChatGPT, Adobe, Figma), hardware, co-working, internet.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: Time Capacity & Non-Billable Hours */}
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold mb-3 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">2</span>
            Billable Working Capacity
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Billable Hours Per Week
              </label>
              <input
                type="number"
                min={5}
                max={60}
                value={billableHoursPerWeek}
                onChange={(e) => setBillableHoursPerWeek(Number(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-base font-bold font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
              <p className="text-[11px] text-slate-500">
                Industry average: 20-30 productive hours/wk.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Working Weeks Per Year
              </label>
              <input
                type="number"
                min={20}
                max={52}
                value={workingWeeksPerYear}
                onChange={(e) => setWorkingWeeksPerYear(Number(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-base font-bold font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
              <p className="text-[11px] text-slate-500">
                48 weeks = 4 weeks for sick days &amp; vacations.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Non-Billable Work % ({nonBillablePct}%)
              </label>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={nonBillablePct}
                onChange={(e) => setNonBillablePct(Number(e.target.value) || 0)}
                className="w-full accent-emerald-600 mt-2 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>10% (Low Admin)</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{nonBillablePct}%</span>
                <span>50% (High Lead Gen)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Taxes and Platform Deductions */}
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold mb-3 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">3</span>
            Taxes &amp; Platform Channels
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Tax &amp; Government Withholding Buffer
              </label>
              <select
                value={useCustomTax ? 'custom' : taxPreset}
                onChange={(e) => {
                  if (e.target.value === 'custom') {
                    setUseCustomTax(true);
                  } else {
                    setUseCustomTax(false);
                    setTaxPreset(e.target.value);
                  }
                }}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {Object.entries(TAX_PRESETS).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.name}
                  </option>
                ))}
                <option value="custom">Custom Tax Rate...</option>
              </select>

              {useCustomTax && (
                <div className="relative flex items-center pt-1">
                  <input
                    type="number"
                    min={0}
                    max={60}
                    step={0.5}
                    value={customTaxPct}
                    onChange={(e) => setCustomTaxPct(Number(e.target.value) || 0)}
                    placeholder="Enter tax %"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                  <span className="absolute right-3.5 text-xs font-mono text-slate-400">%</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Primary Client Channel / Platform Cut
              </label>
              <select
                value={platformPreset}
                onChange={(e) => setPlatformPreset(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {Object.entries(PLATFORM_PRESETS).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.name}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500">
                {activePlatform.description}
              </p>
            </div>
          </div>
        </div>

        {/* ================= PRIMARY PRICING TIERS DISPLAY ================= */}
        <div className="pt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tier 1: Break-even */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Floor Minimum
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Break-Even Rate
                </h4>
                <div className="text-3xl font-extrabold font-mono text-slate-700 dark:text-slate-300 mb-2">
                  ${Math.round(baseBreakEvenHourlyRate)} <span className="text-sm font-normal text-slate-400">/ hr</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Covers basic expenses, taxes, and take-home. Never bill below this number.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-400">
                Day: ${Math.round(baseBreakEvenHourlyRate * 7)} &bull; 0% Profit Buffer
              </div>
            </div>

            {/* Tier 2: Recommended (Hero) */}
            <div className="p-6 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/40 border-2 border-emerald-500 relative overflow-hidden shadow-lg flex flex-col justify-between">
              <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-bl-lg font-mono">
                Recommended Target
              </div>
              <div>
                <div className="text-[10px] font-mono font-bold uppercase text-emerald-700 dark:text-emerald-400 mb-1">
                  Target Quote
                </div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                  Recommended Hourly Rate
                </h4>
                <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-600 dark:text-emerald-400 mb-2">
                  ${Math.round(recommendedTargetHourlyRate)}{' '}
                  <span className="text-sm font-normal text-slate-500">/ hr</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  Includes a healthy 15% profit cushion for emergency fund and business reinvestment.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-200 dark:border-emerald-800 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 flex justify-between">
                <span>Day (7h): ${Math.round(dayRate7Hours)}</span>
                <span>Mo: ${Math.round(monthlyRetainerTarget).toLocaleString()}</span>
              </div>
            </div>

            {/* Tier 3: Premium Value */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono font-bold uppercase text-indigo-600 dark:text-indigo-400 mb-1">
                  Agency / High Value
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Premium Value Rate
                </h4>
                <div className="text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400 mb-2">
                  ${Math.round(premiumValueHourlyRate)} <span className="text-sm font-normal text-slate-400">/ hr</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Ideal for urgent turnarounds, enterprise projects, and consultative expertise.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-400">
                Day: ${Math.round(premiumValueHourlyRate * 7)} &bull; 35% Agency Margin
              </div>
            </div>
          </div>

          {/* Revenue Waterfall Breakdown Box */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-chart-pie text-emerald-600"></i>
              Annual Gross Revenue Waterfall Breakdown
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px] font-mono">1. Desired Take-Home</span>
                <span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  ${annualNetTakeHome.toLocaleString()}
                </span>
                <span className="block text-[10px] text-slate-400 mt-0.5">Your personal salary</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px] font-mono">2. Operating Overhead</span>
                <span className="text-base font-bold font-mono text-slate-800 dark:text-slate-200">
                  ${annualOverhead.toLocaleString()}
                </span>
                <span className="block text-[10px] text-slate-400 mt-0.5">Tools, apps &amp; hardware</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px] font-mono">3. Tax Withholding</span>
                <span className="text-base font-bold font-mono text-amber-600 dark:text-amber-400">
                  ${Math.round(annualTaxAmount).toLocaleString()}
                </span>
                <span className="block text-[10px] text-slate-400 mt-0.5">Gov tax buffer ({activeTaxRate}%)</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px] font-mono">4. Total Gross Target</span>
                <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                  ${Math.round(totalGrossAnnualBilling).toLocaleString()}
                </span>
                <span className="block text-[10px] text-slate-400 mt-0.5">Invoiced per year</span>
              </div>
            </div>

            {/* Quick Pitch Template Generator */}
            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Ready to send a proposal to a client?
                </span>
                <p className="text-[11px] text-slate-500">
                  Quote <strong>${Math.round(recommendedTargetHourlyRate)}/hr</strong> or a guaranteed weekly sprint of <strong>${Math.round(weeklyBillingTarget)}/week</strong>.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyPitch}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0 transition-colors flex items-center gap-1.5"
              >
                <i className={`fa-solid ${pitchCopied ? 'fa-check' : 'fa-paper-plane'}`}></i>
                {pitchCopied ? 'Proposal Pitch Copied!' : 'Copy Client Pitch'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
