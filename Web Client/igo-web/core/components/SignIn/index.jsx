import React from 'react';
import styled from 'styled-components';
import Button from '../Common/Button';
import InputBox from '../Common/InputBox';
import { AiOutlineRight } from 'react-icons/ai';

const BodyStyle = styled.div`
  margin: 0 auto;
  width: 80%;
  margin: 50px;
  p {
    margin-top: 30px;
    margin-bottom: 10px;
  }
  a {
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.color.gray};
    text-decoration: none;
  }
`;

const SubArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 40px;
  li {
    list-style: none;
    float: left;
    padding: 0 15px;
  }

  li::after {
    content: '|';
    float: right;
    color: ${(props) => props.theme.color.gray};
    margin-right: -17px;
  }

  li:last-child::after {
    content: '';
  }
`;

const ServiceArea = styled.div`
  display: flex;
  color: ${(props) => props.theme.color.gray};
  margin-top: 20px;
  a {
    flex: 1;
  }
  .RightBtn {
    font-size: 25px;
  }
`;

const index = () => {
  return (
    <>
      <BodyStyle>
        <p>이메일</p>
        <InputBox placeholder="example@igo.com" type="email" />

        <p>비밀번호</p>
        <InputBox placeholder="비밀번호 입력" type="password" />

        <SubArea>
          <ul>
            <li>
              <a href="#">아이디 찾기</a>
            </li>
            <li>
              <a href="#">비밀번호 찾기</a>
            </li>
            <li>
              <a href="#">회원가입</a>
            </li>
          </ul>
        </SubArea>

        <Button>로그인</Button>

        <ServiceArea>
          <a href="#">1:1 문의하기</a>
          <AiOutlineRight className="RightBtn" />
        </ServiceArea>

        <ServiceArea>
          <a href="#">고객센터</a>
          <AiOutlineRight className="RightBtn" />
        </ServiceArea>
      </BodyStyle>
    </>
  );
};

export default index;
