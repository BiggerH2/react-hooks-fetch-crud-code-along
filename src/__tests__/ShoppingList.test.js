import 'mutationobserver-shim'; // Import the MutationObserver polyfill
import React from "react"; // Add the React import
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import for jest-dom assertions
import ShoppingList from "../components/ShoppingList";
import { server } from "../mocks/server"; // Import server setup

// Import the necessary mocks for data setup
import { resetData } from "../mocks/handlers";

beforeAll(() => {
  // Start the mock server before running the tests
  server.listen();
});

afterEach(() => {
  // Reset the server's handlers and data after each test
  server.resetHandlers();
  resetData();
});

afterAll(() => {
  // Stop the server after all tests
  server.close();
});

// Test: Display all items from the server after the initial render
test("displays all the items from the server after the initial render", async () => {
  render(<ShoppingList />);

  // Check for items in the document
  const yogurt = await screen.findByText(/Yogurt/);
  expect(yogurt).toBeInTheDocument();

  const pomegranate = await screen.findByText(/Pomegranate/);
  expect(pomegranate).toBeInTheDocument();

  const lettuce = await screen.findByText(/Lettuce/);
  expect(lettuce).toBeInTheDocument();
});

// Test: Add a new item to the list when the ItemForm is submitted
test("adds a new item to the list when the ItemForm is submitted", async () => {
  render(<ShoppingList />);

  // Get the current count of "Dessert" items
  const dessertCount = screen.queryAllByText(/Dessert/).length;

  // Simulate filling out and submitting the form
  fireEvent.change(screen.getByLabelText(/Name/), {
    target: { value: "Ice Cream" },
  });
  fireEvent.change(screen.getByLabelText(/Category/), {
    target: { value: "Dessert" },
  });
  fireEvent.submit(screen.getByText(/Add to List/));

  // Check that the new item was added
  const iceCream = await screen.findByText(/Ice Cream/);
  expect(iceCream).toBeInTheDocument();

  // Verify the count of desserts has increased
  const desserts = await screen.findAllByText(/Dessert/);
  expect(desserts.length).toBe(dessertCount + 1);

  // Optional: Rerender the component to ensure data persistence
  render(<ShoppingList />);
  const rerenderedIceCream = await screen.findByText(/Ice Cream/);
  expect(rerenderedIceCream).toBeInTheDocument();
});

// Test: Update the isInCart status of an item when the Add/Remove from Cart button is clicked
test("updates the isInCart status of an item when the Add/Remove from Cart button is clicked", async () => {
  render(<ShoppingList />);

  // Find the "Add to Cart" buttons
  const addButtons = await screen.findAllByText(/Add to Cart/);

  // Ensure there are three "Add to Cart" buttons initially
  expect(addButtons.length).toBe(3);

  // Click the first "Add to Cart" button
  fireEvent.click(addButtons[0]);

  // Verify that the button now says "Remove From Cart"
  const removeButton = await screen.findByText(/Remove From Cart/);
  expect(removeButton).toBeInTheDocument();

  // Optional: Rerender to verify persistence of data
  render(<ShoppingList />);
  const rerenderedAddButtons = await screen.findAllByText(/Add to Cart/);
  const rerenderedRemoveButtons = await screen.findAllByText(/Remove From Cart/);

  // Verify the counts of add and remove buttons
  expect(rerenderedAddButtons.length).toBe(2); // Corrected line
  expect(rerenderedRemoveButtons.length).toBe(1);
});

//...
// Test: Remove an item from the list when the delete button is clicked
test("removes an item from the list when the delete button is clicked", async () => {
  render(<ShoppingList />);

  // Find and verify the item to be removed
  const yogurt = await screen.findByText(/Yogurt/);
  expect(yogurt).toBeInTheDocument();

  // Find and click the delete button
  const deleteButtons = await screen.findAllByText(/Delete/);
  fireEvent.click(deleteButtons[0]);

  // Wait for the item to be removed from the document
  await waitForElementToBeRemoved(() => screen.queryByText(/Yogurt/));

  // Optional: Rerender the component to verify persistence
  render(<ShoppingList />);

  // Verify the remaining delete buttons and the absence of the deleted item
  const rerenderedDeleteButtons = await screen.findAllByText(/Delete/);
  expect(rerenderedDeleteButtons.length).toBe(2);
  expect(screen.queryByText(/Yogurt/)).not.toBeInTheDocument();
});