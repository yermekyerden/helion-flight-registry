import type { ComponentProps } from 'react';

import { CheckboxField } from '@/shared/ui/checkbox-field/CheckboxField';
import { FormField } from '@/shared/ui/form-field/FormField';
import { FormSection } from '@/shared/ui/form-section/FormSection';
import { PasswordInput } from '@/shared/ui/password-input/PasswordInput';

import { flightApplicationFormContent as content } from '../../model/flightApplicationForm.content';
import type { FlightApplicationFormFieldErrors } from '../../model/flightApplicationFormFieldErrors';
import { PassphraseIntegrityPanel } from '../PassphraseIntegrityPanel';

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
      <FormField error={errors?.password} label={content.fields.password.label}>
        <PasswordInput
          placeholder={content.fields.password.placeholder}
          {...passwordInputProps}
        />
      </FormField>

      <FormField
        error={errors?.confirmPassword}
        label={content.fields.confirmPassword.label}
      >
        <PasswordInput
          placeholder={content.fields.confirmPassword.placeholder}
          {...confirmPasswordInputProps}
        />
      </FormField>

      <div className={style.fullWidth}>
        <PassphraseIntegrityPanel
          confirmPassword={confirmPassword}
          password={password}
        />
      </div>

      <div className={style.fullWidth}>
        <CheckboxField
          error={errors?.acceptedTerms}
          {...acceptedTermsInputProps}
        >
          {content.fields.acceptedTerms.label}
        </CheckboxField>
      </div>
    </FormSection>
  );
}
