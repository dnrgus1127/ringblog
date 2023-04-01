import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newComment: "",
};

const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setNewComment(state, action) {
      state.newComment = action.payload;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
