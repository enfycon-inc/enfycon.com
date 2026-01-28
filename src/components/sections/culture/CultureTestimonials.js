"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// Testimonial data
const testimonialData = [
    {
        id: 1,
        quote: "Joining Enfycon was the best decision of my career.",
        content: "The culture of innovation and collaboration here is incredible. Every day I'm surrounded by talented people who push me to grow. The leadership truly cares about our development and wellbeing.",
        name: "Priya Sharma",
        role: "Senior Software Engineer",
        team: "Engineering",
        location: "Bangalore",
        image: "/images/culture/steptodown.com222737.jpg"
    },
    {
        id: 2,
        quote: "A workplace where your voice truly matters.",
        content: "I've never felt more valued and heard in my professional life. The open communication culture and the emphasis on work-life balance have made this more than just a job—it's a community.",
        name: "Rajesh Kumar",
        role: "Product Manager",
        team: "Product",
        location: "Mumbai",
        image: "/images/culture/steptodown.com262912.jpg"
    },
    {
        id: 3,
        quote: "Innovation meets inclusivity at Enfycon.",
        content: "The diversity of thought and backgrounds here drives amazing solutions. Leadership encourages experimentation and supports us when we take risks. It's empowering to work somewhere that invests in your ideas.",
        name: "Anita Desai",
        role: "UX Design Lead",
        team: "Design",
        location: "Delhi",
        image: "/images/culture/steptodown.com882339.jpg"
    }
];

const CultureTestimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        import("wow.js").then(({ default: WOW }) => {
            new WOW().init();
        });
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonialData.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonialData.length) % testimonialData.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") prevSlide();
            if (e.key === "ArrowRight") nextSlide();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    if (!isClient) return null;

    const currentTestimonial = testimonialData[currentSlide];

    return (
        <section className="culture-testimonials">
            <div className="culture-testimonials__container">
                <div className="culture-testimonials__slider">
                    {/* Navigation Arrows */}
                    <button
                        className="culture-testimonials__arrow culture-testimonials__arrow--prev"
                        onClick={prevSlide}
                        aria-label="Previous testimonial"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <button
                        className="culture-testimonials__arrow culture-testimonials__arrow--next"
                        onClick={nextSlide}
                        aria-label="Next testimonial"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* Two-column layout */}
                    <div className="culture-testimonials__content-wrapper">
                        {/* Left: Testimonial Content */}
                        <div className="culture-testimonials__content">


                            {/* Main quote */}
                            {/* Main quote */}
                            <div className="d-flex">
                                <div className="quote-icon me-3 mt-2">
                                    <i className="tji-quote" style={{ fontSize: "40px", color: "var(--tj-color-theme-primary)", transform: "rotate(180deg)", display: "inline-block" }}></i>
                                </div>
                                <div className="testimonial-content-wrapper">
                                    <h3 className="culture-testimonials__quote mb-3">
                                        {currentTestimonial.quote}
                                    </h3>
                                    <p className="culture-testimonials__text mb-4">
                                        {currentTestimonial.content}
                                    </p>
                                    <div className="culture-testimonials__author">
                                        <p className="culture-testimonials__author-name">
                                            {currentTestimonial.name}
                                        </p>
                                        <p className="culture-testimonials__author-meta">
                                            {currentTestimonial.role} • {currentTestimonial.team} • {currentTestimonial.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Portrait Image */}
                        <div className="culture-testimonials__image-wrapper">
                            <div className="culture-testimonials__image-container">
                                <Image
                                    src={currentTestimonial.image}
                                    alt={currentTestimonial.name}
                                    width={900}
                                    height={1200}
                                    className="culture-testimonials__image"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="culture-testimonials__dots">
                        {testimonialData.map((_, index) => (
                            <button
                                key={index}
                                className={`culture-testimonials__dot ${index === currentSlide ? "culture-testimonials__dot--active" : ""
                                    }`}
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CultureTestimonials;
