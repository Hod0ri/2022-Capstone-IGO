import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: block-flex;
  border: 2px solid ${(props) => props.theme.color.gray}; //#62626A
  border-radius: 50px;
  background: ${(props) => props.theme.color.orange};
  width: 80%;
  height: 212px;
  margin-top: 40px;
  p {
    color: ${(props) => props.theme.color.white};
  }
  p.title {
    font-size: ${(props) => props.theme.fontSize.lg};
  }
  p.detail {
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;

const CustomerButton = () => {
  return (
    <>
      <Button>
        <div className=""></div>
        <p className="title">카풀 기사 등록</p>
        <p className="detail">기사로 등록하여 함께 카풀할 고객을 만나보세요!</p>
      </Button>
    </>
  );
};

export default CustomerButton;
