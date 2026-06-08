import type { FlightApplicationFormValues } from '@/shared/lib/validation/flight-application';

export type FlightApplicationFormFieldErrors = Partial<
  Record<keyof FlightApplicationFormValues, string>
>;
