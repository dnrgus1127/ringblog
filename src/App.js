import "./App.css";

import { Route, Routes } from "react-router-dom";
import NewPost from "./pages/NewPost";
import MainPage from "./pages/MainPage";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { darkTheme, lightTheme } from "./theme/theme";
import GlobalStyle from "./theme/GlobalStyle";
import PostPage from "./pages/PostPage";
import { LoginProvider } from "./functions/Login/LoginProvider";

function App() {
  const [themeMode, setThemeMode] = useState("dark");
  const theme = themeMode === "light" ? lightTheme : darkTheme;

  const toggleTheme = () =>
    setThemeMode(themeMode === "light" ? "dark" : "light");
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <LoginProvider>
          <GlobalStyle />
          <Routes>
            <Route
              path='/'
              element={<MainPage toggleTheme={toggleTheme} theme={themeMode} />}
            ></Route>
            <Route path='/WriteNewPost' element={<NewPost />}></Route>
            <Route
              path='/Post'
              element={<PostPage theme={themeMode} toggleTheme={toggleTheme} />}
            ></Route>
          </Routes>
        </LoginProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
