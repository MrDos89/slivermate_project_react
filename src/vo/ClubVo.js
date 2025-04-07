class ClubVo {
  constructor({
    clubId = 0,
    clubName = '',
    clubUserId = 0,
    clubCategoryId = 0,
    clubSubCategoryId = 0,
    clubThumbnail = '',
    clubMovie = '',
    clubDesc = '',
    clubMemberNumber = 0,
    clubMemberMax = 0,
    clubReportCnt = 0,
    clubRegisterDate = '',
    isDeleted = false,
    updDate = '',
    regionId = 0,
    hobbyType = '',
    posts = [],
  }) {
    this.clubId = clubId;
    this.clubName = clubName;
    this.clubUserId = clubUserId;
    this.clubCategoryId = clubCategoryId;
    this.clubSubCategoryId = clubSubCategoryId;
    this.clubThumbnail = clubThumbnail;
    this.clubMovie = clubMovie;
    this.clubDesc = clubDesc;
    this.clubMemberNumber = clubMemberNumber;
    this.clubMemberMax = clubMemberMax;
    this.clubReportCnt = clubReportCnt;
    this.clubRegisterDate = clubRegisterDate;
    this.isDeleted = isDeleted;
    this.updDate = updDate;
    this.regionId = regionId;
    this.hobbyType = hobbyType;
    this.posts = posts;
  }

  static fromJson(json) {
    return new ClubVo({
      clubId: json.club_id ?? 0,
      clubName: json.club_name ?? '',
      clubUserId: json.club_user_id ?? 0,
      clubCategoryId: json.club_category_id ?? 0,
      clubSubCategoryId: json.club_sub_category_id ?? 0,
      clubThumbnail: json.club_thumbnail ?? '',
      clubMovie: json.club_movie ?? '',
      clubDesc: json.club_desc ?? '',
      clubMemberNumber: json.club_member_number ?? 0,
      clubMemberMax: json.club_member_max ?? 0,
      clubReportCnt: json.club_report_cnt ?? 0,
      clubRegisterDate: json.club_register_date ?? '',
      isDeleted: json.is_deleted ?? false,
      updDate: json.upd_date ?? '',
      regionId: json.region_id ?? 0,
      hobbyType: json.hobbyType ?? '',
      posts: json.posts ?? [],
    });
  }

  toJson() {
    return {
      club_id: this.clubId,
      club_name: this.clubName,
      club_user_id: this.clubUserId,
      club_category_id: this.clubCategoryId,
      club_sub_category_id: this.clubSubCategoryId,
      club_thumbnail: this.clubThumbnail,
      club_movie: this.clubMovie,
      club_desc: this.clubDesc,
      club_member_number: this.clubMemberNumber,
      club_member_max: this.clubMemberMax,
      club_report_cnt: this.clubReportCnt,
      club_register_date: this.clubRegisterDate,
      is_deleted: this.isDeleted,
      upd_date: this.updDate,
      region_id: this.regionId,
      hobbyType: this.hobbyType,
      posts: this.posts,
    };
  }
}

export default ClubVo;
