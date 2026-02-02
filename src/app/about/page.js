import Footer from "@/components/layout/footer/Footer";
import Footer2 from "@/components/layout/footer/Footer2";
import Header from "@/components/layout/header/Header";
import About12 from "@/components/sections/about/About12";
import FounderStory from "@/components/sections/about/FounderStory";
import Brands1 from "@/components/sections/brands/Brands1";
import LocationSection from "@/components/sections/contacts/LocationSection";
import Cta from "@/components/sections/cta/Cta";
import Faq2 from "@/components/sections/faq/Faq2";
import Features from "@/components/sections/features/Features";
import Features3 from "@/components/sections/features/Features3";
import Funfact3 from "@/components/sections/funfacts/Funfact3";
import FullScreenHero from "@/components/sections/hero/FullScreenHero";
import History1 from "@/components/sections/history/History1";
import Team1 from "@/components/sections/teams/Team1";
import Testimonials2 from "@/components/sections/testimonials/Testimonials2";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import CsrProjects from "@/components/sections/csr/CsrProjects";
import { csrData } from "@/data/csrData";

import { constructMetadata } from "@/libs/seo";

export const metadata = constructMetadata({
	title: "Leading AI & Technology Consulting Firm | enfycon About",
	description: "Learn about enfycon, our mission, vision, and the team driving technological excellence.",
	image: "/images/bg/service-banner.jpg",
});

export default function About() {
	return (
		<div>
			<BackToTop />
			<Header />
			{/* <Header isStickyHeader={true} /> */}
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<FullScreenHero
							title={"Building Success Together"}
							text={[
								"At enfycon, we empower enterprises to navigate the digital future with confidence. Specializing in AI-driven solutions and agentic workflows, we partner with clients globally to drive innovation, modernize legacy systems, and achieve sustainable growth.",
								"Our commitment to excellence and client success is the cornerstone of everything we build.",
							]}
							breadcrums={[{ name: "About Us", path: "/about" }]}
							image={"/images/bg/service-banner.jpg"}
							id="building-success-together"
						/>
						<FounderStory id="founders-story" />

						{/* <About12/> */}
						<History1 />
						<Features3 id="feature3" />
					
						{/* <Testimonials2 type={2} /> */}
						{/* CSR Section - Gray BG */}
						<div className="bg-gray-1">
							<CsrProjects data={csrData.projects} />
						</div>
						<Team1 type={3} id="leadership" />
						<LocationSection id="locations" />
						{/* <Faq2 type={3} /> */}

					</main>
					<Footer2 />
				</div>
			</div>

			<ClientWrapper />
		</div>
	);
}
