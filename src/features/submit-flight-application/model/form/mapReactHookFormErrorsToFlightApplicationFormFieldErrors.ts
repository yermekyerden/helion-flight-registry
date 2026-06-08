import type { FieldErrors } from 'react-hook-form';

import { flightApplicationFormFieldNames as fieldNames } from './flightApplicationFormFieldNames';
import type { FlightApplicationFormFieldErrors } from './flightApplicationFormFieldErrors';
import type { FlightApplicationFormInputValues } from '../validation/flightApplicationFormSchema';

export function mapReactHookFormErrorsToFlightApplicationFormFieldErrors(
  errors: FieldErrors<FlightApplicationFormInputValues>,
): FlightApplicationFormFieldErrors {
  return {
    name: getErrorMessage(errors[fieldNames.name]),
    age: getErrorMessage(errors[fieldNames.age]),
    email: getErrorMessage(errors[fieldNames.email]),
    gender: getErrorMessage(errors[fieldNames.gender]),
    pilotPhoto: getErrorMessage(errors[fieldNames.pilotPhoto]),

    originSector: getErrorMessage(errors[fieldNames.originSector]),
    originWorld: getErrorMessage(errors[fieldNames.originWorld]),
    country: getErrorMessage(errors[fieldNames.country]),

    vesselName: getErrorMessage(errors[fieldNames.vesselName]),
    vesselClass: getErrorMessage(errors[fieldNames.vesselClass]),
    crewCapacity: getErrorMessage(errors[fieldNames.crewCapacity]),
    callsign: getErrorMessage(errors[fieldNames.callsign]),

    destinationSector: getErrorMessage(errors[fieldNames.destinationSector]),
    flightPurpose: getErrorMessage(errors[fieldNames.flightPurpose]),

    password: getErrorMessage(errors[fieldNames.password]),
    confirmPassword: getErrorMessage(errors[fieldNames.confirmPassword]),
    acceptedTerms: getErrorMessage(errors[fieldNames.acceptedTerms]),
  };
}

function getErrorMessage(error: unknown) {
  if (!hasStringMessage(error)) {
    return undefined;
  }

  return error.message;
}

function hasStringMessage(error: unknown): error is { message: string } {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  if (!('message' in error)) {
    return false;
  }

  return typeof error.message === 'string';
}
