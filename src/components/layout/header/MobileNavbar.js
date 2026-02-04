import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import getNavItems from "@/libs/getNavItems";
import Image from "next/image";
import Link from "next/link";
import MobileMenuItem from "./MobileMenuItem";

const MobileNavbar = () => {
	const navItems = getNavItems();
	const homeNav = navItems[0];
	const pagesNav = navItems[1];
	const serviceNav = navItems[2];
	const industriesNav = navItems[3];
	const productsNav = navItems[4];
	const companyNav = navItems[5];
	const contactNav = navItems[6];
	const blogsNav = navItems[7];
	return (
		<div className="hamburger_menu">
			<div className="mobile_menu mean-container">
				<div className="mean-bar">
					<Link
						href="#nav"
						className="meanmenu-reveal"
						style={{ right: 0, left: "auto" }}
					>
						<span>
							<span>
								<span></span>
							</span>
						</span>
					</Link>
					<nav className="mean-nav">
						<ul>
							<li>
								<Link href="/">
									{homeNav?.name}
								</Link>
							</li>
							<li>
								<Link href={pagesNav?.path ? pagesNav?.path : "#"}>
									{pagesNav?.name}
								</Link>
							</li>
							<MobileMenuItem
								text={serviceNav?.name}
								url={serviceNav?.path ? serviceNav?.path : "#"}
								submenuClass={"mega-menu-service"}
							>
								{serviceNav?.submenu?.length
									? serviceNav?.submenu?.map((item, idx) => (
										<li key={idx}>
											<Link
												className="mega-menu-service-single"
												href={item?.path ? item?.path : "/"}
											>
												{" "}
												<span className="mega-menu-service-icon">
													<i
														className={
															item?.icon ? item?.icon : "tji-service-1"
														}
													></i>
												</span>{" "}
												<span className="mega-menu-service-title">
													{item?.name
														? item?.name
														: "Business process optimization"}
												</span>{" "}
												<span className="mega-menu-service-nav">
													<i className="tji-arrow-right-long"></i>
													<i className="tji-arrow-right-long"></i>
												</span>
											</Link>
										</li>
									))
									: ""}
							</MobileMenuItem>
							<MobileMenuItem
								text={industriesNav?.name}
								url={industriesNav?.path ? industriesNav?.path : "#"}
								submenuClass={"mega-menu-service"}
							>
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
							</MobileMenuItem>
							<MobileMenuItem
								text={productsNav?.name}
								url={productsNav?.path ? productsNav?.path : "#"}
								submenuClass={"mega-menu-service"}
							>
								{productsNav?.submenu?.length
									? productsNav?.submenu?.map((item, idx) => (
										<li key={idx}>
											<Link
												className="mega-menu-service-single"
												href={item?.path ? item?.path : "/"}
											>
												{" "}
												<span className="mega-menu-service-icon">
													<i
														className={
															item?.icon ? item?.icon : "fa-regular fa-comments"
														}
													></i>
												</span>{" "}
												<span className="mega-menu-service-title">
													{item?.name}
												</span>{" "}
												<span className="mega-menu-service-nav">
													<i className="tji-arrow-right-long"></i>
													<i className="tji-arrow-right-long"></i>
												</span>
											</Link>
										</li>
									))
									: ""}
							</MobileMenuItem>
							<MobileMenuItem
								text={companyNav?.name}
								url={companyNav?.path ? companyNav?.path : "#"}
								submenuClass={"mega-menu-service"}
							>
								{companyNav?.submenu?.length
									? companyNav?.submenu?.map((item, idx) => (
										<li key={idx}>
											<Link
												className="mega-menu-service-single"
												href={item?.path ? item?.path : "/"}
											>
												{" "}
												<span className="mega-menu-service-icon">
													<i
														className={
															item?.icon ? item?.icon : "fa-light fa-users"
														}
													></i>
												</span>{" "}
												<span className="mega-menu-service-title">
													{item?.name}
												</span>{" "}
												<span className="mega-menu-service-nav">
													<i className="tji-arrow-right-long"></i>
													<i className="tji-arrow-right-long"></i>
												</span>
											</Link>
										</li>
									))
									: ""}
							</MobileMenuItem>
							<li>
								<Link href={blogsNav?.path ? blogsNav?.path : "#"}>
									{blogsNav?.name}
								</Link>
							</li>
							<li className="mean-last">
								<Link href={contactNav?.path ? contactNav?.path : "#"}>
									{" "}
									{contactNav?.name ? contactNav?.name : "Contact"}
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default MobileNavbar;
