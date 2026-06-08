import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/shared/lib/class-name/cn';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

type PanelVariant = 'solid' | 'dashed';

type PanelProps = ComponentPropsWithoutRef<'section'> & {
  variant?: PanelVariant;
};

const style = {
  base: 'rounded-3xl border p-6',
  dashed: 'border-dashed',
} as const;

export function Panel({ className, variant = 'solid', ...props }: PanelProps) {
  return (
    <section
      className={cn(
        style.base,
        themeClassNames.surface.panel,
        variant === 'dashed' && style.dashed,
        className,
      )}
      {...props}
    />
  );
}
