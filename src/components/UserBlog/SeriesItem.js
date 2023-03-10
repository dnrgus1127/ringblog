import React from "react";
import styled from "styled-components";
import useBoolean from "../../Hooks/useBoolean";
import SeriesPosts from "./SeriesPosts";
import ConfirmWindow from "../ConfirmWindow";
import { useFetch } from "../../Hooks/useFetch";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgElement3};
  padding: 2rem 2.5rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  .titleAndDelete {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  .delete {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      color: red;
    }
  }

  .title {
    font-size: 2rem;
    color: ${({ theme }) => theme.btnColor};
    font-weight: 600;
    display: inline-block;
  }
  .showBtn {
    color: ${({ theme }) => theme.greyColor};
    display: flex;
    align-items: center;
  }
  .postsWrap {
    padding-left: 1rem;
    margin-bottom: 1rem;
  }
`;

const ArrowIcon = styled.svg`
  width: 3rem;
  height: 3rem;
  fill: ${({ theme }) => theme.greyColor};
`;

const arrowTop = (
  <ArrowIcon
    clipRule='evenodd'
    fillRule='evenodd'
    stroke-linejoin='round'
    stroke-miterlimit='2'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='m16.843 13.789c.108.141.157.3.157.456 0 .389-.306.755-.749.755h-8.501c-.445 0-.75-.367-.75-.755 0-.157.05-.316.159-.457 1.203-1.554 3.252-4.199 4.258-5.498.142-.184.36-.29.592-.29.23 0 .449.107.591.291 1.002 1.299 3.044 3.945 4.243 5.498z' />
  </ArrowIcon>
);

const arrowUnder = (
  <ArrowIcon
    clipRule='evenodd'
    fillRule='evenodd'
    stroke-linejoin='round'
    stroke-miterlimit='2'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z' />
  </ArrowIcon>
);

export default function SeriesItem({ children, isBlog, refresh, mdfd }) {
  const [showList, onToggleShowList] = useBoolean(false);
  const [askConfirm, onToggleAsk] = useBoolean(false);

  const posts = useFetch(`/series/postsById?seriesId=${children._id}`);

  const deleteSeries = () => {
    onToggleAsk();
    fetch(`/series/delete?seriesId=${children._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("???????????? ?????????????????????.");
        } else {
          alert("????????? ?????? ??????.");
        }
      })
      .then(() => {
        refresh();
      });
  };

  return (
    <Container>
      <div className='titleAndDelete'>
        <p className='title'>{children.title}</p>
        {isBlog && (
          <div>
            <button
              onClick={() => {
                mdfd();
              }}
            >
              ??????
            </button>
            <button className='delete' onClick={onToggleAsk}>
              ??????
            </button>
          </div>
        )}
      </div>
      {showList ? (
        <div className='postsWrap'>
          <SeriesPosts data={posts.data && posts.data} />
        </div>
      ) : null}
      <button className='showBtn' onClick={onToggleShowList}>
        {showList ? arrowTop : arrowUnder} ??? ??????
      </button>
      {askConfirm ? (
        <ConfirmWindow
          ok={deleteSeries}
          cancel={onToggleAsk}
          title={"????????? ??????"}
          message={"???????????? ?????????????????????????"}
          subMsg={"(???????????? ???????????? ???????????? ???????????? ????????????.)"}
        />
      ) : null}
    </Container>
  );
}
