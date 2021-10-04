import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getPostsList } from "../../WebAPI";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
const Root = styled.div`
  flex: 1;
`;

const PostContainer = styled.div`
  border-bottom: solid 1px;
  width: 100%;
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
const PaginationWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
  justify-content: center;
`;
const PaginationNum = styled(Link)`
  color: #333;
  text-decoration: none;
  border: solid 1px;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  text-align: center;
  padding: 5px 8px 8px;
  margin: 5px;
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
  let { page } = useParams();
  const [totalPage, setTotalPage] = useState(0);
  const [totalArray, setTotalArray] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostsList(page)
      .then((res) => {
        setTotalPage(res.headers.get("x-total-count") / 5);
        return res.json();
      })
      .then((posts) => setPosts(posts));

    setTotalArray(Array.from({ length: totalPage }, (_, index) => index + 1));
  }, [page, totalPage]);
  return (
    <Root>
      {posts.map((post) => (
        <Post key={post.id} post={post}></Post>
      ))}
      <PaginationWrapper>
        {totalArray.map((pagination) => (
          <PaginationNum key={pagination} to={`/list/${pagination}`}>
            {pagination}
          </PaginationNum>
        ))}
      </PaginationWrapper>
    </Root>
  );
}
