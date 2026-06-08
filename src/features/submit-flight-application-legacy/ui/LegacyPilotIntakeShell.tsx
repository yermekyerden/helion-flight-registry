import { legacyPilotIntakeShellContent as content } from './LegacyPilotIntakeShell.content';

const style = {
  stack: 'space-y-4',
  notice:
    'rounded-2xl border border-zinc-300 bg-zinc-50 p-5 dark:border-slate-800 dark:bg-slate-950',
  title: 'font-semibold text-zinc-950 dark:text-zinc-100',
  description: 'mt-2 text-sm leading-6 text-zinc-600 dark:text-slate-400',
} as const;

export function LegacyPilotIntakeShell() {
  return (
    <div className={style.stack}>
      <section className={style.notice}>
        <h3 className={style.title}>{content.title}</h3>

        <p className={style.description}>{content.description}</p>
      </section>
    </div>
  );
}
