import React from 'react';
import styled from 'styled-components';
import PointPage from '../core/components/PointPage';

const PointPageContainer = styled.div`
  padding: 0 50px 0 50px;
`;

const Point = () => {
  return (
    <PointPageContainer>
      <PointPage />
    </PointPageContainer>
  );
};

export default Point;
