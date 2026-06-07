import { flightApplicationLauncherContent as content } from './flightApplicationLauncher.content';

const style = {
  panel:
    'rounded-3xl border border-zinc-300 bg-white p-6 dark:border-slate-800 dark:bg-slate-900',
  eyebrow:
    'text-xs font-semibold tracking-[0.25em] text-amber-700 uppercase dark:text-amber-400',
  title: 'mt-3 text-2xl font-semibold',
  description:
    'mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-slate-400',
  actions: 'mt-6 flex flex-col gap-3 sm:flex-row',
  legacyButton:
    'rounded-xl border border-zinc-300 px-5 py-3 text-sm font-semibold transition hover:border-amber-600 hover:text-amber-700 dark:border-slate-700 dark:hover:border-amber-400 dark:hover:text-amber-400',
  assistedButton:
    'rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400',
} as const;

export function FlightApplicationLauncher() {
  return (
    <section className={style.panel}>
      <div>
        <p className={style.eyebrow}>{content.eyebrow}</p>

        <h2 className={style.title}>{content.title}</h2>

        <p className={style.description}>{content.description}</p>
      </div>

      <div className={style.actions}>
        <button className={style.legacyButton} type="button">
          {content.legacyButtonLabel}
        </button>

        <button className={style.assistedButton} type="button">
          {content.assistedButtonLabel}
        </button>
      </div>
    </section>
  );
}
