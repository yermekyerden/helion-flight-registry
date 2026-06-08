import {
  flightPurposes,
  identityMarkers,
  originAuthorities,
  originSectors,
  vesselClasses,
} from '@/shared/config/flightApplicationOptions';
import { formLimits } from '@/shared/config/formLimits';
import { CheckboxField } from '@/shared/ui/checkbox-field/CheckboxField';
import { FormField } from '@/shared/ui/form-field/FormField';
import { FormSection } from '@/shared/ui/form-section/FormSection';
import { NumberInput } from '@/shared/ui/number-input/NumberInput';
import { SelectInput } from '@/shared/ui/select-input/SelectInput';
import { TextInput } from '@/shared/ui/text-input/TextInput';

import { flightApplicationFormContent as content } from '../model/flightApplicationForm.content';

const style = {
  stack: 'space-y-5',
  fullWidth: 'md:col-span-2',
} as const;

export function FlightApplicationFormPreview() {
  return (
    <div className={style.stack}>
      <PilotIdentitySection />
      <OriginRegistrySection />
      <VesselProfileSection />
      <FlightRequestSection />
      <SecurityClearanceSection />
    </div>
  );
}

function PilotIdentitySection() {
  return (
    <FormSection
      description={content.sections.pilotIdentity.description}
      title={content.sections.pilotIdentity.title}
    >
      <FormField label={content.fields.name.label}>
        <TextInput
          maxLength={formLimits.name.maxLength}
          placeholder={content.fields.name.placeholder}
        />
      </FormField>

      <FormField label={content.fields.age.label}>
        <NumberInput
          max={formLimits.age.max}
          min={formLimits.age.min}
          placeholder={content.fields.age.placeholder}
        />
      </FormField>

      <div className={style.fullWidth}>
        <FormField
          hint={content.fields.email.hint}
          label={content.fields.email.label}
        >
          <TextInput placeholder={content.fields.email.placeholder} />
        </FormField>
      </div>

      <FormField label={content.fields.gender.label}>
        <SelectInput defaultValue="">
          <SelectPlaceholder />
          <SelectOptions options={identityMarkers} />
        </SelectInput>
      </FormField>
    </FormSection>
  );
}

function OriginRegistrySection() {
  return (
    <FormSection
      description={content.sections.originRegistry.description}
      title={content.sections.originRegistry.title}
    >
      <FormField label={content.fields.originSector.label}>
        <SelectInput defaultValue="">
          <SelectPlaceholder />
          <SelectOptions options={originSectors} />
        </SelectInput>
      </FormField>

      <FormField label={content.fields.originWorld.label}>
        <TextInput
          maxLength={formLimits.originWorld.maxLength}
          placeholder={content.fields.originWorld.placeholder}
        />
      </FormField>

      <div className={style.fullWidth}>
        <FormField
          hint={content.fields.country.hint}
          label={content.fields.country.label}
        >
          <SelectInput defaultValue="">
            <SelectPlaceholder />
            <SelectOptions options={originAuthorities} />
          </SelectInput>
        </FormField>
      </div>
    </FormSection>
  );
}

function VesselProfileSection() {
  return (
    <FormSection
      description={content.sections.vesselProfile.description}
      title={content.sections.vesselProfile.title}
    >
      <FormField label={content.fields.vesselName.label}>
        <TextInput
          maxLength={formLimits.vesselName.maxLength}
          placeholder={content.fields.vesselName.placeholder}
        />
      </FormField>

      <FormField label={content.fields.vesselClass.label}>
        <SelectInput defaultValue="">
          <SelectPlaceholder />
          <SelectOptions options={vesselClasses} />
        </SelectInput>
      </FormField>

      <FormField label={content.fields.crewCapacity.label}>
        <NumberInput
          max={formLimits.crewCapacity.max}
          min={formLimits.crewCapacity.min}
          placeholder={content.fields.crewCapacity.placeholder}
        />
      </FormField>

      <FormField
        hint={content.fields.callsign.hint}
        label={content.fields.callsign.label}
      >
        <TextInput
          maxLength={formLimits.callsign.maxLength}
          placeholder={content.fields.callsign.placeholder}
        />
      </FormField>
    </FormSection>
  );
}

function FlightRequestSection() {
  return (
    <FormSection
      description={content.sections.flightRequest.description}
      title={content.sections.flightRequest.title}
    >
      <FormField label={content.fields.destinationSector.label}>
        <SelectInput defaultValue="">
          <SelectPlaceholder />
          <SelectOptions options={originSectors} />
        </SelectInput>
      </FormField>

      <FormField label={content.fields.flightPurpose.label}>
        <SelectInput defaultValue="">
          <SelectPlaceholder />
          <SelectOptions options={flightPurposes} />
        </SelectInput>
      </FormField>
    </FormSection>
  );
}

function SecurityClearanceSection() {
  return (
    <FormSection
      description={content.sections.securityClearance.description}
      title={content.sections.securityClearance.title}
    >
      <FormField label={content.fields.password.label}>
        <TextInput
          placeholder={content.fields.password.placeholder}
          type="password"
        />
      </FormField>

      <FormField label={content.fields.confirmPassword.label}>
        <TextInput
          placeholder={content.fields.confirmPassword.placeholder}
          type="password"
        />
      </FormField>

      <div className={style.fullWidth}>
        <CheckboxField>{content.fields.acceptedTerms.label}</CheckboxField>
      </div>
    </FormSection>
  );
}

type SelectOptionsProps = {
  options: readonly string[];
};

function SelectOptions({ options }: SelectOptionsProps) {
  return options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));
}

function SelectPlaceholder() {
  return (
    <option disabled value="">
      {content.selectPlaceholder}
    </option>
  );
}
