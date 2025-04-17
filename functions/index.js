const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Create transporter with Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shraddhajha62@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Trigger when a new message is created in Firestore
exports.sendEmailOnNewMessage = functions.firestore
  .document("messages/{messageId}")
  .onCreate(async (snap) => {
    try {
      const messageData = snap.data();
      
      // Create email content
      const mailOptions = {
        from: "House Marketplace <shraddhajha62@gmail.com>",
        to: messageData.to,
        subject: `New Message about: ${messageData.listingName || "Your Property"}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #470d21;">New Message from House Marketplace</h2>
            <p><strong>From:</strong> ${messageData.fromName} (${messageData.fromEmail})</p>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <p style="font-size: 16px; line-height: 1.6;">${messageData.message}</p>
            </div>
            <p style="color: #666; font-size: 14px;">This email was sent from House Marketplace.</p>
          </div>
        `
      };

      // Send email
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");

      // Update the message document to mark email as sent
      await snap.ref.update({ emailSent: true });
      
      return null;
    } catch (error) {
      console.error("Error sending email:", error);
      throw new functions.https.HttpsError("internal", "Failed to send email");
    }
  }); 