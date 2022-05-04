import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  display: inline-block;
  border : none;
  background: ${props=>props.theme.color.white};
  width: 20%;
`;

const Button = ({children}) => {
  return (
    <ButtonStyle>
      {children}
    </ButtonStyle>
  );
};

export default Button;
