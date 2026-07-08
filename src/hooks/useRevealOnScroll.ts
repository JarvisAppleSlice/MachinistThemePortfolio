import { useEffect, useRef, useState } from "react";

/**
 * Fades/translates an element into place the first time it scrolls into
 * view. Unlike useScrollProgress, this fires rarely (once per element) so a
 * plain useState is fine here — no stale-closure/re-render-per-pixel concern.
 */
export function useRevealOnScroll<T extends HTMLElement = HTMLDivElement>() {
	const ref = useRef<T>(null);
	const [isInView, setIsInView] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true);
					observer.unobserve(el);
				}
			},
			{ threshold: 0.15 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return { ref, isInView };
}
