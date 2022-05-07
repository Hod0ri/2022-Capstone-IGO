import React from "react";
import styled from "styled-components";
import { GoChevronRight } from "react-icons/go";
import Button from "../../Common/Button";

const reservationObject = [
  {
    id: 0,
    date: "3-30 (수)",
    startTime: "7:00",
    endTime: "7:10",
    startPoint: "철산역 7번 출구",
    endPoint: "독산역 2번 출구",
  },
  {
    id: 1,
    date: "3-30 (수)",
    startTime: "7:10",
    endTime: "7:25",
    startPoint: "독산역 2번 출구",
    endPoint: "관악역 2번 출구",
  },
  {
    id: 2,
    date: "3-30 (수)",
    startTime: "7:25",
    endTime: "7:40",
    startPoint: "관악역 2번 출구",
    endPoint: "대림대학교",
  },
];

const ReservationItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-left: 30px;
  margin-right: 30px;

  .items {
    margin-top: 10px;
    margin-bottom: 10px;
    padding-top: 20px;
    border-top: 1px solid black;
  }
  .items:last-child {
    border-bottom: 1px solid black;
    padding-bottom: 20px;
    margin-bottom: 200px;
  }
`;

const TimeArea = styled.div`
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: bold;
  margin: 10px;
  span {
    color: ${(props) => props.theme.color.green};
    margin-left: 30px;
    margin-right: 30px;
  }
`;

const DestinationArea = styled.div`
  text-align: left;
  span {
    margin-left: 50px;
  }
  p {
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;

const ReservationItems = () => {
  return (
    <>
      <ReservationItemsContainer>
        {reservationObject.map((items) => (
          <div className="items" key={items.id}>
            <p>{items.date}</p>
            <TimeArea>
              <p>
                {items.startTime}
                <span>
                  <GoChevronRight />
                </span>
                {items.endTime}
              </p>
            </TimeArea>

            <DestinationArea>
              <p>
                출발지 <span>{items.startPoint}</span>
              </p>
              <p>
                도착지 <span>{items.endPoint}</span>
              </p>
            </DestinationArea>

            <Button color="green">예약하기</Button>
          </div>
        ))}
      </ReservationItemsContainer>
    </>
  );
};

export default ReservationItems;
