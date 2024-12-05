import { getApiUrl } from './apiUtils';

export const getUniqueCustomersFromTrainings = (trainings) => {
    const uniqueCustomers = [];
    const customerIds = new Set();
    console.log(trainings);
    trainings.forEach((training) => {
        if (!customerIds.has(training.customer.id)) {
            customerIds.add(training.customer.id);
            uniqueCustomers.push(training.customer);
        }
    });
    console.log(uniqueCustomers);
    return uniqueCustomers;
};

export const formatCustomerHref = (id) => {
    return getApiUrl('api/customers/:id', { id });
}

export const formatTrainingResponse = (response, customer) => {
    console.log(response, customer);
    return {
        date: response.date,
        activity: response.activity,
        duration: response.duration,
        customer: customer
    }
}