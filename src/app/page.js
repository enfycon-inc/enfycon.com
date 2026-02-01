import Footer2 from "@/components/layout/footer/Footer2";
import Header from "@/components/layout/header/Header";
import About3 from "@/components/sections/about/About3";
import Brands2 from "@/components/sections/brands/Brands2";
import Hero2 from "@/components/sections/hero/Hero2";
import dynamic from "next/dynamic";

const Blogs2 = dynamic(() => import("@/components/sections/blogs/Blogs2"));
const Products2 = dynamic(() => import("@/components/sections/products/Products2"));
const Process = dynamic(() => import("@/components/sections/process/Process"));
const Services6 = dynamic(() => import("@/components/sections/services/Services6"));
const Testimonials2 = dynamic(() => import("@/components/sections/testimonials/Testimonials2"));
const Industries1 = dynamic(() => import("@/components/sections/industries/Industries1"));
const Faq2 = dynamic(() => import("@/components/sections/faq/Faq2"));
import BackToTop from "@/components/shared/others/BackToTop";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { getAllBlogs } from "@/libs/wpBlogs";

export const metadata = {
	title: "Enterprise AI, Cybersecurity & IT Staffing Solutions | enfycon",
	description: "Empowering businesses with cutting-edge AI, robust cybersecurity, and expert IT staffing solutions. Partner with enfycon for digital transformation.",
};

export default async function Home() {
	const data = await getAllBlogs(null);
	const blogs = data?.slice(0, 4) || [];

	return (
		<div>
			<BackToTop />
			<Header />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<Hero2 />
						<Brands2 />
						<About3 />
						<Services6 />
						<Industries1 />

						<Products2 />
						<Process />

						{/* <Team1 /> */}
						{/* <PricingPlan /> */}
						<Blogs2 blogs={blogs} />
						<Testimonials2 />
						<Faq2 type={2} />
					</main>
					<Footer2 />
				</div>
			</div>

			<ClientWrapper />
		</div>
	);
}
