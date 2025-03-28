import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { getDashboardData } from '../API/API';
import '../Assets/Styles/Dashboard.css';

/**
 * Dashboard page component that displays graphs of tea prices, USD rates, and crude oil prices over the past year.
 */
function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Priority tea categories in specific order
    const priorityCategories = [
        'WESTERN MEDIUM', 'WESTERN HIGH', 'NUWARA ELIYAS',
        'UDAPUSSELLAWAS', 'LOW GROWNS', 'UVA MEDIUM',
        'UVA HIGH', 'UNORTHODOX HIGH', 'UNORTHODOX LOW'
    ];

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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

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

    // Separate priority categories from others
    const otherCategories = Object.keys(dashboardData?.all_average_price_data || {})
        .filter(category => !priorityCategories.includes(category));

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
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart data={dashboardData?.tea_price_data?.tea_prices}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                        <XAxis 
                                            dataKey="date" 
                                            tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', {
                                                month: 'short'
                                            })}
                                            interval={6}
                                        />
                                        <YAxis />
                                        <Tooltip 
                                            labelFormatter={formatDate}
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

                {/* Other Tea Categories */}
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

                {/* Additional Charts */}
                <section className="additional-charts">
                    <h2 className="section-header">Economic Indicators</h2>
                    <div className="chart-card">
                        <h2>USD-LKR Exchange Rate</h2>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={dashboardData?.tea_price_data?.usd_rates}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis 
                                        dataKey="date" 
                                        tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', {
                                            month: 'short'
                                        })}
                                        interval={6}
                                    />
                                    <YAxis />
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

                    <div className="chart-card">
                        <h2>Crude Oil Price Trends</h2>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={dashboardData?.tea_price_data?.crude_oil_prices}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis 
                                        dataKey="date" 
                                        tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', {
                                            month: 'short'
                                        })}
                                        interval={6}
                                    />
                                    <YAxis />
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
