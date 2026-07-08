import type { ContactFormValues } from "../types/contact";
import { CONTACT_API_URL } from "./apiConfig";

export async function sendContactMessage(values: ContactFormValues): Promise<void> {
	const res = await fetch(CONTACT_API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	});

	if (!res.ok) {
		throw new Error("Failed to send message.");
	}
}
