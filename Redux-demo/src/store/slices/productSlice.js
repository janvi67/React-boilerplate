import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductsList } from "../productList";

// export default function productsReducer(state = ProductsList) {
//   return state
// }

// export default function productsReducer(state = []) {
//   return state
// }
export const fetchProductItemData = createAsyncThunk(
  "product/fetchProductItems",
  async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      return response.json();
    } catch (error) {
      throw error;
    }
  }
);

const slice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductItemData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductItemData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProductItemData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "something went wrong";
      });
  },
});

export const getAllProducts = (state) => state.products.list;

// export const fetchProductItemData = () => (dispatch) => {
//   dispatch(fetchProducts());
//   fetch(`https://fakestoreapi.com/products`).then((res) =>
//     res
//       .json()
//       .then((data) => {
//         dispatch(updateAllProducts(data));
//       })
//       .catch(() => {
//         dispatch(fetchProductsError());
//       })
//   );
// };

// const { updateAllProducts, fetchProducts, fetchProductsError } = slice.actions;
export const getProductLoadingState = (state) => state.products.loading;
export const getProductError = (state) => state.products.error;
export default slice.reducer;
