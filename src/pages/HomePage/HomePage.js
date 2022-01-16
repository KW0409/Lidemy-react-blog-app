import { useState, useEffect, useContext, memo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import PostList from "./PostList";
import Pagination from "../../components/Pagination";

import { getPosts } from "../../WebAPI";
import { LoaderContext } from "../../context";

const Root = styled.div`
  width: 80%;
  max-width: 850px;
  margin: 0 auto;
  padding-top: 48px;
`;

const ErrorMsg = styled.h2`
  color: red;
  text-align: center;
`;

const EmptyMessage = styled.h2`
  color: red;
  text-align: center;
  white-space: pre-line;
`;

const MemoPostList = memo(PostList);
const MemoPagination = memo(Pagination);

export default function HomePage() {
  console.log("render HomePage");

  const [posts, setPosts] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [pageDatas, setPageDatas] = useState({
    totalPage: 1,
    currentPage: 1,
  });

  const { showLoader, setShowLoader } = useContext(LoaderContext);
  const navigate = useNavigate();
  const pageLimit = 5;

  useEffect(() => {
    if (errorMessage) setErrorMessage(null);
    if (pageDatas.currentPage === 1) {
      navigate("/");
    } else if (pageDatas.currentPage !== 1) {
      navigate(`/?page=${pageDatas.currentPage}`);
    }
    setShowLoader(true);

    getPosts(pageLimit, pageDatas.currentPage, setErrorMessage)
      .then((resp) => {
        if (!resp) return [];

        const totalCount = resp.headers.get("x-total-count");
        setPageDatas({
          ...pageDatas,
          totalPage: Math.ceil(totalCount / pageLimit),
        });
        return resp.json();
      })
      .then((datas) => {
        if (datas.length) setPosts(datas);
        setShowLoader(false);
      });
  }, [pageDatas.currentPage]);
  // 這邊的 dependency 因為 pageDatas 是物件，所以要寫成 物件.屬性 才會是單純比較此屬性的值，而不是整個物件

  return (
    <>
      {!showLoader && (
        <Root>
          {errorMessage && <ErrorMsg>{errorMessage}</ErrorMsg>}
          {!errorMessage && !posts && (
            <EmptyMessage>
              {"~~~~~ 目前似乎還沒有任何文章呢 ~~~~~"}
            </EmptyMessage>
          )}
          {!errorMessage && posts && (
            <>
              {posts.map((post) => (
                <MemoPostList key={post.id} post={post} />
              ))}
              <MemoPagination
                pageDatas={pageDatas}
                setPageDatas={setPageDatas}
              />
            </>
          )}
        </Root>
      )}
    </>
  );
}
