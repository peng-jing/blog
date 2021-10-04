import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { AuthContext } from "../../contexts";
import { createPost } from "../../WebAPI";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";
const Root = styled.div`
  max-width: 700px;
  width: 90%;
  margin 20px auto;
  border-radius: 20px;
  padding: 20px 50px 50px;
  box-sizing: border-box;
  box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
  
`;
const CreateTitle = styled.h1`
  text-align: center;
`;
const InputTitle = styled.input`
  margin: 10px 0px 20px;
  width: 100%;
  padding: 8px 10px;
  font-size: 16px;
  box-sizing: border-box;
`;
const TextareaBody = styled.textarea`
  margin: 10px 0px 20px;
  width: 100%;
  box-sizing: border-box;
  height: 200px;
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
`;
export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { user } = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [history, user]);
  const handleSubmit = () => {
    console.log(title);
    createPost(title, body).then((res) => {
      history.push("/");
    });
  };
  return (
    <Root>
      <CreateTitle>發布文章</CreateTitle>
      <form onSubmit={handleSubmit}>
        <div>標題</div>
        <InputTitle
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></InputTitle>
        <div>內文</div>
        <TextareaBody
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        ></TextareaBody>
        <SubmitBtn>發布</SubmitBtn>
      </form>
    </Root>
  );
}
