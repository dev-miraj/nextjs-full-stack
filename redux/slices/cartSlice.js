// Create a slice
//Create reducers
//export the reducer and reducers

const { createSlice } = require("@reduxjs/toolkit");

// Get initial state from localStorage if available
const initialState =
  (typeof window !== "undefined" && JSON.parse(localStorage.getItem("cart"))) ||
  [];
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const {
        id,
        title,
        salePrice,
        imageUrl,
        userId: vendorId,
      } = action.payload;
      // Check if the item already exists in the cart
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        // If the item exists, update the quantity
        existingItem.qty += 1;
      } else {
        // If the item doesn't exist, add it to the cart
        const newItem = { id, title, salePrice, qty: 1, imageUrl, vendorId };
        state.push(newItem);
        // Update localStorage with the new state
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify([...state]));
        }
      }
    },
    removeFromCart: (state, action) => {
      const cartId = action.payload;
      const newState = state.filter((item) => item.id !== cartId);
      // Update localStorage with the new state
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newState));
      }
      return newState;
    },
    incrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem) {
        cartItem.qty += 1;
        // Update localStorage with the new state
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify([...state]));
        }
      }
    },
    decrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem && cartItem.qty > 1) {
        cartItem.qty -= 1;
        // Update localStorage with the new state
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify([...state]));
        }
      }
    },
  },
});
export const { addToCart, removeFromCart, incrementQty, decrementQty } =
  cartSlice.actions;
export default cartSlice.reducer;
