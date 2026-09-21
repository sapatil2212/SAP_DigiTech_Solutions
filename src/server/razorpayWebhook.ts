import crypto from "crypto";
import { readFileSync } from "fs";
import { resolve } from "path";
import nodemailer from "nodemailer";

/** Parse .env file as fallback when process.env does not have runtime keys */
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

/**
 * Verifies Razorpay Webhook signature using HMAC SHA256
 */
export function verifyRazorpayWebhookSignature(
  rawBody: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature || !secret) {
    return false;
  }
  try {
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    const expectedBuf = Buffer.from(expectedSignature, "utf-8");
    const signatureBuf = Buffer.from(signature, "utf-8");

    if (expectedBuf.length !== signatureBuf.length) {
      return false;
    }
    return crypto.timingSafeEqual(expectedBuf, signatureBuf);
  } catch (err) {
    console.error("❌ Signature verification error:", err);
    return false;
  }
}

/**
 * Send an email alert to admin upon successful payment
 */
async function sendPaymentNotificationEmail(details: {
  paymentId: string;
  amount: number;
  currency: string;
  customerEmail?: string;
  customerContact?: string;
  productName?: string;
  productId?: string;
  notes?: Record<string, string>;
  createdAt?: string;
}) {
  const smtpUser = getEnvVar("SMTP_USER");
  const smtpPass = getEnvVar("SMTP_PASS");
  const adminEmail = getEnvVar("ADMIN_EMAIL") || smtpUser || "swapnil@theblueintellect.com";

  if (!smtpUser || !smtpPass) {
    console.log("ℹ️ SMTP credentials not configured. Payment logged to console.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: getEnvVar("SMTP_HOST", "smtp.gmail.com"),
    port: parseInt(getEnvVar("SMTP_PORT", "587"), 10),
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const mailOptions = {
    from: `"SAP DigiTech Payments" <${smtpUser}>`,
    to: adminEmail,
    subject: `💰 New Source Code Purchase: ${details.productName || "Product"} (₹${details.amount.toLocaleString("en-IN")})`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
        <div style="background: linear-gradient(135deg, #1B2240, #0B0F19); padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 24px;">
          <h1 style="color: #FF6B00; margin: 0; font-size: 24px; font-weight: 800;">SAP DigiTech Solutions</h1>
          <p style="color: #94A3B8; margin: 4px 0 0; font-size: 14px;">Source Code Purchase Confirmation</p>
        </div>
        
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 18px; margin-bottom: 20px;">
          <h2 style="color: #0F172A; font-size: 18px; margin-top: 0; margin-bottom: 14px;">Payment Summary</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
            <tr>
              <td style="padding: 6px 0; font-weight: 600;">Product:</td>
              <td style="padding: 6px 0; color: #FF6B00; font-weight: 700;">${details.productName || "Commercial Source Code"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600;">Amount Paid:</td>
              <td style="padding: 6px 0; font-weight: 700;">₹${details.amount.toLocaleString("en-IN")} ${details.currency}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600;">Payment ID:</td>
              <td style="padding: 6px 0; font-family: monospace; color: #0284C7;">${details.paymentId}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600;">Customer Email:</td>
              <td style="padding: 6px 0;">${details.customerEmail || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600;">Customer Contact:</td>
              <td style="padding: 6px 0;">${details.customerContact || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600;">Timestamp:</td>
              <td style="padding: 6px 0;">${details.createdAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
            </tr>
          </table>
        </div>

        <p style="font-size: 13px; color: #64748B; margin-bottom: 0;">
          Please provision GitHub repository access and send the commercial license package to <strong>${details.customerEmail || "the customer"}</strong>.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`✉️ Payment alert email dispatched to ${adminEmail}`);
}

/**
 * Main Webhook HTTP Handler for Razorpay events
 */
export async function handleRazorpayWebhook(request: Request): Promise<Response> {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Razorpay-Signature",
  };

  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // Health-check / test ping
  if (request.method === "GET") {
    return new Response(
      JSON.stringify({
        status: "ok",
        service: "SAP DigiTech Solutions — Razorpay Webhook Endpoint",
        endpoint: "/api/razorpay-webhook",
        timestamp: new Date().toISOString(),
        instructions:
          "Configure this endpoint URL in your Razorpay Dashboard under Webhooks with event: payment.captured",
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    // Secret check: prioritize RAZORPAY_WEBHOOK_SECRET, fallback to RAZORPAY_KEY_SECRET
    const webhookSecret =
      getEnvVar("RAZORPAY_WEBHOOK_SECRET") || getEnvVar("RAZORPAY_KEY_SECRET");

    if (webhookSecret) {
      const isValid = verifyRazorpayWebhookSignature(rawBody, signature, webhookSecret);
      if (!isValid) {
        console.warn("⚠️ Razorpay webhook signature verification failed!");
        return new Response(
          JSON.stringify({
            error: "Invalid signature",
            message: "X-Razorpay-Signature verification failed",
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      console.log(" Razorpay webhook signature verified successfully.");
    } else {
      console.warn("⚠️ RAZORPAY_WEBHOOK_SECRET not set; processing without signature verification.");
    }

    const payload = JSON.parse(rawBody);
    const event = payload?.event;
    console.log(`⚡ Received Razorpay Webhook Event: "${event}"`);

    // Handle payment.captured
    if (event === "payment.captured") {
      const payment = payload?.payload?.payment?.entity;
      if (payment) {
        const amountInRupees = (payment.amount || 0) / 100;
        const notes = payment.notes || {};
        const productName = notes.productName || notes.product || "Source Code License";
        const productId = notes.productId || "";

        console.log("💰 Payment Captured:", {
          id: payment.id,
          amount: `₹${amountInRupees}`,
          currency: payment.currency,
          email: payment.email,
          contact: payment.contact,
          product: productName,
          productId,
        });

        // Send alert asynchronously (won't block 200 OK response)
        sendPaymentNotificationEmail({
          paymentId: payment.id,
          amount: amountInRupees,
          currency: payment.currency || "INR",
          customerEmail: payment.email,
          customerContact: payment.contact,
          productName,
          productId,
          notes,
          createdAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        }).catch((err) => {
          console.error("Failed to send payment alert email:", err);
        });
      }
    } else if (event === "payment.failed") {
      const payment = payload?.payload?.payment?.entity;
      console.warn("❌ Payment Failed Event:", {
        id: payment?.id,
        amount: (payment?.amount || 0) / 100,
        error_code: payment?.error_code,
        error_description: payment?.error_description,
      });
    }

    // Always respond with 200 OK quickly so Razorpay doesn't retry
    return new Response(
      JSON.stringify({
        status: "ok",
        received: true,
        event,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error processing Razorpay webhook:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
}
