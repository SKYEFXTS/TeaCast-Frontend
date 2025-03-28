/**
 * @fileoverview TeaCast Dashboard Page Component
 * 
 * This component displays the main analytics dashboard featuring multiple visualizations:
 * - Tea price trends over time
 * - Priority tea category prices
 * - USD-LKR exchange rates
 * - Crude oil price trends
 * 
 * @module Dashboard
 * @requires react
 * @requires recharts
 * @requires ../Components/Header
 * @requires ../Components/Footer
 * @requires ../API/API
 * @requires ../Assets/Styles/Dashboard.css
 */

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { getDashboardData } from '../API/API';
import '../Assets/Styles/Dashboard.css';

/**
 * Dashboard page component that displays analytics and trends.
 * Shows multiple interactive charts and price tiles for different tea categories.
 * 
 * @component
 * @returns {JSX.Element} The dashboard page with charts and price tiles
 */
function Dashboard() {
    // State management for dashboard data and UI states
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Priority tea categories in specific order for consistent display
    const priorityCategories = [
        'WESTERN MEDIUM', 'WESTERN HIGH', 'NUWARA ELIYAS',
        'UDAPUSSELLAWAS', 'LOW GROWNS', 'UVA MEDIUM',
        'UVA HIGH', 'UNORTHODOX HIGH', 'UNORTHODOX LOW'
    ];

    /**
     * Fetches dashboard data when component mounts.
     * Retrieves tea prices, exchange rates, and other economic indicators.
     */
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const data = await getDashboardData();
                setDashboardData(data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setError('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    /**
     * Formats date strings for display in charts and tooltips
     * @param {string} dateString - The date string to format
     * @returns {string} Formatted date string (e.g., "Jan 15")
     */
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    /**
     * Renders loading state view
     * @returns {JSX.Element} Loading indicator component
     */
    if (loading) {
        return (
            <div className="dashboard-page">
                <Header />
                <main className="loading-container">
                    <div className="loading">Loading dashboard data...</div>
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
            <div className="dashboard-page">
                <Header />
                <main className="error-container">
                    <div className="error-message">{error}</div>
                </main>
                <Footer />
            </div>
        );
    }

    // Filter out non-priority categories for the "Other Categories" section
    const otherCategories = Object.keys(dashboardData?.all_average_price_data || {})
        .filter(category => !priorityCategories.includes(category));

    /**
     * Main render method for the dashboard page
     * Displays charts, price tiles, and economic indicators
     */
    return (
        <div className="dashboard-page">
            <Header />
            <main className="dashboard-content">
                <h1>Tea Market Analytics Dashboard</h1>

                <div className="main-grid">
                    {/* Tea Price Trends Chart */}
                    <div className="main-chart">
                        <div className="chart-card">
                            <h2>
                                Tea Price Trends
                                <span className="tea-grade">(Western High - BOPF/BOPFSp)</span>
                            </h2>
                            <div className="chart-container">
                                <ResponsiveContainer width="100%" height="100%" minHeight={400}>
                                    <LineChart 
                                        data={dashboardData?.tea_price_data?.tea_prices}
                                        margin={{ top: 15, right: 5, left: 25, bottom: 5 }}
                                    >
                                        {/* Grid lines for better readability */}
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                        
                                        {/* X-axis configuration */}
                                        <XAxis 
                                            dataKey="date" 
                                            tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', {
                                                month: 'short'
                                            })}
                                            interval={6}
                                        />
                                        
                                        {/* Y-axis configuration */}
                                        <YAxis 
                                            label={{
                                                value: 'Price (LKR)',
                                                angle: -90,
                                                position: 'insideLeft',
                                                offset: -15
                                            }}
                                        />
                                        
                                        {/* Interactive tooltip */}
                                        <Tooltip 
                                            labelFormatter={formatDate}
                                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #006D5B' }}
                                        />
                                        
                                        {/* Price trend line */}
                                        <Line 
                                            type="monotone" 
                                            dataKey="price" 
                                            stroke="#006D5B" 
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Priority Tea Categories Grid */}
                    <div className="priority-grid">
                        {priorityCategories.map((category) => (
                            dashboardData?.all_average_price_data[category] && (
                                <div className="price-tile" key={category}>
                                    <h3>{category.replace(/_/g, ' ')}</h3>
                                    <div className="price-info">
                                        <p className="price">
                                            LKR {dashboardData.all_average_price_data[category].average_price.toFixed(2)}
                                        </p>
                                        <p className="date">{dashboardData.all_average_price_data[category].date}</p>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>

                {/* Other Tea Categories Section */}
                <section className="other-categories">
                    <h2>Other Tea Categories</h2>
                    <div className="other-tiles">
                        {otherCategories.map((category) => (
                            dashboardData?.all_average_price_data[category] && (
                                <div className="price-tile" key={category}>
                                    <h3>{category.replace(/_/g, ' ')}</h3>
                                    <div className="price-info">
                                        <p className="price">
                                            LKR {dashboardData.all_average_price_data[category].average_price.toFixed(2)}
                                        </p>
                                        <p className="date">{dashboardData.all_average_price_data[category].date}</p>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </section>

                {/* Economic Indicators Section */}
                <section className="additional-charts">
                    <h2 className="section-header">Economic Indicators</h2>
                    
                    {/* USD-LKR Exchange Rate Chart */}
                    <div className="chart-card">
                        <h2>USD-LKR Exchange Rate</h2>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%" minHeight={400}>
                                <LineChart 
                                    data={dashboardData?.tea_price_data?.usd_rates}
                                    margin={{ top: 15, right: 5, left: -5, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis 
                                        dataKey="date" 
                                        tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', {
                                            month: 'short'
                                        })}
                                        interval={6}
                                    />
                                    <YAxis 
                                        label={{
                                            value: 'LKR',
                                            angle: -90,
                                            position: 'insideLeft',
                                            offset: 12
                                        }}
                                    />
                                    <Tooltip 
                                        labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #006D5B' }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="rate" 
                                        stroke="#006D5B" 
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Crude Oil Price Chart */}
                    <div className="chart-card">
                        <h2>Crude Oil Price Trends</h2>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%" minHeight={400}>
                                <LineChart 
                                    data={dashboardData?.tea_price_data?.crude_oil_prices}
                                    margin={{ top: 15, right: 5, left: 13, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis 
                                        dataKey="date" 
                                        tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', {
                                            month: 'short'
                                        })}
                                        interval={6}
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
                                        labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #006D5B' }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="price" 
                                        stroke="#006D5B" 
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Dashboard;
