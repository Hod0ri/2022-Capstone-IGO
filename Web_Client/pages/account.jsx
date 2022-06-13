import React, { useRef, useState } from 'react';
import UserLogo from '../core/components/UserLogo';
import styled from 'styled-components';
import InputBox from '../core/components/Common/InputBox';
import Button from '../core/components/Common/Button';
import { useRecoilValue } from 'recoil';
import { atomUserNick } from '../core/atoms/loginState';
import { checkValue } from '../core/etc/checkValue';
import { fetchAuth } from '../core/api/fetchAuth';
import Auth from '../core/components/Common/Auth';
import { withRouter } from 'next/router';

const Account = ({ router }) => {
  const user_Nick = useRecoilValue(atomUserNick);

  const [inputData, setInputData] = useState({
    user_Nick: '',
    user_Driver: false,
    user_Phone: '',
    user_Email: '',
  });

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

  //서버 전송전 정규 판단식 함수

  const onUpdateUserId = async () => {
    let checkState = true;

    //입력값 정규 필터링
    ['user_Nick', 'user_Email', 'user_Phone'].forEach((str) => {
      if (!checkValue[str](inputData[str])) {
        checkState = false;
        return;
      }
    });

    if (checkState) {
      await fetchAuth
        .update(inputData)
        .then((res) => {
          if (res.data.success) {
            alert('수정 되었습니다.');
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

  //회원 탈퇴
  const [deleteUser, setDeleteUser] = useState(false);
  const [user_Pw, setUser_Pw] = useState('');
  const onDeleteUser = async () => {
    if (deleteUser) {
      await fetchAuth
        .delete({ user_Pw: user_Pw })
        .then((res) => {
          alert('회원탈퇴가 정상적으로 처리되었습니다.!!');
          router.push('/');
        })
        .catch((e) => {
          alert('비밀번호를 확인해주세요! ');
        });
    } else {
      setDeleteUser(true);
      alert('비밀번호를 입력해주세요!');
    }
  };
  return (
    <Auth auth={true}>
      <AccountContainer>
        <UserLogo />
        <div className="inputBox">
          <p>이메일</p>
          <InputBox
            placeholder="example@igo.com"
            type="email"
            onChange={(e) =>
              setInputData({ ...inputData, user_Email: e.target.value })
            }
            value={inputData['user_Email']}
          />
          <p>닉네임</p>
          <InputBox
            placeholder={user_Nick || '닉네임x'}
            onChange={(e) =>
              setInputData({ ...inputData, user_Nick: e.target.value })
            }
            value={inputData['user_Nick']}
          />
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
            placeholder="- 제외하고 입력"
          />

          <p>
            기사 여부 <span>(선택)</span>
          </p>
          <div id="radio" className="flex">
            <div>
              <input
                name="a"
                type={'radio'}
                value="yes"
                id="radio_yes"
                onChange={() =>
                  setInputData({ ...inputData, user_Driver: true })
                }
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
          <Button className="btn" onClick={() => onUpdateUserId()}>
            수정
          </Button>
          <DeleteAccount visible={deleteUser}>
            <InputBox
              placeholder="비밀번호를 입력해주세요!"
              value={user_Pw}
              type="password"
              onChange={(e) => setUser_Pw(e.target.value)}
            />

            <Button color="red" onClick={() => onDeleteUser()}>
              회원 탈퇴
            </Button>
          </DeleteAccount>
        </div>
      </AccountContainer>
    </Auth>
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
const DeleteAccount = styled.div`
  margin-top: 30px;
  input {
    display: ${(props) => (props.visible ? 'block' : 'none')};
    margin-bottom: 15px;
  }
`;

export default withRouter(Account);
