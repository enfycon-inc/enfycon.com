"use client";
import BlogCard2 from "@/components/shared/cards/BlogCard2";
import { getAllBlogs } from "@/libs/wpBlogs";
import { useEffect, useState, useRef } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Blogs2 = ({
	categoryName = null,
	title = "Strategies and Insights.",
	subtitle = "Read Blogs",
	description = "Developing personalized customer journeys to increase satisfaction and loyalty."
}) => {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hasLoaded, setHasLoaded] = useState(false);
	const sectionRef = useRef(null);

	const fetchBlogs = async () => {
		if (loading || hasLoaded) return;
		setLoading(true);
		try {
			let data = [];

			// 1. Try fetching with category if provided
			if (categoryName) {
				try {
					data = await getAllBlogs(categoryName);
				} catch (e) {
					console.warn("Blogs2: Failed to fetch by category, trying fallback.", e);
				}
			}

			// 2. Fallback to generic blogs if no data found (or fetch failed)
			// checking for !data or empty array
			if (!data || data.length === 0) {
				try {
					data = await getAllBlogs(null);
				} catch (e) {
					console.error("Blogs2: Failed to fetch generic blogs.", e);
					data = [];
				}
			}

			setBlogs(data ? data.slice(0, 4) : []);
			setHasLoaded(true);
		} catch (error) {
			console.error("Error fetching Blogs2 data:", error);
			setBlogs([]);
			setHasLoaded(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBlogs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryName]);

	if (hasLoaded && (!blogs || blogs.length === 0)) {
		return null;
	}

	return (
		<section className="tj-blog-section-2 section-gap" ref={sectionRef}>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="sec-heading-wrap">
							<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
								{subtitle}
							</span>
							<div className="heading-wrap-content">
								<div className="sec-heading style-2">
									<h2 className="sec-title text-anim">
										{title}
									</h2>
								</div>
								<div className="wow fadeInUp" data-wow-delay=".5s">
									<p className="desc">
										{description}
									</p>
								</div>
								<div
									className="slider-navigation d-none d-md-inline-flex wow fadeInUp"
									data-wow-delay=".7s"
								>
									<div className="slider-prev" role="button">
										<span className="anim-icon">
											<i className="tji-arrow-left"></i>
											<i className="tji-arrow-left"></i>
										</span>
									</div>
									<div className="slider-next" role="button">
										<span className="anim-icon">
											<i className="tji-arrow-right"></i>
											<i className="tji-arrow-right"></i>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="blog-wrapper wow fadeIn" data-wow-delay=".5s">
							{loading && !blogs.length ? (
								<div className="text-center py-5">
									<h3>Loading Insights...</h3>
								</div>
							) : (
								<Swiper
									slidesPerView={1}
									spaceBetween={15}
									loop={true}
									speed={1500}
									loopAdditionalSlides={1}
									autoplay={{
										delay: 5000,
									}}
									pagination={{
										el: ".swiper-pagination-area",
										clickable: true,
									}}
									navigation={{ nextEl: ".slider-next", prevEl: ".slider-prev" }}
									breakpoints={{
										768: {
											spaceBetween: 20,
											slidesPerView: 1,
										},
										992: {
											slidesPerView: 2,
											spaceBetween: 20,
										},
										1200: {
											slidesPerView: 2,
											spaceBetween: 30,
										},
									}}
									modules={[Pagination, Autoplay, Navigation]}
									className="blog-slider"
								>
									{blogs?.length
										? blogs?.map((blog, idx) => (
											<SwiperSlide key={idx}>
												<BlogCard2 blog={blog} idx={idx} />
											</SwiperSlide>
										))
										: ""}
									<div className="swiper-pagination-area"></div>
								</Swiper>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Blogs2;

