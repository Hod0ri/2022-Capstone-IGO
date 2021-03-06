import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchApi } from '../../api/fetchApi';
import locationData from '../../etc/location/station.json';

const ModalCardPositionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  right: 100vw;
  bottom: 100vh;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  .none {
    display: none;
  }
  z-index: 100;
`;
const ModalCardContainer = styled.div`
  overflow: hidden;
  background-color: ${(props) => props.theme.color.white};
  width: 80%;
  min-height: 200px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.color.black};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.3);
  .mt-10 {
    margin-top: 10px;
  }
  .mt-20 {
    margin-top: 20px;
  }
  .mt-30 {
    margin-top: 30px;
  }
  .block {
    flex-direction: row;
  }
`;
const SearchContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
`;
const TimeContainer = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
`;
const RouteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const ModalCardButtonContainer = styled.div`
  display: flex;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  width: 50%;
  height: 60px;
  bottom: 0px;
  border-top: 1px solid ${(props) => props.theme.color.black};
  cursor: pointer;
  user-select: none;
  & + & {
    border-left: 1px solid ${(props) => props.theme.color.black};
  }
  &:hover {
    background: ${(props) => props.theme.color.lightgray};
    opacity: 0.8;
  }
  &:active {
    background: ${(props) => props.theme.color.white};
  }
`;

const StartPointInputBox = ({ setIsTrue }) => {
  const onClickPostMatch = async () => {
    const startPointData = {
      mc_Arrive: `${startPoint}`,
      mc_ArriveTime: `${startTime}`,
      mc_Goal: '???????????????',
      mc_Price: `${price}`,
    };
    await fetchApi.matchlog
      .post(startPointData)
      .then(() => {
        setIsTrue(false);
      })
      .catch((e) => {});
  };
  const [searchPoint, setSearchPoint] = useState('');
  const [startPoint, setStartPoint] = useState('');
  const [price, setPrice] = useState('');
  const [startTime, setStartTime] = useState('');
  return (
    <ModalCardPositionContainer>
      <ModalCardContainer>
        <SearchContainer>
          <input
            list="route"
            id="search"
            placeholder="???????????? ???????????????. ex) ??????"
            onChange={(e) => setSearchPoint(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              setStartPoint(searchPoint);
            }}
          >
            ??????
          </button>
          <datalist id="route">
            {searchPoint != '' &&
              locationData
                .filter((v) => v['name'].includes(searchPoint))
                .map((e) => {
                  return <option value={e['name']} />;
                })}
          </datalist>
        </SearchContainer>
        <RouteContainer>
          <p>????????? : {startPoint}???</p>
          <p>????????? : ???????????????</p>
        </RouteContainer>
        <TimeContainer>
          <p>
            ?????? ?????? :{' '}
            <input
              type="datetime-local"
              id="startTime"
              onChange={(e) => setStartTime(e.target.value)}
            ></input>
            {/* {console.log(startTime.split('T').join(' '))} */}
          </p>
        </TimeContainer>
        <p>
          ?????? :{' '}
          <input
            id="price"
            type="text"
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          ???
        </p>
        {console.log(price)}
        <ModalCardButtonContainer>
          <ButtonContainer onClick={() => onClickPostMatch()}>
            ??????
          </ButtonContainer>
          <ButtonContainer onClick={() => setIsTrue(false)}>
            ??????
          </ButtonContainer>
        </ModalCardButtonContainer>
      </ModalCardContainer>
    </ModalCardPositionContainer>
  );
};

export default StartPointInputBox;
