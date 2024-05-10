import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
    // Event handler for the "Add to Cart"/"Remove From Cart" button
    function handleAddToCartClick() {
        // Toggle the `isInCart` status of the item
        fetch(`http://localhost:4000/items/${item.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                isInCart: !item.isInCart,
            }),
        })
        .then(response => response.json())
        .then(updatedItem => {
            // Call the onUpdateItem callback with the updated item
            onUpdateItem(updatedItem);
        })
        .catch(error => console.error("Error updating item:", error));
    }

    // Event handler for the "Delete" button
    function handleDeleteClick() {
        // Send a DELETE request to the server
        fetch(`http://localhost:4000/items/${item.id}`, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(() => {
            // Call the onDeleteItem callback with the deleted item
            onDeleteItem(item);
        })
        .catch(error => console.error("Error deleting item:", error));
    }

    return (
        <li className={item.isInCart ? "in-cart" : ""}>
            <span>{item.name}</span>
            <span className="category">{item.category}</span>
            {/* Button to toggle the item's cart status */}
            <button
                className={item.isInCart ? "remove" : "add"}
                onClick={handleAddToCartClick}
            >
                {item.isInCart ? "Remove From" : "Add to"} Cart
            </button>
            {/* Button to delete the item */}
            <button className="remove" onClick={handleDeleteClick}>
                Delete
            </button>
        </li>
    );
}

export default Item;
