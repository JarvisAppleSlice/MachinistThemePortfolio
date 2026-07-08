export function SectionHead({ num, title }: { num: string; title: string }) {
	return (
		<div className="mb-14 flex items-baseline gap-4 px-6 md:px-12 md:pr-[170px]">
			<span className="font-mono text-[13px] text-brass">{num}</span>
			<h2 className="font-display text-[34px] font-bold uppercase tracking-[0.01em] text-ink">{title}</h2>
			<div className="h-px flex-1 bg-blue/30" />
		</div>
	);
}
