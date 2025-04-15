import styled from "styled-components";

export const LoginGroupContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e6f5e6; // 연녹색
  display: flex;
  flex-direction: column;
  justify-content: center; // ✅ 세로 중앙 정렬!
  align-items: center;
  padding: 2rem;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 10px;
`;

export const UserList = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
`;

export const UserButton = styled.button`
  background-color: #2e7d32; // 💚 진한 녹색
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 1rem;
  width: 120px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: scale(1.05);
  }

  h2 {
    margin-top: 0.5rem;
    font-size: 1rem;
  }
`;

export const UserThumbnail = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
`;