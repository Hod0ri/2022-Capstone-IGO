import React from 'react';
import styled from 'styled-components';
import Auth from '../core/components/Common/Auth';
import PointPage from '../core/components/PointPage';

const PointPageContainer = styled.div`
  padding: 0 50px 0 50px;
`;

const Point = () => {
  return (
    <Auth auth={true}>
      <PointPageContainer>
        <PointPage />
      </PointPageContainer>
    </Auth>
  );
};

export default Point;
