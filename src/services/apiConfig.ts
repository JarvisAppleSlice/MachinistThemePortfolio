// Points at the existing, already-deployed Azure Function from the other
// portfolio rebuild (Resend email API, refactored into clean layers there).
// Reused as-is here rather than duplicating a second backend.
const DEFAULT_CONTACT_API_URL =
	"https://portfoliofunction-dwgkftdfeybtaba3.westus2-01.azurewebsites.net/api/Contact";

export const CONTACT_API_URL: string =
	import.meta.env.VITE_CONTACT_API_URL ?? DEFAULT_CONTACT_API_URL;
