import React from "react";
import styled from "styled-components";

const ReservationItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin: 5px;
  }
  .time {
    font-size: ${(props) => props.theme.fontSize.lg};
    font-weight: bold;
  }
`;

const Destination = styled.div`
  display: flex;
  align-items: left;
`;

const ReservationItems = () => {
  return (
    <>
      <ReservationItemsContainer>
        <p>03-30 (수)</p>
        <p className="time">7:00 - 07:10</p>
        <Destination>출발지 철산역7번출구</Destination>
      </ReservationItemsContainer>
    </>
  );
};

export default ReservationItems;
