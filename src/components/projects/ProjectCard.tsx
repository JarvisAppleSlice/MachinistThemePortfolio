import type { Project } from "../../types/project";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

const STATUS_LABEL: Record<Project["status"], string> = {
	live: "Live",
	"in-progress": "In Progress",
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
	const { ref, isInView } = useRevealOnScroll<HTMLElement>();
	const drawingNo = `${String(index + 1).padStart(3, "0")}-A`;

	return (
		<article
			ref={ref}
			className={`card border border-ink bg-[rgba(255,255,253,0.88)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_rgba(27,78,145,0.18)] ${
				isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
			} group`}
		>
			<div className="flex justify-between border-b border-black/10 px-6 pb-5 pt-6">
				<div>
					<h3 className="font-grotesk text-[22px] font-semibold text-ink">{project.title}</h3>
					<div className="mt-1.5 font-mono text-[11.5px] text-steel">{project.type.toUpperCase()}</div>
				</div>
				<div className="whitespace-nowrap text-right font-mono text-[11.5px] text-brass">
					DWG NO. {drawingNo}
				</div>
			</div>

			<div className="px-6 pb-6 pt-5">
				<p className="max-w-[600px] text-[14.5px] leading-relaxed text-ink">{project.description}</p>
				<div className="mt-4 flex flex-wrap gap-2">
					{project.tags.map((tag) => (
						<span
							key={tag}
							className="border border-steel px-2.5 py-1 font-mono text-[10.5px] tracking-[0.03em] text-steel transition-colors group-hover:border-blue group-hover:text-blue"
						>
							{tag.toUpperCase()}
						</span>
					))}
				</div>
			</div>

			<div className="grid grid-cols-3 border-t border-ink font-mono text-[10.5px]">
				<div className="border-r border-black/10 px-3.5 py-2.5">
					<span className="mb-0.5 block tracking-[0.04em] text-steel">MATERIAL</span>
					<span className="font-medium text-ink">{project.material}</span>
				</div>
				<div className="border-r border-black/10 px-3.5 py-2.5">
					<span className="mb-0.5 block tracking-[0.04em] text-steel">TYPE</span>
					<span className="font-medium text-ink">{project.type}</span>
				</div>
				<div className="px-3.5 py-2.5">
					<span className="mb-0.5 block tracking-[0.04em] text-steel">STATUS</span>
					<span className="font-medium text-ink">{STATUS_LABEL[project.status]}</span>
				</div>
			</div>

			{project.url && (
				<a
					href={project.url}
					target="_blank"
					rel="noreferrer"
					className="block border-t border-black/10 px-6 py-3 font-mono text-[11.5px] text-blue hover:underline"
				>
					{project.linkLabel ?? "View Project"} →
				</a>
			)}
		</article>
	);
}
