'use client';

import React from 'react';

const CsrApproach = ({ data }) => {
    return (
        <section className="csr-approach-section section-gap bg-white">
            <div className="container">
                {/* Section Header */}
                <div className="row justify-content-center mb-4">
                    <div className="col-lg-10">
                        <div className="sec-heading text-center">
                            <h2 className="sec-title uppercase">
                                {data.title}
                            </h2>
                            <p className="desc" style={{
                                fontSize: '1rem',
                                lineHeight: '1.7',
                                color: '#666',
                                maxWidth: '750px',
                                margin: '0 auto'
                            }}>
                                {data.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Approach Cards - Engaging Design */}
                <div className="row g-3 mt-3" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    {data.items.map((item, index) => (
                        <div key={index} className="col-lg-4 col-md-6">
                            <div className="approach-card h-100"
                                style={{
                                    background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
                                    borderRadius: '12px',
                                    padding: '32px 24px',
                                    transition: 'all 0.3s ease',
                                    border: '1px solid #e5e7eb',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.borderColor = item.color || '#003366';
                                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,51,102,0.12)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = '#e5e7eb';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}>

                                {/* Accent Bar */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '4px',
                                    height: '100%',
                                    background: item.color || '#003366',
                                    opacity: 0.7
                                }}></div>

                                {/* Icon with Colored Background */}
                                <div className="icon-section mb-3" style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '12px',
                                    background: `${item.color}15` || '#00336615',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <i className={item.icon} style={{
                                        fontSize: '1.75rem',
                                        color: item.color || '#003366',
                                        lineHeight: '1'
                                    }}></i>
                                </div>

                                {/* Title with Color Accent */}
                                <h4 className="approach-title mb-2" style={{
                                    fontSize: '1.2rem',
                                    fontWeight: '600',
                                    color: '#1a1a1a',
                                    lineHeight: '1.4',
                                    margin: '0 0 8px 0'
                                }}>
                                    {item.title}
                                </h4>

                                {/* Description */}
                                <p className="approach-desc" style={{
                                    fontSize: '0.95rem',
                                    lineHeight: '1.6',
                                    color: '#666',
                                    margin: 0
                                }}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CsrApproach;
