import type { FlightApplication } from '@/entities/flight-application/model/flightApplication.types';
import {
  selectFlightApplications,
  selectLatestFlightApplicationId,
} from '@/entities/flight-application/model/flightApplicationStore.selectors';
import { useFlightApplicationStore } from '@/entities/flight-application/model/flightApplicationStore';
import { cn } from '@/shared/lib/class-name/cn';
import { Panel } from '@/shared/ui/panel/Panel';
import { SectionHeader } from '@/shared/ui/section-header/SectionHeader';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

import { flightDossierRegistryContent as content } from './flightDossierRegistry.content';

type FlightDossierCardProps = {
  flightApplication: FlightApplication;
  isLatest: boolean;
};

type DossierFieldProps = {
  label: string;
  value: string;
};

const style = {
  emptyState: 'p-8',
  registry: 'space-y-5',
  list: 'grid gap-4',
  card: 'overflow-hidden rounded-3xl border transition',
  cardBody: 'grid gap-5 p-5 md:grid-cols-[128px_1fr]',
  photo: 'h-32 w-32 rounded-2xl border object-cover',
  content: 'min-w-0 space-y-4',
  header:
    'flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-start sm:justify-between',
  pilotName: 'text-xl font-semibold',
  meta: 'mt-1 text-sm',
  badges: 'flex flex-wrap gap-2',
  badge: 'rounded-full border px-3 py-1 text-xs font-semibold',
  grid: 'grid gap-3 sm:grid-cols-2',
  field: 'rounded-2xl p-3',
  fieldLabel: 'text-[11px] font-semibold tracking-[0.18em] uppercase',
  fieldValue: 'mt-1 text-sm font-medium',
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

function EmptyFlightDossierRegistry() {
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

function FlightDossierCard({
  flightApplication,
  isLatest,
}: FlightDossierCardProps) {
  return (
    <article
      aria-label={getCardAriaLabel(isLatest)}
      className={getCardClassName(isLatest)}
    >
      <div className={style.cardBody}>
        <img
          alt={`${flightApplication.name} pilot registry portrait`}
          className={cn(style.photo, themeClassNames.border.strong)}
          src={flightApplication.pilotPhotoDataUrl}
        />

        <div className={style.content}>
          <header className={cn(style.header, themeClassNames.border.divider)}>
            <div>
              <h3 className={cn(style.pilotName, themeClassNames.text.primary)}>
                {flightApplication.name}
              </h3>

              <p className={cn(style.meta, themeClassNames.text.subtle)}>
                {content.labels.submittedAt}:{' '}
                {formatSubmittedAt(flightApplication.submittedAt)}
              </p>
            </div>

            <div className={style.badges}>
              {isLatest ? (
                <span className={cn(style.badge, themeClassNames.badge.latest)}>
                  {content.latestDossierBadge}
                </span>
              ) : null}

              <span className={cn(style.badge, themeClassNames.badge.warning)}>
                {getProtocolLabel(flightApplication.protocol)}
              </span>

              <span className={cn(style.badge, themeClassNames.badge.warning)}>
                {getStatusLabel(flightApplication.status)}
              </span>
            </div>
          </header>

          <div className={style.grid}>
            <DossierField
              label={content.labels.age}
              value={flightApplication.age.toString()}
            />

            <DossierField
              label={content.labels.identityMarker}
              value={flightApplication.identityMarker}
            />

            <DossierField
              label={content.labels.email}
              value={flightApplication.email}
            />

            <DossierField
              label={content.labels.origin}
              value={`${flightApplication.originWorld} / ${flightApplication.originAuthority}`}
            />

            <DossierField
              label={content.labels.vessel}
              value={`${flightApplication.vesselName} / ${flightApplication.vesselClass}`}
            />

            <DossierField
              label={content.labels.crewCapacity}
              value={flightApplication.crewCapacity.toString()}
            />

            <DossierField
              label={content.labels.destination}
              value={flightApplication.destinationSector}
            />

            <DossierField
              label={content.labels.purpose}
              value={flightApplication.flightPurpose}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function DossierField({ label, value }: DossierFieldProps) {
  return (
    <div className={cn(style.field, themeClassNames.surface.fieldSoft)}>
      <p className={cn(style.fieldLabel, themeClassNames.text.subtle)}>
        {label}
      </p>

      <p className={cn(style.fieldValue, themeClassNames.text.primary)}>
        {value}
      </p>
    </div>
  );
}

function getCardClassName(isLatest: boolean) {
  return cn(
    style.card,
    themeClassNames.surface.panel,
    isLatest && themeClassNames.highlight.latest,
  );
}

function getCardAriaLabel(isLatest: boolean) {
  if (isLatest) {
    return content.latestDossierAriaLabel;
  }

  return undefined;
}

function getProtocolLabel(protocol: FlightApplication['protocol']) {
  return content.protocol[protocol];
}

function getStatusLabel(status: FlightApplication['status']) {
  if (status === 'pending-review') {
    return content.status.pendingReview;
  }

  return status;
}

function formatSubmittedAt(submittedAt: string) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(submittedAt));
}
