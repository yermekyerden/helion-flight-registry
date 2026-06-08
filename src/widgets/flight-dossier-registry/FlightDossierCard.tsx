import type { FlightApplication } from '@/entities/flight-application/model/flightApplication.types';
import { cn } from '@/shared/lib/class-name/cn';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

import { DossierField } from './DossierField';
import { flightDossierRegistryContent as content } from './flightDossierRegistry.content';
import { formatSubmittedAt } from './formatSubmittedAt';

type FlightDossierCardProps = {
  flightApplication: FlightApplication;
  isLatest: boolean;
};

const style = {
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
} as const;

export function FlightDossierCard({
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
