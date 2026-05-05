import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts, createProduct } from "../../services/ProductApi";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await getAllProducts();
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default productSlice.reducer;