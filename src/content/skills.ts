export interface SkillCategory {
	title: string;
	items: string[];
}

// Scoped to what's actually being hired for, and what Samuel can hold a real
// interview conversation about today. HTML/CSS/Bootstrap are assumed
// baseline at this point and left off (per his brother-in-law's review).
// Next.js and Tailwind CSS were added on top of the original trimmed list:
// Next.js was explicitly recommended in that review, and Tailwind is now
// genuinely true (both rebuilt portfolio sites use it). Jest/RTL/xUnit are
// still excluded — real tests exist in the other rebuilt repo, but Samuel
// hasn't said he's ready to list testing as a mastered skill yet.
export const skillCategories: SkillCategory[] = [
	{
		title: "Languages",
		items: ["TypeScript", "JavaScript", "C#", "SQL"],
	},
	{
		title: "Frameworks & Tools",
		items: ["React", "Next.js", "ASP.NET Core", "Entity Framework Core", "REST APIs", "Tailwind CSS"],
	},
	{
		title: "Cloud & DevOps",
		items: ["AWS", "Azure", "Docker", "Git & GitHub", "GitHub Actions"],
	},
	{
		title: "Practices",
		items: ["Agile/Scrum", "Object-Oriented Programming", "Clean Code Principles"],
	},
];
