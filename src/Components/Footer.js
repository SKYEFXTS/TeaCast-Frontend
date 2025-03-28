/**
 * @fileoverview TeaCast Footer Component
 * 
 * This component serves as the main footer for TeaCast, featuring:
 * - Contact information
 * - Privacy policy and terms of service links
 * 
 * The footer provides essential contact information and legal links
 * while maintaining the TeaCast brand identity.
 * 
 * @module Footer
 * @requires react
 * @requires ../Assets/Styles/Footer.css
 */

import React from 'react';
import '../Assets/Styles/Footer.css';

/**
 * Footer component that contains contact information and legal links.
 * 
 * Features:
 * - Contact email with mailto link
 * - Phone number display
 * - Privacy policy and terms of service links
 * 
 * @component
 * @returns {JSX.Element} The footer with contact and legal information
 */
function Footer() {
    return (
        <div className="footer">
            <div>
                {/* Contact information section */}
                Contact us: <a href="mailto:oshan.20191284@iit.ac.lk"> oshan.20191284@iit.ac.lk</a>
                <span className="separator">|</span>
                Phone: +94 776 006 687
                {/* Legal links section */}
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
