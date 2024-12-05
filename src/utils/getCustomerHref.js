/**
 * Extracts the self href link from a customer object.
 *
 * @param {Object} customer - The customer object containing the _links property.
 * @returns {string} The self href link of the customer.
 */
export const getCustomerHref = (customer) => {
    return customer._links.self.href;
}