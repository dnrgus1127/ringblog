import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settingVisible: false,
  selectedMenuNumber: 0,
};

const settingSlice = createSlice({
  name: "setting",
  initialState: initialState,
  reducers: {
    onToggleVisible(state) {
      state.settingVisible = !state.settingVisible;
    },
    setMenuNumber(state, action) {
      state.selectedMenuNumber = action.payload;
    },
  },
});
export const settingActions = settingSlice.actions;
export default settingSlice.reducer;
