import React from "react";
import styled from "styled-components";
import { GoChevronLeft } from "react-icons/go";
import { HiOutlineMenu } from "react-icons/hi";

const HeaderStyles = styled.div`
  width: 100%;
  height: 80px;
  padding: 20px;
  background-color: ${(props) => props.theme.color.blue};
  color: ${(props) => props.theme.color.white};
  display: flex;
  font-size: ${(props) => props.theme.fontSize.xl};
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
  font-size: 50px;
  cursor: pointer;
`;

const Header = () => {
  return (
    <HeaderStyles>
      <BackButton>
        <GoChevronLeft />
      </BackButton>
      <Title>IGO</Title>
      <MenuIcon>
        <HiOutlineMenu />
      </MenuIcon>
    </HeaderStyles>
  );
};

export default Header;
