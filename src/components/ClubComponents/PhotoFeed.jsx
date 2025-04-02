import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 스타일 정의
const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin: 0 auto;
  max-width: 1200px;
  justify-items: center; // 이미지 중앙 정렬
  padding: 0 auto;
`;

const ImageItem = styled.img`
  width: 100%;
  max-width: 280px;
  height: 280px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.03);
  }
`;

const NoImageText = styled.div`
  margin-top: 60px;
  text-align: center;
  font-size: 1.4rem;
  color: #999;
`;

// 컴포넌트
const PhotoFeed = ({ posts = [], clubId }) => {
  const navigate = useNavigate();

  const imageItems = posts
    .filter((post) => post.images && post.images.length > 0)
    .flatMap((post) =>
      post.images.map((img, idx) => ({
        postId: post.id,
        src: img.url,
        key: `${post.id}-${idx}`,
      }))
    );

  if (imageItems.length === 0) {
    return <NoImageText>업로드된 이미지가 없습니다.</NoImageText>;
  }

  return (
    <GridWrapper>
      {imageItems.map((img) => (
        <ImageItem
          key={img.key}
          src={img.src}
          onClick={() => navigate(`/club/${clubId}/post/${img.postId}`)}
          alt="feed"
        />
      ))}
    </GridWrapper>
  );
};

export default PhotoFeed;
