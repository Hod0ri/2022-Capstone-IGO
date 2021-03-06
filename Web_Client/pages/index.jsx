import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DriverButton from '../core/components/MainPage/DriverButton';
import UserPage from '../core/components/UserPage';
import StartPointInputBox from '../core/components/MainPage/StartPointInputBox';
import { useRecoilState, useRecoilValue } from 'recoil';
import { atomUserDriver } from '../core/atoms/loginState';
import { fetchApi } from '../core/api/fetchApi';
import Auth from '../core/components/Common/Auth';
import Loading from '../core/components/Common/Loading';

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
    margin-bottom: 15px;
  }
  .DriverListContainer {
    display: flex;
    text-align: left;
    justify-content: space-between;
    font-weight: bold;
    margin-top: 20px;
    margin-left: 72px;
    margin-right: 72px;
  }
  .DriverData {
    font-size: ${(props) => props.theme.fontSize.md};
  }
  .NonDriverData {
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;
const NonCarPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    margin: 100px auto;
    font-size: ${(props) => props.theme.fontSize.lg};
  }
`;

const Home = () => {
  const [matchData, setMatchData] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isTrue, setIsTrue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userDriver = useRecoilValue(atomUserDriver);
  useEffect(() => {
    const getData = async () => {
      await fetchApi.search
        .get()
        .then((res) => {
          setMatchData(res.data);
        })
        .catch((e) => {
          console.log(e.response);
        });
      setIsLoading(true);
    };

    const getMyData = async () => {
      await fetchApi.matchlog
        .get()
        .then((res) => {
          setMatchData(res.data);
        })
        .catch((e) => {
          console.log(e.response);
        });
      setIsLoading(true);
    };
    userDriver ? getMyData() : inputValue ? getData(inputValue) : getData();
  }, [inputValue, isLoading]);
  return (
    <Auth auth={true}>
      {!isLoading ? (
        <Loading />
      ) : (
        <StyledDriverButton>
          {userDriver && <DriverButton onClick={() => setIsTrue(true)} />}
          {userDriver ? (
            <div>
              <div className="DriverListContainer">
                <p className="DriverData">?????? ????????? ?????? ??????</p>
              </div>
              {matchData ? (
                <div>
                  {' '}
                  {matchData.data.map((v, index) => {
                    return <UserPage type={'DriverHome'} {...v} key={index} />;
                  })}
                </div>
              ) : (
                <div className="DriverListContainer">
                  <p className="NonDriverData">
                    ???? ?????? ????????? ?????? ????????? ????????????.
                  </p>
                </div>
              )}
              {isTrue && <StartPointInputBox setIsTrue={setIsTrue} />}
            </div>
          ) : matchData ? (
            <div>
              <div className="moreListContainer">
                <p className="moreTitle">?????? ????????? ?????? ??????</p>
              </div>
              {matchData &&
                matchData.data.map((v, index) => {
                  return <UserPage type={'home'} {...v} key={index} />;
                })}
            </div>
          ) : (
            <NonCarPageContainer>
              <p>???? ?????? ????????? ?????? ????????? ????????????.</p>
            </NonCarPageContainer>
          )}
        </StyledDriverButton>
      )}
    </Auth>
  );
};

export default Home;
