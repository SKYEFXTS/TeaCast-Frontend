import React from 'react';
import '../Assets/Styles/Button.css';

function Button({ text, onClick }) {
    return (
        <button className="button" onClick={onClick}>
            {text}
        </button>
    );
}

export default Button;
