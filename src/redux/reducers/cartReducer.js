import { createSlice } from "@reduxjs/toolkit";
import { discount } from "../../utils/discount";

const cartData = localStorage.getItem("cart");
const cartArry = cartData ? JSON.parse(cartData) : [];

function itemsCount(data) {
  let items = 0;
  for (let i = 0; i < data.length; i++) {
    items += data[i].quantity;
  }
  return items;
}

function calcTotal(data) {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += discount(data[i].price, data[i].discount) * data[i].quantity;
  }
  return total;
}

const initialState = {
  cart: cartArry.length > 0 ? cartArry : [],
  items: cartArry.length > 0 ? itemsCount(cartArry) : 0,
  total: cartArry.length > 0 ? calcTotal(cartArry) : 0,
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      state.cart.push(action.payload);
      state.items += action.payload.quantity;
      state.total +=
        discount(action.payload.price, action.payload.discount) *
        action.payload.quantity;
    },
    incQuantity: (state, { payload }) => {
      const find = state.cart.find(item => item._id === payload);
      if (find) {
        find.quantity += 1;
        state.items += 1;
        state.total += discount(find.price, find.discount);
        const index = state.cart.indexOf(find);
        state.cart[index] = find;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    decQuantity: (state, { payload }) => {
      const find = state.cart.find(item => item._id === payload);
      if (find && find.quantity > 1) {
        find.quantity -= 1;
        state.items -= 1;
        state.total -= discount(find.price, find.discount);
        const index = state.cart.indexOf(find);
        state.cart[index] = find;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    removeItem: (state, { payload }) => {
      const find = state.cart.find(item => item._id === payload);
      if (find) {
        const index = state.cart.indexOf(find);
        state.cart.splice(index, 1);
        state.items -= find.quantity;
        state.total -= discount(find.price, find.discount) * find.quantity;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    emptyCart: state => {
      state.cart = [];
      state.items = 0;
      state.total = 0;
    },
  },
});

export const {
  addItemToCart,
  incQuantity,
  decQuantity,
  removeItem,
  emptyCart,
} = cartReducer.actions;

export default cartReducer.reducer;
