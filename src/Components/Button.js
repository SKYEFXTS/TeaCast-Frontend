/**
 * @fileoverview TeaCast Button Component
 * 
 * This component provides a reusable button element with:
 * - Customizable text
 * - Click handler
 * - Type variants (primary, secondary)
 * - Disabled state
 * - Loading state
 * 
 * The button component maintains consistent styling across the
 * application while providing flexibility through props.
 * 
 * @module Button
 * @requires react
 * @requires ../Assets/Styles/Button.css
 */

import React from 'react';
import '../Assets/Styles/Button.css';

/**
 * Button component that renders a customizable button element.
 * 
 * Features:
 * - Text content customization
 * - Click event handling
 * - Type variants (primary/secondary)
 * - Disabled state
 * - Loading state
 * 
 * @param {Object} props - Component props
 * @param {string} props.text - Button text content
 * @param {Function} props.onClick - Click event handler
 * @param {string} [props.type='primary'] - Button type (primary/secondary)
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {boolean} [props.loading=false] - Loading state
 * @returns {JSX.Element} The button component
 */
function Button({ text, onClick, type = 'primary', disabled = false, loading = false }) {
    return (
        // Main button container with dynamic classes
        <button
            className={`button ${type} ${disabled ? 'disabled' : ''} ${loading ? 'loading' : ''}`}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {/* Button content */}
            {loading ? (
                // Loading spinner
                <span className="spinner"></span>
            ) : (
                // Button text
                text
            )}
        </button>
    );
}

export default Button;
