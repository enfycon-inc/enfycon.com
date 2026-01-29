import Footer2 from "@/components/layout/footer/Footer2";
import Header from "@/components/layout/header/Header";
import EnfyconLife from "@/components/sections/culture/EnfyconLife";
import ImpactSection from "@/components/sections/culture/ImpactSection";
import CoreValues from "@/components/sections/culture/CoreValues";
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
						<FullScreenHero
							title={"A Culture of Innovation & Excellence"}
							text={"At enfycon, we thrive on collaboration, diversity, and a shared passion for technology. We foster an environment where every idea matters, creativity knows no bounds, and our people are empowered to shape the future."}
							breadcrums={[{ name: "Our Culture", path: "/our-culture" }]}
							image={"/images/culture/culture-banner.jpg"}
						/>
						{/* Core Values Section */}
						{/* <CoreValues /> */}
						<ImpactSection
							imageSrc="/images/csr/food-distribution-banner.jpg"
							title="Driving Purposeful Impact"
							texts={[
								"At Enfycon, culture is something we build every day—not a policy, not a poster. It’s shaped by the people we work with, the way we collaborate, and the respect we show each other.",
								"We believe great work happens in an environment where people feel trusted, heard, and supported. Ideas are welcomed openly, learning is continuous, and teamwork comes naturally. We move fast, adapt quickly, and grow together—while keeping things honest, inclusive, and human.",
								"As we grow, we aim to create positive impact not just through our work, but through the way we treat people and contribute back to the communities around us."
							]}
							type="right-img"
							buttonText="Our CSR Initiatives"
							buttonLink="/csr"
							backgroundColor="linear-gradient(to right, #0c8b21ff, #797497ff)"
						/>

						<SplitImageQuote data={{ image: "/images/culture/group.jpeg", title: "More than just work, we build meaningful connections", icon: "fa-light fa-users" }} />
						{/* Enfycon Life Section */}
						<EnfyconLife />
						<ImpactSection
							imageSrc="/images/csr/food-distribution-banner.jpg"
							title="Driving Purposeful Impact"
							texts={[
								"At enfycon, we believe technology should serve a greater purpose. As a global leader in AI-driven digital transformation, we are committed to using our innovation to drive positive change. Our culture is built on integrity and responsibility, inspiring our team to create solutions that not only empower businesses but also uplift communities.",
								"We actively support initiatives that foster digital inclusion, sustainability, and education. Through our corporate social responsibility programs, we empower our employees to contribute to causes they care about, ensuring that the future we build is accessible, equitable, and sustainable for everyone.",
								"Together, we are shaping a better tomorrow."
							]}
							buttonText="Our CSR Initiatives"
							buttonLink="/csr"
							backgroundColor="linear-gradient(to right, #0c8b21ff, #797497ff)"
						/>




						{/* Employee Testimonials */}
						<CultureTestimonials />



					</main>
					<Footer2 />
				</div>
			</div>

			<ClientWrapper />
		</div>
	);
}
