import React from 'react';
import styled from 'styled-components';

const InputStyle = styled.input`
  width: 100%;
  height: 50px;
  padding: 0px 10px;
  font-size: ${(props) => props.theme.fontSize.sm};
  border: 1px solid ${(props) => props.theme.color.lightgray};
  border-radius: 12.5px;

  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.color.black};
  }
`;

const InputBox = ({ placeholder = '', type = 'text', ...props }) => {
  return <InputStyle placeholder={placeholder} type={type} {...props} />;
};

export default React.memo(InputBox);
