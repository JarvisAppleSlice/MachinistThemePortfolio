import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "samuel.s.jarvis@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

// Mirrors src/utils/validation.ts's rules. Duplicated rather than imported:
// this function is bundled by Vercel's Node builder, a separate pipeline
// from the Vite frontend build, and cross-directory imports into src/ don't
// resolve reliably at runtime under that builder.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactFormValues {
	name: string;
	email: string;
	message: string;
}

interface ContactFormErrors {
	name?: string;
	email?: string;
	message?: string;
}

function validateContactForm(values: ContactFormValues): ContactFormErrors {
	const errors: ContactFormErrors = {};

	if (values.name.trim().length < 2 || values.name.trim().length > 50) {
		errors.name = "Name must be between 2 and 50 characters.";
	}

	if (values.email.trim().length < 2 || values.email.trim().length > 100) {
		errors.email = "Email must be between 2 and 100 characters.";
	} else if (!EMAIL_PATTERN.test(values.email.trim())) {
		errors.email = "Enter a valid email address.";
	}

	if (values.message.trim().length < 2 || values.message.trim().length > 1000) {
		errors.message = "Message must be between 2 and 1000 characters.";
	}

	return errors;
}

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
