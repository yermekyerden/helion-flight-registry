import type { ComponentProps } from 'react';

import {
  flightPurposes,
  originSectors,
} from '@/shared/config/flightApplicationOptions';
import { FormField } from '@/shared/ui/form-field/FormField';
import { FormSection } from '@/shared/ui/form-section/FormSection';
import { SelectInput } from '@/shared/ui/select-input/SelectInput';

import { flightApplicationFormContent as content } from '@/features/complete-flight-application-form/model/flightApplicationForm.content';
import type { FlightApplicationFormFieldErrors } from '@/features/complete-flight-application-form/model/flightApplicationFormFieldErrors';
import { flightApplicationFormFieldNames as fieldNames } from '@/features/complete-flight-application-form/model/flightApplicationFormFieldNames';
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

const fieldIds = {
  destinationSector: 'flight-application-destination-sector',
  flightPurpose: 'flight-application-flight-purpose',
} as const;

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
        id={fieldIds.destinationSector}
        label={content.fields.destinationSector.label}
      >
        {(fieldProps) => (
          <SelectInput
            defaultValue=""
            name={fieldNames.destinationSector}
            {...destinationSectorSelectProps}
            {...fieldProps}
          >
            <option disabled value="">
              {content.selectPlaceholder}
            </option>

            <SelectOptions options={originSectors} />
          </SelectInput>
        )}
      </FormField>

      <FormField
        error={errors?.flightPurpose}
        id={fieldIds.flightPurpose}
        label={content.fields.flightPurpose.label}
      >
        {(fieldProps) => (
          <SelectInput
            defaultValue=""
            name={fieldNames.flightPurpose}
            {...flightPurposeSelectProps}
            {...fieldProps}
          >
            <option disabled value="">
              {content.selectPlaceholder}
            </option>

            <SelectOptions options={flightPurposes} />
          </SelectInput>
        )}
      </FormField>
    </FormSection>
  );
}
