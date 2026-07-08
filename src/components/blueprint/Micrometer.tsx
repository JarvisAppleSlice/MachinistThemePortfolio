import { useRef } from "react";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { counterMirrorTransform } from "./CounterMirror";
import {
	MAX_KNURL_SLOTS,
	MAX_THIMBLE_NUMBER_SLOTS,
	computeKnurlPositions,
	computeThimbleNumberPositions,
	formatMicReading,
	getMicSleeveMajorTicks,
	getMicSleeveMinorTicks,
	micRawIN,
	micRotationOffset,
	micShift,
	type Unit,
} from "./instrumentGeometry";

const SLEEVE_MAJOR_TICKS = getMicSleeveMajorTicks();
const SLEEVE_MINOR_TICKS = getMicSleeveMinorTicks();
// The original only prints numbers for majors 0-9 — the 10th major tick has
// no label in the source (an asymmetric loop bound in the prototype, kept
// faithfully rather than "fixed" into a false 11th label).
const SLEEVE_NUMBERED_TICKS = SLEEVE_MAJOR_TICKS.filter((t) => t.value < 10);

// Off-canvas parking spot for unused knurl/thimble-number slots — see the
// "fixed maximal node set" note in instrumentGeometry.ts.
const OFFSCREEN = -9999;

