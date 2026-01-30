import Footer2 from "@/components/layout/footer/Footer2";
import Header from "@/components/layout/header/Header";
import Contact2 from "@/components/sections/contacts/Contact2";
import HeroInner from "@/components/sections/hero/HeroInner";
import ServicesCategorized from "@/components/sections/services/ServicesCategorized";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { serviceCategories } from "@/data/servicesData";
import { constructMetadata } from "@/libs/seo";

export async function generateStaticParams() {
    return serviceCategories.map((category) => ({
        id: category.id,
    }));
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const category = serviceCategories.find(c => c.id === id);

    if (!category) {
        return constructMetadata({
            title: "Service Category - enfycon",
            description: "Discover our specialized services.",
        });
    }

    return constructMetadata({
        title: `${category.name} - Services - enfycon`,
        description: category.desc || "Discover our specialized services.",
        // You might want to map specific images if available in category data
        // image: category.img4 
    });
}

export default async function ServiceCategoryPage({ params }) {
    const { id } = await params;
    const category = serviceCategories.find(c => c.id === id);

    // Fallback title if category not found (though generateStaticParams handles valid paths)
    const pageTitle = category ? category.name : "Services";
    const pageText = category ? category.title : "Services";

    return (
        <div>
            <BackToTop />
            <Header />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main>
                        <HeaderSpace />
                        <HeroInner title={pageTitle} text={pageText} />
                        <ServicesCategorized activeCategoryId={id} />
                        <Contact2 />
                    </main>
                    <Footer2 />
                </div>
            </div>

            <ClientWrapper />
        </div>
    );
}
