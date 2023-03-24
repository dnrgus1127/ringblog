import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  preview: "",
  visible: false,
  thumbNailPath: null,
  seriesSelect: false,
};

const writeSlice = createSlice({
  name: "write",
  initialState: initialState,
  reducers: {
    getAllWrite(state, action) {
      state.title = action.payload;
    },

    onToggleVisible(state, action) {
      state.visible = !state.visible;
    },
    setThumbNailPath(state, action) {
      state.thumbNailPath = action.payload;
    },
    setPreview(state, action) {
      state.preview = action.payload;
    },
    onToggleSeriesSelect(state) {
      state.seriesSelect = !state.seriesSelect;
    },
  },
});

export const writeActions = writeSlice.actions;
export default writeSlice.reducer;
