import { flightDossierRegistryContent as content } from './flightDossierRegistry.content';

const style = {
  emptyState:
    'rounded-3xl border border-dashed border-zinc-300 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900',
  eyebrow:
    'text-xs font-semibold tracking-[0.25em] text-zinc-500 uppercase dark:text-slate-500',
  title: 'mt-3 text-2xl font-semibold',
  description:
    'mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-600 dark:text-slate-400',
} as const;

export function FlightDossierRegistry() {
  return (
    <section className={style.emptyState}>
      <p className={style.eyebrow}>{content.eyebrow}</p>

      <h2 className={style.title}>{content.emptyTitle}</h2>

      <p className={style.description}>{content.emptyDescription}</p>
    </section>
  );
}
