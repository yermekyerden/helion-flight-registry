import { assistedFlightClearanceShellContent as content } from './AssistedFlightClearanceShell.content';

const style = {
  stack: 'space-y-4',
  notice:
    'rounded-2xl border border-amber-300 bg-amber-50 p-5 dark:border-amber-500/40 dark:bg-amber-500/10',
  title: 'font-semibold text-zinc-950 dark:text-zinc-100',
  description: 'mt-2 text-sm leading-6 text-zinc-700 dark:text-slate-300',
} as const;

export function AssistedFlightClearanceShell() {
  return (
    <div className={style.stack}>
      <section className={style.notice}>
        <h3 className={style.title}>{content.title}</h3>

        <p className={style.description}>{content.description}</p>
      </section>
    </div>
  );
}
