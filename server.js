const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, message, from } = req.body;

    // Email options
    const mailOptions = {
      from,
      to,
      subject,
      text: message,
      html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2>New Message from House Marketplace</h2>
              <p style="font-size: 16px; line-height: 1.5;">${message}</p>
              <hr>
              <p style="color: #666;">This email was sent from House Marketplace.</p>
            </div>`
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 