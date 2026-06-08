import { cn } from '@/shared/lib/class-name/cn';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

import { legacyPilotIntakeShellContent as content } from './LegacyPilotIntakeShell.content';
import { LegacyPilotIntakeForm } from './LegacyPilotIntakeForm';

type LegacyPilotIntakeShellProps = {
  onSubmitted?: () => void;
};

const style = {
  stack: 'space-y-5',
  notice: 'rounded-2xl border p-5',
  title: 'font-semibold',
  description: 'mt-2 text-sm leading-6',
} as const;

export function LegacyPilotIntakeShell({
  onSubmitted,
}: LegacyPilotIntakeShellProps) {
  return (
    <div className={style.stack}>
      <section className={cn(style.notice, themeClassNames.surface.notice)}>
        <h3 className={cn(style.title, themeClassNames.text.primary)}>
          {content.title}
        </h3>

        <p className={cn(style.description, themeClassNames.text.muted)}>
          {content.description}
        </p>
      </section>

      <LegacyPilotIntakeForm onSubmitted={onSubmitted} />
    </div>
  );
}
