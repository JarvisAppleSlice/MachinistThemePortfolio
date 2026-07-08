import { useEffect, type RefObject } from "react";

const BG_SHIFT_FACTOR = -0.06;
const BG_BASE_SHIFT = 90; // shifts the whole paper stack to the right at rest

/**
 * Shifts the background scene horizontally as the page scrolls (a subtle
 * side-pan), but holds it dead-centered while in the Fullscreen API mode.
 * Ported from the prototype's updateBgScene(). Like useScrollProgress, this
 * mutates the DOM directly via a ref rather than through React state — a
 * translate on every scroll pixel isn't something that should trigger
 * reconciliation.
 */
export function useBackgroundParallax(sceneRef: RefObject<HTMLElement | null>) {
	useEffect(() => {
		function update() {
			const el = sceneRef.current;
			if (!el) return;
			const isFullscreen = !!document.fullscreenElement;
			const shiftPx = BG_BASE_SHIFT + (isFullscreen ? 0 : window.scrollY * BG_SHIFT_FACTOR);
			el.style.transform = `translate(calc(-50% + ${shiftPx}px), -50%)`;
		}

		update();
		window.addEventListener("scroll", update, { passive: true });
		document.addEventListener("fullscreenchange", update);
		return () => {
			window.removeEventListener("scroll", update);
			document.removeEventListener("fullscreenchange", update);
		};
	}, [sceneRef]);
}
