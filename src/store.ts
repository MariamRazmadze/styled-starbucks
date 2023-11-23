import userReducer from "./components/Auth/authSlice";
import cartReducer from "./components/Cart/cartSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
