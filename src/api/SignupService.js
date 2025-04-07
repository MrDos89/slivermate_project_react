import axios from 'axios';
import SignupVo from '../vo/SignupVo';

const API_USER_URL = 'http://54.180.127.164:18090/api/user';

const SignupService = {
  // ✅ 회원가입 요청
  async signupUser(signupVo) {
    try {
      const response = await axios.post(API_USER_URL, signupVo.toJson());
      if (response.status === 200 || response.status === 201) {
        console.log('✅ 회원가입 성공:', response.data);
        return response.data;
      } else {
        console.warn('⚠️ 회원가입 응답 이상:', response.status);
        return null;
      }
    } catch (error) {
      console.error('❌ 회원가입 실패:', error);
      throw error;
    }
  },
};

export default SignupService;
