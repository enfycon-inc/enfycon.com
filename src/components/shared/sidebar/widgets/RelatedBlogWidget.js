import sliceText from "@/libs/sliceText";
import modifyNumber from "@/libs/modifyNumber";
import Image from "next/image";
import Link from "next/link";

const RelatedBlogWidget = ({ posts }) => {
    if (!posts || posts.length === 0) return null;

    return (
        <div className="tj-sidebar-widget tj-recent-posts">
            <h4 className="widget-title">Related Blogs</h4>
            <ul>
                {posts.map((post, idx) => (
                    <li key={post.id || idx}>
                        <div className="post-thumb">
                            <Link href={`/blogs/${post.id}`}>
                                <Image
                                    src={post.featuredImage || "/images/blog/blogs-backdrop.jpg"}
                                    alt={post.title || "Blog Image"}
                                    width={150}
                                    height={150}
                                    unoptimized={true}
                                />
                            </Link>
                        </div>

                        <div className="post-content">
                            <h6 className="post-title">
                                <Link href={`/blogs/${post.id}`}>
                                    {sliceText(post.title, 32, true)}
                                </Link>
                            </h6>
                            <div className="blog-meta">
                                <ul>
                                    <li>
                                        {modifyNumber(post.day)} {post.month} {post.year}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RelatedBlogWidget;
