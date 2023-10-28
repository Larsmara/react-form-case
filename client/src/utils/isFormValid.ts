export const isFormValid = (err: any): boolean => {
  if (Object.keys(err).length > 0) return true;
  return false;
};
