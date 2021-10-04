import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { getPosts } from "../../WebAPI";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Root = styled.div`
  flex: 1;
`;
const rotate = keyframes`
  0% {
    transform: translate(-50%, 0) rotateZ(0deg)
  }
  50% {
    transform: translate(-50%, -2%) rotateZ(180deg)
  }
  100% {
    transform: translate(-50%, 0%) rotateZ(360deg)
  }
`;

const Banner = styled.div`
  z-index: -1;
  min-height: 45vh;
  position: relative;
  overflow: hidden;
  background-color: #90aacb;
  & span {
    color: #fff;
    font-size: 30px;
    font-weight: 900;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &:before,
  &:after {
    z-index: -1;
    content: "";
    position: absolute;
    border: solid 3px #fef1e6;
    min-width: 200vw;
    min-height: 200vw;
    left: 50%;
    animation: ${rotate} 10s infinite linear;
  }
  &:before {
    bottom: 15vh;
    border-radius: 45%;
    background-color: #ffb085;
  }
  &:after {
    bottom: 12vh;
    opacity: 0.5;
    border-radius: 47%;
  }
`;

const PostContainer = styled.div`
  border-bottom: solid 1px;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  padding: 15px 10px;
`;
const PostTitle = styled(Link)`
  color: #333;
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const PostDate = styled.div`
  font-size: 14px;
  color: #999;
`;
const PostContent = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 10px;
`;

const Post = ({ post }) => {
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
      <PostContent>{post.body}</PostContent>
    </PostContainer>
  );
};
Post.propTypes = {
  post: PropTypes.object,
};
export default function HomePage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts().then((posts) => setPosts(posts));
  }, []);
  return (
    <Root>
      <Banner>
        <span>隨便寫寫之地</span>
      </Banner>
      {posts.map((post) => (
        <Post key={post.id} post={post}></Post>
      ))}
    </Root>
  );
}
