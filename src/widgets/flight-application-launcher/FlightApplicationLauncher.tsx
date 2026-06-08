import { Button } from '@/shared/ui/button/Button';
import { Panel } from '@/shared/ui/panel/Panel';
import { SectionHeader } from '@/shared/ui/section-header/SectionHeader';

import { flightApplicationLauncherContent as content } from './flightApplicationLauncher.content';

const style = {
  actions: 'mt-6 flex flex-col gap-3 sm:flex-row',
} as const;

export function FlightApplicationLauncher() {
  return (
    <Panel>
      <SectionHeader
        description={content.description}
        eyebrow={content.eyebrow}
        title={content.title}
      />

      <div className={style.actions}>
        <Button variant="secondary">{content.legacyButtonLabel}</Button>
        <Button variant="primary">{content.assistedButtonLabel}</Button>
      </div>
    </Panel>
  );
}
