"use client";
import styles from "./PublicationsPage.module.css";
import PublicationCard from "./PublicationsPageCard";
import Link from "next/link";

const PublicationSections = () => {
    const tabs = [
        "Blogs",
        "White Papers",
        "Newsletters",
        "Case Studies",
        "Brochures"
    ];

    // Dummy data for example - replace with real data fetching later
    const dummyData = {
        Blogs: [
            {
                id: 1,
                title: "The Rise of Connected Supply Chains Across India and Africa",
                date: "15-Jan-2026",
                excerpt: "Discover how connected supply chains across India and Africa are revolutionizing logistics...",
                image: "/images/industries/supply-chain.jpg",
                link: "/blogs/supply-chain"
            },
            {
                id: 2,
                title: "Dashboards for Impact: What the Government Must Know",
                date: "07-Jan-2026",
                excerpt: "Discover how government dashboards can power data-driven governance and decision making...",
                image: "/images/service/advanced-analytics.jpg",
                link: "/blogs/government-dashboards"
            },
            {
                id: 3,
                title: "What Enterprises Must Get Right on AI in 2026 and Beyond",
                date: "29-Dec-2025",
                excerpt: "Discover what enterprises must get right on AI in 2026 and beyond to stay competitive...",
                image: "/images/service/ai-agentic-solutions.jpg",
                link: "/blogs/ai-2026"
            }
        ],
        "White Papers": [
            {
                id: 4,
                title: "Shockproofing the Tourism Economy Through Technology",
                date: "13-Jan-2025",
                excerpt: "Learn how technology boosts tourism with AI, analytics, and digital platforms...",
                image: "/images/industries/tourism/banner.jpg",
                link: "#"
            },
            {
                id: 5,
                title: "Regulatory Frameworks for Digital Identity",
                date: "20-Sep-2024",
                excerpt: "Regulatory Frameworks for Digital Identity with Global Perspectives and Best Practices...",
                image: "/images/service/regulatory-compliance.jpg",
                link: "#"
            },
            {
                id: 6,
                title: "Building a Secure Digital Space: A White paper on Data Protection",
                date: "19-Dec-2023",
                excerpt: "A profound understanding of the evolving threat landscape and the need for robust security...",
                image: "/images/service/security-assessment.jpg",
                link: "#"
            }
        ],
        "Newsletters": [
            {
                id: 7,
                title: "Synchronizing Flow: Supply Chain Updates",
                date: "Oct - Dec, 2025",
                excerpt: "Digitally synchronizing supply chains for transparent, trackable, and efficient operations...",
                image: "/images/industries/logistic.jpg",
                link: "#"
            },
            {
                id: 8,
                title: "AgriNext: Mapping the Future of Smart Agriculture",
                date: "Jul - Sep, 2025",
                excerpt: "Discover how data and AI are transforming agriculture, from farms to your table...",
                image: "/images/industries/manufacturing.jpg",
                link: "#"
            },
            {
                id: 9,
                title: "From Plots to Platforms: Reinventing Land Records",
                date: "Apr - Jun, 2025",
                excerpt: "Digitizing land records to drive industrial growth and sustainable development...",
                image: "/images/service/enterprise-modernization..jpg",
                link: "#"
            }
        ],
        "Case Studies": [
            {
                id: 10,
                title: "Transforming Rural Banking with AI",
                date: "12-Nov-2025",
                excerpt: "How a leading rural bank increased efficiency by 40% using our AI solutions...",
                image: "/images/industries/banking/digital-banking-transformation.jpg",
                link: "#"
            },
            {
                id: 11,
                title: "Smart City Traffic Management System",
                date: "05-Oct-2025",
                excerpt: "Implementing IoT-based traffic solutions to reduce congestion in major metro areas...",
                image: "/images/industries/manufacturing/industrial-iot-monitoring-dashboard.jpg",
                link: "#"
            },
            {
                id: 12,
                title: "Cloud Migration for Healthcare Provider",
                date: "18-Aug-2025",
                excerpt: "Seamless migration of 10TB+ patient data to secure cloud infrastructure...",
                image: "/images/industries/health-care.jpg",
                link: "#"
            }
        ],
        "Brochures": [
            {
                id: 13,
                title: "Vision Analysis Tool Overview",
                date: "05-Nov-2025",
                excerpt: "AI platform turning visual data into real-time intelligence for security and operations...",
                image: "/images/product/iwac.jpg",
                link: "#"
            },
            {
                id: 14,
                title: "Unified Standard Portal Guide",
                date: "14-Aug-2025",
                excerpt: "Digitizing standardization process - Bringing every stakeholder on a single platform...",
                image: "/images/product/lexgen.jpg",
                link: "#"
            },
            {
                id: 15,
                title: "Integrated Land Management Information System",
                date: "13-Aug-2025",
                excerpt: "An integrated web and mobile GIS platform that digitizes, secures and manages land data...",
                image: "/images/product/ifin.jpg",
                link: "#"
            }
        ]
    };

    return (
        <section className={styles.section}>
            <div className="container">
                {tabs.map((category) => (
                    <div key={category} className={styles.sectionBlock}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>{category}</h2>
                            <Link href="#" className={styles.viewAllBtn}>
                                View All
                            </Link>
                        </div>

                        <div className={styles.grid}>
                            {dummyData[category]?.map((item) => (
                                <PublicationCard
                                    key={item.id}
                                    image={item.image}
                                    title={item.title}
                                    date={item.date}
                                    excerpt={item.excerpt}
                                    link={item.link}
                                    type={category}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PublicationSections;
