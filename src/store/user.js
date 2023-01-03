import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

const initialState = {
  user: {},
};

export default createReducer(initialState, {
  [setUser]: (state, action) => {
    const value = action.payload;
    return value;
  },
});
