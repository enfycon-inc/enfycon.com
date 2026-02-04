"use client";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Swal from "sweetalert2";

const ContactFormCustom = () => {
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.target);
        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            mobile: phone,
            subject: formData.get("subject"),
            message: formData.get("message"),
        };

        try {
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
