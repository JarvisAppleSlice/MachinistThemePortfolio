import { useRef } from "react";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import {
	WHEEL_DEG_PER_PX,
	caliperRawMM,
	caliperSliderDy,
	formatCaliperReading,
	getBeamNumbers,
	getBeamTicks,
	type Unit,
} from "./instrumentGeometry";

// 16 spoke lines around the thumbwheel, ported as data so the repeated shape
// is generated rather than hand-listed 16 times.
const WHEEL_SPOKES: [number, number, number, number][] = [
	[105.5, 459, 109.5, 459],
	[104.32, 464.93, 108.02, 466.46],
	[100.96, 469.96, 103.79, 472.79],
	[95.93, 473.32, 97.46, 477.02],
	[90, 474.5, 90, 478.5],
	[84.07, 473.32, 82.54, 477.02],
	[79.04, 469.96, 76.21, 472.79],
	[75.68, 464.93, 71.98, 466.46],
	[74.5, 459, 70.5, 459],
	[75.68, 453.07, 71.98, 451.54],
	[79.04, 448.04, 76.21, 445.21],
	[84.07, 444.68, 82.54, 440.98],
	[90, 443.5, 90, 439.5],
	[95.93, 444.68, 97.46, 440.98],
	[100.96, 448.04, 103.79, 445.21],
	[104.32, 453.07, 108.02, 451.54],
];

const BEAM_TICKS = getBeamTicks();
const BEAM_NUMBERS = getBeamNumbers();

