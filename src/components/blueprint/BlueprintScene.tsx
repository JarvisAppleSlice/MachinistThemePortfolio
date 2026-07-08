import { PaperSheetTwo, InspectionReport, PaperSheet } from "./PaperSheets";
import { BlueprintAnnotations } from "./BlueprintAnnotations";
import { Caliper } from "./Caliper";
import { Micrometer } from "./Micrometer";

export function BlueprintScene() {
	return (
		<div className="bg-scene">
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
