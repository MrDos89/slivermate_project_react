import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import ClubScheduleModal from "./ClubScheduleModal";
import ScheduleItem from "./ScheduleItem";
import PastNoticesModal from "./PastNoticesModal";

const Section = styled.section`
  width: 100%;
  background: linear-gradient(to bottom, #eafaf1, #ffffff);
  padding: 50px 0;
`;

const Inner = styled.div`
  width: 95%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: bold;
  color: rgb(0, 90, 50);
  text-align: center;
  margin-bottom: 60px;
`;

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .react-calendar {
    width: 100%;
    max-width: 1000px;
    background: #fff;
    border: none;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    font-family: "Noto Sans KR", sans-serif;
    font-size: 1.2rem;
    padding: 30px;
  }

  .react-calendar__navigation {
    margin-bottom: 20px;
  }

  .react-calendar__navigation button {
    font-size: 1.4rem;
    font-weight: bold;
    color: #333;
    background: transparent;
    border-radius: 10px;
    padding: 10px;
    transition: background 0.2s;

    &:hover {
      background: #f0f0f0;
    }
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    font-weight: 600;
    color: #666;
    font-size: 1rem;
    margin-bottom: 10px;
  }

  .react-calendar__tile {
    padding: 18px 10px;
    border-radius: 10px;
    transition: all 0.2s;
  }

  .react-calendar__tile:hover {
    background: #e0f5e9;
    color: rgb(0, 133, 82);
    font-weight: bold;
  }

  .react-calendar__tile--now {
    background: #f0f0f0;
    font-weight: bold;
  }

  .react-calendar__tile--active {
    background: rgb(0, 133, 82);
    color: white;
    font-weight: bold;
  }

  .react-calendar__tile.sunday {
    color: red;
    font-weight: bold;
  }

  .react-calendar__tile.saturday {
    color: blue;
    font-weight: bold;
  }

  .react-calendar__tile.sunday {
    color: red;
    font-weight: bold;
  }

  .react-calendar__tile.saturday {
    color: blue;
    font-weight: bold;
  }

  /* 🔻 비활성 날짜용 스타일 (회색 또는 흐리게) */
  .react-calendar__tile.sunday-disabled {
    color: #ccc;
  }

  .react-calendar__tile.saturday-disabled {
    color: #ccc;
  }
`;

const ScheduleBox = styled.div`
  margin-top: 60px;
  width: 100%;
  max-width: 1000px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
`;

const DateTitle = styled.h3`
  font-size: 26px;
  font-weight: 700;
  color: #222;
  margin-bottom: 24px;
`;

const ScheduleList = styled.ul`
  list-style: none;
  padding-left: 0;
  font-size: 18px;
  color: #333;

  li {
    padding: 8px 0;
    border-bottom: 1px solid #eee;
  }
