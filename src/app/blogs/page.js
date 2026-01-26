import Footer2 from "@/components/layout/footer/Footer2";
import Header from "@/components/layout/header/Header";
import BlogsGridPrimary from "@/components/sections/blogs/BlogsGridPrimary";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import BackToTop from "@/components/shared/others/BackToTop";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";

export default function BlogGrid() {
	return (
		<div>
			<BackToTop />
			<Header />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeroInner title={"Blogs"} text={"Blogs"} />
						<BlogsGridPrimary />

					</main>
					<Footer2 />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}

