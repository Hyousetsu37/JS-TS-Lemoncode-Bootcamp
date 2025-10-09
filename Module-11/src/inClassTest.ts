export const isIPValid = (valueToCheck: string): boolean => {
  const regEx = /^(\d{1,3}\.){3}\d{1,3}$/;
  return regEx.test(valueToCheck);
};
export const isNIFValid = (valueToCheck: string): boolean => {
  const regEx = /^\d{2}\.?\d{3}\.?\d{3}(\s|-|_)?[A-Za-z]$/;
  return regEx.test(valueToCheck);
};
