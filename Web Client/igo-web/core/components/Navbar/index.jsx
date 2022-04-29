import React from 'react';
import styled, { css } from 'styled-components';
import Button from './NavbarButton';
import { AiOutlineHome, AiOutlineCar } from 'react-icons/ai';
import { RiCoinsLine, RiAccountCircleLine, RiAlarmWarningLine } from 'react-icons/ri';

const NavbarStyle = styled.div`
  display: flex;
  align-items: center;
  height: 97px;
  max-width: 500px;
  width: 100%;
  background: ${props=>props.theme.color.white};
  position: fixed;
  bottom: 0;
  border-top: 1px solid ${(props)=>props.theme.color.black};
  p{
    font-size: ${(props)=>props.theme.fontSize.xs};
  }
  text-align: center;
`;


const Navbar = () => {

  return (
    <NavbarStyle>
      <Button>
        <AiOutlineHome size='48'/>
        <p>홈</p>
      </Button>
      <Button>
        <RiAlarmWarningLine size='48' />
       <p>신고</p>
      </Button>
      <Button>
        <AiOutlineCar size='48' /> 
        <p>카풀</p>
      </Button>
      <Button>
        <RiCoinsLine size='48' />
        <p>포인트</p>
      </Button>
      <Button>
        <RiAccountCircleLine size='48' />
        <p>마이페이지</p>
      </Button>
    </NavbarStyle>
  );
};

export default Navbar;
