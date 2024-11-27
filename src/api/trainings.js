import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const getTrainings = async () => {
    try {
        const response = await axios.get(`${apiUrl}/trainings`);
        const trainingsWithCustomers = await Promise.all(response.data._embedded.trainings.map(async (training) => {
            const customer = await getTrainingCustomer(training._links.customer.href);
            return { ...training, customer: customer || null };
        }));
        return trainingsWithCustomers;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const getTrainingCustomer = async (link) => {
    try {
        const response = await axios.get(link);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}