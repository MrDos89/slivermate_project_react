import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage/UploadImage";
import styled, { createGlobalStyle } from "styled-components";
import skan01 from "../images/skan01.mp4";
import skan04 from "../images/skan04.mp4";
import skan09 from "../images/skan09.mp4";

// -----------------------------------------------------
const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden; /* ✅ 브라우저 스크롤 제거 */
    background-color: #d8e8d8;
    font-family: 'Segoe UI', sans-serif;
  }
`;

// 브라우저 전체를 감싸는 배경
// const OuterWrapper = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;

//   /* ✅ 대각선 방향 반대 + 위쪽 하얀색 넓게 */
//   background: linear-gradient(
//     315deg,       /* ↙ 방향 */
//     white 65%,    /* 65%까지 흰색 */
//     #d8e8d8 65%   /* 나머지 초록 */
//   );

//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const OuterWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  /* ↘ 방향, 50% 기준으로 정확히 반반 */
  background: linear-gradient(
    155deg,
    white 50%,
    /* 위쪽 절반 */ #d8e8d8 50% /* 아래쪽 절반 */
  );

  display: flex;
  justify-content: center;
  align-items: center;
`;

// 회원가입 박스를 감싸는 컨테이너
const BoxContainer = styled.div`
  width: 1200px;
  height: 700px;
  display: flex;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  overflow: hidden;
  margin-top: 80px;
`;

// 왼쪽 이미지 섹션
const ImageSection = styled.div`
  width: 50%;
  // background-image: url("https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1");
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3); /* 어둡게 오버레이 */
  }

  .quote {
    position: relative;
    z-index: 1;
    color: white;
    font-size: 1.4rem;
    font-weight: 500;
    text-align: center;
    padding: 0 20px;
  }

  .quote-author {
    margin-top: 10px;
    font-size: 0.9rem;
    font-style: italic;
  }
`;

// 오른쪽 폼 섹션
const FormSection = styled.div`
  width: 50%;
  background: white;
  //background: #d8e8d8;
  padding: 30px 30px;
  overflow-y: auto;

  /* ✅ 스크롤바 커스터마이징 */
  &::-webkit-scrollbar {
    width: 8px;
    background-color: #d8e8d8;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    text-align: center;
  }

  .join-container {
    max-width: 100%;
  }

  form input,
  form select,
  form button {
    width: 100%;
    margin-top: 8px;
    margin-bottom: 16px;
    padding: 12px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  form button {
    background-color: #0ea144;
    color: white;
    font-weight: bold;
    border: none;
    cursor: pointer;
  }

  form button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
`;
// ----------------------------------------------------

const allRegions = [
  [1, "서울특별시"],
  [2, "부산광역시"],
  [3, "대구광역시"],
  [4, "인천광역시"],
  [5, "광주광역시"],
  [6, "대전광역시"],
  [7, "울산광역시"],
  [8, "세종특별자치시"],
  [9, "경기도"],
  [10, "강원도"],
  [11, "충청북도"],
  [12, "충청남도"],
  [13, "전라북도"],
  [14, "전라남도"],
  [15, "경상북도"],
  [16, "경상남도"],
  [17, "제주특별자치도"],
  [18, "울릉도"],
];

const userType = [
  [1, "엄마"],
  [2, "아빠"],
  [3, "아들"],
  [4, "딸"],
];

