import { Panel } from '@/shared/ui/panel/Panel';
import { SectionHeader } from '@/shared/ui/section-header/SectionHeader';

import { flightDossierRegistryContent as content } from './flightDossierRegistry.content';

const style = {
  emptyState: 'p-8',
} as const;

export function FlightDossierRegistry() {
  return (
    <Panel className={style.emptyState} variant="dashed">
      <SectionHeader
        align="center"
        description={content.emptyDescription}
        eyebrow={content.eyebrow}
        title={content.emptyTitle}
        tone="muted"
      />
    </Panel>
  );
}
