import React from "react";
import styled from "styled-components";
import ReservationItems from "./ReservationItems";

const ReservationListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const CarNumber = styled.div`
  color: ${(props) => props.theme.color.blue};
  font-size: ${(props) => props.theme.fontSize.md};
  border: 1px solid ${(props) => props.theme.color.blue};
  padding: 5px;
  border-radius: 5px;
`;

const index = () => {
  return (
    <>
      <ReservationListContainer>
        <CarNumber>12허 3456</CarNumber>
        <ReservationItems />
      </ReservationListContainer>
    </>
  );
};

export default index;
