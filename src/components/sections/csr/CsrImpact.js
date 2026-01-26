import React from 'react';
import Image from 'next/image';

const CsrImpact = ({ data }) => {
    return (
        <section className="csr-impact-section">
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-lg-8">
                        <div className="impact-image h-100" style={{ position: 'relative' }}>
                            <Image
                                src={data.image}
                                alt="CSR Impact"
                                width={800}
                                height={600}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '40%',
                                height: '100%',
                                background: 'linear-gradient(to right, transparent, rgba(0, 51, 102, 0.7), #003366)'
                            }}></div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="impact-content h-100 d-flex flex-column justify-content-center"
                            style={{ background: 'linear-gradient(to right, #003366, #0056b3)', padding: '80px 60px', color: 'white' }}>

                            <div className="quote-section text-center">
                                {/* Icon */}
                                <div style={{
                                    marginBottom: '40px'
                                }}>
                                    <i className="fa-light fa-graduation-cap" style={{
                                        fontSize: '4rem',
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))'
                                    }}></i>
                                </div>

                                {/* Quote Text */}
                                <h3 style={{
                                    fontSize: '2.2rem',
                                    fontWeight: '400',
                                    color: '#ffffff',
                                    lineHeight: '1.4',
                                    margin: '0 auto 30px',
                                    maxWidth: '380px',
                                    textShadow: '0 2px 12px rgba(0,0,0,0.15)',
                                    letterSpacing: '0.3px',
                                    fontFamily: 'inherit'
                                }}>
                                    Small efforts in education create meaningful change
                                </h3>

                                {/* Decorative line */}
                                <div style={{
                                    width: '80px',
                                    height: '3px',
                                    background: 'rgba(255, 255, 255, 0.4)',
                                    margin: '0 auto',
                                    borderRadius: '2px'
                                }}></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CsrImpact;
