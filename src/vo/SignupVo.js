class SignupVo {
    constructor({
      userName = '',
      nickname = '',
      userId = '',
      userPassword = '',
      pinPassword = '',
      telNumber = '',
      email = '',
      regionId = 1,
      userType = 1,
    }) {
      this.userName = userName;
      this.nickname = nickname;
      this.userId = userId;
      this.userPassword = userPassword;
      this.pinPassword = pinPassword;
      this.telNumber = telNumber;
      this.email = email;
      this.regionId = regionId;
      this.userType = userType;
    }
  
    static fromJson(json) {
      return new SignupVo({
        userName: json.userName ?? '',
        nickname: json.nickname ?? '',
        userId: json.userId ?? '',
        userPassword: json.userPassword ?? '',
        pinPassword: json.pinPassword ?? '',
        telNumber: json.telNumber ?? '',
        email: json.email ?? '',
        regionId: json.regionId ?? 1,
        userType: json.userType ?? 1,
      });
    }
  
    toJson() {
      return {
        userName: this.userName,
        nickname: this.nickname,
        userId: this.userId,
        userPassword: this.userPassword,
        pinPassword: this.pinPassword,
        telNumber: this.telNumber,
        email: this.email,
        regionId: this.regionId,
        userType: this.userType,
      };
    }
  }
  
  export default SignupVo;
  