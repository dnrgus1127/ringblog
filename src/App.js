import "./App.css";

import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./theme/GlobalStyle";
import UserBlog from "./Pages/UserBlogPage";
import { QueryClient, QueryClientProvider } from "react-query";
import AlertWindow from "./components/common/AlertWindow";
import { useSelector } from "react-redux";
import QueryHooks from "./container/app/QueryHooks";
import { useLogin } from "./Hooks/useLogin";
import PrivateRoute from "./components/Route/PrivateRoute";

import UpdatePage from "./Pages/UpdatePage";
import ErrorPage from "./Pages/ErrorPage";
import MainPage from "./Pages/MainPage";
import PostPage from "./Pages/PostPage";
import RecordPage from "./Pages/RecordPage";
import WritePostPage from "./Pages/WritePostPage";
import Footer from "./container/Layout/Footer";

function App() {
  const { themePalette } = useSelector((state) => state.color);
  const { showAlert } = useSelector((state) => state.common.alert);
  const { loggedIn } = useSelector((state) => state.login);

  useLogin();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <QueryHooks />
      <div className='App'>
        <ThemeProvider theme={themePalette}>
          <GlobalStyle />
          <Routes>
            <Route path='/' element={<MainPage />}></Route>
            <Route
              path='/WriteNewPost'
              element={
                <PrivateRoute element={<WritePostPage />} auth={loggedIn} />
              }
            ></Route>
            <Route path='/Post' element={<PostPage />}></Route>
            <Route path='/userBlog' element={<UserBlog />}></Route>
            <Route
              path='/RecordPage'
              element={
                <PrivateRoute element={<RecordPage />} auth={loggedIn} />
              }
            />
            <Route path='/update' element={<UpdatePage />} />
            <Route path='/*' element={<ErrorPage />} />
          </Routes>
          {showAlert && <AlertWindow />}
        </ThemeProvider>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
