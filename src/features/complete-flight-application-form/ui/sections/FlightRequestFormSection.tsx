import type { ComponentProps } from 'react';

import {
  flightPurposes,
  originSectors,
} from '@/shared/config/flightApplicationOptions';
import { FormField } from '@/shared/ui/form-field/FormField';
import { FormSection } from '@/shared/ui/form-section/FormSection';
import { SelectInput } from '@/shared/ui/select-input/SelectInput';

import { flightApplicationFormContent as content } from '../../model/flightApplicationForm.content';
import type { FlightApplicationFormFieldErrors } from '../../model/flightApplicationFormFieldErrors';
import { SelectOptions } from './SelectOptions';

type FlightRequestFormSectionProps = {
  destinationSectorSelectProps?: Omit<
    ComponentProps<typeof SelectInput>,
    'children'
  >;
  errors?: FlightApplicationFormFieldErrors;
  flightPurposeSelectProps?: Omit<
    ComponentProps<typeof SelectInput>,
    'children'
  >;
};

export function FlightRequestFormSection({
  destinationSectorSelectProps,
  errors,
  flightPurposeSelectProps,
}: FlightRequestFormSectionProps) {
  return (
    <FormSection
      description={content.sections.flightRequest.description}
      title={content.sections.flightRequest.title}
    >
      <FormField
        error={errors?.destinationSector}
        label={content.fields.destinationSector.label}
      >
        <SelectInput defaultValue="" {...destinationSectorSelectProps}>
          <option disabled value="">
            {content.selectPlaceholder}
          </option>

          <SelectOptions options={originSectors} />
        </SelectInput>
      </FormField>

      <FormField
        error={errors?.flightPurpose}
        label={content.fields.flightPurpose.label}
      >
        <SelectInput defaultValue="" {...flightPurposeSelectProps}>
          <option disabled value="">
            {content.selectPlaceholder}
          </option>

          <SelectOptions options={flightPurposes} />
        </SelectInput>
      </FormField>
    </FormSection>
  );
}
