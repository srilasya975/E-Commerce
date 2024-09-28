import axios from "axios";

import {
  productsRequest,
  productsSuccess,
  productsFail,
} from "../slices/productsSlice";

export const getAllProducts =
  (keyword, price, category, rating) => async (dispatch) => {
    try {
      dispatch(productsRequest());
      let link = `/api/v1/products`;
      if (keyword) {
        link += `?keyword=${keyword}`;
      }
      if (price) {
        link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }
      if (category) {
        link += `&category=${category}`;
      }
      if (rating) {
        link += `&rating=${rating}`;
      }
      const { data } = await axios.get(link);
      dispatch(productsSuccess(data));
    } catch (error) {
      dispatch(productsFail(error.response.data.message));
    }
  };
