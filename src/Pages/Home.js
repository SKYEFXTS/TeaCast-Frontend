import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import TeaAuctionPrices from '../Components/TeaAuctionPrices';
import '../Assets/Styles/Home.css';
import teaIllustration from '../Assets/Images/TeaCast Illust 1 Low.png';
import { getTeaAuctionPrices } from '../API/API';

function HomePage() {
    const [auctionData, setAuctionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                <section className="hero-section">
                    <div className="hero-text">
                        <h1>Welcome to TeaCast</h1>
                        <p>Discover the world of tea auctions, and let our predictions guide you in making informed decisions.
                            Dive into the rich history and future of tea trading with TeaCast.</p>
                        <div className="button-group">
                            <Link to="/analytics" className="cta-button">Go to Analytics</Link>
                            <Link to="/predictions" className="cta-button">Go to Predictions</Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={teaIllustration} alt="Tea Illustration" />
                    </div>
                </section>

                <section className="auction-section">
                    <h2>Current Tea Auction Prices</h2>
                    
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