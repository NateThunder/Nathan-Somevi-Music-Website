# Cloudflare Upload Guide

Use this file for all future deploys to avoid auth/command drift.

## 1) Authenticate with Cloudflare

Run:

```bash
npx wrangler whoami
```

Recommended flow:

1. Prefer user auth with `npx wrangler login` and avoid brittle API token permission edge cases.
2. If you use `CLOUDFLARE_API_TOKEN`, keep it in your local shell or CI secret store only. Do not put it in `.env.worker`, and do not upload it to the Worker runtime. Ensure it has:
   - `User > User Details > Read`
   - `User > Memberships > Read`
   - `Account > Account Settings > Read`
   - `Account > Workers Scripts > Edit`
   - `Zone > Workers Routes > Edit`
  - `Account > D1 > Edit` if you create the admin database or run migrations
3. Verify account context matches your target project.

## 2) Bootstrap Worker secrets

From repo root:

```bash
npx wrangler secret bulk .env.worker
```

This uploads only the runtime values the worker expects from `.env.worker`. Re-run it whenever Worker-facing secrets change.

Do not bulk upload `.env.local`; that file may contain local-only or deploy-only values. In particular, `.env.worker` must not contain:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_D1_DATABASE_ID`

D1 access at runtime uses the `DB` binding configured in `wrangler.jsonc`, not the Cloudflare REST API.

## 3) Build and deploy to Cloudflare Workers

From repo root:

```bash
npm run cloudflare:build
npm run cloudflare:deploy
```

These scripts now resolve to:

```bash
opennextjs-cloudflare build
opennextjs-cloudflare deploy -- --keep-vars
```

Use `npm run cloudflare:deploy:domain` to deploy and attach the production domains in the same run:

```bash
npm run cloudflare:deploy:domain
```

This resolves to:

```bash
opennextjs-cloudflare deploy -- --keep-vars --domains nathansomevi.com --domains www.nathansomevi.com
```

Cloudflare custom domains cannot be created on a hostname with an existing CNAME record. If a domain attach fails during migration from Pages or another origin, remove the conflicting domain attachment or DNS record first, then rerun the domain deploy.

## 3a) Create and migrate the D1 admin database

This repo stores D1 migrations in `migrations` and uses `wrangler.jsonc` for the `DB` binding.

Create the database once:

```bash
npx wrangler d1 create nathan-somevi-admin
```

The current `database_id` is already configured in `wrangler.jsonc`. If the database is recreated later, replace that id with the new value from Wrangler.

Then apply migrations:

```bash
npm run d1:migrate
```

```bash
npx wrangler d1 migrations apply nathan-somevi-admin --remote
```

## 4) What to do if deploy fails

- If you still see `Authentication error [code: 10000]`, re-check token scopes above.
- Re-run:

```bash
npx wrangler whoami
npx wrangler secret bulk .env.worker
npm run cloudflare:build
npm run cloudflare:deploy
```

- If needed, switch to fresh user auth:

```bash
npx wrangler logout
npx wrangler login
```

If the worker deploy succeeds but `npm run cloudflare:deploy:domain` fails, deploy without domains first, remove the conflicting custom-domain attachment or CNAME in Cloudflare, then rerun the domain deploy.

## 5) Environment variables

Set required env values on the Cloudflare Worker for runtime features. The quickest local bootstrap is `npx wrangler secret bulk .env.worker`, but you can also set them in the dashboard.

Runtime Worker secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_R2_BUCKET_NAME`
- `CLOUDFLARE_R2_PUBLIC_BASE_URL`
- `CLOUDFLARE_R2_JURISDICTION`
- `CLOUDFLARE_R2_ACCESS_KEY_ID` (required for admin product image upload/delete)
- `CLOUDFLARE_R2_SECRET_ACCESS_KEY` (required for admin product image upload/delete)
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `CHECKOUT_RETURN_ALLOWED_ORIGINS` (optional comma-separated checkout return origin allowlist for previews/custom domains)
- `RESEND_API_KEY` (required for order notification emails)
- `ORDER_NOTIFICATION_FROM` (required for order notification emails; use a verified sender)
- `ORDER_NOTIFICATION_TO` (optional)
- `TURNSTILE_SITE_KEY` (required for contact-form abuse protection)
- `TURNSTILE_SECRET_KEY` (required for contact-form abuse protection)
- `CONTACT_THROTTLE_SECRET` (required for stable hashed contact-form throttle identifiers)
- `CONTACT_FORM_TO` (optional; defaults to `manager@nathansomevi.com`)
- `CONTACT_FORM_FROM` (required for contact-form email delivery; must be a verified Resend sender)
- `WIX_API_KEY` (optional for syncing contact-form submissions into Wix Contacts)
- `WIX_SITE_ID` (optional for syncing contact-form submissions into Wix Contacts)

