import axios from 'axios';
import { getApiUrl } from '../utils/apiUtils';

/**
 * Retrieves all training sessions.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of training session objects.
 * Each object contains information such as the date, duration, activity, and links related to the training session.
 * For detailed response structure, see the documentation.
 * @see https://juhahinkula.github.io/personaltrainerdocs/trainings/
 */
export const getTrainings = async () => {
    try {
        const response = await axios.get(getApiUrl('api/trainings'));
        return response;
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * Retrieves all training sessions along with their associated customer information.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of training session objects,
 * each containing details like the training session's id, date, duration, activity, and the associated customer's information.
 * For detailed response structure, see the documentation.
 * @see https://juhahinkula.github.io/personaltrainerdocs/trainings/
 */
export const getTrainingsWithCustomerInfo = async () => {
    try {
        const response = await axios.get(getApiUrl('api/gettrainings'));
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * Adds a new training session and links it to a customer.
 *
 * @param {Object} training - The training session object containing the date, activity, duration, and customer link.
 * @returns {Promise<Object>} A promise that resolves to the newly created training session object.
 * If successful, the API returns a 201 Created status code.
 * For detailed request and response structure, see the documentation.
 * @see https://juhahinkula.github.io/personaltrainerdocs/trainings/
 */
export const createTraining = async (training) => {
    try {
        const response = await axios.post(getApiUrl('api/trainings'), training, {
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
 * Deletes a specific training session by its ID.
 *
 * @param {number} id - The unique identifier of the training session.
 * @returns {Promise<void>} A promise that resolves when the training session is successfully deleted.
 * If the training session with the provided id does not exist, the API returns a 404 Not Found status code.
 * For detailed request and response structure, see the documentation.
 * @see https://juhahinkula.github.io/personaltrainerdocs/trainings/
 */
export const deleteTraining = async (id) => {
    try {
        const response = await axios.delete(getApiUrl('api/trainings/:id', { id }));
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}