import Footer2 from "@/components/layout/footer/Footer2";
import Header from "@/components/layout/header/Header";
import EnfyconLife from "@/components/sections/culture/EnfyconLife";
import CultureTestimonials from "@/components/sections/culture/CultureTestimonials";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { constructMetadata } from "@/libs/seo";
import FullScreenHero from "@/components/sections/hero/FullScreenHero";
import SplitImageQuote from "@/components/shared/sections/SplitImageQuote";

export const metadata = constructMetadata({
	title: "Our Culture - enfycon",
	description: "Discover the culture that drives innovation at enfycon.",
});

export default function OurCulture() {
	return (
		<div>
			<BackToTop />
			<Header />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<FullScreenHero title={"Our Culture"} text={"Our Culture"} breadcrums={[{ name: "Our Culture", path: "/our-culture" }]} image={"/images/culture/enfycon.jpg"} />
						{/* Employee Testimonials */}
						<CultureTestimonials />
						<SplitImageQuote data={{ image: "/images/culture/steptodown.com882339.jpg", title: "More than just work, we build meaningful connections", icon: "fa-light fa-users" }} />

						{/* Enfycon Life Section */}
						<EnfyconLife />



					</main>
					<Footer2 />
				</div>
			</div>

			<ClientWrapper />
		</div>
	);
}
