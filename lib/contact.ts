export type ContactEnquiryInput = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  enquiryType?: unknown;
  eventDate?: unknown;
  location?: unknown;
  message?: unknown;
  botField?: unknown;
  source?: unknown;
  turnstileToken?: unknown;
};

export type ContactEnquiryRecord = {
  name: string;
  email: string;
  phone: string;
  enquiryType: "booking" | "collaboration" | "press" | "general";
  eventDate: string;
  location: string;
  message: string;
  botField: string;
  source: string;
  turnstileToken: string;
};

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ENQUIRY_TYPES = new Set(["booking", "collaboration", "press", "general"]);

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidIsoDate(value: string): boolean {
  if (!ISO_DATE_PATTERN.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));

  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

export function normalizeContactEnquiry(input: ContactEnquiryInput): ContactEnquiryRecord {
  const enquiryType = normalizeText(input.enquiryType).toLowerCase();
  return {
    name: normalizeText(input.name),
    email: normalizeText(input.email).toLowerCase(),
    phone: normalizeText(input.phone),
    enquiryType: ENQUIRY_TYPES.has(enquiryType)
      ? (enquiryType as ContactEnquiryRecord["enquiryType"])
      : "general",
    eventDate: normalizeText(input.eventDate),
    location: normalizeText(input.location),
    message: normalizeText(input.message),
    botField: normalizeText(input.botField),
    source: normalizeText(input.source) || "website",
    turnstileToken: normalizeText(input.turnstileToken),
  };
}

export function validateContactEnquiry(input: ContactEnquiryInput):
  | { ok: true; data: ContactEnquiryRecord }
  | { ok: false; error: string } {
  const rawEnquiryType = normalizeText(input.enquiryType).toLowerCase();
  const normalized = normalizeContactEnquiry(input);

  if (!normalized.name || !normalized.email || !normalized.message) {
    return {
      ok: false,
      error: "Name, email, and message are required.",
    };
  }

  if (!EMAIL_PATTERN.test(normalized.email)) {
    return {
      ok: false,
      error: "Enter a valid email address.",
    };
  }

  if (!ENQUIRY_TYPES.has(rawEnquiryType)) {
    return {
      ok: false,
      error: "Choose a valid enquiry type.",
    };
  }

  if (normalized.eventDate && !isValidIsoDate(normalized.eventDate)) {
    return {
      ok: false,
      error: "Enter a valid event date in YYYY-MM-DD format.",
    };
  }

  return {
    ok: true,
    data: normalized,
  };
}
