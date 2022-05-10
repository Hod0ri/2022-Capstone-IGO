import React from 'react';
import styled from 'styled-components';
import CurrentPoint from './CurrentPoint';
import UsageHistory from './UsageHistory';

const PointPageContainer = styled.div`
  /* max-width: 80%; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .pointWrapContainer{
    width: 80%;
  }
`;

const PointPage = () => {
  return(
    <PointPageContainer>
      <CurrentPoint />
      <UsageHistory />
    </PointPageContainer>
  );
}

export default PointPage;