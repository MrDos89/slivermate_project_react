// 📁 components/PastNoticesModal.jsx

import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const NoticeItem = styled.div`
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;

  h4 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  p {
    font-size: 14px;
    color: #555;
    white-space: pre-wrap;
  }
`;

const CloseButton = styled.button`
  display: block;
  margin: 20px auto 0;
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  background: rgb(0, 133, 82);
  color: white;
  cursor: pointer;
`;

const PastNoticesModal = ({ notices, onClose }) => {
  return (
    <ModalOverlay>
      <ModalBox>
        <Title>📢 지난 공지 목록</Title>
        {notices.map((notice, idx) => (
          <NoticeItem key={idx}>
            <h4>{notice.title}</h4>
            <p>{notice.content}</p>
          </NoticeItem>
        ))}
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalBox>
    </ModalOverlay>
  );
};

export default PastNoticesModal;