export function Caliper() {
	const sliderGroupRef = useRef<SVGGElement>(null);
	const depthRodGroupRef = useRef<SVGGElement>(null);
	const jawLabelRef = useRef<SVGTextElement>(null);
	const wheelGroupRef = useRef<SVGGElement>(null);

	// Reading state — refs, not useState. See useScrollProgress.ts for why:
	// this avoids stale closures without re-subscribing the scroll listener,
	// and avoids a React re-render on every scroll pixel.
	const pctRef = useRef(0);
	const unitRef = useRef<Unit>("mm");
	const originOffsetMMRef = useRef(0);
	const lastRawMMRef = useRef(0);
	const wheelAngleRef = useRef(0);

	function applyReading(pct: number, deltaY: number) {
		pctRef.current = pct;

		const dy = caliperSliderDy(pct);
		sliderGroupRef.current?.setAttribute("transform", `translate(0, ${dy})`);
		depthRodGroupRef.current?.setAttribute("transform", `translate(0, ${dy})`);

		lastRawMMRef.current = caliperRawMM(pct);
		const displayMM = lastRawMMRef.current - originOffsetMMRef.current;
		if (jawLabelRef.current) {
			jawLabelRef.current.textContent = formatCaliperReading(displayMM, unitRef.current);
		}

		wheelAngleRef.current -= deltaY * WHEEL_DEG_PER_PX;
		wheelGroupRef.current?.setAttribute("transform", `rotate(${wheelAngleRef.current} 90 459)`);
	}

	useScrollProgress(({ pct, deltaY }) => applyReading(pct, deltaY));

	function handleOrigin(e: React.MouseEvent) {
		e.stopPropagation();
		originOffsetMMRef.current = lastRawMMRef.current;
		applyReading(pctRef.current, 0);
	}

	function handleUnit(e: React.MouseEvent) {
		e.stopPropagation();
		unitRef.current = unitRef.current === "mm" ? "in" : "mm";
		applyReading(pctRef.current, 0);
	}

	return (
		<div className="caliper" id="caliper">
			<svg viewBox="0 0 170 1000" preserveAspectRatio="none">
				<defs>
					<linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stopColor="#9a9fa5" />
						<stop offset="45%" stopColor="#eef0f1" />
						<stop offset="100%" stopColor="#9a9fa5" />
					</linearGradient>
					<linearGradient id="jawGrad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#c7cace" />
						<stop offset="50%" stopColor="#eef0f1" />
						<stop offset="100%" stopColor="#9a9fa5" />
					</linearGradient>
					<linearGradient id="jawGradDark" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#8f949a" />
						<stop offset="50%" stopColor="#b6bac0" />
						<stop offset="100%" stopColor="#6b6f73" />
					</linearGradient>
					<linearGradient id="sliderGrad" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stopColor="#8f9398" />
						<stop offset="50%" stopColor="#d4d6d8" />
						<stop offset="100%" stopColor="#8f9398" />
					</linearGradient>
					<radialGradient id="wheelGrad" cx="35%" cy="35%" r="70%">
						<stop offset="0%" stopColor="#e6e7e8" />
						<stop offset="100%" stopColor="#8a8d91" />
					</radialGradient>
					<linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#d3d7c2" />
						<stop offset="100%" stopColor="#b9bda6" />
					</linearGradient>
				</defs>

				{/* depth rod: full length of the beam, attached to the slide, drawn
				    behind the beam so only the protruding portion shows */}
				<g ref={depthRodGroupRef} style={{ transition: "transform 0.05s linear" }}>
					<rect x="113.1" y="277" width="7.8" height="800" rx="2" fill="url(#beamGrad)" stroke="#6b6f73" strokeWidth="1" />
				</g>

				{/* main beam */}
				<rect x="98" y="40" width="38" height="800" rx="3" fill="url(#beamGrad)" stroke="#6b6f73" strokeWidth="1.2" />
				<rect x="98" y="40" width="4" height="800" fill="#0F1F35" opacity="0.55" />

				{/* printed scale numbers + engraved ticks — static, generated from instrumentGeometry so they always match the slide's actual travel */}
				<g fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="#0F1F35" opacity="0.8" textAnchor="middle">
					{BEAM_NUMBERS.map((n) => (
						<text key={n.value} x={123} y={n.y} dy="0.32em" transform={`rotate(90 123 ${n.y})`}>
							{n.value}
						</text>
					))}
				</g>
				<g stroke="#0F1F35">
					{BEAM_TICKS.map((tick) => (
						<line
							key={tick.value}
							x1={98}
							x2={tick.x2}
							y1={tick.y}
							y2={tick.y}
							strokeWidth={tick.strokeWidth}
							opacity={tick.opacity}
						/>
					))}
				</g>

				{/* fixed jaw, welded at the top — smooth fillet blends it into the beam */}
				<path d="M 98,40 L 20,54 L 20,63 L 98,63 Q 106,51 98,40 Z" fill="url(#jawGrad)" stroke="#6b6f73" strokeWidth="1.5" strokeLinejoin="round" />

				{/* slider: moves down the beam on scroll */}
				<g ref={sliderGroupRef} style={{ transition: "transform 0.05s linear" }}>
					<polygon points="98,325 20,309 20,300 98,300" fill="url(#jawGrad)" stroke="#6b6f73" strokeWidth="1.5" strokeLinejoin="round" />

					{/* internal (inside) jaw: darker upper half, travels down with the slide */}
					<polygon points="136,277 178,289 136,289" fill="url(#jawGradDark)" stroke="#6b6f73" strokeWidth="1.3" strokeLinejoin="round" />

					{/* slide body (block + DRO + buttons) */}
					<g transform="translate(-8, 15)">
						<rect x="92" y="300" width="66" height="150" rx="5" fill="url(#sliderGrad)" stroke="#6b6f73" strokeWidth="3" />
						<rect x="92" y="443" width="66" height="7" fill="#0F1F35" opacity="0.85" />

						<g transform="rotate(90 125 375)">
							<rect x="75" y="362" width="100" height="26" rx="3" fill="url(#screenGrad)" stroke="#6b6f73" strokeWidth="1.5" />
							<text
								ref={jawLabelRef}
								x="125"
								y="380"
								textAnchor="middle"
								fontFamily="'JetBrains Mono', monospace"
								fontSize="15"
								fontWeight="700"
								fill="#2a2d1f"
							>
								0.0 mm
							</text>

							<rect
								className="caliper-btn"
								onClick={handleOrigin}
								x="103"
								y="392"
								width="13"
								height="5"
								rx="1.5"
								fill="#0F1F35"
								stroke="#6b6f73"
								strokeWidth="0.6"
							/>
							<rect
								className="caliper-btn"
								onClick={handleUnit}
								x="134"
								y="392"
								width="13"
								height="5"
								rx="1.5"
								fill="#B8895A"
								stroke="#6b6f73"
								strokeWidth="0.6"
							/>
						</g>
					</g>

					<g ref={wheelGroupRef}>
						<circle cx="90" cy="459" r="19.5" fill="url(#wheelGrad)" stroke="#6b6f73" strokeWidth="1.5" />
						<g stroke="#6b6f73" strokeWidth="1.1">
							{WHEEL_SPOKES.map(([x1, y1, x2, y2], i) => (
								<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
							))}
						</g>
						<circle cx="90" cy="459" r="4.5" fill="#c7cace" stroke="#0F1F35" strokeWidth="1.6" />
					</g>
				</g>

				{/* internal (inside) jaw: fixed lower half, stays with the body —
				    drawn after the slider so it stays in front */}
				<path d="M 136,64 L 178,52 L 136,52 Q 128,58 136,64 Z" fill="url(#jawGrad)" stroke="#6b6f73" strokeWidth="1.3" strokeLinejoin="round" />
			</svg>
		</div>
	);
}
