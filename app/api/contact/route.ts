import {
  ContactConfigurationError,
  getContactRuntimeEnv,
  markContactAttemptSuccessful,
  recordContactAttempt,
  verifyTurnstileToken,
} from "@/lib/contact-cloudflare";
import { validateContactEnquiry } from "@/lib/contact";
import {
  getContactEmailConfig,
  missingContactEmailEnvMessage,
  sendContactEmail,
} from "@/lib/contact-email";

function json(body: unknown, init?: ResponseInit): Response {
  return Response.json(body, init);
}

function clientIp(request: Request) {
  const forwardedFor = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for");
  return forwardedFor ? forwardedFor.split(",")[0].trim() : "";
}

export async function POST(request: Request): Promise<Response> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid request body. Please submit valid JSON." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return json({ error: "Invalid request body. Please submit valid JSON." }, { status: 400 });
  }

  const validation = validateContactEnquiry(payload);
  if (!validation.ok) {
    return json({ error: validation.error }, { status: 400 });
  }

  if (validation.data.botField) {
    return json({ ok: true }, { status: 200 });
  }

  const env = await getContactRuntimeEnv();
  const ipAddress = clientIp(request);
  const userAgent = request.headers.get("user-agent") ?? "";

  try {
    const turnstile = await verifyTurnstileToken(env, validation.data.turnstileToken, ipAddress);
    if (!turnstile.ok) {
      return json({ error: turnstile.error }, { status: turnstile.status });
    }

    const attempt = await recordContactAttempt(env, {
      ipAddress,
      email: validation.data.email,
    });
    if (!attempt.ok) {
      return json({ error: attempt.error }, { status: attempt.status });
    }

    const config = getContactEmailConfig(env);
    await sendContactEmail(config, validation.data, {
      ipAddress,
      userAgent,
    });
    await markContactAttemptSuccessful(env, attempt.attemptId);

    return json({ ok: true }, { status: 200 });
  } catch (error) {
    if (
      error instanceof ContactConfigurationError ||
      (error instanceof Error && error.message === missingContactEmailEnvMessage)
    ) {
      return json(
        { error: "Form handling is not configured yet. Please email us at manager@nathansomevi.com directly for now." },
        { status: 503 }
      );
    }

    console.error("Unexpected contact enquiry failure", error);
    return json(
      { error: "We could not send that enquiry. Please try again or email us at manager@nathansomevi.com directly." },
      { status: 500 }
    );
  }
}
