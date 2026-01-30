
const { getBlogBySlug } = require('./src/libs/wpBlogs');
const { siteConfig } = require('./src/config/siteConfig');

// Mock fetch for node environment if needed, but next.js usually polyfills it.
// We might need to run this with 'node' which doesn't have fetch by default in older versions,
// but let's assume node 18+.

(async () => {
    try {
        console.log("Testing slug fetch...");
        const slug = "the-rise-of-connected-supply-chains-across-india-and-africa";
        const post = await getBlogBySlug(slug);
        console.log("Result:", post ? "Found" : "Null");
        if (post) console.log("Title:", post.title);
    } catch (e) {
        console.error("Error:", e);
    }
})();
