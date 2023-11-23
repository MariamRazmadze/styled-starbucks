import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface CartItemType {
  coffeeId: number;
  name: string;
  image: string;
  stars: string;
  quantity: number;
  size: string;
  unitPrice: number;
  totalPrice: number;
}

interface CartState {
  cart: CartItemType[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },

    deleteItem(state, action) {
      state.cart = state.cart.filter(
        (item) => item.coffeeId !== action.payload
      );
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.coffeeId === action.payload);
      if (item && item.quantity !== undefined) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.coffeeId === action.payload);
      if (item && item.quantity !== undefined) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;

        if (item.quantity === 0)
          cartSlice.caseReducers.deleteItem(state, action);
      }
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const getTotalCartQuantity = (state: RootState) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state: RootState) => {
  return state.cart.cart.reduce((sum, item) => {
    if (typeof item.totalPrice !== "number") {
      console.log("Invalid totalPrice:", item.totalPrice);
    }
    return sum + item.totalPrice;
  }, 0);
};

export default cartSlice.reducer;

export const getCart = (state: RootState) => state.cart.cart;
