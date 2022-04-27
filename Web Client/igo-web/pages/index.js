import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import Header from "../core/components/Header";

const BodyContainer = styled.div`
  width: 33%;
  max-width: 500px;
  height: 100vh;
  margin: 0 auto;
  border: 1px solid red;
`;

export default function Home() {
  return (
    <>
      <BodyContainer>
        <Header />
        <div>내용 뜰 곳 ? </div>
        <div>nav위치</div>
      </BodyContainer>
    </>
  );
}
