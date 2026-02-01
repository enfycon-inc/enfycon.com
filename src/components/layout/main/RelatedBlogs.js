
import BlogCard2 from "@/components/shared/cards/BlogCard2";

const RelatedBlogs = ({ blogs }) => {
    if (!blogs || blogs.length === 0) return null;

    return (
        <section className="related-blogs-section section-gap-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-header">
                            <h3 className="section-title">Related Blogs</h3>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {blogs.map((blog, index) => (
                        <div key={blog.id} className="col-lg-4 col-md-6 mb-4">
                            <BlogCard2 blog={blog} idx={index} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RelatedBlogs;
