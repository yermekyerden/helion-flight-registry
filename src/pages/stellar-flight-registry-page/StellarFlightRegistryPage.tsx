import { useState } from 'react';

import type { FlightApplicationProtocol } from '@/entities/flight-application/model/flightApplication.types';
import { AssistedFlightClearanceShell } from '@/features/submit-flight-application-assisted/ui/AssistedFlightClearanceShell';
import { LegacyPilotIntakeShell } from '@/features/submit-flight-application-legacy/ui/LegacyPilotIntakeShell';
import { ThemeToggle } from '@/features/toggle-color-theme/ui/ThemeToggle';
import { Modal } from '@/shared/ui/modal/Modal';
import { FlightApplicationLauncher } from '@/widgets/flight-application-launcher/FlightApplicationLauncher';
import { FlightDossierRegistry } from '@/widgets/flight-dossier-registry/FlightDossierRegistry';
import { RegistryStatusSummary } from '@/widgets/registry-status-summary/RegistryStatusSummary';

import { stellarFlightRegistryPageContent as content } from './stellarFlightRegistryPage.content';

const style = {
  page: 'min-h-screen bg-zinc-100 px-6 py-10 text-zinc-950 transition-colors dark:bg-slate-950 dark:text-zinc-100',
  container: 'mx-auto flex max-w-5xl flex-col gap-8',
  hero: 'rounded-3xl border border-zinc-300 bg-white p-8 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900',
  heroTop: 'flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between',
  heroContent: 'min-w-0',
  heroEyebrow:
    'text-sm font-semibold tracking-[0.3em] text-amber-700 uppercase dark:text-amber-400',
  heroTitle: 'mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl',
  heroDescription:
    'mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-slate-400',
} as const;

export function StellarFlightRegistryPage() {
  const { hero } = content;
  const [activeProtocol, setActiveProtocol] =
    useState<FlightApplicationProtocol | null>(null);

  const isLegacyModalOpen = activeProtocol === 'legacy';
  const isAssistedModalOpen = activeProtocol === 'assisted';

  return (
    <main className={style.page}>
      <section className={style.container}>
        <header className={style.hero}>
          <div className={style.heroTop}>
            <div className={style.heroContent}>
              <p className={style.heroEyebrow}>{hero.eyebrow}</p>

              <h1 className={style.heroTitle}>{hero.title}</h1>

              <p className={style.heroDescription}>{hero.description}</p>
            </div>

            <ThemeToggle />
          </div>
        </header>

        <RegistryStatusSummary />

        <FlightApplicationLauncher
          onOpenAssistedFlow={openAssistedFlow}
          onOpenLegacyFlow={openLegacyFlow}
        />

        <FlightDossierRegistry />
      </section>

      <Modal
        description={content.modal.legacyPilotIntake.description}
        eyebrow={content.modal.legacyPilotIntake.eyebrow}
        isOpen={isLegacyModalOpen}
        onClose={closeActiveFlow}
        title={content.modal.legacyPilotIntake.title}
      >
        <LegacyPilotIntakeShell onSubmitted={closeActiveFlow} />
      </Modal>

      <Modal
        description={content.modal.assistedFlightClearance.description}
        eyebrow={content.modal.assistedFlightClearance.eyebrow}
        isOpen={isAssistedModalOpen}
        onClose={closeActiveFlow}
        title={content.modal.assistedFlightClearance.title}
      >
        <AssistedFlightClearanceShell onSubmitted={closeActiveFlow} />
      </Modal>
    </main>
  );

  function openLegacyFlow() {
    setActiveProtocol('legacy');
  }

  function openAssistedFlow() {
    setActiveProtocol('assisted');
  }

  function closeActiveFlow() {
    setActiveProtocol(null);
  }
}
