import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { dummyPosts } from "../data/posts";
import styled from "styled-components";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useAuth } from "../components/Context/AuthContext";
import PostVo from "../vo/PostVo";
import CommentVo from "../vo/CommentVo";

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
  display: flex;
  align-items: flex-start;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
`;

const CommentProfileImg = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentBox = styled.div`
  margin-top: 60px;
  padding-top: 32px;
  margin-bottom: 40px;
`;

const CommentFormBottomLine = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin-top: 24px;
`;

const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CommentTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentUser = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  color: #222;
`;

const CommentDate = styled.div`
  font-size: 0.95rem;
  color: #888;
`;

const CommentText = styled.div`
  font-size: 1.1rem;
  margin-top: 6px;
  color: #333;
  text-align: left; // ✅ 명시적으로 좌측 정렬
  word-break: break-word; // ✅ 긴 단어 줄바꿈
`;

const PostDetailPage = () => {
  const { postId } = useParams();
  const { user, loading } = useAuth();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(""); // 댓글 입력 상태

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

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const now = new Date();

    const newCommentVo = new CommentVo({
      commentId: 0, // 등록 시 서버에서 부여
      postId: post.postId,
      userId: user.uid,
      clubId: post.clubId || 0,
      commentText: newComment,
      updDate: now,
      userNickname: user.userNickname,
      userThumbnail: user.userThumbnail,
    });

    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_API_ADDRESS}:${
          import.meta.env.VITE_API_PORT
        }/api/comment/newcomment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(newCommentVo.toJson()),
        }
      );

      if (response.ok) {
        setNewComment("");
        const updated = await loadComments(post.postId);
        setComments(updated);
      } else {
        console.error("❌ 댓글 등록 실패:", response.status);
      }
    } catch (error) {
      console.error("❌ 댓글 등록 중 에러:", error);
    }
  };

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

      const comments = data.map((item) => CommentVo.fromJson(item));
      setComments(comments);
      console.log("🟡 댓글 데이터:", comments);

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
          <CommentInput
            id="comment"
            placeholder="댓글을 작성하세요."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <CommentSubmit onClick={handleCommentSubmit}>등록</CommentSubmit>
          <CommentFormBottomLine /> {/* ✅ 여기서 선을 버튼 밑으로! */}
        </CommentBox>

        {/* 댓글 리스트 */}
        <CommentsList>
          {/* <h4
            style={{ fontSize: "1.25rem", marginBottom: "16px", color: "#333" }}
          >
            댓글 {comments.length}개
          </h4> */}
          {comments.map((comment, idx) => (
            <Comment key={idx}>
              <CommentProfileImg src={comment.userThumbnail} />
              <CommentBody>
                <CommentTopRow>
                  <CommentUser>{comment.userNickname}</CommentUser>
                  <CommentDate>
                    {comment.updDate && !isNaN(new Date(comment.updDate))
                      ? format(new Date(comment.updDate), "yyyy.MM.dd HH:mm", {
                          locale: ko,
                        })
                      : "날짜 없음"}
                  </CommentDate>
                </CommentTopRow>
                <CommentText>{comment.commentText}</CommentText>
              </CommentBody>
            </Comment>
          ))}
        </CommentsList>
      </Wrapper>
    </PageContainer>
  );
};

export default PostDetailPage;
