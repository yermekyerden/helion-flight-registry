import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

import { selectAddFlightApplication } from '@/entities/flight-application/model/flightApplicationStore.selectors';
import { useFlightApplicationStore } from '@/entities/flight-application/model/flightApplicationStore';
import { flightApplicationFormContent as content } from '@/features/complete-flight-application-form/model/flightApplicationForm.content';
import { flightApplicationFormFieldNames as fieldNames } from '@/features/complete-flight-application-form/model/flightApplicationFormFieldNames';
import { mapFlightApplicationFormToFlightApplication } from '@/features/complete-flight-application-form/model/mapFlightApplicationFormToFlightApplication';
import { mapReactHookFormErrorsToFlightApplicationFormFieldErrors } from '@/features/complete-flight-application-form/model/mapReactHookFormErrorsToFlightApplicationFormFieldErrors';
import { FlightRequestFormSection } from '@/features/complete-flight-application-form/ui/sections/FlightRequestFormSection';
import { OriginRegistryFormSection } from '@/features/complete-flight-application-form/ui/sections/OriginRegistryFormSection';
import { PilotIdentityFormSection } from '@/features/complete-flight-application-form/ui/sections/PilotIdentityFormSection';
import { SecurityClearanceFormSection } from '@/features/complete-flight-application-form/ui/sections/SecurityClearanceFormSection';
import { VesselProfileFormSection } from '@/features/complete-flight-application-form/ui/sections/VesselProfileFormSection';
import { readFileAsDataUrl } from '@/shared/lib/file/readFileAsDataUrl';
import {
  flightApplicationFormSchema,
  type FlightApplicationFormInputValues,
  type FlightApplicationFormValues,
} from '@/shared/lib/validation/flight-application';
import { Button } from '@/shared/ui/button/Button';

type AssistedFlightClearanceFormProps = {
  onSubmitted?: () => void;
};

const style = {
  form: 'space-y-5',
  actions:
    'flex flex-col gap-3 border-t border-zinc-200 pt-5 sm:flex-row sm:justify-end dark:border-slate-800',
} as const;

export function AssistedFlightClearanceForm({
  onSubmitted,
}: AssistedFlightClearanceFormProps) {
  const addFlightApplication = useFlightApplicationStore(
    selectAddFlightApplication,
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

  function handleFormReset() {
    reset();
  }

  async function handleValidSubmit(formValues: FlightApplicationFormValues) {
    const pilotPhotoDataUrl = await readFileAsDataUrl(formValues.pilotPhoto);

    const flightApplication = mapFlightApplicationFormToFlightApplication({
      formValues,
      id: crypto.randomUUID(),
      pilotPhotoDataUrl,
      protocol: 'assisted',
      submittedAt: new Date().toISOString(),
    });

    addFlightApplication(flightApplication);
    reset();
    onSubmitted?.();
  }

  return (
    <form
      className={style.form}
      noValidate
      onReset={handleFormReset}
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
        countrySelectProps={register(fieldNames.country)}
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

      <div className={style.actions}>
        <Button type="reset" variant="secondary">
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
