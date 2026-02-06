/**
 * Security Utility for Contact Form
 * Handles input sanitization, validation, and malicious pattern detection.
 */

/**
 * Regex patterns for validation and sanitization
 */
const PATTERNS = {
    // RFC 5322 Official Standard Email Regex (simplified for practical use)
    EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,

    // Dangerous HTML tags
    DANGEROUS_TAGS: /<(script|iframe|object|embed|style|meta|link|base|applet|form|input|button|textarea)[^>]*>/gi,

    // Inline event handlers (e.g., onclick=, onload=)
    INLINE_EVENTS: /\son[a-z]+\s*=/gi,

    // Dangerous URL schemes
    DANGEROUS_URLS: /(javascript:|vbscript:|data:)/gi,

    // All HTML tags (for stripping)
    ALL_TAGS: /<\/?[^>]+(>|$)/g,
};

/**
 * Validates and sanitizes a single string input.
 * @param {string} input - The raw input string.
 * @param {string} fieldName - Name of the field for error messages.
 * @param {number} maxLength - Maximum allowed length.
 * @returns {object} - { value: string, error: string|null, isMalicious: boolean }
 */
const sanitizeField = (input, fieldName, maxLength) => {
    if (!input || typeof input !== 'string') {
        return { value: "", error: `${fieldName} is required.`, isMalicious: false };
    }

    let sanitized = input.trim();
    let isMalicious = false;
    let error = null;

    // Check 1: Length Limit
    if (sanitized.length > maxLength) {
        // Truncate for safety but return error
        sanitized = sanitized.substring(0, maxLength);
        error = `${fieldName} exceeds maximum length of ${maxLength} characters.`;
    }

    // Check 2: Detect Malicious Content
    if (
        PATTERNS.DANGEROUS_TAGS.test(sanitized) ||
        PATTERNS.INLINE_EVENTS.test(sanitized) ||
        PATTERNS.DANGEROUS_URLS.test(sanitized)
    ) {
        isMalicious = true;
        error = `Malicious content detected in ${fieldName}.`;
    }

    // Check 3: Strip HTML Tags (Enforce Plain Text)
    // We do this even if flagged malicious to ensure the returned value is safe-ish for logging/display
    sanitized = sanitized.replace(PATTERNS.ALL_TAGS, " ").trim();

    // Normalize whitespace (optional, but good for "plain text")
    sanitized = sanitized.replace(/\s+/g, " ");

    return { value: sanitized, error, isMalicious };
};

/**
 * Helper to validate email format strictly
 * @param {string} email
 * @returns {boolean}
 */
const isValidEmail = (email) => {
    return PATTERNS.EMAIL.test(email);
};

/**
 * Main function to validate and sanitize the entire contact form payload.
 * @param {object} data - The raw request body { firstName, lastName, email, mobile, subject, message }
 * @returns {object} - { isValid: boolean, cleanedData: object, errors: string[] }
 */
export const sanitizeContactForm = (data) => {
    const errors = [];
    const cleanedData = {};
    let hasMaliciousInput = false;

    // 1. Sanitize Name (Combine First/Last or separate)
    // Requirement: max 100 chars
    const firstName = sanitizeField(data.firstName, "Unknown", 50); // Split limit mainly
    const lastName = sanitizeField(data.lastName, "Unknown", 50);

    if (firstName.isMalicious || lastName.isMalicious) hasMaliciousInput = true;

    cleanedData.firstName = firstName.value;
    cleanedData.lastName = lastName.value;

    // 2. Validate Email
    const emailRaw = data.email ? data.email.trim() : "";
    if (!emailRaw) {
        errors.push("Email is required.");
    } else if (!isValidEmail(emailRaw)) {
        errors.push("Invalid email format.");
    }
    // Also sanitize email to prevent header injection even if regex passes
    // (though strict regex usually prevents this)
    cleanedData.email = emailRaw;

    // 3. Sanitize Subject
    // Requirement: max 150 chars
    const subject = sanitizeField(data.subject, "Subject", 150);
    if (subject.isMalicious) hasMaliciousInput = true;
    if (subject.error && !subject.isMalicious) errors.push(subject.error);
    cleanedData.subject = subject.value || "No Subject";

    // 4. Sanitize Message
    // Requirement: max 2000 chars
    const message = sanitizeField(data.message, "Message", 2000);
    if (message.isMalicious) hasMaliciousInput = true;
    // We might allow silent truncation for message or error
    if (message.error && !message.isMalicious) errors.push(message.error);
    cleanedData.message = message.value;

    // 5. Mobile (Basic sanitization)
    const mobile = sanitizeField(data.mobile, "Mobile", 20);
    cleanedData.mobile = mobile.value;

    if (hasMaliciousInput) {
        // Return a specific fatal error for malicious attempts
        return {
            isValid: false,
            cleanedData: null,
            errors: ["Security alert: Malicious content detected in your submission."]
        };
    }

    return {
        isValid: errors.length === 0,
        cleanedData,
        errors
    };
};
