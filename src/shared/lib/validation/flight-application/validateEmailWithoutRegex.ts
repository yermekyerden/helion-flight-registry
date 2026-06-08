const forbiddenEmailCharacters = [' ', '\t', '\n', '\r'] as const;

export function validateEmailWithoutRegex(email: string) {
  const normalizedEmail = email.trim();

  if (normalizedEmail.length === 0) {
    return false;
  }

  if (containsForbiddenCharacters(normalizedEmail)) {
    return false;
  }

  const emailParts = normalizedEmail.split('@');

  if (emailParts.length !== 2) {
    return false;
  }

  const [localPart, domainPart] = emailParts;

  if (!localPart || !domainPart) {
    return false;
  }

  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return false;
  }

  if (domainPart.startsWith('.') || domainPart.endsWith('.')) {
    return false;
  }

  const domainLabels = domainPart.split('.');

  if (domainLabels.length < 2) {
    return false;
  }

  return domainLabels.every((domainLabel) => domainLabel.length > 0);
}

function containsForbiddenCharacters(value: string) {
  return forbiddenEmailCharacters.some((character) =>
    value.includes(character),
  );
}
