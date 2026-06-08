import { describe, expect, it } from 'vitest';

import { validateNameStartsWithUppercaseLetter } from './validateNameStartsWithUppercaseLetter';

describe('validateNameStartsWithUppercaseLetter', () => {
  it.each(['Mara Voss', 'A', '  Helion Operator'])(
    'returns true when the trimmed name starts with an uppercase Latin letter: %s',
    (name) => {
      expect(validateNameStartsWithUppercaseLetter(name)).toBe(true);
    },
  );

  it.each(['', ' ', 'mara Voss', '7th Pilot', '-Mara Voss', 'Алия'])(
    'returns false when the trimmed name does not start with an uppercase Latin letter: %s',
    (name) => {
      expect(validateNameStartsWithUppercaseLetter(name)).toBe(false);
    },
  );
});
