import React, { useState } from "react";
import styled from "styled-components";
import { indoorHobbies, outdoorHobbies, dummyClubs } from "../data/clubData";
import { useNavigate } from "react-router-dom";

// 📦 스타일 컴포넌트
const Container = styled.div`
  padding: 80px 24px;
  max-width: 800px;
  margin: 0 auto;
  font-family: "Pretendard", sans-serif;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 14px;
  font-weight: 600;
  color: #333;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

const RadioLabel = styled.label`
  padding: 10px 16px;
  border: 1.5px solid #ccc;
  border-radius: 20px;
  background-color: ${(props) => (props.selected ? "#e0f4f4" : "#fff")};
  color: ${(props) => (props.selected ? "#1d858d" : "#333")};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    border-color: #1d858d;
  }

  input {
    display: none;
  }
`;

const ImageUploadBox = styled.div`
  border: 2px dashed #aaa;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const PreviewImage = styled.img`
  margin-top: 16px;
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  font-size: 1.1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 14px;
  height: 140px;
  font-size: 1.1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
`;

const Select = styled.select`
  width: 100%;
  padding: 14px;
  font-size: 1.1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Slider = styled.input`
  flex: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 14px 36px;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  background-color: ${(props) => (props.cancel ? "#ccc" : "#1d858d")};
  color: white;

  &:hover {
    background-color: ${(props) => (props.cancel ? "#b0b0b0" : "#166c74")};
  }
`;

// // 마커
// const SliderSection = styled.div`
//   position: relative;
//   padding-bottom: 40px;
// `;

// const MarkerTrack = styled.div`
//   position: absolute;
//   top: -28px; /* ✅ 슬라이더 위로 올림 */
//   left: 0;
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   pointer-events: none;
// `;


// const Marker = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   font-size: 0.75rem;
//   color: #555;
// `;



// const Dot = styled.div`
//   width: 10px;
//   height: 10px;
//   background-color: #1d858d;
//   border-radius: 50%;
//   margin-bottom: 6px;
//   box-shadow: 0 0 2px rgba(0,0,0,0.2);
// `;

const SliderSection = styled.div`
  position: relative;
  padding-top: 36px;
  padding-bottom: 40px;
`;

const MarkerTrack = styled.div`
  position: absolute;
  top: 0; /* 슬라이더 위에 마커 표시 */
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
`;

const Marker = styled.div`
  display: flex;
  justify-content: center;
  font-size: 28px;
  color: #1d858d;
`;



