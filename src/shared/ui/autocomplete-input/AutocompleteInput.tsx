import type { ComponentPropsWithRef } from 'react';

import { cn } from '@/shared/lib/class-name/cn';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

type AutocompleteInputProps = Omit<ComponentPropsWithRef<'input'>, 'list'> & {
  listId: string;
  options: readonly string[];
};

const style = {
  input: 'w-full rounded-xl border px-4 py-3 text-sm transition',
} as const;

export function AutocompleteInput({
  className,
  listId,
  options,
  ...props
}: AutocompleteInputProps) {
  return (
    <>
      <input
        className={cn(
          style.input,
          themeClassNames.surface.field,
          themeClassNames.focus.field,
          className,
        )}
        list={listId}
        type="text"
        {...props}
      />

      <datalist id={listId}>
        {options.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
    </>
  );
}
