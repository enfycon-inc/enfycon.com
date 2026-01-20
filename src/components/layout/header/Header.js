"use client";
import { memo } from "react";
import Link from "next/link";
import { useState } from "react";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import useIsSticky from "@/hooks/useIsSticky";
import ContactMenu from "./ContactMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import Navbar from "./Navbar";

const Header = ({ isStickyHeader = false }) => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isContactOpen, setIsContactOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const isSticky = useIsSticky(isStickyHeader);

	const handleContactTogglerClick = () => {
		setIsContactOpen(true);
	};

	const handleMobileTogglerClick = () => {
		setIsMobileMenuOpen(true);
	};

	return (
		<>
			{/* Offcanvas Contact Menu */}
			<ContactMenu
				isContactOpen={isContactOpen}
				setIsContactOpen={setIsContactOpen}
			/>

			{/* Offcanvas Mobile Menu */}
			<MobileMenu
				isMobileMenuOpen={isMobileMenuOpen}
				setIsMobileMenuOpen={setIsMobileMenuOpen}
			/>

			{/* Search Popup Overlay */}
			<div
				className={`search-popup-overlay ${isSearchOpen ? "search-popup-overlay-open" : ""
					}`}
				onClick={() => setIsSearchOpen(false)}
			></div>

			<header
				className={`header-area header-2 section-gap-x ${isStickyHeader
					? `header-duplicate header-sticky ${isSticky ? "sticky" : ""}`
					: "header-absolute"
					}`}
			>
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="header-wrapper">
								{/* Site Logo */}
								<Logo headerType={2} isStickyHeader={isStickyHeader} />

								{/* Navigation */}
								<Navbar />

								{/* Header Right Info */}
								<div className="header-right-item d-none d-lg-inline-flex">
									{/* Search */}
									<div className="header-search">
										<button
											className={`search ${isSearchOpen ? "search-hide" : ""}`}
											onClick={() => setIsSearchOpen(true)}
										>
											<i className="tji-search"></i>
										</button>
										<button
											type="button"
											className={`search_close_btn ${isSearchOpen ? "close-show" : ""
												}`}
											onClick={() => setIsSearchOpen(false)}
										>
											<svg
												width="18"
												height="18"
												viewBox="0 0 18 18"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M17 1L1 17"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M1 1L17 17"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</button>
									</div>

									{/* CTA Button */}
									<div className="header-button">
										<ButtonPrimary text={"Let's Talk"} url={"/contact"} />
									</div>

									{/* Offcanvas Menu Toggle */}
									<div
										className="menu_bar menu_offcanvas d-none d-lg-inline-flex"
										onClick={handleContactTogglerClick}
									>
										<span></span>
										<span></span>
										<span></span>
									</div>
								</div>

								{/* Mobile Menu Bar */}
								<div
									className="menu_bar mobile_menu_bar d-lg-none"
									onClick={handleMobileTogglerClick}
								>
									<span></span>
									<span></span>
									<span></span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Search Popup */}
				<div className={`search_popup ${isSearchOpen ? "search-opened" : ""}`}>
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-8">
								<div className="tj_search_wrapper">
									<div className="search_form">
										<form action="#">
											<div className="search_input">
												<div className="search-box">
													<input
														className="search-form-input"
														type="text"
														placeholder="Type Words and Hit Enter"
														required
													/>
													<button type="submit">
														<i className="tji-search"></i>
													</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default memo(Header);
