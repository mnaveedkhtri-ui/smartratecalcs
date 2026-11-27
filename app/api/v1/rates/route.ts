import { NextRequest, NextResponse } from 'next/server';
import { FEE_BENCHMARKS_2026, computeBenchmarkSample } from '../../../../data/fee-benchmark-2026';

export const dynamic = 'force-dynamic';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const platformQuery = (searchParams.get('platform') || '').trim().toLowerCase();
  const categoryQuery = (searchParams.get('category') || '').trim().toLowerCase();
  const rawAmount = Number(searchParams.get('amount') || '100');
  const amountUsd = Number.isFinite(rawAmount) && rawAmount > 0 && rawAmount <= 10000000 ? rawAmount : 100;

  let records = FEE_BENCHMARKS_2026;
  if (platformQuery) {
    records = records.filter(
      (r) => r.id.toLowerCase().includes(platformQuery) || r.platform.toLowerCase().includes(platformQuery)
    );
  }
  if (categoryQuery) {
    records = records.filter((r) => r.category.toLowerCase().includes(categoryQuery));
  }

  const enriched = records.map((r) => ({
    ...r,
    calculatorUrl: `https://www.smartratecalcs.com${r.calculatorPath}`,
    sampleAtAmountUsd: {
      grossUsd: amountUsd,
      ...computeBenchmarkSample(r, amountUsd),
    },
  }));

  return NextResponse.json(
    {
      apiVersion: '1.0',
      dataset: 'SmartRateCalcs 2026 Marketplace, Payment Gateway & Freelance Fee Index',
      license: 'https://creativecommons.org/licenses/by/4.0/',
      canonicalStudy: 'https://www.smartratecalcs.com/research/2026-marketplace-fee-index',
      openApiSpec: 'https://www.smartratecalcs.com/openapi.json',
      reversePricingFormula: 'Gross = (TargetNet + FixedFee) / (1 - TotalPercentRate)',
      amountEvaluatedUsd: amountUsd,
      count: enriched.length,
      platforms: enriched,
    },
    { status: 200, headers: CORS_HEADERS }
  );
}
