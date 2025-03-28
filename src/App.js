/* ==========================================================================
   TeaCast - Main Application Component
   
   This component serves as the root component of the TeaCast application.
   It includes:
   - Application routing setup
   - Page component integration
   - Route definitions for all pages
   
   Dependencies:
   - React Router for navigation
   - Home page component
   - Login page component
   - Dashboard component
   - Prediction component
   - About page component
   
   Author: TeaCast Development Team
   ========================================================================== */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Prediction from './Pages/Prediction';
import About from './Pages/About';

/* ==========================================================================
   App Component
   Main application component that handles routing and layout
   
   Features:
   - Browser router setup
   - Route definitions for all pages
   - Clean and minimal layout structure
   ========================================================================== */
function App() {
    return (
        <Router>
            {/* Main application container */}
            <div>
                {/* Route definitions for different pages */}
                <Routes>
                    {/* Home page route */}
                    <Route path="/" element={<Home />} />
                    
                    {/* Login page route */}
                    <Route path="/login" element={<LoginPage />} />
                    
                    {/* Analytics dashboard route */}
                    <Route path="/analytics" element={<Dashboard />} />
                    
                    {/* Predictions page route */}
                    <Route path="/predictions" element={<Prediction />} />
                    
                    {/* About page route */}
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
