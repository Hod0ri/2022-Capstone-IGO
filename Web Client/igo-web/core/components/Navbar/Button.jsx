import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  display: inline-block;
  border : none;
  background: none;
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
