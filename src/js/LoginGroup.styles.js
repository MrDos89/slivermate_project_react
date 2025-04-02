import styled from "styled-components";

export const LoginGroupContainer = styled.div`
  text-align: center;
  padding: 20px;
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
`;

export const UserButton = styled.button`
  background-color: #ff6600;
  color: white;
  border: none;
  padding: 20px;
  font-size: 16px;
  border-radius: 15px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 180px;

  &:hover {
    background-color: #e65c00;
    transform: scale(1.1);
  }
`;

export const UserThumbnail = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;