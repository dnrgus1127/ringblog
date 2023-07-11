import "./App.css";

import { Route, Routes } from "react-router-dom";
import NewPost from "./container/write/NewPost";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./theme/GlobalStyle";
import UserBlog from "./container/userBlog/UserBlog";
import Recordpage from "./container/record/Recordpage";
import { QueryClient, QueryClientProvider } from "react-query";
import AlertWindow from "./components/common/AlertWindow";
import { useSelector } from "react-redux";
import MainPage from "./container/main/MainPage";
import QueryHooks from "./container/app/QueryHooks";
import PostContainer from "./container/post/PostContainer";
import { useLogin } from "./Hooks/useLogin";
import PrivateRoute from "./components/Route/PrivateRoute";
import PageError from "./Pages/PageError";
import UpdatePage from "./Pages/UpdatePage";

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
              element={<PrivateRoute element={<NewPost />} auth={loggedIn} />}
            ></Route>
            <Route path='/Post' element={<PostContainer />}></Route>
            <Route path='/userBlog' element={<UserBlog />}></Route>
            <Route
              path='/RecordPage'
              element={
                <PrivateRoute element={<Recordpage />} auth={loggedIn} />
              }
            />
            <Route path='/update' element={<UpdatePage />} />
            <Route path='/*' element={<PageError />} />
          </Routes>
          {showAlert && <AlertWindow />}
        </ThemeProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
