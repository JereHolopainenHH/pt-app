/**
 * Extracts the customer ID from a given URL.
 *
 * @param {string} url - The URL containing the customer ID.
 * @returns {string} The extracted customer ID.
 */
export const getIdFromCustomerHref = (url) => {
    return url.split('/').pop();
}