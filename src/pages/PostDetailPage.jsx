import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { dummyPosts } from "../data/posts";
import styled from "styled-components";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useAuth } from "../components/Context/AuthContext";
import PostVo from "../vo/PostVo";

// 전체 페이지 배경
const PageContainer = styled.div`
  background-color: #f5f7fa;
  min-height: 100vh;
  padding: 60px 20px;
`;

// 게시글 Wrapper
const Wrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #ccc;
  padding: 40px 48px;
`;

// 작성자 + 날짜 + 조회수
const InfoBox = styled.div`
  border-bottom: 1px solid #ccc;
  padding-bottom: 16px;
  margin-bottom: 32px;
  font-size: 1rem;
  color: #444;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const ProfileImg = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #bbb;
`;

const UserName = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #222;
`;

const InfoMeta = styled.div`
  display: flex;
  gap: 24px;
  color: #666;
`;

const PostDate = styled.div`
  font-size: 1.05rem;
`;

const ViewCount = styled.div`
  font-size: 0.95rem;
  color: #888;
`;

// 본문 영역
const Content = styled.div`
  font-size: 1.45rem;
  color: #333;
  line-height: 2;
  white-space: pre-line;
  padding: 36px 0 20px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  min-height: 200px;
`;

// 이미지 영역
const ImageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 32px 0;
  align-items: center;
`;

const PostImage = styled.img`
  max-width: 720px;
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: #f9f9f9;
`;

// 좋아요 / 댓글 수
const Meta = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 30px;
  font-size: 1.1rem;
  color: #555;
  border-top: 1px solid #ddd;
  padding-top: 16px;
  margin-top: 40px;
`;

// 댓글 작성 영역
const CommentBox = styled.div`
  margin-top: 60px;
  border-top: 1px solid #ddd;
  padding-top: 32px;
`;

const CommentLabel = styled.label`
  display: block;
  font-size: 1.3rem;
  margin-bottom: 12px;
  font-weight: bold;
  color: #333;
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 14px;
  font-size: 1.3rem;
  resize: vertical;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fcfcfc;
`;

const CommentSubmit = styled.button`
  margin-top: 14px;
  float: right;
  padding: 10px 24px;
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #005fa3;
  }
`;

// 댓글 리스트
const CommentsList = styled.div`
  margin-top: 40px;
  border-top: 1px solid #ddd;
  padding-top: 24px;
`;

const Comment = styled.div`
  border-top: 1px solid #e2e2e2;
  padding: 20px 0;

  &:first-of-type {
    border-top: none;
  }
`;

const CommentUser = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: #222;
`;

const PostDetailPage = () => {
  const { postId } = useParams();
  const { user, loading } = useAuth();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();
  // 포스트 처리
  useEffect(() => {
    if (postId) {
      loadPost(postId);
    }
  }, [postId]); // id가 바뀔 때마다 다시 호출

  const API_POST_URL = `http://${import.meta.env.VITE_API_ADDRESS}:${
    import.meta.env.VITE_API_PORT
  }/api/post`;

  const loadPost = async (id) => {
    try {
      const response = await fetch(`${API_POST_URL}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      console.log("✅ 받아온 단일 게시글:", data);

      const post = PostVo.fromJson(data);
      setPost(post);

      if (!response.ok) {
        throw new Error("포스트 가져오기 실패");
      }
    } catch (error) {
      console.error("포스트 가져오기 오류", error);
      setError("서버 오류가 발생했습니다.");
    }
  };

  const loadComments = async (postId) => {
    console.log("🟡 loadComments 호출됨: postId =", postId);

    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_API_ADDRESS}:${
          import.meta.env.VITE_API_PORT
        }/api/comment/by-post?post_id=${postId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 세션 쿠키 유지
        }
      );

      if (!response.ok) {
        console.warn("🔴 비정상 응답:", response.status);
        return [];
      }

      const data = await response.json();
      console.log("🟢 응답 바디:", data);

      const comments = data.map((item) => ({
        userNickname: item.nickname,
        userThumbnail: item.user_thumbnail,
        commentText: item.comment_text,
        updatedAt: item.register_date,
      }));

      console.log("🟢 파싱 완료. 댓글 수:", comments.length);
      return comments;
    } catch (error) {
      console.error("❌ fetchComments error:", error);
      return [];
    }
  };

  useEffect(() => {
    if (post) {
      loadComments(post.postId).then((data) => {
        setComments(data);
      });
    }
  }, [post]);

  useEffect(() => {
    loadPost();
  }, []);

  if (!post) {
    return (
      <PageContainer>
        <Wrapper>❌ 해당 게시글을 찾을 수 없습니다.</Wrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Wrapper>
        {/* 상단 정보 */}
        <InfoBox>
          <UserInfo>
            <ProfileImg src={post.userThumbnail} />
            <UserName>{post.userNickname}</UserName>
          </UserInfo>
          <InfoMeta>
            <PostDate>
              {format(new Date(post.registerDate), "yyyy.MM.dd HH:mm", {
                locale: ko,
              })}
            </PostDate>
            {/* <ViewCount>조회수 {post.views ?? 123}</ViewCount> */}
          </InfoMeta>
        </InfoBox>

        {/* 본문 */}
        <Content>{post.postNote}</Content>

        {/* 이미지 */}
        {post.postImages.length > 0 && (
          <ImageList>
            {post.postImages.map((img, idx) => (
              <PostImage
                key={idx}
                src={img}
                alt={`post-img-${idx}`}
                onClick={() => window.open(img, "_blank")}
              />
            ))}
          </ImageList>
        )}

        {/* 좋아요 및 댓글 수 */}
        <Meta>
          <span>❤️ 좋아요 {post.postLikeCount}</span>
          <span>💬 댓글 {post.postCommentCount}</span>
        </Meta>

        {/* 댓글 작성 */}
        <CommentBox>
          <CommentLabel htmlFor="comment">댓글 작성</CommentLabel>
          <CommentInput id="comment" placeholder="댓글을 작성하세요." />
          <CommentSubmit>등록</CommentSubmit>
        </CommentBox>

        {/* 댓글 리스트 */}
        <CommentsList>
          <h4
            style={{ fontSize: "1.25rem", marginBottom: "16px", color: "#333" }}
          >
            댓글 {comments.length}개
          </h4>
          {comments.map((comment, idx) => (
            <Comment key={idx}>
              <CommentUser>{comment.userNickname}</CommentUser>
              <div
                style={{
                  marginBottom: "6px",
                  color: "#777",
                  fontSize: "0.95rem",
                }}
              >
                {format(new Date(comment.updatedAt), "yyyy.MM.dd HH:mm", {
                  locale: ko,
                })}
              </div>
              {comment.commentText}
            </Comment>
          ))}
        </CommentsList>
      </Wrapper>
    </PageContainer>
  );
};

export default PostDetailPage;
