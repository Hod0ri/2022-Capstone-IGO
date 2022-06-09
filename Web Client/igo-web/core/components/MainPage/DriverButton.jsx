import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import ButtonPlus from './icon/buttonPlus.png';
import Driver from './icon/driver.png';

const DriverButtonContainer = styled.button`
  border: none;
  border-radius: 50px;
  cursor: pointer;
  background: ${(props) => props.theme.color.blue};
  width: 360px;
  height: 212px;
  text-align: left;
  display: inline-flex;
  flex-direction: column;
  padding: 35px;
  p {
    color: ${(props) => props.theme.color.white};
  }
  p.title {
    font-size: ${(props) => props.theme.fontSize.lg};
    margin-left: 10px;
  }
  p.detail {
    font-size: ${(props) => props.theme.fontSize.sm};
  }
  div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .driver {
    position: absolute;
    left: 280px;
    top: 219px;
  }
`;

const DriverButton = ({ ...props }) => {
  return (
    <DriverButtonContainer {...props}>
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
      <p className="detail">
        기사로 등록하여 함께 카풀할
        <br /> 고객을 만나보세요!
      </p>
      <div className="driver">
        <Image src={Driver} width={130} height={130} />
      </div>
    </DriverButtonContainer>
  );
};

export default DriverButton;
