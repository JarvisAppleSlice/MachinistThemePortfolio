import { BlueprintScene } from "./components/blueprint/BlueprintScene";
import { PrintTitleblock } from "./components/blueprint/PrintTitleblock";

export default function App() {
	return (
		<>
			<BlueprintScene />
			<div style={{ height: "200vh" }} />
			<PrintTitleblock />
		</>
	);
}
