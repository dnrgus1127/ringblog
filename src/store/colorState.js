import { createSlice } from "@reduxjs/toolkit";
import { darkTheme, lightTheme } from "../theme/theme";

const initialState = {
  // 로컬 저장소의 값 호출, 값 없으면 자동으로 "light"
  theme: localStorage.getItem("darkMode") === "dark" ? "dark" : "light",
  themePalette:
    localStorage.getItem("darkMode") === "dark" ? darkTheme : lightTheme,
};

const colorSlice = createSlice({
  name: "color",
  initialState: initialState,
  reducers: {
    setDarkMod(state) {
      state.theme = "dark";
      state.themePalette = darkTheme;
    },
    setLightMod(state) {
      state.theme = "light";
      state.themePalette = lightTheme;
    },
    onToggleTheme(state) {
      if (state.theme === "light") {
        state.theme = "dark";
        state.themePalette = darkTheme;
      } else {
        state.theme = "light";
        state.themePalette = lightTheme;
      }
    },
  },
});

export const colorActions = colorSlice.actions;
export default colorSlice.reducer;
