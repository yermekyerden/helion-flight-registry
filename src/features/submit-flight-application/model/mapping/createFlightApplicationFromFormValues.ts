import type {
  FlightApplication,
  FlightApplicationProtocol,
} from '@/entities/flight-application/model/flightApplication.types';
import { readFileAsDataUrl } from '@/shared/lib/file/readFileAsDataUrl';

import type { FlightApplicationFormValues } from '../validation/flightApplicationFormSchema';
import { mapFlightApplicationFormToFlightApplication } from './mapFlightApplicationFormToFlightApplication';

type CreateFlightApplicationFromFormValuesParams = {
  formValues: FlightApplicationFormValues;
  protocol: FlightApplicationProtocol;
};

export async function createFlightApplicationFromFormValues({
  formValues,
  protocol,
}: CreateFlightApplicationFromFormValuesParams): Promise<FlightApplication> {
  const pilotPhotoDataUrl = await readFileAsDataUrl(formValues.pilotPhoto);

  return mapFlightApplicationFormToFlightApplication({
    formValues,
    id: crypto.randomUUID(),
    pilotPhotoDataUrl,
    protocol,
    submittedAt: new Date().toISOString(),
  });
}
