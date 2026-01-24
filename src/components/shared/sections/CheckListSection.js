"use client";

import React from "react";

const CheckListSection = ({
    title,
    items,
    sectionClass,
    listClass = "industry-edge-list",
}) => {
    if (!items || items.length === 0) return null;

    return (
        <div className={`${sectionClass} mt-5 wow fadeInUp`} data-wow-delay=".3s">
            {title && <h3 className="section-title text-primary mb-4">{title}</h3>}
            <ul className={listClass}>
                {items.map((item, idx) => (
                    <li key={idx}>
                        <i className="tji-check"></i>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CheckListSection;
