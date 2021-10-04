import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { getPost } from "../../WebAPI";
const Root = styled.div`
  flex: 1;
  max-width: 700px;
  width: 90%;
  margin 20px auto;
  border-radius: 20px;
  padding: 20px 50px 50px;
  box-sizing: border-box;
  box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
`;
const PostTitle = styled.div`
  color: #333;
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  word-wrap: break-word;
  word-break: normal;
`;
const PostDate = styled.div`
  font-size: 14px;
  color: #999;
`;
const PostContent = styled.pre`
  margin-top: 10px;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap !important;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
`;
const BackBtn = styled.button`
  display: block;
  width: 120px;
  background-color: #90aacb;
  color: #eee;
  font-weight: 900;
  border: none;
  border-raduis: 3px;
  padding: 12px;
  cursor: pointer;
  font-size: 16px;
`;
export default function PostPage() {
  const history = useHistory();
  let { id } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    getPost(id).then((post) => setPost(post));
  }, [id]);

  return (
    <Root>
      <PostTitle>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
      <hr />
      <PostContent>{post.body}</PostContent>
      <BackBtn
        onClick={() => {
          history.goBack();
        }}
      >
        上一頁
      </BackBtn>
    </Root>
  );
}
