import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from '../thunks/fetchProducts';

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  slug: string;
  attributes: { // Change to an array of objects, not a tuple
    id: number | string;
    name: string;
    options: string[];
  }[];
  images: any[];
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null | undefined;
  hasMore: boolean;
  pageNumber: number;
}


// Initial state of the products slice
const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  hasMore: false,
  pageNumber: 1,
};

// The products slice with the fetchProducts thunk
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.hasMore = action.payload.hasMore;
      state.pageNumber = action.payload.pageNumber;
      
      const newProducts = action.payload.data;
      const allProducts = [...state.products, ...newProducts];
    
      // Deduplicate products, assuming each product has a unique 'id'
      state.products = Array.from(new Map(allProducts.map(product => [product.id, product])).values());
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});


export const productsReducer = productsSlice.reducer;
