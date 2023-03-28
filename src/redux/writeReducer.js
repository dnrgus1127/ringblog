import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  preview: "",
  visible: false,
  thumbNailPath: null,
  seriesSelect: false,
  selectedSeries: null,
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
    selectSeries(state, action) {
      state.selectedSeries = action.payload;
    },
    delSelectedSeries(state) {
      state.selectedSeries = null;
    },
  },
});

export const writeActions = writeSlice.actions;
export default writeSlice.reducer;
