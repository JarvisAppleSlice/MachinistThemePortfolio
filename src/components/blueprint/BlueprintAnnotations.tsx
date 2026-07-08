// Pure decoration: a 5-view orthographic solid-model drawing (front/side/top/
// bottom/section, with counterbores, fillets, a cutting plane, dimensions, and
// a print title block). Ported pixel-faithfully from portfolio-prototype.html —
// never read by scroll/animation logic, so this is the most "boring" file in
// the blueprint feature on purpose.

// Section hatch lines: 17 parallel lines stepping 10px apart, clipped to the
// section-view rect. Generated rather than hand-listed since it's a purely
// mechanical repeating pattern in the original.
const SECTION_HATCH_LINES = Array.from({ length: 17 }, (_, i) => {
	const x1 = 600 + i * 10;
	return { x1, x2: x1 + 90, y1: 500, y2: 590 };
});

export function BlueprintAnnotations() {
	return (
		<div className="blueprint-annotations">
			<svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
				<g fontFamily="'JetBrains Mono', monospace" transform="translate(720,450) scale(1.4) translate(-720,-450)">
					<defs>
						<clipPath id="sectionClip">
							<rect x="640" y="545" width="160" height="90" />
						</clipPath>
					</defs>

					<g stroke="#0F1F35" strokeWidth="1.2" opacity="0.46" fill="none">
						{/* FRONT */}
						<rect x="560" y="265" width="160" height="110" />
						<circle cx="613" cy="320" r="10" />
						<circle cx="667" cy="320" r="10" />
						<circle cx="613" cy="320" r="16" strokeDasharray="4,2" opacity="0.76" />
						<circle cx="667" cy="320" r="16" strokeDasharray="4,2" opacity="0.76" />
						<circle cx="572" cy="277" r="5" />
						<circle cx="708" cy="277" r="5" />
						<circle cx="572" cy="363" r="5" />
						<circle cx="708" cy="363" r="5" />
						<rect x="578" y="279" width="124" height="72" strokeDasharray="5,3" opacity="0.68" />
						<path d="M560,277 A12,12 0 0 1 572,265" />
						<path d="M708,265 A12,12 0 0 1 720,277" />
						<path d="M720,363 A12,12 0 0 1 708,375" />
						<path d="M572,375 A12,12 0 0 1 560,363" />
						<line x1="640" y1="258" x2="640" y2="382" strokeDasharray="7,3,2,3" opacity="0.6" />
						<line x1="553" y1="320" x2="727" y2="320" strokeDasharray="7,3,2,3" opacity="0.6" />

						{/* SIDE */}
						<rect x="760" y="265" width="120" height="110" />
						<circle cx="820" cy="320" r="10" />
						<circle cx="820" cy="320" r="16" strokeDasharray="4,2" opacity="0.76" />
						<rect x="772" y="279" width="96" height="72" strokeDasharray="5,3" opacity="0.68" />
						<line x1="820" y1="258" x2="820" y2="382" strokeDasharray="7,3,2,3" opacity="0.6" />
						<line x1="753" y1="320" x2="887" y2="320" strokeDasharray="7,3,2,3" opacity="0.6" />

						{/* TOP */}
						<rect x="560" y="415" width="160" height="90" />
						<circle cx="572" cy="427" r="5" />
						<circle cx="708" cy="427" r="5" />
						<circle cx="572" cy="493" r="5" />
						<circle cx="708" cy="493" r="5" />
						<line x1="553" y1="460" x2="727" y2="460" strokeDasharray="7,3,2,3" opacity="0.6" />

						{/* cutting plane A-A, shown on TOP view */}
						<line x1="540" y1="460" x2="740" y2="460" strokeDasharray="16,3,3,3" strokeWidth="1.4" opacity="0.8" />
						<line x1="540" y1="460" x2="540" y2="474" />
						<polyline points="534,468 540,476 546,468" />
						<line x1="740" y1="460" x2="740" y2="474" />
						<polyline points="734,468 740,476 746,468" />

						{/* BOTTOM */}
						<rect x="760" y="415" width="120" height="90" />
						<circle cx="772" cy="427" r="5" strokeDasharray="3,2" />
						<circle cx="868" cy="427" r="5" strokeDasharray="3,2" />
						<circle cx="772" cy="493" r="5" strokeDasharray="3,2" />
						<circle cx="868" cy="493" r="5" strokeDasharray="3,2" />
						<line x1="753" y1="460" x2="887" y2="460" strokeDasharray="7,3,2,3" opacity="0.6" />

						{/* SECTION A-A */}
						<rect x="640" y="545" width="160" height="90" />
					</g>

					<g fill="#0F1F35" opacity="0.56" fontSize="10" textAnchor="middle">
						<text x="540" y="490">A</text>
						<text x="740" y="490">A</text>
					</g>

					{/* section hatch, clipped to the section rect */}
					<g clipPath="url(#sectionClip)" stroke="#0F1F35" strokeWidth="0.8" opacity="0.47">
						{SECTION_HATCH_LINES.map((line) => (
							<line key={line.x1} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
						))}
					</g>
					{/* counterbore + through-hole profile, masks the hatch beneath it */}
					<path
						d="M700,545 L700,565 L710,565 L710,635 L730,635 L730,565 L740,565 L740,545 Z"
						fill="#F5F3EE"
						fillOpacity="0.92"
						stroke="#0F1F35"
						strokeWidth="1.1"
						opacity="0.52"
					/>

					{/* fillet leader */}
					<g stroke="#0F1F35" strokeWidth="1" opacity="0.52" fill="none">
						<line x1="760" y1="228" x2="716" y2="266" />
						<circle cx="716" cy="266" r="1.6" fill="#0F1F35" />
					</g>

					{/* dimensions */}
					<g stroke="#0F1F35" strokeWidth="1" opacity="0.54" fill="none">
						<line x1="560" y1="375" x2="560" y2="391" />
						<line x1="720" y1="375" x2="720" y2="391" />
						<line x1="560" y1="388" x2="720" y2="388" />
						<polyline points="572,384 560,388 572,392" />
						<polyline points="708,384 720,388 708,392" />

						<line x1="880" y1="265" x2="900" y2="265" />
						<line x1="880" y1="375" x2="900" y2="375" />
						<line x1="897" y1="265" x2="897" y2="375" />
						<polyline points="893,277 897,265 901,277" />
						<polyline points="893,363 897,375 901,363" />

						<line x1="572" y1="505" x2="572" y2="520" />
						<line x1="708" y1="505" x2="708" y2="520" />
						<line x1="572" y1="517" x2="708" y2="517" />
						<polyline points="584,513 572,517 584,521" />
						<polyline points="696,513 708,517 696,521" />
					</g>

					<g fill="#0F1F35" opacity="0.56" fontSize="11" textAnchor="middle">
						<text x="640" y="403">3.500</text>
						<text x="923" y="320" transform="rotate(90 923 320)">2.375</text>
						<text x="640" y="533">2.750</text>
						<text x="720" y="650">SECTION A-A</text>
					</g>
					<g fill="#0F1F35" opacity="0.54" fontSize="8.5">
						<text x="762" y="218">R.125 TYP 4 PLCS</text>
						<text x="565" y="222">⌀.750 C'BORE X .25 DEEP</text>
						<text x="565" y="235">⌀.375 THRU (2 PLCS)</text>
						<text x="808" y="575">C'BORE</text>
					</g>
				</g>

				{/* print title block: tolerance / material / finish / customer / description */}
				<g stroke="#0F1F35" strokeWidth="1.1" opacity="0.5" fill="none">
					<rect x="1050" y="765" width="350" height="90" />
					<line x1="1164" y1="765" x2="1164" y2="855" />
					<line x1="1220" y1="765" x2="1220" y2="855" />
					<line x1="1294" y1="765" x2="1294" y2="855" />
					<line x1="1347" y1="765" x2="1347" y2="855" />
				</g>
				<g fontFamily="'JetBrains Mono', monospace" fill="#0F1F35" opacity="0.56">
					<text x="1056" y="778" fontSize="7">TOLERANCE UNLESS SPECIFIED</text>
					<text x="1056" y="791" fontSize="7.5">FRACTIONAL ± 1/64</text>
					<text x="1056" y="803" fontSize="7.5">ANGULAR: MACH ±0.5° BEND ±1°</text>
					<text x="1056" y="815" fontSize="7.5">2 PL DEC ±0.01 3 PL DEC ±0.005</text>

					<text x="1170" y="778" fontSize="7">MATERIAL</text>
					<text x="1170" y="793" fontSize="8.5">17-4 PH SS</text>
					<text x="1170" y="806" fontSize="8.5">H-900</text>

					<text x="1226" y="778" fontSize="7">FINISH / PASSIVATION</text>
					<text x="1226" y="793" fontSize="8.5">GLASS BEAD</text>
					<text x="1226" y="806" fontSize="8.5">ASTM A-967</text>

					<text x="1300" y="778" fontSize="7">CUSTOMER</text>
					<text x="1300" y="793" fontSize="8.5">S. JARVIS</text>

					<text x="1353" y="778" fontSize="7">DESCRIPTION</text>
					<text x="1353" y="793" fontSize="8.5">PORTFOLIO</text>
				</g>
			</svg>
		</div>
	);
}
