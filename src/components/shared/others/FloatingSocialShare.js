"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
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
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const search = searchParams?.toString() || "";

	useEffect(() => {
		if (typeof window === "undefined") return;
		const pageUrl = `${window.location.origin}${pathname || ""}${
			search ? `?${search}` : ""
		}`;
		const pageTitle = document.title;
		setShareItems(buildShareItems(pageUrl, pageTitle));
	}, [pathname, search]);

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
		<div className="floating-social-share" aria-label="Social links">
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
		</div>
	);
};

export default FloatingSocialShare;
