import styled from "styled-components";

const InputCss = styled.input`
  padding: 0.5rem 1rem;
  display: block;
  width: 100%;
  height: 4rem;
  background-color: ${({ theme }) => theme.bgElement};
  border: 1px solid
    ${({ theme }) =>
      (props) =>
        props.fail ? "red" : theme.btnColor};
  border-radius: 4px;
  margin-bottom: 2rem;
`;

export { InputCss };
