import React from "react";

const BlogCardSkeleton = () => {
    return (
        <article className="blog-item skeleton-card">
            <div className="blog-thumb">
                <div className="blog-date-skeleton"></div>
            </div>
            <div className="blog-content">
                <div className="blog-meta-skeleton">
                    <span></span>
                    <span></span>
                </div>
                <div className="title-skeleton"></div>

                <div className="btn-skeleton"></div>
            </div>
        </article>
    );
};

export default BlogCardSkeleton;
