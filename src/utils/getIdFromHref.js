/**
 * Extracts the customer ID from a given href.
 *
 * @param {string} href - The href containing the customer ID.
 * @returns {string} The extracted customer ID.
 */
export const getIdFromHref = (href) => {
    return href.split('/').pop();
}