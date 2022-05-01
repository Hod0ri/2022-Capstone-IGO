import React from "react";
import FindId from "../FindId";
import InputBox from "../Common/InputBox";
import styled from "styled-components";

const FindPwArea = styled.div`
  margin: 0 auto;
  width: 80%;
  p {
    margin-top: 30px;
    margin-bottom: 10px;
  }
`;

const index = () => {
  return (
    <>
      <FindPwArea>
        <p>이메일</p>
        <InputBox placeholder="example@igo.com" type="email" />
      </FindPwArea>
      <FindId />
    </>
  );
};

export default index;
