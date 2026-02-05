"use client";
import { useState } from "react";
import Script from "next/script";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Swal from "sweetalert2";

const ContactFormCustom = () => {
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const recaptchaAction = "contact_form";

    const getRecaptchaToken = async () => {
        if (!recaptchaSiteKey) {
            throw new Error("reCAPTCHA is not configured.");
        }

        if (typeof window === "undefined" || !window.grecaptcha?.execute) {
            throw new Error("reCAPTCHA is not ready. Please try again.");
        }

        return new Promise((resolve, reject) => {
            window.grecaptcha.ready(async () => {
                try {
                    const token = await window.grecaptcha.execute(recaptchaSiteKey, {
                        action: recaptchaAction,
                    });

                    if (!token) {
                        reject(new Error("Failed to generate reCAPTCHA token."));
                        return;
                    }

                    resolve(token);
                } catch (error) {
                    reject(error);
                }
            });
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.target);
            const recaptchaToken = await getRecaptchaToken();
            const data = {
                firstName: formData.get("firstName"),
                lastName: formData.get("lastName"),
                email: formData.get("email"),
                mobile: phone,
                subject: formData.get("subject"),
                message: formData.get("message"),
                recaptchaToken,
                recaptchaAction,
            };

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                Swal.fire({
                    icon: "success",
                    title: "Message Sent!",
                    text: result.message,
                    confirmButtonColor: "var(--tj-color-theme-primary)",
                });
                e.target.reset();
                setPhone("");
            } else {
                throw new Error(result.error || "Something went wrong");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
                confirmButtonColor: "var(--tj-color-theme-primary)",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="tj-contact-form-section section-gap-bottom">
            {recaptchaSiteKey ? (
                <Script
                    id="recaptcha-v3"
                    src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
                    strategy="afterInteractive"
                />
            ) : null}
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="contact-form-wrapper p-5 wow fadeInUp" data-wow-delay=".1s">
                            <h3 className="title text-center mb-5">Send Us a Message</h3>
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-input">
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="First Name*"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-input">
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Last Name*"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-input">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email Address*"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-input custom-phone-input">
                                            <PhoneInput
                                                country={"us"}
                                                value={phone}
                                                onChange={(phone) => setPhone(phone)}
                                                enableSearch={true}
                                                searchPlaceholder="Search country..."
                                                searchNotFound="No country found"
                                                inputProps={{
                                                    name: 'mobile',
                                                    required: true,
                                                    autoFocus: false
                                                }}
                                                containerClass="phone-container"
                                                inputClass="phone-input-field"
                                                buttonClass="phone-dropdown-button"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="form-input">
                                            <input
                                                type="text"
                                                name="subject"
                                                placeholder="Subject*"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="form-input">
                                            <textarea
                                                name="message"
                                                placeholder="Your Message*"
                                                rows="5"
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center">
                                        <ButtonPrimary
                                            type={"submit"}
                                            text={isSubmitting ? "Sending..." : "Send Message"}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="col-12 text-center mt-3">
                                        <p className="recaptcha-note">
                                            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactFormCustom;
