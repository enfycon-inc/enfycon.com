"use client";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import ProcessCard from "@/components/shared/cards/ProcessCard";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Process = () => {
	const process = [
		{
			id: 1,
			title: "Discovery & Planning",
			desc: "The first step in our process is understanding your unique business needs,  objectives, and our cutomes challenges.",
		},
		{
			id: 2,
			title: "Execution & Delivery",
			desc: "Once the plan is in place, our team moves forward with execution, turning strategies into actiony to deliver.",
		},
		{
			id: 3,
			title: "Review & Support",
			desc: "After project completion, we conduct a thorough review to ensure everything aligns with your goals and requirements.",
		},
	];
	return (
		// <section className="tj-working-process section-gap section-gap-x">
		<section className="tj-working-proces section-gap">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="sec-heading-wrap">
							<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
								Our Process
							</span>
							<div className="heading-wrap-content">
								<div className="sec-heading style-2">
									<h2 className="sec-title text-anim">
										Seamless Process, Great <span>Results.</span>
									</h2>
								</div>
								<p className="desc wow fadeInUp" data-wow-delay=".5s">
									Developing personalized customer journeys to increase
									satisfaction and loyalty.
								</p>
								<div className="btn-wrap wow fadeInUp" data-wow-delay=".6s">
									<ButtonPrimary text={"Request a Call"} url={"/contact-us"} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="working-process-area working-process-area--desktop">
							{process?.length
								? process?.map((processSingle, idx) => (
										<ProcessCard
											key={idx}
											processSingle={processSingle}
											idx={idx}
										/>
								  ))
								: ""}
						</div>
						<div className="working-process-swiper">
							<Swiper
								slidesPerView={1.15}
								spaceBetween={16}
								centeredSlides={true}
								loop={true}
								speed={600}
								pagination={{
									el: ".process-pagination",
									clickable: true,
								}}
								breakpoints={{
									576: {
										slidesPerView: 1.25,
										spaceBetween: 18,
									},
									768: {
										slidesPerView: 2,
										spaceBetween: 20,
									},
								}}
								modules={[Pagination]}
								className="process-slider"
							>
								{process?.length
									? process?.map((processSingle, idx) => (
											<SwiperSlide key={idx}>
												<ProcessCard
													processSingle={processSingle}
													idx={idx}
												/>
											</SwiperSlide>
									  ))
									: ""}
								<div className="process-pagination swiper-pagination-area"></div>
							</Swiper>
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

export default Process;
