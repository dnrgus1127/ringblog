import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hashTags: [],
};

const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setHashTags(state, action) {
      state.hashTags = action.payload;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
