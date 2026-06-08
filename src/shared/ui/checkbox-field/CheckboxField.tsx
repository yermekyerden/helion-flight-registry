import type { ComponentPropsWithRef, ReactNode } from 'react';

import { cn } from '@/shared/lib/class-name/cn';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

type CheckboxFieldProps = Omit<
  ComponentPropsWithRef<'input'>,
  'children' | 'type'
> & {
  children: ReactNode;
  error?: string;
};

const style = {
  label: 'flex items-start gap-3 rounded-2xl border p-4 text-sm leading-6',
  checkbox:
    'mt-1 h-4 w-4 rounded border-zinc-300 text-amber-600 dark:border-neutral-600 dark:text-cyan-400',
  error: 'mt-2 text-xs leading-5',
} as const;

export function CheckboxField({
  children,
  className,
  error,
  id,
  ...props
}: CheckboxFieldProps) {
  const errorId = getCheckboxErrorId(id, error);
  const describedBy = getCheckboxDescribedBy(
    props['aria-describedby'],
    errorId,
  );

  return (
    <div>
      <label
        className={cn(
          style.label,
          themeClassNames.surface.panel,
          themeClassNames.text.muted,
          className,
        )}
      >
        <input
          {...props}
          aria-describedby={describedBy}
          aria-invalid={error ? true : props['aria-invalid']}
          className={cn(style.checkbox, themeClassNames.focus.checkbox)}
          id={id}
          type="checkbox"
        />

        <span>{children}</span>
      </label>

      {error ? (
        <p
          className={cn(style.error, themeClassNames.text.danger)}
          id={errorId}
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

function getCheckboxErrorId(id?: string, error?: string) {
  if (!id || !error) {
    return undefined;
  }

  return `${id}-error`;
}

function getCheckboxDescribedBy(describedBy?: string, errorId?: string) {
  if (describedBy && errorId) {
    return `${describedBy} ${errorId}`;
  }

  if (errorId) {
    return errorId;
  }

  return describedBy;
}
