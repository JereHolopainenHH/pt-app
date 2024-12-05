import { getApiUrl } from './apiUtils';

/**
 * Extracts unique customers from a list of trainings.
 *
 * @param {Array} trainings - The list of trainings.
 * @returns {Array} An array of unique customer objects.
 */
export const getUniqueCustomersFromTrainings = (trainings) => {
    const uniqueCustomers = [];
    const customerIds = new Set();
    trainings.forEach((training) => {
        if (!customerIds.has(training.customer.id)) {
            customerIds.add(training.customer.id);
            uniqueCustomers.push(training.customer);
        }
    });
    return uniqueCustomers;
};

/**
 * Formats the customer href URL.
 *
 * @param {number} id - The unique identifier of the customer.
 * @returns {string} The formatted customer href URL.
 */
export const formatCustomerHref = (id) => {
    return getApiUrl('api/customers/:id', { id });
}

/**
 * Formats the training response.
 *
 * @param {Object} response - The response object from the API.
 * @param {Object} customer - The customer object associated with the training.
 * @returns {Object} The formatted training object.
 */
export const formatTrainingResponse = (response, customer) => {
    return {
        date: response.date,
        activity: response.activity,
        duration: response.duration,
        customer: customer
    }
}