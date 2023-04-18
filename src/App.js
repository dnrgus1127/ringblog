import "./App.css";

import { Route, Routes } from "react-router-dom";
import NewPost from "./pages/NewPost";
import MainPage from "./pages/MainPage";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./theme/GlobalStyle";
import PostPage from "./pages/PostPage";
import UserBlog from "./pages/UserBlog";
import Recordpage from "./pages/Recordpage";
import { QueryClient, QueryClientProvider } from "react-query";
import AlertWindow from "./components/common/AlertWindow";
import { useSelector } from "react-redux";

function App() {
  const { themePalette } = useSelector((state) => state.color);
  const { showAlert } = useSelector((state) => state.common.alert);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <ThemeProvider theme={themePalette}>
          <GlobalStyle />
          <Routes>
            <Route path='/' element={<MainPage />}></Route>
            <Route path='/WriteNewPost' element={<NewPost />}></Route>
            <Route path='/Post' element={<PostPage />}></Route>
            <Route path='/userBlog' element={<UserBlog />}></Route>
            <Route path='/RecordPage' element={<Recordpage />} />
          </Routes>
          {showAlert && <AlertWindow />}
        </ThemeProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
