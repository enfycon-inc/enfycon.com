import Footer from "@/components/layout/footer/Footer";
import Footer2 from "@/components/layout/footer/Footer2";
import Header from "@/components/layout/header/Header";
import BlogDetailsMain from "@/components/layout/main/BlogDetailsMain";
import Cta from "@/components/sections/cta/Cta";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { getAllBlogs, getBlogBySlug } from "@/libs/wpBlogs";
import { notFound } from "next/navigation";

export default async function BlogDetails({ params }) {
	const { id } = await params;
	console.log("SERVER LOG: inner ID", id);
	const post = await getBlogBySlug(id);
	console.log("SERVER LOG: inner post found", !!post);

	if (!post) {
		console.log("SERVER LOG: inner post 404");
		notFound();
	}

	return (
		<div>
			<BackToTop />
			<Header />
			<main>
				<BlogDetailsMain post={post} />
			</main>
			<Footer2 />
			<ClientWrapper />
		</div>
	);
}

export async function generateStaticParams() {
	const items = await getAllBlogs();
	return items?.map(({ id }) => ({ id: id.toString() }));
}

