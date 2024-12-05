import axios from 'axios';
import { getApiUrl } from '../utils/apiUtils';

/**
 * Resets the database by deleting all data and repopulating it with the original demo data.
 *
 * @returns {Promise<string>} A promise that resolves to a confirmation message, e.g., "DB reset done",
 * if the reset operation is successful (HTTP 200 OK). If the operation fails, an appropriate error status code
 * and message will be returned.
 * For detailed response structure, see the documentation.
 * @see https://juhahinkula.github.io/personaltrainerdocs/
 */
export const resetDatabase = async () => {
    try {
        const response = await axios.post(getApiUrl('reset'));
        return response.data
    } catch (error) {
        console.error(error);
        return error;
    }
};