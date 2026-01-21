import makePath from "@/libs/makePath";
import modifyNumber from "@/libs/modifyNumber";
import sliceText from "@/libs/sliceText";
import Image from "next/image";
import Link from "next/link";
import ButtonPrimary from "../buttons/ButtonPrimary";

const BlogCard2 = ({ blog, idx }) => {
	const { title, featuredImage, id, category, author, day, month } = blog || {};

	return (
		<div className="blog-item style-2">
			<div className="blog-thumb">
				<Link href={`/blogs/${id}`}>
					<Image
						src={featuredImage || "/images/blog/blogs-backdrop.jpg"}
						alt={title || "Blog Image"}
						width={870}
						height={450}
						unoptimized={true}
						style={{ objectFit: "cover" }}
					/>
				</Link>
				<div className="blog-date">
					<span className="date">{modifyNumber(day)}</span>
					<span className="month">{month}</span>
				</div>
			</div>
			<div className="blog-content">
				<div className="title-area">
					<div className="blog-meta">
						<span className="categories">
							<Link href={`/blogs?category=${makePath(category)}`}>
								{category}
							</Link>
						</span>
						<span>
							By <Link href={`/blogs/${id}`}>{author || "enfycon"}</Link>
						</span>
					</div>
					<h4 className="title">
						<Link href={`/blogs/${id}`}>{sliceText(title, 45, true)}</Link>
					</h4>
				</div>
				<ButtonPrimary
					text={"Read More"}
					url={`/blogs/${id}`}
					isTextBtn={true}
				/>
			</div>
		</div>
	);
};

export default BlogCard2;

