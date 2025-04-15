import styled from "styled-components";

export const LoginGroupContainer = styled.div`
  position: fixed; // ✅ 또는 absolute도 가능
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e6f5e6;
  display: flex;
  flex-direction: column;
  justify-content: center; // 세로 가운데
  align-items: center;     // 가로 가운데
  padding: 2rem;
  box-sizing: border-box;
  z-index: 0;
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
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: center;
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