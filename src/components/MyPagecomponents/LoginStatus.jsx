import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomerModal from "../CustomerModal/CustomerModal";

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

export default function LoginStatus({ onLoginChange }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const checkLoginStatus = useCallback(async () => {
    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_API_ADDRESS}:${
          import.meta.env.VITE_API_PORT
        }/api/user/session`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setUser(data);
        onLoginChange(true, data); // 로그인상태 전달
      } else {
        setIsLoggedIn(false);
        setUser(null);
        onLoginChange(false, null); // 로그아웃상태 전달
      }
    } catch (error) {
      console.error("로그인 상태 확인 중 오류 발생:", error);
      setIsLoggedIn(false);
      setUser(null);
      onLoginChange(false, null);
    }
  }, [onLoginChange]);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_API_ADDRESS}:${
          import.meta.env.VITE_API_PORT
        }/api/user/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        setIsLoggedIn(false);
        setUser(null);
        onLoginChange(false, null); // 로그아웃상태 전달
        navigate("/");
      }
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  return (
    <div className="auth-status">
      {isLoggedIn ? (
        <>
          <span>{user?.user_id}님</span>
          {/* 마이페이지 버튼 */}
          <SvgButtonWrapper to="/mypage">
            <svg height="40" width="150">
              <rect id="shape" height="40" width="150" />
            </svg>
            <span>내정보</span>
          </SvgButtonWrapper>

          {/* 로그아웃 버튼 */}
          <SvgButtonWrapper onClick={handleLogout}>
            <svg height="40" width="150">
              <rect id="shape" height="40" width="150" />
            </svg>
            <span>로그아웃</span>
          </SvgButtonWrapper>
        </>
      ) : (
        <>
          {/* 로그인 버튼 */}
          <SvgButtonWrapper to="/login">
            <svg height="40" width="150">
              <rect id="shape" height="40" width="150" />
            </svg>
            <span>로그인</span>
          </SvgButtonWrapper>

          {/* 회원가입 버튼 */}
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
