import React from 'react';
import styled from 'styled-components';
import DriverButton from '../core/components/MainPage/DriverButton';
import UserPage from '../core/components/UserPage';

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
  .moreButton {
    font-size: ${(props) => props.theme.fontSize.sm};
    display: flex;
    align-items: flex-end;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Home = () => {
  return (
    <StyledDriverButton>
      <DriverButton />
      <div className="moreListContainer">
        <p className="moreTitle">
          더 많은 카풀 정보들을 <br />
          만나보세요!
        </p>
        <p className="moreButton">더보기 {'>'}</p>
      </div>
      <UserPage />
    </StyledDriverButton>
  );
};

export default Home;