Runtime Worker bindings:

- `DB` D1 database binding for editable admin data
- `ADMIN_USERNAME` (required for `/admin` and `/api/admin/*` basic authentication)
- `ADMIN_PASSWORD` (required for `/admin` and `/api/admin/*` basic authentication)

Admin auth secrets can be set without adding them to any local file:

```bash
npx wrangler secret put ADMIN_USERNAME
npx wrangler secret put ADMIN_PASSWORD
```

If either admin auth secret is missing, the deployed admin area fails closed with `503 Admin authentication is not configured`.

Deploy-only local or CI values:

- `CLOUDFLARE_API_TOKEN` (optional alternative to `npx wrangler login`; never upload as a Worker secret)

Runtime D1 access does not need `CLOUDFLARE_D1_DATABASE_ID`; the database id lives in `wrangler.jsonc` as the `DB` binding.

## 5a) Remove old runtime deploy token

If `.env.local` was previously bulk-uploaded, remove deploy-only Cloudflare values from the live Worker and rotate the token after the new runtime secret boundary is in place:

```bash
npx wrangler secret list
npx wrangler secret delete CLOUDFLARE_API_TOKEN
npx wrangler secret delete CLOUDFLARE_D1_DATABASE_ID
```

Only run the delete commands for secrets that are present in the list.

Then rotate the old Cloudflare API token in the Cloudflare dashboard. Keep any replacement token only in your local shell or CI provider, not in Worker runtime secrets.

## 5b) Contact form email delivery

The contact form verifies Cloudflare Turnstile, applies a D1-backed IP/email throttle, and emails enquiries to the Google Workspace mailbox at `manager@nathansomevi.com`.

Cloudflare Workers cannot send directly through the Wix/Google Workspace mailbox with SMTP. The Worker sends mail through Resend's HTTPS API, using `manager@nathansomevi.com` as the recipient. Wix Contacts sync is optional if Wix API credentials are added later.

Before relying on it in production, make sure you have:

1. A Cloudflare Turnstile widget with `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.
2. `CONTACT_THROTTLE_SECRET` set to a long random server-only value.
3. The `contact_form_attempts` D1 migration applied with `npm run cloudflare:d1:migrate`.
4. A Resend API key in `RESEND_API_KEY`.
5. `CONTACT_FORM_FROM` set to a verified sender, such as `Nathan Somevi <website@nathansomevi.com>` after the domain is verified in Resend.
6. `CONTACT_FORM_TO` set to `manager@nathansomevi.com`, unless you want to use the default.

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put CONTACT_FORM_FROM
npx wrangler secret put CONTACT_FORM_TO
```

Optional Wix Contacts sync:

```bash
npx wrangler secret put WIX_API_KEY
npx wrangler secret put WIX_SITE_ID
```

`next dev` uses Cloudflare's Turnstile test keys when real Turnstile keys are missing, and can exercise the real email submit path as long as the Resend secrets are present locally.

```bash
npm run dev
```

## 6) Stripe webhook setup

After your worker deployment is live, add a Stripe webhook endpoint that points to:

```text
https://<your-domain>/api/stripe/webhook
```

Subscribe the endpoint to these events:

- `payment_intent.succeeded`
- `payment_intent.payment_failed`

Then copy the webhook signing secret from Stripe into the Cloudflare Worker environment as:

```text
STRIPE_WEBHOOK_SECRET
```

Use test-mode Stripe keys for preview/test environments and live-mode keys only for production.

