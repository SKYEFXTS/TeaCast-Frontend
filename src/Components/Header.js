import React from 'react';
import { Link } from 'react-router-dom';
import '../Assets/Styles/Header.css';

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <span className="leaf-icon">🍃</span> TeaCast
                </Link>
            </div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/predictions">Prediction</Link>
                <Link to="/login">Login</Link>
                <Link to="/about">About</Link>
            </nav>
        </header>
    );
}

export default Header;
