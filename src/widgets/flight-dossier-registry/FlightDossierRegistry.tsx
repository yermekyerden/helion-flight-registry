import type { FlightApplication } from '@/entities/flight-application/model/flightApplication.types';
import { selectFlightApplications } from '@/entities/flight-application/model/flightApplicationStore.selectors';
import { useFlightApplicationStore } from '@/entities/flight-application/model/flightApplicationStore';
import { Panel } from '@/shared/ui/panel/Panel';
import { SectionHeader } from '@/shared/ui/section-header/SectionHeader';

import { flightDossierRegistryContent as content } from './flightDossierRegistry.content';

type FlightDossierCardProps = {
  flightApplication: FlightApplication;
};

type DossierFieldProps = {
  label: string;
  value: string;
};

const style = {
  emptyState: 'p-8',
  registry: 'space-y-5',
  list: 'grid gap-4',
  card: 'overflow-hidden rounded-3xl border border-zinc-300 bg-white dark:border-slate-800 dark:bg-slate-900',
  cardBody: 'grid gap-5 p-5 md:grid-cols-[128px_1fr]',
  photo:
    'h-32 w-32 rounded-2xl border border-zinc-300 object-cover dark:border-slate-700',
  content: 'min-w-0 space-y-4',
  header:
    'flex flex-col gap-3 border-b border-zinc-200 pb-4 sm:flex-row sm:items-start sm:justify-between dark:border-slate-800',
  pilotName: 'text-xl font-semibold text-zinc-950 dark:text-zinc-100',
  meta: 'mt-1 text-sm text-zinc-500 dark:text-slate-400',
  badges: 'flex flex-wrap gap-2',
  badge:
    'rounded-full border border-amber-300 px-3 py-1 text-xs font-semibold text-amber-700 dark:border-amber-500/50 dark:text-amber-300',
  grid: 'grid gap-3 sm:grid-cols-2',
  field: 'rounded-2xl bg-zinc-50 p-3 dark:bg-slate-950',
  fieldLabel:
    'text-[11px] font-semibold tracking-[0.18em] text-zinc-500 uppercase dark:text-slate-500',
  fieldValue: 'mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100',
} as const;

export function FlightDossierRegistry() {
  const flightApplications = useFlightApplicationStore(
    selectFlightApplications,
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

function FlightDossierCard({ flightApplication }: FlightDossierCardProps) {
  return (
    <article className={style.card}>
      <div className={style.cardBody}>
        <img
          alt={`${flightApplication.name} pilot registry portrait`}
          className={style.photo}
          src={flightApplication.pilotPhotoDataUrl}
        />

        <div className={style.content}>
          <header className={style.header}>
            <div>
              <h3 className={style.pilotName}>{flightApplication.name}</h3>

              <p className={style.meta}>
                {content.labels.submittedAt}:{' '}
                {formatSubmittedAt(flightApplication.submittedAt)}
              </p>
            </div>

            <div className={style.badges}>
              <span className={style.badge}>
                {getProtocolLabel(flightApplication.protocol)}
              </span>

              <span className={style.badge}>
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
    <div className={style.field}>
      <p className={style.fieldLabel}>{label}</p>
      <p className={style.fieldValue}>{value}</p>
    </div>
  );
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
