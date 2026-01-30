import { getCategoryCounts } from "@/libs/wpBlogs";
import makePath from "@/libs/makePath";
import modifyNumber from "@/libs/modifyNumber";
import Link from "next/link";

const BlogCategoriesWidget = async () => {
	// Fetch data directly on the server
	const categories = await getCategoryCounts();

	return (
		<div className="tj-sidebar-widget widget-categories">
			<h4 className="widget-title">Categories</h4>
			<ul>
				{categories?.length > 0 ? (
					categories.map((cat, idx) => (
						<li key={idx}>
							<Link href={`/blogs?category=${cat.slug}`}>
								{cat.name}{" "}
								<span className="number">({modifyNumber(cat.count)})</span>
							</Link>
						</li>
					))
				) : (
					<li>No categories found</li>
				)}
			</ul>
		</div>
	);
};

export default BlogCategoriesWidget;
