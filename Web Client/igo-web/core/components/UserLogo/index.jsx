import React from "react";
import Mail from "./icon/male.png";
import Femail from "./icon/female.png";
import Image from "next/image";
import styled from "styled-components";

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

const UserLogo = ({ icon = "mail", nickname = "닉네임x" }) => {
  return (
    <UserLogoContainer>
      <Image
        src={icon == "mail" ? Mail : Femail}
        width={80}
        height={80}
        alt="alt"
      />
      <p>{nickname}</p>
    </UserLogoContainer>
  );
};

export default React.memo(UserLogo);
