import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const API_USER_URL = `http://54.180.127.164:18090/api/user`;
  const API_USER_GROUP_URL = `http://54.180.127.164:18090/api/usergroup`;

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
      .then((data) => setAllUserData(data))
      .catch((error) => console.error("회원 정보 불러오기 오류", error));
  }, []);

  useEffect(() => {
    fetch(API_USER_GROUP_URL)
      .then((response) => response.json())
      .then((data) => setAllUserGroupData(data))
      .catch((error) => console.error("유저 그룹 정보 불러오기 오류", error));
  }, []);

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

  const handleSignup = (e) => {
    e.preventDefault();
    const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\d{11}$/;

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

    setUserData({ ...userData, group_id: allUserGroupData.length + 1 });

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
    <div className="join-container">
      <button onClick={onBack} className="join-back-button">
        {/* <MdOutlineBackspace /> */}
      </button>
      <div className="join-logo-container">
        {/* <img src={logoImage} alt="호박고구마 로고" className="join-logo" /> */}
        <h1>파릇</h1>
      </div>
      <h2 className="join-h2">회원가입</h2>
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
            {pinPasswordMatch ? "pin 비밀번호 일치" : "pin 비밀번호 불일치"}
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
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
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
          <button type="submit">가입</button>
          <button type="button" onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
