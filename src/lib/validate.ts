/**
 * Validates an email address using a regular expression.
 * This function checks if the provided string matches the pattern of a typical email address.
 *
 * @param {string} email - The email address to test.
 * @returns {boolean} - True if the email matches the pattern, false otherwise.
 */
export function testEmail(email: string): boolean {
  // Regular expression to validate the email format
  const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
