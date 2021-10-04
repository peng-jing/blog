import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useHistory } from "react-router-dom";
import WebFont from "webfontloader";
import { AuthContext } from "../../contexts";
import { setAuthToken, getAuthToken } from "../../utils";
import { MEDIA_QUERY_MD } from "../../constants";
import { FaBars, FaTimes } from "react-icons/fa";
import SiderBar from "./sideBar";
const NavBarWrapper = styled.nav`
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  position: fixed;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 999;
`;
const NavHight = styled.div`
  height: 65px;
`;
const Nav = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`;
const NavMenu = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  & div {
    display: flex;
    align-items: center;
    position: relative;
  }
  ${MEDIA_QUERY_MD} {
    display: none;
  }
`;

const Brand = styled(Link)`
  font-family: "Gluten";
  text-align: center;
  margin: 0 30px 0 0;
  font-size: 25px;
  font-weight: 800;
  color: #333;
  text-decoration: none;
  padding: 10px;
`;
const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  font-weight: 700;
  cursor: pointer;
  color: #333;
  padding: 20px 10px;
  text-decoration: none;
  & + & {
    margin-left: 20px;
  }
  &:hover {
  }
  ${(props) =>
    props.$active &&
    `&:after {
      content: "";
      height: 3px;
      width: 100%;
      background-color: #FFB085;
    }`}
`;
const MobileIcon = styled.div`
  display: none;
  ${MEDIA_QUERY_MD} {
    display: block;
    transform: translateX(-100%) scale(1.5);
    cursor: pointer;
  }
`;
const Bars = styled(FaBars)`
  ${(props) =>
    props.$isOpen &&
    `
      display: none;
    `}
`;
const CloseIcon = styled(FaTimes)`
  ${(props) =>
    props.$isOpen === false &&
    `
      display: none;
    `}
`;
export default function Header() {
  const history = useHistory();
  const token = getAuthToken();
  const { user, setUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  let location = useLocation();
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Gluten"],
      },
    });
  }, []);
  const handleLogout = () => {
    setAuthToken("");
    setUser(null);
    if (location.pathname !== "/") {
      history.push("/");
    }
  };
  const trigger = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <NavBarWrapper>
        <Nav>
          <Brand to={"/"}>
            Janet's <br /> Blog!
          </Brand>

          <MobileIcon>
            <Bars $isOpen={isOpen} onClick={trigger} />
            <CloseIcon $isOpen={isOpen} onClick={trigger} />
          </MobileIcon>
          <NavMenu>
            <div>
              <NavLink
                to="/list/1"
                $active={location.pathname.includes("/list")}
              >
                文章列表
              </NavLink>
            </div>
            <div>
              {token && user && (
                <NavLink to="/create" $active={location.pathname === "/create"}>
                  發布文章
                </NavLink>
              )}
              {!token && !user && (
                <NavLink to="/login" $active={location.pathname === "/login"}>
                  登入/註冊
                </NavLink>
              )}
              {token && user && (
                <NavLink to="/" onClick={handleLogout}>
                  登出
                </NavLink>
              )}
            </div>
          </NavMenu>
        </Nav>
      </NavBarWrapper>
      <NavHight />
      <SiderBar
        token={token}
        user={user}
        handleLogout={handleLogout}
        isOpen={isOpen}
        trigger={trigger}
      />
    </>
  );
}
