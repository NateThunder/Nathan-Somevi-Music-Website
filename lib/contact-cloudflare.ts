import { getCloudflareContext } from "@opennextjs/cloudflare";

export type D1DatabaseLike = {
  prepare(query: string): D1PreparedStatementLike;
};

type D1PreparedStatementLike = {
  bind(...values: unknown[]): D1PreparedStatementLike;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<unknown>;
};

export type ContactRuntimeEnv = Record<string, unknown> & {
  DB?: D1DatabaseLike;
};

const TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";
const CONTACT_THROTTLE_WINDOW_MS = 15 * 60 * 1000;
const CONTACT_THROTTLE_LIMIT = 5;

export class ContactConfigurationError extends Error {}

export async function getContactRuntimeEnv(): Promise<ContactRuntimeEnv> {
  try {
    return (await getCloudflareContext({ async: true })).env as ContactRuntimeEnv;
  } catch {
    return {};
  }
}

function envString(env: ContactRuntimeEnv | undefined, name: string): string {
  const fromBinding = env?.[name];
  const value = typeof fromBinding === "string" ? fromBinding : process.env[name];
  return value?.trim() ?? "";
}

function isProduction() {
  return process.env.NODE_ENV === "production";
}

export function getTurnstileSiteKey(env?: ContactRuntimeEnv): string {
  const configured = envString(env, "TURNSTILE_SITE_KEY") || envString(env, "NEXT_PUBLIC_TURNSTILE_SITE_KEY");
  if (configured) return configured;

  return isProduction() ? "" : "1x00000000000000000000AA";
}

function getTurnstileSecretKey(env?: ContactRuntimeEnv): string {
  const configured = envString(env, "TURNSTILE_SECRET_KEY");
  if (configured) return configured;

  return isProduction() ? "" : TURNSTILE_TEST_SECRET_KEY;
}

export async function verifyTurnstileToken(
  env: ContactRuntimeEnv,
  token: string,
  ipAddress: string
): Promise<{ ok: true } | { ok: false; error: string; status: number }> {
  const secret = getTurnstileSecretKey(env);
  if (!secret) {
    throw new ContactConfigurationError("TURNSTILE_SECRET_KEY is not configured.");
  }

  if (!token) {
    return { ok: false, error: "Please complete the verification challenge.", status: 400 };
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret,
      response: token,
      ...(ipAddress ? { remoteip: ipAddress } : {}),
    }),
  });

  if (!response.ok) {
    return { ok: false, error: "Verification is temporarily unavailable. Please try again.", status: 502 };
  }

  const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
  if (!result?.success) {
    return { ok: false, error: "Verification failed. Please try again.", status: 400 };
  }

  return { ok: true };
}

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function isoFromMs(ms: number) {
  return new Date(ms).toISOString();
}

async function contactHash(env: ContactRuntimeEnv, label: string, value: string): Promise<string> {
  const secret = envString(env, "CONTACT_THROTTLE_SECRET");
  if (!secret) {
    if (!isProduction()) return sha256Hex(`${label}:${value}`);
    throw new ContactConfigurationError("CONTACT_THROTTLE_SECRET is not configured.");
  }

  return sha256Hex(`${secret}:${label}:${value}`);
}

export async function recordContactAttempt(
  env: ContactRuntimeEnv,
  input: { ipAddress: string; email: string }
): Promise<{ ok: true; attemptId: string | null } | { ok: false; error: string; status: number }> {
  const db = env.DB;
  if (!db) {
    return { ok: true, attemptId: null };
  }

  const now = Date.now();
  const cutoff = isoFromMs(now - CONTACT_THROTTLE_WINDOW_MS);
  const ipHash = input.ipAddress ? await contactHash(env, "ip", input.ipAddress) : "";
  const emailHash = await contactHash(env, "email", input.email.toLowerCase());

  await db.prepare("DELETE FROM contact_form_attempts WHERE attempted_at < ?").bind(cutoff).run();

  const countFor = async (field: "ip_hash" | "email_hash", value: string) => {
    if (!value) return 0;
    const row = await db
      .prepare(`SELECT COUNT(*) as count FROM contact_form_attempts WHERE ${field} = ? AND attempted_at >= ?`)
      .bind(value, cutoff)
      .first<{ count: number }>();
    return Number(row?.count ?? 0);
  };

  const [ipCount, emailCount] = await Promise.all([
    countFor("ip_hash", ipHash),
    countFor("email_hash", emailHash),
  ]);

  if (ipCount >= CONTACT_THROTTLE_LIMIT || emailCount >= CONTACT_THROTTLE_LIMIT) {
    return {
      ok: false,
      error: "Too many enquiries have been sent recently. Please wait a few minutes and try again.",
      status: 429,
    };
  }

  const attemptId = crypto.randomUUID();
  await db
    .prepare(
      `INSERT INTO contact_form_attempts (id, ip_hash, email_hash, attempted_at, successful)
       VALUES (?, ?, ?, ?, ?)`
    )
    .bind(attemptId, ipHash || null, emailHash, new Date(now).toISOString(), 0)
    .run();

  return { ok: true, attemptId };
}

export async function markContactAttemptSuccessful(env: ContactRuntimeEnv, attemptId: string | null) {
  if (!env.DB || !attemptId) return;

  await env.DB
    .prepare("UPDATE contact_form_attempts SET successful = 1 WHERE id = ?")
    .bind(attemptId)
    .run();
}
