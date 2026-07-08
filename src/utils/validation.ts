import type { ContactFormValues } from "../types/contact";

// Mirrors ContactFunctionApp/Dtos/ContactRequest.cs's DataAnnotations exactly
// (length bounds), plus a basic email-shape check the backend doesn't
// enforce itself but is worth failing fast on client-side.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactFormErrors {
	name?: string;
	email?: string;
	message?: string;
}

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
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
