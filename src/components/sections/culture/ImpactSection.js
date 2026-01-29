"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const ImpactSection = ({ imageSrc, title, texts, buttonText, buttonLink, backgroundColor = "linear-gradient(to right, #aa600bff, #5A1CB5)", type = "left-img" }) => {
    return (
        <section className="impact-section" style={{ background: backgroundColor }}>
            <div className="container-fluid p-0">
                <div className="row g-0">
                    {/* Image Column */}
                    <div className={`col-lg-6 order-2 ${type === 'right-img' ? 'order-lg-2 impact-col-right' : 'order-lg-1 impact-col-left'} d-flex align-items-center justify-content-center`} style={{ background: 'transparent' }}>
                        <div className={`impact-image position-relative wow ${type === 'right-img' ? 'fadeInRight impact-image-right' : 'fadeInLeft'}`} data-wow-delay=".3s">
                            <Image
                                src={imageSrc}
                                alt="Impact and Culture"
                                fill
                                className="img-fluid"
                            />
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className={`col-lg-6 order-1 ${type === 'right-img' ? 'order-lg-1' : 'order-lg-2'}`}>
                        <div
                            className="impact-content h-100 d-flex flex-column justify-content-center"
                            style={{ background: 'transparent' }}
                        >
                            <div className="content-wrapper">
                                <h2
                                    className="mb-4 title-anim"
                                >
                                    {title}
                                </h2>
                                {texts && texts.map((text, index) => (
                                    <p
                                        key={index}
                                        className="mb-4 wow fadeInUp"
                                        data-wow-delay={`.${3 + index}s`}
                                    >
                                        {text}
                                    </p>
                                ))}

                                <Link
                                    href={buttonLink}
                                    className="btn bg-white text-dark fw-bold px-4 py-3 btn-custom wow fadeInUp"
                                    data-wow-delay={`.${3 + (texts ? texts.length : 0)}s`}
                                >
                                    {buttonText}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImpactSection;
