import { flightApplicationFormFieldNames as fieldNames } from './flightApplicationFormFieldNames';

export function readLegacyPilotIntakeFormData(formElement: HTMLFormElement) {
  const formData = new FormData(formElement);

  return {
    name: getStringFormValue(formData, fieldNames.name),
    age: getStringFormValue(formData, fieldNames.age),
    email: getStringFormValue(formData, fieldNames.email),
    gender: getStringFormValue(formData, fieldNames.gender),
    pilotPhoto: getFileFormValue(formData, fieldNames.pilotPhoto),

    originSector: getStringFormValue(formData, fieldNames.originSector),
    originWorld: getStringFormValue(formData, fieldNames.originWorld),
    country: getStringFormValue(formData, fieldNames.country),

    vesselName: getStringFormValue(formData, fieldNames.vesselName),
    vesselClass: getStringFormValue(formData, fieldNames.vesselClass),
    crewCapacity: getStringFormValue(formData, fieldNames.crewCapacity),
    callsign: getStringFormValue(formData, fieldNames.callsign),

    destinationSector: getStringFormValue(
      formData,
      fieldNames.destinationSector,
    ),
    flightPurpose: getStringFormValue(formData, fieldNames.flightPurpose),

    password: getStringFormValue(formData, fieldNames.password),
    confirmPassword: getStringFormValue(formData, fieldNames.confirmPassword),
    acceptedTerms: formData.has(fieldNames.acceptedTerms),
  };
}

function getStringFormValue(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);

  if (typeof value !== 'string') {
    return '';
  }

  return value;
}

function getFileFormValue(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);

  if (!(value instanceof File)) {
    return undefined;
  }

  if (isEmptyFile(value)) {
    return undefined;
  }

  return value;
}

function isEmptyFile(file: File) {
  return file.name.length === 0 && file.size === 0;
}
