import { useEffect, useState } from 'react';

import {
  applyColorTheme,
  getInitialColorTheme,
  getNextColorTheme,
  saveColorTheme,
  type ColorTheme,
} from './colorTheme';

export function useColorTheme() {
  const [colorTheme, setColorTheme] =
    useState<ColorTheme>(getInitialColorTheme);

  useEffect(() => {
    applyColorTheme(colorTheme, {
      suppressAppTransitions: true,
    });

    saveColorTheme(colorTheme);
  }, [colorTheme]);

  function toggleColorTheme() {
    setColorTheme((currentColorTheme) => getNextColorTheme(currentColorTheme));
  }

  return {
    colorTheme,
    isDarkTheme: colorTheme === 'dark',
    toggleColorTheme,
  };
}
