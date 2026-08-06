import type { ComponentPropsWithRef } from 'react';

import { cn } from '@/shared/lib/class-name/cn';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

type TextInputProps = ComponentPropsWithRef<'input'>;

const style = {
  input: 'w-full rounded-xl border px-4 py-3 text-sm transition',
} as const;

export function TextInput({ className, ...props }: TextInputProps) {
  return (
    <input
      className={cn(
        style.input,
        themeClassNames.surface.field,
        themeClassNames.focus.field,
        className,
      )}
      {...props}
    />
  );
}
