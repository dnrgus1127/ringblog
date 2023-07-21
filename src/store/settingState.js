import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settingVisible: false,
  selectedMenuNumber: 0,
  setting: {
    darkMode: 0,
  },
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
    setSetting(state, action) {
      state.setting = action.payload;
    },
  },
});
export const settingActions = settingSlice.actions;
export default settingSlice.reducer;
