import { useState } from "react";
import type { ContactFormValues } from "../types/contact";
import { validateContactForm, type ContactFormErrors } from "../utils/validation";
import { sendContactMessage } from "../services/contactService";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const emptyValues: ContactFormValues = { name: "", email: "", message: "" };

export function useContactForm() {
	const [values, setValues] = useState<ContactFormValues>(emptyValues);
	const [errors, setErrors] = useState<ContactFormErrors>({});
	const [status, setStatus] = useState<SubmitStatus>("idle");

	function updateField(field: keyof ContactFormValues, value: string) {
		setValues((prev) => ({ ...prev, [field]: value }));
	}

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		const validationErrors = validateContactForm(values);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length > 0) {
			return;
		}

		setStatus("submitting");

		try {
			await sendContactMessage(values);
			setStatus("success");
			setValues(emptyValues);
		} catch {
			setStatus("error");
		}
	}

	return { values, errors, status, updateField, handleSubmit };
}
