"use client";
import IndustryCard from "@/components/shared/cards/IndustryCard";
import { industriesData } from "@/data/industriesData";

const IndustriesPage = () => {
    return (
        <div className="tj-industries-section section-gap">
            <div className="container">
                {/* Page Header */}
                <div className="row mb-5">
                    <div className="col-12 text-center">
                        <div className="sec-heading">
                            <span className="sub-title wow fadeInUp" data-wow-delay=".3s">
                                <i className="tji-box"></i>Industries We Serve
                            </span>
                            <h2 className="sec-title title-anim">
                                Empowering Innovation Across Sectors
                            </h2>
                            <p className="sec-desc mt-3" style={{ maxWidth: "800px", margin: "0 auto" }}>
                                From banking to supply chain, we deliver cutting-edge technology solutions
                                tailored to transform industries and drive digital excellence across banking, finance,
                                healthcare, human resources, legal services, logistics, manufacturing, and supply chain management.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Industry Cards Grid */}
                <div className="row row-gap-4">
                    {industriesData.map((industry, idx) => (
                        <div key={industry.id} className="col-lg-4 col-md-6">
                            <IndustryCard industry={industry} idx={idx} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IndustriesPage;
