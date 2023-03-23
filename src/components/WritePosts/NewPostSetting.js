import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Context } from "../../functions/Login/LoginProvider";
import useBoolean from "../../Hooks/useBoolean";
import { useFetch } from "../../Hooks/useFetch";
import NewPostSeries from "./NewPostSeries.js";

const Container = styled.div``;

const SeriesWrap = styled.div`
  border-radius: 4px;
  padding: 1rem 2rem;
  text-align: center;

  .addButton {
    font-size: 2rem;
    font-weight: 700;
    background-color: ${({ theme }) => theme.bgElement2};
    width: 100%;
    padding: 1rem;
    border-radius: 0.4rem;
    color: ${({ theme }) => theme.btnColor};
    cursor: pointer;
  }
`;
const SeriesSelect = styled.div`
  h3 {
    text-align: start;
  }
  .removeSelect {
    text-align: end;
    color: ${({ theme }) => theme.warning};
    font-size: 1.4rem;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Selected = styled.div`
  box-shadow: inset 0px 0px 1px ${({ theme }) => theme.greyColor};
  padding: 1rem 0;
  font-size: 1.6rem;
  font-weight: 700;
`;

export default function NewPostSetting({ setSeries }) {
  const [onSeries, onToggelSeries] = useBoolean(false);
  const [update, setUpdate] = useState();
  const [seriesIndex, setIndex] = useState(null);
  const { loggedUser } = useContext(Context);

  const { data } = useFetch(
    `/series/byUser?userId=${loggedUser.userId}`,
    update
  );

  useEffect(() => {
    seriesIndex !== null && setSeries(data[seriesIndex]._id);
  }, [seriesIndex, setSeries, data]);

  return (
    <Container>
      <SeriesWrap>
        {onSeries ? (
          <NewPostSeries
            data={data}
            cancel={onToggelSeries}
            update={setUpdate}
            select={setIndex}
            index={seriesIndex}
          />
        ) : (
          <SeriesSelect>
            <h3>시리즈</h3>
            {seriesIndex !== null ? (
              <>
                <Selected>{data && data[seriesIndex].title}</Selected>
                <p
                  className='removeSelect'
                  onClick={() => {
                    setIndex(null);
                  }}
                >
                  시리즈 추가 취소
                </p>
              </>
            ) : (
              <button className='addButton' onClick={onToggelSeries}>
                시리즈에 추가하기
              </button>
            )}
          </SeriesSelect>
        )}
      </SeriesWrap>
    </Container>
  );
}
