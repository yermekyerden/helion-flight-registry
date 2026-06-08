export function validateCountryExists(
  country: string,
  countryOptions: readonly string[],
) {
  const normalizedCountry = country.trim();

  return countryOptions.some(
    (countryOption) => countryOption === normalizedCountry,
  );
}
