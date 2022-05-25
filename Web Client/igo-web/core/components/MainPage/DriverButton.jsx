import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import ButtonPlus from './icon/buttonPlus.png';

const Button = styled.button`
  border: 2px solid ${(props) => props.theme.color.gray}; //#62626A
  border-radius: 50px;
  background: ${(props) => props.theme.color.blue};
  width: 80%;
  height: 212px;
  display: inline-flex;
  flex-direction: column;
  padding: 35px;
  /* display: inline-block; */
  p {
    color: ${(props) => props.theme.color.white};
  }
  p.title {
    font-size: ${(props) => props.theme.fontSize.lg};
  }
  p.detail {
    font-size: ${(props) => props.theme.fontSize.sm};
    margin: 0 auto;
    /* display: block; */
  }
  div {
    display: flex;
  }
  div.p {
  }
`;

const DriverButton = () => {
  return (
    <>
      <Button>
        <div>
          <Image
            className="plus"
            src={ButtonPlus}
            width={50}
            height={50}
            alt={'ButtonPlus'}
          />
          <p className="title">카풀 기사 등록</p>
        </div>
        <p className="detail">기사로 등록하여 함께 카풀할 고객을 만나보세요!</p>
      </Button>
    </>
  );
};

export default DriverButton;
