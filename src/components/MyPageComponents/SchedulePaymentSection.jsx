import React from "react";
import styled from "styled-components";

// 더미 데이터 예시
const dummySchedulePayments = [
  {
    id: 1,
    clubName: "파릇정원",
    scheduleName: "4월 식물 정기모임",
    price: 15000,
    date: "2025-04-20",
    isPaid: true,
  },
  {
    id: 2,
    clubName: "캠핑좋아",
    scheduleName: "제주 캠핑 투어",
    price: 50000,
    date: "2025-05-03",
    isPaid: false,
  },
];

const SectionWrapper = styled.div`
  margin-top: 4rem;
  padding: 2rem;
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background-color: #f0f0f0;
`;

const Th = styled.th`
  padding: 0.8rem;
  text-align: left;
  border-bottom: 1px solid #ccc;
`;

const Td = styled.td`
  padding: 0.8rem;
  border-bottom: 1px solid #eee;
`;

const PaidTag = styled.span`
  color: ${(props) => (props.paid ? "#4CAF50" : "#f44336")};
  font-weight: bold;
`;

function SchedulePaymentSection({ userAnnouncements }) {
  console.log("넘겨받은 userAnnouncements 확인 👉", userAnnouncements);

  return (
    <SectionWrapper>
      <Title>📅 일정 및 결제 확인</Title>
      <Table>
        <Thead>
          <tr>
            <Th>모임 이름</Th>
            <Th>일정 이름</Th>
            <Th>가격</Th>
            <Th>일자</Th>
            <Th>결제 여부</Th>
          </tr>
        </Thead>
        <tbody>
          {dummySchedulePayments.map((item) => (
            <tr key={item.id}>
              <Td>{item.clubName}</Td>
              <Td>{item.scheduleName}</Td>
              <Td>{item.price.toLocaleString()}원</Td>
              <Td>{item.date}</Td>
              <Td>
                <PaidTag paid={item.isPaid}>
                  {item.isPaid ? "결제 완료" : "미결제"}
                </PaidTag>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </SectionWrapper>
  );
}

export default SchedulePaymentSection;
