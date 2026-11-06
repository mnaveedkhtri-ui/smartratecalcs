import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROGRAMMATIC_CALCULATORS } from '../../../data/programmatic-calculators';
import ProgrammaticCalculatorWidget from '../../../components/ProgrammaticCalculatorWidget';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return PROGRAMMATIC_CALCULATORS.map((calc) => ({
    slug: calc.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const calc = PROGRAMMATIC_CALCULATORS.find((c) => c.slug === params.slug);
  if (!calc) return {};

  return {
    title: {
      absolute: `${calc.title} | SmartRateCalcs Embed Widget`,
    },
    description: calc.metaDesc,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://www.smartratecalcs.com/calculators/${calc.slug}`,
    },
  };
}

export default function EmbedCalculatorPage({ params }: Props) {
  const calc = PROGRAMMATIC_CALCULATORS.find((c) => c.slug === params.slug);

  if (!calc) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50/50 p-2 sm:p-4 flex flex-col justify-between">
      <div className="w-full max-w-3xl mx-auto">
        <ProgrammaticCalculatorWidget calc={calc} />
      </div>
      <footer className="py-2 text-center text-[11px] text-slate-400 font-mono">
        Free calculation engine by{' '}
        <a
          href={`https://www.smartratecalcs.com/calculators/${calc.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 hover:text-emerald-700 font-bold underline decoration-emerald-300 underline-offset-2"
        >
          SmartRateCalcs.com
        </a>
      </footer>
    </main>
  );
}
