// Global site configuration
export const siteConfig = {
    // Contact Information
    phone: {
        display: "+1 201.201.7078",
        link: "+12012017078", // Format for tel: links (no dots/dashes)
    },

    // Company Information
    company: {
        name: "enfycon Inc",
        tagline: "AI-Driven Digital Transformation",
    },

    // Social Media & Contact
    email: "office@enfycon.com",
    socialLinks: {
        linkedin: "https://www.linkedin.com/company/enfycon-inc/",
        instagram: "https://www.instagram.com/enfycon.inc",
        twitter: "https://x.com/EnfyconInc",
        facebook: "https://www.facebook.com/", // Placeholder
        youtube: "https://www.youtube.com/" // Placeholder
    },

    // Operating Regions
    regions: ["USA", "India", "UAE"],

    // API Configuration
    blogApiUrl: (process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://wp.enfycon.com").replace(/\/$/, ""),
};

export default siteConfig;
