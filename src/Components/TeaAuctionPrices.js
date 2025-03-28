/**
 * @fileoverview TeaCast Tea Auction Prices Component
 * 
 * This component displays tea auction data in a grid format, showing:
 * - Tea name
 * - Auction date
 * - Starting price
 * 
 * The component receives auction data as props and renders it in a
 * responsive grid layout with individual cards for each tea item.
 * 
 * @module TeaAuctionPrices
 * @requires react
 * @requires ../Assets/Styles/TeaAuctionPrices.css
 */

import React from 'react';
import '../Assets/Styles/TeaAuctionPrices.css';

/**
 * TeaAuctionPrices component that displays the auction data in a grid format.
 * 
 * Features:
 * - Grid layout for auction items
 * - Individual cards for each tea
 * - Fallback message for empty data
 * 
 * @param {Array} auctionData - The array of auction data to display.
 * @returns {JSX.Element} Grid of auction cards or empty state message
 */
function TeaAuctionPrices({ auctionData }) {
    return (
        // Main grid container for auction items
        <div className="auction-grid">
            {/* Conditional rendering based on data availability */}
            {auctionData.length > 0 ? (
                // Map through auction data to create cards
                auctionData.map((tea, index) => (
                    // Individual auction card
                    <div className="auction-card" key={index}>
                        {/* Tea name heading */}
                        <h3>{tea.name}</h3>
                        {/* Tea details container */}
                        <div className="auction-details">
                            <p>Auction Date: {tea.date}</p>
                            <p>Starting Price: {tea.price}</p>
                        </div>
                    </div>
                ))
            ) : (
                // Fallback message when no data is available
                <p>No auction data available.</p>
            )}
        </div>
    );
}

export default TeaAuctionPrices;