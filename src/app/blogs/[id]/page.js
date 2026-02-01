import BlogDetailsMain from "@/components/layout/main/BlogDetailsMain";
import { getAllBlogs, getBlogBySlug, getRelatedPosts } from "@/libs/wpBlogs";
import { notFound } from "next/navigation";

export default async function BlogDetails({ params }) {
	const { id } = await params;
	const post = await getBlogBySlug(id);

	if (!post) {
		notFound();
	}

	const relatedPosts = await getRelatedPosts(post.categorySlug, post.id);

	return (
		<BlogDetailsMain post={post} relatedPosts={relatedPosts} />
	);
}

export async function generateMetadata({ params }) {
	const { id } = await params;
	const post = await getBlogBySlug(id);

	if (!post) {
		return {
			title: "Blog Not Found | enfycon",
			description: "The requested blog post could not be found.",
		};
	}

	return {
		title: `${post.title} | enfycon`,
		description: post.desc || post.title,
		openGraph: {
			title: post.title,
			description: post.desc,
			images: post.featuredImage ? [post.featuredImage] : [],
		},
	};
}

export async function generateStaticParams() {
	try {
		const items = await getAllBlogs();
		return items?.map(({ id }) => ({ id: id.toString() })) || [];
	} catch (error) {
		console.error("Error generating static params for blogs:", error);
		return [];
	}
}

