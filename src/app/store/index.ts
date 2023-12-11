import { configureStore } from "@reduxjs/toolkit";
import { productsReducer, ProductsState } from "./slices/productsSlice";
import { cartReducer } from "./slices/cartSlice";
import { NotificationsState, notificationReducer } from "./slices/notificationsSlice";
import { singleProductReducer } from "./slices/singleProductSlice";

export interface RootState {
  product: ProductsState;
  cart: any[];
  notification: NotificationsState;
}


export const store = configureStore({
  reducer: {
    singleProduct: singleProductReducer,
    product: productsReducer,
    cart: cartReducer,
    notification: notificationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export * from "./thunks/fetchProducts";
export * from "./thunks/fetchSingleProduct";