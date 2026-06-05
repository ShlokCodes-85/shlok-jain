import { validationResult } from "express-validator";
import resend from "../config/email.js";

const escapeHtml = (value) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character],
  );

export const sendContactEmail = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
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

  if (!process.env.RESEND_API_KEY || !receiver) {
    console.error("Missing RESEND_API_KEY or CONTACT_RECEIVER_EMAIL.");
    return res.status(500).json({
      success: false,
      message: "Email service is not configured.",
    });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);

  const mailOptions = {
    from: emailFrom,
    to: receiver,
    replyTo: email,
    subject: `${subjectPrefix} ${subject}`,
    text: `${emailHeading}\n\n${nameLabel} ${name}\n${emailLabel} ${email}\n${subjectLabel} ${subject}\n\n${messageLabel}\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="margin: 0 0 16px;">${emailHeading}</h2>
        <p><strong>${nameLabel}</strong> ${safeName}</p>
        <p><strong>${emailLabel}</strong> ${safeEmail}</p>
        <p><strong>${subjectLabel}</strong> ${safeSubject}</p>
        <p style="white-space: pre-wrap;"><strong>${messageLabel}</strong><br />${safeMessage}</p>
      </div>
    `,
  };

  try {
    const { data, error } = await resend.emails.send(mailOptions);

    if (error) {
      console.error("Resend API error:", error);
      return res.status(502).json({
        success: false,
        message: "Unable to send message right now.",
      });
    }

    console.log("Email sent successfully via Resend:", data.id);
    return res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Resend request failed:", error);
    return res.status(502).json({
      success: false,
      message: "Unable to send message right now.",
    });
  }
};
