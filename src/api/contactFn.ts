import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";
import { readFileSync } from "fs";
import { resolve } from "path";

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  services?: string[];
}

/** Manually parse .env file as fallback when process.env doesn't have our vars */
function loadEnvFallback() {
  try {
    const envPath = resolve(process.cwd(), ".env");
    const content = readFileSync(envPath, "utf-8");
    const vars: Record<string, string> = {};
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      vars[key] = val;
    }
    return vars;
  } catch {
    return {};
  }
}

export const submitContactForm = createServerFn({ method: "POST" })
  .validator((data: ContactFormData) => data)
  .handler(async ({ data }) => {
    const { name, email, company, phone, message, services } = data;

    // Load .env fallback in case process.env doesn't have our SMTP vars
    const envFallback = loadEnvFallback();
    const getEnv = (key: string, fallback = "") =>
      process.env[key] || envFallback[key] || fallback;

    // SMTP configuration from environment variables or sensible defaults
    const smtpHost = getEnv("SMTP_HOST", "smtp.gmail.com");
    const smtpPort = parseInt(getEnv("SMTP_PORT", "587"), 10);
    const smtpUser = getEnv("SMTP_USER");
    const smtpPass = getEnv("SMTP_PASS");
    const adminEmail = getEnv("ADMIN_EMAIL") || smtpUser || "swapnil@theblueintellect.com";

    // Debug: log which credentials are being used (masked)
    console.log("📧 SMTP Config Debug:", {
      host: smtpHost,
      port: smtpPort,
      user: smtpUser,
      passLength: smtpPass.length,
      passPreview: smtpPass ? `${smtpPass.slice(0, 4)}...${smtpPass.slice(-4)}` : "(empty)",
      adminEmail,
      envSource: process.env.SMTP_USER ? "process.env" : "fallback .env file",
    });

    // If credentials aren't set in environment variables yet, log to console and return simulated status
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
      const isGmail = smtpHost.toLowerCase().includes("gmail");
      const transportOptions = isGmail
        ? {
            service: "gmail",
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          }
        : {
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465, // true for port 465, false for 587
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          };

      const transporter = nodemailer.createTransport(transportOptions);

      const servicesText = services && services.length > 0 ? services.join(", ") : "General Consultation";
      const logoPath = resolve(process.cwd(), "public/logo/tbi-desktop-logo.png");
      const attachments = [
        {
          filename: "logo.png",
          path: logoPath,
          cid: "tbiLogo",
        },
      ];

      // 1. Email Copy to ADMIN — minimal lead info
      const adminMailOptions = {
        from: `"SAP DigiTech Solutions" <${smtpUser}>`,
        to: adminEmail,
        replyTo: email,
        subject: `New Inquiry from ${name}`,
        attachments,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff; border: 1px solid #e8edf4; border-radius: 20px; overflow: hidden;">

            <div style="background: linear-gradient(135deg, #1B2240 0%, #FF6B00 70%, #CC2200 100%); padding: 28px 24px; text-align: center; border-bottom: 1px solid rgba(255,107,0,0.2);">
              <img src="cid:tbiLogo" alt="SAP DigiTech Solutions" style="height: 40px; margin-bottom: 8px;" />
              <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.75); font-weight: 500;">New Contact Inquiry</p>
            </div>

            <div style="padding: 28px 24px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-weight: 600; width: 100px;">Name</td>
                  <td style="padding: 8px 0; color: #475569; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-weight: 600;">Email</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #6b8aeb; text-decoration: none; font-weight: 600;">${email}</a></td>
                </tr>
                ${phone ? `<tr><td style="padding: 8px 0; color: #94a3b8; font-weight: 600;">Phone</td><td style="padding: 8px 0; color: #475569;">${phone}</td></tr>` : ""}
                ${company ? `<tr><td style="padding: 8px 0; color: #94a3b8; font-weight: 600;">Company</td><td style="padding: 8px 0; color: #475569;">${company}</td></tr>` : ""}
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-weight: 600;">Service</td>
                  <td style="padding: 8px 0; color: #6b8aeb; font-weight: 600;">${servicesText}</td>
                </tr>
              </table>

              ${message ? `
              <div style="margin-top: 16px; padding: 16px; background: #f8faff; border-radius: 14px; border: 1px solid #e8edf4;">
                <p style="margin: 0; font-size: 13px; color: #94a3b8; font-weight: 600; margin-bottom: 6px;">Message</p>
                <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>` : ""}

              <div style="margin-top: 24px; text-align: center;">
                <a href="mailto:${email}?subject=Re:%20Your%20inquiry%20-%20SAP%20DigiTech%20Solutions" style="display: inline-block; background: linear-gradient(135deg, #FF6B00, #CC2200); color: white; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 28px; border-radius: 12px;">
                  Reply to ${name.split(" ")[0]}
                </a>
              </div>
            </div>

            <div style="padding: 16px; text-align: center; font-size: 11px; color: #c4cdd8; border-top: 1px solid #f0f3f8;">
              SAP DigiTech Solutions · Lead Notification
            </div>
          </div>
        `,
      };

      // 2. Email Copy to USER — brief confirmation
      const userMailOptions = {
        from: `"SAP DigiTech Solutions" <${smtpUser}>`,
        to: email,
        subject: `We received your inquiry — SAP DigiTech Solutions`,
        attachments,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff; border: 1px solid #e8edf4; border-radius: 20px; overflow: hidden;">

            <div style="background: linear-gradient(135deg, #1B2240 0%, #FF6B00 70%, #CC2200 100%); padding: 32px 24px; text-align: center; border-bottom: 1px solid rgba(255,107,0,0.2);">
              <img src="cid:tbiLogo" alt="SAP DigiTech Solutions" style="height: 44px;" />
            </div>

            <div style="padding: 32px 24px; color: #64748b; line-height: 1.7; font-size: 15px;">
              <p style="color: #475569; margin-top: 0;">Hi <strong style="color: #334155;">${name}</strong>,</p>
              <p>Thank you for reaching out! We've received your inquiry for <strong style="color: #6b8aeb;">${servicesText}</strong> and our team will get back to you within <strong style="color: #475569;">one business day</strong>.</p>

              <div style="margin: 24px 0; padding: 20px; background: #f8faff; border-radius: 16px; border: 1px solid #e8edf4;">
                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                  <tr>
                    <td style="padding: 6px 0; color: #94a3b8; font-weight: 600; width: 90px;">Service</td>
                    <td style="padding: 6px 0; color: #6b8aeb; font-weight: 600;">${servicesText}</td>
                  </tr>
                  ${message ? `<tr><td style="padding: 6px 0; color: #94a3b8; font-weight: 600;">Message</td><td style="padding: 6px 0; color: #475569;">${message}</td></tr>` : ""}
                </table>
              </div>

              <p style="margin-bottom: 0; color: #94a3b8;">Warm regards,</p>
              <p style="margin-top: 4px; font-weight: 600; color: #475569;">Swapnil Agarkhedkar<br/><span style="font-weight: 400; font-size: 13px; color: #94a3b8;">Founder, SAP DigiTech Solutions</span></p>
            </div>

            <div style="padding: 16px; text-align: center; font-size: 11px; color: #c4cdd8; border-top: 1px solid #f0f3f8;">
              © ${new Date().getFullYear()} SAP DigiTech Solutions
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
