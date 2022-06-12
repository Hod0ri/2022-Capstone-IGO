import React, { useState } from 'react';
import styled from 'styled-components';
import InputBox from '../Common/InputBox';
import Button from '../Common/Button';
import axios from 'axios';
import FindModarlCard from './FindModalCard';
import { checkValue } from '../../etc/checkValue';
import { fetchAuth } from '../../api/fetchAuth';

const BodyStyle = styled.div`
  margin: 0 auto;
  width: 80%;
  p {
    margin-top: 30px;
    margin-bottom: 10px;
  }

  & > button {
    margin-top: 30px;
  }
`;

const PhoneArea = styled.div`
  display: flex;
  margin-bottom: 15px;

  InputBox {
    flex: 2;
  }

  Button {
    margin-left: 15px;
    width: 150px;
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;

const FindId = () => {
  //inputData
  const [inputData, setInputData] = useState({
    user_Name: '',
    user_Phone: '',
    user_Email: '',
  });

  //모달상태
  const [display, setDisplay] = useState(false);
  //찾은 id
  const [findId, setFindId] = useState('');

  //전화번호 입력값 수정용 필터
  const filter = {
    phone: (value) => {
      let data = value.replace(/[^0-9]/g, '');
      data = data.slice(0, 11);
      if (data.length > 3) data = data.replace(/(^.{3})/g, '$1-');
      if (data.length > 8) data = data.replace(/(^.{8})/g, '$1-');
      return data;
    },
  };

  let { user_Name, user_Phone, user_Email } = inputData;

  //서버 전송전 정규 판단식 함수

  const onFindUserId = async () => {
    let checkState = true;

    //입력값 정규 필터링
    ['user_Name', 'user_Phone', 'user_Email'].forEach((str) => {
      if (!checkValue[str](inputData[str])) {
        checkState = false;
        return;
      }
    });

    if (checkState) {
      await fetchAuth
        .findId({
          user_Name: user_Name,
          user_Email: user_Email,
          user_Phone: user_Phone,
        })
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.user_Id);
            setDisplay(true);
            setFindId(res.data.user_Id);
          } else {
            alert('입력값을 확인해 주세요!');
          }
        })
        .catch((err) => {
          alert('입력값을 확인해 주세요!');
        });
    } else {
      alert('입력값을 확인해 주세요!');
    }
  };
  return (
    <BodyStyle>
      <p>이메일</p>
      <InputBox
        placeholder="example@igo.com"
        type="email"
        onChange={(e) =>
          setInputData({ ...inputData, user_Email: e.target.value })
        }
        value={inputData['user_Email']}
      />
      <p>이름</p>
      <InputBox
        placeholder="이름을 입력해주세요."
        onChange={(e) =>
          setInputData({ ...inputData, user_Name: e.target.value })
        }
        value={inputData['user_Name']}
      />

      <p>휴대전화</p>
      <PhoneArea>
        <InputBox
          placeholder="-제외하고 입력"
          type="phone"
          onChange={(e) =>
            setInputData({
              ...inputData,
              user_Phone: filter.phone(e.target.value),
            })
          }
          value={inputData['user_Phone']}
        />
      </PhoneArea>
      <Button onClick={() => onFindUserId()}>확인</Button>
      {display ? (
        <FindModarlCard findId={findId} setDisplay={setDisplay} />
      ) : null}
    </BodyStyle>
  );
};

export default FindId;
