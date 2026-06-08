import { cn } from '@/shared/lib/class-name/cn';

import { useColorTheme } from '../model/useColorTheme';
import { themeToggleContent as content } from './themeToggle.content';

const style = {
  button:
    'inline-flex shrink-0 items-center gap-3 rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-amber-600 hover:text-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-amber-400 dark:hover:text-amber-400 dark:focus:ring-offset-slate-900',
  indicator:
    'flex h-8 w-8 items-center justify-center rounded-xl border text-base transition',
  indicatorLight:
    'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-500/50 dark:bg-amber-500/10 dark:text-amber-300',
  indicatorDark:
    'border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-500/50 dark:bg-sky-500/10 dark:text-sky-300',
  label: 'whitespace-nowrap',
} as const;

export function ThemeToggle() {
  const { isDarkTheme, toggleColorTheme } = useColorTheme();

  return (
    <button
      aria-label={getAriaLabel(isDarkTheme)}
      aria-pressed={isDarkTheme}
      className={style.button}
      onClick={toggleColorTheme}
      type="button"
    >
      <span aria-hidden="true" className={getIndicatorClassName(isDarkTheme)}>
        {getIndicatorLabel(isDarkTheme)}
      </span>

      <span className={style.label}>{getButtonLabel(isDarkTheme)}</span>
    </button>
  );
}

function getIndicatorClassName(isDarkTheme: boolean) {
  return cn(
    style.indicator,
    isDarkTheme ? style.indicatorDark : style.indicatorLight,
  );
}

function getIndicatorLabel(isDarkTheme: boolean) {
  if (isDarkTheme) {
    return '☾';
  }

  return '☀';
}

function getButtonLabel(isDarkTheme: boolean) {
  if (isDarkTheme) {
    return content.darkModeLabel;
  }

  return content.lightModeLabel;
}

function getAriaLabel(isDarkTheme: boolean) {
  if (isDarkTheme) {
    return content.switchToLightModeAriaLabel;
  }

  return content.switchToDarkModeAriaLabel;
}
