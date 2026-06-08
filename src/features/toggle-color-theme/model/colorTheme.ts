export type ColorTheme = 'dark' | 'light';

type ApplyColorThemeOptions = {
  suppressAppTransitions?: boolean;
};

const colorThemeStorageKey = 'helion-color-theme';
const darkThemeClassName = 'dark';
const themeChangeInstantClassName = 'theme-change-instant';
const darkColorSchemeQuery = '(prefers-color-scheme: dark)';
const transitionSuppressionDurationInMilliseconds = 80;

export function initializeColorTheme() {
  applyColorTheme(getInitialColorTheme(), {
    suppressAppTransitions: false,
  });
}

export function getInitialColorTheme(): ColorTheme {
  const storedColorTheme = readStoredColorTheme();

  if (storedColorTheme) {
    return storedColorTheme;
  }

  if (prefersDarkColorScheme()) {
    return 'dark';
  }

  return 'light';
}

export function getNextColorTheme(colorTheme: ColorTheme): ColorTheme {
  if (colorTheme === 'dark') {
    return 'light';
  }

  return 'dark';
}

export function applyColorTheme(
  colorTheme: ColorTheme,
  options: ApplyColorThemeOptions = {},
) {
  if (!canUseDocument()) {
    return;
  }

  const restoreAppTransitions =
    options.suppressAppTransitions === true
      ? suppressAppTransitionsTemporarily()
      : doNothing;

  setDocumentColorTheme(colorTheme);
  restoreAppTransitions();
}

export function saveColorTheme(colorTheme: ColorTheme) {
  if (!canUseLocalStorage()) {
    return;
  }

  localStorage.setItem(colorThemeStorageKey, colorTheme);
}

function setDocumentColorTheme(colorTheme: ColorTheme) {
  document.documentElement.classList.toggle(
    darkThemeClassName,
    colorTheme === 'dark',
  );

  document.documentElement.style.colorScheme = colorTheme;
}

function suppressAppTransitionsTemporarily() {
  document.documentElement.classList.add(themeChangeInstantClassName);

  forceStyleRecalculation();

  return () => {
    window.setTimeout(() => {
      document.documentElement.classList.remove(themeChangeInstantClassName);
    }, transitionSuppressionDurationInMilliseconds);
  };
}

function forceStyleRecalculation() {
  document.documentElement.getBoundingClientRect();
}

function readStoredColorTheme(): ColorTheme | null {
  if (!canUseLocalStorage()) {
    return null;
  }

  const storedColorTheme = localStorage.getItem(colorThemeStorageKey);

  if (!isColorTheme(storedColorTheme)) {
    return null;
  }

  return storedColorTheme;
}

function prefersDarkColorScheme() {
  if (!canUseWindow()) {
    return false;
  }

  return window.matchMedia(darkColorSchemeQuery).matches;
}

function isColorTheme(value: unknown): value is ColorTheme {
  return value === 'dark' || value === 'light';
}

function canUseWindow() {
  return typeof window !== 'undefined';
}

function canUseDocument() {
  return typeof document !== 'undefined';
}

function canUseLocalStorage() {
  return typeof localStorage !== 'undefined';
}

function doNothing() {}
