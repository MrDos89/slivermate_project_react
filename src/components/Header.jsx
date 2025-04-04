import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import CustomerModal from "./CustomerModal/CustomerModal";

const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 40px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  @font-face {
    font-family: "KCCHyerim-Regular";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2411-3@1.0/KCCHyerim-Regular.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "KCCHyerim-Regular";
  font-size: 40px;
  font-weight: bold;
  color: rgb(39, 233, 0);
  flex: 1;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: rgb(39, 233, 0); /* 호버 시에도 원래 색상 유지 */
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 30px;
  justify-content: center;
  flex: 2;
`;

const NavItem = styled.span`
  position: relative;
  cursor: pointer;
  font-weight: 500;
  color: #333;
  padding-bottom: 3px;

  &:hover {
    color: #67dbff;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 0;
    background-color: #67dbff;
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 10px;
  flex: 1;
  justify-content: flex-end;
  padding-right: 60px;
`;

const Button = styled(Link)`
  padding: 5px 10px;
  border: 1px solid #67dbff;
  border-radius: 5px;
  text-decoration: none;
  color: #67dbff;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background-color: #67dbff;
    color: white;
  }
`;

// 고객센터
const PhoneButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f8f9fa; /* 헤더 배경색 */
  border: none;
  color: #333; /* 아이콘 기본 색 */
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  outline: none;

  &:hover {
    background-color: rgb(208, 243, 200);
    color: white;
  }

  &:focus {
    outline: none;
  }
`;

function Header({ setScrollIndex }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); //  모달 상태

  const handleNavigateToScroll = (index) => {
    navigate(`/?scrollTo=${index}`);
  };

  // const handlePhoneClick = () => {
  //   alert("고객센터 연결 준비 중입니다.");
  // };

  return (
    <>
      <HeaderContainer>
        {/* <Logo to="/">파릇</Logo> */}
        {/* <Logo onClick={() => setScrollIndex(0)}>파릇</Logo> */}
        <Logo onClick={() => handleNavigateToScroll(0)}>파릇</Logo>
        <Nav>
          <NavItem onClick={() => handleNavigateToScroll(1)}>파릇 소개</NavItem>
          <NavItem onClick={() => handleNavigateToScroll(3)}>강의실</NavItem>
          <NavItem onClick={() => handleNavigateToScroll(5)}>모임</NavItem>
          <NavItem onClick={() => handleNavigateToScroll(8)}>
            자유게시판
          </NavItem>
          <NavItem onClick={() => handleNavigateToScroll(8)}>
            시니어칼럼
          </NavItem>
          <NavItem onClick={() => navigate("/mypage")}>마이페이지</NavItem>
        </Nav>
        <AuthButtons>
          <PhoneButton onClick={() => setShowModal(true)}>📞</PhoneButton>
          <Button to="/login">로그인</Button>
          <Button to="/signup">회원가입</Button>
        </AuthButtons>
      </HeaderContainer>
      {/* ✅ 모달 렌더링 */}
      {showModal && <CustomerModal onClose={() => setShowModal(false)} />}
    </>
  );
}

export default Header;
