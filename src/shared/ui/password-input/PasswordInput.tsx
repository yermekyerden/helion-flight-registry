import type { ComponentPropsWithRef } from 'react';

import { cn } from '@/shared/lib/class-name/cn';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

type PasswordInputProps = Omit<ComponentPropsWithRef<'input'>, 'type'>;

const style = {
  input: 'w-full rounded-xl border px-4 py-3 text-sm transition',
} as const;

export function PasswordInput({
  autoComplete = 'new-password',
  className,
  ...props
}: PasswordInputProps) {
  return (
    <input
      autoComplete={autoComplete}
      className={cn(
        style.input,
        themeClassNames.surface.field,
        themeClassNames.focus.field,
        className,
      )}
      type="password"
      {...props}
    />
  );
}
