const { BASE_URL } = process.env;

/**
 * Create a verification email for user email verification.
 *
 * @param {Object} options - The options object containing email and verificationToken.
 * @param {string} options.email - The recipient's email address.
 * @param {string} options.verificationToken - The verification token for email verification.
 * @returns {Object} An object containing email details (to, subject, and HTML content).
 */
const createVerificationEmail = ({ email, verificationToken }) => ({
  to: email,
  subject: 'Verify email',
  html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
});

module.exports = createVerificationEmail;
