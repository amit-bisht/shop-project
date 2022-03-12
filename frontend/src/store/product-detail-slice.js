import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  product: null,
  loading: null,
  error: null,
};
const productDetailSlice = createSlice({
  name: "product-detail",
  initialState: initialState,
  reducers: {
    productDetialRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.product = {};
    },
    productDetailSuccess(state, action) {
      state.product = action.payload;
      state.loading = false;
      state.error = null;
    },
    productDetailFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.product = null;
    },
  },
});
export const fetchProduct = (id) => {
  return async (dispatch) => {
    async function fetchProductDetails() {
      try {
        dispatch(productDetailAction.productDetialRequest());
        const response = await axios.get(
          `http://127.0.0.1:8000/api/product/${id}`
        );
        console.log(response.data);
        dispatch(productDetailAction.productDetailSuccess(response.data));
      } catch (error) {
        console.log(error);
        dispatch(
          productDetailAction.productDetailFail(
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          )
        );
      }
    }
    fetchProductDetails();
  };
};
export default productDetailSlice;
export const productDetailAction = productDetailSlice.actions;