export function Micrometer() {
	const plungerGroupRef = useRef<SVGGElement>(null);
	const movingAssemblyRef = useRef<SVGGElement>(null);
	const jawLabelRef = useRef<SVGTextElement>(null);
	const knurlRefs = useRef<(SVGLineElement | null)[]>([]);
	const thimbleNumberRefs = useRef<(SVGTextElement | null)[]>([]);

	const pctRef = useRef(0);
	const unitRef = useRef<Unit>("in");
	const originOffsetINRef = useRef(0);
	const lastRawINRef = useRef(0);

	function applyReading(pct: number) {
		pctRef.current = pct;

		const shift = micShift(pct);
		movingAssemblyRef.current?.setAttribute("transform", `translate(0, ${shift})`);
		plungerGroupRef.current?.setAttribute("transform", `translate(0, ${shift})`);

		lastRawINRef.current = micRawIN(pct);
		const displayIN = lastRawINRef.current - originOffsetINRef.current;
		if (jawLabelRef.current) {
			jawLabelRef.current.textContent = formatMicReading(displayIN, unitRef.current);
		}

		const rotationOffset = micRotationOffset(shift);

		const knurlPositions = computeKnurlPositions(rotationOffset);
		knurlRefs.current.forEach((line, i) => {
			const x = knurlPositions[i];
			if (line) {
				line.setAttribute("x1", String(x ?? OFFSCREEN));
				line.setAttribute("x2", String(x ?? OFFSCREEN));
			}
		});

		const thimbleNumbers = computeThimbleNumberPositions(rotationOffset);
		thimbleNumberRefs.current.forEach((text, i) => {
			const entry = thimbleNumbers[i];
			if (!text) return;
			if (entry) {
				text.setAttribute("x", String(entry.x));
				text.setAttribute("transform", counterMirrorTransform(entry.x, `rotate(90 ${entry.x} 297)`));
				text.textContent = String(entry.value);
			} else {
				text.setAttribute("x", String(OFFSCREEN));
			}
		});
	}

	useScrollProgress(({ pct }) => applyReading(pct));

	function handleOrigin(e: React.MouseEvent) {
		e.stopPropagation();
		originOffsetINRef.current = lastRawINRef.current;
		applyReading(pctRef.current);
	}

	function handleUnit(e: React.MouseEvent) {
		e.stopPropagation();
		unitRef.current = unitRef.current === "in" ? "mm" : "in";
		applyReading(pctRef.current);
	}

	return (
		<div className="micrometer">
			<svg viewBox="0 0 220 415" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<linearGradient id="micSleeveGrad" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stopColor="#9a9fa5" />
						<stop offset="45%" stopColor="#eef0f1" />
						<stop offset="100%" stopColor="#9a9fa5" />
					</linearGradient>
					<linearGradient id="micThimbleGrad" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stopColor="#8a8d91" />
						<stop offset="20%" stopColor="#e6e7e8" />
						<stop offset="50%" stopColor="#c7cace" />
						<stop offset="80%" stopColor="#e6e7e8" />
						<stop offset="100%" stopColor="#8a8d91" />
					</linearGradient>
					<linearGradient id="micAnvilGrad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#c7cace" />
						<stop offset="50%" stopColor="#eef0f1" />
						<stop offset="100%" stopColor="#9a9fa5" />
					</linearGradient>
					<linearGradient id="micScreenGrad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#d3d7c2" />
						<stop offset="100%" stopColor="#b9bda6" />
					</linearGradient>
				</defs>

				<g transform="translate(220,0) scale(-1,1)">
					{/* ===== FIXED: never move ===== */}

					{/* C-frame */}
					<path
						d="M83,30 C150,37 165,80 165,112 C165,157 150,172 83,180"
						stroke="#111111"
						strokeWidth="26"
						strokeLinecap="round"
						fill="none"
					/>
					<path
						d="M83,30 C150,37 165,80 165,112 C165,157 150,172 83,180"
						stroke="#0F1F35"
						strokeWidth="4"
						strokeLinecap="round"
						fill="none"
					/>

					{/* anvil */}
					<rect x="69" y="34" width="28" height="16" rx="2" fill="url(#micAnvilGrad)" stroke="#6b6f73" strokeWidth="1.3" />
					<rect x="76.5" y="49" width="13" height="8" fill="url(#micAnvilGrad)" stroke="#6b6f73" strokeWidth="1.1" />

					{/* plunger/spindle: separate group so it can render behind the DRO */}
					<g ref={plungerGroupRef}>
						<rect x="78" y="57" width="10" height="158" fill="url(#micSleeveGrad)" stroke="#6b6f73" strokeWidth="1.1" />
						<rect x="81" y="57" width="3.5" height="158" fill="#0F1F35" opacity="0.4" />
					</g>

					{/* DRO */}
					<g transform="rotate(270 83 205)">
						<rect x="15" y="176" width="116" height="84" rx="9" fill="#111111" stroke="none" />
						<rect x="23" y="205" width="100" height="26" rx="3" fill="url(#micScreenGrad)" stroke="#6b6f73" strokeWidth="1.5" />
						<text
							ref={jawLabelRef}
							x="73"
							y="223"
							textAnchor="middle"
							fontFamily="'JetBrains Mono', monospace"
							fontSize="15"
							fontWeight="700"
							fill="#2a2d1f"
							transform={counterMirrorTransform(73)}
						>
							1.000 in
						</text>
						<rect
							className="caliper-btn"
							onClick={handleUnit}
							x="53"
							y="235"
							width="13"
							height="5"
							rx="1.5"
							fill="#ffffff"
							stroke="#6b6f73"
							strokeWidth="0.6"
						/>
						<rect
							className="caliper-btn"
							onClick={handleOrigin}
							x="89"
							y="235"
							width="13"
							height="5"
							rx="1.5"
							fill="#9a9fa5"
							stroke="#6b6f73"
							strokeWidth="0.6"
						/>
					</g>

					{/* sleeve (measurement cylinder) */}
					<path
						d="M 64,273L 102,273L 102,359Q 102,363 98,363L 68,363Q 64,363 64,359Z"
						fill="url(#micSleeveGrad)"
						stroke="#6b6f73"
						strokeWidth="1.4"
					/>
					<line x1="83" y1="282" x2="83" y2="352" stroke="#0F1F35" strokeWidth="1" opacity="0.6" />
					<g stroke="#0F1F35" opacity="0.8">
						{SLEEVE_MAJOR_TICKS.map((tick) => (
							<line key={tick.value} x1="83" x2="76" y1={tick.y} y2={tick.y} />
						))}
					</g>
					<g stroke="#0F1F35" opacity="0.45">
						{SLEEVE_MINOR_TICKS.map((tick, i) => (
							<line key={i} x1="83" x2="90" y1={tick.y} y2={tick.y} />
						))}
					</g>
					<g fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#0F1F35" opacity="0.85" textAnchor="end">
						{SLEEVE_NUMBERED_TICKS.map((tick) => (
							<text key={tick.value} x="72" y={tick.y + 2.5} transform={`rotate(90 72 ${tick.y + 2.5})`}>
								{tick.value}
							</text>
						))}
					</g>

					{/* ===== MOVING ASSEMBLY: thimble + ratchet ===== */}
					<g ref={movingAssemblyRef}>
						<path
							d="M64,282 L60,299 L60,362 Q60,367 65,367 L101,367 Q106,367 106,362 L106,299 L102,282 Z"
							fill="url(#micThimbleGrad)"
							stroke="#6b6f73"
							strokeWidth="1.5"
						/>
						<g stroke="#6b6f73" opacity="0.5" strokeWidth="0.9">
							{Array.from({ length: MAX_KNURL_SLOTS }, (_, i) => (
								<line
									key={i}
									ref={(el) => {
										knurlRefs.current[i] = el;
									}}
									x1={OFFSCREEN}
									x2={OFFSCREEN}
									y1="305"
									y2="358"
								/>
							))}
						</g>
						<line x1="64" y1="282" x2="102" y2="282" stroke="#0F1F35" strokeWidth="1.3" opacity="0.85" />
						<g stroke="#0F1F35" opacity="0.7" strokeWidth="0.9">
							<line x1="74" y1="282" x2="74" y2="289" />
							<line x1="83" y1="282" x2="83" y2="289" />
							<line x1="92" y1="282" x2="92" y2="289" />
						</g>
						<g fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#0F1F35" opacity="0.8" textAnchor="middle">
							{Array.from({ length: MAX_THIMBLE_NUMBER_SLOTS }, (_, i) => (
								<text
									key={i}
									ref={(el) => {
										thimbleNumberRefs.current[i] = el;
									}}
									x={OFFSCREEN}
									y="297"
								/>
							))}
						</g>

						<rect x="70" y="367" width="26" height="20" rx="4" fill="url(#micThimbleGrad)" stroke="#6b6f73" strokeWidth="1.3" />
						<g stroke="#6b6f73" opacity="0.5" strokeWidth="0.8">
							<line x1="74" y1="371" x2="74" y2="383" />
							<line x1="78" y1="371" x2="78" y2="383" />
							<line x1="88" y1="371" x2="88" y2="383" />
							<line x1="92" y1="371" x2="92" y2="383" />
						</g>
					</g>

					{/* 0-1" label, drawn last so it always sits on top */}
					<text
						x="168"
						y="105"
						textAnchor="middle"
						fontFamily="'JetBrains Mono', monospace"
						fontSize="11"
						fontWeight="700"
						fill="#ffffff"
						transform={counterMirrorTransform(168, "rotate(90 168 105)")}
					>
						0-1"
					</text>
				</g>
			</svg>
		</div>
	);
}
