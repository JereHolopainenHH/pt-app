const baseUrl = import.meta.env.VITE_API_URL;

/**
 * Constructs a full API URL by appending the endpoint to the base URL
 * and replacing dynamic path parameters (e.g., `:id`) with their corresponding values from the `params` object.
 *
 * @param {string} endpoint - The endpoint path, which may include dynamic placeholders (e.g., ":id").
 * @param {Object} [params={}] - An object containing key-value pairs where the key matches a placeholder in the endpoint.
 *                                These key-value pairs will replace the corresponding placeholders in the `endpoint`.
 * @returns {string} The constructed URL with all placeholders replaced by the values from the `params` object.
 */
export const getApiUrl = (endpoint, params = {}) => {

    // Replace dynamic path parameters like :id in the endpoint
    let url = `${baseUrl.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`;
    for (const [key, value] of Object.entries(params)) {
        url = url.replace(`:${key}`, value);
    }
    return url;
}