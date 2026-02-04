"use client";
import Link from "next/link";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const CsrProjects = ({ data }) => {
    return (
        <section className="csr-projects-section section-gap">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="sec-heading text-center">

                        
                            <p className="desc wow fadeInUp" data-wow-delay=".5s">
                                {data.desc}
                            </p>
                            <h3 className="sec-title uppercase">{data.title}</h3>
                            <p className="desc">{data.subtitle}</p>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        speed={1500}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            el: ".swiper-pagination-csr",
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                            },
                            992: {
                                slidesPerView: 3,
                            },
                            1200: {
                                slidesPerView: 4,
                            },
                        }}
                        modules={[Pagination, Autoplay]}
                        className="csr-slider"
                    >
                        {data.items.map((item, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="csr-project-card">
                                    <div className="image-wrapper">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                        />
                                        <div className="overlay"></div>
                                    </div>
                                    <div className="content">
                                        <h4 className="title">
                                            <Link href={item.link}>{item.title}</Link>
                                        </h4>
                                        <p className="desc">{item.desc}</p>
                                        {/* <Link href={item.link} className="btn-text">
                                            Read More <i className="fa-regular fa-arrow-right ms-1"></i>
                                        </Link> */}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                        <div className="swiper-pagination-csr text-center mt-4"></div>
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default CsrProjects;
