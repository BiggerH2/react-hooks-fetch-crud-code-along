import React from "react";

function Filter({ category, onCategoryChange }) {
    return (
        <div className="Filter">
            {/* Add a label for the select element for accessibility */}
            <label htmlFor="category-filter">Filter by category:</label>

            {/* Add a class for easier styling */}
            <select
                id="category-filter"
                name="category"
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="category-select"
            >
                <option value="All">All Categories</option>
                <option value="Produce">Produce</option>
                <option value="Dairy">Dairy</option>
                <option value="Dessert">Dessert</option>
                {/* Add more categories as needed */}
            </select>
        </div>
    );
}

export default Filter;
