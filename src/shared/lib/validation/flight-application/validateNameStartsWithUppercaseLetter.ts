export function validateNameStartsWithUppercaseLetter(name: string) {
  const normalizedName = name.trim();
  const firstCharacter = normalizedName.at(0);

  if (!firstCharacter) {
    return false;
  }

  return isUppercaseLatinLetter(firstCharacter);
}

function isUppercaseLatinLetter(character: string) {
  return character >= 'A' && character <= 'Z';
}
