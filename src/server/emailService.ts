import nodemailer from "nodemailer";
import { readFileSync } from "fs";
import { resolve } from "path";

/** Parse .env file as fallback */
function loadEnvFallback(): Record<string, string> {
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

function getEnvVar(key: string, fallback = ""): string {
  const env = loadEnvFallback();
  return process.env[key] || env[key] || fallback;
}

export interface SendDownloadEmailParams {
  customerEmail: string;
  customerName: string;
  productName: string;
  paymentId: string;
  downloadPortalUrl: string;
  directDownloadUrl: string;
  expiresInMinutes?: number;
}

/**
 * Send customer their secure 5-minute expiring download link
 */
export async function sendCustomerDownloadEmail(params: SendDownloadEmailParams): Promise<boolean> {
  const {
    customerEmail,
    customerName,
    productName,
    paymentId,
    downloadPortalUrl,
    directDownloadUrl,
    expiresInMinutes = 5,
  } = params;

  const smtpUser = getEnvVar("SMTP_USER");
  const smtpPass = getEnvVar("SMTP_PASS");

  if (!smtpUser || !smtpPass) {
    console.log(
      `ℹ️ [SMTP Skipped] SMTP credentials not set in .env. Download link generated for ${customerEmail}: ${downloadPortalUrl}`
    );
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: getEnvVar("SMTP_HOST", "smtp.gmail.com"),
      port: parseInt(getEnvVar("SMTP_PORT", "587"), 10),
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Source Code Download Link</title>
</head>
<body style="margin: 0; padding: 0; background-color: #070b14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #070b14; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #0f172a; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          
          <!-- Brand Header with Logo -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; background: linear-gradient(180deg, #111e3b 0%, #0f172a 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="display: inline-block; vertical-align: middle; width: 44px; height: 44px; background: linear-gradient(135deg, #FF6B00 0%, #E05300 100%); border-radius: 12px; text-align: center; line-height: 44px; color: #ffffff; font-weight: 900; font-size: 22px; box-shadow: 0 4px 12px rgba(255, 107, 0, 0.35);">
                      S
                    </div>
                    <div style="display: inline-block; vertical-align: middle; margin-left: 14px;">
                      <div style="font-size: 19px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                        SAP DigiTech <span style="color: #FF6B00;">Solutions</span>
                      </div>
                      <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px;">
                        Official Code Distribution Portal
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td style="padding: 32px;">
              <h1 style="font-size: 24px; font-weight: 800; color: #ffffff; margin: 0 0 12px 0; letter-spacing: -0.5px;">
                Your Source Code Package is Ready! 🚀
              </h1>
              <p style="font-size: 14px; line-height: 1.6; color: #cbd5e1; margin: 0 0 24px 0;">
                Hello <strong style="color: #ffffff;">${customerName || "Valued Customer"}</strong>,<br>
                Thank you for purchasing the full commercial source code license for <strong style="color: #FF6B00;">${productName}</strong>. Your unminified archive has been prepared on our high-speed VPS storage node.
              </p>

              <!-- Order Summary Card -->
              <table role="presentation" width="100%" style="background-color: #070d1a; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; margin-bottom: 24px; padding: 18px;">
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #94a3b8;">Product:</td>
                  <td style="padding: 6px 0; font-size: 13px; color: #ffffff; font-weight: 700; text-align: right;">${productName} Source Code</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #94a3b8;">License:</td>
                  <td style="padding: 6px 0; font-size: 13px; color: #10b981; font-weight: 700; text-align: right;">100% Commercial White-Label</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #94a3b8;">Payment Reference:</td>
                  <td style="padding: 6px 0; font-size: 12px; color: #38bdf8; font-family: monospace; text-align: right;">${paymentId}</td>
                </tr>
              </table>

              <!-- ⚠️ CRITICAL 5-MINUTE EXPIRATION WARNING BOX -->
              <table role="presentation" width="100%" style="background-color: rgba(255, 107, 0, 0.12); border: 1.5px solid #FF6B00; border-radius: 14px; margin-bottom: 28px; padding: 16px;">
                <tr>
                  <td>
                    <div style="font-size: 14px; font-weight: 800; color: #FF6B00; margin-bottom: 6px; display: flex; align-items: center;">
                      ⚠️ CRITICAL SECURITY NOTICE: Link Valid for ${expiresInMinutes} Minutes Only
                    </div>
                    <div style="font-size: 12px; line-height: 1.5; color: #fed7aa;">
                      For maximum security, this download token automatically expires in <strong>${expiresInMinutes} minutes</strong> from issuance. Please download and extract your <code>.zip</code> file immediately.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Big Download CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <a href="${downloadPortalUrl}" target="_blank" style="display: inline-block; width: 85%; max-width: 380px; background: linear-gradient(135deg, #FF6B00 0%, #E05300 100%); color: #ffffff; font-size: 15px; font-weight: 800; text-decoration: none; text-align: center; padding: 16px 24px; border-radius: 14px; box-shadow: 0 8px 20px rgba(255, 107, 0, 0.4); letter-spacing: 0.2px;">
                      ⬇️ Download Source Code (.ZIP)
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0 0 28px 0;">
                If the button above does not work, copy and paste this direct link into your browser:<br>
                <a href="${downloadPortalUrl}" style="color: #38bdf8; word-break: break-all; font-family: monospace; font-size: 11px;">${downloadPortalUrl}</a>
              </p>

              <!-- Deliverables Checklist -->
              <div style="background-color: #070d1a; border-radius: 14px; padding: 18px; margin-bottom: 24px; border: 1px solid rgba(255, 255, 255, 0.05);">
                <div style="font-size: 13px; font-weight: 700; color: #ffffff; margin-bottom: 10px;">
                  📦 What is Included in this Release:
                </div>
                <ul style="margin: 0; padding-left: 20px; font-size: 12px; line-height: 1.8; color: #cbd5e1;">
                  <li>Production React 19 Frontend & Node.js API Codebase</li>
                  <li>Ready-to-Deploy Docker Compose Setup</li>
                  <li>Database Schemas, Migrations & Seed Scripts</li>
                  <li>Full Commercial White-Label Rebranding Rights</li>
                  <li>Architecture, Setup & Deployment Guides</li>
                </ul>
              </div>

              <!-- Assistance Note -->
              <p style="font-size: 12px; color: #94a3b8; line-height: 1.5; margin: 0;">
                Need help with installation or custom deployment? WhatsApp our engineering helpdesk directly at 
                <a href="https://wa.me/917745868073" style="color: #10b981; font-weight: 600; text-decoration: none;">+91 77458 68073</a> 
                or reply to this email.
              </p>
            </td>
          </tr>

          <!-- Footer with Copyright -->
          <tr>
            <td style="padding: 24px 32px; background-color: #070b14; border-top: 1px solid rgba(255, 255, 255, 0.08); text-align: center;">
              <p style="font-size: 11px; color: #64748b; margin: 0 0 8px 0; line-height: 1.5;">
                This email was sent to ${customerEmail} regarding your verified purchase with SAP DigiTech Solutions.
              </p>
              <p style="font-size: 11px; font-weight: 600; color: #94a3b8; margin: 0;">
                © 2026 SAP DigiTech Solutions. All rights reserved. • Pune · Nashik · Mumbai, India.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    await transporter.sendMail({
      from: `"SAP DigiTech Solutions" <${smtpUser}>`,
      to: customerEmail,
      subject: `⚡ Your ${productName} Source Code Download Link (Valid for ${expiresInMinutes} Min)`,
      html: mailHtml,
    });

    console.log(`✅ Customer download email dispatched to: ${customerEmail}`);
    return true;
  } catch (err) {
    console.error("❌ Failed to send customer download email:", err);
    return false;
  }
}
