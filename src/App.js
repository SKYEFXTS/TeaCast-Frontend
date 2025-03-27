import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home';
import LoginPage from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import PredictionPage from './Pages/Prediction';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/predictions" element={<PredictionPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
