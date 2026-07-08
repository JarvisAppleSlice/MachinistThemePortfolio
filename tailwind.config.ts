import type { Config } from "tailwindcss";

export default {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				paper: "var(--paper)",
				ink: "var(--ink)",
				blue: "var(--blue)",
				"blue-light": "var(--blue-light)",
				"blue-dark": "var(--blue-dark)",
				brass: "var(--brass)",
				steel: "var(--steel)",
				red: "var(--red)",
				line: "var(--line)",
			},
			fontFamily: {
				display: ["'Big Shoulders Display'", "sans-serif"],
				grotesk: ["'Space Grotesk'", "sans-serif"],
				sans: ["Inter", "sans-serif"],
				mono: ["'JetBrains Mono'", "monospace"],
			},
		},
	},
	plugins: [],
} satisfies Config;
