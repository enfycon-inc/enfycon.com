import Footer2 from "@/components/layout/footer/Footer2";
import Header from "@/components/layout/header/Header";
import Brands2 from "@/components/sections/brands/Brands2";
import Contact2 from "@/components/sections/contacts/Contact2";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import ServicesCategorized from "@/components/sections/services/ServicesCategorized";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { constructMetadata } from "@/libs/seo";

export const metadata = constructMetadata({
	title: "Services - enfycon",
	description: "Discover the range of services Enfycon offers to empower your business with cutting-edge technology.",
	image: "/images/bg/service-banner.jpg",
});

export default function Services() {
	return (
		<div>
			<BackToTop />
			<Header />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
					
						<HeroInner title={"Services"} text={"Services"} />
						<ServicesCategorized />
						<Contact2 />
						<Brands2 />

					</main>
					<Footer2 />
				</div>
			</div>

			<ClientWrapper />
		</div>
	);
}
