import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import CustomerModal from "./CustomerModal/CustomerModal";
import NotificationModal from "./NotificationModal/NotificationModal";


const HeaderContainer = styled.header`
  width: 100%;
  height: 70px;
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
  font-size: 47px;
  font-weight: bold;
  color: rgb(39, 233, 0);
  flex: 1;
  text-decoration: none;
  cursor: pointer;
  padding-top: 12px;

  &:hover {
    color: rgb(39, 233, 0); 
    transform: scale(1.05);
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 30px;
  justify-content: center;
  flex: 2;
`;

/*
const NavItem = styled.span`
  position: relative;
  cursor: pointer;
  font-weight: 500;
  color: #333;
  //padding-bottom: 1px;
  line-height: 70px;
  transition: color 0.3s, font-weight 0.3s;
  font-size: 18px;
  align-items: flex-end;   /* ✅ 폰트를 아래쪽으로 정렬 
  height: 100%;            /* ✅ Nav 높이에 맞춤 
  padding-top: 10px;

  align-items: flex-end;
  display: flex;
  justify-content: center;

  /* 텍스트 자체를 하단에 고정시킴 
  span {
    position: absolute;
    bottom: 4px;  /* 원하는 만큼 조절 가능 
  }

  &:hover {
    color: #46be78;
    font-weight: bold;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 3px;
    left: 0;
    height: 2px;
    width: 0;
    background-color: #46be78;
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }

  /* ✅ 잎사귀 이미지가 글자 위로 올라오게 
  &::before {
    content: "";
    position: absolute;
    top: 48%;
    left: 50%;
    width: 18px;
    height: 18px;
    background-image: url("https://cdn-icons-png.flaticon.com/512/5346/5346740.png");
    /* background-image: url("https://cdn-icons-png.flaticon.com/512/765/765761.png"); 
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0;
    transform: translate(-50%, -100%) scale(0.6);
    transition: opacity 0.4s ease, transform 0.4s ease;
    pointer-events: none;
    z-index: 10;
    
  }

  &:hover::before {
    opacity: 1;
    transform: translate(-50%, -150%) scale(1);
  }
`;
*/

const NavItem = styled.span`
  position: relative;
  cursor: pointer;
  font-weight: 500;
  color: #333;
  line-height: 70px;
  transition: color 0.3s, font-weight 0.3s;
  font-size: 18px;
  align-items: flex-end;
  height: 100%;
  padding-top: 15px;
  display: flex;
  justify-content: center;

  &:hover {
    color: #46be78;
    font-weight: bold;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 5px;
    left: 0;
    height: 2px;
    width: 0;
    background-color: #46be78;
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }

  &::before {
    content: "";
    position: absolute;
    top: 58%;
    left: 50%;
    width: 26px;
    height: 26px;
    background-image: url(${(props) => props.$leafIcon});
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0;
    // transform: translate(-50%, -100%) scale(0.6);
    transform: translate(-50%, -100%) scale(1.2);
    transition: opacity 0.4s ease, transform 0.4s ease;
    pointer-events: none;
    z-index: 10;
  }

  &:hover::before {
    opacity: 1;
    transform: translate(-50%, -150%) scale(1);
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
  padding: 10px 20px;
  border: 2px solid #46be78;
  border-radius: 25px;
  background: linear-gradient(145deg, #4fd18b, #3cb66f);
  color: white;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  box-shadow:
    0 4px 6px rgba(70, 190, 120, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  transition:
    all 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background: linear-gradient(145deg, #3cb66f, #4fd18b);
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow:
      0 6px 12px rgba(70, 190, 120, 0.3),
      0 0 6px rgba(70, 190, 120, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow:
      0 2px 4px rgba(70, 190, 120, 0.2),
      inset 0 1px 3px rgba(0, 0, 0, 0.2);
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
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  outline: none;

  &:hover {
    // background-color: rgb(208, 243, 200);
    color: white;
  }

  &:focus {
    outline: none;
  }
`;

function Header({ setScrollIndex }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); //  모달 상태
  const [showNotification, setShowNotification] = useState(false);

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
          <NavItem $leafIcon="https://cdn-icons-png.flaticon.com/512/8809/8809609.png" onClick={() => handleNavigateToScroll(1)}>파릇 소개</NavItem>
          <NavItem $leafIcon="https://cdn-icons-png.flaticon.com/512/8611/8611162.png" onClick={() => handleNavigateToScroll(3)}>강의실</NavItem>
          <NavItem $leafIcon="https://cdn-icons-png.flaticon.com/512/7105/7105091.png" onClick={() => handleNavigateToScroll(5)}>모임</NavItem>
          <NavItem $leafIcon="https://cdn-icons-png.flaticon.com/512/3426/3426179.png" onClick={() => handleNavigateToScroll(8)}>
            자유게시판
          </NavItem>
          <NavItem $leafIcon="https://cdn-icons-png.flaticon.com/512/595/595533.png" onClick={() => handleNavigateToScroll(8)}>
            시니어칼럼
          </NavItem>
          <NavItem $leafIcon="https://cdn-icons-png.flaticon.com/512/10551/10551160.png" onClick={() => navigate("/mypage")}>마이페이지</NavItem>
          <NavItem $leafIcon="https://cdn-icons-png.flaticon.com/512/1041/1041916.png" onClick={() => navigate("/chat")}>채팅</NavItem>
        </Nav>
        <AuthButtons>
          <PhoneButton onClick={() => setShowModal(true)}>📞</PhoneButton>
          <PhoneButton onClick={() => setShowNotification(true)}>🔔</PhoneButton>
          <Button to="/login">로그인</Button>
          <Button to="/signup">회원가입</Button>
        </AuthButtons>
      </HeaderContainer>
      {/* ✅ 모달 렌더링 */}
      {showModal && <CustomerModal onClose={() => setShowModal(false)} />}
      {showNotification && <NotificationModal onClose={() => setShowNotification(false)} />}
    </>
  );
}

export default Header;
