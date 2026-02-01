import BlogDetailsPrimary from "@/components/sections/blogs/BlogDetailsPrimary";
import BlogHeroEnterprise from "@/components/sections/blogs/BlogHeroEnterprise";
import getPreviousNextItem from "@/libs/getPreviousNextItem";
import { getAllBlogs } from "@/libs/wpBlogs";

import RelatedBlogs from "./RelatedBlogs";

const BlogDetailsMain = async ({ post, relatedPosts }) => {
	const items = await getAllBlogs();
	const option = getPreviousNextItem(items, post.id);

	return (
		<div>
			<BlogHeroEnterprise post={post} />
			<BlogDetailsPrimary post={post} option={option} relatedPosts={relatedPosts} />
			{/* <RelatedBlogs blogs={relatedPosts} /> */}
		</div>
	);
};

export default BlogDetailsMain;
