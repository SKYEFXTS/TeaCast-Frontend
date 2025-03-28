import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { getPrediction } from '../API/API';
import '../Assets/Styles/Prediction.css';

/**
 * Prediction page component that displays tea price predictions.
 */
function Prediction() {
    const [predictionData, setPredictionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPredictionData = async () => {
            try {
                setLoading(true);
                const data = await getPrediction();
                // Ensure we have an array of predictions
                if (Array.isArray(data)) {
                    setPredictionData(data);
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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

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

    return (
        <div className="prediction-page">
            <Header />
            <main className="prediction-content">
                <h1>Tea Price Predictions</h1>
                
                <div className="prediction-grid">
                    {/* Chart Section */}
                    <div className="chart-card">
                        <div className="chart-title">
                            <h2>Price Prediction Trend</h2>
                            <span className="tea-grade">(Western High - BOPF/BOPFSp)</span>
                        </div>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={350}>
                                <LineChart 
                                    data={predictionData}
                                    margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis 
                                        dataKey="Auction_Number"
                                        tickFormatter={(value) => value}
                                        interval={1}
                                        label={{ 
                                            value: 'Auction Number',
                                            position: 'insideBottom',
                                            offset: -15
                                        }}
                                    />
                                    <YAxis 
                                        label={{ 
                                            value: 'Price (LKR)',
                                            angle: -90,
                                            position: 'insideLeft',
                                            offset: -5
                                        }}
                                    />
                                    <Tooltip 
                                        labelFormatter={(value) => `Auction ${value}`}
                                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #006D5B' }}
                                    />
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

                    {/* Table Section */}
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
                                    {predictionData && predictionData.map((prediction, index) => (
                                        <tr key={index}>
                                            <td>{prediction.Auction_Number}</td>
                                            <td>LKR {prediction.Final_Prediction.toFixed(2)}</td>
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