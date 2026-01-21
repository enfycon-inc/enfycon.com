"use client";
import React from "react";
import Image from "next/image";

const Preloader = () => {
    return (
        <div className="custom-preloader">
            <div className="preloader-content">
                <div className="ring-container">
                    <div className="loader-ring"></div>
                    <div className="loader-logo">
                        <Image
                            src="/images/logos/enfycon-logo-only.png"
                            alt="Logo"
                            width={100}
                            height={100}
                            priority
                        />
                    </div>
                </div>
                <div className="loader-text">Loading . . .</div>
            </div>
        </div>
    );
};

export default Preloader;
