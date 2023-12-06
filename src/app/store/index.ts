import { configureStore } from "@reduxjs/toolkit";
import { productsReducer, ProductsState } from "./slices/productsSlice";
import { cartReducer } from "./slices/cartSlice";
import { NotificationsState, notificationReducer } from "./slices/notificationsSlice";

export interface RootState {
  product: ProductsState;
  cart: any[];
  notification: NotificationsState;
}


export const store = configureStore({
  reducer: {
    product: productsReducer,
    cart: cartReducer,
    notification: notificationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export * from "./thunks/fetchProducts";