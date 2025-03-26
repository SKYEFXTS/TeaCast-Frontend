import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import Dashboard from './Components/Dashboard';
import PredictionPage from './Components/PredictionPage';

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
