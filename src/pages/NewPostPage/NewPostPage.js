import { useRef } from "react";
import styled from "styled-components";

import { postArticle } from "../../WebAPI";
import { findEmptyInput } from "../../utils";
import useSubmit from "../../customHooks/useSubmit";

const Root = styled.div`
  padding-top: 50px;
  display: flex;
  justify-content: center;
  height: 100%;
`;

const NewPostForm = styled.form`
  width: 750px;
  height: 900px;
  padding: 28px 24px;
  background: #fffffb;
  color: rgba(152, 152, 152, 1);
  border: 1px solid rgba(180, 180, 180, 0.3);
  border-radius: 6px;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
`;

const NewPostTitle = styled.div`
  margin: 0;
  margin-bottom: 20px;
  font-size: 30px;
  text-align: center;
`;

const NewPostContent = styled.div`
  span {
    font-size: 20px;
  }

  textarea,
  input {
    margin-top: 10px;
    padding: 5px 10px;
    width: 100%;
    height: 2.5rem;
    display: block;
    font-size: 16px;
    background: rgb(235, 240, 255, 0.5);
    outline: none;
    border: 1px solid transparent;
    border-radius: 5px;
    box-shadow: rgb(10 10 10 / 5%) 0px 0.0625em 0.125em inset;
  }

  textarea:focus,
  input:focus {
    background: transparent;
    border: 2px solid rgb(205, 225, 255);
  }

  textarea {
    padding: 10px 15px;
    height: 550px;
    resize: none;
  }

  & + & {
    margin-top: 35px;
  }
`;

const TitleInput = styled.input``;

const ContentTextarea = styled.textarea``;

const NewPostSubmit = styled.div`
  padding-top: 35px;
  text-align: center;

  button {
    color: #8b7272;
    font-size: 16px;
    padding: 12px 28px;
    border: 1px solid transparent;
    border-radius: 5px;
    box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
    transition: all 0.5s;
  }

  button:hover {
    cursor: pointer;
    color: #fff;
    background: #8b7272;
  }

  button:active {
    transform: scale(0.9);
  }
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 18px;
  text-align: center;
  white-space: pre-line;
`;

export default function NewPostPage() {
  console.log("render newPostPage");

  const titleInputRef = useRef();
  const contentTextareaRef = useRef();
  const {
    errorMessage,
    setErrorMessage,
    showLoader,
    setShowLoader,
    navigate,
    submitCheck,
  } = useSubmit([titleInputRef, contentTextareaRef]);

  const handleSubmit = (e) => {
    const emptyErrorMsg = "title and body are required";
    const data = submitCheck(e, emptyErrorMsg);
    if (!data) return;

    setShowLoader(true);
    const [title, body] = data;
    postArticle(title, body).then((data) => {
      if (data.ok === 0) {
        if (data.message) setErrorMessage(data.message);
        return setShowLoader(false);
      }
      alert("文章發佈成功，將為您導回首頁！");
      navigate("/");
    });
  };

  return (
    <>
      {!showLoader && (
        <Root>
          <NewPostForm onSubmit={handleSubmit}>
            <NewPostTitle>發佈文章</NewPostTitle>
            {errorMessage && <ErrorMsg>{errorMessage}</ErrorMsg>}
            <NewPostContent>
              <span>文章標題: </span>
              <TitleInput ref={titleInputRef} />
            </NewPostContent>
            <NewPostContent>
              <span>文章內容:</span>
              <ContentTextarea ref={contentTextareaRef}></ContentTextarea>
            </NewPostContent>
            <NewPostSubmit>
              <button>確認發佈</button>
            </NewPostSubmit>
          </NewPostForm>
        </Root>
      )}
    </>
  );
}
