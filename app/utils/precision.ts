function displayNumberWithPrecision(number: string): string {
  const parsedNumber = parseFloat(number);
  if (isNaN(parsedNumber)) {
    return "Invalid Number";
  }
  return parsedNumber.toFixed(2);
}
export default displayNumberWithPrecision;
