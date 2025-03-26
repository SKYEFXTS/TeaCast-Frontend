import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PredictionPage() {
    const [prediction, setPrediction] = useState(null);

    useEffect(() => {
        const fetchPrediction = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/predict');
                setPrediction(response.data.prediction);
            } catch (error) {
                console.error("Error fetching prediction", error);
            }
        };
        fetchPrediction();
    }, []);

    return (
        <div>
            <h1>Future Predictions</h1>
            {prediction ? (
                <div>
                    <h2>Prediction Results</h2>
                    <p>{prediction}</p>
                </div>
            ) : (
                <p>Loading prediction...</p>
            )}
        </div>
    );
}

export default PredictionPage;
