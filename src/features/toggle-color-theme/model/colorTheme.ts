export type ColorTheme = 'dark' | 'light';

const colorThemeStorageKey = 'helion-color-theme';
const darkThemeClassName = 'dark';
const darkColorSchemeQuery = '(prefers-color-scheme: dark)';

export function initializeColorTheme() {
  applyColorTheme(getInitialColorTheme());
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

export function applyColorTheme(colorTheme: ColorTheme) {
  if (!canUseDocument()) {
    return;
  }

  document.documentElement.classList.toggle(
    darkThemeClassName,
    colorTheme === 'dark',
  );

  document.documentElement.style.colorScheme = colorTheme;
}

export function saveColorTheme(colorTheme: ColorTheme) {
  if (!canUseLocalStorage()) {
    return;
  }

  localStorage.setItem(colorThemeStorageKey, colorTheme);
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
