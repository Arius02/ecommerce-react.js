/**
 * Formats a number as a currency string with thousands separators and optional decimal places.
 *
 * @param amount - The number to format.
 * @param currencySymbol - The currency symbol to prepend to the formatted number (default is '£').
 * @param decimalPlaces - The number of decimal places to include (default is 0).
 * @returns The formatted currency string.
 */
export const formatPrice = (
  amount: number,
  currencySymbol: string = "£",
  decimalPlaces: number = 0
): string => {
  if (isNaN(amount)) {
    return "Invalid Number";
  }

  const roundedAmount = amount.toFixed(decimalPlaces);

  const [integerPart, decimalPart] = roundedAmount.split(".");

  // Add thousands separators to the integer part
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine integer and decimal parts, then prepend the currency symbol
  return `${currencySymbol}${formattedIntegerPart}${decimalPart ? `.${decimalPart}` : ""}`;
};
