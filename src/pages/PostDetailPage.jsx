import { useParams } from "react-router-dom";
import { dummyPosts } from "../data/posts";
import styled from "styled-components";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

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
  const { id } = useParams();
  const post = dummyPosts.find((p) => p.id === parseInt(id));

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
            <UserName>{post.user}</UserName>
          </UserInfo>
          <InfoMeta>
            <PostDate>
              {format(new Date(post.createdAt), "yyyy.MM.dd HH:mm", {
                locale: ko,
              })}
            </PostDate>
            <ViewCount>조회수 {post.views ?? 123}</ViewCount>
          </InfoMeta>
        </InfoBox>

        {/* 본문 */}
        <Content>{post.content}</Content>

        {/* 이미지 */}
        {post.images.length > 0 && (
          <ImageList>
            {post.images.map((img, idx) => (
              <PostImage
                key={idx}
                src={img.url}
                alt={`post-img-${idx}`}
                onClick={() => window.open(img.url, "_blank")}
              />
            ))}
          </ImageList>
        )}

        {/* 좋아요 및 댓글 수 */}
        <Meta>
          <span>❤️ 좋아요 {post.likes}</span>
          <span>💬 댓글 {post.comments}</span>
        </Meta>

        {/* 댓글 작성 */}
        <CommentBox>
          <CommentLabel htmlFor="comment">댓글 작성</CommentLabel>
          <CommentInput id="comment" placeholder="댓글을 작성하세요." />
          <CommentSubmit>등록</CommentSubmit>
        </CommentBox>

        {/* 댓글 리스트 */}
        <CommentsList>
          <h4 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#333' }}>
            댓글 2개
          </h4>
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
    </PageContainer>
  );
};

export default PostDetailPage;
