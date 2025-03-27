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

    useEffect(() => {
        getTeaAuctionPrices()
            .then(data => {
                console.log('Fetched data:', data);
                setAuctionData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
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
                        <Link to="/predictions" className="cta-button">Go to Predictions</Link>
                    </div>
                    <div className="hero-image">
                        <img src={teaIllustration} alt="Tea Illustration" />
                    </div>
                </section>

                <section className="auction-section">
                    <h2>Current Tea Auction Prices</h2>
                    <TeaAuctionPrices auctionData={auctionData} />
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default HomePage;