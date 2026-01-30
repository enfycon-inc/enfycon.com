"use client";

import { useState } from "react";
import BlogCard1 from "@/components/shared/cards/BlogCard1";

const LoadMorePosts = ({ initialPosts, initialPageInfo }) => {
    const [posts, setPosts] = useState(initialPosts);
    const [pageInfo, setPageInfo] = useState(initialPageInfo);
    const [loading, setLoading] = useState(false);

    // Helper to map graphQL nodes to BlogCard1 expected format
    const mapPostToCard = (node) => {
        const date = new Date(node.date);
        return {
            id: node.slug,
            featuredImage: node.featuredImage?.node?.sourceUrl || null,
            title: node.title || "",
            desc: node.excerpt || "",
            author: node.author?.node?.name || "enfycon",
            day: date.getDate(),
            month: date.toLocaleString("en-US", { month: "short" }),
            year: date.getFullYear(),
            category: node.categories?.nodes[0]?.name || "Technology",
        };
    };

    const loadMore = async () => {
        if (loading || !pageInfo.hasNextPage) return;

        setLoading(true);
        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    after: pageInfo.endCursor,
                }),
            });

            const data = await res.json();

            if (data.posts) {
                const newPosts = data.posts.edges.map((edge) => mapPostToCard(edge.node));
                setPosts((prev) => [...prev, ...newPosts]);
                setPageInfo(data.posts.pageInfo);
            }
        } catch (error) {
            console.error("Error loading more posts:", error);
        } finally {
            setLoading(false);
        }
    };

    // Convert initial posts which might be in edges format or already mapped?
    // The server component will likely pass mapped posts, let's assume it passes raw edges to keep it consistent or mapped?
    // Let's assume the server passes mapped posts and raw pageInfo.

    return (
        <>
            <div className="row row-gap-4">
                {posts.map((blog, idx) => (
                    <div key={idx} className="col-md-6 col-lg-4">
                        <BlogCard1 blog={blog} idx={idx} />
                    </div>
                ))}
            </div>

            {pageInfo.hasNextPage && (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tj-pagination-box text-center mt-4">
                            <button
                                className="tj-btn-primary"
                                onClick={loadMore}
                                disabled={loading}
                                style={{ cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
                            >
                                {loading ? "Loading..." : "Load More"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoadMorePosts;
