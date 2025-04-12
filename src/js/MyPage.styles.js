import styled from "styled-components";

export const MyPageContainer = styled.div`
  /* padding-top: px; */
  padding: 70px 40px 40px 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
  /* max-width: 1200px; */
  margin: 0 auto;
  width: 1300px;
  position: relative;
  z-index: 3;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
`;

export const Nickname = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 6px 14px;
  background-color: #67dbff;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #4fc3f7;
  }
`;

export const StatusSection = styled.div`
  margin: 30px auto 0;
  display: flex;
  gap: 80px;
  width: 1300px;
  height: 100px;
  justify-content: space-between;
  margin-bottom: 100px;
`;

export const StatusItem = styled.div`
  flex: 1;
  background: #ffffff;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

// const LectureSection = styled.div`
//   margin-top: 40px;
// `;

export const PostListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PostItem = styled.div`
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const PostDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-top: 5px;
`;

// 스크롤 버튼
export const MenuGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  /* margin-top: 200px; /* 첫 버튼과의 간격을 크게 */ */
`;

export const SideMenu = styled.div`
  /* position: absolute; //  fixed → absolute */
  position: fixed;
  /* top: 0;
  left: -110px; //  MyPageContainer 밖 왼쪽으로 살짝 나가게 */
  top: 120px;
  left: 210px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  /* margin-top: 70px; */
  z-index: 1;
`;

export const MenuButton = styled.button`
  width: 120px;
  height: 80px;
  padding: 10px;
  background-color: #f9f9f9;
  /* border: 2px solid #67dbff; */
  border-radius: 10px;
  font-weight: bold;
  color: #333;

  cursor: pointer;
  &:hover {
    background-color: #c9c9c9;
    border: 2px solid #c9c9c9;
  }
`;

export const ScrollAnchor = styled.div`
  scroll-margin-top: 120px;
`;