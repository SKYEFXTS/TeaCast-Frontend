import React from 'react';
import '../Assets/Styles/TeaAuctionPrices.css';

/**
 * TeaAuctionPrices component that displays the auction data in a grid format.
 * @param {Array} auctionData - The array of auction data to display.
 */
function TeaAuctionPrices({ auctionData }) {
    return (
        <div className="auction-grid">
            {auctionData.length > 0 ? (
                auctionData.map((tea, index) => (
                    <div className="auction-card" key={index}>
                        <h3>{tea.name}</h3>
                        <div className="auction-details">
                            <p>Auction Date: {tea.date}</p>
                            <p>Starting Price: {tea.price}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No auction data available.</p>
            )}
        </div>
    );
}

export default TeaAuctionPrices;