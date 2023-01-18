import "./App.css";
import styled from "styled-components";
import Header from "./components/Header";
import BlogList from "./components/BlogList";

const Body = styled.div`
  /* padding: 0 var(--gap); */
  padding-top: calc(var(--header) * 1.5);
`;

const Footer = styled.footer`
  height: 15vh;
  width: calc(100% - var(--gap) * 2);
  padding: 0 var(--gap);
`;

function App() {
  return (
    <div className='App'>
      <Header />
      <Body>
        <BlogList />
      </Body>
      <Footer>푸터영역</Footer>
    </div>
  );
}

export default App;
