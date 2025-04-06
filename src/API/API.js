/* ==========================================================================
   TeaCast - API Service Module
   
   This module handles all API interactions for the TeaCast application.
   It includes:
   - User authentication
   - Prediction data fetching
   - Tea auction price data
   - Dashboard data retrieval
   
   Dependencies:
   - Axios for HTTP requests
   
   Author: TeaCast Development Team
   ========================================================================== */

import axios from 'axios';

/* ==========================================================================
   API Configuration
   Base URL for all API endpoints
   ========================================================================== */
const apiUrl = 'http://127.0.0.1:5000';

/* ==========================================================================
   Authentication Functions
   User login and authentication handling
   ========================================================================== */

/**
 * Logs in a user with the provided username and password.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} The response data from the login API.
 */
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${apiUrl}/login`, { username, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/* ==========================================================================
   Data Fetching Functions
   Core API interaction functions for various data types
   ========================================================================== */

/**
 * Fetches prediction data from the API.
 * @returns {Promise<Array|null>} The prediction data or null if no predictions.
 */
export const getPrediction = async () => {
    try {
        console.log('Fetching predictions from:', `${apiUrl}/data/predict`);
        const response = await axios.get(`${apiUrl}/data/predict`);
        console.log('Prediction API Response:', response);
        
        if (response.data && response.data.prediction !== undefined) {
            // If prediction is null, return null (valid case with no data)
            if (response.data.prediction === null) {
                return null;
            }
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

/**
 * Fetches tea auction prices from the API.
 * @returns {Promise<Array>} The average tea auction prices.
 */
export const getTeaAuctionPrices = async () => {
    try {
        const response = await axios.get(`${apiUrl}/data/tea-auction-price`);
        return response.data.average_prices;
    } catch (error) {
        console.error("Error fetching tea auction prices:", error);
        return [];
    }
};

/**
 * Fetches dashboard data from the API.
 * @returns {Promise<Object>} The dashboard data.
 */
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