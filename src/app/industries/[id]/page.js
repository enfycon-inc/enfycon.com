import Footer2 from "@/components/layout/footer/Footer2";
import Header from "@/components/layout/header/Header";
import IndustryDetailsMain from "@/components/layout/main/IndustryDetailsMain";
import Cta from "@/components/sections/cta/Cta";
import BackToTop from "@/components/shared/others/BackToTop";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { industriesData } from "@/data/industriesData";
import { notFound } from "next/navigation";

const items = industriesData;

export async function generateMetadata({ params }) {
    const { id } = await params;
    const item = items?.find(({ id: id1 }) => id1 === id);

    if (!item) {
        return {
            title: "Industry Not Found - enfycon",
            description: "The requested industry could not be found.",
        };
    }

    return {
        title: `${item.title} - enfycon`,
        description: item.desc,
        openGraph: {
            title: `${item.title} - enfycon`,
            description: item.desc,
            images: [
                {
                    url: item.image,
                    width: 800,
                    height: 600,
                    alt: item.title,
                },
            ],
        },
    };
}

export default async function IndustryDetails({ params }) {
    const { id } = await params;

    // Check using string comparison
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
                        <IndustryDetailsMain currentItemId={id} />
                        <Cta />
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
