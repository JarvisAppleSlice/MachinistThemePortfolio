import { ContactForm } from "../contact/ContactForm";
import { SectionHead } from "./SectionHead";

export function ContactSection() {
	return (
		<section id="contact" className="py-16 md:py-24">
			<SectionHead num="03" title="Contact" />
			<div className="mx-auto max-w-[700px] px-6 md:px-12 md:pr-[170px]">
				<ContactForm />
			</div>
		</section>
	);
}
