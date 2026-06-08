import type { ComponentProps } from 'react';

import {
  originAuthorities,
  originSectors,
} from '@/shared/config/flightApplicationOptions';
import { formLimits } from '@/shared/config/formLimits';
import { FormField } from '@/shared/ui/form-field/FormField';
import { FormSection } from '@/shared/ui/form-section/FormSection';
import { SelectInput } from '@/shared/ui/select-input/SelectInput';
import { TextInput } from '@/shared/ui/text-input/TextInput';

import { flightApplicationFormContent as content } from '@/features/complete-flight-application-form/model/flightApplicationForm.content';
import type { FlightApplicationFormFieldErrors } from '@/features/complete-flight-application-form/model/flightApplicationFormFieldErrors';
import { flightApplicationFormFieldNames as fieldNames } from '@/features/complete-flight-application-form/model/flightApplicationFormFieldNames';
import { SelectOptions } from './SelectOptions';

type OriginRegistryFormSectionProps = {
  countrySelectProps?: Omit<ComponentProps<typeof SelectInput>, 'children'>;
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
} as const;

const style = {
  fullWidth: 'md:col-span-2',
} as const;

export function OriginRegistryFormSection({
  countrySelectProps,
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
            maxLength={formLimits.originWorld.maxLength}
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
            <SelectInput
              defaultValue=""
              name={fieldNames.country}
              {...countrySelectProps}
              {...fieldProps}
            >
              <option disabled value="">
                {content.selectPlaceholder}
              </option>

              <SelectOptions options={originAuthorities} />
            </SelectInput>
          )}
        </FormField>
      </div>
    </FormSection>
  );
}
