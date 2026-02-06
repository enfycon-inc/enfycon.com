"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./EmailAutocomplete.module.scss";
import { getEmailSuggestions } from "@/libs/emailUtils";

const EmailAutocomplete = ({ name, placeholder, required, value, onChange, className }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    // Filter suggestions as user types
    useEffect(() => {
        const newSuggestions = getEmailSuggestions(value);
        setSuggestions(newSuggestions);
    }, [value]);

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        onChange(e); // Propagate event to parent form handler

        // Show suggestions if we have input > 3 chars
        if (newValue.length >= 3) {
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        // Create a synthetic event to pass to the parent handler
        const syntheticEvent = {
            target: {
                name: name,
                value: suggestion
            }
        };
        onChange(syntheticEvent);
        setShowSuggestions(false);
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <input
                type="email"
                name={name}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={handleInputChange}
                className={`${styles.input} ${className || ""}`}
                autoComplete="off"
                onFocus={() => {
                    if (value && value.length >= 3) setShowSuggestions(true);
                }}
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className={styles.suggestionsList}>
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className={styles.suggestionItem}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EmailAutocomplete;
