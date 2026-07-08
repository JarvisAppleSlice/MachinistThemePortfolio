export type ProjectStatus = "live" | "in-progress";

export interface Project {
	title: string;
	description: string;
	tags: string[];
	status: ProjectStatus;
	featured?: boolean;
	/** Title-block "MATERIAL" field — primary tech stack, e.g. "React, Node, Postgres" */
	material: string;
	/** Title-block "TYPE" field — e.g. "Personal Project", "Coursework" */
	type: string;
	url?: string;
	linkLabel?: string;
}
