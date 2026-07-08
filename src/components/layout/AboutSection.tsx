import { bio } from "../../content/bio";
import { SectionHead } from "./SectionHead";

export function AboutSection() {
	return (
		<section id="about" className="py-16 md:py-24">
			<SectionHead num="02" title="Spec Sheet" />

			<div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 px-6 md:grid-cols-[1.1fr_0.9fr] md:px-12 md:pr-[170px]">
				<div className="panel border border-ink bg-[rgba(245,243,238,0.88)] px-6 py-8 md:px-10 md:py-9">
					{bio.aboutParagraphs.map((p) => (
						<p key={p} className="mb-4 max-w-[520px] text-base leading-[1.75] text-ink last:mb-0">
							{p}
						</p>
					))}
				</div>

				<div className="spec-sheet self-start border border-ink bg-[rgba(245,243,238,0.88)] font-mono text-xs">
					<div className="border-b border-ink px-4 py-3 tracking-[0.05em] text-steel">
						CANDIDATE SPECIFICATION
					</div>
					{bio.specSheet.map((row, i) => (
						<div
							key={row.label}
							className={`flex justify-between px-4 py-2.5 ${i < bio.specSheet.length - 1 ? "border-b border-black/10" : ""}`}
						>
							<span className="text-steel">{row.label}</span>
							<span className="text-right font-medium text-ink">{row.value}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
