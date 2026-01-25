import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Image from "next/image";
const About3 = ({ type, id }) => {
	return (
		<section id={id} className="tj-about-section-2 section-gap  ">
			<div className="container">
				<div className="row">
					<div className="col-xl-6 col-lg-6 order-lg-1 order-2">
						<div
							className="about-img-area style-2 wow fadeInLeft"
							data-wow-delay=".3s"
						>
							<div className="about-img overflow-hidden">
								<Image
									data-speed=".8"
									src="/images/about/about-us.jpg"
									alt=""
									width={591}
									height={639}
								/>
							</div>
							<div className={`box-area ${type === 2 ? "style-2" : ""}`}>
								<div className="progress-box wow fadeInUp" data-wow-delay=".3s">
									<h4 className="title">Business Impact</h4>
									<ul className="tj-progress-list">
										<li>
											<h6 className="tj-progress-title">Global Reach</h6>
											<div className="tj-progress">
												<span className="tj-progress-percent">100%</span>
												<div
													className="tj-progress-bar"
													data-percent="100"
												></div>
											</div>
										</li>
										<li>
											<h6 className="tj-progress-title">Client Satisfaction</h6>
											<div className="tj-progress">
												<span className="tj-progress-percent">98%</span>
												<div
													className="tj-progress-bar"
													data-percent="98"
												></div>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-6 col-lg-6 order-lg-2 order-1">
						<div className="about-content-area">
							<div className={`sec-heading ${type === 2 ? "" : "style-3"}`}>
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>Get to Know Us
								</span>
								<h2 className="sec-title title-anim">
									{type === 2 ? (
										<>
											Empowering Enterprises Through AI-Driven Digital
											Transformation <span>Worldwide.</span>
										</>
									) : (
										"Empowering Enterprises Through AI-Driven Digital Transformation Worldwide."
									)}
								</h2>
							</div>
						</div>
						<div className="about-bottom-area">
							<div
								className="mission-vision-box wow fadeInLeft"
								data-wow-delay=".5s"
							>
								<h4 className="title">Our Mission</h4>
								<p className="desc">
									Enable enterprises to become intelligent, agile, and future-ready
									by delivering world-class technology and AI-driven solutions.
								</p>
								<ul className="list-items">
									<li>
										<i className="tji-list"></i>World-Class Technology
									</li>
									<li>
										<i className="tji-list"></i>AI-Driven Solutions
									</li>
									<li>
										<i className="tji-list"></i>Digital Transformation
									</li>
								</ul>
							</div>
							<div
								className="mission-vision-box wow fadeInRight"
								data-wow-delay=".5s"
							>
								<h4 className="title">Our Purpose</h4>
								<p className="desc">
									Create lasting value for clients, employees, partners, and
									communities using technology responsibly.
								</p>
								<ul className="list-items">
									<li>
										<i className="tji-list"></i>Drive Growth & Trust
									</li>
									<li>
										<i className="tji-list"></i>Positive Impact
									</li>
									<li>
										<i className="tji-list"></i>Responsible Innovation
									</li>
								</ul>
							</div>
						</div>
						<div className="about-btn-area wow fadeInUp" data-wow-delay=".5s">
							<ButtonPrimary text={"Learn More About Us"} url={"/about"} />
						</div>
					</div>
				</div>
			</div>
			<div className="bg-shape-1">
				<img src="/images/shape/pattern-2.svg" alt="" />
			</div>
			<div className="bg-shape-2">
				<img src="/images/shape/pattern-3.svg" alt="" />
			</div>
		</section>
	);
};

export default About3;
