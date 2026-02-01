"use client";
import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import BlogFilter from "./BlogFilter";
import BlogFeed from "./BlogFeed";
import BlogCardSkeleton from "@/components/shared/blogs/BlogCardSkeleton";

const BlogContentWrapper = ({
    categories,
    authors,
    initialCategory,
    initialAuthor,
    initialPosts,
    initialPageInfo
}) => {
    const router = useRouter();
    const [isFiltering, setIsFiltering] = useState(false);

    // We can track if props changed to stop loading
    useEffect(() => {
        setIsFiltering(false);
    }, [initialPosts]); // When new posts arrive (via server refresh), stop loading

    const onFilter = (category, author) => {
        setIsFiltering(true);
        const params = new URLSearchParams();
        if (category) params.set("category", category);
        if (author) params.set("author", author);

        const queryString = params.toString();
        const url = queryString ? `/blogs?${queryString}` : "/blogs";

        // Perform the navigation
        // router.push and refresh are actions that eventually update the Server Component
        router.push(url, { scroll: false });
        router.refresh();
    };

    return (
        <>
            <BlogFilter
                categories={categories}
                authors={authors}
                initialCategory={initialCategory}
                initialAuthor={initialAuthor}
                onFilter={onFilter} // Pass the handler
                isParentLoading={isFiltering}
            />



            {isFiltering ? (
                <div className="row row-gap-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="col-md-6 col-lg-4">
                            <BlogCardSkeleton />
                        </div>
                    ))}
                </div>
            ) : (
                <BlogFeed
                    initialPosts={initialPosts}
                    initialPageInfo={initialPageInfo}
                    category={initialCategory}
                />
            )}
        </>
    );
};

export default BlogContentWrapper;
