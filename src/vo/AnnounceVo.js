class AnnounceVo {
    constructor({
      clubId = 0,
      announceTitle = "",
      announceDate = "", // yyyy-MM-dd
      announceTime = "",
      announceLocation = "",
      announceDescription = "",
      meetingPrice = "",
      attendCount = 0,
      announceType = 1, // 1: 공지, 2: 모임
      updDate = new Date(),
    }) {
      this.clubId = clubId;
      this.announceTitle = announceTitle;
      this.announceDate = announceDate;
      this.announceTime = announceTime;
      this.announceLocation = announceLocation;
      this.announceDescription = announceDescription;
      this.meetingPrice = meetingPrice;
      this.attendCount = attendCount;
      this.announceType = announceType;
      this.updDate = new Date(updDate);
    }
  
    get isAnnounce() {
      return this.type === 1;
    }
  
    get isMeeting() {
      return this.type === 2;
    }
  
    static fromJson(json) {
      return new AnnounceVo({
        clubId: json.club_id || 0,
        announceTitle: json.announce_title || "",
        announceDate: json.announce_date || "",
        announceTime: json.announce_time || "",
        announceLocation: json.announce_location || "",
        announceDescription: json.announce_description || "",
        meetingPrice: json.meeting_price || "",
        attendCount: json.attend_count || 0,
        announceType: json.announce_type || 1,
        updDate: json.upd_date || new Date(),
      });
    }
  
    toJson() {
      return {
        title: this.title,
        date: this.date,
        time: this.time,
        location: this.location,
        description: this.description,
        meetingPrice: this.meetingPrice,
        attendingCount: this.attendingCount,
        type: this.type,
        updDate: this.updDate.toISOString(),
      };
    }
  }
  
  export default AnnounceVo;
  