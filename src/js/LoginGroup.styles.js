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
  background-color: #ff6600; /* sweet potato 컬러 */
  color: white;
  border: none;
  padding: 15px 25px;
  font-size: 18px;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s;

  &:hover {
    background-color: #e65c00;
    transform: scale(1.1);
  }
`;