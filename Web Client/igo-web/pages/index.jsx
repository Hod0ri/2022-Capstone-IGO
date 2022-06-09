import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DriverButton from '../core/components/MainPage/DriverButton';
import UserPage from '../core/components/UserPage';
import StartPointInputBox from '../core/components/MainPage/StartPointInputBox';
import { useRecoilState, useRecoilValue } from 'recoil';
import { atomUserDriver } from '../core/atoms/loginState';
import { fetchApi } from '../core/api/fetchApi';

const StyledDriverButton = styled.div`
  margin-top: 50px;
  justify-content: center;
  text-align: center;

  .moreListContainer {
    display: flex;
    text-align: left;
    justify-content: space-between;
    font-weight: bold;
    margin-top: 30px;
    margin-left: 72px;
    margin-right: 72px;
  }
  .moreTitle {
    font-size: ${(props) => props.theme.fontSize.md};
    line-height: 25px;
  }
`;

const Home = () => {
  const [matchData, setMatchData] = useState('');
  const getData = async () => {
    await fetchApi.search
      .get()
      .then((res) => {
        setMatchData(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
  getData('독산');
  const [isTrue, setIsTrue] = useState(false);
  // const [userDriver, setUserDriver] = useRecoilState(atomUserDriver);
  const userDriver = useRecoilValue(atomUserDriver);
  console.log(isTrue);
  return (
    <StyledDriverButton>
      {userDriver && <DriverButton onClick={() => setIsTrue(true)} />}
      <div className="moreListContainer">
        <p className="moreTitle">더 많은 카풀 정보들을 만나보세요!</p>
      </div>
      {isTrue && <StartPointInputBox setIsTrue={setIsTrue} />}
      <UserPage type={'home'} matchData={matchData} />
    </StyledDriverButton>
  );
};

export default Home;
