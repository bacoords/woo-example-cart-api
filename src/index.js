/**
 * Woo Test Plugin - Frontend JavaScript
 *
 * This file demonstrates how to interact with WooCommerce's cart data
 * using the WordPress Data API and WooCommerce Blocks data stores.
 *
 */

/**
 * Get the WooCommerce cart store from the global WooCommerce Blocks data registry
 */
const { cartStore } = window.wc.wcBlocksData;

/**
 * Updates the custom cart display in the DOM
 */
const updateCart = () => {
  const fakeCart = document.getElementById("woo-test-cart");

  // Use WordPress Data API to select (read) cart data from the store
  const data = window.wp.data.select(cartStore).getCartData();

  console.log(data);

  fakeCart.innerHTML = "";

  // Check if cart has items and render them
  if (data.items.length > 0) {
    data.items.forEach((item) => {
      const li = document.createElement("li");
      li.id = item.key;
      li.textContent = `${item.name} (Quantity: ${item.quantity})`;

      // Create remove button for each item using trash emoji
      const minusBtn = document.createElement("button");
      minusBtn.textContent = "🗑️";

      // Add click handler to remove item from cart
      // This uses the item's unique key to identify which item to remove
      minusBtn.addEventListener("click", () => removeItemFromCart(item.key));

      li.appendChild(minusBtn);

      fakeCart.appendChild(li);
    });
  } else {
    const p = document.createElement("p");
    p.textContent = "Cart is empty";
    fakeCart.appendChild(p);
  }
};

/**
 * Removes an item from the WooCommerce cart
 */
const removeItemFromCart = (key) => {
  // Use WordPress Data API to dispatch (write) an action to the cart store
  // This will remove the item and trigger any subscribed listeners
  window.wp.data.dispatch(cartStore).removeItemFromCart(key);
};

/**
 * Initialize the cart display when the page loads
 */
document.addEventListener("DOMContentLoaded", function () {
  // Perform initial cart display update
  updateCart();
});

/**
 * Subscribe to cart store changes for real-time updates
 */
const unsubscribe = window.wp.data.subscribe(() => {
  // Update our custom cart display with the latest data
  updateCart();
}, cartStore);
