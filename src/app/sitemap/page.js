import Footer2 from "@/components/layout/footer/Footer2";
import Header from "@/components/layout/header/Header";
import HeroInner from "@/components/sections/hero/HeroInner";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import getNavItems from "@/libs/getNavItems";
import Link from "next/link";
import React from "react";

export const metadata = {
    title: "Sitemap - enfycon",
    description: "Explore the complete structure of the enfycon website.",
};

const Sitemap = () => {
    const navItems = getNavItems();

    const renderLinks = (items) => {
        return (
            <ul className="list-unstyled ms-4">
                {items.map((item, index) => (
                    <li key={index} className="mb-2">
                        {item.path && item.path !== '#' ? (
                            <Link href={item.path} className="text-secondary text-decoration-none hover-primary">
                                {item.name}
                            </Link>
                        ) : (
                            <span className="fw-bold text-dark">{item.name}</span>
                        )}
                        {item.submenu && renderLinks(item.submenu)}
                        {item.items && renderLinks(item.items)}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            <BackToTop />
            <Header />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main>
                        <HeaderSpace />
                        <HeroInner title="Sitemap" text="Navigate our website efficiently" />

                        <section className="section-gap">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="sitemap-content p-4 bg-light rounded-3">
                                            <h3 className="mb-4">Pages</h3>
                                            <div className="row">
                                                {navItems.map((section, idx) => (
                                                    <div key={idx} className="col-md-4 mb-4">
                                                        <h5 className="mb-3 text-primary border-bottom pb-2">
                                                            {section.path && section.path !== '#' ? (
                                                                <Link href={section.path}>{section.name}</Link>
                                                            ) : (
                                                                section.name
                                                            )}
                                                        </h5>
                                                        {section.submenu && renderLinks(section.submenu)}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                    <Footer2 />
                </div>
            </div>
            <ClientWrapper />
        </div>
    );
};

export default Sitemap;
