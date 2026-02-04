"use client";
import Image from "next/image";
import Link from "next/link";

const locations = [
    {
        title: "Texas(HQ), USA",
        address: "3921 Long Prairie Road, Building 5, Flower Mound, TX 75208",
        phone: "+1 201.201.7878",
        email: "texas@enfycon.com",
        image: "/images/locations/texas.png",
    },
    {
        title: "Ohio, USA",
        address: "6500 Emerald Parkway, Suite 100 Dublin, Ohio 43016",
        phone: "+1 216.888.3007",
        email: "ohio@enfycon.com",
        image: "/images/locations/ohio.png",
    },
    {
        title: "Delaware, USA",
        address: "112 Capitol Trail, Suite A33, Newark DE 19711",
        phone: "+1 302.273.1130",
        email: "delaware@enfycon.com",
        image: "/images/locations/delaware.png",
    },
    {
        title: "Bhubaneswar(ODC), India",
        address: "N4/345, Block N4, IRC Village, Bhubaneswar, Odisha 751015",
        phone: "+91 6743513070",
        email: "odc@enfycon.com",
        image: "/images/locations/bhubaneswar.jpg",
    },
    {
        title: "Hyderabad, India",
        address: "Unit No. 308 & 309, Jains Sadguru Image's Capital Park, Image Gardens Road, Madhapur, Hyderabad 500084.",
        phone: "", // Screenshot says email only for hyd? No, it has email.
        email: "hydrabad@enfycon.com",
        image: "/images/locations/hyderabad.jpg",
    },
];

const LocationSection = ({ id }) => {
    return (
        <section id={id} className="tj-location-section section-gap">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="sec-heading text-center mb-5">
                            <span className="sub-title">
                                <i className="tji-location-3"></i>Our Locations
                            </span>
                            <h2 className="sec-title">
                                Global Presence, <span>Local Excellence</span>
                            </h2>
                        </div>
                    </div>
                </div>

                {/* USA Locations */}
                <div className="row row-gap-4 mb-5">
                    {locations.slice(0, 3).map((loc, index) => (
                        <div key={index} className="col-lg-4 col-md-6">
                            <div className="location-card wow fadeInUp" data-wow-delay={`${0.1 * (index + 1)}s`}>
                                <div className="location-image">
                                    <Image
                                        src={loc.image}
                                        alt={loc.title}
                                        width={400}
                                        height={250}
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="location-content p-4">
                                    <h3 className="location-title mb-3">{loc.title}</h3>
                                    <div className="location-info">
                                        <p className="address">
                                            <i className="tji-location-3"></i> {loc.address}
                                        </p>
                                        <p className="contact-link">
                                            <i className="tji-phone"></i>
                                            <Link href={`tel:${loc.phone.replace(/\s+/g, '')}`}>{loc.phone}</Link>
                                        </p>
                                        <p className="contact-link">
                                            <i className="tji-envelop"></i>
                                            <Link href={`mailto:${loc.email}`}>{loc.email}</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* India Locations */}
                <div className="row row-gap-4 justify-content-center">
                    {locations.slice(3).map((loc, index) => (
                        <div key={index} className="col-lg-5 col-md-6">
                            <div className="location-card wow fadeInUp" data-wow-delay={`${0.1 * (index + 1)}s`}>
                                <div className="location-image">
                                    <Image
                                        src={loc.image}
                                        alt={loc.title}
                                        width={600}
                                        height={350}
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="location-content p-4">
                                    <h3 className="location-title mb-3">{loc.title}</h3>
                                    <div className="location-info">
                                        <p className="address">
                                            <i className="tji-location-3"></i> {loc.address}
                                        </p>
                                        {loc.phone && (
                                            <p className="contact-link">
                                                <i className="tji-phone"></i>
                                                <Link href={`tel:${loc.phone.replace(/\s+/g, '')}`}>{loc.phone}</Link>
                                            </p>
                                        )}
                                        <p className="contact-link">
                                            <i className="tji-envelop"></i>
                                            <Link href={`mailto:${loc.email}`}>{loc.email}</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LocationSection;
