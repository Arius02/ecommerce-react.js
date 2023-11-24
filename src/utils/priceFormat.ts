export const formatPrice = (
  number: number,
  currencySymbol = "£",
  decimalPlaces = 0
) => {
  // Ensure the input is a valid number
  if (isNaN(number)) {
    return "Invalid Number";
  }

  // Round the number to the specified decimal places
  const roundedNumber = Number(number).toFixed(decimalPlaces);

  // Add thousands separators
  const parts = roundedNumber.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine the parts with the currency symbol
  return currencySymbol + parts.join(".");
};
