import React from 'react';
import '../Assets/Styles/Footer.css';

/**
 * Footer component that contains the footer content.
 */
function Footer() {
    return (
        <div className="footer">
            <div>
                Contact us: <a href="mailto:oshan.20191284@iit.ac.lk">oshan.20191284@iit.ac.lk</a>
                <span className="separator">|</span>
                Phone: +94 776 006 687
                <div className="footer-right">
                    <a href="/privacy-policy">Privacy Policy</a>
                    <span className="separator">|</span>
                    <a href="/terms-of-service">Terms of Service</a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
