// Pure geometry/math for the caliper and micrometer, ported from
// portfolio-prototype.html. No React/DOM imports — unit-testable in isolation,
// same as services/contactService.ts.

export type Unit = "mm" | "in";

// ===== CALIPER =====
export const SLIDER_DY_MIN = -237; // pct=0: jaw sits flush at the fixed jaw
export const SLIDER_DY_MAX = 370; // pct=1: slide stops short of the beam's end
export const MAX_READING_MM = 150; // full-scale DRO reading at pct=1
export const WHEEL_DEG_PER_PX = 1.1; // thumbwheel spin rate relative to scroll delta
export const FIXED_JAW_Y = 81; // abs y of the visible jaw contact line (0mm)

const CALIPER_TRAVEL_RANGE = SLIDER_DY_MAX - SLIDER_DY_MIN;

/** y-position along the beam for a given mm value on the printed scale (0-150mm). */
export function mmToY(mm: number): number {
	return FIXED_JAW_Y + (mm / MAX_READING_MM) * CALIPER_TRAVEL_RANGE;
}

/** Vertical offset (SVG translate y) of the caliper's sliding jaw group for a given scroll pct. */
export function caliperSliderDy(pct: number): number {
	return SLIDER_DY_MIN + pct * CALIPER_TRAVEL_RANGE;
}

/** Raw DRO reading in mm (before origin offset) for a given scroll pct. */
export function caliperRawMM(pct: number): number {
	return pct * MAX_READING_MM;
}

export function formatCaliperReading(displayMM: number, unit: Unit): string {
	return unit === "mm" ? `${displayMM.toFixed(2)} mm` : `${(displayMM / 25.4).toFixed(3)} in`;
}

export interface BeamTick {
	value: number;
	y: number;
	x2: number;
	strokeWidth: number;
	opacity: number;
}

/** Engraved scale ticks along the beam, 0-150mm. One tick per mm, with the zero mark, 10s, and 5s emphasized. */
export function getBeamTicks(): BeamTick[] {
	const ticks: BeamTick[] = [];
	for (let mm = 0; mm <= MAX_READING_MM; mm += 1) {
		const y = mmToY(mm);
		if (mm === 0) {
			ticks.push({ value: mm, y, x2: 116, strokeWidth: 1.8, opacity: 0.9 });
		} else if (mm % 10 === 0) {
			ticks.push({ value: mm, y, x2: 114, strokeWidth: 1.4, opacity: 0.75 });
		} else if (mm % 5 === 0) {
			ticks.push({ value: mm, y, x2: 109, strokeWidth: 0.8, opacity: 0.45 });
		} else {
			ticks.push({ value: mm, y, x2: 104, strokeWidth: 0.5, opacity: 0.3 });
		}
	}
	return ticks;
}

export interface BeamNumber {
	value: number;
	y: number;
}

/** Printed numbers along the beam, every 10mm — computed from the same travel constants as the slide itself. */
export function getBeamNumbers(): BeamNumber[] {
	const numbers: BeamNumber[] = [];
	for (let mm = 0; mm <= MAX_READING_MM; mm += 10) {
		numbers.push({ value: mm, y: mmToY(mm) });
	}
	return numbers;
}

// ===== MICROMETER =====
export const MIC_ZERO_Y = 282;
export const MIC_TICK_SPACING = 7;
export const MIC_MAX_SHIFT = MIC_TICK_SPACING * 10; // 70
export const MIC_KNURL_MIN = 66;
export const MIC_KNURL_MAX = 104;
export const MIC_KNURL_SPACING = 6;
export const MIC_NUMBER_VALUES = [0, 5, 10, 15, 20, 25];
export const MIC_NUMBER_SPACING = 19;
export const MIC_NUMBER_CYCLE = MIC_NUMBER_VALUES.length * MIC_NUMBER_SPACING; // 114

/** Vertical shift (SVG translate y) of the thimble/plunger for a given scroll pct — starts OPEN at pct=0, closes at pct=1 (opposite direction from the caliper). */
export function micShift(pct: number): number {
	return MIC_MAX_SHIFT * (1 - pct);
}

