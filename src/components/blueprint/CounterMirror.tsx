/**
 * The micrometer's outer <g> is mirrored horizontally (`scale(-1, 1)`) so the
 * C-frame/anvil/spindle lay out left-to-right correctly. Any TEXT nested
 * inside that group renders backwards and mirrored in position unless it
 * undoes the mirror itself.
 *
 * The fix: `translate(2*cx, 0) scale(-1, 1)`, where `cx` is the text
 * element's own x-coordinate, mirrors the text around its own position —
 * it ends up exactly where it started, just unflipped. This is applied
 * directly as the `transform` on each affected <text>, composed with any
 * extra transform (e.g. a rotate) the text itself needs.
 *
 * (Plain shapes like the DRO buttons don't need this — a symmetric rounded
 * rect looks the same mirrored or not, so only readable glyphs require it.)
 */
export function counterMirrorTransform(cx: number, extra?: string): string {
	const base = `translate(${2 * cx}, 0) scale(-1, 1)`;
	return extra ? `${base} ${extra}` : base;
}
