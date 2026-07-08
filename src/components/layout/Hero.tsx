import { bio } from "../../content/bio";

export function Hero() {
	return (
		<section className="mx-auto flex min-h-screen max-w-[1100px] flex-col justify-center px-6 py-24 md:px-12 md:pr-[170px]">
			<div className="panel max-w-[900px] border border-ink bg-[rgba(245,243,238,0.88)] px-8 py-10 md:px-13 md:py-12">
				<div className="mb-7 flex items-center gap-3.5 font-mono text-[12.5px] tracking-[0.08em] text-blue before:h-px before:w-[34px] before:bg-blue">
					{bio.eyebrow}
				</div>

				<h1
					className="font-display text-[2.8rem] font-extrabold uppercase leading-[0.95] tracking-[0.005em] text-ink [text-shadow:0_1px_0_rgba(255,255,255,0.4),0_2px_3px_rgba(26,29,33,0.15)] sm:text-[4.5rem] lg:text-[6.4rem]"
				>
					{bio.headlineLead} <span className="text-blue">{bio.headlineEmphasis}</span>
				</h1>

				<p className="mt-7 max-w-[560px] text-[17px] leading-relaxed text-steel">{bio.heroSub}</p>

				<div className="mt-11 flex items-center gap-2.5 font-mono text-xs text-steel">
					<span>{bio.dimLine.origin}</span>
					<div className="relative h-px w-[220px] flex-none bg-steel before:absolute before:-top-1 before:left-0 before:h-[9px] before:w-px before:bg-steel after:absolute after:-top-1 after:right-0 after:h-[9px] after:w-px after:bg-steel" />
					<span>{bio.dimLine.now}</span>
				</div>
			</div>
		</section>
	);
}