/** Raw DRO reading in inches (before origin offset) for a given scroll pct. */
export function micRawIN(pct: number): number {
	return 1 - pct;
}

export function formatMicReading(displayIN: number, unit: Unit): string {
	return unit === "in" ? `${displayIN.toFixed(3)} in` : `${(displayIN * 25.4).toFixed(2)} mm`;
}

/** Knurl/thimble-number rotation offset for a given thimble shift — 4x a naive "one turn per tick" rate. */
export function micRotationOffset(shift: number): number {
	const turns = (MIC_MAX_SHIFT - shift) / (MIC_TICK_SPACING / 4);
	return turns * MIC_NUMBER_CYCLE;
}

export interface MicSleeveMajorTick {
	value: number;
	y: number;
}

/** Static major ticks + numbers on the sleeve, 0-10. */
export function getMicSleeveMajorTicks(): MicSleeveMajorTick[] {
	return Array.from({ length: 11 }, (_, i) => ({ value: i, y: MIC_ZERO_Y + i * MIC_TICK_SPACING }));
}

export interface MicSleeveMinorTick {
	y: number;
}

/** Static minor ticks on the sleeve — 4 between each pair of adjacent majors (0-10). */
export function getMicSleeveMinorTicks(): MicSleeveMinorTick[] {
	const ticks: MicSleeveMinorTick[] = [];
	for (let gap = 0; gap < 10; gap++) {
		const majorY = MIC_ZERO_Y + gap * MIC_TICK_SPACING;
		for (let k = 1; k <= 4; k++) {
			ticks.push({ y: majorY + k * (MIC_TICK_SPACING / 5) });
		}
	}
	return ticks;
}

// Knurl lines and thimble numbers are regenerated every scroll frame (they
// "spin" with the thimble). Rather than clearing/rebuilding DOM nodes each
// frame, the component renders a fixed maximal set of nodes once and mutates
// their positions — these functions compute the (variable-length, always
// <= the max) set of visible positions for a given rotation offset.

export const MAX_KNURL_SLOTS = 9;
export const MAX_THIMBLE_NUMBER_SLOTS = 4;

/** x-positions of visible knurl lines for a given rotation offset, wrapped to stay within the knurled band. */
export function computeKnurlPositions(offset: number): number[] {
	const wrapped = ((offset % MIC_KNURL_SPACING) + MIC_KNURL_SPACING) % MIC_KNURL_SPACING;
	const positions: number[] = [];
	for (let x = MIC_KNURL_MIN - MIC_KNURL_SPACING + wrapped; x <= MIC_KNURL_MAX + MIC_KNURL_SPACING; x += MIC_KNURL_SPACING) {
		if (x < MIC_KNURL_MIN - 1 || x > MIC_KNURL_MAX + 1) continue;
		positions.push(x);
	}
	return positions;
}

export interface ThimbleNumberPosition {
	x: number;
	value: number;
}

/** Visible thimble numbers (0/5/10/.../25) and their x-positions for a given rotation offset. */
export function computeThimbleNumberPositions(offset: number): ThimbleNumberPosition[] {
	const wrapped = ((offset % MIC_NUMBER_CYCLE) + MIC_NUMBER_CYCLE) % MIC_NUMBER_CYCLE;
	const result: ThimbleNumberPosition[] = [];
	for (let slotX = 83 - MIC_NUMBER_CYCLE; slotX <= 104 + MIC_NUMBER_SPACING; slotX += MIC_NUMBER_SPACING) {
		const x = slotX + wrapped;
		if (x < 66 || x > 104) continue;
		const rawIndex = Math.round((slotX - 83) / MIC_NUMBER_SPACING);
		const valueIndex = ((rawIndex % MIC_NUMBER_VALUES.length) + MIC_NUMBER_VALUES.length) % MIC_NUMBER_VALUES.length;
		result.push({ x, value: MIC_NUMBER_VALUES[valueIndex] });
	}
	return result;
}
