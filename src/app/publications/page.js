import Footer2 from "@/components/layout/footer/Footer2";
import Header from "@/components/layout/header/Header";
import BlogHeroEnterprise from "@/components/sections/blogs/BlogHeroEnterprise";
import PublicationSections from "@/components/sections/publications/PublicationPageSections";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import { constructMetadata } from "@/libs/seo";

export const metadata = constructMetadata({
    title: "Publications | enfycon",
    description: "Explore our latest blogs, white papers, newsletters, and case studies.",
    image: "/images/bg/service-banner.jpg",
});

export default function PublicationsPage() {
    // Custom breadcrumbs for the hero
    const breadcrumbs = (
        <>
            <span className="mx-2">&gt;</span>
            <span style={{ color: "#4facfe" }}>Publications</span>
        </>
    );

    return (
        <main>
            <Header/>
            <HeaderSpace/>

            <BlogHeroEnterprise
                customTitle="Resources & Publications"
                breadcrumbOverride={breadcrumbs}
                backgroundOverride="/images/bg/service-banner.jpg"
            />

            <PublicationSections />
            <Footer2/>
        </main>
    );
}
