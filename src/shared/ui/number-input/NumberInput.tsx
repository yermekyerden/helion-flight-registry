import type { ComponentPropsWithRef } from 'react';

import { cn } from '@/shared/lib/class-name/cn';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

type NumberInputProps = Omit<ComponentPropsWithRef<'input'>, 'type'>;

const style = {
  input: 'w-full rounded-xl border px-4 py-3 text-sm transition',
} as const;

export function NumberInput({
  className,
  step = 1,
  ...props
}: NumberInputProps) {
  return (
    <input
      className={cn(
        style.input,
        themeClassNames.surface.field,
        themeClassNames.focus.field,
        className,
      )}
      inputMode="numeric"
      step={step}
      type="number"
      {...props}
    />
  );
}
