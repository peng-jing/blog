import React from "react";
import styled from "styled-components";
const FooterWrapper = styled.div`
  background-color: #ffb085;
  padding: 10px;
  text-align: center;
  color: #fff;
  font-weight: 700;
  margin-top: 30px;
`;
export default function Footer() {
  return <FooterWrapper>© 2021 Janet Powered by React</FooterWrapper>;
}
