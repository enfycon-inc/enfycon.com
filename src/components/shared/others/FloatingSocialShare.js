"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import siteConfig from "@/config/siteConfig";

const buildShareItems = (pageUrl, pageTitle) => {
	const encodedUrl = encodeURIComponent(pageUrl);
	const encodedTitle = encodeURIComponent(pageTitle || "");

	return [
		{
			label: "LinkedIn",
			icon: "fa-brands fa-linkedin-in",
			href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
		},
		{
			label: "X (Twitter)",
			icon: "fa-brands fa-x-twitter",
			href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
		},
		{
			label: "Facebook",
			icon: "fa-brands fa-facebook-f",
			href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
		},
		{
			label: "WhatsApp",
			icon: "fa-brands fa-whatsapp",
			href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
		},
	];
};

const FloatingSocialShare = () => {
	const [shareItems, setShareItems] = useState([]);
	const [isExpanded, setIsExpanded] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const updateShareItems = () => {
			if (typeof window === "undefined") return;
			const pageUrl = window.location.href;
			const pageTitle = document.title;
			setShareItems(buildShareItems(pageUrl, pageTitle));
		};

		updateShareItems();
		window.addEventListener("popstate", updateShareItems);
		window.addEventListener("hashchange", updateShareItems);

		return () => {
			window.removeEventListener("popstate", updateShareItems);
			window.removeEventListener("hashchange", updateShareItems);
		};
	}, [pathname]);

	const items = [
		{
			label: "Call us",
			icon: "fa-solid fa-phone",
			href: siteConfig.phone?.link ? `tel:${siteConfig.phone.link}` : "",
			action: "call",
		},
		...shareItems.map((item) => ({
			...item,
			action: "share",
		})),
	].filter((item) => item.href);

	if (!items.length) {
		return null;
	}

	return (
		<div
			className={`floating-social-share ${isExpanded ? "is-open" : "is-collapsed"}`}
			aria-label="Social links"
		>
			<div className="social-links style-3">
				<ul>
					{items.map((item) => {
						if (item.action === "call") {
							return (
								<li key={item.label}>
									<a href={item.href} aria-label="Call us" title="Call us">
										<i className={item.icon}></i>
									</a>
								</li>
							);
						}

						return (
							<li key={item.label}>
								<a
									href={item.href}
									aria-label={`share on ${item.label}`}
									title={`share on ${item.label}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className={item.icon}></i>
								</a>
							</li>
						);
					})}
				</ul>
			</div>
			<button
				type="button"
				className="floating-social-share__toggle"
				onClick={() => setIsExpanded((prev) => !prev)}
				aria-label={isExpanded ? "Hide share options" : "Show share options"}
				title={isExpanded ? "Hide share options" : "Show share options"}
			>
				<i className={isExpanded ? "fa-solid fa-xmark" : "fa-solid fa-share-nodes"}></i>
			</button>
		</div>
	);
};

export default FloatingSocialShare;
