
import Image from "next/image";
import Link from "next/link";
import sliceText from "@/libs/sliceText";
import modifyNumber from "@/libs/modifyNumber";
const formatExcerpt = (text) => {
    if (!text) return "";
    // Remove bracketed ellipsis
    let clean = text.replace(/\[\s*(?:\.{3}|…|&hellip;)\s*\]/g, "");
    // Strip HTML tags to process plain text
    clean = clean.replace(/<[^>]+>/g, "");

    // Set a reasonable limit roughly 2 lines of text
    const limit = 200;

    // If text is within limit, we still want to ensure it doesn't end abruptly 
    // (e.g. if WP cut it without correct punctuation)
    // So we apply the same logic unless it already ends in punctuation.
    const isUnderLimit = clean.length <= limit;
    const workingText = isUnderLimit ? clean : clean.substring(0, limit);

    const lastPunc = Math.max(workingText.lastIndexOf('.'), workingText.lastIndexOf('!'), workingText.lastIndexOf('?'));

    if (lastPunc !== -1) {
        return workingText.substring(0, lastPunc + 1);
    }

    // Fallback: if no punctuation found (rare), just return specific chars with ellipsis
    return isUnderLimit ? workingText : workingText + "...";
};


const LatestBlogHero = ({ post }) => {
    if (!post) return null;

    const {
        title,
        excerpt,
        slug,
        date,
        featuredImage,
        categories,
        author,
    } = post;

    const postDate = new Date(date);
    const formattedDate = `${modifyNumber(postDate.getDate())} ${postDate.toLocaleString("en-US", { month: "short" })}, ${postDate.getFullYear()}`;
    const categoryName = categories?.nodes[0]?.name || "Uncategorized";
    const authorName = author?.node?.name || "Enfycon";
    // Hardcoded read time for now as API doesn't support it yet
    const readTime = "4 Mins Read";

    return (
        <section className="position-relative overflow-hidden w-100" style={{ backgroundColor: "#009ca6", padding: "80px 0" }}>
            {/* Orange Accent Shape - Left */}
            <div
                className="d-none d-lg-block position-absolute"
                style={{
                    top: 0,
                    left: 0,
                    width: "35%",
                    height: "100%",
                    backgroundColor: "#f59c1a",
                    clipPath: "polygon(0 0, 100% 0, 75% 100%, 0% 100%)",
                    zIndex: 1
                }}
            />

            <div className="container position-relative" style={{ zIndex: 2 }}>
                <div className="row align-items-center">
                    {/* Image Column */}
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <div className="position-relative rounded overflow-hidden shadow-lg" style={{ height: "400px", width: "100%", border: "4px solid rgba(255,255,255,0.2)" }}>
                            <Image
                                src={featuredImage?.node?.sourceUrl || "/images/blog/blogs-backdrop.jpg"}
                                alt={title || "Latest Blog"}
                                fill
                                style={{ objectFit: "cover" }}
                                unoptimized={true}
                                priority
                            />
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="col-lg-6 ps-lg-5 text-white">
                        <div className="d-flex align-items-center  small mb-3 fw-bold" style={{ fontSize: "0.8rem", letterSpacing: "1px", opacity: 0.9 }}>
                            <span>{categoryName}</span>
                            <span className="mx-2">•</span>
                            <span>{readTime}</span>
                            <span className="mx-2">•</span>
                            <span>{formattedDate}</span>
                        </div>

                        <h1 className="h2 fw-bold mb-3 text-white">
                            <Link href={`/blogs/${slug}`} className="text-white text-decoration-none">
                                {sliceText(title, 150, true)}
                            </Link>
                        </h1>

                        <div className="mb-4 text-uppercase small fw-bold" style={{ letterSpacing: "1px", opacity: 0.8 }}>
                            Author: {authorName}
                        </div>

                        <div className="mb-5 text-white" style={{ fontSize: "1rem", opacity: 0.9 }}>
                            <div dangerouslySetInnerHTML={{ __html: formatExcerpt(excerpt) }} />
                        </div>

                        <Link
                            href={`/blogs/${slug}`}
                            className="btn btn-lg rounded-0 px-4 py-3 fw-bold"
                            style={{
                                backgroundColor: "#2d3e50",
                                color: "#fff",
                                fontSize: "0.9rem",
                                letterSpacing: "1px",
                                border: "none"
                            }}
                        >
                            VIEW FULL BLOG
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestBlogHero;
