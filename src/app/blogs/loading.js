"use client";
import React from "react";
import BlogCardSkeleton from "@/components/shared/blogs/BlogCardSkeleton";

const Loading = () => {
    return (
        <div>
            {/* 0. BlogHeroEnterprise Skeleton */}
            <section style={{ backgroundColor: '#050a1e', padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    {/* Breadcrumb Skeleton */}
                    <div className="d-flex gap-2 align-items-center mb-4">
                        <div className="skeleton" style={{ width: 50, height: 14, backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                        <div style={{ color: 'rgba(255,255,255,0.1)' }}>&gt;</div>
                        <div className="skeleton" style={{ width: 60, height: 14, backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                        <div style={{ color: 'rgba(255,255,255,0.1)' }}>&gt;</div>
                        <div className="skeleton" style={{ width: 100, height: 14, backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                    </div>

                    {/* Title Skeleton */}
                    <div className="skeleton mb-4" style={{ width: '60%', height: 60, backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                </div>

                {/* Zig Zag Strip Skeleton */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, width: '100%', height: 20,
                    background: 'linear-gradient(to right, #FF9F00, #FF0000, #800080, #0000FF)',
                    opacity: 0.5
                }}></div>
            </section>


            {/* 1. Hero Skeleton : Matches LatestBlogHero.js */}
            <section className="position-relative overflow-hidden w-100" style={{ backgroundColor: "#009ca6", padding: "80px 0" }}>
                <div
                    className="d-none d-lg-block position-absolute"
                    style={{
                        top: 0,
                        left: 0,
                        width: "35%",
                        height: "100%",
                        backgroundColor: "#f59c1a",
                        clipPath: "polygon(0 0, 100% 0, 75% 100%, 0% 100%)",
                        zIndex: 1
                    }}
                />

                <div className="container position-relative" style={{ zIndex: 2 }}>
                    <div className="row align-items-center">
                        {/* Image Column Skeleton */}
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <div className="position-relative rounded overflow-hidden shadow-lg skeleton" style={{ height: "400px", width: "100%", border: "4px solid rgba(255,255,255,0.2)" }}></div>
                        </div>

                        {/* Content Column Skeleton */}
                        <div className="col-lg-6 ps-lg-5 text-white">
                            {/* Meta Skeleton */}
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <div className="skeleton" style={{ width: 100, height: 16, backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
                                <div className="skeleton" style={{ width: 80, height: 16, backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
                                <div className="skeleton" style={{ width: 120, height: 16, backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
                            </div>

                            {/* Title Skeleton */}
                            <div className="skeleton mb-3" style={{ width: '90%', height: 40, backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
                            <div className="skeleton mb-3" style={{ width: '60%', height: 40, backgroundColor: 'rgba(255,255,255,0.2)' }}></div>

                            {/* Author Skeleton */}
                            <div className="skeleton mb-4" style={{ width: 150, height: 20, backgroundColor: 'rgba(255,255,255,0.2)' }}></div>

                            {/* Excerpt Skeleton */}
                            <div className="mb-5">
                                <div className="skeleton mb-2" style={{ width: '100%', height: 16, backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
                                <div className="skeleton mb-2" style={{ width: '100%', height: 16, backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
                                <div className="skeleton mb-2" style={{ width: '80%', height: 16, backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
                            </div>

                            {/* Button Skeleton */}
                            <div className="skeleton" style={{ width: 200, height: 50, backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="tj-blog-section section-gap pt-4">
                <div className="container">
                    {/* 2. Filter Skeleton : Matches BlogFilter.js */}
                    <div className="row mb-4 align-items-center mt-5">
                        <div className="col-lg-4 mb-3 mb-lg-0">
                            <div className="skeleton" style={{ width: 200, height: 32 }}></div>
                        </div>
                        <div className="col-lg-8">
                            <div className="d-flex gap-3 justify-content-lg-end align-items-center flex-wrap">
                                {/* Category Select Skeleton */}
                                <div className="position-relative" style={{ minWidth: "200px" }}>
                                    <div className="skeleton" style={{ width: "100%", height: 40 }}></div>
                                </div>
                                {/* Author Select Skeleton */}
                                <div className="position-relative" style={{ minWidth: "150px" }}>
                                    <div className="skeleton" style={{ width: "100%", height: 40 }}></div>
                                </div>
                                {/* Button Skeleton */}
                                <div className="skeleton" style={{ width: 160, height: 40, borderRadius: 4 }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-12">
                            <hr className="light-separator" style={{ borderColor: 'rgba(0,0,0,0.1)', margin: 0 }} />
                        </div>
                    </div>

                    {/* 3. Grid Skeleton */}
                    <div className="row row-gap-4">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="col-md-6 col-lg-4">
                                <BlogCardSkeleton />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Loading;
