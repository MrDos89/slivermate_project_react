class UserVo {
    constructor({
      uid = 0,
      userName = "이름 없음",
      nickname = "닉네임 없음",
      userId = "아이디 없음",
      userPassword = "비밀번호 없음",
      pinPassword = "0000",
      telNumber = "전화번호 없음",
      email = "이메일 없음",
      thumbnail = "",
      regionId = 0,
      recommendUid = null,
      registerDate = new Date(),
      isDeleted = false,
      isAdmin = false,
      updDate = new Date(),
      groupId = 0,
      userType = 1,
    }) {
      this.uid = uid;
      this.userName = userName;
      this.nickname = nickname;
      this.userId = userId;
      this.userPassword = userPassword;
      this.pinPassword = pinPassword;
      this.telNumber = telNumber;
      this.email = email;
      this.thumbnail = thumbnail;
      this.regionId = regionId;
      this.recommendUid = recommendUid;
      this.registerDate = new Date(registerDate);
      this.isDeleted = isDeleted;
      this.isAdmin = isAdmin;
      this.updDate = new Date(updDate);
      this.groupId = groupId;
      this.userType = userType;
    }
  
    static fromJson(json) {
      return new UserVo({
        uid: json.uid ?? 0,
        userName: json.user_name ?? "이름 없음",
        nickname: json.nickname ?? "닉네임 없음",
        userId: json.user_id ?? "아이디 없음",
        userPassword: json.user_password ?? "비밀번호 없음",
        pinPassword: json.pin_password ?? "0000",
        telNumber: json.tel_number ?? "전화번호 없음",
        email: json.email ?? "이메일 없음",
        thumbnail: json.thumbnail ?? "",
        regionId: json.region_id ?? 0,
        recommendUid: json.recommend_uid ?? null,
        registerDate: json.register_date ?? new Date(),
        isDeleted: json.is_deleted ?? false,
        isAdmin: json.is_admin ?? false,
        updDate: json.upd_date ?? new Date(),
        groupId: json.group_id ?? 0,
        userType: json.user_type ?? 1,
      });
    }
  
    toJson() {
      return {
        uid: this.uid,
        user_name: this.userName,
        nickname: this.nickname,
        user_id: this.userId,
        user_password: this.userPassword,
        pin_password: this.pinPassword,
        tel_number: this.telNumber,
        email: this.email,
        thumbnail: this.thumbnail,
        region_id: this.regionId,
        recommend_uid: this.recommendUid,
        register_date: this.registerDate.toISOString(),
        is_deleted: this.isDeleted,
        is_admin: this.isAdmin,
        upd_date: this.updDate.toISOString(),
        group_id: this.groupId,
        user_type: this.userType,
      };
    }
  }
  
  export default UserVo;
  