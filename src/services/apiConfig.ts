// Same-origin Vercel serverless function (api/contact.ts) — no CORS needed.
const DEFAULT_CONTACT_API_URL = "/api/contact";

export const CONTACT_API_URL: string =
	import.meta.env.VITE_CONTACT_API_URL ?? DEFAULT_CONTACT_API_URL;
