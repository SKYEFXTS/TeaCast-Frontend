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
        console.log('Fetching predictions from:', `${apiUrl}/data/predict`);
        const response = await axios.get(`${apiUrl}/data/predict`);
        console.log('Prediction API Response:', response);
        
        if (response.data && response.data.prediction) {
            return response.data.prediction;
        } else {
            console.warn('Unexpected API response structure:', response.data);
            throw new Error('Invalid API response format');
        }
    } catch (error) {
        console.error("Error fetching predictions:", error);
        throw error;
    }
};

export const getTeaAuctionPrices = async () => {
    try {
        const response = await axios.get(`${apiUrl}/data/tea-auction-price`);
        return response.data.average_prices;
    } catch (error) {
        console.error("Error fetching tea auction prices:", error);
        return [];
    }
};

export const getDashboardData = async () => {
    try {
        console.log('Fetching dashboard data from:', `${apiUrl}/data/dashboard`);
        const response = await axios.get(`${apiUrl}/data/dashboard`);
        console.log('Dashboard API Response:', response);
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error;
    }
};