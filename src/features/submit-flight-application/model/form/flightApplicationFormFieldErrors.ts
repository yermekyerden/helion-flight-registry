import type { FlightApplicationFormValues } from '../validation/flightApplicationFormSchema';

export type FlightApplicationFormFieldErrors = Partial<
  Record<keyof FlightApplicationFormValues, string>
>;
