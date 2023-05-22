import { Link } from "react-router-dom";
import styled from "styled-components";
import media from "../../lib/style/media";

const LogoSvg = styled.svg`
  height: 100%;
  width: 10vw;

  ${media.medium} {
    width: 15vw;
  }
  ${media.small} {
    width: 25vw;
  }
`;

export default function Logo() {
  return (
    <Link to={"/"}>
      {/* ChatGPT로 생성한 LOGO */}
      <LogoSvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -25 70 40'>
        <defs>
          <linearGradient id='gradient' x1='0%' y1='50%' x2='50%' y2='200%'>
            <stop
              offset='0%'
              style={{ stopColor: "#35c6b9", stopOpacity: 0.8 }}
            />
            <stop
              offset='100%'
              style={{ stopColor: "#e1b6b7", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            x: 0,
            y: 20,
            fill: "url(#gradient)",
          }}
        >
          RingBlog
        </text>
      </LogoSvg>
    </Link>
  );
}
