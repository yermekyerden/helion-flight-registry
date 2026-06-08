import {
  useMemo,
  useState,
  type ChangeEvent,
  type ComponentPropsWithRef,
} from 'react';

import {
  selectAddFlightApplication,
  selectOriginCountryOptions,
} from '@/entities/flight-application/model/flightApplicationStore.selectors';
import { useFlightApplicationStore } from '@/entities/flight-application/model/flightApplicationStore';
import { cn } from '@/shared/lib/class-name/cn';
import { Button } from '@/shared/ui/button/Button';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

import { flightApplicationFormContent as content } from '@/features/submit-flight-application/model/form/flightApplicationForm.content';
import type { FlightApplicationFormFieldErrors } from '@/features/submit-flight-application/model/form/flightApplicationFormFieldErrors';
import { mapZodErrorToFlightApplicationFormFieldErrors } from '@/features/submit-flight-application/model/form/mapZodErrorToFlightApplicationFormFieldErrors';
import { readLegacyPilotIntakeFormData } from '@/features/submit-flight-application/model/form/readLegacyPilotIntakeFormData';
import { createFlightApplicationFromFormValues } from '@/features/submit-flight-application/model/mapping/createFlightApplicationFromFormValues';
import { createFlightApplicationFormSchema } from '@/features/submit-flight-application/model/validation/flightApplicationFormSchema';
import { FlightRequestFormSection } from '../sections/FlightRequestFormSection';
import { OriginRegistryFormSection } from '../sections/OriginRegistryFormSection';
import { PilotIdentityFormSection } from '../sections/PilotIdentityFormSection';
import { SecurityClearanceFormSection } from '../sections/SecurityClearanceFormSection';
import { VesselProfileFormSection } from '../sections/VesselProfileFormSection';

type LegacyPilotIntakeFormProps = {
  onSubmitted?: () => void;
};

type FormSubmitEvent = Parameters<
  NonNullable<ComponentPropsWithRef<'form'>['onSubmit']>
>[0];

const style = {
  form: 'space-y-5',
  actions: 'flex flex-col gap-3 border-t pt-5 sm:flex-row sm:justify-end',
} as const;

export function LegacyPilotIntakeForm({
  onSubmitted,
}: LegacyPilotIntakeFormProps) {
  const addFlightApplication = useFlightApplicationStore(
    selectAddFlightApplication,
  );

  const countryOptions = useFlightApplicationStore(selectOriginCountryOptions);

  const flightApplicationFormSchema = useMemo(
    () => createFlightApplicationFormSchema(countryOptions),
    [countryOptions],
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

      <OriginRegistryFormSection
        countryOptions={countryOptions}
        errors={errors}
      />

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

      <div className={cn(style.actions, themeClassNames.border.divider)}>
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

    const flightApplication = await createFlightApplicationFromFormValues({
      formValues: validationResult.data,
      protocol: 'legacy',
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
