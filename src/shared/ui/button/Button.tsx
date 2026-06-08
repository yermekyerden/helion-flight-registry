import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/class-name/cn';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const style = {
  base: 'rounded-xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
  primary:
    'bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400',
  secondary:
    'border border-zinc-300 hover:border-amber-600 hover:text-amber-700 dark:border-slate-700 dark:hover:border-amber-400 dark:hover:text-amber-400',
} as const;

export function Button({
  className,
  type = 'button',
  variant = 'secondary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(style.base, style[variant], className)}
      type={type}
      {...props}
    />
  );
}
