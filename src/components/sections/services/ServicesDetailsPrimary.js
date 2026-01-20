"use client";
import BootstrapWrapper from "@/components/shared/wrappers/BootstrapWrapper";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { serviceCategories } from "@/data/servicesData";
import CtaSidebar from "../cta/CtaSidebar";

const ServicesDetailsPrimary = ({ option }) => {
	const {
		currentItem,
		items,
		currentId,
		isPrevItem,
		isNextItem,
		prevId,
		nextId,
	} = option || {};
	const { title, titleLarge, id, iconName, img } = currentItem || {};
	const sidebarItems = items?.slice(0, 6);
	return (
		<section className="tj-service-area section-gap">
			<div className="container">
				<div className="row row-gap-5">
					<div className="col-lg-8">
						<div className="post-details-wrapper">
							<div className="blog-images wow fadeInUp" data-wow-delay=".1s">
								<Image
									src={currentItem?.img4 || "/images/service/service-details.webp"}
									alt={title || "Service Image"}
									width={870}
									height={350}
									className="service-details-image"
								/>
							</div>
							<h2 className="title title-anim">
								{title}
							</h2>
							<div className="blog-text">
								{/* Service Overview */}
								{currentItem?.overview && (
									<div className="service-section wow fadeInUp" data-wow-delay=".3s">
										{currentItem.overview.split('\n').map((paragraph, index) => (
											paragraph.trim() && <p key={index} className="mb-4">{paragraph}</p>
										))}
									</div>
								)}

								{/* Challenges Section */}
								{currentItem?.challenges?.length > 0 && (
									<div className="service-section mt-5 wow fadeInUp" data-wow-delay=".3s">
										<h3 className="h4 mb-4">Common Challenges</h3>
										<div className="row">
											{currentItem.challenges.map((item, idx) => (
												<div className="col-md-6 mb-3" key={idx}>
													<div className="challenge-item p-3 py-4 border rounded h-100 bg-light">
														<h5 className="h6 text-primary">{item.title}</h5>
														<p className="mb-0">{item.desc}</p>
													</div>
												</div>
											))}
										</div>
									</div>
								)}

								{/* Key Benefits Section */}
								{currentItem?.keyBenefits?.length > 0 && (
									<div className="service-section mt-5 wow fadeInUp" data-wow-delay=".3s">
										<h3 className="h4 mb-4">Key Benefits</h3>
										<ul className="list-unstyled">
											{currentItem.keyBenefits.map((item, idx) => (
												<li key={idx} className="mb-3 d-flex align-items-start">
													<span className="me-3 text-primary mt-1">
														<i className="tji-check-circle"></i>
													</span>
													<div>
														<strong>{item.title}:</strong> {item.desc}
													</div>
												</li>
											))}
										</ul>
									</div>
								)}

								{/* Why enfycon Section */}
								{currentItem?.whyenfycon?.length > 0 && (
									<div className="service-section mt-5 wow fadeInUp" data-wow-delay=".3s">
										<h3 className="h4 mb-4">Why Choose enfycon?</h3>
										<div className="bg-light p-4 rounded border-start border-primary border-4">
											<ul className="list-unstyled mb-0">
												{currentItem.whyenfycon.map((item, idx) => (
													<li key={idx} className="smb-2">
														<i className="tji-star me-2 text-warning"></i> {item}
													</li>
												))}
											</ul>
										</div>
									</div>
								)}

								{/* Dynamic FAQs Section */}
								{currentItem?.faqs?.length > 0 && (
									<div className="service-section mt-5 wow fadeInUp" data-wow-delay=".3s">
										<h3 className="h4 mb-4">Frequently Asked Questions</h3>
										<BootstrapWrapper>
											<div className="accordion tj-faq style-2" id="serviceFaq">
												{currentItem.faqs.map((faq, idx) => (
													<div className="accordion-item" key={idx}>
														<button
															className={`faq-title ${idx !== 0 ? "collapsed" : ""}`}
															type="button"
															data-bs-toggle="collapse"
															data-bs-target={`#faq-${idx}`}
															aria-expanded={idx === 0 ? "true" : "false"}
														>
															{faq.question}
														</button>
														<div
															id={`faq-${idx}`}
															className={`collapse ${idx === 0 ? "show" : ""}`}
															data-bs-parent="#serviceFaq"
														>
															<div className="accordion-body faq-text">
																<p>{faq.answer}</p>
															</div>
														</div>
													</div>
												))}
											</div>
										</BootstrapWrapper>
									</div>
								)}

								{/* CTA Button */}
								<div className="mt-5 wow fadeInUp" data-wow-delay=".3s">
									<Link href="/contact" className="tj-btn-primary">
										Get Started Now <i className="tji-arrow-right"></i>
									</Link>
								</div>
							</div>

							<div
								className="tj-post__navigation mb-0 wow fadeInUp"
								data-wow-delay="0.3s"
							>
								{/* <!-- previous post --> */}
								<div
									className="tj-nav__post previous"
									style={{ visibility: isPrevItem ? "visible" : "hidden" }}
								>
									<div className="tj-nav-post__nav prev_post">
										<Link href={isPrevItem ? `/services/${prevId}` : "#"}>
											<span>
												<i className="tji-arrow-left"></i>
											</span>
											Previous
										</Link>
									</div>
								</div>
								<Link href={"/services"} className="tj-nav-post__grid">
									<i className="tji-window"></i>
								</Link>
								{/* <!-- next post --> */}
								<div
									className="tj-nav__post next"
									style={{ visibility: isNextItem ? "visible" : "hidden" }}
								>
									<div className="tj-nav-post__nav next_post">
										<Link href={isNextItem ? `/services/${nextId}` : "#"}>
											Next
											<span>
												<i className="tji-arrow-right"></i>
											</span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-4">
						<aside className="tj-main-sidebar">
							{/* <!-- Service List with Pagination --> */}
							<div
								className="tj-sidebar-widget service-categories wow fadeInUp"
								data-wow-delay=".1s"
							>
								<h4 className="widget-title">More Services</h4>
								{(() => {
									const itemsPerPage = 5;
									const [currentPage, setCurrentPage] = useState(1);
									const allItems = items || [];
									const totalPages = Math.ceil(allItems.length / itemsPerPage);

									const currentItems = allItems.slice(
										(currentPage - 1) * itemsPerPage,
										currentPage * itemsPerPage
									);

									return (
										<>
											<ul>
												{currentItems.length > 0 ? (
													currentItems.map(({ shortTitle, id }, idx) => (
														<li key={idx}>
															<Link
																className={`${currentId === id ? "active" : ""}`}
																href={`/services/${id}`}
															>
																{shortTitle}
																<span className="icon">
																	<i className="tji-arrow-right"></i>
																</span>
															</Link>
														</li>
													))
												) : (
													<li>No items available</li>
												)}
											</ul>
											{totalPages > 1 && (
												<div className="pagination-controls d-flex justify-content-between mt-3 align-items-center">
													<button
														className="btn btn-sm btn-outline-light border-0"
														onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
														disabled={currentPage === 1}
														style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
													>
														<i className="tji-arrow-left"></i> Prev
													</button>
													<span className="text-muted small">
														{currentPage} / {totalPages}
													</span>
													<button
														className="btn btn-sm btn-outline-light border-0"
														onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
														disabled={currentPage === totalPages}
														style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
													>
														Next <i className="tji-arrow-right"></i>
													</button>
												</div>
											)}
										</>
									);
								})()}
							</div>

							{/* <!-- Service Categories Widget --> */}
							<div
								className="tj-sidebar-widget service-categories wow fadeInUp"
								data-wow-delay=".2s"
							>
								<h4 className="widget-title">Service Categories</h4>
								<ul>
									{serviceCategories?.map((category, idx) => (
										<li key={idx}>
											<a href="#" onClick={(e) => e.preventDefault()}>
												{category.name}
												<span className="icon">
													<i className="tji-arrow-right"></i>
												</span>
											</a>
										</li>
									))}
								</ul>
							</div>

							{/* <!-- cta --> */}
							<div
								className="tj-sidebar-widget widget-feature-item wow fadeInUp"
								data-wow-delay=".3s"
							>
								<CtaSidebar />
							</div>
						</aside>
					</div>
				</div >
			</div >
		</section >
	);
};

export default ServicesDetailsPrimary;
