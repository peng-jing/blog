import styled from "styled-components";
import { Link } from "react-router-dom";
const Root = styled.div`
  flex: 1;
  max-width: 500px;
  width: 90%;
  margin: 30px auto;
  box-shadow: 0px 1px 5px rgba(0 0 0 / 20%);
  border-radius: 3px;
`;
const FormTags = styled.div`
  display: flex;
`;
const Tag = styled(Link)`
  text-align: center;
  color: #333;
  text-decoration: none;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  padding: 15px;
  font-weight: 700;
  box-shadow: inset 0px -1px 2px rgb(0 0 0 / 20%);
  transition: 0.2s;
  ${(props) =>
    props.$on &&
    `box-shadow: none;
    border-radius: 3px;`}
`;
const Form = styled.form`
  padding: 50px;
  text-align: center;
`;
const Input = styled.input`
  width: 100%;
  display: block;
  box-sizing: border-box;
  font-size: 16px;
  padding: 10px;
  margin-bottom: 30px;
`;
const ErrorMsg = styled.div`
  margin-bottom: 30px;
  font-size: 18px;
  color: #f24;
  font-weight: 800;
`;
const SubmitBtn = styled.button`
  display: block;
  width: 100%;
  background-color: #90aacb;
  color: #eee;
  font-weight: 900;
  border: none;
  border-raduis: 3px;
  padding: 12px;
  cursor: pointer;
  font-size: 18px;
  letter-spacing: 1.2px;
`;

export { Root, FormTags, Tag, Form, Input, ErrorMsg, SubmitBtn };
