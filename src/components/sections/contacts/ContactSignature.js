import React from "react";
import Link from "next/link";

const ContactSignature = () => {
    return (
        <div className="contact-signature-wrapper">
            <div className="container">
                <div className="contact-signature">
                    <div className="signature-info">
                        <p className="regards">With Warm Regards,</p>
                        <h4 className="name-title">
                            <span className="name">enfycon Team</span>
                            <span className="separator"> | </span>
                            <span className="company">enfycon Inc.</span>
                        </h4>
                        <div className="company-info">
                            <p className="locations">USA | INDIA | UAE</p>
                        </div>

                        <div className="contact-details">
                            <p className="address">
                                <span className="label">A:</span> 3921 Long Prairie Road,
                                Building 5 <br />
                                Flower Mound, TX – 75028
                            </p>
                            <p className="phone">
                                <span className="label">D:</span>{" "}
                                <Link href="tel:+12012017878">+1 201-201-7878</Link>
                            </p>
                        </div>

                        <div className="online-presence">
                            <Link href="mailto:info@enfycon.com" className="email">
                                info@enfycon.com
                            </Link>
                            <span className="separator"> | </span>
                            <Link
                                href="https://www.enfycon.com"
                                target="_blank"
                                className="website"
                            >
                                www.enfycon.com
                            </Link>
                        </div>
                    </div>

                    <div className="signature-banner">
                        <img src="/images/email-banner.webp" alt="Empowering Business with Technology" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSignature;
