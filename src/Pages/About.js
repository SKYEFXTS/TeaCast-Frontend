/**
 * @fileoverview TeaCast About Page Component
 * 
 * This component serves as the About page for TeaCast, providing detailed information about
 * the project, its technologies, workflow, and future plans. It includes sections for:
 * - Project overview
 * - Core technologies used
 * - How TeaCast works
 * - Future development plans
 * - Contact information
 * 
 * @module About
 * @requires react
 * @requires ../Components/Header
 * @requires ../Components/Footer
 * @requires ../Assets/Styles/About.css
 */

import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../Assets/Styles/About.css';
import teacastLogo from '../Assets/Images/TeaCast Logo.png';

// Technology logo imports
import pythonLogo from '../Assets/Images/Logos/Python.png';
import flaskLogo from '../Assets/Images/Logos/Flask.png';
import reactLogo from '../Assets/Images/Logos/React.png';
import pandasLogo from '../Assets/Images/Logos/Pandas.png';
import numpyLogo from '../Assets/Images/Logos/NumPy.png';
import statsmodelsLogo from '../Assets/Images/Logos/statsmodels.png';
import sklearnLogo from '../Assets/Images/Logos/Scikit-learn.png';
import tensorflowLogo from '../Assets/Images/Logos/TensorFlow.png';
import kerasLogo from '../Assets/Images/Logos/Keras.png';
import githubLogo from '../Assets/Images/Logos/Github.png';
import linkedinLogo from '../Assets/Images/Logos/LinkedIn.png';

/**
 * About page component that provides comprehensive information about the TeaCast project.
 * Includes sections for project overview, technologies, workflow, and contact information.
 * 
 * @component
 * @returns {JSX.Element} The complete About page
 */
