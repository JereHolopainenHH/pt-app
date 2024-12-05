/**
 * Extracts the self href link from an object.
 *
 * @param {Object} object - The object containing the _links property.
 * @returns {string} The self href link of the object.
 */
export const getHref = (object) => {
    return object?._links.self.href || '';
}