import { useEffect, useRef } from "react";

export interface ScrollProgress {
	/** 0-1 scroll progress through the whole document */
	pct: number;
	/** change in scrollY since the previous event, in px (signed) */
	deltaY: number;
}

/**
 * Low-level scroll/resize subscription. `pct` is a pure function of
 * window.scrollY/scrollHeight/innerHeight read at the moment of the event, so
 * multiple independent callers of this hook (e.g. Caliper and Micrometer)
 * always compute bit-identical values for the same scroll event — there's no
 * shared mutable state for them to drift out of sync on.
 *
 * The callback is expected to only mutate refs/DOM directly, never call
 * setState — see Caliper.tsx/Micrometer.tsx for the pattern. Keeping the
 * callback in a ref (rather than as a useEffect dependency) means it's always
 * fresh without needing to re-subscribe the listener on every render.
 */
export function useScrollProgress(onProgress: (progress: ScrollProgress) => void) {
	const onProgressRef = useRef(onProgress);
	onProgressRef.current = onProgress;

	useEffect(() => {
		let lastScrollY = window.scrollY;

		function handle() {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			const pct = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
			const deltaY = scrollTop - lastScrollY;
			lastScrollY = scrollTop;
			onProgressRef.current({ pct, deltaY });
		}

		handle(); // establish initial state on mount
		window.addEventListener("scroll", handle, { passive: true });
		window.addEventListener("resize", handle);
		return () => {
			window.removeEventListener("scroll", handle);
			window.removeEventListener("resize", handle);
		};
	}, []);
}