// 🧠 메인 컴포넌트
const CreateClubPage = () => {
  const navigate = useNavigate();
  const allHobbies = [...indoorHobbies, ...outdoorHobbies];

  const [selectedHobbyKey, setSelectedHobbyKey] = useState(null); // 예: "in-1", "out-2"
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [clubName, setClubName] = useState("");
  const [clubDesc, setClubDesc] = useState("");
  const [meetingFreq, setMeetingFreq] = useState("");
  const [maxMembers, setMaxMembers] = useState(10);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleCreate = () => {
    if (!selectedHobbyKey) {
      alert("취미를 선택해주세요!");
      return;
    }

    const [type, idStr] = selectedHobbyKey.split("-");
    const hobbyId = Number(idStr);
    const isIndoor = type === "in";

    const newClub = {
      club_id: dummyClubs.length + 1,
      club_name: clubName,
      club_desc: clubDesc,
      club_sub_category_id: hobbyId,
      club_thumbnail: thumbnailPreview,
      club_member_max: maxMembers,
      region_id: 1,
      club_user_id: 999,
      club_category_id: isIndoor ? 1 : 2,
      club_report_cnt: 0,
      club_register_date: new Date().toISOString().split("T")[0],
      is_deleted: false,
      upd_date: new Date().toISOString().split("T")[0],
      hobbyType: isIndoor ? "실내 활동" : "실외 활동",
    };

    dummyClubs.push(newClub);
    alert("모임이 생성되었습니다!");
    navigate("/club");
  };

  return (
    <Container>
      <Section>
        <Title>취미 선택</Title>
        <RadioGroup>
          {allHobbies.map((hobby) => {
            const type = indoorHobbies.includes(hobby) ? "in" : "out";
            const hobbyKey = `${type}-${hobby.id}`;
            return (
              <RadioLabel key={hobbyKey} selected={selectedHobbyKey === hobbyKey}>
                <input
                  type="radio"
                  name="hobby"
                  value={hobbyKey}
                  checked={selectedHobbyKey === hobbyKey}
                  onChange={(e) => setSelectedHobbyKey(e.target.value)}
                />
                {hobby.name}
              </RadioLabel>
            );
          })}
        </RadioGroup>
      </Section>

      <Section>
        <Title>모임 썸네일</Title>
        <ImageUploadBox onClick={() => document.getElementById("fileInput").click()}>
          + (이미지 추가 + 미리보기)
          <input id="fileInput" type="file" accept="image/*" hidden onChange={handleImageUpload} />
          {thumbnailPreview && <PreviewImage src={thumbnailPreview} />}
        </ImageUploadBox>
      </Section>

      <Section>
        <Title>모임 이름</Title>
        <Input placeholder="모임 이름을 입력해주세요" value={clubName} onChange={(e) => setClubName(e.target.value)} />
      </Section>

      <Section>
        <Title>모임 소개글</Title>
        <Textarea placeholder="모임을 소개해 주세요" value={clubDesc} onChange={(e) => setClubDesc(e.target.value)} />
      </Section>

      <Section>
        <Title>모임 횟수</Title>
        <Select value={meetingFreq} onChange={(e) => setMeetingFreq(e.target.value)}>
          <option value="">선택해주세요</option>
          <option value="매일">매일</option>
          <option value="주 1회">주 1회</option>
          <option value="주 2~3회">주 2~3회</option>
          <option value="주 5회 이상">주 5회 이상</option>
          <option value="월 1회">월 1회</option>
          <option value="월 2~3회">월 2~3회</option>
          <option value="매 월 주말 모임">매 월 주말 모임</option>
          <option value="매 월 토요일">매 월 토요일</option>
          <option value="매 월 일요일">매 월 일요일</option>
        </Select>
      </Section>

      {/* <Section>
        <Title>모임 최대 인원</Title>
        <SliderWrapper>
          <Slider
            type="range"
            min="10"
            max="100"
            step="10"
            value={maxMembers}
            onChange={(e) => setMaxMembers(Number(e.target.value))}
          />
          <div>{maxMembers}명</div>
        </SliderWrapper>
      </Section> */}

      {/* <Section>
  <Title>모임 최대 인원</Title>
  <SliderSection>
    <SliderWrapper>
      <Slider
        type="range"
        min="10"
        max="100"
        step="10"
        value={maxMembers}
        onChange={(e) => setMaxMembers(Number(e.target.value))}
      />
      <div>{maxMembers}명</div>
    </SliderWrapper>

    {/* 마커 표시 */}
    {/* <MarkerTrack>
      {Array.from({ length: 10 }, (_, i) => {
        const value = (i + 1) * 10;
        return (
          <Marker key={value}>
            <Dot />
            <div>{value}명</div>
          </Marker>
        );
      })}
    </MarkerTrack>
  </SliderSection>
</Section> */} 

<Section>
  <Title>모임 최대 인원</Title>
  <SliderSection>
    {/* 마커 숫자 (선택된 것만) */}
    <MarkerTrack>
      {Array.from({ length: 10 }, (_, i) => {
        const value = (i + 1) * 10;
        return (
          <Marker key={value}>
            {maxMembers === value && <div>{value}명</div>}
          </Marker>
        );
      })}
    </MarkerTrack>

    {/* 슬라이더 */}
    <SliderWrapper style={{ position: "relative", zIndex: 1 }}>
      <Slider
        type="range"
        min="10"
        max="100"
        step="10"
        value={maxMembers}
        onChange={(e) => setMaxMembers(Number(e.target.value))}
      />
    </SliderWrapper>
  </SliderSection>
</Section>




      <ButtonGroup>
        <Button cancel onClick={() => navigate(-1)}>취소</Button>
        <Button onClick={handleCreate}>만들기</Button>
      </ButtonGroup>
    </Container>
  );
};

export default CreateClubPage;
