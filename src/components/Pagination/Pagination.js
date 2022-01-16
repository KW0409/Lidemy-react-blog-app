import styled from "styled-components";
import PropTypes from "prop-types";

import usePagination from "../../customHooks/usePagination.js";

const PageButtonList = styled.ul`
  padding: 55px 0;
  list-style: none;
  display: flex;
  justify-content: center;
`;

const PageLi = styled.li`
  width: 36px;
  height: 36px;
  color: #8b7272;
  font-size: 18px;
  font-family: monospace;
  line-height: 33px;
  text-align: center;
  border: 1px solid #8b7272;
  border-radius: 6px;
  box-shadow: rgb(204 204 204) 1px 1px;
  cursor: pointer;

  ${(props) =>
    props.$hide &&
    `
      visibility: hidden;
  `}

  ${(props) =>
    props.$active &&
    `
      color: #fff;
      background: #8b7272;
      border-color: #fff;
      box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
      transform: translate(0px, -5px);
  `}

  &:hover {
    color: #fff;
    background: #8b7272;
    border-color: #fff;
    box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.9);
  }

  & + & {
    margin-left: 15px;
  }
`;

const PageEtcLi = styled.li`
  width: 36px;
  height: 36px;
  color: #8b7272;
  font-size: 20px;
  font-family: monospace;
  line-height: 38px;
  text-align: center;
  margin: 0 15px;
`;

function PageLiItem({ currentPage, pageValue, handleChangePage }) {
  return (
    <PageLi
      $active={currentPage === pageValue}
      onClick={() => handleChangePage(pageValue)}
    >
      {pageValue}
    </PageLi>
  );
}

export default function Pagination({ pageDatas, setPageDatas }) {
  console.log("render Pagination");

  const {
    currentPage,
    totalPage,
    totalPageArray,
    slicePageArray,
    handleChangePage,
  } = usePagination(pageDatas, setPageDatas);

  return (
    <PageButtonList>
      <PageLi
        $hide={currentPage === 1}
        onClick={() => handleChangePage("prev")}
      >
        <i className="fas fa-chevron-left"></i>
      </PageLi>
      {totalPage <= 10 &&
        totalPageArray.map((pageValue) => (
          <PageLiItem
            key={`pageNum-${pageValue}`}
            currentPage={currentPage}
            pageValue={pageValue}
            handleChangePage={handleChangePage}
          />
        ))}
      {totalPage > 10 && (
        <>
          {currentPage > 5 && (
            <>
              {totalPageArray.slice(0, 2).map((pageValue) => (
                <PageLiItem
                  key={`pageNum-${pageValue}`}
                  currentPage={currentPage}
                  pageValue={pageValue}
                  handleChangePage={handleChangePage}
                />
              ))}
              <PageEtcLi>
                <i className="fas fa-ellipsis-h"></i>
              </PageEtcLi>
            </>
          )}
          {slicePageArray.map((pageValue) => (
            <PageLiItem
              key={`pageNum-${pageValue}`}
              currentPage={currentPage}
              pageValue={pageValue}
              handleChangePage={handleChangePage}
            />
          ))}
          {currentPage <= totalPage - 5 && (
            <>
              <PageEtcLi>
                <i className="fas fa-ellipsis-h"></i>
              </PageEtcLi>
              {totalPageArray.slice(totalPage - 2).map((pageValue) => (
                <PageLiItem
                  key={`pageNum-${pageValue}`}
                  currentPage={currentPage}
                  pageValue={pageValue}
                  handleChangePage={handleChangePage}
                />
              ))}
            </>
          )}
        </>
      )}
      <PageLi
        $hide={currentPage === totalPage}
        onClick={() => handleChangePage("next")}
      >
        <i className="fas fa-chevron-right"></i>
      </PageLi>
    </PageButtonList>
  );
}

Pagination.propTypes = {
  pageDatas: PropTypes.shape({
    totalPage: PropTypes.number,
    currentPage: PropTypes.number,
  }),
  setPageDatas: PropTypes.func,
};

PageLiItem.propTypes = {
  currentPage: PropTypes.number,
  pageValue: PropTypes.number,
  handleChangePage: PropTypes.func,
};
