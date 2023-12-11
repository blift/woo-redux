import { createSlice } from "@reduxjs/toolkit";
import { fetchSingleProduct } from "../thunks/fetchSingleProduct";


interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  slug: string;
  attributes: {
    id: number | string;
    name: string;
    options: string[];
  }[];
  images: {
    id: number;
    src: string;
  }[];
}

export interface SingleProductState {
  product: Product | null;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: SingleProductState = {
  product: null,
  loading: false,
  error: null,
};

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const singleProductReducer = singleProductSlice.reducer;