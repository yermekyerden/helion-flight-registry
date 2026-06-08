import { cn } from '@/shared/lib/class-name/cn';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

type SectionHeaderTitleLevel = 1 | 2 | 3;

type SectionHeaderTone = 'accent' | 'muted';

type SectionHeaderAlign = 'left' | 'center';

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  titleLevel?: SectionHeaderTitleLevel;
  tone?: SectionHeaderTone;
  align?: SectionHeaderAlign;
  className?: string;
};

const style = {
  root: {
    left: '',
    center: 'text-center',
  },
  eyebrow: {
    base: 'text-xs font-semibold tracking-[0.25em] uppercase',
  },
  title: {
    base: 'mt-3 font-semibold',
    1: 'max-w-3xl text-4xl tracking-tight sm:text-5xl',
    2: 'text-2xl',
    3: 'text-xl',
  },
  description: {
    base: 'mt-3 text-sm leading-6',
    left: 'max-w-2xl',
    center: 'mx-auto max-w-xl',
  },
} as const;

export function SectionHeader({
  align = 'left',
  className,
  description,
  eyebrow,
  title,
  titleLevel = 2,
  tone = 'accent',
}: SectionHeaderProps) {
  return (
    <div className={cn(style.root[align], className)}>
      <p className={cn(style.eyebrow.base, getEyebrowToneClassName(tone))}>
        {eyebrow}
      </p>

      {renderTitle(title, titleLevel)}

      {description ? (
        <p
          className={cn(
            style.description.base,
            style.description[align],
            themeClassNames.text.muted,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function renderTitle(title: string, titleLevel: SectionHeaderTitleLevel) {
  const className = cn(
    style.title.base,
    style.title[titleLevel],
    themeClassNames.text.primary,
  );

  if (titleLevel === 1) {
    return <h1 className={className}>{title}</h1>;
  }

  if (titleLevel === 2) {
    return <h2 className={className}>{title}</h2>;
  }

  return <h3 className={className}>{title}</h3>;
}

function getEyebrowToneClassName(tone: SectionHeaderTone) {
  if (tone === 'muted') {
    return themeClassNames.text.subtle;
  }

  return themeClassNames.text.eyebrow;
}
