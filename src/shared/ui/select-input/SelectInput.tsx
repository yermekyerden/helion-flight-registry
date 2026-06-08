import type { ComponentPropsWithRef } from 'react';

import { cn } from '@/shared/lib/class-name/cn';

type SelectInputProps = ComponentPropsWithRef<'select'>;

const style = {
  select:
    'w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-zinc-100 dark:focus:border-amber-400',
} as const;

export function SelectInput({
  className,
  children,
  ...props
}: SelectInputProps) {
  return (
    <select className={cn(style.select, className)} {...props}>
      {children}
    </select>
  );
}
