import { useState, type ChangeEvent } from 'react';

import { FlightRequestFormSection } from './sections/FlightRequestFormSection';
import { OriginRegistryFormSection } from './sections/OriginRegistryFormSection';
import { PilotIdentityFormSection } from './sections/PilotIdentityFormSection';
import { SecurityClearanceFormSection } from './sections/SecurityClearanceFormSection';
import { VesselProfileFormSection } from './sections/VesselProfileFormSection';

const style = {
  stack: 'space-y-5',
} as const;

export function FlightApplicationFormPreview() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className={style.stack}>
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
    </div>
  );

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(event.target.value);
  }
}
