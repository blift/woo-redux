import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { productsReducer, ProductsState } from "./slices/productsSlice";
import { cartReducer } from "./slices/cartSlice";
import { notificationReducer } from "./slices/notificationsSlice";
import { singleProductReducer } from "./slices/singleProductSlice";

const rootReducer = combineReducers({
  singleProduct: singleProductReducer,
  product: productsReducer,
  cart: cartReducer,
  notification: notificationReducer,
});

export const initializeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const store = initializeStore();
export type AppStore = ReturnType<typeof initializeStore>
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<typeof rootReducer>

export * from "./thunks/fetchProducts";
export * from "./thunks/fetchSingleProduct";