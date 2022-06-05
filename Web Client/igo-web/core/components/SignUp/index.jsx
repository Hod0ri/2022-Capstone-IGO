import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { fetchCreateUser } from '../../api/fetcherAuth';
import Button from '../Common/Button';
import InputBox from '../Common/InputBox';

const SignUp = () => {
  const [inputData, setInputData] = useState({
    user_Id: '',
    user_Nick: '',
    user_Name: '',
    user_Pw: '',
    user_Driver: false,
    user_Phone: '',
    user_Email: '',
  });
  const [checkPw, setCheckPw] = useState('');

  const router = useRouter();
  const onCreateUserId = async () => {
    if (inputData['user_Pw'] === checkPw) {
      await fetchCreateUser(inputData)
        .then((res) => {
          if (res.data.status) {
            alert(`회원가입 성공`);
            router.push('/');
          } else {
            alert('입력값을 확인해 주세요!');
          }
        })
        .catch((err) => {
          alert('입력값을 확인해 주세요!');
          console.log(err.response.data.err.success);
        });
    } else {
      alert('입력값을 확인해 주세요!');
    }
  };
  let str = inputData['user_Phone'];

  const filter = {
    phone: (value) => {
      let data = value.replace(/[^0-9]/g, '');
      data = data.slice(0, 11);
      if (data.length > 3) data = data.replace(/(^.{3})/g, '$1-');
      if (data.length > 8) data = data.replace(/(^.{8})/g, '$1-');
      return data;
    },
  };

  console.log(inputData.user_Phone);

  return (
    <SignUpContainer>
      <InputBoxContainer>
        <p>이메일</p>
        <InputBox
          placeholder="example@igo.soplay.dev"
          type="email"
          onChange={(e) =>
            setInputData({ ...inputData, user_Email: e.target.value })
          }
          value={inputData['user_Email']}
        />
      </InputBoxContainer>
      <InputBoxContainer>
        <p>닉네임</p>
        <div className="flex">
          <InputBox
            onChange={(e) =>
              setInputData({ ...inputData, user_Nick: e.target.value })
            }
            value={inputData['user_Nick']}
          />
          <Button color="lightgary" fontColor="gray">
            중복 확인
          </Button>
        </div>
      </InputBoxContainer>
      <InputBoxContainer>
        <p>아이디</p>
        <InputBox
          onChange={(e) =>
            setInputData({ ...inputData, user_Id: e.target.value })
          }
          value={inputData['user_Id']}
        />
      </InputBoxContainer>
      <InputBoxContainer>
        <p>
          비밀번호
          {checkPw && inputData['user_Pw'] !== checkPw && (
            <span className="red ml-30">비밀번호가 일치하지 않습니다</span>
          )}
        </p>
        <InputBox
          placeholder="8~20자 영문,숫자,특수문자 중 2가지 이상"
          type="password"
          onChange={(e) =>
            setInputData({ ...inputData, user_Pw: e.target.value })
          }
          value={inputData['user_Pw']}
        />
        <InputBox
          type="password"
          onChange={(e) => setCheckPw(e.target.value)}
          value={checkPw}
        />
      </InputBoxContainer>
      <InputBoxContainer>
        <p>
          기사여부 <span>(선택)</span>
        </p>
        <div id="radio" className="flex">
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
            <label htmlFor="radio_no">탑승객</label>
          </div>
          <div>
            <input
              name="a"
              type={'radio'}
              value="yes"
              id="radio_yes"
              onChange={() => setInputData({ ...inputData, user_Driver: true })}
            />
            <label htmlFor="radio_yes">운전자</label>
          </div>
        </div>
      </InputBoxContainer>
      <InputBoxContainer>
        <p>이름</p>
        <InputBox
          onChange={(e) =>
            setInputData({ ...inputData, user_Name: e.target.value })
          }
          value={inputData['user_Name']}
        />
      </InputBoxContainer>
      <InputBoxContainer>
        <p>휴대전화</p>
        <InputBox
          type="phone"
          onChange={(e) =>
            setInputData({
              ...inputData,
              user_Phone: filter.phone(e.target.value),
            })
          }
          value={inputData['user_Phone']}
        />
      </InputBoxContainer>
      <div className="lastBtn">
        <Button onClick={() => onCreateUserId()}>가입 하기</Button>
      </div>
    </SignUpContainer>
  );
};

// 회원가입 main container
const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 50px 50px 50px;
  font-size: ${(props) => props.theme.fontSize.sm};
  .lastBtn {
    margin-top: 30px;
  }
  .red {
    color: ${(props) => props.theme.color.red};
  }
  .ml-30 {
    margin-left: 30px;
  }
`;
// 입력 div container
const InputBoxContainer = styled.div`
  width: 100%;
  p {
    margin-bottom: 5px;
    margin-left: 5px;
    span {
      color: ${(props) => props.theme.color.lightgray};
    }
  }
  & + & {
    margin-top: 30px;
  }
  .flex {
    display: flex;
  }
  button {
    margin-left: 25px;
    width: 50%;
    font-size: ${(porps) => porps.theme.fontSize.md};
  }
  input {
    & + input {
      margin-top: 10px;
    }
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
`;
export default SignUp;
