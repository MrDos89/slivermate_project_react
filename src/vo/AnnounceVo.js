class AnnounceVo {
    constructor({
      title = "",
      date = "", // yyyy-MM-dd
      time = "",
      location = "",
      description = "",
      meetingPrice = "",
      attendingCount = 0,
      type = 1, // 1: 공지, 2: 모임
      updDate = new Date(),
    }) {
      this.title = title;
      this.date = date;
      this.time = time;
      this.location = location;
      this.description = description;
      this.meetingPrice = meetingPrice;
      this.attendingCount = attendingCount;
      this.type = type;
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
        title: json.title || "",
        date: json.date || "",
        time: json.time || "",
        location: json.location || "",
        description: json.description || "",
        meetingPrice: json.meetingPrice || "",
        attendingCount: json.attendingCount || 0,
        type: json.type || 1,
        updDate: json.updDate || new Date(),
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
  