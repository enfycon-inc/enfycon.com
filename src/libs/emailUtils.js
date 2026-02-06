/**
 * Utility function to generate email suggestions
 * @param {string} input - The current input value
 * @returns {string[]} - Array of email suggestions
 */
export const getEmailSuggestions = (input) => {
    if (!input) return [];

    const commonProviders = [
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "icloud.com"
    ];

    const commonTLDs = [
        ".com",
        ".in",
        ".co",
        ".net",
        ".org"
    ];

    // Case 1: Before "@" is typed
    if (!input.includes("@")) {
        return commonProviders.map(provider => `${input}@${provider}`);
    }

    const [localPart, domainPart] = input.split("@");

    // Case 2: After "@" is typed but no domain yet
    if (domainPart === "" || domainPart === undefined) {
        return commonProviders.map(provider => `${localPart}@${provider}`);
    }

    // Case 3: Partial provider name typed
    const matchingProviders = commonProviders.filter(provider =>
        provider.startsWith(domainPart.toLowerCase())
    );

    if (matchingProviders.length > 0) {
        return matchingProviders.map(provider => `${localPart}@${provider}`);
    }

    // Case 4: Custom domain (not in top providers)
    // Check if user is typing a TLD (starts with dot or has dot in domainPart)
    // Actually the requirement says "Suggest common TLDs like...". 
    // This usually means appending TLDs to what they typed.

    // If the domainPart already has a dot, we might check if it matches a common TLD ending
    // But usually we just append if it looks like they are finishing the domain.
    // However, simplest logic for "john@abc" -> "john@abc.com"

    return commonTLDs.map(tld => {
        // Avoid double dots if user typed one
        if (domainPart.endsWith(".")) {
            // "abc." + ".com" -> "abc..com" (bad)
            // "abc." + "com" (better)
            const tldWithoutDot = tld.substring(1);
            return `${localPart}@${domainPart}${tldWithoutDot}`;
        }
        return `${localPart}@${domainPart}${tld}`;
    });
};
