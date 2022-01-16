import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getArticle } from "../../WebAPI";
import { LoaderContext } from "../../context";

const ArticleContainer = styled.div`
  margin: 3rem auto;
  padding: 32px 24px;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  background: #fffffb;
  border: 1px solid rgba(180, 180, 180, 0.3);
  border-radius: 6px;
`;

const ErrorMsg = styled.h2`
  color: red;
  text-align: center;
`;

const EmptyMessage = styled.h3`
  color: red;
  white-space: pre-line;
`;

const ArticleTitle = styled.h1`
  margin: 0;
  width: 100%;
  color: rgb(70, 140, 200);
  font-size: 28px;
  font-family: monospace;
`;

const ArticleInfo = styled.div`
  padding: 15px 0;
  padding-top: 30px;
  border-bottom: 1px solid rgba(200, 185, 185, 1);
  display: flex;
  color: rgba(200, 185, 185, 1);

  div {
    i {
      margin-right: 5px;
    }
  }

  div + div {
    margin-left: 25px;
  }
`;

const ArticleDate = styled.div``;

const ArticleAuthor = styled.div``;

const ArticleTag = styled.div``;

const ArticleBody = styled.div`
  width: 100%;
  padding: 0px 5px;
  padding-top: 25px;
  color: rgba(152, 152, 152, 1);
  font-size: 20px;
  letter-spacing: 1.5px;
  line-height: 1.3em;
  white-space: pre-line;
`;

export default function ArticlePage() {
  console.log("render ArticlePage");

  const [article, setArticle] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const { id } = useParams();
  const { showLoader, setShowLoader } = useContext(LoaderContext);

  useEffect(() => {
    if (errorMessage) setErrorMessage(null);
    setShowLoader(true);

    getArticle(id, setErrorMessage).then((data) => {
      if (data.length) setArticle(data[0]);
      setShowLoader(false);
    });
  }, [id]);

  return (
    <>
      {!showLoader && (
        <ArticleContainer>
          {errorMessage && <ErrorMsg>{errorMessage}</ErrorMsg>}
          {!errorMessage && !article && (
            <EmptyMessage>{"這邊沒有內容喔~"}</EmptyMessage>
          )}
          {!errorMessage && article && (
            <>
              <ArticleTitle>{article.title}</ArticleTitle>
              <ArticleInfo>
                <ArticleDate>
                  <i className="fas fa-calendar-alt"></i>
                  {new Date(article.createdAt).toLocaleString()}
                </ArticleDate>
                <ArticleAuthor>
                  <i className="fas fa-user"></i>
                  {article.user.username}
                </ArticleAuthor>
                <ArticleTag>
                  <i className="fas fa-tags"></i>
                  Lidemy Student Test
                </ArticleTag>
              </ArticleInfo>
              <ArticleBody>{article.body}</ArticleBody>
            </>
          )}
        </ArticleContainer>
      )}
    </>
  );
}
