"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { footerData } from "@/data/footerData";
import { usePathname } from "next/navigation";
import getNavItems from "@/libs/getNavItems";

const CollapsibleFooterWidget = ({ title, children, id }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			const mobile = window.innerWidth < 992;
			setIsMobile(mobile);
			if (!mobile) setIsOpen(true);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const toggle = () => {
		if (isMobile) setIsOpen(!isOpen);
	};

	return (
		<div className={`footer-widget-v2 ${isMobile ? "mobile-accordion" : ""}`} id={`footer-widget-${id}`}>
			<div
				className={`widget-header ${isMobile ? "clickable" : ""} ${isOpen ? "is-open" : ""}`}
				onClick={toggle}
				role={isMobile ? "button" : undefined}
				aria-expanded={isMobile ? isOpen : undefined}
			>
				<h5 className="widget-title">{title}</h5>
				{isMobile && (
					<span className="toggle-icon">
						<i className="fa-solid fa-chevron-down"></i>
					</span>
				)}
			</div>
			<div className={`widget-content ${isOpen ? "expanded" : "collapsed"}`}>
				{children}
			</div>
		</div>
	);
};

const Footer2 = () => {
	const pathname = usePathname();
	const navItems = getNavItems();
	const servicesNav = navItems.find((item) => item.id === 3);
	const industriesNav = navItems.find((item) => item.id === 4);
	const productsNav = navItems.find((item) => item.id === 5);

	const isActive = (path) => pathname === path;

	return (
		<footer className="tj-footer-section footer-2-v2">
			<div className="container">
				<div className="footer-top-v2">
					<div className="row">
						{/* Logo & Tagline Area */}
						<div className="col-lg-4 col-md-12">
							<div className="footer-brand">
								<Link href="/" className="footer-logo">
									<img src="/images/logos/enfycon-white.png" alt="enfycon" />
								</Link>
								<p className="footer-tagline">
									{footerData.contactInfo.description}
								</p>
							</div>
						</div>

						{/* Links Area */}
						<div className="col-lg-8 col-md-12">
							<div className="row g-0 g-lg-4">
								<div className="col-lg-3 col-md-12">
									<CollapsibleFooterWidget title="Industries" id="industries">
										<ul className="footer-links">
											{industriesNav?.submenu?.map((item, index) => (
												<li key={index}>
													<Link href={item.path || "/"} className={isActive(item.path) ? "active" : ""}>
														{item.name}
													</Link>
												</li>
											))}
										</ul>
									</CollapsibleFooterWidget>
								</div>

								<div className="col-lg-3 col-md-12">
									<CollapsibleFooterWidget title="Products" id="products">
										<ul className="footer-links">
											{productsNav?.submenu?.map((item, index) => (
												<li key={index}>
													<Link href={item.path || "/"} className={isActive(item.path) ? "active" : ""}>
														{item.name}
													</Link>
												</li>
											))}
										</ul>
									</CollapsibleFooterWidget>
								</div>

								<div className="col-lg-3 col-md-12">
									<CollapsibleFooterWidget title="Services" id="services">
										<ul className="footer-links">
											{servicesNav?.submenu?.map((item, index) => (
												<li key={index}>
													<Link href={item.path || "/"} className={isActive(item.path) ? "active" : ""}>
														{item.name}
													</Link>
												</li>
											))}
										</ul>
									</CollapsibleFooterWidget>
								</div>

								<div className="col-lg-3 col-md-12">
									<CollapsibleFooterWidget title="About Us" id="about">
										<ul className="footer-links">
											{footerData.about.map((item, index) => (
												<li key={index}>
													<Link href={item.link} className={isActive(item.link) ? "active" : ""}>
														{item.label}
													</Link>
												</li>
											))}
										</ul>
									</CollapsibleFooterWidget>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="footer-middle-v2">
					<div className="row align-items-center">
						<div className="col-lg-6 col-md-12">
							{/* Contact Info Widget (Collapsible on mobile) */}
							<CollapsibleFooterWidget title="Contact Information" id="contact">
								<div className="footer-contact-v2">
									<div className="contact-item">
										<i className="fa-solid fa-location-dot"></i>
										<span>{footerData.contactInfo.address}</span>
									</div>
									<div className="contact-item">
										<a href={`tel:${footerData.contactInfo.phone}`}>
											<i className="fa-solid fa-phone"></i>
											<span>{footerData.contactInfo.phone}</span>
										</a>
									</div>
									<div className="contact-item">
										<a href={`mailto:${footerData.contactInfo.email}`}>
											<i className="fa-solid fa-envelope"></i>
											<span>{footerData.contactInfo.email}</span>
										</a>
									</div>
								</div>
							</CollapsibleFooterWidget>
						</div>
						<div className="col-lg-6 col-md-12">
							<div className="footer-social-v2">
								<h6 className="social-title d-none d-lg-block">Connect With Us</h6>
								<div className="social-icons-v2">
									{footerData.socialLinks.map((social, index) => (
										<Link key={index} href={social.link} target="_blank" aria-label="Social link">
											<i className={social.icon}></i>
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="footer-bottom-v2">
					<div className="footer-legal-v2">
						<p className="copyright">
							&copy; {new Date().getFullYear()} Enfycon. All Rights Reserved.
						</p>
						<div className="legal-links">
							<Link href="/privacy-policy">Privacy Policy</Link>
							<Link href="/terms-and-conditions">Terms & Conditions</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer2;
