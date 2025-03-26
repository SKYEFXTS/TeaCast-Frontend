import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <h1>Welcome to TeaCast</h1>
            <p>Predict the future prices of tea using advanced machine learning models.</p>
            <Link to="/login">
                <button>Login</button>
            </Link>
        </div>
    );
}

export default HomePage;
