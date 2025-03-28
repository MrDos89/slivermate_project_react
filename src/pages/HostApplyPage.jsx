import React, { useState } from "react";
import styled from "styled-components";

const CATEGORY_MAP = {
  실내: [
    "전체",
    "뜨개질",
    "그림",
    "독서",
    "영화감상",
    "퍼즐",
    "요리",
    "통기타",
    "당구",
    "바둑",
  ],
  실외: [
    "전체",
    "등산",
    "자전거",
    "캠핑",
    "낚시",
    "러닝",
    "수영",
    "골프",
    "테니스",
    "족구",
  ],
};

// ✅ 더미 유저 데이터
const dummyUser = {
  name: "김호스트",
  isNew: false,
  playlists: ["나만의 명상강의", "퇴근 후 힐링요가"],
};

const Container = styled.div`
  width: 1100px;
  background-color: #f0fdf4;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 40px 30px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  margin-bottom: 70px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #2e7d32;
  text-align: center;
  margin-bottom: 2.5rem;
`;

const VideoUploadBox = styled.label`
  border: 2px dashed #c8e6c9;
  background-color: #fbfefb;
  padding: 30px;
  text-align: center;
  color: #666;
  font-size: 1rem;
  border-radius: 12px;
  margin-bottom: 1.8rem;
  cursor: pointer;
  height: 200px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f3fdf4;
  }

  input {
    display: none;
  }

  video {
    margin-top: 12px;
    max-width: 100%;
    max-height: 140px;
    border-radius: 8px;
  }
`;

const ThumbnailUploadBox = styled.label`
  border: 2px dashed #c8e6c9;
  background-color: #fbfefb;
  padding: 20px;
  text-align: center;
  color: #666;
  font-size: 1rem;
  border-radius: 12px;
  margin-bottom: 1.8rem;
  cursor: pointer;
  height: 100px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f3fdf4;
  }

  input {
    display: none;
  }

  img {
    margin-top: 8px;
    max-height: 80px;
    border-radius: 8px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  font-size: 1rem;
  margin-bottom: 1.2rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;

  &:focus {
    border-color: #2e7d32;
    outline: none;
  }
`;

const BasicSelect = styled.select`
  width: 100%;
  padding: 14px 16px;
  font-size: 1rem;
  margin-bottom: 1.2rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;

  &:focus {
    border-color: #2e7d32;
    outline: none;
  }
`;

const PlaylistSelect = styled.select`
  flex-grow: 1;
  padding: 14px 16px;
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;

  &:focus {
    border-color: #2e7d32;
    outline: none;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 1.8rem;
`;

const RadioLabel = styled.label`
  padding: 10px 16px;
  background-color: ${(props) => (props.selected ? "#2e7d32" : "#f0f0f0")};
  color: ${(props) => (props.selected ? "#fff" : "#333")};
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  user-select: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.selected ? "#256528" : "#e0e0e0")};
  }

  input {
    display: none;
  }
`;

const PlaylistWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 1.5rem;
`;

const PlaylistInput = styled.input`
  flex-grow: 1;
  padding: 12px 16px;
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;

  &:focus {
    border-color: #2e7d32;
    outline: none;
  }
`;

const AddPlaylistButton = styled.button`
  padding: 12px 18px;
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  cursor: pointer;
  height: 48px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #256528;
  }
`;

const HostApplyPage = () => {
  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [lectureName, setLectureName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const [playlistList, setPlaylistList] = useState(
    dummyUser.isNew ? [] : dummyUser.playlists
  );
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [isAddingPlaylist, setIsAddingPlaylist] = useState(dummyUser.isNew);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setVideoPreview(URL.createObjectURL(file));
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleAddPlaylist = () => {
    if (newPlaylistName.trim()) {
      setPlaylistList([...playlistList, newPlaylistName.trim()]);
      setSelectedPlaylist(newPlaylistName.trim());
      setNewPlaylistName("");
      setIsAddingPlaylist(false);
    }
  };

  return (
    <Container>
      <Inner>
        <Title>호스트 신청 페이지</Title>

        <VideoUploadBox>
          영상 업로드 (눌러서 선택)
          <input type="file" accept="video/*" onChange={handleVideoUpload} />
          {videoPreview && <video src={videoPreview} controls />}
        </VideoUploadBox>

        <Input
          placeholder="강의 이름"
          value={lectureName}
          onChange={(e) => setLectureName(e.target.value)}
        />
        <Input
          placeholder="강사 이름"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
        />

        <BasicSelect
          value={mainCategory}
          onChange={(e) => {
            setMainCategory(e.target.value);
            setSubCategory("");
          }}
        >
          <option value="">카테고리 선택</option>
          <option value="실내">실내</option>
          <option value="실외">실외</option>
        </BasicSelect>

        {mainCategory && (
          <RadioGroup>
            {CATEGORY_MAP[mainCategory].map((cat) => (
              <RadioLabel key={cat} selected={subCategory === cat}>
                <input
                  type="radio"
                  value={cat}
                  checked={subCategory === cat}
                  onChange={() => setSubCategory(cat)}
                />
                {cat}
              </RadioLabel>
            ))}
          </RadioGroup>
        )}

        {playlistList.length > 0 && !isAddingPlaylist && (
          <PlaylistWrapper>
            <PlaylistSelect
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
            >
              <option value="">재생목록 선택</option>
              {playlistList.map((pl, idx) => (
                <option key={idx} value={pl}>
                  {pl}
                </option>
              ))}
            </PlaylistSelect>
            <AddPlaylistButton onClick={() => setIsAddingPlaylist(true)}>
              새로 추가하기
            </AddPlaylistButton>
          </PlaylistWrapper>
        )}

        {(playlistList.length === 0 || isAddingPlaylist) && (
          <PlaylistWrapper>
            <PlaylistInput
              placeholder="새 재생목록 제목"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
            />
            <AddPlaylistButton onClick={handleAddPlaylist}>
              추가
            </AddPlaylistButton>
          </PlaylistWrapper>
        )}

        <ThumbnailUploadBox>
          썸네일 이미지 업로드
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailUpload}
          />
          {thumbnailPreview && (
            <img src={thumbnailPreview} alt="썸네일 미리보기" />
          )}
        </ThumbnailUploadBox>

        <AddPlaylistButton
          style={{ width: "100%", marginTop: "1.5rem" }}
          onClick={() => {
            alert("기능 준비중입니다 😅");
            console.log({
              videoPreview,
              thumbnailPreview,
              lectureName,
              teacherName,
              mainCategory,
              subCategory,
              selectedPlaylist,
            });
          }}
        >
          업로드 하기
        </AddPlaylistButton>
      </Inner>

      
    </Container>
  );
};

export default HostApplyPage;
