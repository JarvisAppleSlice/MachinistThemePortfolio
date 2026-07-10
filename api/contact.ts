import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { validateContactForm } from "../src/utils/validation";
import type { ContactFormValues } from "../src/types/contact";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "samuel.s.jarvis@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== "POST") {
		res.status(405).json({ error: "Method not allowed." });
		return;
	}

	const body = (req.body ?? {}) as Partial<ContactFormValues>;
	const values: ContactFormValues = {
		name: typeof body.name === "string" ? body.name : "",
		email: typeof body.email === "string" ? body.email : "",
		message: typeof body.message === "string" ? body.message : "",
	};

	const errors = validateContactForm(values);
	if (Object.keys(errors).length > 0) {
		res.status(400).json({ errors });
		return;
	}

	try {
		await resend.emails.send({
			from: FROM_EMAIL,
			to: TO_EMAIL,
			replyTo: values.email,
			subject: `Portfolio contact form: ${values.name}`,
			text: values.message,
		});

		res.status(200).json({ ok: true });
	} catch (error) {
		console.error("Failed to send contact email", error);
		res.status(502).json({ error: "Failed to send message." });
	}
}
