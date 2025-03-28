/**
 * @fileoverview TeaCast Header Component
 * 
 * This component serves as the main navigation header for TeaCast, featuring:
 * - TeaCast logo and branding
 * - Main navigation links
 * - Responsive layout
 * 
 * The header remains consistent across all pages and provides
 * easy access to key sections of the application.
 * 
 * @module Header
 * @requires react
 * @requires react-router-dom
 * @requires ../Assets/Styles/Header.css
 * @requires ../Assets/Images/TeaCast Logo.png
 */

import React from 'react';
import { Link } from 'react-router-dom';
import '../Assets/Styles/Header.css';
import teacastLogo from '../Assets/Images/TeaCast Logo.png';

/**
 * Header component that contains the navigation links and logo.
 * Provides consistent navigation across the application.
 * 
 * Navigation links include:
 * - Home
 * - Prediction
 * - Analytics
 * - Login
 * - About
 * 
 * @component
 * @returns {JSX.Element} The header with logo and navigation
 */
function Header() {
    return (
        <header className="header">
            {/* Logo and branding section */}
            <div className="logo">
                <Link to="/">
                    <img src={teacastLogo} alt="TeaCast Logo" className="logo-image" />
                    TeaCast
                </Link>
            </div>

            {/* Main navigation menu */}
            <nav>
                <Link to="/">Home</Link>
                <Link to="/predictions">Prediction</Link>
                <Link to="/analytics">Analytics</Link>
                <Link to="/login">Login</Link>
                <Link to="/about">About</Link>
            </nav>
        </header>
    );
}

export default Header;
