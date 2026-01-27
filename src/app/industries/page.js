import Footer2 from "@/components/layout/footer/Footer2";
import Header from "@/components/layout/header/Header";
import Brands2 from "@/components/sections/brands/Brands2";
import Contact2 from "@/components/sections/contacts/Contact2";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import IndustriesPage from "@/components/sections/industries/IndustriesPage";
import BackToTop from "@/components/shared/others/BackToTop";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import HeaderSpace from "@/components/shared/others/HeaderSpace";

import { constructMetadata } from "@/libs/seo";

export const metadata = constructMetadata({
    title: "Industries - enfycon",
    description: "Explore the diverse industries Enfycon serves, from banking and finance to healthcare and human resources, delivering tailored technological solutions.",
    image: "/images/bg/service-banner.jpg",
});

export default function Industries() {
    return (
        <div>
            <BackToTop />
            <Header />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main>
                       <HeaderSpace/>
                        <HeroInner title={"Industries"} text={"Industries"} />
                        <IndustriesPage />
                        <Contact2 />
                      
                     
                    </main>
                    <Footer2 />
                </div>
            </div>

            <ClientWrapper />
        </div>
    );
}
