class LessonVo {
    constructor({
      lessonId = 0,
      userId = 0,
      lessonName = '',
      lessonDesc = '',
      lessonCostDesc = '',
      lessonCategory = 0,
      lessonSubCategory = '',
      lessonLecture = '',
      lessonThumbnail = '',
      lessonPrice = 0,
      registerDate = '',
      isHidden = false,
      updDate = '',
      userName = '',
      userThumbnail = '',
      lessonGroupId = 0,
      likeCount = 0,
      viewCount = 0,
      recommended = 0, // dummy 데이터에 있음
      likes = 0,       // dummy 데이터에 있음
    }) {
      this.lessonId = lessonId;
      this.userId = userId;
      this.lessonName = lessonName;
      this.lessonDesc = lessonDesc;
      this.lessonCostDesc = lessonCostDesc;
      this.lessonCategory = lessonCategory;
      this.lessonSubCategory = lessonSubCategory;
      this.lessonLecture = lessonLecture;
      this.lessonThumbnail = lessonThumbnail;
      this.lessonPrice = lessonPrice;
      this.registerDate = registerDate;
      this.isHidden = isHidden;
      this.updDate = updDate;
      this.userName = userName;
      this.userThumbnail = userThumbnail;
      this.lessonGroupId = lessonGroupId;
      this.likeCount = likeCount || likes; // 대응
      this.viewCount = viewCount;
      this.recommended = recommended;
    }
  
    static fromJson(json) {
      return new LessonVo({
        lessonId: json.lesson_id ?? 0,
        userId: json.user_id ?? 0,
        lessonName: json.lesson_name ?? '',
        lessonDesc: json.lesson_desc ?? '',
        lessonCostDesc: json.lesson_cost_desc ?? '',
        lessonCategory: json.lesson_category ?? 0,
        lessonSubCategory: json.lesson_sub_category ?? '',
        lessonLecture: json.lesson_lecture ?? '',
        lessonThumbnail: json.lesson_thumbnail ?? '',
        lessonPrice: json.lesson_price ?? 0,
        registerDate: json.register_date ?? '',
        isHidden: json.is_hidden ?? false,
        updDate: json.upd_date ?? '',
        userName: json.user_name ?? '',
        userThumbnail: json.user_thumbnail ?? '',
        lessonGroupId: json.lesson_group_id ?? 0,
        likeCount: json.like_count ?? json.likes ?? 0,
        viewCount: json.view_count ?? 0,
        recommended: json.recommended ?? 0,
      });
    }
  
    toJson() {
      return {
        lesson_id: this.lessonId,
        user_id: this.userId,
        lesson_name: this.lessonName,
        lesson_desc: this.lessonDesc,
        lesson_cost_desc: this.lessonCostDesc,
        lesson_category: this.lessonCategory,
        lesson_sub_category: this.lessonSubCategory,
        lesson_lecture: this.lessonLecture,
        lesson_thumbnail: this.lessonThumbnail,
        lesson_price: this.lessonPrice,
        register_date: this.registerDate,
        is_hidden: this.isHidden,
        upd_date: this.updDate,
        user_name: this.userName,
        user_thumbnail: this.userThumbnail,
        lesson_group_id: this.lessonGroupId,
        like_count: this.likeCount,
        view_count: this.viewCount,
        recommended: this.recommended,
      };
    }
  
    // (옵션) 날짜 포맷 함수도 추가 가능
    getFormattedDate() {
      if (!this.registerDate) return '날짜 없음';
      try {
        const date = new Date(this.registerDate);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
          date.getDate()
        ).padStart(2, '0')}`;
      } catch (e) {
        return '날짜 없음';
      }
    }
  }
  
  export default LessonVo;
  