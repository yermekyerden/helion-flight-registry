import type { ComponentProps } from 'react';

import { vesselClasses } from '@/entities/flight-application/model/flightApplicationOptions';
import { flightApplicationFormLimits } from '@/shared/config/flightApplicationFormLimits';
import { FormField } from '@/shared/ui/form-field/FormField';
import { FormSection } from '@/shared/ui/form-section/FormSection';
import { NumberInput } from '@/shared/ui/number-input/NumberInput';
import { SelectInput } from '@/shared/ui/select-input/SelectInput';
import { TextInput } from '@/shared/ui/text-input/TextInput';

import { flightApplicationFormContent as content } from '@/features/submit-flight-application/model/form/flightApplicationForm.content';
import type { FlightApplicationFormFieldErrors } from '@/features/submit-flight-application/model/form/flightApplicationFormFieldErrors';
import { flightApplicationFormFieldNames as fieldNames } from '@/features/submit-flight-application/model/form/flightApplicationFormFieldNames';
import { SelectOptions } from './SelectOptions';

type VesselProfileFormSectionProps = {
  callsignInputProps?: ComponentProps<typeof TextInput>;
  crewCapacityInputProps?: ComponentProps<typeof NumberInput>;
  errors?: FlightApplicationFormFieldErrors;
  vesselClassSelectProps?: Omit<ComponentProps<typeof SelectInput>, 'children'>;
  vesselNameInputProps?: ComponentProps<typeof TextInput>;
};

const fieldIds = {
  vesselName: 'flight-application-vessel-name',
  vesselClass: 'flight-application-vessel-class',
  crewCapacity: 'flight-application-crew-capacity',
  callsign: 'flight-application-callsign',
} as const;

export function VesselProfileFormSection({
  callsignInputProps,
  crewCapacityInputProps,
  errors,
  vesselClassSelectProps,
  vesselNameInputProps,
}: VesselProfileFormSectionProps) {
  return (
    <FormSection
      description={content.sections.vesselProfile.description}
      title={content.sections.vesselProfile.title}
    >
      <FormField
        error={errors?.vesselName}
        id={fieldIds.vesselName}
        label={content.fields.vesselName.label}
      >
        {(fieldProps) => (
          <TextInput
            maxLength={flightApplicationFormLimits.vesselName.maxLength}
            name={fieldNames.vesselName}
            placeholder={content.fields.vesselName.placeholder}
            {...vesselNameInputProps}
            {...fieldProps}
          />
        )}
      </FormField>

      <FormField
        error={errors?.vesselClass}
        id={fieldIds.vesselClass}
        label={content.fields.vesselClass.label}
      >
        {(fieldProps) => (
          <SelectInput
            defaultValue=""
            name={fieldNames.vesselClass}
            {...vesselClassSelectProps}
            {...fieldProps}
          >
            <option disabled value="">
              {content.selectPlaceholder}
            </option>

            <SelectOptions options={vesselClasses} />
          </SelectInput>
        )}
      </FormField>

      <FormField
        error={errors?.crewCapacity}
        id={fieldIds.crewCapacity}
        label={content.fields.crewCapacity.label}
      >
        {(fieldProps) => (
          <NumberInput
            max={flightApplicationFormLimits.crewCapacity.max}
            min={flightApplicationFormLimits.crewCapacity.min}
            name={fieldNames.crewCapacity}
            placeholder={content.fields.crewCapacity.placeholder}
            {...crewCapacityInputProps}
            {...fieldProps}
          />
        )}
      </FormField>

      <FormField
        error={errors?.callsign}
        hint={content.fields.callsign.hint}
        id={fieldIds.callsign}
        label={content.fields.callsign.label}
      >
        {(fieldProps) => (
          <TextInput
            maxLength={flightApplicationFormLimits.callsign.maxLength}
            name={fieldNames.callsign}
            placeholder={content.fields.callsign.placeholder}
            {...callsignInputProps}
            {...fieldProps}
          />
        )}
      </FormField>
    </FormSection>
  );
}
