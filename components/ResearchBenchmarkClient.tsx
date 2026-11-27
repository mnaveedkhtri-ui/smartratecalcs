'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { FEE_BENCHMARKS_2026, computeBenchmarkSample, FeeBenchmarkRecord } from '../data/fee-benchmark-2026';
import { Check, Copy, Code2, Calculator, ExternalLink } from 'lucide-react';

const EMBED_OPTIONS = [
  { label: 'Reverb Fee Calculator', slug: 'reverb-fee-calculator' },
  { label: 'Mercari Fee Calculator', slug: 'mercari-fee-calculator' },
  { label: 'Venmo Business Fee Calculator', slug: 'venmo-business-fee-calculator' },
  { label: 'eBay Fee Calculator', slug: 'ebay-fee-calculator' },
  { label: 'Etsy Fee Calculator', slug: 'etsy-fee-calculator' },
  { label: 'Amazon FBA Calculator', slug: 'amazon-fba-fee-calculator' },
];

export default function ResearchBenchmarkClient() {
  const [grossAmount, setGrossAmount] = useState<number>(250);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedEmbed, setSelectedEmbed] = useState<string>('reverb-fee-calculator');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Marketplaces', 'Payment Gateways', 'Freelance & Cross-Border'];

  const rows = useMemo(() => {
    const safeGross = Number.isFinite(grossAmount) && grossAmount > 0 ? grossAmount : 100;
    return FEE_BENCHMARKS_2026.filter(
      (item) => categoryFilter === 'All' || item.category === categoryFilter
    ).map((item: FeeBenchmarkRecord) => ({
      ...item,
      sample: computeBenchmarkSample(item, safeGross),
    }));
  }, [grossAmount, categoryFilter]);

  const safeGrossLabel = Number.isFinite(grossAmount) && grossAmount > 0 ? grossAmount : 100;

  const htmlCitation = `<p>Source: <a href="https://www.smartratecalcs.com/research/2026-marketplace-fee-index" rel="noopener">SmartRateCalcs 2026 Marketplace &amp; Freelance Fee Benchmark Index</a> (CC BY 4.0 Open Dataset).</p>`;
  const markdownCitation = `[SmartRateCalcs 2026 Marketplace & Freelance Fee Benchmark Index](https://www.smartratecalcs.com/research/2026-marketplace-fee-index)`;
  const iframeSnippet = `<iframe src="https://www.smartratecalcs.com/embed/${selectedEmbed}" width="100%" height="580" style="border:1px solid #e2e8f0;border-radius:12px;" loading="lazy" title="SmartRateCalcs 2026 Fee Calculator"></iframe>\n<p style="font-size:12px;margin-top:6px;">Powered by <a href="https://www.smartratecalcs.com/calculators/${selectedEmbed}">SmartRateCalcs.com</a></p>`;

  const copyText = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2200);
    } catch {
      // Clipboard blocked in non-HTTPS contexts
    }
  };

  return (
    <div className="space-y-10">
      {/* Interactive Simulator Controls */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div className="space-y-2">
            <label htmlFor="benchmark-gross" className="block text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Live Benchmark Order / Invoice Amount (USD)
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400">$</span>
                <input
                  id="benchmark-gross"
                  type="number"
                  min={1}
                  max={1000000}
                  value={grossAmount}
                  onChange={(e) => setGrossAmount(Number(e.target.value) || 0)}
                  className="w-40 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-8 pr-3 py-2 font-mono text-sm font-bold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
              {[100, 250, 1000, 5000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setGrossAmount(preset)}
                  className={`rounded-lg px-3 py-2 text-xs font-mono font-bold border transition ${
                    grossAmount === preset
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                  }`}
                >
                  ${preset.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`rounded-xl px-3.5 py-2 text-xs font-semibold border transition ${
                  categoryFilter === cat
                    ? 'bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 border-slate-900 dark:border-emerald-500'
                    : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Benchmark Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3 pr-4">Platform</th>
                <th className="py-3 px-3">2026 Fee Schedule</th>
                <th className="py-3 px-3 text-right">Fee on ${safeGrossLabel.toLocaleString()}</th>
                <th className="py-3 px-3 text-right">Net Payout</th>
                <th className="py-3 px-3 text-right">Effective Cut</th>
                <th className="py-3 pl-3 text-right">Gross Needed to Keep ${safeGrossLabel.toLocaleString()}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition">
                  <td className="py-3.5 pr-4">
                    <Link
                      href={row.calculatorPath}
                      className="font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 inline-flex items-center gap-1"
                    >
                      <span>{row.platform}</span>
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </Link>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{row.category}</div>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-xs text-slate-700 dark:text-slate-300">
                    {row.feeFormulaLabel}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-semibold text-rose-600 dark:text-rose-400">
                    -${row.sample.totalFeeUsd.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    ${row.sample.netPayoutUsd.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-slate-700 dark:text-slate-300">
                    {row.sample.effectiveTakeRatePct.toFixed(2)}%
                  </td>
                  <td className="py-3.5 pl-3 text-right font-mono font-bold text-slate-900 dark:text-white">
                    ${row.sample.reverseGrossForTargetNetUsd.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cite This Dataset & Free Calculator Embed Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
            <Code2 className="h-4 w-4" />
            <h2>Cite This 2026 Dataset (CC BY 4.0)</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Journalists, newsletter authors, and financial researchers may freely cite or republish figures from this dataset with attribution back to this canonical benchmark study.
          </p>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase text-slate-500 mb-1">
                <span>HTML Attribution Snippet</span>
                <button
                  type="button"
                  onClick={() => copyText('html', htmlCitation)}
                  className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {copiedId === 'html' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedId === 'html' ? 'Copied' : 'Copy HTML'}</span>
                </button>
              </div>
              <pre className="rounded-xl bg-slate-950 text-emerald-300 p-3 text-[11px] font-mono overflow-x-auto">{htmlCitation}</pre>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase text-slate-500 mb-1">
                <span>Markdown Citation</span>
                <button
                  type="button"
                  onClick={() => copyText('md', markdownCitation)}
                  className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {copiedId === 'md' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedId === 'md' ? 'Copied' : 'Copy Markdown'}</span>
                </button>
              </div>
              <pre className="rounded-xl bg-slate-950 text-sky-300 p-3 text-[11px] font-mono overflow-x-auto">{markdownCitation}</pre>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
            <Calculator className="h-4 w-4" />
            <h2>Embed Free Calculator on Your Blog or Docs</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Embed any live SmartRateCalcs 2026 fee engine inside Notion, Ghost, WordPress, or documentation pages with zero API keys.
          </p>

          <div>
            <label htmlFor="embed-select" className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
              Select Calculator Widget
            </label>
            <select
              id="embed-select"
              value={selectedEmbed}
              onChange={(e) => setSelectedEmbed(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white"
            >
              {EMBED_OPTIONS.map((opt) => (
                <option key={opt.slug} value={opt.slug}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between text-[11px] font-bold uppercase text-slate-500 mb-1">
              <span>Responsive Iframe Snippet</span>
              <button
                type="button"
                onClick={() => copyText('iframe', iframeSnippet)}
                className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {copiedId === 'iframe' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copiedId === 'iframe' ? 'Copied' : 'Copy Embed Code'}</span>
              </button>
            </div>
            <pre className="rounded-xl bg-slate-950 text-amber-300 p-3 text-[11px] font-mono overflow-x-auto whitespace-pre-wrap">{iframeSnippet}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
