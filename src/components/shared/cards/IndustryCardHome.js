import { memo } from "react";
import Link from "next/link";

const IndustryCard = ({ industry, idx }) => {
    const { title, icon, bgColor, id } = industry || {};

    return (
        <Link href={`/industries/${id}`} className="industry-card-link">
            <div
                className="industry-card"
                style={{ backgroundColor: bgColor }}
            >
                <div className="industry-icon">
                    <i className={icon}></i>
                </div>
                <h5 className="industry-title">{title}</h5>
            </div>
        </Link>
    );
};

export default memo(IndustryCard);
