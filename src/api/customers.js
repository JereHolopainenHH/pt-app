import axios from 'axios';
import { getApiUrl } from '../utils/getApiUrl';
import { getHref } from '../utils/getHref';

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
 * @param {Object} formData - The updated customer details.
 * @returns {Promise<Object>} A promise that resolves to the edited customer object.
 * For detailed request and response structure, see the documentation.
 * @see https://juhahinkula.github.io/personaltrainerdocs/customers/
 */
export const editCustomer = async (customer, formData) => {
    try {
        const response = await axios.put(getHref(customer), formData, {
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
 * @param {Object} customerHref -- The customer's '_links.self.href' property.
 * @returns {Promise<Object>} A promise that resolves to the response after deletion.
 * For detailed response structure, see the documentation.
 * @see https://juhahinkula.github.io/personaltrainerdocs/customers/
 */
export const deleteCustomer = async (customerHref) => {
    try {
        const response = await axios.delete(customerHref);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}