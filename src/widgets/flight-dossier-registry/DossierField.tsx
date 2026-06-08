import { cn } from '@/shared/lib/class-name/cn';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

type DossierFieldProps = {
  label: string;
  value: string;
};

const style = {
  field: 'rounded-2xl p-3',
  fieldLabel: 'text-[11px] font-semibold tracking-[0.18em] uppercase',
  fieldValue: 'mt-1 text-sm font-medium',
} as const;

export function DossierField({ label, value }: DossierFieldProps) {
  return (
    <div className={cn(style.field, themeClassNames.surface.fieldSoft)}>
      <p className={cn(style.fieldLabel, themeClassNames.text.subtle)}>
        {label}
      </p>

      <p className={cn(style.fieldValue, themeClassNames.text.primary)}>
        {value}
      </p>
    </div>
  );
}
