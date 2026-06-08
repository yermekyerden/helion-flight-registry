import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/shared/lib/class-name/cn';

type PanelVariant = 'solid' | 'dashed';

type PanelProps = ComponentPropsWithoutRef<'section'> & {
  variant?: PanelVariant;
};

const style = {
  base: 'rounded-3xl border bg-white p-6 dark:bg-slate-900',
  solid: 'border-zinc-300 dark:border-slate-800',
  dashed: 'border-dashed border-zinc-300 dark:border-slate-800',
} as const;

export function Panel({ className, variant = 'solid', ...props }: PanelProps) {
  return (
    <section className={cn(style.base, style[variant], className)} {...props} />
  );
}
