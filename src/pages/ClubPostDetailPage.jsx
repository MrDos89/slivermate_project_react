// 📁 src/pages/ClubPostDetailPage.jsx

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { dummyClubs } from "../data/clubData";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 14px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
`;

const ProfileImg = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
`;

const Username = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
`;

// const Date = styled.div`
const CreatedAt = styled.div`
  font-size: 1.1rem;
  color: #888;
`;

const Content = styled.div`
  font-size: 1.4rem;
  line-height: 1.6;
  margin-top: 20px;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 12px;
  margin-top: 20px;
  max-height: 400px;
  object-fit: cover;
`;

// 댓글
const CommentSection = styled.div`
  margin-top: 40px;
`;

const CommentTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 16px;
`;

const CommentBox = styled.div`
  margin-bottom: 16px;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 16px;
  background: #fafafa;
`;

const CommentUser = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const CommentText = styled.div`
  font-size: 1.2rem;
`;

const CommentInputWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const CommentInput = styled.textarea`
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  resize: none;
  font-size: 1.2rem;
`;

const CommentButton = styled.button`
  background: #2e7d32;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
`;

const ClubPostDetailPage = () => {
  const [comments, setComments] = useState([
    { id: 1, user: "sunny99", text: "좋은 글 감사합니다!" },
    { id: 2, user: "reading_is_life", text: "공감돼요ㅠㅠ" },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newCommentData = {
      id: Date.now(),
      user: "current_user", // 로그인 사용자 이름 대체
      text: newComment.trim(),
    };
    setComments([...comments, newCommentData]);
    setNewComment("");
  };

  const { clubId, postId } = useParams();
  const club = dummyClubs.find((c) => c.club_id === Number(clubId));
  const post = club?.posts?.find((p) => String(p.id) === postId);

  console.log("clubId:", clubId);
  console.log("postId:", postId);
  console.log("club:", club);
  console.log("post:", post);

  if (!club || !post) {
    return (
      <div style={{ textAlign: "center", marginTop: 60 }}>
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <Container>
      <Title>{club.club_name}</Title>
      <Info>
        <ProfileImg
          src={post.userThumbnail || "/images/defaultUserThumbnail.png"}
        />
        <div>
          <Username>{post.user}</Username>
          {/* <Date> */}
          <CreatedAt>
            {format(new Date(post.createdAt), "yyyy.MM.dd HH:mm", {
              locale: ko,
            })}
            {/* </Date> */}
          </CreatedAt>
        </div>
      </Info>

      {post.images?.length > 0 && <Image src={post.images[0].url} alt="post" />}

      <Content>{post.content}</Content>

      {/* ✨ 댓글 영역 */}
      <CommentSection>
        <CommentTitle>댓글 {comments.length}개</CommentTitle>

        {comments.map((c) => (
          <CommentBox key={c.id}>
            <CommentUser>{c.user}</CommentUser>
            <CommentText>{c.text}</CommentText>
          </CommentBox>
        ))}

        <CommentInputWrapper>
          <CommentInput
            rows={3}
            placeholder="댓글을 입력하세요..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <CommentButton onClick={handleAddComment}>등록</CommentButton>
        </CommentInputWrapper>
      </CommentSection>
    </Container>
  );
};

export default ClubPostDetailPage;
