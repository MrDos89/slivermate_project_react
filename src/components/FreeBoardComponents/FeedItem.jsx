import React, { useState } from "react";
import styled from "styled-components";
import { formatDistanceToNow, format } from "date-fns";
import { ko } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 30px;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProfileImg = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
`;

const NameDate = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
`;

const Time = styled.div`
  font-size: 1.1rem;
  color: #999;
`;

const MainImage = styled.img`
  width: 100%;
  margin-top: 18px;
  border-radius: 12px;
  max-height: 340px;
  object-fit: cover;
`;

const Content = styled.div`
  margin-top: 14px;
  font-size: 1.4rem;
  line-height: 1.6;
`;

const ReadMore = styled.span`
  color: #888;
  cursor: pointer;
  font-size: 1.3rem;
`;

const ActionRow = styled.div`
  display: flex;
  margin-top: 16px;
  justify-content: flex-start;
  gap: 30px;
  color: #666;
  font-size: 1.3rem;
`;

const Action = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const ImageCarousel = styled.div`
  position: relative;
  width: 100%;
  margin-top: 18px;
`;

const ImageDisplay = styled.img`
  width: 100%;
  border-radius: 12px;
  max-height: 340px;
  object-fit: cover;
`;

const SlideButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  font-size: 2rem;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 50%;
  z-index: 1;

  &:first-of-type {
    left: 10px;
  }

  &:last-of-type {
    right: 10px;
  }
`;

const FeedItem = ({ post }) => {
  const [showFull, setShowFull] = useState(false);
  const MAX_LENGTH = 80;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.postId}`);
  };

  const renderTime = () => {
    const createdAt = new Date(post.createdAt || Date.now());
    const diff = Date.now() - createdAt.getTime();
    const oneDay = 24 * 60 * 60 * 1000;

    if (diff < oneDay) {
      return formatDistanceToNow(createdAt, { addSuffix: true, locale: ko });
    } else {
      return format(createdAt, "yyyy.MM.dd", { locale: ko });
    }
  };

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1 < post.images.length ? prev + 1 : 0));
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev - 1 >= 0 ? prev - 1 : post.images.length - 1
    );
  };

  return (
    <Card onClick={handleClick}>
      <TopRow>
        <Profile>
          <ProfileImg
            src={post.userThumbnail || "/images/defaultUserThumbnail.png"}
            alt="user"
          />
          <NameDate>
            <Name>{post.user}</Name>
            <Time>{renderTime()}</Time>
          </NameDate>
        </Profile>
        <div>⋯</div>
      </TopRow>

      {post.images?.length > 0 && (
        <ImageCarousel>
          <SlideButton onClick={prevImage}>&lt;</SlideButton>
          <ImageDisplay
            src={post.images[currentImage].url}
            alt={`post-image-${currentImage}`}
          />
          <SlideButton onClick={nextImage}>&gt;</SlideButton>
        </ImageCarousel>
      )}

      <Content>
        {post.postNote ? (
          showFull || post.postNote.length <= MAX_LENGTH ? (
            post.postNote
          ) : (
            <>
              {post.postNote.slice(0, MAX_LENGTH)}...
              <ReadMore onClick={() => setShowFull(true)}>더보기</ReadMore>
            </>
          )
        ) : (
          "내용이 없습니다."
        )}
      </Content>

      <ActionRow>
        <Action>❤️ {post.likes || 0}</Action>
        <Action>💬 {post.comments || 0}</Action>
      </ActionRow>
    </Card>
  );
};

export default FeedItem;
