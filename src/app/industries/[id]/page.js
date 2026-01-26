import Footer2 from "@/components/layout/footer/Footer2";
import Header from "@/components/layout/header/Header";
import IndustryDetailsMain from "@/components/layout/main/IndustryDetailsMain";
import Cta from "@/components/sections/cta/Cta";
import BackToTop from "@/components/shared/others/BackToTop";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { industriesData } from "@/data/industriesData";
import { notFound } from "next/navigation";

const items = industriesData;

import { constructMetadata, generateDynamicMetadata } from "@/libs/seo";
import HeaderSpace from "@/components/shared/others/HeaderSpace";

export async function generateMetadata({ params }) {
    return generateDynamicMetadata({
        params,
        items,
        resourceName: "Industry",
        keywordContext: (item) => {
            const longDesc = item.longDesc?.join(" ") || "";
            const challenges = item.challenges?.map(c => `${c.title} ${c.desc}`).join(" ") || "";
            const benefits = item.benefits?.map(b => `${b.title} ${b.desc}`).join(" ") || "";
            const solutions = item.solutions?.map(s => `${s.title} ${s.desc}`).join(" ") || "";
            return `${item.title} ${item.desc} ${longDesc} ${challenges} ${benefits} ${solutions}`;
        }
    });
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
                    <HeaderSpace/>
                    <main>
                        <IndustryDetailsMain currentItemId={id} />
                     
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
