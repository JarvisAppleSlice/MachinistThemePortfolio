import { describe, expect, it } from "vitest";
import {
	FIXED_JAW_Y,
	MAX_KNURL_SLOTS,
	MAX_READING_MM,
	MAX_THIMBLE_NUMBER_SLOTS,
	MIC_KNURL_MAX,
	MIC_KNURL_MIN,
	MIC_MAX_SHIFT,
	SLIDER_DY_MAX,
	SLIDER_DY_MIN,
	caliperRawMM,
	caliperSliderDy,
	computeKnurlPositions,
	computeThimbleNumberPositions,
	formatCaliperReading,
	formatMicReading,
	getBeamNumbers,
	getBeamTicks,
	getMicSleeveMajorTicks,
	getMicSleeveMinorTicks,
	micRawIN,
	micRotationOffset,
	micShift,
	mmToY,
} from "./instrumentGeometry";

describe("caliper geometry", () => {
	it("mmToY maps 0mm to the fixed jaw y and 150mm to the far end of travel", () => {
		expect(mmToY(0)).toBe(FIXED_JAW_Y);
		expect(mmToY(MAX_READING_MM)).toBeCloseTo(FIXED_JAW_Y + (SLIDER_DY_MAX - SLIDER_DY_MIN));
	});

	it("caliperSliderDy spans exactly SLIDER_DY_MIN..SLIDER_DY_MAX over pct 0..1", () => {
		expect(caliperSliderDy(0)).toBe(SLIDER_DY_MIN);
		expect(caliperSliderDy(1)).toBe(SLIDER_DY_MAX);
	});

	it("caliperRawMM is 0 at pct=0 and MAX_READING_MM at pct=1", () => {
		expect(caliperRawMM(0)).toBe(0);
		expect(caliperRawMM(1)).toBe(MAX_READING_MM);
	});

	it("formatCaliperReading renders mm and converts to inches", () => {
		expect(formatCaliperReading(50, "mm")).toBe("50.00 mm");
		expect(formatCaliperReading(25.4, "in")).toBe("1.000 in");
	});

	it("getBeamTicks covers 0-150mm inclusive with an emphasized zero mark", () => {
		const ticks = getBeamTicks();
		expect(ticks).toHaveLength(151);
		expect(ticks[0]).toMatchObject({ value: 0, x2: 116 });
	});

	it("getBeamNumbers produces one label every 10mm from 0 to 150", () => {
		const numbers = getBeamNumbers();
		expect(numbers.map((n) => n.value)).toEqual([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150]);
	});
});

describe("micrometer geometry", () => {
	it("micShift starts fully open at pct=0 and fully closed at pct=1", () => {
		expect(micShift(0)).toBe(MIC_MAX_SHIFT);
		expect(micShift(1)).toBe(0);
	});

	it("micRawIN reads 1in at pct=0 and 0in at pct=1 (opposite direction from the caliper)", () => {
		expect(micRawIN(0)).toBe(1);
		expect(micRawIN(1)).toBe(0);
	});

	it("formatMicReading renders inches and converts to mm", () => {
		expect(formatMicReading(1, "in")).toBe("1.000 in");
		expect(formatMicReading(1, "mm")).toBe("25.40 mm");
	});

	it("micRotationOffset is 0 when fully closed (shift=MIC_MAX_SHIFT)", () => {
		expect(micRotationOffset(MIC_MAX_SHIFT)).toBe(0);
	});

	it("getMicSleeveMajorTicks has 11 entries (0-10) and getMicSleeveMinorTicks has 40 (4 per gap)", () => {
		expect(getMicSleeveMajorTicks()).toHaveLength(11);
		expect(getMicSleeveMinorTicks()).toHaveLength(40);
	});

	it("computeKnurlPositions stays within the knurled band and within the max slot budget", () => {
		for (const offset of [0, 3, 6, 47, 114, -20]) {
			const positions = computeKnurlPositions(offset);
			expect(positions.length).toBeLessThanOrEqual(MAX_KNURL_SLOTS);
			for (const x of positions) {
				expect(x).toBeGreaterThanOrEqual(MIC_KNURL_MIN - 1);
				expect(x).toBeLessThanOrEqual(MIC_KNURL_MAX + 1);
			}
		}
	});

	it("computeThimbleNumberPositions stays within [66,104] and within the max slot budget, cycling through 0/5/10/.../25", () => {
		for (const offset of [0, 19, 57, 114, 250, -30]) {
			const positions = computeThimbleNumberPositions(offset);
			expect(positions.length).toBeLessThanOrEqual(MAX_THIMBLE_NUMBER_SLOTS);
			for (const { x, value } of positions) {
				expect(x).toBeGreaterThanOrEqual(66);
				expect(x).toBeLessThanOrEqual(104);
				expect([0, 5, 10, 15, 20, 25]).toContain(value);
			}
		}
	});
});
