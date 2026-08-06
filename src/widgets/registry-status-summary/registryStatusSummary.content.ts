import { registryIdentity } from '@/shared/config/registryIdentity';

export const registryStatusSummaryContent = {
  protocolStatus: {
    title: 'Protocol',
    value: 'Online',
  },
  activeDossiersStatus: {
    title: 'Active dossiers',
  },
  clearanceNodeStatus: {
    title: 'Clearance node',
    value: registryIdentity.clearanceNode,
  },
} as const;
