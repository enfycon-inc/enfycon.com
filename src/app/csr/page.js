import FullScreenHero from "@/components/sections/hero/FullScreenHero";
import IndustrySplitSection from "@/components/shared/sections/IndustrySplitSection";
import Footer2 from "@/components/layout/footer/Footer2";
import Header from "@/components/layout/header/Header";
import BackToTop from "@/components/shared/others/BackToTop";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import CsrProjects from "@/components/sections/csr/CsrProjects";
import CsrFeatured from "@/components/sections/csr/CsrFeatured";

import { csrData } from "@/data/csrData";
import HeaderSpace from "@/components/shared/others/HeaderSpace";

export const metadata = {
    title: "CSR - Corporate Social Responsibility | Enfycon",
    description: "Sustainable Impact, Transforming Lives through our CSR initiatives.",
};

export default function CsrPage() {
    return (
        <div>
            <BackToTop />
            <Header />

            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main>
                        {/* Hero */}
                        <HeaderSpace/>
                        <FullScreenHero
                            title={csrData.hero.title}
                            text={csrData.hero.text}
                            breadcrums={csrData.hero.breadcrums}
                            image={csrData.hero.image}
                        />

                        {/* Projects - Gray BG */}
                        <div className="bg-gray-1">
                            <CsrProjects data={csrData.projects} />
                        </div>

                        {/* Impact - White BG */}
                        <div className="csr-impact">
                            <IndustrySplitSection
                                item={{
                                    title: csrData.impact.title,
                                    desc: csrData.impact.desc,
                                    image: csrData.impact.image
                                }}
                                sectionClass="csr-impact-section"
                            />
                        </div>

                        {/* Featured - Gray BG */}
                        <div >
                            <CsrFeatured data={csrData.featured} />
                        </div>

                    </main>
                    <Footer2 />
                </div>
            </div>

            <ClientWrapper />
        </div>
    );
}
