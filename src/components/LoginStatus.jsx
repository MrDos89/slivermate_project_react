import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "./context/AuthContext";

const SvgButtonWrapper = styled(Link)`
  position: relative;
  width: 150px;
  height: 40px;
  display: inline-block;
  text-decoration: none;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    stroke-width: 3px;
    fill: transparent;
    stroke: #06d6a0;
    stroke-dasharray: 70 300;
    stroke-dashoffset: -220;
    transition: 1s all ease;
  }

  &:hover svg {
    stroke: #06d6a0;
    stroke-width: 3px;
    stroke-dasharray: 50 0;
    stroke-dashoffset: 0;
  }

  span {
    position: relative;
    color: #06d6a0;
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    z-index: 1;
    display: block;
  }
`;

export default function LoginStatus() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="auth-status">
      {isLoggedIn ? (
        <>
          <span>{user?.user_id}님</span>
          <SvgButtonWrapper to="/mypage">
            <svg height="40" width="150">
              <rect id="shape" height="40" width="150" />
            </svg>
            <span>내정보</span>
          </SvgButtonWrapper>
          <SvgButtonWrapper as="div" onClick={handleLogout}>
            <svg height="40" width="150">
              <rect id="shape" height="40" width="150" />
            </svg>
            <span>로그아웃</span>
          </SvgButtonWrapper>
        </>
      ) : (
        <>
          <SvgButtonWrapper to="/login">
            <svg height="40" width="150">
              <rect id="shape" height="40" width="150" />
            </svg>
            <span>로그인</span>
          </SvgButtonWrapper>
          <SvgButtonWrapper to="/signup">
            <svg height="40" width="150">
              <rect id="shape" height="40" width="150" />
            </svg>
            <span>회원가입</span>
          </SvgButtonWrapper>
        </>
      )}
    </div>
  );
}
