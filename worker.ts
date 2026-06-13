// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: OpenNext generates this file before Wrangler bundles the Worker.
import openNextWorker from "./.open-next/worker.js";

const ADMIN_REALM = "Nathan Somevi Admin";

type Env = {
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
};

function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/api/admin/");
}

function timingSafeEqual(a: string, b: string) {
  const encoder = new TextEncoder();
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);
  const length = Math.max(aBytes.length, bBytes.length);
  let mismatch = aBytes.length === bBytes.length ? 0 : 1;

  for (let i = 0; i < length; i += 1) {
    mismatch |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
  }

  return mismatch === 0;
}

function parseBasicAuth(header: string | null) {
  if (!header?.startsWith("Basic ")) return null;

  try {
    const decoded = atob(header.slice("Basic ".length));
    const separatorIndex = decoded.indexOf(":");
    if (separatorIndex === -1) return null;

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    };
  } catch {
    return null;
  }
}

function unauthorized() {
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${ADMIN_REALM}", charset="UTF-8"`,
      "Cache-Control": "no-store",
    },
  });
}

function authNotConfigured() {
  return new Response("Admin authentication is not configured.", {
    status: 503,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function getAdminAuthResponse(request: Request, env: Env) {
  const expectedUsername = env.ADMIN_USERNAME;
  const expectedPassword = env.ADMIN_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    return authNotConfigured();
  }

  const credentials = parseBasicAuth(request.headers.get("authorization"));

  if (
    !credentials ||
    !timingSafeEqual(credentials.username, expectedUsername) ||
    !timingSafeEqual(credentials.password, expectedPassword)
  ) {
    return unauthorized();
  }

  return null;
}

const worker = {
  async fetch(request: Request, env: Env, ctx: unknown) {
    const url = new URL(request.url);

    if (isAdminPath(url.pathname)) {
      const authResponse = getAdminAuthResponse(request, env);
      if (authResponse) return authResponse;
    }

    return openNextWorker.fetch(request, env, ctx);
  },
};

export default worker;
