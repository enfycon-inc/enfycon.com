"use client";

import React from "react";

const IconFeatureGrid = ({
    title,
    items,
    sectionClass,
    gridClass = "industry-benefits-grid",
    cardClass = "industry-benefit-card",
}) => {
    if (!items || items.length === 0) return null;

    return (
        <div className={`${sectionClass} mt-5 wow fadeInUp`} data-wow-delay=".3s">
            {title && <h3 className="section-title text-primary mb-4">{title}</h3>}
            <div className={gridClass}>
                {items.map((item, idx) => (
                    <div className={cardClass} key={idx}>
                        <div className="icon">
                            <i className={item.icon}></i>
                        </div>
                        <div className="content">
                            <h5 className="title">{item.title}</h5>
                            <p>{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IconFeatureGrid;
