import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../types/types";

interface ProductState {
  data: Product[];
  filteredData: Product[];
  loading: boolean;
  error: string | null;
  search: string;
}

const initialState: ProductState = {
  data: [],
  filteredData: [],
  loading: false,
  error: null,
  search: "",
};

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const res = await axios.get<Product[]>(
      "https://fakestoreapi.com/products"
    );
    return res.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;

      state.filteredData = state.data.filter(item =>
        item.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.filteredData = action.payload;
      })
      .addCase(fetchProducts.rejected, state => {
        state.loading = false;
        state.error = "Error fetching data";
      });
  },
});

export const { setSearch } = productSlice.actions;
export default productSlice.reducer;