import React from 'react';
import { Link } from 'react-router-dom';
import '../Assets/Styles/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="contact-info">
                    Contact us: <a href="mailto:oshan.20191284@iit.ac.lk">oshan.20191284@iit.ac.lk</a>
                    <span className="phone">Phone: +94 776 006 687</span>
                </div>
                <div className="footer-links">
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
