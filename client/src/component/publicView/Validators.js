/**
 * Checks if the given value is not empty.
 * @param {string} value - The value to check.
 * @returns {boolean} - True if the value is not empty.
 */
export const isNotEmpty = (value) => {
    return value.trim() !== '';
};

export const isValidEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};