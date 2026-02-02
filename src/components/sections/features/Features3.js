import FeatureCard3 from "@/components/shared/cards/FeatureCard3";
import FunfactSingle from "@/components/shared/funfact/FunfactSingle";

const Features3 = ({ id }) => {
	const features = [
		{
			id: 1,
			title: "Care",
			icon: "fa-light fa-hands-holding-heart",
			desc: "We care for our people, our clients, and our communities, fostering a culture of empathy and support.",
		},
		{
			id: 2,
			title: "Openness",
			icon: "fa-light fa-book-open",
			desc: "We embrace change and new ideas, believing that transparency and collaboration lead to the best outcomes.",
		},
		{
			id: 3,
			title: "Respect",
			icon: "fa-light fa-handshake",
			desc: "We treat everyone with dignity and respect, building strong relationships based on trust and mutual understanding.",
		},
		{
			id: 4,
			title: "Excellence",
			icon: "fa-light fa-medal",
			desc: "We strive for excellence in everything we do, setting high standards and continuously improving to deliver the best results.",
		},
		{
			id: 5,
			title: "Innovation",
			icon: "fa-light fa-lightbulb",
			desc: "We not only adapt to the future but create it, leveraging technology to solve complex challenges.",
		}
	];
	return (
		<section id={id ? id : "choose"} className="tj-choose-section section-gap bg-white">
			<div className="container">
				<div className="row row-gap-4">
					<div
						className="col-lg-4 col-md-6 order-lg-0 order-1 wow fadeInUp"
						data-wow-delay=".2s"
					>
						<FeatureCard3 feature={features[1]} />
					</div>
					<div className="col-lg-4 col-md-6 order-lg-1 order-0">
						<div className="h4-content-wrap text-center">
							<div className="sec-heading style-4 text-center">
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>Why enfycon?
								</span>
								<h2 className="sec-title title-anim">
									Driven by Values, Defined by Excellence.
								</h2>
							</div>
							<a
								className="tj-primary-btn wow fadeInUp"
								data-wow-delay=".5s"
								href="/contact-us"
							>
								<span className="btn-text">
									<span>Partner With Us</span>
								</span>
								<span className="btn-icon">
									<i className="tji-arrow-right-long"></i>
								</span>
							</a>
						</div>
					</div>
					<div
						className="col-lg-4 col-md-6 order-lg-2 order-2  wow fadeInUp"
						data-wow-delay=".3s"
					>
						<FeatureCard3 feature={features[2]} />
					</div>
					<div
						className="col-lg-4 col-md-6 order-lg-3 order-3 wow fadeInUp"
						data-wow-delay=".5s"
					>
						<FeatureCard3 feature={features[3]} />
					</div>
					<div
						className="col-lg-4 col-md-6 order-lg-4 order-4 wow fadeInUp"
						data-wow-delay=".7s"
					>
						<FeatureCard3 feature={features[0]} />
					</div>
					<div className="col-lg-4 col-md-6 order-lg-5 order-5 wow fadeInUp" data-wow-delay=".9s">
						<FeatureCard3 feature={features[4]} />
					</div>
				</div>
			</div>
		</section>
	);

};

export default Features3;
