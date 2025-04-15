import React, { useState, useRef, useEffect } from "react";
import PostVo from "../../vo/PostVo";
import styled from "styled-components";

const WriterWrapper = styled.div`
  // position: sticky;
  top: 0;
  background-color: white;
  // border-bottom: 1px solid #ddd;
  z-index: 50;
  width: 800px;
  margin: 0 auto;
`;

const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
`;

const ProfileImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
`;

const InputArea = styled.textarea`
  width: 100%;
  font-size: 1.4rem;
  padding: 14px;
  resize: none;
  border: 2px solid #ccc;
  border-radius: 12px;
  transition: 0.3s;
  height: ${(props) => (props.expanded ? "140px" : "80px")};
  &:focus {
    outline: none;
    border-color: #91c29b;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const Tag = styled.button`
  padding: 6px 12px;
  font-size: 1.2rem;
  border: 1px solid ${(props) => (props.selected ? "#91c29b" : "#ccc")};
  background-color: ${(props) => (props.selected ? "#e5f7ec" : "white")};
  border-radius: 20px;
  cursor: pointer;
  transition: 0.2s;
`;

const ImagePreviewWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  align-items: center;
  overflow-x: auto;
`;

const ImageBox = styled.div`
  position: relative;
  img {
    height: 120px;
    border-radius: 10px;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  cursor: pointer;
`;

const ButtonRow = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UploadBtn = styled.button`
  background-color: #edf8f1;
  border: 1px solid #b4cfb5;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 1.1rem;
  cursor: pointer;
`;

const SubmitBtn = styled.button`
  background-color: #91c29b;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  font-size: 1.2rem;
  cursor: pointer;
`;

const hobbyOptions = [
  { id: 0, name: "일상" },
  { id: 1, name: "뜨개질" },
  { id: 2, name: "그림" },
  { id: 3, name: "독서" },
  { id: 4, name: "영화 감상" },
  { id: 5, name: "퍼즐" },
  { id: 6, name: "요리" },
  { id: 7, name: "통기타" },
  { id: 8, name: "당구" },
  { id: 9, name: "바둑" },
  { id: 10, name: "등산" },
  { id: 11, name: "자전거" },
  { id: 12, name: "캠핑" },
  { id: 13, name: "낚시" },
  { id: 14, name: "러닝/마라톤" },
  { id: 15, name: "수영" },
  { id: 16, name: "골프" },
  { id: 17, name: "테니스" },
  { id: 18, name: "족구" },
];

const MyPostWriter = ({ onSubmit, user }) => {
  const [expanded, setExpanded] = useState(false);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const fileRef = useRef();
  const writerRef = useRef();

  const API_POST_URL = `http://${import.meta.env.VITE_API_ADDRESS}:${
    import.meta.env.VITE_API_PORT
  }/api/post`;

  const toggleTag = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 4) {
      alert("이미지는 최대 4장까지 첨부할 수 있어요.");
      return;
    }
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    if (!user) {
      alert("로그인 정보가 없습니다.");
      return;
    }

    const payload = {
      post_user_id: user.uid,
      post_note: content,
      post_images: images.map((img) => img),
      post_category_id: 1, // 기본 카테고리 지정 (필요 시 수정 가능)
      post_sub_category_id: selectedTags[0] ?? 0,
      region_id: user.regionId ?? 0, // 사용자 지역 ID 사용 (옵션)
      club_id: 0, // 자유게시판이므로 club_id는 기본 0
    };

    try {
      const response = await fetch(API_POST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("게시글 등록 실패");
      }

      const result = await response.json();

      // PostVo 포맷에 맞춰 변환하여 상위 컴포넌트로 전달
      const newPost = PostVo.fromJson(result);
      onSubmit(newPost);

      // 입력 초기화
      setContent("");
      setImages([]);
      setSelectedTags([]);
      setExpanded(false);
    } catch (error) {
      console.error("게시글 등록 중 오류 발생:", error);
      alert("게시글 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (writerRef.current && !writerRef.current.contains(e.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <WriterWrapper ref={writerRef}>
      <ProfileRow>
        <ProfileImage src={`${user.thumbnail}`} alt="user" />
        <UserName>user.nickname</UserName>
      </ProfileRow>

      <InputArea
        placeholder="오늘을 공유해봐요"
        expanded={expanded}
        value={content}
        onFocus={() => setExpanded(true)}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* ✅ 태그 버튼 */}
      {expanded && (
        <TagList>
          {hobbyOptions.map((tag) => (
            <Tag
              key={tag.id}
              selected={selectedTags.includes(tag.id)}
              onClick={() => toggleTag(tag.id)}
            >
              #{tag.name}
            </Tag>
          ))}
        </TagList>
      )}

      {images.length > 0 && (
        <ImagePreviewWrapper>
          {images.map((img, i) => (
            <ImageBox key={i}>
              <img src={img} alt={`preview-${i}`} />
              <RemoveButton onClick={() => removeImage(i)}>×</RemoveButton>
            </ImageBox>
          ))}
        </ImagePreviewWrapper>
      )}

      <ButtonRow>
        <UploadBtn onClick={() => fileRef.current.click()}>
          이미지 추가
        </UploadBtn>
        <SubmitBtn onClick={handleSubmit}>게시하기</SubmitBtn>
        <input
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          ref={fileRef}
          onChange={handleImageUpload}
        />
      </ButtonRow>
    </WriterWrapper>
  );
};

export default MyPostWriter;
