import type { ComponentPropsWithRef } from 'react';

import { cn } from '@/shared/lib/class-name/cn';

type FileInputProps = Omit<ComponentPropsWithRef<'input'>, 'type'>;

const style = {
  input:
    'block w-full cursor-pointer rounded-xl border border-zinc-300 bg-white text-sm text-zinc-700 outline-none transition file:mr-4 file:cursor-pointer file:border-0 file:bg-amber-600 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-white hover:file:bg-amber-700 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:file:bg-amber-500 dark:file:text-slate-950 dark:hover:file:bg-amber-400 dark:focus:border-amber-400',
} as const;

export function FileInput({ className, ...props }: FileInputProps) {
  return (
    <input className={cn(style.input, className)} type="file" {...props} />
  );
}
