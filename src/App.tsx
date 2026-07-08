import { BlueprintScene } from "./components/blueprint/BlueprintScene";
import { PrintTitleblock } from "./components/blueprint/PrintTitleblock";
import { Nav } from "./components/layout/Nav";
import { Hero } from "./components/layout/Hero";
import { WorkSection } from "./components/layout/WorkSection";
import { AboutSection } from "./components/layout/AboutSection";
import { ContactSection } from "./components/layout/ContactSection";
import { Footer } from "./components/layout/Footer";

export default function App() {
	return (
		<>
			<BlueprintScene />
			<Nav />
			<Hero />
			<WorkSection />
			<AboutSection />
			<ContactSection />
			<PrintTitleblock />
			<Footer />
		</>
	);
}
