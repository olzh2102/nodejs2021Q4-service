/**
 * Helper fn to extract message from error
 * @param error - Error instance or unknown
 * @returns message or coerced error argument
 */
export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}
