import type { ComponentProps } from 'react';

import { identityMarkers } from '@/shared/config/flightApplicationOptions';
import { formLimits } from '@/shared/config/formLimits';
import { FileInput } from '@/shared/ui/file-input/FileInput';
import { FormField } from '@/shared/ui/form-field/FormField';
import { FormSection } from '@/shared/ui/form-section/FormSection';
import { NumberInput } from '@/shared/ui/number-input/NumberInput';
import { SelectInput } from '@/shared/ui/select-input/SelectInput';
import { TextInput } from '@/shared/ui/text-input/TextInput';

import { flightApplicationFormContent as content } from '@/features/complete-flight-application-form/model/flightApplicationForm.content';
import type { FlightApplicationFormFieldErrors } from '@/features/complete-flight-application-form/model/flightApplicationFormFieldErrors';
import { SelectOptions } from './SelectOptions';

type PilotIdentityFormSectionProps = {
  ageInputProps?: ComponentProps<typeof NumberInput>;
  emailInputProps?: ComponentProps<typeof TextInput>;
  errors?: FlightApplicationFormFieldErrors;
  genderSelectProps?: Omit<ComponentProps<typeof SelectInput>, 'children'>;
  nameInputProps?: ComponentProps<typeof TextInput>;
  pilotPhotoInputProps?: ComponentProps<typeof FileInput>;
};

const acceptedImageMimeTypes = formLimits.image.acceptedMimeTypes.join(',');

const fieldIds = {
  name: 'flight-application-name',
  age: 'flight-application-age',
  email: 'flight-application-email',
  gender: 'flight-application-gender',
  pilotPhoto: 'flight-application-pilot-photo',
} as const;

const style = {
  fullWidth: 'md:col-span-2',
} as const;

export function PilotIdentityFormSection({
  ageInputProps,
  emailInputProps,
  errors,
  genderSelectProps,
  nameInputProps,
  pilotPhotoInputProps,
}: PilotIdentityFormSectionProps) {
  return (
    <FormSection
      description={content.sections.pilotIdentity.description}
      title={content.sections.pilotIdentity.title}
    >
      <FormField
        error={errors?.name}
        id={fieldIds.name}
        label={content.fields.name.label}
      >
        {(fieldProps) => (
          <TextInput
            maxLength={formLimits.name.maxLength}
            placeholder={content.fields.name.placeholder}
            {...nameInputProps}
            {...fieldProps}
          />
        )}
      </FormField>

      <FormField
        error={errors?.age}
        id={fieldIds.age}
        label={content.fields.age.label}
      >
        {(fieldProps) => (
          <NumberInput
            max={formLimits.age.max}
            min={formLimits.age.min}
            placeholder={content.fields.age.placeholder}
            {...ageInputProps}
            {...fieldProps}
          />
        )}
      </FormField>

      <div className={style.fullWidth}>
        <FormField
          error={errors?.email}
          hint={content.fields.email.hint}
          id={fieldIds.email}
          label={content.fields.email.label}
        >
          {(fieldProps) => (
            <TextInput
              placeholder={content.fields.email.placeholder}
              {...emailInputProps}
              {...fieldProps}
            />
          )}
        </FormField>
      </div>

      <FormField
        error={errors?.gender}
        id={fieldIds.gender}
        label={content.fields.gender.label}
      >
        {(fieldProps) => (
          <SelectInput defaultValue="" {...genderSelectProps} {...fieldProps}>
            <option disabled value="">
              {content.selectPlaceholder}
            </option>

            <SelectOptions options={identityMarkers} />
          </SelectInput>
        )}
      </FormField>

      <div className={style.fullWidth}>
        <FormField
          error={errors?.pilotPhoto}
          hint={content.fields.pilotPhoto.hint}
          id={fieldIds.pilotPhoto}
          label={content.fields.pilotPhoto.label}
        >
          {(fieldProps) => (
            <FileInput
              {...pilotPhotoInputProps}
              accept={acceptedImageMimeTypes}
              {...fieldProps}
            />
          )}
        </FormField>
      </div>
    </FormSection>
  );
}
