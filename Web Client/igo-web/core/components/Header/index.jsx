import React from 'react';
import styled from 'styled-components';
import { HiLogout } from 'react-icons/hi';
import useLoginState from '../../hooks/useLoginState';
import { fetchAuth } from '../../api/fetchAuth';
import { useRouter } from 'next/router';

const HeaderStyles = styled.div`
  max-width: 500px;
  width: 100%;
  height: 80px;
  padding: 20px;
  backdrop-filter: blur(5px);
  background-color: ${(props) => props.theme.color.blue};
  color: ${(props) => props.theme.color.white};
  display: flex;
  font-size: ${(props) => props.theme.fontSize.xl};
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 100;
`;

const BackButton = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const MenuIcon = styled.div`
  display: flex;
  flex: 1;
  justify-content: right;
  align-items: center;
  font-size: 40px;
  cursor: pointer;
`;

const Header = () => {
  const router = useRouter();
  const onClickLogout = async () => {
    await fetchAuth.logout();
    router.push('/signin');
  };
  const { loginState } = useLoginState();
  return (
    <HeaderStyles>
      <BackButton>{/* <GoChevronLeft /> */}</BackButton>
      <Title>IGO</Title>
      <MenuIcon onClick={() => onClickLogout()}>
        {loginState && <HiLogout />}
      </MenuIcon>
    </HeaderStyles>
  );
};

export default Header;
