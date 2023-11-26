import userReducer from "./components/Auth/authSlice";
import cartReducer from "./components/Cart/cartSlice";
import citiesReducer from "./components/StoreLocator/citiesSlice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as useReduxDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    cities: citiesReducer,
  },
});

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
