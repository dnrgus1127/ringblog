import "./App.css";
import styled from "styled-components";
import Header from "./components/Header";

const Body = styled.div`
  padding: 0 var(--gap);
  padding-top: var(--header);
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
      <Body>바디영역</Body>
      <Footer>푸터영역</Footer>
    </div>
  );
}

export default App;
