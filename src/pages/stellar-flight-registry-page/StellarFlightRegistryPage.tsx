import { useState } from 'react';

import type { FlightApplicationProtocol } from '@/entities/flight-application/model/flightApplication.types';
import { AssistedFlightClearanceShell } from '@/features/submit-flight-application-assisted/ui/AssistedFlightClearanceShell';
import { LegacyPilotIntakeShell } from '@/features/submit-flight-application-legacy/ui/LegacyPilotIntakeShell';
import { ThemeToggle } from '@/features/toggle-color-theme/ui/ThemeToggle';
import { cn } from '@/shared/lib/class-name/cn';
import { RegistryBackground } from '@/shared/ui/background/RegistryBackground';
import { Modal } from '@/shared/ui/modal/Modal';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';
import { FlightApplicationLauncher } from '@/widgets/flight-application-launcher/FlightApplicationLauncher';
import { FlightDossierRegistry } from '@/widgets/flight-dossier-registry/FlightDossierRegistry';
import { RegistryStatusSummary } from '@/widgets/registry-status-summary/RegistryStatusSummary';

import { stellarFlightRegistryPageContent as content } from './stellarFlightRegistryPage.content';

const style = {
  page: 'relative isolate min-h-screen overflow-hidden px-6 py-10',
  container: 'relative z-10 mx-auto flex max-w-5xl flex-col gap-8',
  hero: 'rounded-3xl border p-8 shadow-sm backdrop-blur-sm',
  heroTop: 'flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between',
  heroContent: 'min-w-0',
  heroEyebrow: 'text-sm font-semibold tracking-[0.3em] uppercase',
  heroTitle: 'mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl',
  heroDescription: 'mt-4 max-w-2xl text-base leading-7',
} as const;

export function StellarFlightRegistryPage() {
  const { hero } = content;
  const [activeProtocol, setActiveProtocol] =
    useState<FlightApplicationProtocol | null>(null);

  const isLegacyModalOpen = activeProtocol === 'legacy';
  const isAssistedModalOpen = activeProtocol === 'assisted';

  return (
    <main className={cn(style.page, themeClassNames.page)}>
      <RegistryBackground />

      <section className={style.container}>
        <header className={cn(style.hero, themeClassNames.surface.panel)}>
          <div className={style.heroTop}>
            <div className={style.heroContent}>
              <p
                className={cn(style.heroEyebrow, themeClassNames.text.eyebrow)}
              >
                {hero.eyebrow}
              </p>

              <h1 className={cn(style.heroTitle, themeClassNames.text.primary)}>
                {hero.title}
              </h1>

              <p
                className={cn(
                  style.heroDescription,
                  themeClassNames.text.muted,
                )}
              >
                {hero.description}
              </p>
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
