"use client";
import IndustryCardHome from "@/components/shared/cards/IndustryCardHome";

import { industriesData } from "@/data/industriesData";

const Industries1 = () => {
    const industryConfig = {
        banking: { color: "#0891B2", icon: "fa-solid fa-building-columns" }, // Teal
        finance: { color: "#10B981", icon: "fa-solid fa-chart-line" }, // Emerald green
        healthcare: { color: "#8B5CF6", icon: "fa-solid fa-heart-pulse" }, // Vibrant purple
        "human-resource": { color: "#EC4899", icon: "fa-solid fa-users" }, // Vibrant pink
        legal: { color: "#1E40AF", icon: "fa-solid fa-scale-balanced" }, // Deep blue
        logistics: { color: "#F59E0B", icon: "fa-solid fa-truck-fast" }, // Amber
        manufacturing: { color: "#F97316", icon: "fa-solid fa-industry" }, // Vibrant orange
        "supply-chain": { color: "#6366F1", icon: "fa-solid fa-boxes-stacked" }, // Indigo
    };

    const industries = industriesData.map(industry => ({
        ...industry,
        bgColor: industryConfig[industry.id]?.color || "#64748B",
        icon: industryConfig[industry.id]?.icon || "fa-solid fa-briefcase"
    }));

    return (
        <section className="industry-section section-top-gap section-bottom-gap">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="client-content-wrapper text-center mb-5">
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    <div className="sec-heading mb-4">
                                        <h2 className="sec-title">
                                            Industries We Serve
                                        </h2>
                                    </div>
                                    <div className="desc">
                                        <p>
                                            Business isn't one size fits all. Every industry requires a custom solution.
                                            Learn more about how we've helped businesses in your industry by clicking below.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center g-4">
                    {industries.map((industry, idx) => (
                        <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <IndustryCardHome industry={industry} idx={idx} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default Industries1;
