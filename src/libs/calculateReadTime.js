const calculateReadTime = (content) => {
    if (!content) return 0;
    // Strip HTML tags for more accurate word count
    const cleanContent = content.replace(/<[^>]*>/g, '');
    const wordsPerMinute = 200;
    const wordCount = cleanContent.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime > 0 ? readTime : 1;
};

export default calculateReadTime;
