import { getUserAuthToken } from "./utils";

const BASE_URL = "https://student-json-api.lidemy.me";

// 取得目前頁數的文章
export const getPosts = (pageLimit, currentPage, setErrorMessage) => {
  const startNum = (currentPage - 1) * pageLimit;
  return fetch(
    `${BASE_URL}/posts?_start=${startNum}&_limit=${pageLimit}&_sort=createdAt&_expand=user&_order=desc`
  )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("getPosts Err(HomePage):", err.toString());
      setErrorMessage(
        `\u26A0 很抱歉，因伺服器異常，導致目前無法獲得文章資料，請在稍候重整頁面 \u26A0`
      );
    });
};

// 取得指定文章
export const getArticle = (id, setErrorMessage) => {
  return fetch(`${BASE_URL}/posts?id=${id}&_expand=user`)
    .then((res) => res.json())
    .catch((err) => {
      console.log("getArticle Err(ArticlePage):", err.toString());
      setErrorMessage(
        `\u26A0 很抱歉，因伺服器異常，導致目前無法獲取文章內容，請在稍候重整頁面 \u26A0`
      );
      return [];
    });
};

// 登入（獲得 token）
export const login = (username, password, usePlace) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(`login Err(${usePlace}):`, err.toString());
      alert(`很抱歉，因伺服器異常導致無法成功登入，請在稍候重試`);
      return { ok: 0 };
    });
};

// 註冊（獲得 token）
export const register = (nickname, username, password, usePlace) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(`register Err(${usePlace}):`, err.toString());
      alert(`很抱歉，因伺服器異常導致無法成功註冊，請在稍候重試`);
      return { ok: 0 };
    });
};

// 身份驗證(用 token 驗證，取得使用者完整資料)
export const getUserData = (token, usePlace) => {
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(`getUserData Err(${usePlace}):`, err.toString());
      alert(`很抱歉，因伺服器異常無法獲取使用者資料，請在稍候重新登入`);
      return { ok: 0 };
    });
};

// 發佈文章
export const postArticle = (title, body) => {
  const token = getUserAuthToken();

  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log("postArticle Err(NewPostPage):", err.toString());
      alert(`很抱歉，因伺服器異常導致發布文章失敗，請在稍候重試`);
      return { ok: 0 };
    });
};
