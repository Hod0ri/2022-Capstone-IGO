import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Common/Button';
import InputBox from '../Common/InputBox';
import { AiOutlineRight } from 'react-icons/ai';
import { checkValue } from '../../etc/checkValue';
import { fetchAuth } from '../../api/fetchAuth';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { atomUserNick } from '../../atoms/loginState';
import Loading from '../Common/Loading';

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
const SignIn = () => {
  const router = useRouter();
  const [inputData, setInputData] = useState({ user_Id: '', user_Pw: '' });

  const [userNickaa, setUserNick] = useRecoilState(atomUserNick);
  const [isLoading, setIsLoading] = useState(false);
  const [isData, setisData] = useState(false);
  const onLoginClick = async () => {
    let checkState = true;

    ['user_Id', 'user_Pw'].forEach((str) => {
      if (!checkValue[str](inputData[str])) {
        checkState = false;
        return;
      }
    });

    if (checkState) {
      setIsLoading(true);
      await fetchAuth
        .login(inputData)
        .then((res) => {
          //상태 저장
          setUserNick(res.data.user_Nick);
          setIsLoading(false);
          setisData(true);
          router.reload('/');
        })
        .catch((err) => {
          alert(`아이디 혹은 비밀번호를 확인해 주세요 !`);
          setIsLoading(false);
          //로그 확인
          // console.log(err.response.data.err);
        });
    } else {
      alert('아이디 혹은 비밀번호를 확인해 주세요 !');
    }
  };
  const userNick = useRecoilValue(atomUserNick);
  console.log(userNick);
  return isData ? (
    <Loading />
  ) : (
    <BodyStyle>
      <p>아이디</p>
      <InputBox
        placeholder="아이디 입력"
        type="email"
        value={inputData.user_Id}
        onChange={(e) =>
          setInputData({ ...inputData, user_Id: e.target.value })
        }
      />

      <p>비밀번호</p>
      <InputBox
        placeholder="비밀번호 입력"
        type="password"
        value={inputData.user_Pw}
        onChange={(e) =>
          setInputData({ ...inputData, user_Pw: e.target.value })
        }
      />

      <SubArea>
        <ul>
          <li>
            <a href="#">아이디 찾기</a>
          </li>
          <li>
            <a href="#">비밀번호 찾기</a>
          </li>
          <li>
            <Link href="/signup">
              <a>회원가입</a>
            </Link>
          </li>
        </ul>
      </SubArea>

      <Button onClick={() => onLoginClick()}>로그인</Button>

      <ServiceArea>
        <a href="#">1:1 문의하기</a>
        <AiOutlineRight className="RightBtn" />
      </ServiceArea>

      <ServiceArea>
        <a href="#">고객센터</a>
        <AiOutlineRight className="RightBtn" />
      </ServiceArea>
    </BodyStyle>
  );
};

export default SignIn;
