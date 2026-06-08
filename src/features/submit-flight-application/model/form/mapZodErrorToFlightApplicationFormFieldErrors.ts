import type { ZodError } from 'zod';

import { flightApplicationFormFieldNames as fieldNames } from './flightApplicationFormFieldNames';
import type { FlightApplicationFormFieldErrors } from './flightApplicationFormFieldErrors';
import type { FlightApplicationFormValues } from '../validation/flightApplicationFormSchema';

const knownFieldNames = new Set<string>(Object.values(fieldNames));

export function mapZodErrorToFlightApplicationFormFieldErrors(
  error: ZodError,
): FlightApplicationFormFieldErrors {
  const mappedErrors: FlightApplicationFormFieldErrors = {};

  for (const issue of error.issues) {
    const fieldName = getIssueFieldName(issue.path);

    if (!fieldName) {
      continue;
    }

    if (fieldName in mappedErrors) {
      continue;
    }

    mappedErrors[fieldName] = issue.message;
  }

  return mappedErrors;
}

function getIssueFieldName(
  issuePath: readonly unknown[],
): keyof FlightApplicationFormValues | null {
  const fieldName = issuePath[0];

  if (typeof fieldName !== 'string') {
    return null;
  }

  if (!isFlightApplicationFormFieldName(fieldName)) {
    return null;
  }

  return fieldName;
}

function isFlightApplicationFormFieldName(
  value: string,
): value is keyof FlightApplicationFormValues {
  return knownFieldNames.has(value);
}
