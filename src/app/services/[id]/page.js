import Footer from "@/components/layout/footer/Footer";
import Footer2 from "@/components/layout/footer/Footer2";
import Header from "@/components/layout/header/Header";
import ServiceDetailsMain from "@/components/layout/main/ServiceDetailsMain";
import Cta from "@/components/sections/cta/Cta";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import getALlServices from "@/libs/getALlServices";
import { notFound } from "next/navigation";
const items = getALlServices();
import { constructMetadata, generateDynamicMetadata } from "@/libs/seo";

export async function generateMetadata({ params }) {
	return generateDynamicMetadata({
		params,
		items,
		resourceName: "Service",
		keywordContext: (item) => {
			const challenges = item.challenges?.map(c => `${c.title} ${c.desc}`).join(" ") || "";
			const keyBenefits = item.keyBenefits?.map(b => `${b.title} ${b.desc}`).join(" ") || "";
			const faqs = item.faqs?.map(f => `${f.question} ${f.answer}`).join(" ") || "";
			const whyenfycon = item.whyenfycon?.join(" ") || "";
			return `${item.title} ${item.desc} ${item.overview || ""} ${challenges} ${keyBenefits} ${faqs} ${whyenfycon}`;
		}
	});
}

export default async function ServiceDetails({ params }) {
	const { id } = await params;

	// Check using string comparison (slugs)
	const isExistItem = items?.find(({ id: id1 }) => id1 === id);
	if (!isExistItem) {
		notFound();
	}
	return (
		<div>
			<BackToTop />
			<Header />

			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
					

					
						<ServiceDetailsMain currentItemId={id} />
						
					</main>
					<Footer2 />
				</div>
			</div>

			<ClientWrapper />
		</div>
	);
}
export async function generateStaticParams() {
	return items?.map(({ id }) => ({ id: id.toString() }));
}
