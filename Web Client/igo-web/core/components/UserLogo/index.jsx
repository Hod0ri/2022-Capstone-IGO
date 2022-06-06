import React from 'react';
import Mail from './icon/male.png';
import Femail from './icon/female.png';
import Image from 'next/image';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { atomUserNick } from '../../atoms/loginState';

const UserLogoContainer = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin-top: 10px;
  }
  font-size: ${(props) => props.theme.fontSize.md};
`;

const UserLogo = ({ icon = 'mail' }) => {
  const user_Nick = useRecoilValue(atomUserNick);
  return (
    <UserLogoContainer>
      <Image
        src={icon == 'mail' ? Mail : Femail}
        width={80}
        height={80}
        alt="alt"
      />
      <p>{user_Nick || '닉네임x'}</p>
    </UserLogoContainer>
  );
};

export default React.memo(UserLogo);
