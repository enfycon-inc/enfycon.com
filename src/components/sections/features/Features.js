import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import FeatureCard from "@/components/shared/cards/FeatureCard";

const Features = ({ type, id }) => {
	const features = [
		{
			title: "20+ Years of Excellence",
			desc: "With over two decades of experience in technology and digital transformation, we bring unmatched expertise to every project, achieving a 98% client satisfaction rate.",
			icon: "tji-award",
		},
		{
			title: "AI-Driven Innovation",
			desc: "We leverage cutting-edge AI, Web 3.0, and advanced technologies to craft intelligent ecosystems that help enterprises operate, scale, and innovate in the digital age.",
			icon: "tji-innovative",
		},
		{
			title: "Global Reach & Support",
			desc: "Operating across USA, India, and UAE, our dedicated teams provide world-class technology, talent, and support to transform businesses worldwide with transparency and accountability.",
			icon: "tji-support",
		},
	];

	return (
		<section id={id ? id : "choose"} className="tj-choose-section section-gap">
			<div className="container">
				<div className="row">
					<div className="col-12">
						{type == 2 ? (
							<div className="sec-heading-wrap">
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>Why Choose Enfycon
								</span>
								<div className="heading-wrap-content">
									<div className="sec-heading">
										<h2 className="sec-title title-anim">
											Empowering Enterprises with <span>AI & Expertise.</span>
										</h2>
									</div>
									<div className="btn-wrap wow fadeInUp" data-wow-delay=".6s">
										<ButtonPrimary text="Request a Call" url="/contact" />
									</div>
								</div>
							</div>
						) : (
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>Why Choose Enfycon
								</span>
								<h2 className="sec-title title-anim">
									Empowering Enterprises with <span>AI & Expertise.</span>
								</h2>
							</div>
						)}
					</div>
				</div>
				<div className="row row-gap-4 rightSwipeWrap">
					{features.map((feature, idx) => (
						<div key={idx} className="col-lg-4">
							<FeatureCard feature={feature} idx={idx} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
export default Features;
