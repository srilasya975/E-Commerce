import axios from "axios";

import {
  productRequest,
  productSuccess,
  productFail,
  addReviewRequest,
  addReviewSuccess,
  addReviewFail,
  newProductRequest,
  newProductSuccess,
  newProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
  updateProductRequest,
  updateProductSuccess,
  updateProductFail,
  reviewsRequest,
  reviewsSuccess,
  reviewsFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFail,
  getRelatedProductsRequest,
  getRelatedProductsSuccess,
  getRelatedProductsFail,
} from "../slices/productSlice";
import {
  adminProductsFail,
  adminProductsRequest,
  adminProductsSuccess,
} from "../slices/productsSlice";

export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch(productRequest());
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch(productSuccess(data));
  } catch (error) {
    dispatch(productFail(error.response.data.message));
  }
};

export const addReview = (reviewData) => async (dispatch) => {
  try {
    dispatch(addReviewRequest());
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/v1/review`, reviewData, config);
    dispatch(addReviewSuccess(data));
  } catch (error) {
    //handle error
    dispatch(addReviewFail(error.response.data.message));
  }
};

export const getAdminProducts = async (dispatch) => {
  try {
    dispatch(adminProductsRequest());
    const { data } = await axios.get(`/api/v1/admin/products`);
    dispatch(adminProductsSuccess(data));
  } catch (error) {
    //handle error
    dispatch(adminProductsFail(error.response.data.message));
  }
};

export const addNewProduct = (combinedData) => async (dispatch) => {
  try {
    dispatch(newProductRequest());

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      `/api/v1/admin/product/add`,
      combinedData,
      config
    );

    dispatch(newProductSuccess(data));
  } catch (error) {
    dispatch(newProductFail(error.response.data.message));
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());
    await axios.delete(`/api/v1/admin/product/${id}`);
    dispatch(deleteProductSuccess());
  } catch (error) {
    //handle error
    dispatch(deleteProductFail(error.response.data.message));
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch(updateProductRequest());
    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData
    );
    dispatch(updateProductSuccess(data));
  } catch (error) {
    //handle error
    dispatch(updateProductFail(error.response.data.message));
  }
};

export const getReviews = (id) => async (dispatch) => {
  try {
    dispatch(reviewsRequest());
    const { data } = await axios.get(`/api/v1/admin/reviews`, {
      params: { id },
    });
    dispatch(reviewsSuccess(data));
  } catch (error) {
    //handle error
    dispatch(reviewsFail(error.response.data.message));
  }
};

export const deleteReview = (productId, id) => async (dispatch) => {
  try {
    dispatch(deleteReviewRequest());
    await axios.delete(`/api/v1/admin/review`, { params: { productId, id } });
    dispatch(deleteReviewSuccess());
  } catch (error) {
    //handle error
    dispatch(deleteReviewFail(error.response.data.message));
  }
};

export const addRelatedProducts = (relatedProducts) => async (dispatch) => {
  try {
    dispatch(getRelatedProductsRequest());
    const { data } = await axios.get(
      `api/v1/products/related/${relatedProducts}`
    );
    dispatch(getRelatedProductsSuccess(data));
  } catch (error) {
    dispatch(getRelatedProductsFail(error.response.data.message));
  }
};
