"use client";
import ServiceCard7 from "@/components/shared/cards/ServiceCard7";
import { serviceCategories } from "@/data/servicesData";
import Link from "next/link";
import { useState } from "react";

const ServicesCategorized = ({ activeCategoryId }) => {
    // Sort categories to put activeCategoryId first
    const sortedCategories = [...serviceCategories].sort((a, b) => {
        if (a.id === activeCategoryId) return -1;
        if (b.id === activeCategoryId) return 1;
        return 0;
    });

    // State for expanded categories
    const [expandedCategories, setExpandedCategories] = useState({});

    // State for pagination per category
    const [categoryPages, setCategoryPages] = useState(
        serviceCategories.reduce((acc, category) => {
            acc[category.id] = 1;
            return acc;
        }, {})
    );

    const servicesPerPage = 3;

    const handlePageChange = (categoryId, pageNumber) => {
        setCategoryPages((prev) => ({
            ...prev,
            [categoryId]: pageNumber,
        }));
    };

    const handleExpandToggle = (categoryId) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    };

    return (
        <div className="tj-service-section service-4 section-gap">
            <div className="container">
                {sortedCategories.map((category, categoryIdx) => {
                    const isExpanded = expandedCategories[category.id];
                    const currentPage = categoryPages[category.id] || 1;
                    const totalPages = Math.ceil(
                        category.services.length / servicesPerPage
                    );

                    const startIndex = (currentPage - 1) * servicesPerPage;
                    const endIndex = startIndex + servicesPerPage;

                    // If expanded, show all; otherwise show current page
                    const currentServices = isExpanded
                        ? category.services
                        : category.services.slice(startIndex, endIndex);

                    return (
                        <div
                            key={category.id}
                            className={`service-category-section ${categoryIdx > 0 ? "mt-5 pt-5" : ""
                                }`}
                        >
                            {/* Category Header */}
                            <div className="row mb-4 align-items-end">
                                <div className="col-lg-9">
                                    <div className="category-header">
                                        <h2 className="category-title mb-3">
                                            {category.id === activeCategoryId ? (
                                                category.title
                                            ) : (
                                                <Link href={`/services/${category.id}`} className="text-decoration-none text-dark">
                                                    {category.title}
                                                </Link>
                                            )}
                                        </h2>
                                        <p className="category-desc text-muted" style={{ maxWidth: "800px" }}>
                                            {category.desc}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-3 text-lg-end d-flex align-items-center justify-content-lg-end justify-content-start mt-3 mt-lg-0">
                                    {totalPages > 1 && (
                                        <button
                                            onClick={() => handleExpandToggle(category.id)}
                                            className="btn btn-primary btn-sm"
                                            style={{
                                                height: "40px",
                                                borderRadius: "6px",
                                                padding: "0 20px"
                                            }}
                                        >
                                            {isExpanded ? "Show Less" : "Show All"}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Service Cards */}
                            <div className="row row-gap-4 mb-4">
                                {currentServices.map((service, idx) => (
                                    <div key={service.id} className="col-lg-4 col-md-6">
                                        <ServiceCard7 service={service} idx={idx} categoryId={category.id} />
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && !isExpanded && (
                                <div className="row">
                                    <div className="col-12">
                                        <div className="d-flex justify-content-center gap-2 mt-3">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                                (pageNum) => (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => handlePageChange(category.id, pageNum)}
                                                        className={`btn btn-sm ${currentPage === pageNum
                                                            ? "btn-primary"
                                                            : "btn-outline-secondary"
                                                            }`}
                                                        style={{
                                                            minWidth: "40px",
                                                            height: "40px",
                                                            borderRadius: "6px",
                                                        }}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ServicesCategorized;
