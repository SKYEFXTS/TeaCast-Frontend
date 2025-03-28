import React from 'react';
import '../Assets/Styles/Button.css';

/**
 * Button component that renders a styled button.
 * @param {string} text - The text to display on the button.
 * @param {function} onClick - The function to call when the button is clicked.
 */
function Button({ text, onClick }) {
    return (
        <button className="button" onClick={onClick}>
            {text}
        </button>
    );
}

export default Button;
