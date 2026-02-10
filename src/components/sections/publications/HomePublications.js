"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PublicationCard from "./PublicationsPageCard";

const HomePublications = () => {
    const [activeTab, setActiveTab] = useState("All");
    const [featuredIndex, setFeaturedIndex] = useState(0);

    const tabs = [
        "All",
        "Blogs",
        "White Papers",
        "Newsletters",
        "Case Studies",
        "Brochures"
    ];

    // Dummy data - aggregated for "All", filtered for others
    const dummyData = {
        Blogs: [
            {
                id: 1,
                title: "The Rise of Connected Supply Chains Across India and Africa",
                date: "15-Jan-2026",
                excerpt: "Discover how connected supply chains across India and Africa are revolutionizing logistics...",
                image: "/images/industries/supply-chain.jpg",
                link: "/blogs/supply-chain",
                author: "Sarah Jenkins",
                readTime: "5 min read"
            },
            {
                id: 2,
                title: "Dashboards for Impact: What the Government Must Know",
                date: "07-Jan-2026",
                excerpt: "Discover how government dashboards can power data-driven governance and decision making...",
                image: "/images/service/advanced-analytics.jpg",
                link: "/blogs/government-dashboards",
                author: "Michael Ross",
                readTime: "4 min read"
            },
            {
                id: 3,
                title: "What Enterprises Must Get Right on AI in 2026 and Beyond",
                date: "29-Dec-2025",
                excerpt: "Discover what enterprises must get right on AI in 2026 and beyond to stay competitive...",
                image: "/images/service/ai-agentic-solutions.jpg",
                link: "/blogs/ai-2026",
                author: "Tech Team",
                readTime: "6 min read"
            }
        ],
        "White Papers": [
            {
                id: 4,
                title: "Shockproofing the Tourism Economy Through Technology",
                date: "13-Jan-2025",
                excerpt: "Learn how technology boosts tourism with AI, analytics, and digital platforms...",
                image: "/images/industries/tourism/banner.jpg",
                link: "#",
                author: "Tourism Desk",
                readTime: "10 min read"
            },
            {
                id: 5,
                title: "Regulatory Frameworks for Digital Identity",
                date: "20-Sep-2024",
                excerpt: "Regulatory Frameworks for Digital Identity with Global Perspectives and Best Practices...",
                image: "/images/service/regulatory-compliance.jpg",
                link: "#",
                author: "Compliance Unit",
                readTime: "15 min read"
            },
            {
                id: 6,
                title: "Building a Secure Digital Space: A White paper on Data Protection",
                date: "19-Dec-2023",
                excerpt: "A profound understanding of the evolving threat landscape and the need for robust security...",
                image: "/images/service/security-assessment.jpg",
                link: "#",
                author: "Security Team",
                readTime: "12 min read"
            }
        ],
        "Newsletters": [
            {
                id: 7,
                title: "Synchronizing Flow: Supply Chain Updates",
                date: "Oct - Dec, 2025",
                excerpt: "Digitally synchronizing supply chains for transparent, trackable, and efficient operations...",
                image: "/images/industries/logistic.jpg",
                link: "#",
                author: "Logistics Team",
                readTime: "3 min read"
            },
            {
                id: 8,
                title: "AgriNext: Mapping the Future of Smart Agriculture",
                date: "Jul - Sep, 2025",
                excerpt: "Discover how data and AI are transforming agriculture, from farms to your table...",
                image: "/images/industries/manufacturing.jpg",
                link: "#",
                author: "Agri Team",
                readTime: "4 min read"
            },
            {
                id: 9,
                title: "From Plots to Platforms: Reinventing Land Records",
                date: "Apr - Jun, 2025",
                excerpt: "Digitizing land records to drive industrial growth and sustainable development...",
                image: "/images/service/enterprise-modernization..jpg",
                link: "#",
                author: "GovTech Team",
                readTime: "5 min read"
            }
        ],
        "Case Studies": [
            {
                id: 10,
                title: "Transforming Rural Banking with AI",
                date: "12-Nov-2025",
                excerpt: "How a leading rural bank increased efficiency by 40% using our AI solutions...",
                image: "/images/industries/banking/digital-banking-transformation.jpg",
                link: "#",
                author: "FinTech Team",
                readTime: "8 min read"
            },
            {
                id: 11,
                title: "Smart City Traffic Management System",
                date: "05-Oct-2025",
                excerpt: "Implementing IoT-based traffic solutions to reduce congestion in major metro areas...",
                image: "/images/industries/manufacturing/industrial-iot-monitoring-dashboard.jpg",
                link: "#",
                author: "Smart City Team",
                readTime: "7 min read"
            },
            {
                id: 12,
                title: "Cloud Migration for Healthcare Provider",
                date: "18-Aug-2025",
                excerpt: "Seamless migration of 10TB+ patient data to secure cloud infrastructure...",
                image: "/images/industries/health-care.jpg",
                link: "#",
                author: "Cloud Team",
                readTime: "6 min read"
            }
        ],
        "Brochures": [
            {
                id: 13,
                title: "Vision Analysis Tool Overview",
                date: "05-Nov-2025",
                excerpt: "AI platform turning visual data into real-time intelligence for security and operations...",
                image: "/images/product/iwac.jpg",
                link: "#",
                author: "Product Team",
                readTime: "2 min read"
            },
            {
                id: 14,
                title: "Unified Standard Portal Guide",
                date: "14-Aug-2025",
                excerpt: "Digitizing standardization process - Bringing every stakeholder on a single platform...",
                image: "/images/product/lexgen.jpg",
                link: "#",
                author: "Product Team",
                readTime: "2 min read"
            },
            {
                id: 15,
                title: "Integrated Land Management Information System",
                date: "13-Aug-2025",
                excerpt: "An integrated web and mobile GIS platform that digitizes, secures and manages land data...",
                image: "/images/product/ifin.jpg",
                link: "#",
                author: "Product Team",
                readTime: "2 min read"
            }
        ]
    };

    // Helper to get ALL items for the "All" tab
    const getAllItems = () => {
        let allItems = [];
        Object.keys(dummyData).forEach(key => {
            const itemsWithCategory = dummyData[key].map(item => ({ ...item, category: key }));
            allItems = [...allItems, ...itemsWithCategory];
        });
        // Sort by date equivalent (simplified for this dummy data, just taking the first 4 for now to mimic "Featured" + 3 list items)
        // In a real app, you would sort by actual date object.
        return allItems.slice(0, 4);
    };

    const allItems = getAllItems();
    const featuredItem = allItems[featuredIndex];
    // filter out the featured item for the list, limit to 3
    const listItems = allItems.filter((_, index) => index !== featuredIndex).slice(0, 3);

    // If we want the list to always be the index 0, 1, 2, 3 but just highlight different ones on left:
    // The requirement says: "Clicking a right item updates the featured card on the left"
    // So the list should probably STAY constant, but the featured one updates? 
    // OR does the list rotate?
    // "Right column ... vertical list of 3 compact publications ... Clicking a right item updates the featured card on the left"
    // Let's keep the list static for simplicity, and just allow clicking them to swap the featured view.
    // Actually, a better UX is if you click one, it becomes featured, and the previous featured one moves to the list?
    // No, standard tab behavior usually just updates the view.
    // Let's stick to: List shows items. Clicking one makes it the "Featured" item.
    // To make it simple: The "Featured" item is just `allItems[featuredIndex]`.
    // The "Right List" is `allItems` excluding the `featuredIndex`.

    const handleListClick = (originalIndex) => {
        setFeaturedIndex(originalIndex);
    }

    // For other tabs
    const activeData = activeTab === "All" ? [] : dummyData[activeTab];


    return (
        <section className="home-publications-section">
            <div className="container">
                {/* Header */}
                <div className="section-header">
                    <h2 className="section-title">Publications</h2>
                </div>

                {/* Tabs */}
                <div className="publications-tabs">
                    <ul className="nav nav-pills">
                        {tabs.map((tab) => (
                            <li className="nav-item" key={tab}>
                                <button
                                    className={`nav-link ${activeTab === tab ? "active" : ""}`}
                                    onClick={() => { setActiveTab(tab); setFeaturedIndex(0); }}
                                >
                                    {tab}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="tab-action">
                        <Link href="/publications" className="tj-primary-btn btn-lg">
                            <span className="btn-text">
                                <span>Explore All {activeTab === 'All' ? 'Publications' : activeTab}</span>
                            </span>
                            <span className="btn-icon">
                                <i className="tji-arrow-right-long"></i>
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Content */}
                <div className="tab-content">
                    {activeTab === "All" ? (
                        <div className="featured-layout-wrapper">
                            {/* Featured Hero */}
                            <div
                                className="featured-hero"
                                style={{ backgroundImage: `url(${featuredItem?.image || '/images/blog/blog-1.jpg'})` }}
                            >
                                <div className="hero-overlay">
                                    <div className="hero-content">
                                        <span className="category-badge">{featuredItem?.category || 'Blog'}</span>
                                        <h3>{featuredItem?.title}</h3>
                                        <div className="meta-info">
                                            <span>
                                                <i className="fa-regular fa-user"></i> {featuredItem?.author || 'Admin'}
                                            </span>
                                            <span>
                                                <i className="fa-regular fa-clock"></i> {featuredItem?.readTime || '5 min read'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="hero-nav">
                                    <button
                                        onClick={() => setFeaturedIndex(prev => prev > 0 ? prev - 1 : allItems.length - 1)}
                                        aria-label="Previous"
                                    >
                                        <i className="tji-arrow-left"></i>
                                    </button>
                                    <button
                                        onClick={() => setFeaturedIndex(prev => prev < allItems.length - 1 ? prev + 1 : 0)}
                                        aria-label="Next"
                                    >
                                        <i className="tji-arrow-right"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Compact List */}
                            <div className="compact-list">
                                {allItems.map((item, index) => {
                                    if (index === featuredIndex) return null; // Don't show the featured item in the list? 
                                    // The design usually implies a "Up next" or "More" list.
                                    // Let's show the top 3 items that AREN'T the featured one.

                                    return (
                                        <div
                                            key={item.id}
                                            className="list-item"
                                            onClick={() => setFeaturedIndex(index)}
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="item-image"
                                            />
                                            <div className="item-content">
                                                <span className="category-label">{item.category}</span>
                                                <h4>{item.title}</h4>
                                            </div>
                                        </div>
                                    )
                                }).slice(0, 3)}
                                {/* Slice applies to the result of map? No. Map returns array with nulls. */}
                                {/* Need to filter first. */}
                            </div>
                        </div>
                    ) : (
                        <div className="grid-layout-wrapper">
                            {activeData.map((item) => (
                                <PublicationCard
                                    key={item.id}
                                    image={item.image}
                                    title={item.title}
                                    date={item.date}
                                    excerpt={item.excerpt}
                                    link={item.link}
                                    type={activeTab} // Pass the type
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HomePublications;
