import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import ClubScheduleModal from "./ClubScheduleModal";
import ScheduleItem from "./ScheduleItem";
import PastNoticesModal from "./PastNoticesModal";
import ScheduleDetailModal from "./ScheduleDetailModal";

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
    /* background: rgb(0, 133, 82);
    color: white;
    font-weight: bold; */
    background: none !important;
    color: inherit;
    font-weight: inherit;
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

  .meeting-day {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    z-index: 1; /* 텍스트가 위로 */
  }

  .meeting-day::before {
    content: "";
    position: absolute;
    width: 58px; /* ✅ 원 크기 여기서 조절 */
    height: 58px;
    background-color: #aad5b7;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1; /* 원이 아래 깔리도록 */
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

// 최신
const NoticeContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const NoticeContainer = styled.div`
  margin-bottom: 40px;
  background: #fff8d8;
  padding: 20px;
  border-radius: 12px;
  width: 100%;
  max-width: 1000px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
`;

const NoticeHeader = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
  width: 100%; /* 🔄 내부에서 좌우 정렬 가능하도록 */
  // text-align: left;
`;

const NoticeItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;
`;

const NoticeTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
`;

const NoticeDate = styled.span`
  font-size: 14px;
  color: #888;
  white-space: nowrap;
`;

const PastButtonWrapper = styled.div`
  text-align: right;
  margin-top: 12px;
  width: 100%;
`;

const PastButton = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

// 일정확인버튼
const ViewDetailButton = styled.button`
  padding: 10px 20px;
  background-color: rgb(0, 133, 82);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: rgb(0, 110, 70);
  }
`;

const ViewButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
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

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

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
    //   const key = selectedDate.toDateString();
    //   const scheduleWithId = {
    //     id: Date.now(), // 고유 ID 생성
    //     ...newItem,
    //   };

    //   const updated = {
    //     ...schedules,
    //     [key]: [...(schedules[key] || []), scheduleWithId],
    //   };
    //   setSchedules(updated);
    //   setSelectedDate(new Date(selectedDate));
    // };
    const key = selectedDate.toDateString();
    const scheduleWithId = {
      id: Date.now(),
      ...newItem,
    };

    if (newItem.type === "공지") {
      setSchedules((prev) => {
        const merged = Object.entries(prev)
          .filter(([key]) => key !== "__공지__")
          .flatMap(([dateKey, list]) =>
            list.map((item) => ({ ...item, dateKey }))
          )
          .concat({ ...scheduleWithId, dateKey: key });

        const noticesOnly = merged
          .filter((item) => item.type === "공지")
          .sort((a, b) => b.id - a.id);

        return { ...prev, __공지__: noticesOnly };
      });
    } else {
      // ✅ 모임 중복 확인
      const alreadyExists = schedules[key]?.some(
        (item) => item.type === "모임"
      );

      if (alreadyExists) {
        alert("이미 이 날짜에 모임이 존재합니다.");
        return;
      }

      setSchedules((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), scheduleWithId],
      }));
    }

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
          const allNotices = (() => {
            const dummyNotices = Object.entries(schedules)
              .filter(([key]) => key !== "__공지__")
              .flatMap(([dateKey, items]) =>
                items
                  .filter((item) => item.type === "공지")
                  .map((item) => ({ ...item, dateKey }))
              );

            const addedNotices = schedules["__공지__"] || [];

            return [...addedNotices, ...dummyNotices].sort(
              (a, b) => b.id - a.id
            );
          })();

          if (allNotices.length === 0) return null;

          return (
            <NoticeContainerWrapper>
              <NoticeContainer>
                <NoticeHeader>📢 최신 공지</NoticeHeader>
                {allNotices.slice(0, 3).map((notice) => (
                  <NoticeItemRow key={notice.id}>
                    <NoticeTitle>
                      📢 <span>{notice.title}</span>
                    </NoticeTitle>
                    <NoticeDate>{notice.dateKey}</NoticeDate>
                  </NoticeItemRow>
                ))}
                <PastButtonWrapper>
                  <PastButton onClick={() => setShowPastModal(true)}>
                    지난 공지 보기
                  </PastButton>
                </PastButtonWrapper>
              </NoticeContainer>
            </NoticeContainerWrapper>
          );
        })()}

        <CalendarWrapper>
          {/* <Calendar onChange={setSelectedDate} value={selectedDate} /> */}
          <Calendar
            onClickDay={handleDateClick}
            tileClassName={({ date, view }) => {
              if (view !== "month") return;

              const key = date.toDateString();
              const dayEvents = schedules[key];

              if (dayEvents?.some((item) => item.type === "모임")) {
                return "meeting-day";
              }

              const day = date.getDay();
              if (day === 0) return "sunday";
              if (day === 6) return "saturday";

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
              {(schedules[selectedDate.toDateString()] || []).length === 0 ? (
                <p style={{ fontSize: "16px", color: "#666" }}>
                  일정이 없습니다.
                </p>
              ) : (
                <ViewButtonWrapper>
                  <ViewDetailButton
                    onClick={() => {
                      const schedule = schedules[
                        selectedDate.toDateString()
                      ]?.find((item) => item.type === "모임");
                      if (schedule) {
                        setSelectedSchedule(schedule);
                        setDetailModalOpen(true);
                      }
                    }}
                  >
                    일정 보기
                  </ViewDetailButton>
                </ViewButtonWrapper>
              )}
              <div style={{ textAlign: "right", marginTop: "20px" }}>
                <button
                  onClick={() => setModalOpen(true)}
                  style={{
                    padding: "10px 16px",
                    backgroundColor: "#eee",
                    borderRadius: "8px",
                  }}
                >
                  일정 추가하기
                </button>
              </div>
            </ScheduleBox>
          )}

          {detailModalOpen && selectedSchedule && (
            <ScheduleDetailModal
              schedule={selectedSchedule}
              onClose={() => setDetailModalOpen(false)}
            />
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
