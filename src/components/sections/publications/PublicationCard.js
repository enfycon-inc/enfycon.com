"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Publications.module.css";

const PublicationCard = ({
    title,
    date,
    excerpt,
    image,
    link = "#",
    type = "Blog"
}) => {
    const [isShareOpen, setIsShareOpen] = useState(false);

    const toggleShare = () => {
        setIsShareOpen(!isShareOpen);
    };

    const shareLinks = [
        { icon: "fa-brands fa-x-twitter", class: "twitter", url: "#" },
        { icon: "fa-brands fa-facebook-f", class: "facebook", url: "#" },
        { icon: "fa-brands fa-whatsapp", class: "whatsapp", url: "#" },
        { icon: "fa-brands fa-linkedin-in", class: "linkedin", url: "#" },
    ];

    return (
        <div className={styles.card}>
            <div className={styles.cardImageWrapper}>
                <Link href={link}>
                    <Image
                        src={image || "/images/blog/blog-1.jpg"} // Fallback image
                        alt={title}
                        fill
                        className={styles.cardImage}
                    />
                </Link>
            </div>

            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>
                    <Link href={link}>{title}</Link>
                </h3>

                <span className={styles.cardDate}>{date}</span>

                <p className={styles.cardExcerpt}>
                    {excerpt}
                </p>

                <div className={styles.cardFooter}>
                    <Link href={link} className={styles.readMore}>
                        Read More <i className="flaticon-right-arrow"></i>
                    </Link>

                    <div className={styles.shareWrapper}>
                        <div className={`${styles.shareMenu} ${isShareOpen ? styles.open : ""}`}>
                            {shareLinks.map((social, index) => (
                                <Link key={index} href={social.url} className={`${styles.shareIconItem} ${styles[social.class]}`}>
                                    <i className={social.icon}></i>
                                </Link>
                            ))}
                        </div>
                        <button
                            className={styles.shareBtn}
                            aria-label="Share"
                            onClick={toggleShare}
                        >
                            <i className="fa-solid fa-share-nodes"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicationCard;
