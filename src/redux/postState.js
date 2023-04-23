import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newComment: "",
  hashTags: [],
};

const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setNewComment(state, action) {
      state.newComment = action.payload;
    },
    setHashTags(state, action) {
      state.hashTags = action.payload;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
