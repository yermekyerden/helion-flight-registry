import { cn } from '@/shared/lib/class-name/cn';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

import { assistedFlightClearanceShellContent as content } from './AssistedFlightClearanceShell.content';
import { AssistedFlightClearanceForm } from './AssistedFlightClearanceForm';

type AssistedFlightClearanceShellProps = {
  onSubmitted?: () => void;
};

const style = {
  stack: 'space-y-5',
  notice: 'rounded-2xl border p-5',
  title: 'font-semibold',
  description: 'mt-2 text-sm leading-6',
} as const;

export function AssistedFlightClearanceShell({
  onSubmitted,
}: AssistedFlightClearanceShellProps) {
  return (
    <div className={style.stack}>
      <section
        className={cn(style.notice, themeClassNames.surface.noticeAccent)}
      >
        <h3 className={cn(style.title, themeClassNames.text.primary)}>
          {content.title}
        </h3>

        <p className={cn(style.description, themeClassNames.text.muted)}>
          {content.description}
        </p>
      </section>

      <AssistedFlightClearanceForm onSubmitted={onSubmitted} />
    </div>
  );
}
