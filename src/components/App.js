import React, { useState } from "react";
import ShoppingList from "./ShoppingList";
import Header from "./Header";

function App() {
    // State variable to track dark mode
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Function to toggle dark mode
    function handleDarkModeClick() {
        setIsDarkMode(prevMode => !prevMode);
    }

    return (
        // Apply dark or light mode styling to the application
        <div className={`App ${isDarkMode ? "dark" : "light"}`}>
            {/* Pass isDarkMode and onDarkModeClick as props to Header */}
            <Header isDarkMode={isDarkMode} onDarkModeClick={handleDarkModeClick} />

            {/* Pass isDarkMode as a prop to ShoppingList if needed */}
            <ShoppingList isDarkMode={isDarkMode} />
        </div>
    );
}

export default App;
