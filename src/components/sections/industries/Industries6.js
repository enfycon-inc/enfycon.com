"use client";

import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import IndustryCard6 from "@/components/shared/cards/IndustryCard6";
import { industriesData } from "@/data/industriesData";
import { useCallback, useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Industries6 = () => {
	const industries = industriesData || [];
	const initialDesktopIndex = 0;
	const initialMobileSlide = 0;
	const [currentIndex, setCurrentIndex] = useState(initialDesktopIndex);
	const [isMobile, setIsMobile] = useState(false);
	const handleCurrentIndex = useCallback(idx => {
		setCurrentIndex(idx);
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const media = window.matchMedia("(max-width: 767px)");
		const update = () => {
			const nextIsMobile = media.matches;
			setIsMobile(nextIsMobile);
			if (!nextIsMobile) {
				setCurrentIndex(initialDesktopIndex);
			}
		};
		update();
		if (media.addEventListener) {
			media.addEventListener("change", update);
			return () => media.removeEventListener("change", update);
		}
		media.addListener(update);
		return () => media.removeListener(update);
	}, []);

	return (
		<section className="h6-project h6-project--light industries-accordion section-gap ">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="heading-wrap-content">
							<div className="sec-heading style-2 style-6">
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>Industries
								</span>
								<h2 className="sec-title title-anim">
									Industries We Serve
								</h2>
							</div>
							<div className="btn-area wow fadeInUp" data-wow-delay=".8s">
								<ButtonPrimary text={"All Industries"} url={"/industries"} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div
							className="h6-project-inner h6-project-inner--desktop wow fadeInUp"
							data-wow-delay="0.6s"
						>
							{industries.map((industry, idx) => (
								<IndustryCard6
									key={industry.id || idx}
									industry={industry}
									idx={idx}
									currentIndex={currentIndex}
									handleCurrentIndex={handleCurrentIndex}
								/>
							))}
						</div>
						<div
							className="h6-project-swiper wow fadeInUp"
							data-wow-delay="0.6s"
						>
							<Swiper
								slidesPerView={1.15}
								spaceBetween={14}
								centeredSlides={true}
								speed={600}
								initialSlide={initialMobileSlide}
								pagination={{ clickable: true }}
								onSlideChange={swiper => {
									if (!isMobile) return;
									handleCurrentIndex(swiper.activeIndex);
								}}
								breakpoints={{
									576: {
										slidesPerView: 1.25,
										spaceBetween: 16,
									},
								}}
								modules={[Pagination]}
								className="h6-project-swiper__container"
							>
								{industries.map((industry, idx) => (
									<SwiperSlide key={industry.id || idx}>
										<IndustryCard6
											industry={industry}
											idx={idx}
											currentIndex={currentIndex}
											handleCurrentIndex={handleCurrentIndex}
										/>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Industries6;
