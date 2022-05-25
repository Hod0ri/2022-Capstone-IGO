import React from 'react';
import styled from 'styled-components';
import DriverButton from './DriverButton';
import CustomerButton from './CustomerButton';

const StyledDriverButton = styled.div`
  margin-top: 50px;
  /* display: inline-block; */
  /* align-items: center; */
  justify-content: center;
  text-align: center;
`;

const MainPage = () => {
  return(
    <StyledDriverButton>
      <DriverButton />
      {/* <CustomerButton /> */}
    </StyledDriverButton>
  );
}

export default MainPage;