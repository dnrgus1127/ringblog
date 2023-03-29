import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  seriesSelect: false,
  selectedSeries: null,
  data: {
    thumbNailPath: null,
    title: "",
    preview: "",
    contents: "",
  },
};

const writeSlice = createSlice({
  name: "write",
  initialState: initialState,
  reducers: {
    setTitle(state, action) {
      state.data.title = action.payload;
    },
    setContent(state, action) {
      state.data.contents = action.payload;
    },

    onToggleVisible(state) {
      state.visible = !state.visible;
    },
    setThumbNailPath(state, action) {
      state.data.thumbNailPath = action.payload;
    },
    setPreview(state, action) {
      state.data.preview = action.payload;
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
    clearData(state) {
      state.data = initialState.data;
      state.visible = false;
      state.selectedSeries = false;
    },
  },
});

export const writeActions = writeSlice.actions;
export default writeSlice.reducer;
