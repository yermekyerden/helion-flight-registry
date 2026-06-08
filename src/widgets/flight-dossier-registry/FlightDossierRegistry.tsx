import {
  selectFlightApplications,
  selectLatestFlightApplicationId,
} from '@/entities/flight-application/model/flightApplicationStore.selectors';
import { useFlightApplicationStore } from '@/entities/flight-application/model/flightApplicationStore';
import { Panel } from '@/shared/ui/panel/Panel';
import { SectionHeader } from '@/shared/ui/section-header/SectionHeader';

import { EmptyFlightDossierRegistry } from './EmptyFlightDossierRegistry';
import { FlightDossierCard } from './FlightDossierCard';
import { flightDossierRegistryContent as content } from './flightDossierRegistry.content';

const style = {
  registry: 'space-y-5',
  list: 'grid gap-4',
} as const;

export function FlightDossierRegistry() {
  const flightApplications = useFlightApplicationStore(
    selectFlightApplications,
  );

  const latestFlightApplicationId = useFlightApplicationStore(
    selectLatestFlightApplicationId,
  );

  if (flightApplications.length === 0) {
    return <EmptyFlightDossierRegistry />;
  }

  return (
    <Panel>
      <div className={style.registry}>
        <SectionHeader
          description={content.registeredDescription}
          eyebrow={content.eyebrow}
          title={content.registeredTitle}
        />

        <div className={style.list}>
          {flightApplications.map((flightApplication) => (
            <FlightDossierCard
              flightApplication={flightApplication}
              isLatest={flightApplication.id === latestFlightApplicationId}
              key={flightApplication.id}
            />
          ))}
        </div>
      </div>
    </Panel>
  );
}
