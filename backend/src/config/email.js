import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resendApiKey = process.env.RESEND_API_KEY;
const emailFrom = process.env.EMAIL_FROM || "onboarding@resend.dev";

console.log("Email Configuration (Resend):");
console.log("  From:", emailFrom);
console.log("  API Key:", resendApiKey ? "Set" : "(not set)");

const resend = new Resend(resendApiKey);

export default resend;
