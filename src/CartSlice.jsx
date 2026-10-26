import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: []
  },
  reducers: {
    addItem(state, action) {
      const plant = action.payload;
      const existingItem = state.items.find((item) => item.id === plant.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...plant,
          cost: Number(plant.cost ?? plant.price ?? 0),
          price: Number(plant.price ?? plant.cost ?? 0),
          quantity: 1
        });
      }
    },
    removeItem(state, action) {
      const itemId = typeof action.payload === "object"
        ? action.payload.id
        : action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((cartItem) => cartItem.id === id);
      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter((cartItem) => cartItem.id !== id);
      } else {
        item.quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    }
  }
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
