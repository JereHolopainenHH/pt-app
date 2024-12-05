/**
 * Formats the training response.
 *
 * @param {Object} response - The response object from the API.
 * @param {Object} customer - The customer object associated with the training.
 * @returns {Object} The formatted training object.
 */
export const formatTrainingResponse = (response, customer) => {
    return {
        ...response,
        customer: customer
    }
}