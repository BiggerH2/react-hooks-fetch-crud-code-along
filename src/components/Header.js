import React from "react";

function Header({ isDarkMode, onDarkModeClick }) {
    // Define button label based on the current mode
    const buttonLabel = isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";

    return (
        <header className={`header ${isDarkMode ? "dark-mode" : "light-mode"}`}>
            <h2>Shopster</h2>
            <button onClick={onDarkModeClick}>
                {buttonLabel}
            </button>
        </header>
    );
}

export default Header;
