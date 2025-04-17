import * as nodemailer from 'nodemailer';
import * as functions from 'firebase-functions';

// Create transporter with Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shraddhajha62@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Function to send email
export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
) => {
  try {
    const mailOptions = {
      from: 'House Marketplace <shraddhajha62@gmail.com>',
      to,
      subject,
      text,
      html: html || text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send email');
  }
}; 