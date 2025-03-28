/**
 * @fileoverview TeaCast Home Page Component
 * 
 * This component serves as the landing page for TeaCast, featuring:
 * - Welcome message and hero section
 * - Call-to-action buttons for Analytics and Predictions
 * - Real-time tea auction prices display
 * - Responsive layout for various screen sizes
 * 
 * @module HomePage
 * @requires react
 * @requires react-router-dom
 * @requires ../Components/Header
 * @requires ../Components/Footer
 * @requires ../Components/TeaAuctionPrices
 * @requires ../API/API
 * @requires ../Assets/Styles/Home.css
 * @requires ../Assets/Images/TeaCast Illust 1 Low.png
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import TeaAuctionPrices from '../Components/TeaAuctionPrices';
import '../Assets/Styles/Home.css';
import teaIllustration from '../Assets/Images/TeaCast Illust 1 Low.png';
import { getTeaAuctionPrices } from '../API/API';

/**
 * Home page component that displays the welcome message and current tea auction prices.
 * Fetches and displays real-time tea auction data, with loading and error states.
 * 
 * @component
 * @returns {JSX.Element} The home page with hero section and auction prices
 */
function HomePage() {
    // State management for auction data and UI states
    const [auctionData, setAuctionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Fetches tea auction data when component mounts
     * Handles loading states and error scenarios
     * 
     * @async
     * @function fetchAuctionData
     * @throws {Error} When API call fails
     */
    useEffect(() => {
        const fetchAuctionData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getTeaAuctionPrices();
                
                if (data && data.length > 0) {
                    setAuctionData(data);
                } else {
                    setError('No auction data available');
                    setAuctionData([]);
                }
            } catch (error) {
                console.error("Error fetching tea auction data:", error);
                setError('Failed to load auction data');
                setAuctionData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAuctionData();
    }, []);

    return (
        <div className="home-page">
            <Header />
            <main className="main-content">
                {/* Hero Section - Welcome message and CTA buttons */}
                <section className="hero-section">
                    <div className="hero-text">
                        <h1>Welcome to TeaCast</h1>
                        <p>Discover the world of tea auctions, and let our predictions guide you in making informed decisions.
                            Dive into the rich history and future of tea trading with TeaCast.</p>
                        {/* Navigation buttons for main features */}
                        <div className="button-group">
                            <Link to="/analytics" className="cta-button">Go to Analytics</Link>
                            <Link to="/predictions" className="cta-button">Go to Predictions</Link>
                        </div>
                    </div>
                    {/* Hero illustration */}
                    <div className="hero-image">
                        <img src={teaIllustration} alt="Tea Illustration" />
                    </div>
                </section>

                {/* Tea Auction Prices Section */}
                <section className="auction-section">
                    <h2>Current Tea Auction Prices</h2>
                    
                    {/* Conditional rendering based on data state */}
                    {loading ? (
                        <div className="loading">Loading auction data...</div>
                    ) : error ? (
                        <div className="error-message">
                            {error}
                        </div>
                    ) : auctionData.length > 0 ? (
                        <TeaAuctionPrices auctionData={auctionData} />
                    ) : (
                        <div className="no-data">No auction data available.</div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default HomePage;