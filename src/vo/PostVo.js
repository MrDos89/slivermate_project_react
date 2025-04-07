class PostVo {
    constructor({
      postId = 0,
      regionId = 0,
      postUserId = 0,
      clubId = 0,
      postCategoryId = 0,
      postSubCategoryId = 0,
      postNote = '',
      postImages = [],
      postLikeCount = 0,
      postCommentCount = 0,
      isHidden = false,
      postReportCount = 0,
      registerDate = new Date(),
      comments = [],
      userNickname = '',
      userThumbnail = '',
      updDate = new Date(),
    }) {
      this.postId = postId;
      this.regionId = regionId;
      this.postUserId = postUserId;
      this.clubId = clubId;
      this.postCategoryId = postCategoryId;
      this.postSubCategoryId = postSubCategoryId;
      this.postNote = postNote;
      this.postImages = postImages;
      this.postLikeCount = postLikeCount;
      this.postCommentCount = postCommentCount;
      this.isHidden = isHidden;
      this.postReportCount = postReportCount;
      this.registerDate = new Date(registerDate);
      this.comments = comments;
      this.userNickname = userNickname;
      this.userThumbnail = userThumbnail;
      this.updDate = new Date(updDate);
    }
  
    static fromJson(json) {
      return new PostVo({
        postId: json.post_id ?? 0,
        regionId: json.region_id ?? 0,
        postUserId: json.post_user_id ?? 0,
        clubId: json.club_id ?? 0,
        postCategoryId: json.post_category_id ?? 0,
        postSubCategoryId: json.post_sub_category_id ?? 0,
        postNote: json.post_note ?? '',
        postImages: json.post_images ?? [],
        postLikeCount: json.post_like_count ?? 0,
        postCommentCount: json.post_comment_count ?? 0,
        isHidden: json.is_hidden ?? false,
        postReportCount: json.post_report_count ?? 0,
        registerDate: json.register_date ?? new Date(),
        comments: json.comments ?? [],
        userNickname: json.nickname ?? '',
        userThumbnail: json.user_thumbnail ?? '',
        updDate: json.upd_date ?? new Date(),
      });
    }
  
    toJson() {
      return {
        post_id: this.postId,
        region_id: this.regionId,
        post_user_id: this.postUserId,
        club_id: this.clubId,
        post_category_id: this.postCategoryId,
        post_sub_category_id: this.postSubCategoryId,
        post_note: this.postNote,
        post_images: this.postImages,
        post_like_count: this.postLikeCount,
        post_comment_count: this.postCommentCount,
        is_hidden: this.isHidden,
        post_report_count: this.postReportCount,
        register_date: this.registerDate.toISOString(),
        comments: this.comments,
        nickname: this.userNickname,
        user_thumbnail: this.userThumbnail,
        upd_date: this.updDate.toISOString(),
      };
    }
  }
  
  export default PostVo;
  

/*
 JavaScript에서는 final, int, String, List<String> 이런 식 타입 선언은 필요 없고,
constructor의 매개변수에서 기본값만 설정하면 됩니다.

🔹 왜냐하면?
JavaScript는 동적 타입 언어입니다.

int, String, List 같은 타입을 아예 사용하지 않습니다.

변수는 값을 보고 자동으로 타입을 추론합니다.

final 같은 불변 선언도 클래스 안에서 직접적으로 강제할 방법이 없습니다.

const는 변수에만 쓰는 거고, 클래스 속성엔 적용되지 않아요.

불변으로 만들고 싶다면 Object.freeze()나 타입스크립트를 써야 합니다.
*/



// class PostVo {
//     constructor({
//       id,
//       user,
//       userThumbnail,
//       content,
//       images,
//       tags,
//       likes,
//       comments,
//       createdAt,
//     }) {
//       this.id = id; // 게시글 ID
//       this.user = user; // 작성자 닉네임
//       this.userThumbnail = userThumbnail; // 작성자 썸네일
//       this.content = content; // 게시글 내용
//       this.images = images || []; // 이미지 배열 [{ url }]
//       this.tags = tags || []; // 태그 번호 배열
//       this.likes = likes || 0; // 좋아요 수
//       this.comments = comments || 0; // 댓글 수
//       this.createdAt = createdAt ? new Date(createdAt) : new Date(); // 생성일
//     }
  
//     static fromJson(json) {
//       return new PostVo({
//         id: json.id,
//         user: json.user,
//         userThumbnail: json.userThumbnail,
//         content: json.content,
//         images: json.images,
//         tags: json.tags,
//         likes: json.likes,
//         comments: json.comments,
//         createdAt: json.createdAt,
//       });
//     }
  
//     toJson() {
//       return {
//         id: this.id,
//         user: this.user,
//         userThumbnail: this.userThumbnail,
//         content: this.content,
//         images: this.images,
//         tags: this.tags,
//         likes: this.likes,
//         comments: this.comments,
//         createdAt: this.createdAt.toISOString(),
//       };
//     }
//   }
  
//   export default PostVo;
  