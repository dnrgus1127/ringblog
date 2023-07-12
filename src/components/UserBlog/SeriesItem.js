import React from "react";
import styled from "styled-components";
import useBoolean from "../../Hooks/useBoolean";
import SeriesPosts from "./SeriesPosts";
import useQueryUri from "../../Hooks/useQueryUri";
import ConfirmWindow from "../common/ConfirmWindow";

const ArrowIcon = styled.svg`
  width: 3rem;
  height: 3rem;
  fill: ${({ theme }) => theme.greyColor};
`;
const Container = styled.div`
  background-color: ${({ theme }) => theme.bgElement3};
  padding: 2rem 2.5rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  .titleAndDelete {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  .mdfd {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      color: lightgreen;
    }
  }
  .delete {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      color: red;
    }
  }
  .btnWrap {
    width: 6rem;
    display: flex;
    justify-content: space-between;
    button {
      font-weight: 800;
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

  @media (max-width: 640px) {
    padding: 1.5rem 2rem;
    .title {
      font-size: 1.8rem;
    }

    ${ArrowIcon} {
      width: 2.5rem;
    }

    .delete {
      color: red;
    }

    .btnWrap {
      button {
        font-size: 1.2rem;
      }
    }
  }
`;

const arrowTop = (
  <ArrowIcon
    clipRule='evenodd'
    fillRule='evenodd'
    strokeinejoin='round'
    strokeMiterlimit='2'
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
    strokeLinejoin='round'
    strokeMiterlimit='2'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z' />
  </ArrowIcon>
);

export default function SeriesItem({ data, isBlog, refresh, mdfd }) {
  const [showList, onToggleShowList] = useBoolean(false);
  const [askConfirm, onToggleAsk] = useBoolean(false);

  const posts = useQueryUri(
    ["seriesPostById", data._id],
    `/series/postsById?seriesId=${data._id}`,
    100000
  );

  const deleteSeries = () => {
    onToggleAsk();
    fetch(`/series/delete?seriesId=${data._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("시리즈가 삭제되었습니다.");
        } else {
          alert("시리즈 삭제 실패.");
        }
      })
      .then(() => {
        refresh();
      });
  };

  return (
    <Container>
      <div className='titleAndDelete'>
        <p className='title'>{data.title}</p>
        {isBlog && (
          <div className='btnWrap'>
            <button
              className='mdfd'
              onClick={() => {
                mdfd();
              }}
            >
              수정
            </button>
            <button className='delete' onClick={onToggleAsk}>
              삭제
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
        글 보기{showList ? arrowTop : arrowUnder}
      </button>
      {askConfirm ? (
        <ConfirmWindow
          ok={deleteSeries}
          cancel={onToggleAsk}
          title={"시리즈 삭제"}
          message={"시리즈를 삭제하시겠습니까?"}
          subMsg={"(시리즈를 삭제해도 포스트는 지워지지 않습니다.)"}
        />
      ) : null}
    </Container>
  );
}
