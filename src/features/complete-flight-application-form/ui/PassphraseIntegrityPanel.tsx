import { cn } from '@/shared/lib/class-name/cn';

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
  panel:
    'rounded-2xl border border-zinc-300 bg-white p-4 dark:border-slate-700 dark:bg-slate-950',
  header: 'flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between',
  title: 'text-sm font-semibold text-zinc-950 dark:text-zinc-100',
  description: 'mt-1 text-xs leading-5 text-zinc-500 dark:text-slate-400',
  status:
    'rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap',
  statusIdle:
    'border-zinc-300 text-zinc-500 dark:border-slate-700 dark:text-slate-400',
  statusIncomplete:
    'border-amber-300 text-amber-700 dark:border-amber-500/50 dark:text-amber-300',
  statusReady:
    'border-emerald-300 text-emerald-700 dark:border-emerald-500/50 dark:text-emerald-300',
  list: 'mt-4 space-y-2',
  item: 'flex items-center gap-2 text-xs leading-5 text-zinc-600 dark:text-slate-300',
  indicator:
    'flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold',
  indicatorPending:
    'border-zinc-300 text-zinc-400 dark:border-slate-700 dark:text-slate-500',
  indicatorSatisfied:
    'border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
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
    <aside aria-live="polite" className={style.panel}>
      <div className={style.header}>
        <div>
          <h4 className={style.title}>{content.passphraseIntegrity.title}</h4>
          <p className={style.description}>
            {content.passphraseIntegrity.description}
          </p>
        </div>

        <span className={getStatusClassName(integrityState.status)}>
          {getStatusLabel(integrityState.status)}
        </span>
      </div>

      <ul className={style.list}>
        {requirements.map((requirement) => (
          <li className={style.item} key={requirement.label}>
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
    return style.statusReady;
  }

  if (status === 'incomplete') {
    return style.statusIncomplete;
  }

  return style.statusIdle;
}

function getStatusLabel(status: PassphraseIntegrityStatus) {
  return content.passphraseIntegrity.status[status];
}

function getIndicatorClassName(isSatisfied: boolean) {
  if (isSatisfied) {
    return cn(style.indicator, style.indicatorSatisfied);
  }

  return cn(style.indicator, style.indicatorPending);
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
