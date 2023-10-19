const nodemailer = require('nodemailer');
require('dotenv').config();

const { EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE, EMAIL_USER, EMAIL_PASSWORD } =
  process.env;

// Nodemailer configuration options
const nodemailerConfig = {
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_SECURE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
};

// Create a nodemailer transport using the configuration options
const transport = nodemailer.createTransport(nodemailerConfig);

/**
 * Send an email using the configured nodemailer transport.
 *
 * @param {Object} data - The email data, including to, subject, html, and other properties.
 * @returns {Promise<boolean>} A promise that resolves to true if the email is sent successfully.
 */
const sendEmail = async (data) => {
  // Add the sender's email address to the email data
  const email = { ...data, from: EMAIL_USER };

  // Send the email using the nodemailer transport
  await transport.sendMail(email);

  // Return true to indicate that the email was sent successfully
  return true;
};

module.exports = sendEmail;
