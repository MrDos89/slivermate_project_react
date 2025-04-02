import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 스타일 정의
const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  margin-top: 40px;
`;

const ImageItem = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
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
const PhotoFeed = ({ posts = [] }) => {
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
          onClick={() => navigate(`/post/${img.postId}`)}
          alt="feed"
        />
      ))}
    </GridWrapper>
  );
};

export default PhotoFeed;
