import type { ComponentPropsWithRef, ReactNode } from 'react';

import { cn } from '@/shared/lib/class-name/cn';

type CheckboxFieldProps = Omit<
  ComponentPropsWithRef<'input'>,
  'children' | 'type'
> & {
  children: ReactNode;
  error?: string;
};

const style = {
  label:
    'flex items-start gap-3 rounded-2xl border border-zinc-300 bg-white p-4 text-sm leading-6 text-zinc-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300',
  checkbox:
    'mt-1 h-4 w-4 rounded border-zinc-300 text-amber-600 focus:ring-amber-500 dark:border-slate-600',
  error: 'mt-2 text-xs leading-5 text-red-600 dark:text-red-400',
} as const;

export function CheckboxField({
  children,
  className,
  error,
  ...props
}: CheckboxFieldProps) {
  return (
    <div>
      <label className={cn(style.label, className)}>
        <input className={style.checkbox} type="checkbox" {...props} />
        <span>{children}</span>
      </label>

      {error ? <p className={style.error}>{error}</p> : null}
    </div>
  );
}
