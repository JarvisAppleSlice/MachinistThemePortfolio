import { featuredProjects } from "../../content/projects";
import { socialLinks } from "../../content/socialLinks";
import { ProjectCard } from "../projects/ProjectCard";
import { SectionHead } from "./SectionHead";

export function WorkSection() {
	return (
		<section id="work" className="py-24 md:py-32">
			<SectionHead num="01" title="Selected Work" />

			<div className="mx-auto flex max-w-[1000px] flex-col gap-8 px-6 md:px-12 md:pr-[170px]">
				{featuredProjects.map((project, i) => (
					<ProjectCard key={project.title} project={project} index={i} />
				))}

				<a
					href={socialLinks.github}
					target="_blank"
					rel="noreferrer"
					className="self-start font-mono text-sm text-blue hover:underline"
				>
					View more projects on GitHub →
				</a>
			</div>
		</section>
	);
}
