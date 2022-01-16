const TOKEN_NAME = "Lidemy token";

export const setUserAuthToken = (token) => {
  return window.localStorage.setItem(TOKEN_NAME, token);
};

export const getUserAuthToken = (token) => {
  return window.localStorage.getItem(TOKEN_NAME);
};
