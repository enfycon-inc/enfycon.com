"use client";
import React from "react";


// Since we can't easily reuse the real BlogSidebar in a "loading" state without props, 
// we'll build a visual approximation for the skeleton.

const Loading = () => {
    return (
        <div>
            {/* 0. BlogHeroEnterprise Skeleton (Copied from blogs/loading.js for consistency) */}
            <section style={{ backgroundColor: '#050a1e', padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    {/* Breadcrumb Skeleton */}
                    <div className="d-flex gap-2 align-items-center mb-4">
                        <div className="skeleton" style={{ width: 50, height: 14, backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                        <div style={{ color: 'rgba(255,255,255,0.1)' }}>&gt;</div>
                        <div className="skeleton" style={{ width: 60, height: 14, backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                        <div style={{ color: 'rgba(255,255,255,0.1)' }}>&gt;</div>
                        <div className="skeleton" style={{ width: 150, height: 14, backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                    </div>

                    {/* Title Skeleton */}
                    <div className="skeleton mb-4" style={{ width: '80%', height: 50, backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                    <div className="skeleton mb-5" style={{ width: '60%', height: 50, backgroundColor: 'rgba(255,255,255,0.1)' }}></div>

                    {/* Meta Row Skeleton */}
                    <div className="d-flex gap-4 align-items-center">
                        <div className="skeleton" style={{ width: 120, height: 20, backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                        <div className="skeleton" style={{ width: 100, height: 20, backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                        <div className="skeleton" style={{ width: 100, height: 20, backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                    </div>
                </div>

                {/* Zig Zag Strip Skeleton */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, width: '100%', height: 20,
                    background: 'linear-gradient(to right, #FF9F00, #FF0000, #800080, #0000FF)',
                    opacity: 0.5
                }}></div>
            </section>


            {/* 1. Blog Details Content Skeleton */}
            <section className="tj-blog-section section-gap">
                <div className="container">
                    <div className="row row-gap-5">
                        {/* Main Content Column */}
                        <div className="col-lg-8">
                            <div className="post-details-wrapper">
                                {/* TOC Skeleton */}
                                {/* TOC Skeleton */}
                                <div className="mb-5 p-4" style={{ backgroundColor: '#f9f9f9', borderRadius: 8 }}>
                                    {/* Header */}
                                    <div className="d-flex align-items-center gap-2 mb-4">
                                        <div className="skeleton light" style={{ width: 20, height: 20 }}></div>
                                        <div className="skeleton light" style={{ width: 140, height: 24 }}></div>
                                    </div>
                                    {/* List Items */}
                                    <div className="d-flex flex-column gap-3">
                                        <div className="skeleton light" style={{ width: '85%', height: 16 }}></div>
                                        <div className="skeleton light" style={{ width: '90%', height: 16, marginLeft: 20 }}></div>
                                        <div className="skeleton light" style={{ width: '80%', height: 16, marginLeft: 20 }}></div>
                                        <div className="skeleton light" style={{ width: '75%', height: 16 }}></div>
                                        <div className="skeleton light" style={{ width: '85%', height: 16, marginLeft: 20 }}></div>
                                    </div>
                                </div>

                                {/* Text Paragraph Skeletons */}
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="mb-4">
                                        <div className="skeleton light mb-2" style={{ width: '100%', height: 16 }}></div>
                                        <div className="skeleton light mb-2" style={{ width: '98%', height: 16 }}></div>
                                        <div className="skeleton light mb-2" style={{ width: '95%', height: 16 }}></div>
                                        <div className="skeleton light mb-2" style={{ width: '90%', height: 16 }}></div>
                                        <div className="skeleton light mb-2" style={{ width: '60%', height: 16 }}></div>
                                    </div>
                                ))}

                                {/* Image Skeleton */}
                                <div className="skeleton light mb-4" style={{ width: '100%', height: 400, borderRadius: 8 }}></div>

                                {/* More Text */}
                                <div className="mb-4">
                                    <div className="skeleton light mb-2" style={{ width: '100%', height: 16 }}></div>
                                    <div className="skeleton light mb-2" style={{ width: '96%', height: 16 }}></div>
                                    <div className="skeleton light mb-2" style={{ width: '92%', height: 16 }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="col-lg-4">
                            <aside className="tj-main-sidebar">
                                {/* Search Skeleton */}
                                <div className="tj-sidebar-widget widget-search mb-4">
                                    <div className="skeleton light mb-3" style={{ width: 100, height: 24 }}></div>
                                    <div className="skeleton light" style={{ width: '100%', height: 50, borderRadius: 4 }}></div>
                                </div>

                                {/* Recent Posts Skeleton */}
                                <div className="tj-sidebar-widget mb-4">
                                    <div className="skeleton light mb-3" style={{ width: 150, height: 24 }}></div>
                                    <div className="d-flex gap-3 mb-3">
                                        <div className="skeleton light" style={{ minWidth: 80, height: 80, borderRadius: 4 }}></div>
                                        <div>
                                            <div className="skeleton light mb-2" style={{ width: 150, height: 14 }}></div>
                                            <div className="skeleton light" style={{ width: 100, height: 14 }}></div>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-3 mb-3">
                                        <div className="skeleton light" style={{ minWidth: 80, height: 80, borderRadius: 4 }}></div>
                                        <div>
                                            <div className="skeleton light mb-2" style={{ width: 150, height: 14 }}></div>
                                            <div className="skeleton light" style={{ width: 100, height: 14 }}></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Categories Skeleton */}
                                <div className="tj-sidebar-widget">
                                    <div className="skeleton light mb-3" style={{ width: 120, height: 24 }}></div>
                                    <div className="skeleton light mb-2" style={{ width: '100%', height: 40 }}></div>
                                    <div className="skeleton light mb-2" style={{ width: '100%', height: 40 }}></div>
                                    <div className="skeleton light mb-2" style={{ width: '100%', height: 40 }}></div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Loading;
