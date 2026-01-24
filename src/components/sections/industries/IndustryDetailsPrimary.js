"use client";

import BootstrapWrapper from "@/components/shared/wrappers/BootstrapWrapper";

import Link from "next/link";
import { useState } from "react";
import CtaSidebar from "../cta/CtaSidebar";

const IndustryDetailsPrimary = ({ option }) => {
    const {
        currentItem,
        items,
        currentId,
        isPrevItem,
        isNextItem,
        prevId,
        nextId,
    } = option || {};
    const { title, desc, image } = currentItem || {};

    return (
        <section className="tj-service-area section-gap" id="industry-details">
            <div className="container">
                <div className="row row-gap-5">
                    <div className="col-lg-8">
                        <div className="post-details-wrapper">
                            <h2 className="title title-anim">
                                {title}
                            </h2>
                            <div className="blog-text">
                                {/* Industry Description */}
                                <div className="service-section wow fadeInUp" data-wow-delay=".3s">
                                    {desc && (
                                        <p className="mb-4">{desc}</p>
                                    )}
                                </div>
                            </div>



                            {/* Challenges Section */}
                            {currentItem.challenges && (
                                <div className="industry-challenges-section mt-5 wow fadeInUp" data-wow-delay=".3s">
                                    <h3 className="section-title text-primary mb-4">Common Challenges in {title}</h3>
                                    <div className="industry-benefits-grid">
                                        {currentItem.challenges.map((challenge, idx) => (
                                            <div className="industry-benefit-card" key={idx}>
                                                <div className="icon">
                                                    <i className={challenge.icon}></i>
                                                </div>
                                                <div className="content">
                                                    <h5 className="title">{challenge.title}</h5>
                                                    <p>{challenge.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Key Benefits Section */}
                            {currentItem.benefits && (
                                <div className="industry-benefits-section mt-5 wow fadeInUp" data-wow-delay=".3s">
                                    <h3 className="section-title text-primary mb-4">Key Benefits of AI in {title}</h3>
                                    <div className="industry-benefits-grid">
                                        {currentItem.benefits.map((benefit, idx) => (
                                            <div className="industry-benefit-card" key={idx}>
                                                <div className="icon">
                                                    <i className={benefit.icon}></i>
                                                </div>
                                                <div className="content">
                                                    <h5 className="title">{benefit.title}</h5>
                                                    <p>{benefit.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Use Cases Section */}
                            {currentItem.useCases && (
                                <div className="industry-use-cases-section mt-5 wow fadeInUp" data-wow-delay=".3s">
                                    <h3 className="section-title text-primary mb-4">High-Impact AI Use Cases in {title}</h3>
                                    <div className="industry-use-cases-grid">
                                        {currentItem.useCases.map((useCase, idx) => (
                                            <div className="industry-use-case-card" key={idx}>
                                                <div className="icon">
                                                    <i className={useCase.icon}></i>
                                                </div>
                                                <div className="content">
                                                    <h5 className="title">{useCase.title}</h5>
                                                    <p>{useCase.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Process Section */}
                            {currentItem.process && (
                                <div className="industry-process-section mt-5 wow fadeInUp" data-wow-delay=".3s">
                                    <h3 className="section-title text-primary mb-4">Our Process To Success</h3>
                                    <div className="industry-benefits-grid">
                                        {currentItem.process.map((step, idx) => (
                                            <div className="industry-benefit-card" key={idx}>
                                                <div className="icon">
                                                    <i className={step.icon}></i>
                                                </div>
                                                <div className="content">
                                                    <h5 className="title">{step.title}</h5>
                                                    <p>{step.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* The Edge Section */}
                            {currentItem.edge && (
                                <div className="industry-edge-section mt-5 wow fadeInUp" data-wow-delay=".3s">
                                    <h3 className="section-title text-primary mb-4">The enfycon Edge</h3>
                                    <ul className="industry-edge-list">
                                        {currentItem.edge.map((item, idx) => (
                                            <li key={idx}>
                                                <i className="tji-check"></i>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* CTA Section */}
                            {currentItem.cta && (
                                <div className="industry-cta-box mt-5 wow fadeInUp" data-wow-delay=".3s">
                                    <h3 className="title text-primary">{currentItem.cta.title}</h3>
                                    <p className="desc">{currentItem.cta.desc}</p>
                                    <Link href={currentItem.cta.buttonLink} className="tj-btn-primary">
                                        {currentItem.cta.buttonText} <i className="tji-arrow-right"></i>
                                    </Link>
                                </div>
                            )}

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
                                        <Link href={isPrevItem ? `/industries/${prevId}` : "#"}>
                                            <span>
                                                <i className="tji-arrow-left"></i>
                                            </span>
                                            Previous
                                        </Link>
                                    </div>
                                </div>
                                <Link href={"/industries"} className="tj-nav-post__grid">
                                    <i className="tji-window"></i>
                                </Link>
                                {/* <!-- next post --> */}
                                <div
                                    className="tj-nav__post next"
                                    style={{ visibility: isNextItem ? "visible" : "hidden" }}
                                >
                                    <div className="tj-nav-post__nav next_post">
                                        <Link href={isNextItem ? `/industries/${nextId}` : "#"}>
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
                            {/* <!-- Industries List --> */}
                            <div
                                className="tj-sidebar-widget service-categories wow fadeInUp"
                                data-wow-delay=".1s"
                            >
                                <h4 className="widget-title">More Industries</h4>
                                {(() => {
                                    const itemsPerPage = 10; // Show more for industries as list is small
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
                                                    currentItems.map(({ title: shortTitle, id }, idx) => (
                                                        <li key={idx}>
                                                            <Link
                                                                className={`${currentId === id ? "active" : ""}`}
                                                                href={`/industries/${id}`}
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
                                        </>
                                    );
                                })()}
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

export default IndustryDetailsPrimary;
