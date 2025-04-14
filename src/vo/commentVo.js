export default class CommentVo {
    constructor({
        commentId = 0,
        postId = 0,
        userId = 0,
        clubId = 0,
        commentText = '',
        updDate = new Date(),
        userNickname = '',
        userThumbnail = '',
    }) {
      this.commentId = commentId;
      this.postId = postId;
      this.userId = userId;
      this.clubId = clubId;
      this.commentText = commentText;
      this.updDate = new Date(updDate);
      this.userNickname = userNickname;
      this.userThumbnail = userThumbnail;
    }
  
    static fromJson(json) {
      return new CommentVo({
        commentId: json.comment_id,
        postId: json.post_id,
        userId: json.user_id,
        clubId: json.club_id,
        commentText: json.comment_text,
        updDate: json.upd_date,
        userNickname: json.user_nickname,
        userThumbnail: json.user_thumbnail,
      });
    }
  
    toJson() {
      return {
        comment_id: this.commentId,
        post_id: this.postId,
        user_id: this.userId,
        club_id: this.clubId,
        comment_text: this.commentText,
        upd_date: this.updDate.toISOString(),
        user_nickname: this.userNickname,
        user_thumbnail: this.userThumbnail,
      };
    }
  }
  