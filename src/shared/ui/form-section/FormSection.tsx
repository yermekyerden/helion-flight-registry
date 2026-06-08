import type { ReactNode } from 'react';

type FormSectionProps = {
  children: ReactNode;
  description?: string;
  title: string;
};

const style = {
  section:
    'rounded-2xl border border-zinc-300 bg-zinc-50 p-5 dark:border-slate-800 dark:bg-slate-950',
  title: 'font-semibold text-zinc-950 dark:text-zinc-100',
  description: 'mt-2 text-sm leading-6 text-zinc-600 dark:text-slate-400',
  fields: 'mt-5 grid gap-4 md:grid-cols-2',
} as const;

export function FormSection({
  children,
  description,
  title,
}: FormSectionProps) {
  return (
    <section className={style.section}>
      <h3 className={style.title}>{title}</h3>

      {description ? <p className={style.description}>{description}</p> : null}

      <div className={style.fields}>{children}</div>
    </section>
  );
}
