import type { Project } from "../types/project";

// Single source of truth for project data. Field mapping for the title-block
// cards is deliberately honest: MATERIAL (real tech stack) and TYPE (Personal
// Project / Coursework) replace the original blueprint design's fabricated
// TOLERANCE/QTY SHIPPED business metrics, which don't map to anything real here.
export const allProjects: Project[] = [
	{
		title: "React Recipe Database App",
		description:
			"React app with registration/login, recipe creation and storage, and an integrated database.",
		tags: ["React", "JavaScript", "Database"],
		status: "live",
		featured: true,
		material: "React, JavaScript",
		type: "Personal Project",
		url: "https://recipe-db-three.vercel.app/",
		linkLabel: "View Project",
	},
	{
		title: "Music Library Manager",
		description:
			"ASP.NET Core Razor Pages app with login/registration and song, album, and artist creation and storage.",
		tags: ["C#", "ASP.NET Core", "EF Core", "SQL"],
		status: "in-progress",
		featured: true,
		material: "C#, ASP.NET Core, EF Core, SQL",
		type: "Personal Project",
		url: "https://github.com/JarvisAppleSlice/musiclibrarymanager.git",
		linkLabel: "View on GitHub",
	},
	{
		title: "React Portfolio App",
		description:
			"React app with registration/login, basic messaging, and article sharing.",
		tags: ["React", "JavaScript"],
		status: "live",
		featured: true,
		material: "React, JavaScript",
		type: "Personal Project",
		url: "https://react-final-chi-one.vercel.app/",
		linkLabel: "View Project",
	},
	{
		title: "Weather App",
		description:
			"API-driven weather app with dynamic UI updates, built during coursework at Bridgerland Applied Technology College.",
		tags: ["JavaScript", "REST APIs", "CSS"],
		status: "in-progress",
		featured: true,
		material: "JavaScript, REST APIs",
		type: "Coursework",
		url: "https://github.com/JarvisAppleSlice/Weather-App.git",
		linkLabel: "View on GitHub",
	},
	{
		title: "Static Web App",
		description: "First Azure Static Web Apps deployment.",
		tags: ["Azure", "Static Web Apps"],
		status: "in-progress",
		material: "Azure, Static Web Apps",
		type: "Coursework",
		url: "https://mango-forest-05e2a0210.4.azurestaticapps.net",
		linkLabel: "View Website",
	},
	{
		title: "Resume App",
		description: "Intro C# app.",
		tags: ["C#"],
		status: "in-progress",
		material: "C#",
		type: "Coursework",
		url: "https://github.com/JarvisAppleSlice/Resume-App.git",
		linkLabel: "View on GitHub",
	},
	{
		title: "Udemy HTML Project",
		description:
			"Intro HTML/CSS/JS project, including a birthday card/invite and a favorite-movies section with linked URLs.",
		tags: ["HTML", "CSS", "JavaScript"],
		status: "in-progress",
		material: "HTML, CSS, JavaScript",
		type: "Coursework",
		url: "https://github.com/JarvisAppleSlice/html-portfolio.git",
		linkLabel: "View on GitHub",
	},
];

export const featuredProjects = allProjects.filter((p) => p.featured);
