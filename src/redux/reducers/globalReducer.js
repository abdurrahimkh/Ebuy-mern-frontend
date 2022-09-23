import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: "",
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
  },
});

export const { setSuccess, clearMessage } = globalReducer.actions;

export default globalReducer.reducer;
