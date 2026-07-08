import type { ReactNode } from "react";
import { ZoneFrame } from "./ZoneFrame";

const INSPECTION_ROWS = [
	{ dimension: "WIDTH", nominal: "3.500", actual: "3.498" },
	{ dimension: "HEIGHT", nominal: "2.375", actual: "2.377" },
	{ dimension: "HOLE SPACING", nominal: "2.750", actual: "2.752" },
	{ dimension: "⌀ C'BORE", nominal: "0.750", actual: "0.748" },
	{ dimension: "⌀ THRU", nominal: "0.375", actual: "0.376" },
	{ dimension: "FLATNESS", nominal: "0.050 MAX", actual: "0.032" },
];

export function PaperSheetTwo() {
	return (
		<div className="paper-sheet-2">
			<ZoneFrame />
		</div>
	);
}

export function InspectionReport() {
	return (
		<div className="inspection-report">
			<h4>INSPECTION REPORT — PART 004-A</h4>
			<div className="ir-header">
				<span>DIMENSION</span>
				<span>NOMINAL</span>
				<span>ACTUAL</span>
			</div>
			{INSPECTION_ROWS.map((row) => (
				<div className="ir-row" key={row.dimension}>
					<span>{row.dimension}</span>
					<span>{row.nominal}</span>
					<span>{row.actual}</span>
				</div>
			))}
			<div className="ir-pass">
				PASS<span className="check">✓</span>
			</div>
		</div>
	);
}

export function PaperSheet({ children }: { children: ReactNode }) {
	return (
		<div className="paper-sheet">
			<ZoneFrame withTicks />
			{children}
		</div>
	);
}
