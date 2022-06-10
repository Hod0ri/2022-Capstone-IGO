import React from 'react';
import styled, { css } from 'styled-components';
import Button from './NavbarButton';
import Link from 'next/link';

import {
  AiOutlineHome,
  AiOutlineCar,
  AiFillHome,
  AiFillCar,
} from 'react-icons/ai';
import {
  RiCoinsLine,
  RiCoinsFill,
  RiAccountCircleLine,
  RiAccountCircleFill,
  RiAlarmWarningLine,
  RiAlarmWarningFill,
} from 'react-icons/ri';

const NavbarStyle = styled.div`
  display: flex;
  align-items: center;
  height: 97px;
  max-width: 500px;
  width: 100%;
  background: ${(props) => props.theme.color.white};
  position: fixed;
  bottom: 0;
  z-index: 100;
  border-top: 1px solid ${(props) => props.theme.color.black};
  p {
    font-size: ${(props) => props.theme.fontSize.xs};
  }
  text-align: center;
`;

const Navbar = ({ route }) => {
  return (
    <NavbarStyle>
      <Button>
        <a onClick={() => route.push('/')}>
          {route.asPath === '/' ? (
            <AiFillHome size="48" />
          ) : (
            <AiOutlineHome size="48" />
          )}
          <p>홈</p>
        </a>
      </Button>
      <Button>
        <a onClick={() => route.push('/report')}>
          {route.asPath === '/report' ? (
            <RiAlarmWarningFill size="48" />
          ) : (
            <RiAlarmWarningLine size="48" />
          )}
          <p>신고</p>
        </a>
      </Button>
      <Button>
        <a onClick={() => route.push('/car')}>
          {route.asPath === '/car' || route.asPath === '/car/detail' ? (
            <AiFillCar size="48" />
          ) : (
            <AiOutlineCar size="48" />
          )}
          <p>카풀</p>
        </a>
      </Button>
      <Button>
        <a onClick={() => route.push('/point')}>
          {route.asPath === '/point' ? (
            <RiCoinsFill size="48" />
          ) : (
            <RiCoinsLine size="48" />
          )}
          <p>포인트</p>
        </a>
      </Button>
      <Button>
        <a onClick={() => route.push('/account')}>
          {route.asPath === '/account' ? (
            <RiAccountCircleFill size="48" />
          ) : (
            <RiAccountCircleLine size="48" />
          )}
          <p>마이페이지</p>
        </a>
      </Button>
    </NavbarStyle>
  );
};

export default Navbar;
