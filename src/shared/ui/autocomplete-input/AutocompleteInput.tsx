import type { ComponentPropsWithRef } from 'react';

import { cn } from '@/shared/lib/class-name/cn';

type AutocompleteInputProps = Omit<ComponentPropsWithRef<'input'>, 'list'> & {
  listId: string;
  options: readonly string[];
};

const style = {
  input:
    'w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-zinc-100 dark:placeholder:text-slate-500 dark:focus:border-amber-400',
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
        className={cn(style.input, className)}
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
