import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  bottom: 100px;
  right: 50px;
  width: 320px;
  max-height: 500px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  z-index: 2000;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ChatBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  padding-right: 4px;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
`;

export const BotMessage = styled.div`
  align-self: flex-start;
  background-color: #f1f1f1;
  color: #333;
  padding: 10px 12px;
  border-radius: 18px 18px 18px 4px;
  max-width: 80%;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
`;

export const ButtonList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const OptionButton = styled.button`
  flex: 1 1 45%;
  padding: 8px 10px;
  background-color: #67dbff;
  color: white;
  font-size: 13px;
  border: none;
  border-radius: 18px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #46c3e3;
  }
`;

export const UserMessageInput = styled.input`
  margin-top: auto;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  margin-top: 12px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 14px;
  background: transparent;
  border: none;
  font-size: 18px;
  color: #999;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`;
