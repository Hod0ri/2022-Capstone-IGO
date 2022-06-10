import React, { useState } from 'react';
import UserLogo from '../core/components/UserLogo';
import styled from 'styled-components';
import InputBox from '../core/components/Common/InputBox';
import Button from '../core/components/Common/Button';
import { useRecoilValue } from 'recoil';
import { atomUserNick } from '../core/atoms/loginState';
import { checkValue } from '../core/etc/checkValue';

const Account = () => {
  const user_Nick = useRecoilValue(atomUserNick);

  const [inputData, setInputData] = useState({
    user_Id: '',
    user_Nick: '',
    user_Name: '',
    user_Pw: '',
    user_Driver: false,
    user_Phone: '',
    user_Email: '',
  });

  return (
    <AccountContainer>
      <UserLogo />
      <div className="inputBox">
        <p>이메일</p>
        <InputBox placeholder="example@igo.com" />
        <p>이름</p>
        <InputBox placeholder="홍길동" />
        <p>닉네임</p>
        <InputBox placeholder={user_Nick || '닉네임x'} />
        <p>휴대전화</p>
        <InputBox />

        <p>기사 여부</p>
        <div id="radio" className="flex">
          <div>
            <input
              name="a"
              type={'radio'}
              value="yes"
              id="radio_yes"
              onChange={() => setInputData({ ...inputData, user_Driver: true })}
            />
            <label htmlFor="radio_yes">유</label>
          </div>
          <div>
            <input
              name="a"
              type={'radio'}
              defaultChecked
              value="no"
              id="radio_no"
              onChange={() =>
                setInputData({ ...inputData, user_Driver: false })
              }
            />
            <label htmlFor="radio_no">무</label>
          </div>
        </div>
      </div>
      <div className="btn">
        <Button className="btn">수정</Button>
      </div>
    </AccountContainer>
  );
};

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;

  .btn {
    width: 100%;
    margin-top: 30px;
  }

  .inputBox {
    width: 100%;
    p {
      margin-bottom: 10px;
      margin-top: 30px;
    }
    .flex {
      display: flex;
    }

    #radio {
      div {
        display: flex;
        align-items: center;
        & + div {
          margin-left: 30px;
        }

        input {
          width: 25px;
          height: 25px;
        }
        label {
          padding-left: 10px;
        }
      }
    }
  }
`;

export default Account;
