import { cn } from '@/shared/lib/class-name/cn';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

import { useColorTheme } from '../model/useColorTheme';
import { themeToggleContent as content } from './themeToggle.content';

const style = {
  button:
    'relative inline-flex h-11 w-20 shrink-0 rounded-full bg-zinc-200 shadow-sm ring-1 ring-zinc-300 ring-inset transition-colors duration-300 ease-out dark:bg-neutral-950 dark:ring-neutral-700',
  thumb:
    'absolute top-1 left-1 grid h-9 w-9 transform-gpu place-items-center rounded-full bg-white shadow-sm ring-1 ring-zinc-300 ring-inset transition-[transform,color,background-color,box-shadow] duration-300 ease-out will-change-transform motion-reduce:transition-none dark:bg-neutral-900 dark:ring-cyan-500/40',
  thumbLight: 'translate-x-0 text-amber-700',
  thumbDark: 'translate-x-9 text-cyan-300',
  icon: 'h-4 w-4',
  moonIcon: 'h-4 w-4 -translate-x-px',
} as const;

export function ThemeToggle() {
  const { isDarkTheme, toggleColorTheme } = useColorTheme();

  return (
    <button
      aria-checked={isDarkTheme}
      aria-label={getAriaLabel(isDarkTheme)}
      className={cn(style.button, themeClassNames.focus.ring)}
      data-theme-toggle
      onClick={toggleColorTheme}
      role="switch"
      type="button"
    >
      <span aria-hidden="true" className={getThumbClassName(isDarkTheme)}>
        {isDarkTheme ? <MoonIcon /> : <SunIcon />}
      </span>

      <span className="sr-only">{getStateLabel(isDarkTheme)}</span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      className={style.icon}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />

      <path
        d="M12 2.75V5M12 19v2.25M4.93 4.93l1.6 1.6M17.47 17.47l1.6 1.6M2.75 12H5M19 12h2.25M4.93 19.07l1.6-1.6M17.47 6.53l1.6-1.6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      className={style.moonIcon}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M18.25 15.25A7.25 7.25 0 0 1 8.75 5.75a6.75 6.75 0 1 0 9.5 9.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function getThumbClassName(isDarkTheme: boolean) {
  return cn(style.thumb, isDarkTheme ? style.thumbDark : style.thumbLight);
}

function getAriaLabel(isDarkTheme: boolean) {
  if (isDarkTheme) {
    return content.switchToLightModeAriaLabel;
  }

  return content.switchToDarkModeAriaLabel;
}

function getStateLabel(isDarkTheme: boolean) {
  if (isDarkTheme) {
    return content.darkModeStateLabel;
  }

  return content.lightModeStateLabel;
}
