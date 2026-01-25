import { ScrollSmoother } from "@/libs/gsap.config";
import { usePathname, useRouter } from "next/navigation";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import useActiveLink from "@/hooks/useActiveLink";
import getNavItems from "@/libs/getNavItems";
import Image from "next/image";
import Link from "next/link";

const Navbar = ({ headerType, isStickyHeader }) => {
	const pathname = usePathname();
	const router = useRouter();
	const makeActiveLink = useActiveLink();
	const navItems = getNavItems();
	const homeNav = makeActiveLink(navItems[0]);
	const pagesNav = makeActiveLink(navItems[1]);
	const serviceNav = makeActiveLink(navItems[2]);
	const industriesNav = makeActiveLink(navItems[3]);
	const blogsNav = makeActiveLink(navItems[4]);
	const aboutNav = makeActiveLink(navItems[5]);
	const contactNav = makeActiveLink(navItems[6]);

	const handleScroll = (e, href) => {
		e.preventDefault();
		const [path, hash] = href.split("#");

		if (pathname === path) {
			const target = document.getElementById(hash);
			const smoother = ScrollSmoother.get();
			if (smoother && target) {
				smoother.scrollTo(target, true, "top 100");
			}
		} else {
			router.push(href);
		}
	};

	return (
		<div className="menu-area d-none d-lg-inline-flex align-items-center">
			<nav id="mobile-menu" className="mainmenu">
				<ul>
					<li
						className={` ${homeNav?.isActive ? "current-menu-ancestor" : ""
							}`}
					>
						<Link href="/">
							{homeNav?.name}
						</Link>
					</li>
					<li
						className={`has-dropdown ${pagesNav?.isActive ? "current-menu-ancestor" : ""
							}`}
					>
						<Link href={pagesNav?.path}>{pagesNav?.name}</Link>
						<ul className="sub-menu header__mega-menu mega-menu mega-menu-pages">
							<li>
								<div className="mega-menu-wrapper">
									{pagesNav?.submenu?.length
										? pagesNav?.submenu?.map((pageItem, idx) => (
											<div key={idx} className="mega-menu-pages-single">
												<div className="mega-menu-pages-single-inner">
													<h6 className="mega-menu-title">
														{pageItem?.name}
													</h6>
													<div className="mega-menu-list">
														{pageItem?.items?.length
															? pageItem?.items?.map((item, idx2) => (
																<Link
																	key={100 + idx2}
																	href={item?.path ? item?.path : "/"}
																	className={item?.isActive ? "active" : ""}
																>
																	{item?.name}
																	{item?.badge ? (
																		<span
																			className={`mega-menu-badge tj-zoom-in-out-anim ${item?.badge === "HOT"
																				? "mega-menu-badge-hot"
																				: ""
																				}`}
																		>
																			{item?.badge}
																		</span>
																	) : (
																		""
																	)}
																</Link>
															))
															: ""}
													</div>
												</div>
											</div>
										))
										: ""}

									<div className="col-12 col-lg-3 mega-menu-pages-single">
										<div className="mega-menu-pages-single-inner">
											<div className="feature-box">
												<div className="feature-content">
													<h2 className="title">Modern</h2>
													<span>Home Makeover</span>
													<Link
														className="read-more feature-contact"
														href="tel:8321890640"
													>
														<i className="tji-phone-3"></i>
														<span>+8 (321) 890-640</span>
													</Link>
												</div>
												<div className="feature-images">
													<img src="/images/service/service-ad.webp" alt="" />
												</div>
											</div>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</li>
					<li
						className={`has-dropdown ${serviceNav?.isActive ? "current-menu-ancestor" : ""
							}`}
					>
						<Link href={serviceNav?.path ? serviceNav?.path : "#"}>
							{serviceNav?.name}
						</Link>
						<ul className="sub-menu mega-menu mega-menu-pages">
							<li>
								<div className="mega-menu-wrapper">
									{serviceNav?.submenu?.length
										? serviceNav?.submenu?.map((category, idx) => (
											<div key={idx} className="mega-menu-pages-single mega-menu-service-col">
												<div className="mega-menu-pages-single-inner">
													<h6 className="mega-menu-title">
														{category?.name}
													</h6>
													<div className="mega-menu-list">
														{category?.items?.length
															? category?.items?.map((item, idx2) => (
																<Link
																	key={idx2}
																	href={item?.path ? item?.path : "/"}
																	className="mega-menu-service-single"
																>
																	<span className="mega-menu-service-icon">
																		<i
																			className={item?.icon ? item?.icon : "tji-service-1"}
																		></i>
																	</span>
																	<span className="mega-menu-service-title">
																		{item?.name}
																	</span>
																	<span className="mega-menu-service-nav">
																		<i className="tji-arrow-right-long"></i>
																		<i className="tji-arrow-right-long"></i>
																	</span>
																</Link>
															))
															: ""}
													</div>
												</div>
											</div>
										))
										: ""}
								</div>
							</li>
						</ul>
					</li>
					<li
						className={`has-dropdown ${industriesNav?.isActive ? "current-menu-ancestor" : ""
							}`}
					>
						<Link href={industriesNav?.path ? industriesNav?.path : "#"}>
							{industriesNav?.name}
						</Link>
						<ul className="sub-menu mega-menu-service mega-menu-industries">
							{industriesNav?.submenu?.length
								? industriesNav?.submenu?.map((item, idx) => (
									<li key={idx}>
										<Link
											className="mega-menu-service-single"
											href={item?.path ? item?.path : "/"}
										>
											{" "}
											<span className="mega-menu-service-icon">
												<i
													className={
														item?.icon ? item?.icon : "tji-industry"
													}
												></i>
											</span>{" "}
											<span className="mega-menu-service-title">
												{item?.name
													? item?.name
													: "Industry"}
											</span>{" "}
											<span className="mega-menu-service-nav">
												<i className="tji-arrow-right-long"></i>
												<i className="tji-arrow-right-long"></i>
											</span>
										</Link>
									</li>
								))
								: ""}
						</ul>
					</li>
					<li
						className={`${blogsNav?.isActive ? "current-menu-ancestor" : ""
							}`}
					>
						<Link href={blogsNav?.path ? blogsNav?.path : "#"}>
							{blogsNav?.name}
						</Link>
					</li>
					<li
						className={`has-dropdown ${aboutNav?.isActive ? "current-menu-ancestor" : ""
							}`}
					>
						<Link href={aboutNav?.path ? aboutNav?.path : "#"}>
							{aboutNav?.name ? aboutNav?.name : "About us"}
						</Link>
						<ul className="sub-menu mega-menu mega-menu-about mega-menu-pages">
							<li>
								<div className="mega-menu-wrapper">
									{aboutNav?.submenu?.length
										? aboutNav?.submenu?.map((section, idx) => (
											<div key={idx} className="mega-menu-pages-single">
												<div className="mega-menu-pages-single-inner">
													<h6 className="mega-menu-title">
														{section?.name}
													</h6>
													<div className="mega-menu-list">
														{section?.items?.length
															? section?.items?.map((item, idx2) => (
																<Link
																	key={100 + idx2}
																	href={item?.path ? item?.path : "/"}
																	className={`mega-menu-service-single ${item?.isActive ? "active" : ""}`}
																	onClick={(e) => handleScroll(e, item?.path)}
																>
																	<span className="mega-menu-service-icon">
																		<i
																			className={item?.icon ? item?.icon : "tji-service-1"}
																		></i>
																	</span>
																	<span className="mega-menu-service-title">
																		{item?.name}
																	</span>
																</Link>
															))
															: ""}
													</div>
												</div>
											</div>
										))
										: ""}
								</div>
							</li>
						</ul>
					</li>
					<li className={contactNav?.isActive ? "current-menu-ancestor" : ""}>
						<Link href={contactNav?.path ? contactNav?.path : "#"}>
							{contactNav?.name ? contactNav?.name : "Contact"}
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
