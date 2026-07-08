import { useContactForm } from "../../hooks/useContactForm";

const fieldClasses =
	"w-full border border-ink bg-white px-3 py-2 font-mono text-sm text-ink focus:border-blue focus:outline-none";
const labelClasses = "flex flex-col gap-1.5 font-mono text-[11px] tracking-[0.05em] text-steel";

export function ContactForm() {
	const { values, errors, status, updateField, handleSubmit } = useContactForm();

	return (
		<div className="panel border border-ink bg-[rgba(245,243,238,0.88)]">
			<div className="flex items-center justify-between border-b border-ink px-5 py-3 font-mono text-[10.5px] tracking-[0.05em] text-steel">
				<span>WORK ORDER</span>
				<span className="text-brass">NO. 100-A</span>
			</div>

			<form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 p-6 md:p-8">
				<label className={labelClasses}>
					NAME
					<input
						type="text"
						value={values.name}
						onChange={(e) => updateField("name", e.target.value)}
						className={fieldClasses}
					/>
					{errors.name && (
						<span role="alert" className="font-sans text-xs font-normal normal-case tracking-normal text-red">
							{errors.name}
						</span>
					)}
				</label>

				<label className={labelClasses}>
					EMAIL
					<input
						type="email"
						value={values.email}
						onChange={(e) => updateField("email", e.target.value)}
						className={fieldClasses}
					/>
					{errors.email && (
						<span role="alert" className="font-sans text-xs font-normal normal-case tracking-normal text-red">
							{errors.email}
						</span>
					)}
				</label>

				<label className={labelClasses}>
					MESSAGE / SCOPE OF WORK
					<textarea
						rows={5}
						value={values.message}
						onChange={(e) => updateField("message", e.target.value)}
						className={fieldClasses}
					/>
					{errors.message && (
						<span role="alert" className="font-sans text-xs font-normal normal-case tracking-normal text-red">
							{errors.message}
						</span>
					)}
				</label>

				<button
					type="submit"
					disabled={status === "submitting"}
					className="self-start border border-ink bg-blue px-5 py-2.5 font-mono text-xs font-semibold tracking-[0.05em] text-white transition-colors hover:bg-blue-dark disabled:opacity-60"
				>
					{status === "submitting" ? "SUBMITTING…" : "SUBMIT WORK ORDER"}
				</button>

				{status === "success" && (
					<p role="status" className="font-mono text-xs text-blue">
						Message sent successfully.
					</p>
				)}
				{status === "error" && (
					<p role="alert" className="font-mono text-xs text-red">
						Failed to send message. Please try again.
					</p>
				)}
			</form>
		</div>
	);
}
