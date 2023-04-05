import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: {
    showAlert: false,
    alertMsg: "완료되었습니다.",
    onFail: false,
  },
};

const commonSlice = createSlice({
  name: "common",
  initialState: initialState,
  reducers: {
    onToggleAlert(state, action) {
      state.alert.showAlert = !state.alert.showAlert;
      if (action.payload) {
        state.alert.alertMsg = action.payload.message;
        state.alert.onFail = action.payload.onFail;
      }
    },
  },
});
export const commonActions = commonSlice.actions;
export default commonSlice.reducer;
