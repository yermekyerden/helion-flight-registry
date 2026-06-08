import { useState, type ChangeEvent, type ComponentPropsWithRef } from 'react';

import { flightApplicationFormContent as content } from '@/features/complete-flight-application-form/model/flightApplicationForm.content';
import { FlightRequestFormSection } from '@/features/complete-flight-application-form/ui/sections/FlightRequestFormSection';
import { OriginRegistryFormSection } from '@/features/complete-flight-application-form/ui/sections/OriginRegistryFormSection';
import { PilotIdentityFormSection } from '@/features/complete-flight-application-form/ui/sections/PilotIdentityFormSection';
import { SecurityClearanceFormSection } from '@/features/complete-flight-application-form/ui/sections/SecurityClearanceFormSection';
import { VesselProfileFormSection } from '@/features/complete-flight-application-form/ui/sections/VesselProfileFormSection';
import { Button } from '@/shared/ui/button/Button';

type FormSubmitEvent = Parameters<
  NonNullable<ComponentPropsWithRef<'form'>['onSubmit']>
>[0];

const style = {
  form: 'space-y-5',
  actions:
    'flex flex-col gap-3 border-t border-zinc-200 pt-5 sm:flex-row sm:justify-end dark:border-slate-800',
} as const;

export function LegacyPilotIntakeForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <form
      className={style.form}
      noValidate
      onReset={handleFormReset}
      onSubmit={handlePlaceholderSubmit}
    >
      <PilotIdentityFormSection />
      <OriginRegistryFormSection />
      <VesselProfileFormSection />
      <FlightRequestFormSection />

      <SecurityClearanceFormSection
        confirmPassword={confirmPassword}
        confirmPasswordInputProps={{
          onChange: handleConfirmPasswordChange,
          value: confirmPassword,
        }}
        password={password}
        passwordInputProps={{
          onChange: handlePasswordChange,
          value: password,
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
    setPassword('');
    setConfirmPassword('');
  }

  function handlePlaceholderSubmit(event: FormSubmitEvent) {
    event.preventDefault();
  }
}
