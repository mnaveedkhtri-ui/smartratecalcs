import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROGRAMMATIC_CALCULATORS } from '../../../data/programmatic-calculators';
import ProgrammaticCalculatorWidget from '../../../components/ProgrammaticCalculatorWidget';

interface Props {
  params: {
    slug: string;
  };
}

const EXCLUDED_SLUGS = new Set([
  'upwork-to-jazzcash-payout-calculator',
  'ebay-seller-fee-and-profit-calculator',
  'amazon-fba-profit-margin-calculator',
  'etsy-seller-fee-and-profit-calculator',
  'poshmark-seller-fee-calculator',
  'cash-app-business-fee-calculator',
  'venmo-business-fee-calculator',
  'fiverr-commission-fee-calculator',
  'paypal-goods-and-services-fee-calculator',
  'remitly-to-pakistan-fee-calculator',
  'upwork-service-fee-payout-calculator',
  'wise-to-bdo-bank-php-calculator',
  'payoneer-to-gcash-philippines-calculator',
]);

export async function generateStaticParams() {
  return PROGRAMMATIC_CALCULATORS
    .filter((calc) => !EXCLUDED_SLUGS.has(calc.slug))
    .map((calc) => ({
      slug: calc.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (EXCLUDED_SLUGS.has(params.slug)) return {};
  const calc = PROGRAMMATIC_CALCULATORS.find((c) => c.slug === params.slug);
  if (!calc) return {};

  return {
    title: {
      absolute: `${calc.title} | SmartRateCalcs Embed Widget`,
    },
    description: calc.metaDesc,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `https://www.smartratecalcs.com/calculators/${calc.slug}`,
    },
  };
}

export default function EmbedCalculatorPage({ params }: Props) {
  if (EXCLUDED_SLUGS.has(params.slug)) notFound();
  const calc = PROGRAMMATIC_CALCULATORS.find((c) => c.slug === params.slug);

  if (!calc) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-2 sm:p-4 flex flex-col justify-between transition-colors duration-200">
      <div className="w-full max-w-3xl mx-auto">
        <ProgrammaticCalculatorWidget calc={calc} />
      </div>
      <footer className="py-2 text-center text-[11px] text-slate-400 dark:text-slate-500 font-mono">
        Free calculation engine by{' '}
        <a
          href={`https://www.smartratecalcs.com/calculators/${calc.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 font-bold underline decoration-emerald-300 dark:decoration-emerald-700 underline-offset-2"
        >
          SmartRateCalcs.com
        </a>
      </footer>
    </main>
  );
}
