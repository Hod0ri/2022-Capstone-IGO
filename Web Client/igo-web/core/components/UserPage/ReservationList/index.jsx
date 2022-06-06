import React from "react";
import styled from "styled-components";
import ReservationItems from "./ReservationItems";
import UserLogo from "../../UserLogo";

const ReservationListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 15px;
`;

const CarNumber = styled.div`
  color: ${(props) => props.theme.color.blue};
  font-size: ${(props) => props.theme.fontSize.md};
  border: 1px solid ${(props) => props.theme.color.blue};
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
`;

const index = () => {
  return (
    <>
      <ReservationListContainer>
        <UserLogo />
        <CarNumber>12허 3456</CarNumber>
      </ReservationListContainer>
      <ReservationItems />
    </>
  );
};

export default index;
