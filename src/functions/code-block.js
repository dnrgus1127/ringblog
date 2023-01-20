import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function CodeBlock({ language = null, value }) {
  console.log(value);
  return (
    <SyntaxHighlighter language={language} style={a11yLight}>
      {value}
    </SyntaxHighlighter>
  );
}

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string,
};
