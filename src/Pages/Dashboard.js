import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard. Here you will see tea data analytics and graphs.</p>

            {/* Placeholder for graphs and analytics */}
            <div>
                <h2>Tea Data Analytics (Placeholder)</h2>
                <p>Tea data analytics and graphs will be displayed here.</p>
            </div>

            <Link to="/predictions">
                <button>Go to Future Predictions</button>
            </Link>
        </div>
    );
}

export default Dashboard;
