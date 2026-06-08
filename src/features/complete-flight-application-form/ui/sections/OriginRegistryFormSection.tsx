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

import { flightApplicationFormContent as content } from '../../model/flightApplicationForm.content';
import type { FlightApplicationFormFieldErrors } from '../../model/flightApplicationFormFieldErrors';
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
        label={content.fields.originSector.label}
      >
        <SelectInput defaultValue="" {...originSectorSelectProps}>
          <option disabled value="">
            {content.selectPlaceholder}
          </option>

          <SelectOptions options={originSectors} />
        </SelectInput>
      </FormField>

      <FormField
        error={errors?.originWorld}
        label={content.fields.originWorld.label}
      >
        <TextInput
          maxLength={formLimits.originWorld.maxLength}
          placeholder={content.fields.originWorld.placeholder}
          {...originWorldInputProps}
        />
      </FormField>

      <div className={style.fullWidth}>
        <FormField
          error={errors?.country}
          hint={content.fields.country.hint}
          label={content.fields.country.label}
        >
          <SelectInput defaultValue="" {...countrySelectProps}>
            <option disabled value="">
              {content.selectPlaceholder}
            </option>

            <SelectOptions options={originAuthorities} />
          </SelectInput>
        </FormField>
      </div>
    </FormSection>
  );
}
