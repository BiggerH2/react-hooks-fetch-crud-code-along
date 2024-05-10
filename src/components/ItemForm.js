import React, { useState } from "react";

function ItemForm({ onAddItem }) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Produce");

    // Event handler for form submission
    function handleSubmit(event) {
        event.preventDefault();  // Prevent the form from submitting the default way

        // Create a new item object
        const newItem = {
            name: name,
            category: category,
            isInCart: false,  // Default the item to not being in the cart
        };

        // Send a POST request to the server
        fetch("http://localhost:4000/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),  // Convert the item to JSON
        })
        .then(response => response.json())  // Convert the response to JSON
        .then(data => {
            // Call the onAddItem callback function with the new item data
            onAddItem(data);

            // Clear the form state
            setName("");
            setCategory("Produce");
        })
        .catch(error => console.error("Error creating new item:", error));
    }

    return (
        <form className="NewItem" onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>

            <label>
                Category:
                <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Produce">Produce</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Dessert">Dessert</option>
                </select>
            </label>

            <button type="submit">Add to List</button>
        </form>
    );
}

export default ItemForm;
