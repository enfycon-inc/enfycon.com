"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showCustomize, setShowCustomize] = useState(false);

    // Cookie preferences state
    const [preferences, setPreferences] = useState({
        necessary: true, // Always true
        functional: false,
        analytics: false,
        performance: false,
        advertisement: false,
        others: false
    });

    const logoWhite = "/images/logos/enfycon-white.png";
    const logoDark = "/images/logos/enfycon.png"; // Assuming dark text logo exists, verify path if needed. 
    // If no dark text logo, uses white logo with background or just text? 
    // Based on screenshots, it seems like a logo is present. I'll use logo-2.webp from Logo.js logic if generic dark logo is missing, or just assume enfycon.png exists based on list_dir earlier.
    // Checking list_dir from earlier: enfycon.png (77KB) exists.

    const logoToUse = showCustomize ? "/images/logos/enfycon.png" : "/images/logos/enfycon-white.png";

    const CONSENT_EXPIRY_DAYS = 30;

    useEffect(() => {
        const consent = localStorage.getItem("cookie_consent");
        const storedTimestamp = localStorage.getItem("cookie_consent_timestamp");

        let isExpired = false;
        if (storedTimestamp) {
            const now = Date.now();
            const storedTime = parseInt(storedTimestamp, 10);
            const daysDiff = (now - storedTime) / (1000 * 60 * 60 * 24);
            if (daysDiff > CONSENT_EXPIRY_DAYS) {
                isExpired = true;
            }
        }

        if (!consent || isExpired) {
            if (isExpired) {
                localStorage.removeItem("cookie_consent");
                localStorage.removeItem("cookie_preferences");
                localStorage.removeItem("cookie_consent_timestamp");
            }

            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        const allAccepted = {
            necessary: true,
            functional: true,
            analytics: true,
            performance: true,
            advertisement: true,
            others: true
        };
        localStorage.setItem("cookie_consent", "accepted");
        localStorage.setItem("cookie_preferences", JSON.stringify(allAccepted));
        localStorage.setItem("cookie_consent_timestamp", Date.now().toString());
        setIsVisible(false);
    };

    const handleSavePreferences = () => {
        localStorage.setItem("cookie_consent", "custom");
        localStorage.setItem("cookie_preferences", JSON.stringify(preferences));
        localStorage.setItem("cookie_consent_timestamp", Date.now().toString());
        setIsVisible(false);
    };

    const togglePreference = (key) => {
        setPreferences(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    if (!isVisible) return null;

    // Customization View
    if (showCustomize) {
        return (
            <div className="cookie-consent-overlay">
                <div className="cookie-consent-modal customize-view">
                    <div className="content-wrapper">
                        {/* Header */}
                        <div className="logo-wrapper">
                            <Image src="/images/logos/enfycon.png" alt="Logo" width={120} height={40} className="dark-logo" />
                            <button className="close-btn" onClick={() => setIsVisible(false)}>&times;</button>
                        </div>

                        <h2>Customize Consent Preferences</h2>
                        <p>
                            We use cookies to improve your browsing experience. By continuing to use our site, you consent to our use of cookies. You can also adjust your cookie preferences by clicking "Cookie Options". For more information, please see our <Link href="/cookie-policy">Cookie policy</Link>
                        </p>

                        <div className="cookie-options">
                            {/* Necessary */}
                            <div className="cookie-option-item">
                                <div className="option-header">
                                    <h3>Necessary Cookies</h3>
                                    <div className="toggle-wrapper">
                                        <span>Active</span>
                                        <label className="toggle-switch">
                                            <input type="checkbox" checked={true} disabled />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>
                                <p>Necessary cookies are required to enable the basic features of this site, such as providing secure log-in or adjusting your consent preferences. These cookies do not store any personally identifiable data.</p>
                            </div>

                            {/* Functional */}
                            <div className="cookie-option-item">
                                <div className="option-header">
                                    <h3>Functional Cookies</h3>
                                    <div className="toggle-wrapper">
                                        <span>{preferences.functional ? 'Active' : 'Inactive'}</span>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={preferences.functional}
                                                onChange={() => togglePreference('functional')}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>
                                <p>Functional cookies help perform certain functionalities like sharing the content of the website on social media platforms, collecting feedback, and other third-party features.</p>
                            </div>

                            {/* Analytics */}
                            <div className="cookie-option-item">
                                <div className="option-header">
                                    <h3>Analytics Cookies</h3>
                                    <div className="toggle-wrapper">
                                        <span>{preferences.analytics ? 'Active' : 'Inactive'}</span>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={preferences.analytics}
                                                onChange={() => togglePreference('analytics')}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>
                                <p>Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.</p>
                            </div>

                            {/* Performance */}
                            <div className="cookie-option-item">
                                <div className="option-header">
                                    <h3>Performance Cookies</h3>
                                    <div className="toggle-wrapper">
                                        <span>{preferences.performance ? 'Active' : 'Inactive'}</span>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={preferences.performance}
                                                onChange={() => togglePreference('performance')}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>
                                <p>Performance cookies are used to understand and analyze the key performance indexes of the website which helps in delivering a better user experience for the visitors.</p>
                            </div>

                            {/* Advertisement */}
                            <div className="cookie-option-item">
                                <div className="option-header">
                                    <h3>Advertisement Cookies</h3>
                                    <div className="toggle-wrapper">
                                        <span>{preferences.advertisement ? 'Active' : 'Inactive'}</span>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={preferences.advertisement}
                                                onChange={() => togglePreference('advertisement')}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>
                                <p>Advertisement cookies are used to provide visitors with customized advertisements based on the pages you visited previously and to analyze the effectiveness of the ad campaigns.</p>
                            </div>

                            {/* Others */}
                            <div className="cookie-option-item">
                                <div className="option-header">
                                    <h3>Others Cookies</h3>
                                    <div className="toggle-wrapper">
                                        <span>{preferences.others ? 'Active' : 'Inactive'}</span>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={preferences.others}
                                                onChange={() => togglePreference('others')}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>
                                <p>Other uncategorized cookies are those that are being analyzed and have not been classified into a category as yet.</p>
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="button-group customize-actions">
                            <button
                                onClick={handleSavePreferences}
                                className="btn-accept"
                            >
                                Save my preferences
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default View
    return (
        <div className="cookie-consent-overlay">
            <div className="cookie-consent-modal">
                <div className="content-wrapper">
                    {/* Logo */}
                    <div className="logo-wrapper">
                        <Image src="/images/logos/enfycon-white.png" alt="Logo" width={120} height={40} className="white-logo" />
                    </div>

                    {/* Heading */}
                    <h2>
                        We use cookies to enhance your experience on our website
                    </h2>

                    {/* Description */}
                    <p>
                        When you visit our website, it might store or access information on your browser, typically in the form of cookies. This data may include details about you, your preferences, or your device, and is mainly used to ensure the site functions as expected. While this information doesn't usually identify you personally, it can provide a more tailored browsing experience. We value your privacy, so you have the option to reject certain cookies. However, disabling some cookies could affect your experience and limit the services we can offer. For further details, please review our updated Cookie policy. <Link href="/cookie-policy">Cookie policy</Link>
                    </p>

                    {/* Buttons */}
                    <div className="button-group">
                        <button className="btn-customize" onClick={() => setShowCustomize(true)}>
                            Customize Cookies
                        </button>
                        <button
                            onClick={handleAcceptAll}
                            className="btn-accept"
                        >
                            Accept All Cookies
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
