import { FlightApplicationLauncher } from '@/widgets/flight-application-launcher/FlightApplicationLauncher';
import { FlightDossierRegistry } from '@/widgets/flight-dossier-registry/FlightDossierRegistry';
import { RegistryStatusSummary } from '@/widgets/registry-status-summary/RegistryStatusSummary';
import { stellarFlightRegistryPageContent as content } from './stellarFlightRegistryPage.content';

const style = {
  page: 'min-h-screen bg-zinc-100 px-6 py-10 text-zinc-950 dark:bg-slate-950 dark:text-zinc-100',
  container: 'mx-auto flex max-w-5xl flex-col gap-8',
  hero: 'rounded-3xl border border-zinc-300 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900',
  heroEyebrow:
    'text-sm font-semibold tracking-[0.3em] text-amber-700 uppercase dark:text-amber-400',
  heroTitle: 'mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl',
  heroDescription:
    'mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-slate-400',
} as const;

export function StellarFlightRegistryPage() {
  const { hero } = content;

  return (
    <main className={style.page}>
      <section className={style.container}>
        <header className={style.hero}>
          <p className={style.heroEyebrow}>{hero.eyebrow}</p>

          <h1 className={style.heroTitle}>{hero.title}</h1>

          <p className={style.heroDescription}>{hero.description}</p>
        </header>

        <RegistryStatusSummary />
        <FlightApplicationLauncher />
        <FlightDossierRegistry />
      </section>
    </main>
  );
}
