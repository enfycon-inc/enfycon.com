import siteConfig from "@/config/siteConfig";

export const footerData = {
    socialLinks: [
        { icon: "fa-brands fa-linkedin-in", link: siteConfig.socialLinks.linkedin },
        { icon: "fa-brands fa-facebook-f", link: siteConfig.socialLinks.facebook },
        { icon: "fa-brands fa-x-twitter", link: siteConfig.socialLinks.twitter },
        { icon: "fa-brands fa-youtube", link: siteConfig.socialLinks.youtube },
        { icon: "fa-brands fa-instagram", link: siteConfig.socialLinks.instagram },
    ],
    services: [
        { label: "AI & Allied Services", link: "/services/ai-allied-services" },
        { label: "IT Professional Staffing", link: "/services/it-professional-staffing" },
        { label: "Data & Analytics", link: "/services/data-analytics" },
        { label: "Cybersecurity Services", link: "/services/cybersecurity-services" },
    ],
    about: [
        { label: "Overview", link: "/about" },
        { label: "Leaders & Advisors", link: "/team" },
        { label: "Newsroom", link: "/blogs" },
        { label: "Testimonials", link: "/testimonials" },
        // { label: "History", link: "/history" },
        // { label: "Awards & Recognitions", link: "#" },
        // { label: "Philosophy", link: "#" },
        // { label: "Quality", link: "#" },
        // { label: "Code of Ethics", link: "#" },
        // { label: "Social Responsibility", link: "#" },
    ],
    products: [
        { label: "iCognito.ai", link: "#" },
        { label: "iDental.ai", link: "#" },
        { label: "lexGenie.ai", link: "#" },
        { label: "quantfin.ai", link: "#" },
        { label: "PerformanceEdge.ai", link: "#" },
        { label: "iWac.ai", link: "#" },
    ],
    otherLinks: [
        { label: "Contact Us", link: "/contact" },
        { label: "Feedback", link: "#" },
        { label: "Career", link: "/careers" },
        // { label: "Recruitment Fraud Alert", link: "#" },
        { label: "Privacy Policy", link: "/terms-and-conditions" },
        // { label: "Cookie Policy", link: "/terms-and-conditions" },
        { label: "Terms of use", link: "/terms-and-conditions" },
        // { label: "Disclaimer", link: "#" },
        // { label: "Brand Name Disclaimer", link: "#" },
        // { label: "Media Kit", link: "#" },
    ],
    contactInfo: {
        description: "Accelerating your digital future with AI-driven innovation and engineering excellence.",
        address: "3921 Long Prairie Road, Building 5, Flower Mound, TX 75028, United States",
        phone: "+1 201.201.7078",
        email: "office@enfycon.com"
    }
};
