export interface SkillCategory {
	title: string;
	items: string[];
}

// Deliberately scoped to what's actually being hired for, and what Samuel
// can hold a real interview conversation about today. HTML/CSS are assumed
// baseline at this point and left off. Jest/RTL/xUnit are being learned but
// aren't listed here yet as a mastered skill.
export const skillCategories: SkillCategory[] = [
	{
		title: "Languages",
		items: ["TypeScript", "JavaScript", "C#", "SQL"],
	},
	{
		title: "Frameworks & Tools",
		items: ["React", "ASP.NET Core", "Entity Framework Core", "REST APIs"],
	},
	{
		title: "Cloud & DevOps",
		items: ["AWS", "Azure", "Docker", "Git & GitHub", "GitHub Actions"],
	},
];