`;

const CalendarSection = () => {
  //   const [selectedDate, setSelectedDate] = useState(new Date());

  // const [selectedDate, setSelectedDate] = useState(null);
  // const [schedules, setSchedules] = useState({});
  // const [input, setInput] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 추가
  const [schedules, setSchedules] = useState({});
  const [showPastModal, setShowPastModal] = useState(false);

  // const handleAdd = (e) => {
  //   e.preventDefault();
  //   const key = selectedDate.toDateString();
  //   const updated = {
  //     ...schedules,
  //     [key]: [...(schedules[key] || []), input],
  //   };
  //   setSchedules(updated);
  //   setInput("");
  // };
  useEffect(() => {
    const dummyNotices = {
      "Fri Apr 05 2024": [
        {
          id: 1,
          type: "공지",
          title: "4월 첫 공지사항",
          content: "4월 활동이 시작됩니다. 정기 모임에 꼭 참석해 주세요!",
        },
      ],
      "Wed Apr 10 2024": [
        {
          id: 2,
          type: "공지",
          title: "중간 점검 안내",
          content:
            "4월 15일까지 활동 중간 점검이 있습니다. 내용을 확인하시고 제출해주세요.",
        },
      ],
      "Mon Apr 22 2024": [
        {
          id: 3,
          type: "공지",
          title: "4월 마지막 공지",
          content:
            "4월 활동 종료 안내입니다. 다음 달 계획은 추후 공지로 공유하겠습니다.",
        },
      ],
    };

    setSchedules((prev) => ({ ...dummyNotices, ...prev }));
  }, []);

  const handleAddSchedule = (newItem) => {
    const key = selectedDate.toDateString();
    const scheduleWithId = {
      id: Date.now(), // 고유 ID 생성
      ...newItem,
    };

    const updated = {
      ...schedules,
      [key]: [...(schedules[key] || []), scheduleWithId],
    };
    setSchedules(updated);
    setSelectedDate(new Date(selectedDate));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <Section>
      <Inner>
        {/* <Title>📅 동아리 일정 캘린더</Title> */}

        {(() => {
          const allNotices = Object.values(schedules)
            .flat()
            .filter((item) => item.type === "공지")
            .sort((a, b) => b.id - a.id); // 최신순 정렬

          if (allNotices.length === 0) return null;

          const latest = allNotices[0];

          return (
            <div
              style={{
                marginBottom: "40px",
                background: "#f4f4f4",
                padding: "20px",
                borderRadius: "12px",
                width: "100%",
                maxWidth: "1000px",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "6px",
                }}
              >
                📢 최신 공지
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "4px",
                }}
              >
                {latest.title}
              </div>
              <div style={{ fontSize: "14px", color: "#666" }}>
                {latest.content.length > 60
                  ? latest.content.slice(0, 60) + "..."
                  : latest.content}
              </div>
              <div style={{ textAlign: "right", marginTop: "10px" }}>
                <button
                  onClick={() => setShowPastModal(true)}
                  style={{
                    padding: "6px 12px",
                    fontSize: "14px",
                    background: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  지난 공지 보기
                </button>
              </div>
            </div>
          );
        })()}

        <CalendarWrapper>
          {/* <Calendar onChange={setSelectedDate} value={selectedDate} /> */}
          <Calendar
            onClickDay={handleDateClick}
            tileClassName={({ date, view, activeStartDate }) => {
              if (view !== "month") return;

              const currentMonth = activeStartDate.getMonth();
              const tileMonth = date.getMonth();
              const day = date.getDay();

              const isSameMonth = tileMonth === currentMonth;

              if (day === 0) return isSameMonth ? "sunday" : "sunday-disabled";
              if (day === 6)
                return isSameMonth ? "saturday" : "saturday-disabled";

              return null;
            }}
            tileContent={({ date }) => {
              const key = date.toDateString();
              const dayEvents = schedules[key];
              if (dayEvents && dayEvents.length > 0) {
                const color =
                  dayEvents[0].type === "공지" ? "#e8e0f9" : "#e0f7fa";
                return (
                  <div
                    style={{
                      backgroundColor: color,
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      margin: "0 auto",
                      marginTop: "4px",
                    }}
                  />
                );
              }
              return null;
            }}
          />

          {modalOpen && (
            <ClubScheduleModal
              date={selectedDate}
              onClose={() => setModalOpen(false)}
              onAdd={handleAddSchedule}
            />
          )}

          {selectedDate && (
            <ScheduleBox>
              <DateTitle>{selectedDate.toDateString()} 일정</DateTitle>
              {(schedules[selectedDate.toDateString()] || []).length > 0 ? (
                <ScheduleList>
                  {schedules[selectedDate.toDateString()].map((item, idx) => (
                    <ScheduleItem key={idx} item={item} />
                  ))}
                </ScheduleList>
              ) : (
                <p style={{ fontSize: "16px", color: "#666" }}>
                  일정이 없습니다.
                </p>
              )}
              <div style={{ textAlign: "right", marginTop: "20px" }}>
                <button
                  onClick={() => setModalOpen(true)}
                  style={{
                    padding: "10px 16px",
                    backgroundColor: "rgb(0, 133, 82)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  일정 추가하기
                </button>
              </div>
            </ScheduleBox>
          )}

          {/* <AddForm onSubmit={handleAdd}>
                <Input
                  type="text"
                  placeholder="일정을 입력하세요"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <Button type="submit">추가</Button>
              </AddForm> */}
        </CalendarWrapper>
        {showPastModal && (
          <PastNoticesModal
            notices={Object.values(schedules)
              .flat()
              .filter((item) => item.type === "공지")
              .sort((a, b) => b.id - a.id)} // 최신순 전달
            onClose={() => setShowPastModal(false)}
          />
        )}
      </Inner>
    </Section>
  );
};

export default CalendarSection;
