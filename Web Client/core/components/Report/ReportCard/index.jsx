import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import ModalCard from '../../ModalCard';
import Reservation from '../../UserPage/Reservation';
const ReportCard = ({ fetchDataType, ...value }) => {
  const filteringData = {
    mc_Arrive: value.mm_Arrive,
    mc_ArriveTime: value.mm_ArriveTime,
    mc_Desc: null,
    mc_Driver: value.mm_Driver,
    mc_Member: value.mm_Member,
    mc_Goal: value.mm_Goal,
    mc_Price: value.mm_Price,
  };
  const [modalState, setModalState] = useState(false);
  // const onClickReport = () => <ModalCard type="report" />;

  return (
    <>
      <Reservation
        type="report"
        fetchDataType={fetchDataType}
        {...filteringData}
        onClickReport={() => setModalState(!modalState)}
      />
      {modalState && (
        <ModalCard
          onClickDisableDisplay={() => setModalState(!modalState)}
          onClick={() => onClickReport()}
          {...value}
        />
      )}
    </>
  );
};

export default ReportCard;
