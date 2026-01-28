import FeatureCard2 from "@/components/shared/cards/FeatureCard2";

const CoreValues = () => {
    const values = [
        {
            id: 1,
            title: "Innovation",
            icon: "tji-innovative",
            desc: "We pioneer new ideas and leverage current technology to solve complex challenges.",
        },
        {
            id: 2,
            title: "Integrity",
            icon: "tji-award",
            desc: "Building trust through transparency, honesty, and ethical actions in all we do.",
        },
        {
            id: 3,
            title: "Collaboration",
            icon: "tji-team",
            desc: "We believe the best solutions come from diverse minds working together.",
        },
        {
            id: 4,
            title: "Excellence",
            icon: "tji-support",
            desc: "Striving for the highest quality and impact in every project we undertake.",
        },
    ];
    return (
        <section className="tj-choose-section section-gap">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="sec-heading style-3 text-center">
                            <span className="sub-title wow fadeInUp" data-wow-delay=".3s">
                                <i className="tji-box"></i>Our Core Values
                            </span>
                            <h2 className="sec-title title-anim">
                                The Principles That <span>Drive Us.</span>
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="row row-gap-4 rightSwipeWrap">
                    {values?.length
                        ? values?.map((value, idx) => (
                            <div key={idx} className="col-xl-3 col-md-6">
                                <FeatureCard2 feature={value} idx={idx} showBtn={false} />
                            </div>
                        ))
                        : ""}
                </div>
            </div>
        </section>
    );
};

export default CoreValues;
