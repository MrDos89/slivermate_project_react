// src/pages/PostDetailPage.jsx

import { useParams } from "react-router-dom";
import { dummyPosts } from "../data/posts";
import styled from "styled-components";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const Wrapper = styled.div`
  max-width: 900px;
  margin: 120px auto 100px;
  padding: 0 20px;
  font-size: 1.3rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
`;

const ProfileImg = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 1.4rem;
`;

const PostDate = styled.div`
  color: #888;
  font-size: 1.1rem;
`;

const Content = styled.p`
  font-size: 1.5rem;
  margin: 20px 0;
  white-space: pre-line;
  line-height: 1.7;
`;

const ImageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 30px 0;
`;

const PostImage = styled.img`
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;

const Meta = styled.div`
  margin: 30px 0;
  color: #666;
  font-size: 1.2rem;
  display: flex;
  gap: 20px;
`;

const CommentBox = styled.div`
  margin-top: 40px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 12px;
  font-size: 1.2rem;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const CommentSubmit = styled.button`
  margin-top: 12px;
  float: right;
  padding: 8px 16px;
  background-color: #67dbff;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
`;

const CommentsList = styled.div`
  margin-top: 40px;
`;

const Comment = styled.div`
  border-top: 1px solid #eee;
  padding: 16px 0;

  &:first-of-type {
    border-top: none;
  }
`;

const CommentUser = styled.div`
  font-weight: bold;
  margin-bottom: 6px;
`;

const PostDetailPage = () => {
  const { id } = useParams();
  const post = dummyPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return <Wrapper>❌ 해당 게시글을 찾을 수 없습니다.</Wrapper>;
  }

  return (
    <Wrapper>
      <UserInfo>
        <ProfileImg src={post.userThumbnail} />
        <div>
          <UserName>{post.user}</UserName>
          <PostDate>{format(new Date(post.createdAt), "yyyy.MM.dd HH:mm", { locale: ko })}</PostDate>
        </div>
      </UserInfo>

      <Content>{post.content}</Content>

      <ImageList>
        {post.images.map((img, index) => (
          <PostImage
            key={index}
            src={img.url}
            alt={`image-${index}`}
            onClick={() => window.open(img.url, "_blank")}
          />
        ))}
      </ImageList>

      <Meta>
        <span>❤️ 좋아요 {post.likes}</span>
        <span>💬 댓글 {post.comments}</span>
        <span>📅 업로드일 {format(new Date(post.createdAt), "yyyy.MM.dd")}</span>
      </Meta>

      <CommentBox>
        <h3>댓글쓰기</h3>
        <CommentInput placeholder="댓글을 작성하세요." />
        <CommentSubmit>등록</CommentSubmit>
      </CommentBox>

      <CommentsList>
        <Comment>
          <CommentUser>기본유저1</CommentUser>
          멋진 사진이네요!
        </Comment>
        <Comment>
          <CommentUser>기본유저2</CommentUser>
          정말 감성적이에요 😍
        </Comment>
      </CommentsList>
    </Wrapper>
  );
};

export default PostDetailPage;
