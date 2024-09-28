import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    loading: false,
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  reducers: {
    addCartReq(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    addCartSuccess(state, action) {
      const item = action.payload;

      const isItemExist = state.items.find((i) => i.product === item.product);

      if (isItemExist) {
        state = {
          ...state,
          loading: false,
        };
      } else {
        state = {
          items: [...state.items, item],
          loading: false,
        };

        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
      return state;
    },
    increaseCartQty(state, action) {
      state.items = state.items.map((item) => {
        if (item.product === action.payload) {
          item.quantity = item.quantity + 1;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    decreaseCartQty(state, action) {
      state.items = state.items.map((item) => {
        if (item.product === action.payload) {
          item.quantity = item.quantity - 1;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeItemInCart(state, action) {
      const filterItems = state.items.filter((item) => {
        return item.product !== action.payload;
      });
      localStorage.setItem("cartItems", JSON.stringify(filterItems));
      return {
        ...state,
        items: filterItems,
      };
    },
    saveShipInfo(state, action) {
      localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
      return {
        ...state,
        shippingInfo: action.payload,
      };
    },
    completeOrder(state, action) {
      localStorage.removeItem("shippingInfo");
      localStorage.removeItem("cartItems");
      sessionStorage.removeItem("orderInfo");
      return {
        items: [],
        loading: false,
        shippingInfo: {},
      };
    },
  },
});

const { actions, reducer } = cartSlice;

export const {
  addCartReq,
  addCartSuccess,
  increaseCartQty,
  decreaseCartQty,
  removeItemInCart,
  saveShipInfo,
  completeOrder,
} = actions;

export default reducer;
