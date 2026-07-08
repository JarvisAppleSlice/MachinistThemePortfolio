// The drawing-border zone reference grid (1-8 across top/bottom, A-F down the
// sides) that real engineering prints use to locate a detail by grid square,
// e.g. "see zone 4-C". Reused on both paper sheets in the background scene.
const COLUMN_LABELS = ["1", "2", "3", "4", "5", "6", "7", "8"];
const COLUMN_POSITIONS_PCT = [6.25, 18.75, 31.25, 43.75, 56.25, 68.75, 81.25, 93.75];
const COLUMN_TICK_POSITIONS_PCT = [12.5, 25, 37.5, 50, 62.5, 75, 87.5];

const ROW_LABELS = ["A", "B", "C", "D", "E", "F"];
const ROW_POSITIONS_PCT = [8.3, 25, 41.6, 58.3, 75, 91.6];
const ROW_TICK_POSITIONS_PCT = [16.67, 33.33, 50, 66.67, 83.33];

export function ZoneFrame({ withTicks = false }: { withTicks?: boolean }) {
	return (
		<div className="zone-frame">
			{COLUMN_LABELS.map((label, i) => (
				<span key={`top-${label}`} className="zone-label top" style={{ left: `${COLUMN_POSITIONS_PCT[i]}%` }}>
					{label}
				</span>
			))}
			{COLUMN_LABELS.map((label, i) => (
				<span key={`bottom-${label}`} className="zone-label bottom" style={{ left: `${COLUMN_POSITIONS_PCT[i]}%` }}>
					{label}
				</span>
			))}
			{ROW_LABELS.map((label, i) => (
				<span key={`left-${label}`} className="zone-label left" style={{ top: `${ROW_POSITIONS_PCT[i]}%` }}>
					{label}
				</span>
			))}
			{ROW_LABELS.map((label, i) => (
				<span key={`right-${label}`} className="zone-label right" style={{ top: `${ROW_POSITIONS_PCT[i]}%` }}>
					{label}
				</span>
			))}

			{withTicks && (
				<>
					{COLUMN_TICK_POSITIONS_PCT.map((pct) => (
						<span key={`tick-top-${pct}`} className="zone-tick top" style={{ left: `${pct}%` }} />
					))}
					{COLUMN_TICK_POSITIONS_PCT.map((pct) => (
						<span key={`tick-bottom-${pct}`} className="zone-tick bottom" style={{ left: `${pct}%` }} />
					))}
					{ROW_TICK_POSITIONS_PCT.map((pct) => (
						<span key={`tick-left-${pct}`} className="zone-tick left" style={{ top: `${pct}%` }} />
					))}
					{ROW_TICK_POSITIONS_PCT.map((pct) => (
						<span key={`tick-right-${pct}`} className="zone-tick right" style={{ top: `${pct}%` }} />
					))}
				</>
			)}
		</div>
	);
}
