import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/class-name/cn';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

type FormSectionProps = {
  children: ReactNode;
  description?: string;
  title: string;
};

const style = {
  section: 'rounded-2xl border p-5',
  title: 'font-semibold',
  description: 'mt-2 text-sm leading-6',
  fields: 'mt-5 grid gap-4 md:grid-cols-2',
} as const;

export function FormSection({
  children,
  description,
  title,
}: FormSectionProps) {
  return (
    <section className={cn(style.section, themeClassNames.surface.formSection)}>
      <h3 className={cn(style.title, themeClassNames.text.primary)}>{title}</h3>

      {description ? (
        <p className={cn(style.description, themeClassNames.text.muted)}>
          {description}
        </p>
      ) : null}

      <div className={style.fields}>{children}</div>
    </section>
  );
}
