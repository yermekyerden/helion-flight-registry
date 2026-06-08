import { cn } from '@/shared/lib/class-name/cn';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

import { flightApplicationFormContent as content } from '../model/flightApplicationForm.content';
import {
  getPassphraseIntegrityState,
  type PassphraseIntegrityState,
  type PassphraseIntegrityStatus,
} from '../model/passphraseIntegrity';

type PassphraseIntegrityPanelProps = {
  confirmPassword: string;
  password: string;
};

type PassphraseRequirementView = {
  isSatisfied: boolean;
  label: string;
};

const style = {
  panel: 'rounded-2xl border p-4',
  header: 'flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between',
  title: 'text-sm font-semibold',
  description: 'mt-1 text-xs leading-5',
  score: 'mt-3 text-xs font-semibold',
  status:
    'rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap',
  list: 'mt-4 grid gap-2 sm:grid-cols-2',
  item: 'flex items-center gap-2 text-xs leading-5',
  indicator:
    'flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold',
} as const;

export function PassphraseIntegrityPanel({
  confirmPassword,
  password,
}: PassphraseIntegrityPanelProps) {
  const integrityState = getPassphraseIntegrityState({
    confirmPassword,
    password,
  });

  const requirements = createPassphraseRequirementViews(integrityState);

  return (
    <aside
      aria-live="polite"
      className={cn(style.panel, themeClassNames.surface.notice)}
    >
      <div className={style.header}>
        <div>
          <h4 className={cn(style.title, themeClassNames.text.primary)}>
            {content.passphraseIntegrity.title}
          </h4>

          <p className={cn(style.description, themeClassNames.text.subtle)}>
            {content.passphraseIntegrity.description}
          </p>

          <p className={cn(style.score, themeClassNames.text.muted)}>
            {content.passphraseIntegrity.strengthScoreLabel}:{' '}
            {integrityState.satisfiedStrengthRequirementCount}/
            {integrityState.requiredStrengthRequirementCount}
          </p>
        </div>

        <span className={getStatusClassName(integrityState.status)}>
          {getStatusLabel(integrityState.status)}
        </span>
      </div>

      <ul className={style.list}>
        {requirements.map((requirement) => (
          <li
            className={cn(style.item, themeClassNames.text.muted)}
            key={requirement.label}
          >
            <span className={getIndicatorClassName(requirement.isSatisfied)}>
              {getIndicatorLabel(requirement.isSatisfied)}
            </span>

            <span>{requirement.label}</span>

            <span className="sr-only">
              {getRequirementStatusLabel(requirement.isSatisfied)}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function createPassphraseRequirementViews(
  integrityState: PassphraseIntegrityState,
): PassphraseRequirementView[] {
  return [
    {
      isSatisfied: integrityState.hasMinimumLength,
      label: content.passphraseIntegrity.requirements.minimumLength,
    },
    {
      isSatisfied: integrityState.hasNumber,
      label: content.passphraseIntegrity.requirements.number,
    },
    {
      isSatisfied: integrityState.hasUppercaseLetter,
      label: content.passphraseIntegrity.requirements.uppercaseLetter,
    },
    {
      isSatisfied: integrityState.hasLowercaseLetter,
      label: content.passphraseIntegrity.requirements.lowercaseLetter,
    },
    {
      isSatisfied: integrityState.hasSpecialCharacter,
      label: content.passphraseIntegrity.requirements.specialCharacter,
    },
    {
      isSatisfied: integrityState.hasMatchingConfirmation,
      label: content.passphraseIntegrity.requirements.confirmationMatch,
    },
  ];
}

function getStatusClassName(status: PassphraseIntegrityStatus) {
  return cn(style.status, getStatusToneClassName(status));
}

function getStatusToneClassName(status: PassphraseIntegrityStatus) {
  if (status === 'ready') {
    return themeClassNames.status.success;
  }

  if (status === 'incomplete') {
    return themeClassNames.status.warning;
  }

  return themeClassNames.status.idle;
}

function getStatusLabel(status: PassphraseIntegrityStatus) {
  return content.passphraseIntegrity.status[status];
}

function getIndicatorClassName(isSatisfied: boolean) {
  if (isSatisfied) {
    return cn(style.indicator, themeClassNames.indicator.success);
  }

  return cn(style.indicator, themeClassNames.indicator.pending);
}

function getIndicatorLabel(isSatisfied: boolean) {
  if (isSatisfied) {
    return '✓';
  }

  return '–';
}

function getRequirementStatusLabel(isSatisfied: boolean) {
  if (isSatisfied) {
    return content.passphraseIntegrity.requirementStatus.satisfied;
  }

  return content.passphraseIntegrity.requirementStatus.pending;
}
