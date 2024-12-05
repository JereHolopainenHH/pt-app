import axios from 'axios';

import { getApiUrl } from '../utils/apiUtils';

/**
 * Retrieves all customers from the API.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of customer objects.
 * For detailed response structure, see the documentation.
 * @see https://juhahinkula.github.io/personaltrainerdocs/customers/
 */
export const getCustomers = async () => {
    try {
        const response = await axios.get(getApiUrl('api/customers'));
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * Retrieves a specific customer by their ID.
 *
 * @param {number} id - The unique identifier of the customer.
 * @returns {Promise<Object>} A promise that resolves to the customer's details.
 * For detailed response structure, see the documentation.
 * @see https://juhahinkula.github.io/personaltrainerdocs/customers/
 */
export const getCustomerById = async (id) => {
    try {
        const response = await axios.get(getApiUrl('api/customers/:id', { id }));
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * Creates a new customer.
 *
 * @param {Object} customer - The customer object containing the required fields.
 * @returns {Promise<Object>} A promise that resolves to the newly created customer object.
 * For detailed request and response structure, see the documentation.
 * @see https://juhahinkula.github.io/personaltrainerdocs/customers/
 */
export const createCustomer = async (customer) => {
    try {
        const response = await axios.post(getApiUrl('api/customers'), customer, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * Updates an existing customer's details.
 *
 * @param {Object} customer - The customer object containing the '_links.self.href' for identifying the customer to be updated.
 * @param {Object} updatedCustomer - The customer object containing the fields to be updated.
 * @returns {Promise<Object>} A promise that resolves to the updated customer object.
 * For detailed request and response structure, see the documentation.
 * @see https://juhahinkula.github.io/personaltrainerdocs/customers/
 */
export const updateCustomer = async (customer, updatedCustomer) => {
    try {
        const response = await axios.put(customer._links.self.href, updatedCustomer, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

/**
 * Deletes a specific customer by using the customer object.
 *
 * @param {Object} customer - The customer object containing the '_links.self.href' to identify the customer to be deleted.
 * @returns {Promise<Object>} A promise that resolves to the response after deletion.
 * For detailed response structure, see the documentation.
 * @see https://juhahinkula.github.io/personaltrainerdocs/customers/
 */
export const deleteCustomer = async (customer) => {
    try {
        const response = await axios.delete(customer._links.self.href);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}