import Footer2 from "@/components/layout/footer/Footer2";
import Header from "@/components/layout/header/Header";
import About2 from "@/components/sections/about/About2";
import Blogs2 from "@/components/sections/blogs/Blogs2";
import Brands2 from "@/components/sections/brands/Brands2";
import Hero2 from "@/components/sections/hero/Hero2";
import Portfolios2 from "@/components/sections/portfolios/Portfolios2";
import Process from "@/components/sections/process/Process";
import Services2 from "@/components/sections/services/Services2";
import Services6 from "@/components/sections/services/Services6";
import Services9 from "@/components/sections/services/Services9";
import Testimonials2 from "@/components/sections/testimonials/Testimonials2";
import IndustryCardHome from "@/components/shared/cards/IndustryCardHome";
import BackToTop from "@/components/shared/others/BackToTop";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";

export default function Home() {
	return (
		<div>
			<BackToTop />
			<Header />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<Hero2 />
						<Brands2 />
						<Services6 />
					<IndustryCardHome/>
						<About2 />
						<Services9 />

						<Services2 />
						<Portfolios2 />
						<Process />

						{/* <Team1 /> */}
						{/* <PricingPlan /> */}
						<Blogs2 />
						<Testimonials2 />
					</main>
					<Footer2 />
				</div>
			</div>

			<ClientWrapper />
		</div>
	);
}
