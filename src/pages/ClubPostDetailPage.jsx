import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { dummyClubs } from "../data/clubData";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const Container = styled.div`
  max-width: 960px;
  margin: 80px auto;
  padding: 48px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  font-size: 1.6rem;
  line-height: 1.9;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 24px;
  color: #222;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
`;

const ProfileImg = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid #ccc;
`;

const Username = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`;

const CreatedAt = styled.div`
  font-size: 1.4rem;
  color: #777;
  margin-top: 4px;
`;

const Content = styled.div`
  font-size: 1.7rem;
  color: #333;
  line-height: 2;
  white-space: pre-line;
  margin-top: 36px;
  margin-bottom: 32px;
`;

const Image = styled.img`
  max-width: 800px;
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-top: 20px;
  object-fit: cover;
  border: 1px solid #ddd;
`;

// 댓글
const CommentSection = styled.div`
  margin-top: 60px;
`;

const CommentTitle = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 24px;
  color: #333;
`;

const CommentBox = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  background: #fafafa;
`;

const CommentUser = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 8px;
  color: #222;
`;

const CommentText = styled.div`
  font-size: 1.5rem;
  color: #444;
`;

const CommentInputWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 30px;
`;

const CommentInput = styled.textarea`
  flex: 1;
  padding: 16px;
  font-size: 1.5rem;
  border-radius: 10px;
  border: 1px solid #bbb;
  resize: vertical;
  min-height: 120px;
`;

const CommentButton = styled.button`
  background: #2e7d32;
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 10px;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #256628;
  }
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
          <CreatedAt>
            {format(new Date(post.createdAt), "yyyy.MM.dd HH:mm", {
              locale: ko,
            })}
          </CreatedAt>
        </div>
      </Info>

      {post.images?.length > 0 && <Image src={post.images[0].url} alt="post" />}

      <Content>{post.postNote}</Content>

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
