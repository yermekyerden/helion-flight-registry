import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/class-name/cn';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const style = {
  base: 'rounded-xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
} as const;

export function Button({
  className,
  type = 'button',
  variant = 'secondary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        style.base,
        themeClassNames.focus.ring,
        variant === 'primary'
          ? themeClassNames.action.primary
          : themeClassNames.action.secondary,
        className,
      )}
      type={type}
      {...props}
    />
  );
}
