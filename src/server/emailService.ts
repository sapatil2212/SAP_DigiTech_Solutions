import nodemailer from "nodemailer";
import { readFileSync, existsSync } from "fs";
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
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1).trim();
      }
      vars[key] = val;
    }
    return vars;
  } catch {
    return {};
  }
}

function getEnvVar(key: string, fallback = ""): string {
  const env = loadEnvFallback();
  const altKey = key.startsWith("SMTP_")
    ? key.replace("SMTP_", "EMAIL_")
    : key.startsWith("EMAIL_")
    ? key.replace("EMAIL_", "SMTP_")
    : key;

  let raw = process.env[key] || process.env[altKey] || env[key] || env[altKey] || fallback;
  if (typeof raw === "string" && ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'")))) {
    raw = raw.slice(1, -1).trim();
  }
  return raw;
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
      `ℹ️ [SMTP Skipped] SMTP credentials not set in .env. Download link generated for ${customerEmail}: ${directDownloadUrl || downloadPortalUrl}`
    );
    return false;
  }

  try {
    const port = parseInt(getEnvVar("SMTP_PORT", "587"), 10);
    const transporter = nodemailer.createTransport({
      host: getEnvVar("SMTP_HOST", "smtp.gmail.com"),
      port,
      secure: port === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Source Code Download Link</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
    body, table, td, p, h1, h2, h3, a, span, li, strong, div {
      font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif !important;
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 36px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card: Pure White with Faint Gray Border -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);">
          
          <!-- Brand Header with Actual Logo -->
          <tr>
            <td style="padding: 24px 32px; background-color: #ffffff; border-bottom: 1px solid #f1f5f9;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="vertical-align: middle;">
                    <img src="cid:sap_logo" alt="SAP DigiTech Solutions" height="36" style="height: 36px; max-height: 36px; width: auto; display: block; border: 0;" />
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="display: inline-block; font-family: 'Roboto', sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 5px 12px; border-radius: 6px;">
                      Distribution Portal
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td style="padding: 32px 32px 28px 32px; background-color: #ffffff;">
              <h1 style="font-family: 'Roboto', sans-serif; font-size: 22px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0; letter-spacing: -0.3px;">
                Your Source Code Package is Ready! 🚀
              </h1>
              <p style="font-family: 'Roboto', sans-serif; font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 24px 0;">
                Hello <strong style="color: #0f172a;">${customerName || "Valued Customer"}</strong>,<br>
                Thank you for purchasing the full commercial source code license for <strong style="color: #ea580c;">${productName}</strong>.
              </p>

              <!-- Order Summary Card -->
              <table role="presentation" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px; padding: 16px 18px;">
                <tr>
                  <td style="padding: 6px 0; font-family: 'Roboto', sans-serif; font-size: 13px; color: #64748b;">Product:</td>
                  <td style="padding: 6px 0; font-family: 'Roboto', sans-serif; font-size: 13px; color: #0f172a; font-weight: 700; text-align: right;">${productName} Source Code</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-family: 'Roboto', sans-serif; font-size: 13px; color: #64748b;">License:</td>
                  <td style="padding: 6px 0; font-family: 'Roboto', sans-serif; font-size: 13px; color: #16a34a; font-weight: 700; text-align: right;">100% Commercial Rights</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-family: 'Roboto', sans-serif; font-size: 13px; color: #64748b;">Payment Reference:</td>
                  <td style="padding: 6px 0; font-family: monospace, monospace; font-size: 12px; color: #0284c7; font-weight: 600; text-align: right;">${paymentId}</td>
                </tr>
              </table>

              <!-- 5-MINUTE EXPIRATION NOTICE BOX (Faint Background, No Dark Corner Border) -->
              <table role="presentation" width="100%" style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 10px; margin-bottom: 24px; padding: 14px 16px;">
                <tr>
                  <td>
                    <div style="font-family: 'Roboto', sans-serif; font-size: 13px; font-weight: 700; color: #b45309; margin-bottom: 4px;">
                      Link Valid for ${expiresInMinutes} Minutes Only
                    </div>
                    <div style="font-family: 'Roboto', sans-serif; font-size: 12px; line-height: 1.5; color: #92400e;">
                      This download link automatically expires in <strong>${expiresInMinutes} minutes</strong>. Please download your files now.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Big Download CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 18px;">
                <tr>
                  <td align="center">
                    <a href="${downloadPortalUrl}" target="_blank" style="display: inline-block; width: 85%; max-width: 360px; background-color: #FF6B00; background: linear-gradient(135deg, #FF6B00 0%, #E05300 100%); color: #ffffff; font-family: 'Roboto', sans-serif; font-size: 15px; font-weight: 700; text-decoration: none; text-align: center; padding: 14px 24px; border-radius: 12px; box-shadow: 0 4px 14px rgba(255, 107, 0, 0.25); letter-spacing: 0.2px;">
                      Download Source Code (.ZIP)
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-family: 'Roboto', sans-serif; font-size: 12px; color: #64748b; text-align: center; margin: 0;">
                If the button above does not work, copy and paste this direct link into your browser:<br>
                <a href="${downloadPortalUrl}" style="color: #2563eb; word-break: break-all; font-family: monospace, monospace; font-size: 11px; text-decoration: underline;">${downloadPortalUrl}</a>
              </p>
            </td>
          </tr>

          <!-- Footer with Copyright -->
          <tr>
            <td style="padding: 20px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="font-family: 'Roboto', sans-serif; font-size: 11px; color: #64748b; margin: 0 0 6px 0; line-height: 1.5;">
                This email was sent to ${customerEmail} regarding your verified purchase with SAP DigiTech Solutions.
              </p>
              <p style="font-family: 'Roboto', sans-serif; font-size: 11px; font-weight: 500; color: #94a3b8; margin: 0;">
                © 2026 SAP DigiTech Solutions. All rights reserved.
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

    const logoPath = resolve(process.cwd(), "public/logo/sap_logo.png");
    const attachments = [];
    if (existsSync(logoPath)) {
      attachments.push({
        filename: "sap_logo.png",
        path: logoPath,
        cid: "sap_logo",
      });
    }

    await transporter.sendMail({
      from: `"SAP DigiTech Solutions" <${smtpUser}>`,
      to: customerEmail,
      subject: `⚡ Your ${productName} Source Code Download Link (Valid for ${expiresInMinutes} Min)`,
      html: mailHtml,
      attachments,
    });

    console.log(`✅ Customer download email dispatched to: ${customerEmail}`);
    return true;
  } catch (err) {
    console.error("❌ Failed to send customer download email:", err);
    return false;
  }
}

export interface AdminPurchaseAlertParams {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress?: string;
  productName: string;
  productId: string;
  paymentId: string;
  amount?: number;
  downloadPortalUrl?: string;
  directDownloadUrl?: string;
  createdAt?: string;
}

/**
 * Dispatch real-time purchase & full customer lead dossier to admin inbox
 */
export async function sendAdminPurchaseNotificationEmail(
  params: AdminPurchaseAlertParams
): Promise<boolean> {
  const {
    customerName,
    customerEmail,
    customerPhone,
    customerAddress,
    productName,
    productId,
    paymentId,
    amount,
    downloadPortalUrl,
    directDownloadUrl,
    createdAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  } = params;

  const smtpUser = getEnvVar("SMTP_USER");
  const smtpPass = getEnvVar("SMTP_PASS");
  const adminEmail = getEnvVar("ADMIN_EMAIL") || smtpUser || "admin@sapdigitechsolutions.in";

  if (!smtpUser || !smtpPass) {
    console.log(`ℹ️ [Admin SMTP Alert Skipped] No SMTP credentials in .env. Order recorded for ${customerName} (${customerEmail}).`);
    return false;
  }

  try {
    const port = parseInt(getEnvVar("SMTP_PORT", "587"), 10);
    const transporter = nodemailer.createTransport({
      host: getEnvVar("SMTP_HOST", "smtp.gmail.com"),
      port,
      secure: port === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const formattedAmount = amount ? `₹${amount.toLocaleString("en-IN")}` : "Paid";

    const adminHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Source Code Purchase Received</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
    body, table, td, p, h1, h2, h3, a, span, li, strong, div {
      font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif !important;
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 36px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card: Pure White with Faint Gray Border -->
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);">
          
          <!-- Brand Header with Logo -->
          <tr>
            <td style="padding: 24px 28px; background-color: #ffffff; border-bottom: 1px solid #f1f5f9;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="vertical-align: middle;">
                    <img src="cid:sap_logo" alt="SAP DigiTech Solutions" height="34" style="height: 34px; max-height: 34px; width: auto; display: block; border: 0;" />
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="display: inline-block; font-family: 'Roboto', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #c2410c; background-color: #fff7ed; border: 1px solid #fed7aa; padding: 4px 10px; border-radius: 6px;">
                      Admin Order Alert
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Alert Header Banner -->
          <tr>
            <td style="padding: 20px 28px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <div style="font-family: 'Roboto', sans-serif; font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; color: #64748b;">
                💰 New Source Code License Order
              </div>
              <h1 style="font-family: 'Roboto', sans-serif; font-size: 20px; font-weight: 800; color: #0f172a; margin: 4px 0 0 0; letter-spacing: -0.3px;">
                ${formattedAmount} • ${productName}
              </h1>
            </td>
          </tr>

          <!-- Customer Lead & Billing Details -->
          <tr>
            <td style="padding: 28px; background-color: #ffffff;">
              <h2 style="font-family: 'Roboto', sans-serif; font-size: 14px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.6px; margin: 0 0 12px 0;">
                👤 Customer & Licensee Information
              </h2>

              <table role="presentation" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 6px 0; font-family: 'Roboto', sans-serif; font-size: 13px; color: #64748b; width: 38%;">Full Name / Entity:</td>
                  <td style="padding: 6px 0; font-family: 'Roboto', sans-serif; font-size: 13px; color: #0f172a; font-weight: 700;">${customerName || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-family: 'Roboto', sans-serif; font-size: 13px; color: #64748b;">Email Address:</td>
                  <td style="padding: 6px 0; font-family: monospace, monospace; font-size: 13px; font-weight: 700;">
                    <a href="mailto:${customerEmail}" style="color: #0284c7; text-decoration: none;">${customerEmail || "N/A"}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-family: 'Roboto', sans-serif; font-size: 13px; color: #64748b;">Phone / WhatsApp:</td>
                  <td style="padding: 6px 0; font-family: 'Roboto', sans-serif; font-size: 13px; font-weight: 700;">
                    <a href="https://wa.me/${(customerPhone || "").replace(/[^0-9]/g, "")}" style="color: #16a34a; text-decoration: none;">${customerPhone || "N/A"}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-family: 'Roboto', sans-serif; font-size: 13px; color: #64748b; vertical-align: top;">Billing Address:</td>
                  <td style="padding: 6px 0; font-family: 'Roboto', sans-serif; font-size: 13px; color: #334155; font-weight: 500; line-height: 1.4;">${customerAddress || "N/A"}</td>
                </tr>
              </table>

              <!-- Order Technical Meta -->
              <h2 style="font-family: 'Roboto', sans-serif; font-size: 14px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.6px; margin: 0 0 12px 0;">
                ⚙️ Purchase & Payment Verification
              </h2>

              <table role="presentation" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 6px 0; font-family: 'Roboto', sans-serif; font-size: 13px; color: #64748b; width: 38%;">Product ID / Slug:</td>
                  <td style="padding: 6px 0; font-family: monospace, monospace; font-size: 13px; color: #0f172a; font-weight: 700;">${productId}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-family: 'Roboto', sans-serif; font-size: 13px; color: #64748b;">Razorpay Payment ID:</td>
                  <td style="padding: 6px 0; font-family: monospace, monospace; font-size: 12px; color: #d97706; font-weight: 700;">${paymentId}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-family: 'Roboto', sans-serif; font-size: 13px; color: #64748b;">Purchase Timestamp:</td>
                  <td style="padding: 6px 0; font-family: 'Roboto', sans-serif; font-size: 12px; color: #334155;">${createdAt}</td>
                </tr>
                ${directDownloadUrl ? `
                <tr>
                  <td style="padding: 6px 0; font-family: 'Roboto', sans-serif; font-size: 13px; color: #64748b;">Customer Download:</td>
                  <td style="padding: 6px 0; font-size: 12px; font-family: monospace, monospace;">
                    <a href="${directDownloadUrl}" style="color: #0284c7; text-decoration: underline;">Direct Zip Stream</a>
                  </td>
                </tr>` : ""}
              </table>

              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 14px; text-align: center; font-family: 'Roboto', sans-serif; font-size: 12px; color: #166534;">
                ✅ Automated customer 5-minute license email and source code streaming have been initialized.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 16px 28px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-family: 'Roboto', sans-serif; font-size: 11px; color: #64748b;">
              SAP DigiTech Solutions Admin Real-Time Notification Dispatcher
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const logoPath = resolve(process.cwd(), "public/logo/sap_logo.png");
    const attachments = [];
    if (existsSync(logoPath)) {
      attachments.push({
        filename: "sap_logo.png",
        path: logoPath,
        cid: "sap_logo",
      });
    }

    await transporter.sendMail({
      from: `"SAP DigiTech Payments" <${smtpUser}>`,
      to: adminEmail,
      subject: `🚨 New Order: ${customerName} purchased ${productName} (${formattedAmount})`,
      html: adminHtml,
      attachments,
    });

    console.log(`✉️ Admin purchase notification dispatched to: ${adminEmail}`);
    return true;
  } catch (err) {
    console.error("❌ Failed to send admin purchase notification email:", err);
    return false;
  }
}


