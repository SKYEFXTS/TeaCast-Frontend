/**
 * @fileoverview TeaCast Prediction Page Component
 * 
 * This component displays tea price predictions using both a line chart visualization
 * and a detailed table. It fetches prediction data from the API and handles various
 * states including loading and error conditions.
 * 
 * Features:
 * - Interactive line chart with dynamic Y-axis scaling
 * - Detailed predictions table with auction numbers
 * - Loading and error state handling
 * - Responsive design for various screen sizes
 * 
 * @module Prediction
 * @requires react
 * @requires recharts
 * @requires ../Components/Header
 * @requires ../Components/Footer
 * @requires ../API/API
 * @requires ../Assets/Styles/Prediction.css
 */

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { getPrediction } from '../API/API';
import '../Assets/Styles/Prediction.css';

/**
 * Prediction page component that displays tea price predictions.
 * Shows both a line chart visualization and a detailed table of predictions.
 * Handles loading states, error cases, and data presentation.
 * 
 * @component
 * @returns {JSX.Element} The prediction page with chart and table
 */
function Prediction() {
    // State management for prediction data and UI states
    const [predictionData, setPredictionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [yAxisRange, setYAxisRange] = useState({ min: 0, max: 2000 });

    /**
     * Calculates the Y-axis range based on prediction data.
     * Rounds to nearest thousand for clean axis labels.
     * 
     * @param {Array} data - Array of prediction data points
     * @returns {Object} Object containing min and max Y-axis values
     */
    const calculateYAxisRange = (data) => {
        if (!data || data.length === 0) return { min: 0, max: 2000 };

        const values = data.map(item => item.Final_Prediction);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);

        // Find the nearest lower 1000 for minimum
        const minRange = Math.floor(minValue / 1000) * 1000;
        // Find the nearest upper 1000 for maximum
        const maxRange = Math.ceil(maxValue / 1000) * 1000;

        return { min: minRange, max: maxRange };
    };

    /**
     * Fetches prediction data when component mounts.
     * Handles data validation, loading states, and error cases.
     * Updates component state based on API response.
     * 
     * @async
     * @function fetchPredictionData
     * @throws {Error} When API call fails or data format is invalid
     */
    useEffect(() => {
        const fetchPredictionData = async () => {
            try {
                setLoading(true);
                const data = await getPrediction();
                
                // Validate that we received an array of predictions
                if (Array.isArray(data)) {
                    setPredictionData(data);
                    // Calculate and set Y-axis range when data is received
                    setYAxisRange(calculateYAxisRange(data));
                } else {
                    throw new Error('Invalid prediction data format');
                }
            } catch (error) {
                console.error('Error fetching prediction data:', error);
                setError('Failed to load prediction data');
            } finally {
                setLoading(false);
            }
        };

        fetchPredictionData();
    }, []);

    /**
     * Renders loading state view
     * @returns {JSX.Element} Loading indicator component
     */
    if (loading) {
        return (
            <div className="prediction-page">
                <Header />
                <main className="loading-container">
                    <div className="loading">Loading prediction data...</div>
                </main>
                <Footer />
            </div>
        );
    }

    /**
     * Renders error state view
     * @returns {JSX.Element} Error message component
     */
    if (error) {
        return (
            <div className="prediction-page">
                <Header />
                <main className="error-container">
                    <div className="error-message">{error}</div>
                </main>
                <Footer />
            </div>
        );
    }

    /**
     * Main render method for the prediction page
     * Displays the chart and table when data is available
     */
    return (
        <div className="prediction-page">
            <Header />
            <main className="prediction-content">
                <h1>Tea Price Predictions</h1>
                
                <div className="prediction-grid">
                    {/* Chart Section - Displays prediction trend line */}
                    <div className="chart-card">
                        <div className="chart-title">
                            <h2>Price Prediction Trend</h2>
                            <span className="tea-grade">(Western High - BOPF/BOPFSp)</span>
                        </div>
                        <div className="chart-container">
                            {/* Responsive chart container with fixed height */}
                            <ResponsiveContainer width="100%" height={450}>
                                <LineChart 
                                    data={predictionData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    {/* Grid lines for better readability */}
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    
                                    {/* X-axis configuration - Auction numbers */}
                                    <XAxis 
                                        dataKey="Auction_Number"
                                        tickFormatter={(value) => value}
                                        interval={1}
                                        label={{ 
                                            value: 'Auction Number',
                                            position: 'insideBottom',
                                            offset: -5
                                        }}
                                    />
                                    
                                    {/* Y-axis configuration - Dynamic range */}
                                    <YAxis 
                                        domain={[yAxisRange.min, yAxisRange.max]}
                                        label={{ 
                                            value: 'Price (LKR)',
                                            angle: -90,
                                            position: 'insideLeft',
                                            offset: -5
                                        }}
                                    />
                                    
                                    {/* Interactive tooltip with custom formatting */}
                                    <Tooltip 
                                        labelFormatter={(value) => `Auction ${value}`}
                                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #006D5B' }}
                                    />
                                    
                                    {/* Price prediction line with custom styling */}
                                    <Line 
                                        type="monotone" 
                                        dataKey="Final_Prediction" 
                                        stroke="#006D5B" 
                                        strokeWidth={2}
                                        dot={false}
                                        name="Price Prediction(LKR)"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Table Section - Detailed predictions with scrollable container */}
                    <div className="table-card">
                        <h2>Detailed Predictions</h2>
                        <div className="table-container">
                            <table className="prediction-table">
                                <thead>
                                    <tr>
                                        <th>Auction Number</th>
                                        <th>Predicted Price (LKR)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Map prediction data to table rows with formatting */}
                                    {predictionData && predictionData.map((prediction, index) => (
                                        <tr key={index}>
                                            <td>{prediction.Auction_Number}</td>
                                            <td>{prediction.Final_Prediction.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Prediction;