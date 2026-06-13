import type { ContactEnquiryRecord } from "@/lib/contact";

export const missingContactEmailEnvMessage =
  "Missing contact form email environment variables. Set RESEND_API_KEY and CONTACT_FORM_FROM or ORDER_NOTIFICATION_FROM.";

export type ContactEnv = Record<string, unknown>;

export type ContactEmailConfig = {
  toEmail: string;
  resendApiKey: string;
  fromEmail: string;
  wix?: {
    apiKey: string;
    siteId: string;
  };
};

function envString(env: ContactEnv | undefined, name: string): string {
  const fromBinding = env?.[name];
  const value = typeof fromBinding === "string" ? fromBinding : process.env[name];
  return value?.trim() ?? "";
}

function firstEnv(env: ContactEnv | undefined, names: string[]): string {
  for (const name of names) {
    const value = envString(env, name);
    if (value) return value;
  }

  return "";
}

export function getContactEmailConfig(env?: ContactEnv): ContactEmailConfig {
  const resendApiKey = envString(env, "RESEND_API_KEY");
  const fromEmail = firstEnv(env, ["CONTACT_FORM_FROM", "ORDER_NOTIFICATION_FROM"]);
  const toEmail = firstEnv(env, ["CONTACT_FORM_TO", "ORDER_NOTIFICATION_TO"]) || "manager@nathansomevi.com";
  const wixApiKey = envString(env, "WIX_API_KEY");
  const wixSiteId = envString(env, "WIX_SITE_ID");

  if (!resendApiKey || !fromEmail) {
    throw new Error(missingContactEmailEnvMessage);
  }

  return {
    toEmail,
    resendApiKey,
    fromEmail,
    wix: wixApiKey && wixSiteId ? { apiKey: wixApiKey, siteId: wixSiteId } : undefined,
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildContactEmailHtml(
  enquiry: ContactEnquiryRecord,
  metadata: { ipAddress: string; userAgent: string }
): string {
  const rows = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone],
    ["Enquiry type", enquiry.enquiryType],
    ["Event date", enquiry.eventDate],
    ["Location", enquiry.location],
    ["Source", enquiry.source],
    ["IP", metadata.ipAddress],
    ["User-Agent", metadata.userAgent],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:700;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;">${escapeHtml(value || "-")}</td></tr>`
    )
    .join("");

  return [
    '<div style="font-family:Arial,sans-serif;line-height:1.5;color:#10233a;">',
    "<h2>New Nathan Somevi enquiry</h2>",
    '<table style="border-collapse:collapse;margin:16px 0;">',
    rows,
    "</table>",
    "<h3>Message</h3>",
    `<p style="white-space:pre-wrap;">${escapeHtml(enquiry.message || "-")}</p>`,
    "</div>",
  ].join("");
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) {
    return {
      first: parts[0] ?? fullName,
      last: "",
    };
  }

  return {
    first: parts.slice(0, -1).join(" "),
    last: parts.at(-1) ?? "",
  };
}

function enquirySummary(enquiry: ContactEnquiryRecord, metadata: { ipAddress: string; userAgent: string }) {
  return [
    `Enquiry type: ${enquiry.enquiryType}`,
    `Event date: ${enquiry.eventDate || "-"}`,
    `Location: ${enquiry.location || "-"}`,
    `Source: ${enquiry.source}`,
    `IP: ${metadata.ipAddress || "-"}`,
    `User-Agent: ${metadata.userAgent || "-"}`,
    "",
    enquiry.message,
  ].join("\n");
}

async function sendViaResend(
  config: ContactEmailConfig,
  enquiry: ContactEnquiryRecord,
  metadata: { ipAddress: string; userAgent: string }
) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.fromEmail,
      to: [config.toEmail],
      reply_to: enquiry.email,
      subject: `New Nathan Somevi enquiry from ${enquiry.name}`,
      html: buildContactEmailHtml(enquiry, metadata),
    }),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Contact email send failed: ${responseText}`);
  }

  await response.text().catch(() => null);
}

async function createWixContact(
  config: NonNullable<ContactEmailConfig["wix"]>,
  enquiry: ContactEnquiryRecord,
  metadata: { ipAddress: string; userAgent: string }
) {
  const name = splitName(enquiry.name);
  const response = await fetch("https://www.wixapis.com/contacts/v4/contacts", {
    method: "POST",
    headers: {
      Authorization: config.apiKey,
      "Content-Type": "application/json",
      "wix-site-id": config.siteId,
    },
    body: JSON.stringify({
      info: {
        name,
        emails: {
          items: [
            {
              tag: "MAIN",
              email: enquiry.email,
            },
          ],
        },
        ...(enquiry.phone
          ? {
              phones: {
                items: [
                  {
                    tag: "MOBILE",
                    phone: enquiry.phone,
                  },
                ],
              },
            }
          : {}),
        extendedFields: {
          items: {
            "custom.enquiry_type": enquiry.enquiryType,
            "custom.event_date": enquiry.eventDate,
            "custom.location": enquiry.location,
            "custom.message": enquiry.message,
            "custom.source": enquiry.source,
            "custom.submission_summary": enquirySummary(enquiry, metadata),
          },
        },
      },
      allowDuplicates: true,
    }),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Wix contact create failed: ${responseText}`);
  }

  await response.text().catch(() => null);
}

export async function sendContactEmail(
  config: ContactEmailConfig,
  enquiry: ContactEnquiryRecord,
  metadata: { ipAddress: string; userAgent: string }
): Promise<"email"> {
  await sendViaResend(config, enquiry, metadata);

  if (config.wix) {
    createWixContact(config.wix, enquiry, metadata).catch((error) => {
      console.error("Optional Wix contact sync failed", error);
    });
  }

  return "email";
}
