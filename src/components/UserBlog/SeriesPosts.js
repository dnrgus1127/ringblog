import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Title = styled.p`
  display: inline-block;
  color: ${({ theme }) => theme.greyColor};
  &:hover {
    color: ${({ theme }) => theme.btnColor};
    text-decoration: underline;
  }
`;

export default function SeriesPosts({ data }) {
  return (
    <div>
      {data.map((item, idx) => (
        <div key={idx}>
          <Link to={`/post?index=${item._id}`}>
            <Title>
              {idx + 1}. {item.title}
            </Title>
          </Link>
        </div>
      ))}
    </div>
  );
}
