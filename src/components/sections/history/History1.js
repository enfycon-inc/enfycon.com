import modifyNumber from "@/libs/modifyNumber";
import Image from "next/image";

const History1 = () => {
	const history = [
		{
			title: "Inception & Vision",
			desc: "Ashutosh Dash founded enfycon Inc with a vision to build a company that delivers world-class technology while remaining deeply human at its core. It was designed to be a trusted technology partner, aligning with client goals as if they were its own.",
			images: [
				"/images/history/history-inception.png",
			],
			year: 2018,
		},
		{
			title: "Building Foundations",
			desc: "Focused on creating value through integrity and trust, we established strong relationships with enterprises and startups. We proved that long-term success comes from partnership, not just transactions.",
			images: [
				"/images/history/history-foundation.png",
			],
			year: "2019",
		},
		{
			title: "Global Expansion",
			desc: "Enfycon expanded operations across the USA, India, and the UAE, supporting enterprises with Technology Hiring Solutions, AI-driven solutions, and digital transformation services, while emphasizing accountability and transparency.",
			images: [
				"/images/history/history-expansion.png",
			],
			year: "2021",
		},
		{
			title: "AI-Led Innovation",
			desc: "Evolving into AI-led products and advanced technology solutions, we remain anchored by the principle that taking care of people drives innovation. We continue to measure success by the relationships we build and the impact we create.",
			images: [
				"/images/history/history-innovation.png",
			],
			year: 2024,
		},
		{
			title: "Strategic Partnerships",
			desc: "Forged strategic partnerships with the Government of India and IICL, a Hyderabad-based IT company, to drive large-scale digital initiatives and foster technology-driven growth.",
			images: [
				"/images/history/history-partnerships.png",
			],
			year: 2025,
		},
	];
	return (
		<section id="history" className="tj-history-area section-gap bg-gray-1">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="sec-heading style-4 text-center mb-50">
							<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
								<i className="tji-box"></i>Our Journey
							</span>
							<h2 className="sec-title">
								Milestones of Our <span>Success</span>
							</h2>
						</div>
						<div className="timeline">
							{history?.length
								? history?.map(({ title, desc, images, year }, idx) => (
									<div
										key={idx}
										className="timeline-inner wow fadeInUp"
										data-wow-delay={`0.${idx + 1 + idx}s`}
									>
										<div className="date">{year}</div>
										<div className="content">
											<div className="top">
												<span>{modifyNumber(idx + 1)}.</span>
												<h4 className="title">{title}</h4>
												<p>{desc}</p>
											</div>
											<div className="bottom">
												{images?.length
													? images?.map((img, idx) => (
														<Image
															key={idx + 100}
															src={
																img ? img : "/images/history/history-1.webp"
															}
															alt="history"
															width={241}
															height={204}
															style={{ height: "auto" }}
														/>
													))
													: ""}
											</div>
										</div>
									</div>
								))
								: ""}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default History1;
