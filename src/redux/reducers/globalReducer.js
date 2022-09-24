import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: "",
  searchBar: false,
};

const globalReducer = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    clearMessage: state => {
      state.success = "";
    },
    toggleSearchBar: state => {
      state.searchBar = !state.searchBar;
    },
  },
});

export const { setSuccess, clearMessage, toggleSearchBar } =
  globalReducer.actions;

export default globalReducer.reducer;
