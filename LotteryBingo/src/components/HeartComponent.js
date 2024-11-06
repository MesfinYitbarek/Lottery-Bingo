import React, { useState } from 'react';
import './HeartComponent.css'; // Import the CSS file for styling

const HeartComponent = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [showHeart, setShowHeart] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const handleOtherGirlsClick = () => {
        alert('error, love not found !!! ');
    };

    const handleYeabClick = () => {
        setDarkMode(true);
        setShowHeart(true);
        setShowMessage(false); // Reset message visibility
        setTimeout(() => {
            setShowMessage(true); // Show message after heart animation
        }, 3000); // Adjust time according to the animation duration
    };

    const handleGoBackClick = () => {
        // Reset all states to initial values
        setDarkMode(false);
        setShowHeart(false);
        setShowMessage(false);
    };

    return (
        <div className={`container ${darkMode ? 'dark' : ''}`}>
            <div className="button-container">
                {!showHeart ? (
                    <>
                        <button onClick={handleYeabClick} className="button yeab-button">Yeab</button>
                        <button onClick={handleOtherGirlsClick} className="button other-girls-button">Other Girls</button>
                    </>
                ) : (
                    <>
                        {showMessage && (
                            <div className="heart-text">Luv U😘</div>
                        )}
                        <button onClick={handleGoBackClick} className="button go-button">Go Back</button>
                    </>
                )}
            </div>
            {showHeart && (
                <div className="heart-container">
                    <svg
                        viewBox="0 0 32 29.6"
                        className="heart"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            className="heart-path"
                            fill="red"
                            d="M23.6,0c-2.7,0-5.2,1.1-7.1,2.9C14.6,1.1,12.1,0,9.4,0C5.3,0,2,3.3,2,7.4 c0,4.5,5.8,8.8,14.6,14.2c8.8-5.4,14.6-9.7,14.6-14.2C30,3.3,26.7,0,23.6,0z"
                        />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default HeartComponent;