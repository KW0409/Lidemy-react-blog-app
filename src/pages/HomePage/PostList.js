import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const PostContainer = styled.div`
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  background: #fffffb;
  border: 1px solid rgba(180, 180, 180, 0.3);
  border-radius: 6px;

  & + & {
    margin-top: 22px;
  }
`;

const PostTitle = styled.h1`
  width: 100%;
  margin: 0;
  color: rgb(70, 140, 200);
  font-size: 25px;
  font-weight: 450;
  font-family: monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PostInfo = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid rgba(200, 185, 185, 1);
  display: flex;
  color: rgba(200, 185, 185, 1);

  div {
    i {
      margin-right: 5px;
    }
  }

  div + div {
    margin-left: 25px;
  }
`;

const PostDate = styled.div``;

const PostAuthor = styled.div``;

const PostTag = styled.div``;

const Content = styled.div`
  width: 100%;
  padding: 0px 5px;
  padding-top: 25px;
  color: rgba(152, 152, 152, 1);
  font-size: 20px;
  letter-spacing: 1.5px;
  line-height: 1.3em;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;

const ArticleLink = styled(Link)`
  margin-top: 25px;
  text-decoration: none;
  color: #45adff;

  &:hover {
    opacity: 0.8;
  }
`;

// PostList component: 顯示文章列表
export default function PostList({ post }) {
  console.log("render PostList(HomePage.js)");

  return (
    <PostContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostInfo>
        <PostDate>
          <i className="fas fa-calendar-alt"></i>
          {new Date(post.createdAt).toLocaleString()}
        </PostDate>
        <PostAuthor>
          <i className="fas fa-user"></i>
          {post.user.username}
        </PostAuthor>
        <PostTag>
          <i className="fas fa-tags"></i>
          Lidemy Student Test
        </PostTag>
      </PostInfo>
      <Content>{post.body}</Content>
      <ArticleLink to={`/posts/${post.id}`}>... 繼續閱讀 ...</ArticleLink>
    </PostContainer>
  );
}

PostList.propTypes = {
  post: PropTypes.object,
};
