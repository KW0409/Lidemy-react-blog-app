import { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { login, getUserData } from "../../WebAPI";
import { setUserAuthToken } from "../../utils";
import useSubmit from "../../customHooks/useSubmit";

const Root = styled.div`
  padding: 50px 0;
  min-height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.form`
  width: 400px;
  padding: 28px 24px;
  background: #fffffb;
  color: rgba(152, 152, 152, 1);
  border: 1px solid rgba(180, 180, 180, 0.3);
  border-radius: 6px;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
`;

const ErrorMsg = styled.p`
  color: red;
  text-align: center;
  white-space: pre-line;
`;

const LoginTitle = styled.h1`
  margin: 0;
  margin-bottom: 20px;
  font-size: 30px;
  text-align: center;
`;

const LoginInput = styled.div`
  span {
    font-size: 20px;
  }

  input {
    margin-top: 5px;
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

  input:focus {
    border: 2px solid rgb(205, 225, 255);
  }

  & + & {
    margin-top: 20px;
  }
`;

const LoginSubmit = styled.div`
  margin-top: 25px;
  text-align: center;

  button {
    color: #8b7272;
    font-size: 16px;
    padding: 6px 26px;
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

const RegisterLink = styled.div`
  padding-top: 20px;
  text-align: center;

  a {
    text-decoration: none;
    color: rgb(66, 139, 202);
  }
`;

export default function LoginPage() {
  console.log("render LoginPage");

  const userInputRef = useRef();
  const passwordInputRef = useRef();
  const {
    errorMessage,
    setErrorMessage,
    setUser,
    showLoader,
    setShowLoader,
    navigate,
    submitCheck,
  } = useSubmit([userInputRef, passwordInputRef]);

  const handleSubmit = (e) => {
    const emptyErrorMsg = "username and password are required";
    const data = submitCheck(e, emptyErrorMsg);
    if (!data) return;

    setShowLoader(true);
    const [username, password] = data;
    login(username, password, "LoginPage").then((data) => {
      if (!data.ok) {
        if (data.message) setErrorMessage(data.message);
        return setShowLoader(false);
      }

      getUserData(data.token, "LoginPage").then((resp) => {
        if (!resp.ok) {
          if (resp.message) setErrorMessage(resp.message);
          setUserAuthToken("");
          return setShowLoader(false);
        }
        setUser(resp.data);
        setUserAuthToken(data.token); // 放在這邊是避免因 getUserData 出問題而出現兩次 alert(App, LoginPage)
        navigate("/"); // 這邊因為成功登入後會導向 HomePage，所以不用 setShowLoader(false)
      });
    });
  };

  return (
    <>
      {!showLoader && (
        <Root>
          <LoginForm onSubmit={handleSubmit}>
            <LoginTitle>登入</LoginTitle>
            {errorMessage && <ErrorMsg>{errorMessage}</ErrorMsg>}
            <LoginInput>
              <span>Username</span>
              <input ref={userInputRef} />
            </LoginInput>
            <LoginInput>
              <span>Password</span>
              <input type="password" ref={passwordInputRef} />
            </LoginInput>
            <LoginSubmit>
              <button>確認</button>
            </LoginSubmit>
            <RegisterLink>
              還沒有帳戶嗎？ <Link to="/register">免費註冊</Link>
            </RegisterLink>
          </LoginForm>
        </Root>
      )}
    </>
  );
}
