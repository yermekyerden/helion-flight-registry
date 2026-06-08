import type { ComponentProps } from 'react';

import { vesselClasses } from '@/shared/config/flightApplicationOptions';
import { formLimits } from '@/shared/config/formLimits';
import { FormField } from '@/shared/ui/form-field/FormField';
import { FormSection } from '@/shared/ui/form-section/FormSection';
import { NumberInput } from '@/shared/ui/number-input/NumberInput';
import { SelectInput } from '@/shared/ui/select-input/SelectInput';
import { TextInput } from '@/shared/ui/text-input/TextInput';

import { flightApplicationFormContent as content } from '../../model/flightApplicationForm.content';
import type { FlightApplicationFormFieldErrors } from '../../model/flightApplicationFormFieldErrors';
import { SelectOptions } from './SelectOptions';

type VesselProfileFormSectionProps = {
  callsignInputProps?: ComponentProps<typeof TextInput>;
  crewCapacityInputProps?: ComponentProps<typeof NumberInput>;
  errors?: FlightApplicationFormFieldErrors;
  vesselClassSelectProps?: Omit<ComponentProps<typeof SelectInput>, 'children'>;
  vesselNameInputProps?: ComponentProps<typeof TextInput>;
};

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
        label={content.fields.vesselName.label}
      >
        <TextInput
          maxLength={formLimits.vesselName.maxLength}
          placeholder={content.fields.vesselName.placeholder}
          {...vesselNameInputProps}
        />
      </FormField>

      <FormField
        error={errors?.vesselClass}
        label={content.fields.vesselClass.label}
      >
        <SelectInput defaultValue="" {...vesselClassSelectProps}>
          <option disabled value="">
            {content.selectPlaceholder}
          </option>

          <SelectOptions options={vesselClasses} />
        </SelectInput>
      </FormField>

      <FormField
        error={errors?.crewCapacity}
        label={content.fields.crewCapacity.label}
      >
        <NumberInput
          max={formLimits.crewCapacity.max}
          min={formLimits.crewCapacity.min}
          placeholder={content.fields.crewCapacity.placeholder}
          {...crewCapacityInputProps}
        />
      </FormField>

      <FormField
        error={errors?.callsign}
        hint={content.fields.callsign.hint}
        label={content.fields.callsign.label}
      >
        <TextInput
          maxLength={formLimits.callsign.maxLength}
          placeholder={content.fields.callsign.placeholder}
          {...callsignInputProps}
        />
      </FormField>
    </FormSection>
  );
}
