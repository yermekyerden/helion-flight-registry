import { Button } from '@/shared/ui/button/Button';
import { Panel } from '@/shared/ui/panel/Panel';
import { SectionHeader } from '@/shared/ui/section-header/SectionHeader';

import { flightApplicationLauncherContent as content } from './flightApplicationLauncher.content';

type FlightApplicationLauncherProps = {
  onOpenAssistedFlow: () => void;
  onOpenLegacyFlow: () => void;
};

const style = {
  actions: 'mt-6 flex flex-col gap-3 sm:flex-row',
} as const;

export function FlightApplicationLauncher({
  onOpenAssistedFlow,
  onOpenLegacyFlow,
}: FlightApplicationLauncherProps) {
  return (
    <Panel>
      <SectionHeader
        description={content.description}
        eyebrow={content.eyebrow}
        title={content.title}
      />

      <div className={style.actions}>
        <Button onClick={onOpenLegacyFlow} variant="secondary">
          {content.legacyButtonLabel}
        </Button>

        <Button onClick={onOpenAssistedFlow} variant="primary">
          {content.assistedButtonLabel}
        </Button>
      </div>
    </Panel>
  );
}
