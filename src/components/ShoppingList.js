import React, { useEffect, useState } from 'react';
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [items, setItems] = useState([]);

    // Fetch data from the server when the component mounts
    useEffect(() => {
        fetch("http://localhost:4000/items")
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    // Function to handle category changes
    function handleCategoryChange(category) {
        setSelectedCategory(category);
    }

    // Function to handle adding a new item
    function handleAddItem(newItem) {
        setItems([...items, newItem]);
    }

    // Function to handle updating an item
    function handleUpdateItem(updatedItem) {
        const updatedItems = items.map(item => 
            item.id === updatedItem.id ? updatedItem : item
        );
        setItems(updatedItems);
    }

    // Function to handle deleting an item
    function handleDeleteItem(deletedItem) {
        const updatedItems = items.filter(item => item.id !== deletedItem.id);
        setItems(updatedItems);
    }

    // Filter the items based on the selected category
    const itemsToDisplay = items.filter((item) => {
        if (selectedCategory === "All") return true;
        return item.category === selectedCategory;
    });

    return (
        <div className="ShoppingList">
            {/* Pass the onAddItem prop to ItemForm */}
            <ItemForm onAddItem={handleAddItem} />

            <Filter
                category={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />

            <ul className="Items">
                {/* Pass onUpdateItem and onDeleteItem props to Item */}
                {itemsToDisplay.map((item) => (
                    <Item
                        key={item.id}
                        item={item}
                        onUpdateItem={handleUpdateItem}
                        onDeleteItem={handleDeleteItem}
                    />
                ))}
            </ul>
        </div>
    );
}

export default ShoppingList;
