import type { ComponentProps } from 'react';

import { CheckboxField } from '@/shared/ui/checkbox-field/CheckboxField';
import { FormField } from '@/shared/ui/form-field/FormField';
import { FormSection } from '@/shared/ui/form-section/FormSection';
import { PasswordInput } from '@/shared/ui/password-input/PasswordInput';

import { flightApplicationFormContent as content } from '@/features/submit-flight-application/model/form/flightApplicationForm.content';
import type { FlightApplicationFormFieldErrors } from '@/features/submit-flight-application/model/form/flightApplicationFormFieldErrors';
import { flightApplicationFormFieldNames as fieldNames } from '@/features/submit-flight-application/model/form/flightApplicationFormFieldNames';
import { PassphraseIntegrityPanel } from '../passphrase/PassphraseIntegrityPanel';

type SecurityClearanceFormSectionProps = {
  acceptedTermsInputProps?: Omit<
    ComponentProps<typeof CheckboxField>,
    'children' | 'error'
  >;
  confirmPassword?: string;
  confirmPasswordInputProps?: ComponentProps<typeof PasswordInput>;
  errors?: FlightApplicationFormFieldErrors;
  password?: string;
  passwordInputProps?: ComponentProps<typeof PasswordInput>;
};

const fieldIds = {
  password: 'flight-application-password',
  confirmPassword: 'flight-application-confirm-password',
  acceptedTerms: 'flight-application-accepted-terms',
} as const;

const style = {
  fullWidth: 'md:col-span-2',
} as const;

export function SecurityClearanceFormSection({
  acceptedTermsInputProps,
  confirmPassword = '',
  confirmPasswordInputProps,
  errors,
  password = '',
  passwordInputProps,
}: SecurityClearanceFormSectionProps) {
  return (
    <FormSection
      description={content.sections.securityClearance.description}
      title={content.sections.securityClearance.title}
    >
      <FormField
        error={errors?.password}
        id={fieldIds.password}
        label={content.fields.password.label}
      >
        {(fieldProps) => (
          <PasswordInput
            name={fieldNames.password}
            placeholder={content.fields.password.placeholder}
            {...passwordInputProps}
            {...fieldProps}
          />
        )}
      </FormField>

      <FormField
        error={errors?.confirmPassword}
        id={fieldIds.confirmPassword}
        label={content.fields.confirmPassword.label}
      >
        {(fieldProps) => (
          <PasswordInput
            name={fieldNames.confirmPassword}
            placeholder={content.fields.confirmPassword.placeholder}
            {...confirmPasswordInputProps}
            {...fieldProps}
          />
        )}
      </FormField>

      <div className={style.fullWidth}>
        <PassphraseIntegrityPanel
          confirmPassword={confirmPassword}
          password={password}
        />
      </div>

      <div className={style.fullWidth}>
        <CheckboxField
          {...acceptedTermsInputProps}
          error={errors?.acceptedTerms}
          id={fieldIds.acceptedTerms}
          name={fieldNames.acceptedTerms}
        >
          {content.fields.acceptedTerms.label}
        </CheckboxField>
      </div>
    </FormSection>
  );
}
