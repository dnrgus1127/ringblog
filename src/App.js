import "./App.css";

import { Route, Routes } from "react-router-dom";
import NewPost from "./pages/NewPost";
import MainPage from "./pages/MainPage";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { darkTheme, lightTheme } from "./theme/theme";
import GlobalStyle from "./theme/GlobalStyle";
import PostPage from "./pages/PostPage";
import UserBlog from "./pages/UserBlog";
import Recordpage from "./pages/Recordpage";
import { QueryClient, QueryClientProvider } from "react-query";
import AlertWindow from "./components/common/AlertWindow";
import { useSelector } from "react-redux";

function App() {
  const [themeMode, setThemeMode] = useState("dark");
  const theme = themeMode === "light" ? lightTheme : darkTheme;
  const { showAlert } = useSelector((state) => state.common.alert);

  const toggleTheme = () =>
    setThemeMode(themeMode === "light" ? "dark" : "light");

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <ThemeProvider theme={theme}>
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
            <Route
              path='/userBlog'
              element={<UserBlog theme={themeMode} toggleTheme={toggleTheme} />}
            ></Route>
            <Route
              path='/RecordPage'
              element={
                <Recordpage theme={themeMode} toggleTheme={toggleTheme} />
              }
            />
          </Routes>
          {showAlert && <AlertWindow />}
        </ThemeProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
