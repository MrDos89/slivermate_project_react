import React, { useEffect, useState } from "react";
import styled from "styled-components";
import defaultThumbnail from "../../images/thumb3.png"; // 기본 썸네일

const FamilyContainer = styled.div`
  padding: 2rem;
  background: #edffed;
  border-radius: 1rem;
  margin: 150px 0;
`;

const FamilyTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: left;
`;

//const FamilyList = styled.div`
// display: flex;
// flex-wrap: wrap;
// gap: 1rem;
//`;
const FamilyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

//const FamilyCard = styled.div`
//background: white;
//border-radius: 1rem;
//padding: 1rem;
//width: 150px;
//box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
// text-align: center;
//`;

const FamilyCard = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

//const FamilyImage = styled.img`
// width: 80px;
//height: 80px;
//object-fit: cover;
//border-radius: 50%;
//margin-bottom: 0.5rem;
//`;

const FamilyImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 1rem;
`;

const FamilyName = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
`;

const FamilyId = styled.div`
  font-size: 0.8rem;
  color: gray;
`;

// 세로 리스트로 하기 위해서 추가함 (카드로 만들거면 삭제 )
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FamilySection = ({ groupId, groupUsers }) => {
  const [familyData, setFamilyData] = useState([]);

  useEffect(() => {
    // // ✅ 더미 데이터 삽입
    // const dummyFamily = [
    //   {
    //     uid: 101,
    //     user_name: "김아빠",
    //     thumbnail: null,
    //     user_group_id: groupId || 9999,
    //   },
    //   {
    //     uid: 102,
    //     user_name: "이엄마",
    //     thumbnail: null,
    //     user_group_id: groupId || 9999,
    //   },
    //   {
    //     uid: 103,
    //     user_name: "박동생",
    //     thumbnail: null,
    //     user_group_id: groupId || 9999,
    //   },
    // ];
    console.log("넘겨받은 groupUsers 확인 👉", groupUsers);
    setFamilyData(groupUsers);

    // ⚠️ 실제 fetch 사용 시 아래 코드 주석 해제
    /*
    const API_USER_GROUP_URL = `http://${import.meta.env.VITE_API_ADDRESS}:${import.meta.env.VITE_API_PORT}/api/usergroup/${groupId}`;
    fetch(API_USER_GROUP_URL)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFamilyData(data);
        } else {
          console.error("가족 정보 포맷 오류", data);
        }
      })
      .catch((err) => {
        console.error("가족 정보 불러오기 실패", err);
      });
    */
  }, [groupId, groupUsers]);

  return (
    <FamilyContainer>
      <FamilyTitle>가족구성원</FamilyTitle>
      <FamilyList>
        {familyData.map((user) => (
          // <FamilyCard key={user.uid}>
          //   <FamilyImage
          //     src={user.thumbnail || defaultThumbnail}
          //     alt={`${user.user_name} 프로필`}
          //   />
          //   <FamilyName>{user.user_name}</FamilyName>
          //   <FamilyId>ID: {user.user_group_id}</FamilyId>
          // </FamilyCard>
          <FamilyCard key={user.uid}>
            <FamilyImage
              src={user.thumbnail || defaultThumbnail}
              alt={`${user.nickname} 프로필`}
            />
            <InfoWrapper>
              <FamilyName>{user.userName}</FamilyName>
              <FamilyId>ID: {user.userId}</FamilyId>
              <FamilyId>
                가족관계: {user.userType === 1 ? "부모님" : "자녀"}
              </FamilyId>
            </InfoWrapper>
          </FamilyCard>
        ))}
      </FamilyList>
    </FamilyContainer>
  );
};

export default FamilySection;
