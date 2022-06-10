import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { atomMatchDetail } from '../../core/atoms/matchState';
import Auth from '../../core/components/Common/Auth';
import Payment from '../../core/components/UserPage/Payment';

const DetailPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Home = () => {
  const detailData = useRecoilValue(atomMatchDetail);
  const route = useRouter();
  console.log(detailData);
  !detailData && route.push('/');
  return (
    <Auth auth={true}>
      <DetailPageContainer>
        <Payment></Payment>
      </DetailPageContainer>
    </Auth>
  );
};

export default Home;
