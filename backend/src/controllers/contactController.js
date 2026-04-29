import { validationResult } from "express-validator";
import resend from "../config/email.js";

export const sendContactEmail = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.error("Validation errors:", errors.array());
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: errors.array(),
    });
  }

  const { name, email, subject, message } = req.body;
  const receiver = process.env.CONTACT_RECEIVER_EMAIL || process.env.EMAIL_USER;
  const emailFrom = process.env.EMAIL_FROM || "onboarding@resend.dev";
  const subjectPrefix = process.env.CONTACT_EMAIL_SUBJECT_PREFIX || "Portfolio contact:";
  const emailHeading = process.env.CONTACT_EMAIL_HEADING || "New message from your portfolio";
  const nameLabel = process.env.CONTACT_EMAIL_NAME_LABEL || "Name:";
  const emailLabel = process.env.CONTACT_EMAIL_EMAIL_LABEL || "Email:";
  const subjectLabel = process.env.CONTACT_EMAIL_SUBJECT_LABEL || "Subject:";
  const messageLabel = process.env.CONTACT_EMAIL_MESSAGE_LABEL || "Message:";

  const mailOptions = {
    from: emailFrom,
    to: receiver,
    replyTo: email,
    subject: `${subjectPrefix} ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="margin: 0 0 16px;">${emailHeading}</h2>
        <p><strong>${nameLabel}</strong> ${name}</p>
        <p><strong>${emailLabel}</strong> ${email}</p>
        <p><strong>${subjectLabel}</strong> ${subject}</p>
        <p style="white-space: pre-wrap;"><strong>${messageLabel}</strong><br />${message}</p>
      </div>
    `,
  };

  console.log("Attempting to send email via Resend to:", receiver);
  console.log("From:", emailFrom);

  res.status(200).json({
    success: true,
    message: "Message received! We will contact you shortly.",
  });

  resend.emails
    .send(mailOptions)
    .then((result) => {
      if (result.error) {
        console.error("Resend API error:", result.error);
      } else {
        console.log("Email sent successfully via Resend:", result.data.id);
      }
    })
    .catch((error) => {
      console.error("Background email sending error:", error.message);
      console.error("Error details:", error);
    });
};
