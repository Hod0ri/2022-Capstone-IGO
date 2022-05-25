import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  border: none;
  width: 100%;
  transition: 0.25s;

  height: ${(props) =>
    `${!props.size ? '50' : props.size == 'md' ? '40' : '30'}px`};
  font-size: ${(props) => {
    const size = props.size;
    const fontSize = props.theme.fontSize;
    return !size ? fontSize.lg : size == 'md' ? fontSize.md : fontSize.sm;
  }};

  color: ${(props) => props.theme.color.white};
  background: ${(props) => props.theme.color[props.color]};
  border-radius: ${(props) => {
    let res = '';
    const height = !props.size ? 50 : props.size == 'md' ? 40 : 30;
    res = props.round ? height : height / 4;
    return `${res}px`;
  }};
  &:hover {
    opacity: 0.75;
    cursor: pointer;
  }
  &:active {
    opacity: 1;
  }
  & + & {
    margin-top: 10px;
  }
`;

const Button = ({
  children = '입력값x', //입력한 값이 존재하지 않을경우
  onClick = () => {}, //onclick func
  color = 'blue', //blue, orange, black, green
  size = '', //lg, md, sm
  round = '', //false,true
}) => {
  return (
    <ButtonStyle
      size={size}
      color={color}
      round={round}
      onClick={() => onClick()}
    >
      {children}
    </ButtonStyle>
  );
};

export default React.memo(Button);
