import { useRef } from "react";
import { useBackgroundParallax } from "../../hooks/useBackgroundParallax";
import { PaperSheetTwo, InspectionReport, PaperSheet } from "./PaperSheets";
import { BlueprintAnnotations } from "./BlueprintAnnotations";
import { Caliper } from "./Caliper";
import { Micrometer } from "./Micrometer";

export function BlueprintScene() {
	const sceneRef = useRef<HTMLDivElement>(null);
	useBackgroundParallax(sceneRef);

	return (
		<div className="bg-scene" ref={sceneRef}>
			<PaperSheetTwo />
			<InspectionReport />
			<PaperSheet>
				<BlueprintAnnotations />
			</PaperSheet>
			<Caliper />
			<Micrometer />
		</div>
	);
}
