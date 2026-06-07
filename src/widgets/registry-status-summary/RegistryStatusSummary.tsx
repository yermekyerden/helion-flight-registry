import { selectActiveFlightDossierCount } from '../../entities/flight-application/model/flightApplicationStore.selectors';
import { useFlightApplicationStore } from '../../entities/flight-application/model/flightApplicationStore';
import { registryStatusSummaryContent as content } from './registryStatusSummary.content';

type RegistryStatusCardContent = {
  title: string;
  value: string;
};

type RegistryStatusCardProps = {
  status: RegistryStatusCardContent;
};

const style = {
  layout: 'grid gap-4 md:grid-cols-3',
  card: 'rounded-2xl border border-zinc-300 bg-white p-5 dark:border-slate-800 dark:bg-slate-900',
  title:
    'text-xs font-semibold tracking-[0.25em] text-zinc-500 uppercase dark:text-slate-500',
  value: 'mt-3 text-2xl font-semibold',
} as const;

export function RegistryStatusSummary() {
  const activeDossierCount = useFlightApplicationStore(
    selectActiveFlightDossierCount,
  );

  const activeDossiersStatus = createActiveDossiersStatus(activeDossierCount);

  return (
    <section className={style.layout}>
      <RegistryStatusCard status={content.protocolStatus} />
      <RegistryStatusCard status={activeDossiersStatus} />
      <RegistryStatusCard status={content.clearanceNodeStatus} />
    </section>
  );
}

function RegistryStatusCard({ status }: RegistryStatusCardProps) {
  return (
    <article className={style.card}>
      <p className={style.title}>{status.title}</p>
      <p className={style.value}>{status.value}</p>
    </article>
  );
}

function createActiveDossiersStatus(
  activeDossierCount: number,
): RegistryStatusCardContent {
  return {
    title: content.activeDossiersStatus.title,
    value: activeDossierCount.toString(),
  };
}
