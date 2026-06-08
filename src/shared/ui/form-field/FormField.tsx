import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/class-name/cn';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

type FormFieldRenderProps = {
  id: string;
  'aria-describedby'?: string;
  'aria-errormessage'?: string;
  'aria-invalid'?: true;
};

type FormFieldProps = {
  children: (fieldProps: FormFieldRenderProps) => ReactNode;
  error?: string;
  hint?: string;
  id: string;
  label: string;
};

type FieldAccessibilityParams = {
  error?: string;
  hint?: string;
  id: string;
};

const style = {
  root: 'space-y-2',
  label: 'block text-sm font-semibold',
  hint: 'text-xs leading-5',
  error: 'text-xs leading-5',
} as const;

export function FormField({
  children,
  error,
  hint,
  id,
  label,
}: FormFieldProps) {
  const hintId = getHintId(id, hint);
  const errorId = getErrorId(id, error);

  return (
    <div className={style.root}>
      <label
        className={cn(style.label, themeClassNames.text.label)}
        htmlFor={id}
      >
        {label}
      </label>

      {children(createFieldAccessibilityProps({ error, hint, id }))}

      {hint ? (
        <p className={cn(style.hint, themeClassNames.text.subtle)} id={hintId}>
          {hint}
        </p>
      ) : null}

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

function createFieldAccessibilityProps({
  error,
  hint,
  id,
}: FieldAccessibilityParams): FormFieldRenderProps {
  const hintId = getHintId(id, hint);
  const errorId = getErrorId(id, error);

  return {
    id,
    'aria-describedby': getDescribedByValue([hintId, errorId]),
    'aria-errormessage': errorId,
    'aria-invalid': error ? true : undefined,
  };
}

function getHintId(id: string, hint?: string) {
  if (!hint) {
    return undefined;
  }

  return `${id}-hint`;
}

function getErrorId(id: string, error?: string) {
  if (!error) {
    return undefined;
  }

  return `${id}-error`;
}

function getDescribedByValue(ids: Array<string | undefined>) {
  const existingIds = ids.filter((id): id is string => Boolean(id));

  if (existingIds.length === 0) {
    return undefined;
  }

  return existingIds.join(' ');
}
