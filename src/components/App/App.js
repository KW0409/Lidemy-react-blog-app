import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import {
  HomePage,
  LoginPage,
  RegisterPage,
  AboutPage,
  ArticlePage,
  NewPostPage,
} from "../../pages";
import Header from "../Header";
import Loader from "../Loader";

import { UserStateContext, LoaderContext } from "../../context";
import { getUserAuthToken, setUserAuthToken } from "../../utils";
import { getUserData } from "../../WebAPI";

const Root = styled.div`
  padding-top: 64px;
  height: 100%;
`;

export default function App() {
  console.log("===== render App =====");

  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const token = getUserAuthToken();

  useEffect(() => {
    if (!token) return setIsLoadingUser(false);

    getUserData(token, "App").then((resp) => {
      if (!resp.ok) {
        setUserAuthToken("");
      }
      setUser(resp.data);
      setIsLoadingUser(false);
    });
  }, [token]);

  return (
    <UserStateContext.Provider
      value={{ user, setUser, isLoadingUser, setIsLoadingUser }}
    >
      <LoaderContext.Provider value={{ showLoader, setShowLoader }}>
        <Root>
          <Router>
            <Header />
            {showLoader && <Loader />}
            <Routes>
              {/*
                Switch: 確保只會匹配第一個符合網址列的路由，exact path 代表完整匹配；若只有 path 是部分匹配
                在 react-router v6 之後 Routes 取代了 Switch 的作用
                且 v6 版本也不再需要特別用 exact path 了，因為 v6 的 path 已經會自己匹配最符合的目標
              */}
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              <Route path="/about" element={<AboutPage />}></Route>
              <Route path="/posts/:id" element={<ArticlePage />}></Route>
              <Route path="/new-post" element={<NewPostPage />}></Route>
            </Routes>
          </Router>
        </Root>
      </LoaderContext.Provider>
    </UserStateContext.Provider>
  );
}
