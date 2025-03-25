import { Link } from "react-router-dom";
import styled from "styled-components";

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
  font-size: 24px;
  font-weight: bold;
  color: #67dbff;
  flex: 1;
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

function Header({ setScrollIndex }) {
  return (
    <HeaderContainer>
      <Logo>파릇</Logo>
      <Nav>
        <NavItem onClick={() => setScrollIndex(1)}>파릇 소개</NavItem>
        <NavItem onClick={() => setScrollIndex(3)}>강의실</NavItem>
        <NavItem onClick={() => setScrollIndex(5)}>모임</NavItem>
        <NavItem onClick={() => setScrollIndex(8)}>자유게시판</NavItem>
        <NavItem onClick={() => setScrollIndex(8)}>시니어칼럼</NavItem>
        {/* NavItem 대신 Link를 쓰는 경우는 아래처럼 */}
        <NavItem as={Link} to="/mypage">마이페이지</NavItem>
      </Nav>
      <AuthButtons>
        <Button to="/login">로그인</Button>
        <Button to="/signup">회원가입</Button>
      </AuthButtons>
    </HeaderContainer>
  );
}

export default Header;
