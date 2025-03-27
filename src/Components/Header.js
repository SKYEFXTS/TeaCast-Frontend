import React from 'react';
import { Link } from 'react-router-dom';
import '../Assets/Styles/Header.css';
import teacastLogo from '../Assets/Images/TeaCast Logo.png';

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src={teacastLogo} alt="TeaCast Logo" className="logo-image" />
                    TeaCast
                </Link>
            </div>
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
