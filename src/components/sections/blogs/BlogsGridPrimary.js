"use client";
import BlogCard1 from "@/components/shared/cards/BlogCard1";
import Paginations from "@/components/shared/others/Paginations";
import BlogSidebar from "@/components/shared/sidebar/BlogSidebar";
import usePagination from "@/hooks/usePagination";
import { getAllBlogs } from "@/libs/wpBlogs";
import { useEffect, useState } from "react";
import { useLoading } from "@/components/shared/others/LoadingProvider";

const BlogsGridPrimary = ({ isSidebar = false }) => {
	const [allItems, setAllItems] = useState([]);
	const { isLoading, setLoading } = useLoading();
	const limit = 6;

	useEffect(() => {
		let fetchTimer;
		const fetchBlogs = async () => {
			setLoading(true);
			try {
				const blogs = await getAllBlogs();
				setAllItems(blogs);
			} catch (error) {
				console.error("Error fetching grid blogs:", error);
			} finally {
				// Prevent flickering by ensuring loader shows for at least 800ms
				fetchTimer = setTimeout(() => {
					setLoading(false);
				}, 800);
			}
		};
		fetchBlogs();

		return () => {
			if (fetchTimer) clearTimeout(fetchTimer);
			setLoading(false);
		};
	}, []);

	// get pagination details
	const {
		currentItems,
		currentpage,
		setCurrentpage,
		paginationItems,
		currentPaginationItems,
		totalPages,
		handleCurrentPage,
		firstItem,
		lastItem,
	} = usePagination(allItems, limit);

	const totalItems = allItems?.length;
	const totalItemsToShow = currentItems?.length;

	useEffect(() => {
		setCurrentpage(0);
	}, [totalItems]);

	if (isLoading) {
		return null;
	}

	return (
		<section className="tj-blog-section section-gap">
			<div className="container">
				<div className="row row-gap-5">
					<div className={isSidebar ? "col-lg-8" : "col-lg-12"}>
						<div className="row row-gap-4">
							{currentItems?.length
								? currentItems?.map((blog, idx) => (
									<div
										key={idx}
										className={`col-md-6 ${isSidebar ? "" : "col-xl-4"}`}
									>
										<BlogCard1 blog={blog} idx={idx} />
									</div>
								))
								: ""}
						</div>
						<Paginations
							paginationDetails={{
								currentItems,
								currentpage,
								setCurrentpage,
								paginationItems,
								currentPaginationItems,
								totalPages,
								handleCurrentPage,
								firstItem,
								lastItem,
							}}
							type={isSidebar ? 2 : 1}
						/>
					</div>
					{isSidebar ? (
						<div className="col-lg-4">
							<BlogSidebar type={2} />
						</div>
					) : (
						""
					)}
				</div>
			</div>
		</section>
	);
};

export default BlogsGridPrimary;
