import { cn } from '@/shared/lib/class-name/cn';

import { useColorTheme } from '../model/useColorTheme';
import { themeToggleContent as content } from './themeToggle.content';

const style = {
  button:
    'relative inline-flex h-11 w-20 shrink-0 items-center rounded-full border border-zinc-300 bg-zinc-200 p-1 shadow-sm transition-colors duration-300 ease-out focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-offset-slate-900',
  thumb:
    'grid h-9 w-9 transform-gpu place-items-center rounded-full border bg-white shadow-sm transition-[transform,color,border-color,background-color] duration-300 ease-out dark:bg-slate-800',
  thumbLight:
    'translate-x-0 border-amber-300 text-amber-700 dark:border-amber-500/50 dark:text-amber-300',
  thumbDark:
    'translate-x-9 border-sky-300 text-sky-700 dark:border-sky-500/50 dark:text-sky-300',
  icon: 'h-4 w-4',
} as const;

export function ThemeToggle() {
  const { isDarkTheme, toggleColorTheme } = useColorTheme();

  return (
    <button
      aria-checked={isDarkTheme}
      aria-label={getAriaLabel(isDarkTheme)}
      className={style.button}
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
      <path
        d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5.64 5.64 4.22 4.22M19.78 19.78l-1.42-1.42M18.36 5.64l1.42-1.42M4.22 19.78l1.42-1.42"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />

      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      className={style.icon}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M20 15.31A8 8 0 0 1 8.69 4 7 7 0 1 0 20 15.31Z"
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
