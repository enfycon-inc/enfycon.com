import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const About12 = () => {
	return (
		<section className="tj-history section-gap">
			<div className="container">
				<div className="row rg-30 justify-content-between">
					<div className="col-xl-5">
						<div className="sec-heading mb-0">
							<span className="sub-title wow fadeInUp" data-wow-delay="0.1s">
								<i className="tji-box"></i> Our Background
							</span>
							<h2 className="sec-title text-anim">
								Evolving Through Integrity &{" "}
								<span>Innovation.</span>
							</h2>
						</div>
					</div>
					<div className="col-xl-5">
						<div className="desc wow fadeInUp" data-wow-delay="0.3s">
							<p>
								Our mission is to empower businesses to thrive in an ever-changing marketplace.
								We are committed to delivering exceptional value through integrity, trust, and AI-driven solutions.
							</p>
							<p>
								From our inception, we have believed that long-term success comes from partnership, not just transactions.
							</p>
						</div>
						<div
							className="history-btn mt-30 wow fadeInUp"
							data-wow-delay="0.5s"
						>
							<ButtonPrimary text={"View Our Journey"} url={"#history"} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About12;
