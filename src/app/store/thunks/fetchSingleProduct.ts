import { createAsyncThunk } from "@reduxjs/toolkit";
import wooInit from "@/app/utils/wooInit";

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
};

const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id: number): Promise<Product> => {
    const WooCommerce = wooInit();

    const product = await WooCommerce.get(`products/${id}`);

    return product.data;
  }
);

export { fetchSingleProduct };