const REV_CELLS = [
	{ label: "REV", value: "A" },
	{ label: "DESCRIPTION", value: "PORTFOLIO RELEASE" },
	{ label: "DATE", value: "07.2026" },
	{ label: "APPROVED", value: "S.J." },
];

const NAV_LINKS = [
	{ href: "#work", label: "WORK" },
	{ href: "#about", label: "SPEC" },
	{ href: "#contact", label: "CONTACT" },
];

export function Nav() {
	return (
		<nav className="fixed inset-x-0 top-0 z-40 flex items-stretch justify-between bg-[#f5f3ee] px-12 font-mono text-[12.5px] tracking-[0.03em] text-ink border-b-[1.5px] border-ink">
			<div className="flex items-stretch">
				{REV_CELLS.map((cell, i) => (
					<div
						key={cell.label}
						className={`flex flex-col justify-center px-4 py-2.5 ${i < REV_CELLS.length - 1 ? "border-r border-black/[0.18]" : ""}`}
					>
						<span className="mb-0.5 text-[8.5px] tracking-[0.08em] text-steel">{cell.label}</span>
						<span className="whitespace-nowrap text-[11.5px] font-semibold text-ink">{cell.value}</span>
					</div>
				))}
			</div>
			<div className="flex items-center gap-8 text-steel">
				{NAV_LINKS.map((link) => (
					<a
						key={link.href}
						href={link.href}
						className="group relative text-inherit no-underline hover:text-ink"
					>
						{link.label}
						<span className="pointer-events-none absolute inset-x-0 -bottom-1.5 h-px scale-x-0 bg-red transition-transform group-hover:scale-x-100" />
					</a>
				))}
			</div>
		</nav>
	);
}
