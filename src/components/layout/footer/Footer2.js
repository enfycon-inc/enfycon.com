"use client";
import Link from "next/link";
import { industriesData } from "@/data/industriesData";
import { footerData } from "@/data/footerData";
import { usePathname } from "next/navigation";
import getNavItems from "@/libs/getNavItems";

const Footer2 = () => {
	const pathname = usePathname();
	const navItems = getNavItems();
	const servicesNav = navItems.find((item) => item.id === 3);
	const industriesNav = navItems.find((item) => item.id === 4);
	const productsNav = navItems.find((item) => item.id === 5);

	// Helper to determine if a link is active
	const isActive = (path) => pathname === path;

	return (
		<footer className="tj-footer-section footer-2">
			<div className="container">
				{/* Main Footer Area */}
				<div className="footer-main-area">
					<div className="row justify-content-between">
						{/* Col 1: Contact & Info (Left Side) */}
						<div className="col-xl-3 col-lg-4 col-md-6">
							<div className="footer-widget footer-col-1">
								<div className="logo-area mb-4">
									<Link href="/">
										<img src="/images/logos/enfycon-white.png" alt="Logos" />
									</Link>
								</div>
								<p className="desc mb-4">
									{footerData.contactInfo.description}
								</p>

								<div className="footer-contact-info">
									<h5 className="title">Contact Us</h5>
									<p className="address mb-3">{footerData.contactInfo.address}</p>
									<ul className="list-unstyled">
										<li className="mb-2">
											<a href={`tel:${footerData.contactInfo.phone}`}>
												<i className="fa-solid fa-phone me-2"></i>
												{footerData.contactInfo.phone}
											</a>
										</li>
										<li className="mb-4">
											<a href={`mailto:${footerData.contactInfo.email}`}>
												<i className="fa-solid fa-envelope me-2"></i>
												{footerData.contactInfo.email}
											</a>
										</li>
									</ul>
								</div>


							</div>
						</div>

						{/* Col 2: Industries */}
						<div className="col-xl-auto col-lg-auto col-md-6">
							<div className="footer-widget widget-nav-menu">
								<h5 className="title">Industries</h5>
								<ul>
									{industriesNav?.submenu?.map((industry, index) => (
										<li key={index}>
											<Link
												href={industry.path || "/"}
												className={isActive(industry.path) ? "active" : ""}
											>
												{industry.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
							{/* Col 4: Products */}
						<div className="col-xl-auto col-lg-auto col-md-6">
							<div className="footer-widget widget-nav-menu">
								<h5 className="title">Products</h5>
								<ul>
									{productsNav?.submenu?.map((product, index) => (
										<li key={index}>
											<Link
												href={product.path || "/"}
												className={isActive(product.path) ? "active" : ""}
											>
												{product.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Col 3: Services */}
						<div className="col-xl-auto col-lg-auto col-md-6">
							<div className="footer-widget widget-nav-menu">
								<h5 className="title">Services</h5>
								<ul>
									{servicesNav?.submenu?.map((category, index) => (
										<li key={index}>
											<Link
												href="/services"
												className={isActive("/services") ? "active" : ""}
											>
												{category.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>

					

						{/* Col 5: About & Other (Combined to save space if needed, or kept separate) */}
						<div className="col-xl-auto col-lg-auto col-md-6">
							<div className="footer-widget widget-nav-menu mb-4">
								<h5 className="title">About Us</h5>
								<ul>
									{footerData.about.map((item, index) => (
										<li key={index}>
											<Link
												href={item.link}
												className={isActive(item.link) ? "active" : ""}
											>
												{item.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>

				{/* Copyright - kept simple */}
				<div className="tj-copyright-area-2" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
					<div className="row">
						<div className="col-12">
							<div className="copyright-content-area d-flex flex-wrap justify-content-between align-items-center">
								<div className="copyright-text">
									<p className="mb-0">
										&copy; {new Date().getFullYear()} <Link href="#" target="_blank"> enfycon</Link>. All Rights Reserved.
									</p>
								</div>
								<div className="social-icons">
									{footerData.socialLinks.map((social, index) => (
										<Link key={index} href={social.link} target="_blank" className="mx-2 social-icon-link">
											<i className={social.icon}></i>
										</Link>
									))}
								</div>
								<div className="copyright-menu">
									<ul className="d-flex list-unstyled m-0 gap-3 align-items-center">
										<li>
											<Link href="/privacy-policy" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', hover: 'rgba(29, 60, 235, 1)' }}>Privacy Policy</Link>
										</li>
										<li>
											<Link href="/terms-and-conditions" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', hover: 'rgba(29, 60, 235, 1)' }}>Terms & Condition</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer2;