function About() {
    // Technology stack configuration with descriptions
    const technologies = [
        {
            name: 'Python',
            logo: pythonLogo,
            description: 'The core programming language for developing TeaCast. Python is used for backend development, data processing, statistical modeling, and machine learning tasks. Its rich ecosystem of libraries, such as Pandas, NumPy, TensorFlow, and Keras, makes it the perfect choice for this project.'
        },
        {
            name: 'Flask',
            logo: flaskLogo,
            description: 'A lightweight Python web framework used for building the backend API of TeaCast. Flask handles the server-side logic and serves as the core of the web application, managing all requests, routing, and data processing tasks.'
        },
        {
            name: 'React',
            logo: reactLogo,
            description: 'A powerful JavaScript library used for building the frontend of the application. React allows TeaCast to deliver a dynamic and responsive user interface (UI), enabling real-time interactions and seamless data visualizations.'
        },
        {
            name: 'Pandas',
            logo: pandasLogo,
            description: 'A Python library for data manipulation and analysis, used for processing and cleaning historical tea price data. Pandas allows TeaCast to handle large datasets efficiently and prepare the data for machine learning models.'
        },
        {
            name: 'NumPy',
            logo: numpyLogo,
            description: 'A core library for numerical computing in Python, often used alongside Pandas for array manipulation and performing complex mathematical operations on the dataset.'
        },
        {
            name: 'Statsmodels',
            logo: statsmodelsLogo,
            description: 'A Python library used for statistical modelling. TeaCast uses SARIMAX (Seasonal AutoRegressive Integrated Moving Average with eXogenous regressors) from Statsmodels to forecast tea prices based on historical trends and external variables.'
        },
        {
            name: 'Scikit-learn',
            logo: sklearnLogo,
            description: 'A comprehensive machine learning library that simplifies model evaluation and preprocessing. TeaCast uses Scikit-learn to evaluate the performance of its models and to scale data before feeding it into the models.'
        },
        {
            name: 'TensorFlow',
            logo: tensorflowLogo,
            description: 'An open-source deep learning framework developed by Google. TeaCast utilizes TensorFlow to build and train the Bidirectional Long Short-Term Memory (BLSTM) model.'
        },
        {
            name: 'Keras',
            logo: kerasLogo,
            description: 'A high-level neural network API that runs on top of TensorFlow. Keras simplifies the process of building deep learning models and is used in TeaCast to define and train the BLSTM architecture.'
        }
    ];

    // Workflow steps configuration
    const workflowSteps = [
        {
            title: 'Data Collection',
            description: 'Historical tea auction price data is gathered and processed using Pandas and NumPy.'
        },
        {
            title: 'Data Analysis',
            description: 'The data is analyzed and cleaned, and the time-series model (SARIMAX) is trained using Statsmodels to generate the base prediction.'
        },
        {
            title: 'Prediction',
            description: 'The BLSTM model is trained using TensorFlow and Keras to refine predictions based on patterns in historical data.'
        },
        {
            title: 'User Interface',
            description: 'The user interface, built with React, allows users to interact with the app and view predictions and trends in real time.'
        }
    ];

    // Future development plans configuration
    const futurePlans = [
        {
            title: 'Better Machine Learning Models',
            description: 'Enhancing prediction accuracy with more advanced models.'
        },
        {
            title: 'User Authentication',
            description: 'Adding authentication to personalize user experiences.'
        },
        {
            title: 'New Data Sources',
            description: 'Incorporating additional data sources (like weather data or crop yield data) for more accurate predictions.'
        }
    ];

    return (
        <div className="about-page">
            <Header />
            <main className="about-content">
                {/* Page Header Section */}
                <section className="about-header">
                    <img src={teacastLogo} alt="TeaCast Logo" className="content-logo" />
                    <h1>TeaCast</h1>
                    <h2>Project Overview & Core Technologies</h2>
                </section>

                {/* Project Introduction Section */}
                <section className="introduction">
                    <h2>What is TeaCast?</h2>
                    <p>
                        TeaCast is a powerful web application built to predict tea auction prices using 
                        historical data and advanced hybrid machine-learning algorithms. The web app is 
                        aimed at tea brokers, industry professionals, and analysts who want to forecast 
                        auction prices, track market trends, and make data-driven decisions. By leveraging 
                        the latest data analysis and machine learning, TeaCast provides insights into 
                        future auction prices, empowering the tea industry with better forecasting capabilities.
                    </p>
                </section>

                {/* Technologies Grid Section */}
                <section className="technologies">
                    <h2>Core Technologies Used</h2>
                    <div className="tech-grid">
                        {technologies.map((tech, index) => (
                            <div key={index} className="tech-card">
                                <img src={tech.logo} alt={`${tech.name} logo`} />
                                <h3>{tech.name}</h3>
                                <p>{tech.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Project Workflow Section */}
                <section className="workflow">
                    <h2>How TeaCast Works</h2>
                    <div className="workflow-steps">
                        {workflowSteps.map((step, index) => (
                            <div key={index} className="workflow-step">
                                <div className="step-number">{index + 1}</div>
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Future Development Section */}
                <section className="future-plans">
                    <h2>What's Next?</h2>
                    <div className="plans-grid">
                        {futurePlans.map((plan, index) => (
                            <div key={index} className="plan-card">
                                <h3>{plan.title}</h3>
                                <p>{plan.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact and Links Section */}
                <section className="contact">
                    <h2>Contact Us</h2>
                    <div className="contact-info">
                        {/* Email Contact */}
                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <a href="mailto:oshan.20191284@iit.ac.lk">oshan.20191284@iit.ac.lk</a>
                        </div>
                        {/* Repository Links */}
                        <div className="contact-item">
                            <h3>GitHub Repositories</h3>
                            <div className="repo-links">
                                <a href="https://github.com/SKYEFXTS/TeaCast-Backend" target="_blank" rel="noopener noreferrer">
                                    Back-end Repository
                                </a>
                                <a href="https://github.com/SKYEFXTS/TeaCast-Frontend" target="_blank" rel="noopener noreferrer">
                                    Front-end Repository
                                </a>
                            </div>
                        </div>
                        {/* Social Media Links */}
                        <div className="social-links">
                            <a href="https://github.com/SKYEFXTS" target="_blank" rel="noopener noreferrer">
                                <img src={githubLogo} alt="GitHub" />
                            </a>
                            <a href="https://www.linkedin.com/in/oshan-nanayakkara-sky7755/" target="_blank" rel="noopener noreferrer">
                                <img src={linkedinLogo} alt="LinkedIn" />
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default About; 