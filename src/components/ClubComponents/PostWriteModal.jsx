// 📄 src/components/ClubComponents/PostWriteModal.jsx
import React, { useState } from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalContainer = styled.div`
  background: white;
  width: 700px;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const ClubTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Layout = styled.div`
  display: flex;
  gap: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  resize: none;
  padding: 10px;
  font-size: 16px;
`;

const ImagePreviewWrapper = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const ImageList = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ImageThumbnail = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 4px;
`;

const AddImageButton = styled.label`
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 2px dashed #aaa;
  text-align: center;
  line-height: 46px;
  font-size: 24px;
  color: #aaa;
  border-radius: 4px;
  cursor: pointer;
`;

const ButtonRow = styled.div`
  margin-top: 20px;
  text-align: right;
`;

const ModalButton = styled.button`
  padding: 10px 16px;
  font-size: 15px;
  margin-left: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const CancelButton = styled(ModalButton)`
  background: #ccc;
  color: white;
`;

const UploadButton = styled(ModalButton)`
  background: #008552;
  color: white;
`;

const HiddenInput = styled.input`
  display: none;
`;

const PostWriteModal = ({ clubName, closeModal, onUploadPost }) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 4 - images.length); // 최대 4장
    const imageUrls = newImages.map((file) => URL.createObjectURL(file));
    setImages([...images, ...imageUrls]);
    if (selectedIndex === null && imageUrls.length > 0) {
      setSelectedIndex(0);
    }
  };

  const handleUpload = () => {
    const newPost = {
      id: Date.now(), // 간단한 ID 생성
      user: "current_user", // TODO: 로그인 사용자명으로 교체 가능
      userThumbnail: "/images/default_user.jpg",
      content,
      images: images.map((url) => ({ url })),
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    };

    onUploadPost(newPost); // ✅ 부모로 전달
    closeModal(); // 모달 닫기
  };

  return (
    <ModalBackground onClick={closeModal}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ClubTitle>{clubName}</ClubTitle>
        <Layout>
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="게시글을 입력하세요..."
          />
          <ImagePreviewWrapper>
            {selectedIndex !== null && (
              <ImagePreview src={images[selectedIndex]} alt="미리보기" />
            )}
            {selectedIndex === null && <span>(사진 미리보기)</span>}
          </ImagePreviewWrapper>
        </Layout>

        <ImageList>
          {images.map((img, index) => (
            <ImageThumbnail
              key={index}
              src={img}
              alt={`thumbnail-${index}`}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
          {images.length < 4 && (
            <AddImageButton htmlFor="file-upload">+</AddImageButton>
          )}
          <HiddenInput
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </ImageList>

        <ButtonRow>
          <CancelButton onClick={closeModal}>취소</CancelButton>
          <UploadButton onClick={handleUpload}>업로드</UploadButton>
        </ButtonRow>
      </ModalContainer>
    </ModalBackground>
  );
};

export default PostWriteModal;
