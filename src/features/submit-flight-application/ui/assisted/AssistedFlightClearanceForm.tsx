import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import {
  selectAddFlightApplication,
  selectOriginCountryOptions,
} from '@/entities/flight-application/model/flightApplicationStore.selectors';
import { useFlightApplicationStore } from '@/entities/flight-application/model/flightApplicationStore';
import { cn } from '@/shared/lib/class-name/cn';
import { Button } from '@/shared/ui/button/Button';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

import { flightApplicationFormContent as content } from '@/features/submit-flight-application/model/form/flightApplicationForm.content';
import { flightApplicationFormFieldNames as fieldNames } from '@/features/submit-flight-application/model/form/flightApplicationFormFieldNames';
import { mapReactHookFormErrorsToFlightApplicationFormFieldErrors } from '@/features/submit-flight-application/model/form/mapReactHookFormErrorsToFlightApplicationFormFieldErrors';
import { createFlightApplicationFromFormValues } from '@/features/submit-flight-application/model/mapping/createFlightApplicationFromFormValues';
import {
  createFlightApplicationFormSchema,
  type FlightApplicationFormInputValues,
  type FlightApplicationFormValues,
} from '@/features/submit-flight-application/model/validation/flightApplicationFormSchema';
import { FlightRequestFormSection } from '../sections/FlightRequestFormSection';
import { OriginRegistryFormSection } from '../sections/OriginRegistryFormSection';
import { PilotIdentityFormSection } from '../sections/PilotIdentityFormSection';
import { SecurityClearanceFormSection } from '../sections/SecurityClearanceFormSection';
import { VesselProfileFormSection } from '../sections/VesselProfileFormSection';

type AssistedFlightClearanceFormProps = {
  onSubmitted?: () => void;
};

const style = {
  form: 'space-y-5',
  actions: 'flex flex-col gap-3 border-t pt-5 sm:flex-row sm:justify-end',
} as const;

export function AssistedFlightClearanceForm({
  onSubmitted,
}: AssistedFlightClearanceFormProps) {
  const addFlightApplication = useFlightApplicationStore(
    selectAddFlightApplication,
  );

  const countryOptions = useFlightApplicationStore(selectOriginCountryOptions);

  const flightApplicationFormSchema = useMemo(
    () => createFlightApplicationFormSchema(countryOptions),
    [countryOptions],
  );

  const {
    control,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm<
    FlightApplicationFormInputValues,
    unknown,
    FlightApplicationFormValues
  >({
    mode: 'onChange',
    resolver: zodResolver(flightApplicationFormSchema),
  });

  const watchedPassword = useWatch({
    control,
    name: fieldNames.password,
  });

  const watchedConfirmPassword = useWatch({
    control,
    name: fieldNames.confirmPassword,
  });

  const password = getWatchedStringValue(watchedPassword);
  const confirmPassword = getWatchedStringValue(watchedConfirmPassword);
  const fieldErrors =
    mapReactHookFormErrorsToFlightApplicationFormFieldErrors(errors);

  async function handleValidSubmit(formValues: FlightApplicationFormValues) {
    const flightApplication = await createFlightApplicationFromFormValues({
      formValues,
      protocol: 'assisted',
    });

    addFlightApplication(flightApplication);
    reset();
    onSubmitted?.();
  }

  function handleFormReset() {
    reset();
  }

  return (
    <form
      className={style.form}
      noValidate
      onSubmit={handleSubmit(handleValidSubmit)}
    >
      <PilotIdentityFormSection
        ageInputProps={register(fieldNames.age)}
        emailInputProps={register(fieldNames.email)}
        errors={fieldErrors}
        genderSelectProps={register(fieldNames.gender)}
        nameInputProps={register(fieldNames.name)}
        pilotPhotoInputProps={register(fieldNames.pilotPhoto)}
      />

      <OriginRegistryFormSection
        countryInputProps={register(fieldNames.country)}
        countryOptions={countryOptions}
        errors={fieldErrors}
        originSectorSelectProps={register(fieldNames.originSector)}
        originWorldInputProps={register(fieldNames.originWorld)}
      />

      <VesselProfileFormSection
        callsignInputProps={register(fieldNames.callsign)}
        crewCapacityInputProps={register(fieldNames.crewCapacity)}
        errors={fieldErrors}
        vesselClassSelectProps={register(fieldNames.vesselClass)}
        vesselNameInputProps={register(fieldNames.vesselName)}
      />

      <FlightRequestFormSection
        destinationSectorSelectProps={register(fieldNames.destinationSector)}
        errors={fieldErrors}
        flightPurposeSelectProps={register(fieldNames.flightPurpose)}
      />

      <SecurityClearanceFormSection
        acceptedTermsInputProps={register(fieldNames.acceptedTerms)}
        confirmPassword={confirmPassword}
        confirmPasswordInputProps={register(fieldNames.confirmPassword)}
        errors={fieldErrors}
        password={password}
        passwordInputProps={register(fieldNames.password)}
      />

      <div className={cn(style.actions, themeClassNames.border.divider)}>
        <Button onClick={handleFormReset} type="button" variant="secondary">
          {content.actions.resetButtonLabel}
        </Button>

        <Button
          disabled={!isValid || isSubmitting}
          type="submit"
          variant="primary"
        >
          {content.actions.assistedSubmitButtonLabel}
        </Button>
      </div>
    </form>
  );
}

function getWatchedStringValue(value: unknown) {
  if (typeof value !== 'string') {
    return '';
  }

  return value;
}
