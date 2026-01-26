"use client";

import Image from "next/image";

const IndustrySplitSection = ({ item, sectionClass = "" }) => {
    if (!item) return null;
    const { title, desc, image } = item;

    return (
        <div className={`industry-split-section ${sectionClass} wow fadeInUp`} data-wow-delay=".3s">
            <div className="container">
                <div className="split-wrapper">
                    <div className="image-box">
                        {image && <Image
                            src={image}
                            alt={title}
                            fill
                             style={{ objectFit: 'cover' }}
                        />}
                    </div>
                    <div className="content-box">
                        <div className="title-block">
                            <h3 className="title">{title}</h3>
                        </div>
                        <div className="desc-block">
                            <p>{desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndustrySplitSection;