const SignUpPage = () => {
  const videoList = [skan01, skan04, skan09];

  const getRandomVideo = (exclude) => {
    let filtered = videoList.filter((v) => v !== exclude);
    return filtered[Math.floor(Math.random() * filtered.length)];
  };

  const [videoSrc, setVideoSrc] = useState(null);

  // 초기 랜덤 설정 + 시간에 따른 변경
  useEffect(() => {
    const random = videoList[Math.floor(Math.random() * videoList.length)];
    setVideoSrc(random);

    const interval = setInterval(() => {
      setVideoSrc((prev) => getRandomVideo(prev));
    }, 10000); // 10초마다 변경

    return () => clearInterval(interval);
  }, []);

  const handleVideoClick = () => {
    setVideoSrc((prev) => getRandomVideo(prev));
  };

  const API_USER_URL = `http://${import.meta.env.VITE_API_ADDRESS}:${
    import.meta.env.VITE_API_PORT
  }/api/user`;
  const API_USER_GROUP_URL = `http://${import.meta.env.VITE_API_ADDRESS}:${
    import.meta.env.VITE_API_PORT
  }/api/usergroup`;

  const [userData, setUserData] = useState({
    name: "",
    group_id: 0,
    user_name: "",
    nickname: "",
    user_id: "",
    user_password: "",
    pin_password: "",
    tel_number: "",
    email: "",
    region_id: 1,
    thumbnail: "",
    register_date: "",
    user_type: 1,
    is_deleted: false,
    is_admin: false,
    upd_date: new Date().toISOString(),
  });

  const [checkPasswords, setCheckPasswords] = useState({
    confirmPassword: "",
    confirmPinPassword: "",
  });

  const [allUserData, setAllUserData] = useState([]);
  const [allUserGroupData, setAllUserGroupData] = useState([]);
  const [userGroupLength, setUserGroupLength] = useState(0);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [pinPasswordMatch, setPinPasswordMatch] = useState(null);
  const navigate = useNavigate();

  // 뒤로가기 버튼
  const onBack = () => {
    navigate("/");
  };

  //@note - 전체 유저 데이터 불러오기
  useEffect(() => {
    // 회원 정보 불러오기
    fetch(API_USER_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log("user 데이터 확인:", data);
        setAllUserData(data);
      })
      .catch((error) => console.error("회원 정보 불러오기 오류", error));
  }, []);

  useEffect(() => {
    fetch(API_USER_GROUP_URL)
      .then((response) => response.json())
      .then((data) => {
        setUserGroupLength(data.length);
        setUserData({ group_id: data.length + 1 });
        setAllUserGroupData(data);

        setUserData((prevUserData) => {
          const updatedUserData = {
            ...prevUserData,
            group_id: data.length + 1,
          };
          console.log("userData 업데이트될 값:", updatedUserData);
          return updatedUserData;
        });
      })
      .catch((error) => console.error("유저 그룹 정보 불러오기 오류", error));
  }, []);

  useEffect(() => {
    console.log("userData 변경 확인:", userData);
  }, [userData]);

  //@note - 유저 아이디 가능 여부 확인
  const checkUserIdAvailability = () => {
    const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
    if (!usernameRegex.test(userData.user_id)) {
      alert("아이디는 6자 이상 영문, 숫자 조합이어야 합니다.");
      return;
    }
    const isTaken = allUserData.some(
      (user) => user.user_id === userData.user_id
    );
    setIsUsernameAvailable(!isTaken);
  };

  //@note - 비밀번호 사용 가능한지 확인
  const handlePasswordAvailability = (e) => {
    const password = e.target.value;
    setUserData({ ...userData, user_password: password });
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPasswordStrength(
      passwordRegex.test(password)
        ? "보안성 : 강함"
        : "비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다."
    );
  };

  //@note - pin 비밀번호 사용 가능한지 확인
  const handlePinPasswordAvailability = (e) => {
    const pinPassword = e.target.value;
    setUserData({ ...userData, pin_password: pinPassword });
  };

  //@note - 비밀번호 확인 기능
  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setCheckPasswords({ ...checkPasswords, confirmPassword });
    setPasswordMatch(userData.user_password === confirmPassword);
  };

  //@note - pin 비밀번호 확인 기능
  const handleConfirmPinPasswordChange = (e) => {
    const confirmPinPassword = e.target.value;
    setCheckPasswords({ ...checkPasswords, confirmPinPassword });
    setPinPasswordMatch(userData.pin_password === confirmPinPassword);
  };

  const handleUploadImage = (url) => {
    setUserData((prevUserData) => ({ ...prevUserData, thumbnail: url }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\d{11}$/;

    console.log("allUserData", allUserData);
    console.log("allUserGroupData", allUserGroupData);

    if (!userData.user_id) {
      alert("아이디를 입력하세요.");
      return;
    }
    if (!nicknameRegex.test(userData.nickname)) {
      alert("닉네임에는 특수문자를 사용할 수 없습니다.");
      return;
    }
    if (!userData.tel_number.match(phoneRegex)) {
      alert("전화번호는 11자리 숫자만 입력해야 합니다.");
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!emailRegex.test(userData.email)) {
      alert("올바른 이메일 형식을 입력하세요. 예: example@domain.com");
      return;
    }
    if (!isEmailVerified) {
      alert("이메일 인증이 필요합니다.");
      return;
    }
    if (isUsernameAvailable === false) {
      alert("아이디 중복 확인이 필요합니다.");
      return;
    }

    console.log(
      "group_id : " +
        userData.group_id +
        ", " +
        "name : " +
        userData.user_name +
        ", " +
        "nickname : " +
        userData.nickname +
        ", " +
        "user_id : " +
        userData.user_id +
        ", " +
        "password : " +
        userData.user_password +
        ", " +
        "pin_password : " +
        userData.pin_password +
        ", " +
        "tel_number : " +
        userData.tel_number +
        ", " +
        "email : " +
        userData.email +
        ", " +
        "regionId : " +
        userData.region_id +
        ", " +
        "thumbnail : " +
        userData.thumbnail +
        ", " +
        "register_date : " +
        userData.register_date +
        ", " +
        "user_type : " +
        userData.user_type +
        ", " +
        "is_deleted : " +
        userData.is_deleted +
        ", " +
        "is_admin : " +
        userData.is_admin +
        ", " +
        "upd_date : " +
        userData.upd_date
    );

    // 회원가입 처리
    fetch(API_USER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    alert("회원가입 성공! 로그인 페이지로 이동합니다.");
    navigate("/login");
  };

  return (
    <>
      <GlobalStyles />
      <OuterWrapper>
        <BoxContainer>
          <ImageSection>
            {videoSrc && (
              <video
                src={videoSrc}
                autoPlay
                muted
                loop
                onClick={handleVideoClick}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 0,
                  cursor: "pointer",
                }}
              />
            )}
            <div className="quote">
              “Paradise isn't a place. <br /> It's a feeling”
              <div className="quote-author">– L. Boyer</div>
            </div>
          </ImageSection>
          <FormSection>
            <div className="join-container">
              <button onClick={onBack} className="join-back-button">
                {/* <MdOutlineBackspace /> */}
              </button>
              <div className="join-logo-container">
                {/* <img src={logoImage} alt="호박고구마 로고" className="join-logo" /> */}
                <h1>파릇</h1>
              </div>
              <h2 className="join-h2">회원가입</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <UploadImage onUpload={handleUploadImage} />
              </div>
              <form className="join-form" onSubmit={handleSignup}>
                <label>이름:</label>
                <input
                  type="text"
                  placeholder="성함"
                  value={userData.user_name}
                  onChange={(e) =>
                    setUserData({ ...userData, user_name: e.target.value })
                  }
                />
                <br />
                <label>닉네임:</label>
                <input
                  type="text"
                  placeholder="2~10자 특수문자 제외"
                  value={userData.nickname}
                  onChange={(e) =>
                    setUserData({ ...userData, nickname: e.target.value })
                  }
                />
                <br />
                <label>아이디:</label>
                <input
                  type="text"
                  placeholder="2~10자 특수문자 제외"
                  value={userData.user_id}
                  onChange={(e) =>
                    setUserData({ ...userData, user_id: e.target.value })
                  }
                />
                <button type="button" onClick={checkUserIdAvailability}>
                  중복 확인
                </button>
                {isUsernameAvailable !== null && (
                  <span>{isUsernameAvailable ? "사용 가능" : "사용 불가"}</span>
                )}
                <br />
                <label>비밀번호:</label>
                <input
                  type="password"
                  placeholder="8~20자 영문, 숫자, 특수문자 조합"
                  value={userData.user_password}
                  onChange={handlePasswordAvailability}
                />
                <span>{passwordStrength}</span>
                <br />
                <label>비밀번호 확인:</label>
                <input
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={checkPasswords.confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {passwordMatch !== null && (
                  <span style={{ color: passwordMatch ? "green" : "red" }}>
                    {passwordMatch ? "비밀번호 일치" : "비밀번호 불일치"}
                  </span>
                )}
                <br />
                <label>pin 비밀번호:</label>
                <input
                  type="pin_password"
                  placeholder="6자리 숫자"
                  value={userData.pin_password}
                  onChange={handlePinPasswordAvailability}
                />
                <span>{passwordStrength}</span>
                <br />
                <label>비밀번호 확인:</label>
                <input
                  type="pin_password"
                  placeholder="pin 비밀번호를 다시 입력하세요"
                  value={checkPasswords.confirmPinPassword}
                  onChange={handleConfirmPinPasswordChange}
                />
                {pinPasswordMatch !== null && (
                  <span style={{ color: pinPasswordMatch ? "green" : "red" }}>
                    {pinPasswordMatch
                      ? "pin 비밀번호 일치"
                      : "pin 비밀번호 불일치"}
                  </span>
                )}
                <br />
                <label>전화번호:</label>
                <input
                  type="text"
                  placeholder="- 없이 숫자만 입력"
                  value={userData.tel_number}
                  onChange={(e) =>
                    setUserData({ ...userData, tel_number: e.target.value })
                  }
                />
                <br />
                <label>이메일:</label>
                <input
                  type="email"
                  placeholder="올바른 이메일 형식을 입력하세요"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
                <button type="button" onClick={() => setIsEmailVerified(true)}>
                  이메일 인증
                </button>
                {isEmailVerified && <span>인증 완료</span>}
                <br />
                <label>가족 구성:</label>
                <select
                  value={userData.user_type}
                  onChange={(e) =>
                    setUserData({ ...userData, user_type: e.target.value })
                  }
                >
                  {userType.map((type, index) => (
                    <option key={index} value={type[0]}>
                      {type[1]}
                    </option>
                  ))}
                </select>
                <br />
                <label>지역:</label>
                <select
                  value={userData.region_id}
                  onChange={(e) =>
                    setUserData({ ...userData, region_id: e.target.value })
                  }
                >
                  {allRegions.map((region, index) => (
                    <option key={index} value={region[0]}>
                      {region[1]}
                    </option>
                  ))}
                </select>
                <div className="button-group">
                  <button type="submit" disabled={!userData.thumbnail}>
                    가입
                  </button>
                  <button type="button" onClick={() => navigate(-1)}>
                    취소
                  </button>
                </div>
              </form>
            </div>
          </FormSection>
        </BoxContainer>
      </OuterWrapper>
    </>
  );
};

export default SignUpPage;
