/**
 * Extracts the object's ID from a given href.
 *
 * @param {string} href - The href containing the object's ID.
 * @returns {string} The extracted ID.
 */
export const getIdFromHref = (href) => {
    return href?.split('/').pop() || '';
}