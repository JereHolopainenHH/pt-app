import axios from 'axios';

const resetApiUrl = import.meta.env.VITE_RESET_DATABASE_URL;

export const resetDatabase = async () => {
    try {
        const response = await axios.post(resetApiUrl);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};