import axios from 'axios';

const apiUrl = 'http://127.0.0.1:5000';

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${apiUrl}/login`, { username, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPrediction = async () => {
    try {
        const response = await axios.get(`${apiUrl}/predict`);
        return response.data.prediction;
    } catch (error) {
        throw error;
    }
};
