import type { ComponentProps } from 'react';

import { flightApplicationFormContent as content } from '@/features/submit-flight-application/model/form/flightApplicationForm.content';
import type { FlightApplicationFormFieldErrors } from '@/features/submit-flight-application/model/form/flightApplicationFormFieldErrors';
import { flightApplicationFormFieldNames as fieldNames } from '@/features/submit-flight-application/model/form/flightApplicationFormFieldNames';
import { originSectors } from '@/entities/flight-application/model/flightApplicationOptions';
import { flightApplicationFormLimits } from '@/shared/config/flightApplicationFormLimits';
import { AutocompleteInput } from '@/shared/ui/autocomplete-input/AutocompleteInput';
import { FormField } from '@/shared/ui/form-field/FormField';
import { FormSection } from '@/shared/ui/form-section/FormSection';
import { SelectInput } from '@/shared/ui/select-input/SelectInput';
import { TextInput } from '@/shared/ui/text-input/TextInput';

import { SelectOptions } from './SelectOptions';

type OriginRegistryFormSectionProps = {
  countryInputProps?: Omit<
    ComponentProps<typeof AutocompleteInput>,
    'listId' | 'options'
  >;
  countryOptions: readonly string[];
  errors?: FlightApplicationFormFieldErrors;
  originSectorSelectProps?: Omit<
    ComponentProps<typeof SelectInput>,
    'children'
  >;
  originWorldInputProps?: ComponentProps<typeof TextInput>;
};

const fieldIds = {
  originSector: 'flight-application-origin-sector',
  originWorld: 'flight-application-origin-world',
  country: 'flight-application-country',
  countryOptions: 'flight-application-country-options',
} as const;

const style = {
  fullWidth: 'md:col-span-2',
} as const;

export function OriginRegistryFormSection({
  countryInputProps,
  countryOptions,
  errors,
  originSectorSelectProps,
  originWorldInputProps,
}: OriginRegistryFormSectionProps) {
  return (
    <FormSection
      description={content.sections.originRegistry.description}
      title={content.sections.originRegistry.title}
    >
      <FormField
        error={errors?.originSector}
        id={fieldIds.originSector}
        label={content.fields.originSector.label}
      >
        {(fieldProps) => (
          <SelectInput
            defaultValue=""
            name={fieldNames.originSector}
            {...originSectorSelectProps}
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
        error={errors?.originWorld}
        id={fieldIds.originWorld}
        label={content.fields.originWorld.label}
      >
        {(fieldProps) => (
          <TextInput
            autoComplete="off"
            maxLength={flightApplicationFormLimits.originWorld.maxLength}
            name={fieldNames.originWorld}
            placeholder={content.fields.originWorld.placeholder}
            {...originWorldInputProps}
            {...fieldProps}
          />
        )}
      </FormField>

      <div className={style.fullWidth}>
        <FormField
          error={errors?.country}
          hint={content.fields.country.hint}
          id={fieldIds.country}
          label={content.fields.country.label}
        >
          {(fieldProps) => (
            <AutocompleteInput
              autoComplete="country-name"
              listId={fieldIds.countryOptions}
              name={fieldNames.country}
              options={countryOptions}
              placeholder={content.fields.country.placeholder}
              {...countryInputProps}
              {...fieldProps}
            />
          )}
        </FormField>
      </div>
    </FormSection>
  );
}
