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
  display: flex;
  flex-direction: column;
  width: 80%;
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
  ul {
    @media screen and (max-width: 402px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 40px;
  @media screen and (max-width: 402px) {
    margin: 20px 0;
  }
  li {
    /* border: 1px solid black; */
    list-style: none;
    float: left;
    padding: 0 15px;
    @media screen and (max-width: 402px) {
      margin: 5px;
    }
  }

  li::after {
    @media screen and (max-width: 402px) {
      display: none;
    }
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
          //?????? ??????
          setUserNick(res.data.user_Nick);
          setIsLoading(false);
          setisData(true);
          router.reload('/');
        })
        .catch((err) => {
          alert(`????????? ?????? ??????????????? ????????? ????????? !`);
          setIsLoading(false);
          //?????? ??????
          // console.log(err.response.data.err);
        });
    } else {
      alert('????????? ?????? ??????????????? ????????? ????????? !');
    }
  };
  const userNick = useRecoilValue(atomUserNick);
  return isData ? (
    <Loading />
  ) : (
    <BodyStyle>
      <p>?????????</p>
      <InputBox
        placeholder="????????? ??????"
        type="email"
        value={inputData.user_Id}
        onChange={(e) =>
          setInputData({ ...inputData, user_Id: e.target.value })
        }
      />

      <p>????????????</p>
      <InputBox
        placeholder="???????????? ??????"
        type="password"
        value={inputData.user_Pw}
        onChange={(e) =>
          setInputData({ ...inputData, user_Pw: e.target.value })
        }
        onKeyDown={(e) => e.key === 'Enter' && onLoginClick()}
      />

      <SubArea>
        <ul>
          <li>
            <Link href="/findid">
              <a>????????? ??????</a>
            </Link>
          </li>
          <li>
            <Link href="/findpw">
              <a>???????????? ??????</a>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <a>????????????</a>
            </Link>
          </li>
        </ul>
      </SubArea>

      <Button onClick={() => onLoginClick()}>?????????</Button>

      <ServiceArea>
        <a href="#">1:1 ????????????</a>
        <AiOutlineRight className="RightBtn" />
      </ServiceArea>

      <ServiceArea>
        <a href="#">????????????</a>
        <AiOutlineRight className="RightBtn" />
      </ServiceArea>
    </BodyStyle>
  );
};

export default SignIn;
