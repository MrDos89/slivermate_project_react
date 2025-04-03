import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

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

const AddForm = styled.form`
  margin-top: 30px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

const Input = styled.input`
  padding: 12px 16px;
  font-size: 16px;
  flex: 1;
  border: 1.5px solid #ccc;
  border-radius: 8px;

  &:focus {
    outline: none;
    border-color: rgb(0, 133, 82);
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  background-color: rgb(0, 133, 82);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #00734f;
  }
`;

const CalendarSection = () => {
  //   const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [schedules, setSchedules] = useState({});
  const [input, setInput] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    const key = selectedDate.toDateString();
    const updated = {
      ...schedules,
      [key]: [...(schedules[key] || []), input],
    };
    setSchedules(updated);
    setInput("");
  };

  return (
    <Section>
      <Inner>
        <Title>📅 동아리 일정 캘린더</Title>

        <CalendarWrapper>
          {/* <Calendar onChange={setSelectedDate} value={selectedDate} /> */}
          <Calendar
            onClickDay={setSelectedDate}
            tileClassName={({ date, view, activeStartDate }) => {
              if (view !== "month") return;

              const currentMonth = activeStartDate.getMonth();
              const tileMonth = date.getMonth();
              const day = date.getDay(); // 0: 일, 6: 토

              const isSameMonth = tileMonth === currentMonth;

              if (day === 0) return isSameMonth ? "sunday" : "sunday-disabled";
              if (day === 6)
                return isSameMonth ? "saturday" : "saturday-disabled";

              return null;
            }}
          />

          {selectedDate && (
            <ScheduleBox>
              <DateTitle>{selectedDate.toDateString()} 일정</DateTitle>
              <ScheduleList>
                {(schedules[selectedDate.toDateString()] || []).map(
                  (item, idx) => (
                    <li key={idx}>📌 {item}</li>
                  )
                )}
              </ScheduleList>

              <AddForm onSubmit={handleAdd}>
                <Input
                  type="text"
                  placeholder="일정을 입력하세요"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <Button type="submit">추가</Button>
              </AddForm>
            </ScheduleBox>
          )}
        </CalendarWrapper>
      </Inner>
    </Section>
  );
};

export default CalendarSection;
