"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/siteConfig';
import useDebounce from '@/hooks/useDebounce';
import { SEARCH_POSTS_QUERY } from './searchQuery';
import './search.scss';

const Search = ({ active }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Debounce the input term
    const debouncedTerm = useDebounce(searchTerm, 300);

    // Cache for storing results: { "term": [results] }
    const cache = useRef(new Map());

    // AbortController to cancel outdated requests
    const abortController = useRef(null);
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);

    // API URL
    const API_URL = `${siteConfig.blogApiUrl}/graphql`;

    // Focus input when active becomes true
    useEffect(() => {
        if (active && inputRef.current) {
            // Small timeout to allow transition/animation to start
            setTimeout(() => {
                inputRef.current.focus();
            }, 100);
        }
    }, [active]);

    // Handle input change
    const handleChange = (e) => {
        const val = e.target.value;
        setSearchTerm(val);
        if (val.length < 3) {
            setResults([]);
            setIsOpen(false);
        }
    };

    // Perform search
    useEffect(() => {
        // Only search if term is long enough
        if (debouncedTerm.length < 3) return;

        // Check cache first
        if (cache.current.has(debouncedTerm)) {
            setResults(cache.current.get(debouncedTerm));
            setIsOpen(true);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(false);
        setIsOpen(true);

        // Abort previous request if active
        if (abortController.current) {
            abortController.current.abort();
        }

        // Create new controller
        abortController.current = new AbortController();

        const fetchResults = async () => {
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        query: SEARCH_POSTS_QUERY,
                        variables: { term: debouncedTerm }
                    }),
                    signal: abortController.current.signal
                });

                if (!response.ok) throw new Error('Network response was not ok');

                const json = await response.json();
                const posts = json.data?.posts?.nodes || [];

                // Update cache
                cache.current.set(debouncedTerm, posts);

                setResults(posts);
            } catch (err) {
                if (err.name === 'AbortError') {
                    // Ignore abort errors
                    return;
                }
                console.error("Search error:", err);
                setError(true);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();

        // Cleanup function
        return () => {
            // We don't abort here on unmount necessarily, but could.
        };

    }, [debouncedTerm, API_URL]);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    // Allow re-opening if input is focused and has value
    const handleFocus = () => {
        if (searchTerm.length >= 3) {
            setIsOpen(true);
        }
    };

    return (
        <div className="search-component" ref={wrapperRef}>
            <div className="search-input-wrapper">
                <input
                    ref={inputRef}
                    type="text"
                    className="form-control"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    aria-label="Search"
                />

                {loading && (
                    <div className="search-spinner spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}
            </div>

            {isOpen && searchTerm.length >= 3 && (
                <div className="search-results-dropdown">
                    {results.length > 0 ? (
                        <div className="list-group list-group-flush">
                            {results.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blogs/${post.slug || post.id}`}
                                    className="list-group-item list-group-item-action search-item-card d-flex flex-column flex-sm-row gap-3 align-items-center align-items-sm-start"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="card-img-wrapper">
                                        {post.featuredImage?.node?.sourceUrl && (
                                            <img
                                                src={post.featuredImage.node.sourceUrl}
                                                alt={post.featuredImage.node.altText || post.title}
                                            />
                                        )}
                                        {!post.featuredImage?.node?.sourceUrl && (
                                            <img
                                                src="/images/logos/enfycon.png"
                                                alt="Enfycon Logo"
                                                className="img-fluid p-2" // Add padding to make it look like a contained logo
                                                style={{ objectFit: "contain" }}
                                            />
                                        )}
                                    </div>
                                    <div className="card-body p-0 text-center text-sm-start">
                                        <h6 className="card-title text-dark">
                                            {post.title}
                                        </h6>
                                        <div
                                            className="card-text small text-muted"
                                            dangerouslySetInnerHTML={{ __html: post.excerpt }}
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        !loading && !error && (
                            <div className="no-results">
                                No results found for "{searchTerm}"
                            </div>
                        )
                    )}
                    {error && (
                        <div className="p-3 text-center text-danger small">
                            Something went wrong. Please try again.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
