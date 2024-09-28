import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    product: {},
    isReviewSubmitted: false,
    isProductCreated: false,
    isProductDeleted: false,
    isProductUpdated: false,
  },
  reducers: {
    productRequest(state, action) {
      return {
        loading: true,
      };
    },
    productSuccess(state, action) {
      return {
        loading: false,
        product: action.payload.product,
      };
    },
    productFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    addReviewRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    addReviewSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isReviewSubmitted: true,
      };
    },
    addReviewFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearReviewSubmitted(state, action) {
      return {
        ...state,
        isReviewSubmitted: false,
      };
    },
    clearReviewError(state, action) {
      return { ...state, error: null };
    },
    clearProductErr(state, action) {
      return { ...state, error: null };
    },
    clearProduct(state, action) {
      return { ...state, product: {}, loading: false };
    },
    newProductRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    newProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
        isProductCreated: true,
      };
    },
    newProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isProductCreated: false,
      };
    },
    clearProductCreated(state, action) {
      return {
        ...state,
        isProductCreated: false,
      };
    },
    deleteProductRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isProductDeleted: true,
      };
    },
    deleteProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearProductDeleted(state, action) {
      return {
        ...state,
        isProductDeleted: false,
      };
    },

    updateProductRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updateProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
        isProductUpdated: true,
      };
    },
    updateProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearProductUpdated(state, action) {
      return {
        ...state,
        isProductUpdated: false,
      };
    },

    reviewsRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    reviewsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        reviews: action.payload.reviews,
      };
    },
    reviewsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    deleteReviewRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteReviewSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isReviewDeleted: true,
      };
    },
    deleteReviewFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearReviewDeleted(state, action) {
      return {
        ...state,
        isReviewDeleted: false,
      };
    },
    getRelatedProductsRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    getRelatedProductsSuccess(state, action) {
      return {
        ...state,
        relatedProducts: action.payload,
      };
    },
    getRelatedProductsFail(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});

const { actions, reducer } = productSlice;

export const {
  productRequest,
  productSuccess,
  productFail,
  addReviewRequest,
  addReviewSuccess,
  addReviewFail,
  clearReviewError,
  clearProductErr,
  clearProduct,
  newProductFail,
  newProductSuccess,
  newProductRequest,
  clearProductCreated,
  deleteProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  clearProductDeleted,
  updateProductFail,
  updateProductRequest,
  updateProductSuccess,
  clearProductUpdated,
  reviewsRequest,
  reviewsFail,
  reviewsSuccess,
  deleteReviewFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  clearReviewDeleted,
  clearReviewSubmitted,
  getRelatedProductsRequest,
  getRelatedProductsSuccess,
  getRelatedProductsFail,
} = actions;

export default reducer;
