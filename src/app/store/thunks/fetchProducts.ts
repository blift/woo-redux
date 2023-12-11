import { createAsyncThunk } from "@reduxjs/toolkit";
import wooInit from "@/app/utils/wooInit";

interface FetchProductsArgs {
  page: number;
  perPage?: number;
}

interface ProductsResponse {
  data: [];
  hasMore: boolean;
  pageNumber: number;
}

const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, perPage = 10 }: FetchProductsArgs): Promise<ProductsResponse> => {
    const WooCommerce = wooInit();

    const products = await WooCommerce.get("products", { page, per_page: perPage });

    // Determine if there are more products to load
    const hasMore = products.data.length === perPage;


    // Increment the page number
    const pageNumber = page;

    return { data: products.data, pageNumber, hasMore };
  }
);


export { fetchProducts };