"use client";
import { getAllBlogs } from "@/libs/wpBlogs";
import sliceText from "@/libs/sliceText";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const RecentBlogWidget = () => {
	const [recentBlogs, setRecentBlogs] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRecent = async () => {
			try {
				const blogs = await getAllBlogs();
				setRecentBlogs(blogs.slice(0, 5));
			} catch (error) {
				console.error("Error fetching recent blogs:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchRecent();
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<div className="tj-sidebar-widget tj-recent-posts">
			<h4 className="widget-title">Recent Posts</h4>
			<ul>
				{recentBlogs?.length
					? recentBlogs?.map(({ id, featuredImage, title, day, month, year }, idx) => (
						<li key={idx}>
							<div className="post-thumb">
								<Link href={`/blogs/${id}`}>
									{" "}
									<Image
										src={featuredImage || "/images/blog/blogs-backdrop.jpg"}
										alt="Blog"
										width={150}
										height={150}
										unoptimized={true}
									/>

								</Link>
							</div>

							<div className="post-content">
								<h6 className="post-title">
									<Link href={`/blogs/${id}`}>
										{sliceText(title, 32, true)}
									</Link>
								</h6>
								<div className="blog-meta">
									<ul>
										<li>
											{day} {month} {year}
										</li>
									</ul>
								</div>
							</div>
						</li>
					))
					: ""}
			</ul>
		</div>
	);
};

export default RecentBlogWidget;

