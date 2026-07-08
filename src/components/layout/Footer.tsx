import { socialLinks } from "../../content/socialLinks";
import { bio } from "../../content/bio";

export function Footer() {
	return (
		<footer className="relative z-[1] flex flex-col items-start justify-between gap-4 border-t border-blue/25 bg-[#f5f3ee] px-6 py-8 font-mono text-xs text-steel sm:flex-row sm:items-end md:px-12 md:pr-[170px]">
			<div>© {new Date().getFullYear()} {bio.name} — BUILT TO SPEC</div>
			<div className="flex gap-4">
				<a href={`mailto:${socialLinks.email}`} className="border-b border-brass text-ink no-underline">
					EMAIL
				</a>
				<a
					href={socialLinks.github}
					target="_blank"
					rel="noreferrer"
					className="border-b border-brass text-ink no-underline"
				>
					GITHUB
				</a>
				<a
					href={socialLinks.linkedin}
					target="_blank"
					rel="noreferrer"
					className="border-b border-brass text-ink no-underline"
				>
					LINKEDIN
				</a>
			</div>
		</footer>
	);
}
