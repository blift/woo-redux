import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/productsSlice";
import { ProductsState } from "./slices/productsSlice";

export interface RootState {
  product: ProductsState;
}


export const store = configureStore({
  reducer: {
    product: productsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export * from "./thunks/fetchProducts";