import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { MEDIA_QUERY_MD } from "../../constants";
const SiderBarContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  ${MEDIA_QUERY_MD} {
    display: none;
  }
`;
const SiderWrapper = styled.div`
  height: 100%;
`;
const SiderBarMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 70px;
`;
const SiderBarLink = styled(Link)`
  text-decoration: none;
  color: #333;
  margin: 10px auto;
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  padding: 10px;
  width: 80%;
  text-align: center;
`;
export default function SiderBar({
  token,
  user,
  handleLogout,
  isOpen,
  trigger,
}) {
  let location = useLocation();
  return (
    <SiderBarContainer isOpen={isOpen}>
      {/* <Icon>
        <CloseIcon onClick={trigger} />
      </Icon> */}
      <SiderWrapper>
        <SiderBarMenu>
          <SiderBarLink
            onClick={trigger}
            to="/list/1"
            $active={location.pathname.includes("/list")}
          >
            文章列表
          </SiderBarLink>
          {token && user && (
            <SiderBarLink
              onClick={trigger}
              to="/create"
              $active={location.pathname === "/create"}
            >
              發布文章
            </SiderBarLink>
          )}
          {!token && !user && (
            <SiderBarLink
              onClick={trigger}
              to="/login"
              $active={location.pathname === "/login"}
            >
              登入/註冊
            </SiderBarLink>
          )}
          {token && user && (
            <SiderBarLink to="/" onClick={handleLogout}>
              登出
            </SiderBarLink>
          )}
        </SiderBarMenu>
      </SiderWrapper>
    </SiderBarContainer>
  );
}
