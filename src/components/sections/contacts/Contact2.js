"use client";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

import Link from "next/link";
import Swal from "sweetalert2";

const Contact2 = () => {
	const [phone, setPhone] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);


	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		const formData = new FormData(e.target);
		const data = {
			firstName: formData.get("cfName2"),
			lastName: "",
			email: formData.get("cfEmail2"),
			mobile: phone,
			subject: formData.get("cfSubject2"),
			message: formData.get("cfMessage2"),
		};

		try {
			const response = await fetch("/api/contact-us", {
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
		<section className="tj-contact-section section-gap contact-blue">
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<div className="global-map wow fadeInUp" data-wow-delay=".3s">
							<div className="global-map-img">
								<img src="/images/bg/map.svg" alt="Image" />
								<div className="location-indicator loc-1">
									<div className="location-tooltip">
										<span>Head office:</span>
										<p>3921 Long Prairie Road, Building 5, Flower Mound, TX 75028, USA.</p>
										<Link href="tel:+12012017078">P: +1 (201) 201-7078</Link>
										<Link href="mailto:office@enfycon.com">
											M: office@enfycon.com
										</Link>
									</div>
									<span className="hq-text">HQ</span>
								</div>
								<div className="location-indicator loc-2">
									<div className="location-tooltip">
										<span>Regional office:</span>
										<p>N4/345, Block N4, IRC Village, Bhubaneswar, Odisha 751015, India.</p>
										<Link href="tel:+916743513070">P: +91 674 351 3070</Link>
										<Link href="mailto:odc@enfycon.com">
											M: odc@enfycon.com
										</Link>
									</div>
									<span className="odc-text">ODC</span>
								</div>
								<div className="location-indicator loc-3">
									<div className="location-tooltip">
										<span>Regional office:</span>
										<p>6500 Emerald Parkway, Suite 100 Dublin, Ohio 43016, USA.</p>
										<Link href="tel:+12168883007">P: +1 (216) 888-3007</Link>
										<Link href="mailto:ohio@enfycon.com">
											M: ohio@enfycon.com
										</Link>
									</div>
								</div>
								<div className="location-indicator loc-4">
									<div className="location-tooltip">
										<span>Regional office:</span>
										<p>112 Capitol Trail, Suite A33, Newark DE 19711, USA.</p>
										<Link href="tel:+13022731130">P: +1 (302) 273-1130</Link>
										<Link href="mailto:delaware@enfycon.com">
											M: delaware@enfycon.com
										</Link>
									</div>
								</div>
								<div className="location-indicator loc-5">
									<div className="location-tooltip">
										<span>Regional office:</span>
										<p>Unit No. 308 & 309, Jains Sadguru Image's Capital Park, Madhapur, Hyderabad 500084, India.</p>
										<Link href="mailto:hydrabad@enfycon.com">
											M: hydrabad@enfycon.com
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-6">
						<div
							className="contact-form style-2 wow fadeInUp"
							data-wow-delay=".4s"
						>
							<div className="sec-heading">
								<span className="sub-title text-white">
									<i className="tji-box"></i>Get in Touch
								</span>
								<h2 className="sec-title title-anim">
									Drop Us a <span>Line.</span>
								</h2>
							</div>
							<form id="contact-form-2" onSubmit={handleSubmit}>
								<div className="row wow fadeInUp" data-wow-delay=".5s">
									<div className="col-sm-6">
										<div className="form-input">
											<input
												type="text"
												name="cfName2"
												placeholder="Full Name *"
												required
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-input">
											<input
												type="email"
												name="cfEmail2"
												placeholder="Email Address *"
												required
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-input custom-phone-input contact2-phone">
											<PhoneInput
												country={"us"}
												value={phone}
												onChange={(phone) => setPhone(phone)}
												enableSearch={true}
												searchPlaceholder="Search country..."
												searchNotFound="No country found"
												inputProps={{
													name: 'cfPhone2',
													required: true,
													autoFocus: false
												}}
												containerClass="phone-container"
												inputClass="phone-input-field"
												buttonClass="phone-dropdown-button"
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-input">
											<input
												type="text"
												name="cfSubject2"
												placeholder="Subject *"
												required
											/>
										</div>
									</div>
									<div className="col-sm-12">
										<div className="form-input message-input">
											<textarea
												name="cfMessage2"
												id="message"
												placeholder="Type message *"
												required
											></textarea>
										</div>
									</div>
									<div className="submit-btn">
										<ButtonPrimary
											text={isSubmitting ? "Sending..." : "Send Message"}
											type={"submit"}
											disabled={isSubmitting}
										/>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-shape-1">
				<img src="/images/shape/pattern-2.svg" alt="" />
			</div>
			<div className="bg-shape-2">
				<img src="/images/shape/pattern-3.svg" alt="" />
			</div>
		</section>
	);
};

export default Contact2;
