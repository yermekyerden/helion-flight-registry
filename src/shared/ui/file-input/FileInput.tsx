import type { ComponentPropsWithRef } from 'react';

import { cn } from '@/shared/lib/class-name/cn';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

type FileInputProps = Omit<ComponentPropsWithRef<'input'>, 'type'>;

const style = {
  input:
    'block w-full cursor-pointer rounded-xl border text-sm transition file:mr-4 file:cursor-pointer file:border-0 file:px-4 file:py-3 file:text-sm file:font-semibold file:transition file:bg-amber-600 file:text-white hover:file:bg-amber-700 dark:file:bg-cyan-400 dark:file:text-neutral-950 dark:hover:file:bg-cyan-300',
} as const;

export function FileInput({ className, ...props }: FileInputProps) {
  return (
    <input
      className={cn(
        style.input,
        themeClassNames.surface.field,
        themeClassNames.focus.field,
        className,
      )}
      type="file"
      {...props}
    />
  );
}
