import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  services?: string[];
}

export const submitContactForm = createServerFn({ method: "POST" })
  .validator((data: ContactFormData) => data)
  .handler(async ({ data }) => {
    const { name, email, company, phone, message, services } = data;

    // SMTP configuration from environment variables or sensible defaults
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER || "";
    const smtpPass = process.env.SMTP_PASS || "";
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || "swapnil@theblueintellect.com";

    // If credentials aren't set in environment variables yet, log to console and return informative status
    if (!smtpUser || !smtpPass) {
      console.log("ℹ️ Contact Submission Received (Configured for Dev/Simulated SMTP):", {
        name,
        email,
        company,
        phone,
        services,
        message,
      });

      return {
        success: true,
        demoMode: true,
        message:
          "Form submitted! (To send live emails, configure SMTP_USER & SMTP_PASS in your environment).",
      };
    }

    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for port 465, false for 587
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const servicesText = services && services.length > 0 ? services.join(", ") : "General Consultation";
      const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

      // 1. Email Copy to ADMIN
      const adminMailOptions = {
        from: `"SAP DigiTech Solutions" <${smtpUser}>`,
        to: adminEmail,
        replyTo: email,
        subject: `🔥 New Lead Submission: ${name} (${company || "Individual"})`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <div style="background: linear-gradient(135deg, #1B2240 0%, #FF6B00 70%, #CC2200 100%); padding: 28px; text-align: center; color: white;">
              <h2 style="margin: 0; font-size: 22px; font-weight: 800; tracking-tight: -0.02em;">New Strategy Consultation Inquiry</h2>
              <p style="margin: 6px 0 0; opacity: 0.85; font-size: 13px;">Received on ${timestamp} (IST)</p>
            </div>

            <div style="padding: 28px; color: #1e293b; font-size: 14px; line-height: 1.6;">
              <div style="background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 6px 0; font-weight: 700; color: #64748b; width: 140px;">Full Name:</td>
                    <td style="padding: 6px 0; color: #0f172a; font-weight: 700; font-size: 15px;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 700; color: #64748b;">Work Email:</td>
                    <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 700; color: #64748b;">Phone / WhatsApp:</td>
                    <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${phone || "Not provided"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 700; color: #64748b;">Company / Org:</td>
                    <td style="padding: 6px 0; color: #0f172a;">${company || "Not provided"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 700; color: #64748b;">Services Required:</td>
                    <td style="padding: 6px 0; color: #2563eb; font-weight: 700;">${servicesText}</td>
                  </tr>
                </table>
              </div>

              <div style="padding: 20px; background: #ffffff; border-radius: 12px; border-left: 4px solid #2563eb; border-top: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9;">
                <p style="margin: 0 0 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-weight: 800;">Growth Objective / Message:</p>
                <p style="margin: 0; color: #0f172a; white-space: pre-wrap; font-size: 14px;">${message || "No additional message details provided."}</p>
              </div>

              <div style="margin-top: 24px; text-align: center;">
                <a href="mailto:${email}?subject=Re:%20Strategy%20Call%20with%20SAP%20DigiTech%20Solutions" style="display: inline-block; background: linear-gradient(135deg, #FF6B00, #CC2200); color: white; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 9999px;">
                  Reply Direct to Lead
                </a>
              </div>
            </div>

            <div style="background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
              SAP DigiTech Solutions · SMTP Lead Notification Engine
            </div>
          </div>
        `,
      };

      // 2. Email Copy to USER (Confirmation Copy)
      const userMailOptions = {
        from: `"Swapnil Agarkhedkar | SAP DigiTech Solutions" <${smtpUser}>`,
        to: email,
        subject: `Confirmation: We received your request — SAP DigiTech Solutions`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <div style="background: linear-gradient(135deg, #1B2240 0%, #FF6B00 70%, #CC2200 100%); padding: 32px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">SAP DigiTech Solutions</h1>
              <p style="margin: 6px 0 0; opacity: 0.9; font-size: 13px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600;">Innovate · Integrate · Elevate</p>
            </div>

            <div style="padding: 32px; color: #334155; line-height: 1.7; font-size: 15px;">
              <p style="font-size: 17px; color: #0f172a; margin-top: 0;">Hi <strong>${name}</strong>,</p>
              <p>Thank you for reaching out to <strong>SAP DigiTech Solutions</strong>. We have received your inquiry for <strong>${servicesText}</strong> and queued it for our strategy team.</p>
              <p>We are reviewing your submission and will get back to you within <strong>one business day</strong> with actionable insights and appointment availability.</p>

              <div style="margin: 28px 0; padding: 20px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
                <h4 style="margin: 0 0 12px; color: #0f172a; font-size: 14px; font-weight: 700;">Summary of Submitted Copy:</h4>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                  <tr>
                    <td style="padding: 4px 0; color: #64748b; font-weight: 600; width: 130px;">Name:</td>
                    <td style="padding: 4px 0; color: #0f172a;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #64748b; font-weight: 600;">Email:</td>
                    <td style="padding: 4px 0; color: #0f172a;">${email}</td>
                  </tr>
                  ${company ? `<tr><td style="padding: 4px 0; color: #64748b; font-weight: 600;">Company:</td><td style="padding: 4px 0; color: #0f172a;">${company}</td></tr>` : ""}
                  ${phone ? `<tr><td style="padding: 4px 0; color: #64748b; font-weight: 600;">Phone:</td><td style="padding: 4px 0; color: #0f172a;">${phone}</td></tr>` : ""}
                  <tr>
                    <td style="padding: 4px 0; color: #64748b; font-weight: 600;">Selected Services:</td>
                    <td style="padding: 4px 0; color: #2563eb; font-weight: 700;">${servicesText}</td>
                  </tr>
                  ${message ? `<tr><td style="padding: 4px 0; color: #64748b; font-weight: 600;">Message:</td><td style="padding: 4px 0; color: #0f172a;">${message}</td></tr>` : ""}
                </table>
              </div>

              <p style="margin-bottom: 0;">Warm regards,</p>
              <p style="margin-top: 4px; font-weight: 700; color: #0f172a;">Swapnil Agarkhedkar<br/><span style="font-weight: 500; font-size: 13px; color: #64748b;">Founder &amp; Digital Strategist, SAP DigiTech Solutions</span></p>
            </div>

            <div style="background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
              © ${new Date().getFullYear()} SAP DigiTech Solutions. All rights reserved.
            </div>
          </div>
        `,
      };

      // Execute both SMTP emails in parallel
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(userMailOptions),
      ]);

      return {
        success: true,
        message: "Your message has been sent successfully! A confirmation copy has been sent to your email.",
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "SMTP transmission failed.";
      console.error("❌ SMTP Error:", err);
      return {
        success: false,
        message: `Failed to send email via SMTP: ${errorMsg}`,
      };
    }
  });
