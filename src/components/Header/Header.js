import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { UserStateContext } from "../../context";
import { setUserAuthToken } from "../../utils";

const HeaderContainer = styled.div`
  width: 100%;
  min-height: 64px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 6px rgb(199, 197, 197);
  padding: 0px 26px;
  z-index: 2;
`;

const Brand = styled.h1`
  margin: 0;

  a {
    text-decoration: none;
    color: #8b7272;
  }
`;

const NavbarList = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
  text-decoration: none;
  margin: 0;
  padding: 0;
`;

const UserMessage = styled.div`
  color: rgb(45, 165, 255, 0.7);
  font-size: 20px;
  font-weight: bold;
  margin-right: 25px;
`;

const Nav = styled(Link)`
  width: 100px;
  min-height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #666;
  transition: all 0.5s;

  ${(props) =>
    props.$active &&
    `
      background: #ddd;
      color: #222;
  `}

  ${(props) =>
    !props.$active &&
    `
    &:hover {
      background: #eee;
    }
  `}

  ${(props) =>
    props.$notOpen &&
    `
      color: #ccc;
      text-align: center;
      white-space: pre-line;
      pointer-events: none;
  `}
`;

const LeftNavbar = styled.div`
  display: flex;
  align-items: center;

  /* 代表在 LeftNavbar 底下的 NavbarList */
  ${NavbarList} {
    margin-left: 32px;
  }
`;

export default function Header() {
  console.log("render Header");

  const { user, setUser, isLoadingUser } = useContext(UserStateContext);
  const currentLocation = useLocation();

  const handleLogout = () => {
    setUserAuthToken("");
    return setUser(null);
  };

  return (
    <HeaderContainer>
      <LeftNavbar>
        <Brand>
          <Link to="/">React 部落格</Link>
        </Brand>
        <NavbarList>
          <Nav to="/" $active={currentLocation.pathname === "/"}>
            首頁
          </Nav>
          <Nav to="/about" $active={currentLocation.pathname === "/about"}>
            關於我
          </Nav>
          <Nav
            to="/post-list"
            $notOpen
            $active={currentLocation.pathname === "/post-list"}
          >
            {`分類列表\n(暫未開放)`}
          </Nav>
        </NavbarList>
      </LeftNavbar>
      <NavbarList>
        {!isLoadingUser && !user && (
          <>
            <Nav to="/login" $active={currentLocation.pathname === "/login"}>
              登入
            </Nav>
            <Nav
              to="/register"
              $active={currentLocation.pathname === "/register"}
            >
              註冊
            </Nav>
          </>
        )}

        {!isLoadingUser && user && (
          <>
            <UserMessage>你好, {user.username}</UserMessage>
            <Nav
              to="/new-post"
              $active={currentLocation.pathname === "/new-post"}
            >
              發佈文章
            </Nav>
            <Nav to="/" onClick={handleLogout}>
              登出
            </Nav>
          </>
        )}
      </NavbarList>
    </HeaderContainer>
  );
}
