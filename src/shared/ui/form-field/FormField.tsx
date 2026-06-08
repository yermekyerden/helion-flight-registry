import type { ReactNode } from 'react';

type FormFieldProps = {
  children: ReactNode;
  error?: string;
  hint?: string;
  label: string;
};

const style = {
  root: 'space-y-2',
  label: 'block text-sm font-semibold text-zinc-900 dark:text-zinc-100',
  hint: 'text-xs leading-5 text-zinc-500 dark:text-slate-400',
  error: 'text-xs leading-5 text-red-600 dark:text-red-400',
} as const;

export function FormField({ children, error, hint, label }: FormFieldProps) {
  return (
    <label className={style.root}>
      <span className={style.label}>{label}</span>
      {children}
      {hint ? <span className={style.hint}>{hint}</span> : null}
      {error ? <span className={style.error}>{error}</span> : null}
    </label>
  );
}
