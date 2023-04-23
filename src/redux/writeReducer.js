import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  seriesSelect: false,
  selectedSeries: {
    id: null,
    title: null,
  },
  edit: false,
  postNumber: null,
  data: {
    thumbnailPath: null,
    title: "",
    preview: "",
    contents: "",
    permission: true,
    hashTags: [],
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
      state.data.thumbnailPath = action.payload;
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
      state.selectedSeries = initialState.selectedSeries;
    },
    clearData(state) {
      state.data = initialState.data;
      state.visible = false;
      state.selectedSeries = false;
      state.edit = false;
      state.postNumber = null;
    },
    setData(state, action) {
      state.data = {
        ...state.data,
        ...action.payload,
        thumbnailPath:
          action.payload.thumbnailPath === "undefined" ||
          action.payload.thumbnailPath === "null"
            ? null
            : action.payload.thumbnailPath,
      };
    },

    setEdit(state, action) {
      state.edit = true;
      state.postNumber = action.payload;
    },

    setPermission(state, action) {
      state.data.permission = action.payload;
    },
    delHashTag(state, action) {
      state.data.hashTags.splice(action.payload, 1);
    },
    addHashTag(state, action) {
      state.data.hashTags.push(action.payload);
    },
  },
});

export const writeActions = writeSlice.actions;
export default writeSlice.reducer;
