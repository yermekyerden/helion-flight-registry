import { useState, type ChangeEvent, type ComponentPropsWithRef } from 'react';

import { selectAddFlightApplication } from '@/entities/flight-application/model/flightApplicationStore.selectors';
import { useFlightApplicationStore } from '@/entities/flight-application/model/flightApplicationStore';
import { flightApplicationFormContent as content } from '@/features/complete-flight-application-form/model/flightApplicationForm.content';
import type { FlightApplicationFormFieldErrors } from '@/features/complete-flight-application-form/model/flightApplicationFormFieldErrors';
import { mapFlightApplicationFormToFlightApplication } from '@/features/complete-flight-application-form/model/mapFlightApplicationFormToFlightApplication';
import { mapZodErrorToFlightApplicationFormFieldErrors } from '@/features/complete-flight-application-form/model/mapZodErrorToFlightApplicationFormFieldErrors';
import { FlightRequestFormSection } from '@/features/complete-flight-application-form/ui/sections/FlightRequestFormSection';
import { OriginRegistryFormSection } from '@/features/complete-flight-application-form/ui/sections/OriginRegistryFormSection';
import { PilotIdentityFormSection } from '@/features/complete-flight-application-form/ui/sections/PilotIdentityFormSection';
import { SecurityClearanceFormSection } from '@/features/complete-flight-application-form/ui/sections/SecurityClearanceFormSection';
import { VesselProfileFormSection } from '@/features/complete-flight-application-form/ui/sections/VesselProfileFormSection';
import { readFileAsDataUrl } from '@/shared/lib/file/readFileAsDataUrl';
import { flightApplicationFormSchema } from '@/shared/lib/validation/flight-application';
import { Button } from '@/shared/ui/button/Button';

import { readLegacyPilotIntakeFormData } from '../model/readLegacyPilotIntakeFormData';

type LegacyPilotIntakeFormProps = {
  onSubmitted?: () => void;
};

type FormSubmitEvent = Parameters<
  NonNullable<ComponentPropsWithRef<'form'>['onSubmit']>
>[0];

const style = {
  form: 'space-y-5',
  actions:
    'flex flex-col gap-3 border-t border-zinc-200 pt-5 sm:flex-row sm:justify-end dark:border-slate-800',
} as const;

export function LegacyPilotIntakeForm({
  onSubmitted,
}: LegacyPilotIntakeFormProps) {
  const addFlightApplication = useFlightApplicationStore(
    selectAddFlightApplication,
  );

  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FlightApplicationFormFieldErrors>({});
  const [password, setPassword] = useState('');

  return (
    <form
      className={style.form}
      noValidate
      onReset={handleFormReset}
      onSubmit={handleFormSubmit}
    >
      <PilotIdentityFormSection errors={errors} />
      <OriginRegistryFormSection errors={errors} />
      <VesselProfileFormSection errors={errors} />
      <FlightRequestFormSection errors={errors} />

      <SecurityClearanceFormSection
        confirmPassword={confirmPassword}
        confirmPasswordInputProps={{
          onChange: handleConfirmPasswordChange,
        }}
        errors={errors}
        password={password}
        passwordInputProps={{
          onChange: handlePasswordChange,
        }}
      />

      <div className={style.actions}>
        <Button type="reset" variant="secondary">
          {content.actions.resetButtonLabel}
        </Button>

        <Button type="submit" variant="primary">
          {content.actions.legacySubmitButtonLabel}
        </Button>
      </div>
    </form>
  );

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(event.target.value);
  }

  function handleFormReset() {
    clearFormState();
  }

  async function handleFormSubmit(event: FormSubmitEvent) {
    event.preventDefault();

    const formElement = event.currentTarget;
    const rawFormValues = readLegacyPilotIntakeFormData(formElement);
    const validationResult =
      flightApplicationFormSchema.safeParse(rawFormValues);

    if (!validationResult.success) {
      setErrors(
        mapZodErrorToFlightApplicationFormFieldErrors(validationResult.error),
      );
      return;
    }

    const pilotPhotoDataUrl = await readFileAsDataUrl(
      validationResult.data.pilotPhoto,
    );

    const flightApplication = mapFlightApplicationFormToFlightApplication({
      formValues: validationResult.data,
      id: crypto.randomUUID(),
      pilotPhotoDataUrl,
      protocol: 'legacy',
      submittedAt: new Date().toISOString(),
    });

    addFlightApplication(flightApplication);
    formElement.reset();
    clearFormState();
    onSubmitted?.();
  }

  function clearFormState() {
    setConfirmPassword('');
    setErrors({});
    setPassword('');
  }
}
