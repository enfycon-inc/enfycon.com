import Link from "next/link";
import Image from "next/image";
import styles from "./blog-hero-enterprise.module.scss";
import calculateReadTime from "@/libs/calculateReadTime";

const BlogHeroEnterprise = ({ post, customTitle, breadcrumbOverride, backgroundOverride }) => {
    // If post is provided, extract data from it.
    // If not, we expect customTitle/breadcrumbOverride for the "listing" mode.
    const { title: postTitle, date, day, month, year, readTime, author, authorSlug, category, categorySlug, featuredImage, avatar, content } = post || {};

    const isListingMode = !post;
    const title = customTitle || postTitle;

    // Format date if day/month/year provided, else fallback to date string
    const formattedDate = day && month && year ? `${day} ${month}, ${year}` : date;

    const bgImage = backgroundOverride || featuredImage || '/images/bg/service-banner.jpg';

    return (
        <section
            className={styles.heroSection}
            style={{
                "--hero-bg-image": `url(${bgImage})`
            }}
        >
            <div className={styles.container + " container"}>
                {/* Breadcrumb */}
                <div className={styles.breadcrumb}>
                    <Link href="/">Home</Link>
                    <span className={styles.separator}>&gt;</span>
                    <Link href="/blogs">Blogs</Link>

                    {/* Listing Mode: Custom Breadcrumbs Logic could go here, but for now we trust the override or build it simply */}
                    {breadcrumbOverride ? (
                        <>
                            {breadcrumbOverride}
                        </>
                    ) : (
                        <>
                            <span className={styles.separator}>&gt;</span>
                            {category && (
                                <>
                                    <Link href={`/blogs?category=${categorySlug}`}>{category}</Link>
                                    <span className={styles.separator}>&gt;</span>
                                </>
                            )}
                            {/* Truncate title in breadcrumb if too long */}
                            <span className={styles.current}>
                                {title?.length > 40 ? title.substring(0, 40) + "..." : title}
                            </span>
                        </>
                    )}
                </div>

                {/* Title */}
                <h1 className={styles.title}>{title}</h1>

                {/* Meta Info - Only show if NOT in listing mode or if we have post data */}
                {!isListingMode && (
                    <div className={styles.metaRow}>

                        {/* Author */}
                        <div className={styles.metaItem}>
                            <span>By</span>
                            {avatar && (
                                <div className={styles.authorImage}>
                                    <Image
                                        src={avatar}
                                        alt={author}
                                        width={30}
                                        height={30}
                                        className={styles.avatar}
                                    />
                                </div>
                            )}
                            <Link href={`/blogs?author=${authorSlug || author}`} className={styles.authorLink}>{author || "Enfycon"}</Link>
                        </div>

                        <div className={styles.separator}></div>

                        {/* Category */}
                        <div className={styles.metaItem}>
                            <Link href={`/blogs?category=${categorySlug}`} className={styles.categoryLink}>{category || "Insights"}</Link>
                        </div>

                        <div className={styles.separator}></div>

                        {/* Date */}
                        {formattedDate && (
                            <div className={styles.metaItem}>
                                <i className="flaticon-calendar"></i>
                                <span>{formattedDate}</span>
                            </div>
                        )}

                        <div className={styles.separator}></div>

                        {/* Read Time */}
                        <div className={styles.metaItem}>
                            <i className="flaticon-clock"></i>
                            <span>{readTime || (content ? `${calculateReadTime(content)} mins` : "4 mins")} Read</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Zig Zag Strip */}
            <div className={styles.zigzagStrip}></div>
        </section>
    );
};

export default BlogHeroEnterprise;
