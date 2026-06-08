import type { ComponentPropsWithRef } from 'react';

import { cn } from '@/shared/lib/class-name/cn';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

type SelectInputProps = ComponentPropsWithRef<'select'>;

const style = {
  select: 'w-full rounded-xl border px-4 py-3 text-sm transition',
} as const;

export function SelectInput({
  className,
  children,
  ...props
}: SelectInputProps) {
  return (
    <select
      className={cn(
        style.select,
        themeClassNames.surface.field,
        themeClassNames.focus.field,
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
